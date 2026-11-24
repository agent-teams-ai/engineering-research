import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, realpathSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

type Diagnostic = { file: string; line: number; code: number; category: string };
type Scenario = {
  id: string;
  config: string;
  expectedExit: number | "diagnostics";
  expected: Diagnostic[];
  stockExpected: Diagnostic[];
};
type Observation = {
  id: string;
  executable: string;
  args: string[];
  status: number;
  signal: null;
  elapsedMs: number;
  stdout: string;
  stderr: string;
};

const root = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const observations: Observation[] = [];
const sha256 = (bytes: string | Buffer): string => createHash("sha256").update(bytes).digest("hex");
const readJson = (path: string): unknown => JSON.parse(readFileSync(path, "utf8"));
const record = (value: unknown): Record<string, unknown> => {
  assert(value !== null && typeof value === "object" && !Array.isArray(value));
  return value as Record<string, unknown>;
};
const string = (value: unknown): string => { assert.equal(typeof value, "string"); return value as string; };
const number = (value: unknown): number => { assert(typeof value === "number" && Number.isInteger(value)); return value; };
const array = (value: unknown): unknown[] => { assert(Array.isArray(value)); return value; };

function diagnostic(value: unknown): Diagnostic {
  const item = record(value);
  const category = string(item.category);
  assert(["error", "warning", "suggestion"].includes(category));
  return { file: string(item.file), line: number(item.line), code: number(item.code), category };
}

function scenario(value: unknown): Scenario {
  const item = record(value);
  const expectedExit = item.expectedExit === "diagnostics" ? "diagnostics" : number(item.expectedExit);
  assert(expectedExit === "diagnostics" || [0, 1, 2].includes(expectedExit));
  return {
    id: string(item.id), config: string(item.config), expectedExit,
    expected: array(item.expected).map(diagnostic),
    stockExpected: array(item.stockExpected).map(diagnostic),
  };
}

function ownedPath(path: string): string {
  const absolute = resolve(root, path);
  assert(absolute.startsWith(root + sep), `Path outside experiment: ${path}`);
  return absolute;
}

function filesUnder(path: string): string[] {
  return readdirSync(ownedPath(path)).sort().flatMap((name) => {
    const entry = `${path}/${name}`;
    const stat = lstatSync(ownedPath(entry));
    assert(!stat.isSymbolicLink(), `Unexpected input symlink: ${entry}`);
    return stat.isDirectory() ? filesUnder(entry) : [entry];
  });
}

function inputHashes(): Record<string, string> {
  const files = ["qualify.ts", "cases.json", "package.json", "pnpm-lock.yaml", "tsconfig.harness.json",
    ...filesUnder("configs"), ...filesUnder("fixtures")];
  return Object.fromEntries(files.sort().map((path) => [path, sha256(readFileSync(ownedPath(path)))]));
}

function compiler(packageName: string, version: string, expectedHash: string): string {
  const packagePath = realpathSync(require.resolve(`${packageName}/package.json`));
  assert(packagePath.startsWith(realpathSync(resolve(root, "node_modules")) + sep));
  const manifest = record(readJson(packagePath));
  assert.equal(manifest.name, packageName);
  assert.equal(manifest.version, version);
  assert.equal(manifest.dependencies, undefined);
  assert.equal(manifest.scripts, undefined);
  const executable = resolve(dirname(packagePath), "lib/tsc");
  assert.equal(sha256(readFileSync(executable)), expectedHash, `${packageName} executable changed`);
  assert(existsSync(resolve(dirname(executable), "lib.esnext.d.ts")));
  return executable;
}

function invoke(id: string, executable: string, args: string[]): Observation {
  const started = performance.now();
  const result = spawnSync(executable, args, {
    cwd: root, encoding: "utf8", timeout: 60_000, killSignal: "SIGKILL", maxBuffer: 2 * 1024 * 1024,
    env: { ...process.env, GOMAXPROCS: "2" },
  });
  assert.equal(result.error, undefined, `${id}: spawn/timeout/output failure: ${result.error?.message}`);
  assert.equal(result.signal, null, `${id}: unexpected signal`);
  assert(result.status !== null, `${id}: missing exit status`);
  const observation: Observation = {
    id, executable: relative(root, executable), args, status: result.status, signal: null,
    elapsedMs: Math.round(performance.now() - started), stdout: result.stdout, stderr: result.stderr,
  };
  observations.push(observation);
  return observation;
}

