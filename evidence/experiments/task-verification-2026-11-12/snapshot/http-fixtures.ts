import { createHash } from 'node:crypto';
import { spawn, type ChildProcess } from 'node:child_process';
import { chmod, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { isDeepStrictEqual } from 'node:util';

// Synthetic architectural examples, NOT Hassan's proposed/approved benchmark fixtures.
// The oracle runs in this parent process; candidate children only serve HTTP.
const profile = { id: 'synthetic-user-1', name: 'Ada' };
const unauthorized = { error: 'unauthorized' };
const good = `({ status: 200, body: ${JSON.stringify(profile)} })`;
const denied = `({ status: 401, body: ${JSON.stringify(unauthorized)} })`;
const baseRoute = `export function decide(_auth: string | undefined) {
  return { status: 501, body: { error: 'not_implemented' } };
}\n`;
const delegatedRoute = `import { authenticate } from './auth.ts';
export function decide(auth: string | undefined) {
  return authenticate(auth) ? ${good} : ${denied};
}\n`;
const serverSource = `import { createServer } from 'node:http';
import { decide } from './profile.ts';
const server = createServer((req, res) => {
  const result = req.method === 'GET' && req.url === '/profile'
    ? decide(req.headers.authorization)
    : { status: 404, body: { error: 'not_found' } };
  res.writeHead(result.status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(result.body));
});
server.listen(0, '127.0.0.1', () => {
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('No TCP address');
  process.stdout.write(JSON.stringify({ ready: true, port: address.port }) + '\\n');
});
process.on('SIGTERM', () => server.close(() => process.exit(0)));
`;
type Fixture = { id: string; description: string; route: string; helper?: string };
const fixtures: Fixture[] = [
  {
    id: 'synthetic-P1', description: 'Correct inline authentication.',
    route: `export function decide(auth: string | undefined) {
  return auth === 'Bearer active-token' ? ${good} : ${denied};
}\n`,
  },
  {
    id: 'synthetic-P2', description: 'Equivalent authentication in an unchanged helper.',
    route: delegatedRoute,
    helper: `export function authenticate(auth: string | undefined) {
  return auth === 'Bearer active-token';
}\n`,
  },
  {
    id: 'synthetic-N1', description: 'Bug: missing-token request incorrectly returns 200.',
    route: `export function decide(auth: string | undefined) {
  return auth === undefined || auth === 'Bearer active-token' ? ${good} : ${denied};
}\n`,
  },
  {
    id: 'synthetic-N2', description: 'Bug: revoked-token rejection omitted in unchanged helper.',
    route: delegatedRoute,
    helper: `export function authenticate(auth: string | undefined) {
  return auth === 'Bearer active-token' || auth === 'Bearer revoked-token';
}\n`,
  },
];
const criteria = [
  { id: 'C1', description: 'Missing token is rejected.', auth: undefined, status: 401, body: unauthorized },
  { id: 'C2', description: 'Active token receives the profile.', auth: 'Bearer active-token', status: 200, body: profile },
  { id: 'C3', description: 'Revoked token is rejected.', auth: 'Bearer revoked-token', status: 401, body: unauthorized },
];
const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');
const root = fileURLToPath(new URL('./fixture-data/', import.meta.url));

async function writeImmutable(path: string, content: string): Promise<void> {
  try { await writeFile(path, content, { flag: 'wx', mode: 0o444 }); }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
    if (await readFile(path, 'utf8') !== content) throw new Error(`Snapshot changed: ${path}`);
  }
  await chmod(path, 0o444);
}

