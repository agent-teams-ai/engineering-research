# Effect diagnostics preflight and bounded spike design — 2026-11-24

Status: **normal JavaScript CLI rejected by the TS >=7.0.2 rule; shipped native TypeScript 7.0.2 entry remains a viable, separately qualified experiment.** This review performed registry reads, archive extraction and static inspection only. No Effect CLI, TypeScript compiler, package lifecycle script or application fixture was executed.

## 1. Decision and exact cohort

Use the existing upstream native checker, not a new diagnostic implementation. Start with a Linux x64 disposable package in engineering-research; retain its ordinary required strict typecheck. This package can qualify a Foundation-first reusable gate without inventing a requirement for an already mature Effect application. Portability and adoption by later consumers remain separately qualified.

| Subject | Observed exact version/revision |
| --- | --- |
| npm `@effect/tsgo` latest | **0.73.4**, also latest published GitHub release; 2026-11-23T01:32:58Z |
| Release source | `Effect-TS/tsgo@aa2db44499067a798028cff9d3b1b9ca1e156f57` |
| Upstream main | `4557ae1c48589ee56d8a8317a99b671c8c91589a`, version-packages source for 0.73.5; not the current npm latest |
| Selected native package | `@effect/tsgo-linux-x64@0.73.4` |
| Selected embedded compiler | TypeScript **7.0.2**, `typescript-go@2bd066d87f5bafd315be9f40889d0a60b9e58e0b` |
| Other supported upstream targets | TS 7.1.0-beta / 7.1.0-dev.20261121.1; tsrs 7.1.0-beta.tsrs2 / tsrs4; Oxlint 1.91–1.94; companion 7.0.2005/2006/2008 |
| Current Effect fixture candidate | `effect@4.1.5`, release commit `e3aca1f1484e623cee09b7f3fa18d6ff5d66c0e8` |
| Current EF main inspected | `c4b0576f4ca935446d44bf97db92aafc99d8fcd5` |
| EF catalog | TypeScript7.0.2; tsrs0.18.0-ts7.1.0-dev.20260929; Oxlint1.83.0; companion7.0.2001; Bun1.4.3 |

The current EF tsrs/Oxlint cohort is **outside** the supported Effect-tsgo 0.73.4 matrix. Do not patch, replace or implicitly upgrade those tools. A separate native diagnostic lane does not alter Stack's tsrs → Bun → official TypeScript fallback policy. A known diagnostic failure must never be retried under a checker that omits that rule.