function diagnostics(output: string): Diagnostic[] {
  // This pinned corpus emits one primary diagnostic per nonempty stdout line.
  // Unknown or continued output requires explicit qualification, never silent dropping.
  return output.split(/\r?\n/).filter((line) => line.trim() !== "").map((line) => {
    const match = /^(.+)\((\d+),(\d+)\): (error|warning|suggestion) TS(\d+):/.exec(line);
    assert(match, `Unexpected compiler diagnostic format: ${line}`);
    assert(match[1] && match[2] && match[4] && match[5]);
    return {
      file: relative(root, resolve(root, match[1])).replaceAll(sep, "/"),
      line: Number(match[2]), category: match[4], code: Number(match[5]),
    };
  });
}

function sorted(items: Diagnostic[]): Diagnostic[] {
  return [...items].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b), "en"));
}

function checkResult(result: Observation, expected: Diagnostic[], expectedExit: number | "diagnostics"): void {
  assert.equal(result.stderr, "", `${result.id}: unexpected stderr`);
  if (expectedExit === "diagnostics") assert([1, 2].includes(result.status), `${result.id}: expected compiler rejection`);
  else assert.equal(result.status, expectedExit, `${result.id}: exit status`);
  assert.deepEqual(sorted(diagnostics(result.stdout)), sorted(expected), `${result.id}: exact primary findings`);
  if (expected.length === 0) assert.equal((result.stdout + result.stderr).trim(), "", `${result.id}: unexpected output`);
}

function libraryHashes(executable: string): Record<string, string> {
  const directory = dirname(executable);
  return Object.fromEntries(readdirSync(directory).filter((name) => /^lib.*\.d\.ts$/.test(name)).sort()
    .map((name) => [name, sha256(readFileSync(resolve(directory, name)))]));
}