async function snapshot(fixture: Fixture) {
  const files: Record<string, string> = {
    'package.json': '{"type":"module"}\n', 'server.ts': serverSource, 'profile.ts': fixture.route,
    ...(fixture.helper ? { 'auth.ts': fixture.helper } : {}),
  };
  const hashes = Object.fromEntries(Object.entries(files).sort().map(([name, text]) => [name, sha256(text)]));
  const snapshotSha256 = sha256(JSON.stringify(hashes));
  const directory = join(root, fixture.id, snapshotSha256);
  await mkdir(directory, { recursive: true });
  for (const [name, content] of Object.entries(files)) await writeImmutable(join(directory, name), content);
  const baseFiles = { ...hashes, 'profile.ts': sha256(baseRoute) };
  const manifest = {
    synthetic: true, approvedBenchmarkFixture: false, id: fixture.id, snapshotSha256,
    files: hashes, baseSnapshotSha256: sha256(JSON.stringify(baseFiles)), baseFiles,
    changedFiles: ['profile.ts'], unchangedFiles: fixture.helper ? ['auth.ts'] : [],
  };
  await writeImmutable(join(directory, 'base-profile.ts'), baseRoute);
  await writeImmutable(join(directory, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  return { directory, ...manifest };
}

async function stop(child: ChildProcess): Promise<void> {
  if (child.pid === undefined || child.exitCode !== null || child.signalCode !== null) return;
  await new Promise<void>((resolve) => {
    const timer = setTimeout(() => child.kill('SIGKILL'), 500);
    child.once('exit', () => { clearTimeout(timer); resolve(); });
    child.kill('SIGTERM');
  });
}

async function start(directory: string) {
  const child = spawn(process.execPath, [
    '--permission', `--allow-fs-read=${directory}`, join(directory, 'server.ts'),
  ], { cwd: directory, env: {}, stdio: ['ignore', 'pipe', 'pipe'] });
  let stderr = '';
  child.stderr!.on('data', (chunk) => { stderr = (stderr + String(chunk)).slice(-4096); });
  try {
    const port = await new Promise<number>((resolve, reject) => {
      let output = '';
      const timer = setTimeout(() => reject(new Error('Fixture startup timed out')), 5000);
      const fail = (error: Error) => { clearTimeout(timer); reject(error); };
      child.once('error', fail);
      child.once('exit', (code) => fail(new Error(`Fixture exited ${code}: ${stderr}`)));
      child.stdout!.on('data', (chunk) => {
        output += String(chunk);
        if (output.length > 4096) return fail(new Error('Fixture startup output exceeded limit'));
        if (!output.includes('\n')) return;
        try {
          const ready = JSON.parse(output.split('\n')[0]);
          if (ready.ready !== true || !Number.isInteger(ready.port) || ready.port < 1 || ready.port > 65535) {
            throw new Error('Invalid fixture readiness');
          }
          clearTimeout(timer); resolve(ready.port);
        } catch (error) { fail(error as Error); }
      });
    });
    return { child, port };
  } catch (error) { await stop(child); throw error; }
}

export async function runHttpFixtures() {
  const results = [];
  for (const fixture of fixtures) {
    const input = await snapshot(fixture);
    const { child, port } = await start(input.directory);
    const observations = [];
    try {
      for (const criterion of criteria) {
        const response = await fetch(`http://127.0.0.1:${port}/profile`, {
          headers: criterion.auth ? { authorization: criterion.auth } : {},
          signal: AbortSignal.timeout(2000),
        });
        const actualBody: unknown = await response.json();
        observations.push({
          criterionId: criterion.id, description: criterion.description,
          expected: { status: criterion.status, body: criterion.body },
          observed: { status: response.status, body: actualBody },
          outcome: response.status === criterion.status && isDeepStrictEqual(actualBody, criterion.body)
            ? 'satisfied' : 'violated',
        });
      }
    } finally { await stop(child); }
    results.push({ id: fixture.id, description: fixture.description, input, observations });
  }
  return {
    kind: 'synthetic-local-http-fixture-spike', approvedBenchmarkFixtures: false,
    llmCalls: 0, candidateCount: fixtures.length, httpRequests: fixtures.length * criteria.length,
    scope: 'GET /profile only; demonstrates fixture/oracle separation, not model quality or production security.',
    candidateIsolation: 'Child process; no inherited credentials; Node permission model denies FS writes and restricts reads.',
    criteria: criteria.map(({ id, description }) => ({ id, description })), results,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(JSON.stringify(await runHttpFixtures(), null, 2));
}