Sources: [release](https://github.com/Effect-TS/tsgo/releases/tag/%40effect/tsgo%400.73.4), [upstream matrix](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/_packages/tsgo/upstream.json), [EF catalog](https://github.com/agent-teams-ai/engineering-foundation/blob/c4b0576f4ca935446d44bf97db92aafc99d8fcd5/pnpm-workspace.yaml), [Stack ownership/behavior](https://github.com/agent-teams-ai/engineering-foundation/blob/c4b0576f4ca935446d44bf97db92aafc99d8fcd5/packages/stack-toolchain/README.md).

## 2. Published wrapper: proven blocker

The published 2,060,788-byte archive has registry SRI:

`sha512-geduC9fV5lEU14M7xo1av2wZx7zNbSslyAAxob3UMGUh3wUGJLme5emsjXULSILBbByt3HpMPaI0HaRFVPJBhg==`

Its `dist/effect-tsgo.cjs` contains:

- line 61587: bundled path `typescript@5.9.3/node_modules/typescript/lib/typescript.js`;
- line 63866: `var version = "5.9.3";`;
- line 208719: top-level `__toESM(require_typescript(), 1)`.

This is an initialized embedded old compiler/parser, not just an inert devDependency declaration. The source CLI statically imports setup, and setup imports TypeScript for source edits. The proxy branch is chosen after module initialization. Therefore **do not execute** `effect-tsgo tsc@7.0.2`, `effect-tsgo diagnostics`, `effect-tsgo --help`, `setup`, or `patch` from this published wrapper. Selecting a newer native child does not cure its parent parser.

Evidence: registry-authenticated archive bytes; [source CLI](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/_packages/tsgo/src/cli/index.ts), [setup TypeScript import](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/_packages/tsgo/src/cli/setup/changes.ts), [bundler configuration](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/_packages/tsgo/tsdown.config.ts). Do not delete or modify those published bytes to obtain an approved wrapper.

## 3. Native archive and provenance admission

The complete native archive was fetched with `npm pack --ignore-scripts` and inspected inertly:

- compressed130,041,154 bytes; unpacked333,854,566 bytes;588 entries;
- no JavaScript files, package dependencies, scripts or archive links;
- exact SRI `sha512-/E7g/Dm9+WvYxkN4cfZSybJ+/qpoYU69W5OtRPTzBPEIAR85qbBaLvFO+JWtiKtMdidgDNbbqdwooSFH1duc8A==`;
- selected `lib/tsc`:27,021,472 bytes; SHA256 `18b0b3fdac7d76b8c9b97e64c185ce8d92f2e13ab2307ae18a27fb11a62c045c`;
- static x86-64 Go ELF; inert ELF build-info inspection shows the microsoft/typescript-go command, Effect hooks, CGO_ENABLED=0, noembed, GOAMD64=v1;
- published `lib/upstream.json` maps `lib/tsc` to TypeScript7.0.2 at the commit above. Adjacent `lib.*.d.ts` must stay paired with the executable.

For both archives, computed SHA512 matches registry `dist.integrity`. All returned registry ECDSA signatures were verified using the registry key endpoint and standard cryptography primitives, over npm's `package@version:integrity` message. The decoded SLSA subjects match those archive digests and name the exact release source commit, `.github/workflows/release.yml`, and [upstream run45076223843](https://github.com/Effect-TS/tsgo/actions/runs/45076223843).

**Qualification remaining:** full Sigstore provenance/trust verification is not claimed by this review. Parent should use the existing official verifier in its scripts-disabled installed-package admission before first compiler execution; retain results and actual paths. The first native version probe must confirm7.0.2 and Effect suffix before fixtures. Reject missing/different artifacts. No global executable or on-demand fallback.

Temporary evidence is under `/tmp/effect-preflight-20261124/`: archives, registry metadata, attestations, `preflight-static.json`, `registry-signatures-verified.json`. Selected inertly extracted binary+libraries: `native-reviewed/lib/`. The initial workspace download hit ENOSPC; only this review's incomplete native archive was removed. Work resumed in /tmp and succeeded. This is an environment failure, not a compiler result.

Published data endpoints: [wrapper metadata](https://registry.npmjs.org/@effect%2Ftsgo/0.73.4), [native metadata](https://registry.npmjs.org/@effect%2Ftsgo-linux-x64/0.73.4), [wrapper attestation](https://registry.npmjs.org/-/npm/v1/attestations/@effect%2ftsgo@0.73.4), [native attestation](https://registry.npmjs.org/-/npm/v1/attestations/@effect%2ftsgo-linux-x64@0.73.4), [registry keys](https://registry.npmjs.org/-/npm/v1/keys).

## 4. What is actually checked

This is a native compiler implementation plus Effect-specific semantic diagnostics. It is not a new Effect type system, native application runtime, automatic AOT compilation of application effects, or proof of runtime architecture. Effect runtime packages are unrelated to choosing a Go/Rust implementation of a development checker.

Verified upstream behavior:

| Entry | Ordinary TS errors | Effect rules | Exit semantics |
| --- | --- | --- | --- |
| Native `lib/tsc -p ... --noEmit --pretty false` | Yes | Plugin-configured | Warnings affect exit by default; suggestions do not; error ignoring can be configured and must remain false |
| Native structured diagnostics mode | **Filtered out** | Yes | errors→1; warnings→0 unless strict; malformed request/output failure→2 |
| Stock EF typecheck | Its existing compiler contract | No automatic Effect rule guarantee | Existing classified fallback; no semantic-policy fallback |
| Editor/LSP | Editor-specific configured server | Only if that server/rule is active | Editor display is not CI enforcement |

The published wrapper's dedicated diagnostics implementation invokes native `--effect-cli-diagnostics` with one JSON request. Its Go collector explicitly discards non-Effect diagnostic codes; it can also return0 with files lacking plugin configuration. Thus a diagnostics-only success cannot establish ordinary typechecking, enabled rules, or complete coverage. Source evidence: [collector and exits](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/etsdiagnostics/diagnostics.go), [wrapper request protocol](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/_packages/tsgo/src/cli/diagnostics.ts), [tsc exit hook](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/_patches/typescript-go/009-execute-tsc-emit.patch).

The first experiment can stay with ordinary native tsc mode. Structured mode is an optional, **exact-release internal-protocol qualification** if machine-readable findings are needed; do not promise an unversioned public API around that private flag. Pass its request as one child-process argument, never shell interpolation. If used, require filesChecked and explicit file inventory to match the owned scope, filesWithoutPlugin=0, supportedEffect=v4, complete process settlement/output capture, and nonzero exit propagation. Keep the ordinary typecheck independently required.

## 5. Rule configuration and concrete fixtures

Both relevant rules are v4-only. `unstableApiUsage` defaults to warning (TS377136); `apiStabilityLeak` defaults to off (primary TS377137, related-information TS377138). Bare import declarations do not themselves trigger unstable usage. Named aliases and namespace member usage do. Default tsc warning failure and dedicated diagnostic warning success are deliberately different.

A minimal real source fixture can use `effect@4.1.5`:

```ts
import { get as fetch, post } from "effect/http/HttpClient";
import * as HttpClient from "effect/http/HttpClient";

const localAlias = fetch;
export const first = localAlias("https://example.invalid");
export const second = HttpClient.get("https://example.invalid");
export const sibling = post("https://example.invalid");
```

This file is compiled only, never executed. No request is sent. With `allowedUnstableApis: ["effect/http/HttpClient#get"]`, the first two uses must be permitted while `post` is still rejected. The allowlist is based on canonical declaration identity, not the user's local identifier. Avoid leaking inferred HTTP types into a separate stability test by keeping `apiStabilityLeak: "off"` for this fixture.

Real library-surface leak:

```ts
import type { HttpClient } from "effect/http/HttpClient";

/** @stability stable */
export interface StableClientPort {
  readonly client: HttpClient;
}
```

Enable `apiStabilityLeak: "error"` and turn `unstableApiUsage: "off"` only in this isolated fixture: expect primary TS377137 on `StableClientPort`, related TS377138 at the less-stable declaration. A control using an owned plain structural type must pass. Own-package tags can independently prove the rule without coupling the oracle to a specific HTTP shape:

```ts
import type * as Effect from "effect/Effect";
export type EffectVersionAnchor = Effect.Effect<void>;

/** @stability unstable */
export interface Preview {
  readonly value: string;
}
/** @stability stable */
export interface StableSurface {
  readonly value: Preview;
}
```

Expected primary leak is still377137. Put this in an ordinary v4 fixture project; do not use the upstream test harness's special `// @effect-v4` directives as a substitute for real package detection. The type-only Effect anchor puts the actual v4 package declarations in the compiler program: upstream discovery scans program source files, not merely package.json dependency declarations, and normalizes unknown detection to v3. Public untagged exports are also considered stable by the rule, but the explicit tag makes the oracle easier to review. Tagging a public leak `@internal` or lowering its claimed stability merely to pass would change the claim and is not a fix. [Version discovery source](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/internal/typeparser/discover.go).

Strict project example:

```json
{
  "compilerOptions": {
    "strict": true,
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "target": "ES2024",
    "lib": ["ESNext", "DOM"],
    "noEmit": true,
    "plugins": [{
      "name": "@effect/language-service",
      "diagnostics": true,
      "includeSuggestionsInTsc": false,
      "ignoreEffectWarningsInTscExitCode": false,
      "ignoreEffectErrorsInTscExitCode": false,
      "diagnosticSeverity": {
        "unstableApiUsage": "error",
        "apiStabilityLeak": "off"
      },
      "allowedUnstableApis": ["effect/http/HttpClient#get"]
    }]
  },
  "files": ["main.ts"]
}
```

The plugin name is upstream's configuration identity; **do not install the legacy JavaScript `@effect/language-service` package**. Its appearance in JSON is not permission to execute that older tool. Other defaults remain upstream defaults; do not invent a wildcard off option to silence unspecified rules.

File override syntax:

```json
{
  "allowedUnstableApis": ["effect/http/HttpClient#get"],
  "overrides": [{
    "include": ["adapters/**/*.ts"],
    "options": {
      "allowedUnstableApis": ["effect/http/HttpClient#post"]
    }
  }]
}
```

The list is replaced, not merged. In adapters, post is allowed and get must fail; outside adapters, get is allowed and post must fail. A module allowlist permits descendants, with path-segment boundaries: `effect/http` must not permit `effect/http-api`. Keep broad module allowances out of the initial production policy.

Evidence: [rule defaults](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/docs/rules/unstable-api-usage.md), [leak semantics](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/internal/rules/api_stability_leak.go), [alias/import negative baseline](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/testdata/baselines/reference/effect-v4/stabilityApiUsageImports.errors.txt), [allowlist/override fixtures](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/testdata/tests/effect-v4/stabilityApiUsageAllowed.ts), [actual4.1.5 HTTP declarations](https://github.com/Effect-TS/effect/blob/e3aca1f1484e623cee09b7f3fa18d6ff5d66c0e8/packages/effect/src/http/HttpClient.ts).

## 6. Minimal independent fixture matrix

Use one strict TS runner with small data-only case records. Do not generate expected diagnostics from the checker's rule tables. A supported diagnostic failure requires the expected code and source location, not any nonzero exit.

| Case | Deliberate oracle |
| --- | --- |
| ordinary TS positive | valid typed assignment, exit0, no diagnostics |
| ordinary TS negative | `export const count: number = "wrong"`; TS2322 and nonzero; not accepted as infrastructure failure |
| defaults | actual unstable usage warns; tsc exits nonzero by default; a separately isolated leak with usage disabled passes because leak rule defaults off |
| enforced actual usage vs import-only | actual get/renamed use→377136; import declarations alone→no377136 |
| explicit stable leak | stable exported interface exposes unstable type→377137; plain owned structural surface passes |
| exact allowlist + aliases | get through renamed import, local alias, namespace passes; sibling post rejects |
| per-file replacement | adapter post passes, adapter get rejects; outside adapter retains base get allowance |
| missing/disabled configuration control | bad Effect pattern can typecheck when plugin/rule absent; required-gate admission must refuse that configuration, not declare enforcement |

Optional ninth case if structured output will be used: the ordinary TS-negative case can return0 with no Effect findings in diagnostic-only mode, and warnings return0 without strict /1 with strict. This is a demonstration of the distinction, never a successful overall gate.

For each run record package/lock/source hashes, platform, binary hash+reported version, exact project inventory, arguments, raw bounded stdout/stderr, exit/signal, elapsed time and source bytes before/after. No snapshots claiming blanket architecture compliance; no throughput or million-line scalability claim from tiny fixtures. Uncertain output capture, unsupported platform/version, missing libs, timeout or cancellation rejects rather than falling back to stock TS.

## 7. Ownership, alternatives, bounded cost

Recommended near-term owner is the engineering-research disposable evidence experiment; if maintained, its TS runner belongs in the repository's real strict required check. Eventual exact package/binary discovery and technical execution fit Stack Toolchain's owner; opt-in policy, allowed APIs, checked source scope and adoption remain consumer/EF configuration. GM owns no compiler diagnostics and EF remains tooling, never runtime.

| Option | Added production/integration LOC | Tests/fixtures/config LOC | Complexity /10 | Achievable scoped reliability /10 | Confidence /10 |
| --- | ---: | ---: | ---: | ---: | ---: |
| native-only isolated experiment using shipped upstream checker | 0 product;100–180 harness/integration |100–180 |3 |8 |8 pending executed fixtures/provenance |
| later bounded Stack opt-in integration, reusing existing process owner |120–220 incremental over experiment |120–200 incremental |5 |8 |6 before release/platform qualification |
| wait for upstream wrapper that removes/lazily avoids forbidden parser |20–60 integration after upstream fix |same corpus |2 |8 |7, timeline unknown |
| own AST/type checker implementation |far beyond bounded experiment |large independent corpus |9 |4 initially |2 |

LOC estimates are design bounds, not measurements or promised final counts; proof metadata/workflow/platform-release work is additional. Do not ship a general plugin framework, compiler fallback abstraction, copied upstream rules, or a source-patched npm artifact. A small data-only runner using the upstream executable is sufficient. A native compiler is a useful implementation choice for tooling; it does not justify changing application language/runtime or adopting every Effect subsystem.

Release, Foundation adoption, cross-platform support and real application-scale performance remain explicit later claims. This review supports proceeding with the **native-only** experiment once the remaining artifact verification gate is complete; it rejects normal wrapper execution in0.73.4.

## Addendum: actual Effect fixture artifact

The complete `effect@4.1.5` archive was inspected inertly after writing the design. Its SHA512 matches registry metadata, and registry ECDSA signatures verify. SRI: `sha512-xyR20KhQI0vg2gD8ILUSQRTTESEYJ0JKdP+QD8J37xbwPTqXRxFM/l0+vUVD9fuSvoYruoTqyt33C4FZv1s4TQ==`. There are no regular/optional/peer dependencies or install/prepare lifecycle scripts. The published `dist/http/HttpClient.d.ts` retains unstable tags on the HttpClient interface, get and post; `dist/http-api/HttpApi.d.ts` retains the unstable make tag. These proposed fixtures therefore use actual shipped declarations. Evidence: `/tmp/effect-preflight-20261124/effect-preflight-static.json`. Full Sigstore verification and fixture execution remain parent-owned.

Exit-oracle clarification: an explicitly nonblocking tsc warning case must set `ignoreEffectWarningsInTscExitCode: true` while keeping errors false. A default warning is nonzero in tsc mode. Do not copy the dedicated diagnostics command's default warning exit0 into the ordinary tsc fixture oracle. Record the exact observed nonzero status after qualification, and require the intended diagnostic code rather than accepting arbitrary failure.

## Addendum: stock TypeScript control execution closure

The complete `typescript@7.0.2` and `@typescript/typescript-linux-x64@7.0.2` published archives were inspected without execution. Root SRI matches the owner's independently retrieved value: `sha512-8FYau96o3NKOhbjKi/qNvG/W5jhzxkbdm5sj9AbZ/5T5sWqn3hJgLfGx27sRKZWTvyzCP8dLRBTf5tBTSRVUNA==`. Native SRI: `sha512-EYdf2cNg7rgCWJnxCdJ+F3V39O8ihb37eHAu1LK8oAFizgTQbPOK7zHHXbPt8rX24COqODXeI3sIf0fCXG7H/A==`. Both registry ECDSA signatures verify against the registry key.

The CLI execution chain is `bin/tsc` → `lib/tsc.js` → `lib/getExePath.js`, using Node builtins and JSON only, followed by native `execve` or `execFileSync`. It does not import the package's separately shipped unstable JS AST/scanner APIs or a legacy compiler. Root optional platform packages are exactly7.0.2; the native package has no JS files, dependencies, scripts or links. Both manifests name gitHead `2bd066d87f5bafd315be9f40889d0a60b9e58e0b`.

The selected stock native binary is 24,101,026 bytes with SHA256 `4f2de678286401759b3fb4475bafe35b8f32b4b3a07d92642bbf37eadc9b34a4`, retained inertly with its adjacent libraries at `/tmp/effect-preflight-20261124/stock-native-reviewed/lib/tsc`. ELF build-info names the same upstream commit, static Go build, CGO_ENABLED=0 and noembed. It records vcs.modified=true; this review does not claim a reproducible pristine-source build. The stock and selected Effect native installations each carry108 `lib*.d.ts` files with identical names and SHA256 hashes; `standard-library-comparison.json` retains this byte-level control comparison.

**Provenance limit:** the stock root/platform registry metadata does not advertise attestations, and their npm attestation endpoints return404. Therefore registry integrity/signature verification is established; Sigstore build provenance verification is not. Preserve this distinction when admitting the existing exact stock control. This does not justify using the forbidden Effect JS wrapper. Evidence: `typescript-preflight-static.json`, `typescript-dist.json`, `typescript-native-dist.json`, `stock-native-buildinfo.txt` in the temporary evidence folder. Installed path revalidation, version probes and compiler runs remain parent-owned.