const inputsBefore = inputHashes();
let failure: string | undefined;
let cohort: Record<string, unknown> = {};
try {
  assert.equal(process.platform, "linux", "This experiment qualifies Linux x64 only");
  assert.equal(process.arch, "x64");
  const signatureReport = record(readJson(resolve(root, "results/signatures-latest.json")));
  assert.deepEqual(signatureReport.invalid, []);
  assert.deepEqual(signatureReport.missing, []);
  const verifiedProvenance = array(signatureReport.verified).map(record);
  for (const [name, version] of [["@effect/tsgo-linux-x64", "0.73.4"], ["effect", "4.1.5"]]) {
    assert(verifiedProvenance.some((item) => item.name === name && item.version === version), `${name}: official provenance verification missing`);
  }
  assert(!existsSync(resolve(root, "node_modules/@effect/tsgo")), "Incompatible JS launcher must not be installed");
  const effectCompiler = compiler("@effect/tsgo-linux-x64", "0.73.4", "18b0b3fdac7d76b8c9b97e64c185ce8d92f2e13ab2307ae18a27fb11a62c045c");
  const stockCompiler = compiler("@typescript/typescript-linux-x64", "7.0.2", "4f2de678286401759b3fb4475bafe35b8f32b4b3a07d92642bbf37eadc9b34a4");
  const effectManifest = record(readJson(require.resolve("effect/package.json")));
  assert.equal(effectManifest.version, "4.1.5");
  const libraries = libraryHashes(stockCompiler);
  assert.equal(Object.keys(libraries).length, 108);
  assert.deepEqual(libraryHashes(effectCompiler), libraries, "Compiler standard-library parity");
  for (const [id, executable] of [["stock-version", stockCompiler], ["effect-version", effectCompiler]]) {
    assert(id && executable);
    const version = invoke(id, executable, ["--version"]);
    assert.equal(version.status, 0);
    assert.match(version.stdout, /Version 7\.0\.2(?:$|[ +(-])/m);
    assert.equal(version.stderr, "");
  }
  cohort = { node: process.version, platform: process.platform, arch: process.arch, GOMAXPROCS: "2",
    effect: "4.1.5", effectTool: "0.73.4", stockTypeScript: "7.0.2", libraryHashes: libraries,
    signatureReportSha256: sha256(readFileSync(resolve(root, "results/signatures-latest.json"))) };
  checkResult(invoke("strict-harness", stockCompiler, ["-p", "tsconfig.harness.json", "--pretty", "false"]), [], 0);
  const crashControl: Observation = {
    id: "synthetic-crash-after-diagnostic", executable: "synthetic", args: [], status: 1, signal: null, elapsedMs: 0,
    stdout: "fixtures/ordinary-type-error.ts(2,14): error TS2322: controlled diagnostic\n", stderr: "",
  };
  const crashExpected = [{ file: "fixtures/ordinary-type-error.ts", line: 2, code: 2322, category: "error" }];
  assert.throws(() => checkResult({ ...crashControl, stderr: "panic: controlled crash\n" }, crashExpected, "diagnostics"), /unexpected stderr/);
  assert.throws(() => checkResult({ ...crashControl, stdout: crashControl.stdout + "panic: controlled crash\n" }, crashExpected, "diagnostics"), /Unexpected compiler diagnostic format/);
  const scenarios = array(readJson(resolve(root, "cases.json"))).map(scenario);
  assert(scenarios.length > 0);
  assert.equal(new Set(scenarios.map((item) => item.id)).size, scenarios.length, "Duplicate case ID");
  const fixtureRoots = new Set<string>();
  for (const item of scenarios) {
    assert(item.config.startsWith("configs/"));
    ownedPath(item.config);
    const shown = invoke(`${item.id}:config`, effectCompiler, ["-p", item.config, "--showConfig"]);
    assert.equal(shown.status, 0);
    assert.equal(shown.stderr, "");
    const config = record(JSON.parse(shown.stdout));
    const options = record(config.compilerOptions);
    assert.equal(options.strict, true, `${item.id}: strict must be effective`);
    assert.equal(options.noEmit, true);
    assert.notEqual(options.noCheck, true);
    assert.equal(options.skipLibCheck, false);
    for (const file of array(config.files).map(string)) {
      const path = relative(root, resolve(dirname(ownedPath(item.config)), file)).replaceAll(sep, "/");
      assert(path.startsWith("fixtures/"));
      fixtureRoots.add(path);
    }
    checkResult(invoke(`${item.id}:stock`, stockCompiler, ["-p", item.config, "--pretty", "false"]),
      item.stockExpected, item.stockExpected.length === 0 ? 0 : "diagnostics");
    checkResult(invoke(`${item.id}:effect`, effectCompiler, ["-p", item.config, "--pretty", "false"]), item.expected, item.expectedExit);
  }
  assert.deepEqual([...fixtureRoots].sort(), filesUnder("fixtures").filter((file) => file.endsWith(".ts")).sort(), "Complete fixture root inventory");
  assert.deepEqual(inputHashes(), inputsBefore, "Read-only check mutated experiment inputs");
} catch (error: unknown) {
  failure = error instanceof Error ? error.stack ?? error.message : String(error);
}
mkdirSync(resolve(root, "results"), { recursive: true });
writeFileSync(resolve(root, "results/latest.json"), JSON.stringify({
  schemaVersion: 1, observedAt: new Date().toISOString(), scope: "Linux x64 disposable qualification; no consumer activation",
  success: failure === undefined, cohort, inputs: inputsBefore, observations, ...(failure === undefined ? {} : { failure }),
}, null, 2) + "\n");
if (failure !== undefined) { console.error(failure); process.exitCode = 1; }
else console.log(`Effect diagnostics qualification passed: ${observations.filter((item) => item.id.endsWith(":effect")).length} scenarios; strict harness and stock controls passed.`);
