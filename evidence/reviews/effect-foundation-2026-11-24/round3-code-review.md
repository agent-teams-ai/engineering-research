# Round 3 — Effect diagnostics harness and CI review

Reviewer: `gate_audit`, independent of harness author. Read-only source/evidence review on 2026-11-24, ending approximately 20:16 UTC. No compiler, fixture, package installation, audit command or test was executed by this reviewer; no repository file was modified.

**Final verdict: SOURCE REVIEW PASS. One concrete medium-severity false-green finding was identified and is now closed by the reviewed narrow correction and the author's successful new run. No remaining finding in the bounded harness/manifest/CI scope. Hosted CI and publication are not established by this receipt.**

## Exact final subject

Working source: `/tmp/research-effect-20261124/evidence/experiments/effect-diagnostics-2026-11-24`, with its root package script and `.github/workflows/effect-diagnostics.yml`.

| File / receipt | SHA-256 |
| --- | --- |
| `qualify.ts` | `a42654d31f3217b4acc3fcb2d8cec778a0c8fea679ef2187bb60613d6ab4c3b5` |
| Experiment `package.json` | `9fd36844e893278b9ec077f3577522dd86ba46f6a768fd9266ef30675a64d6e4` |
| `cases.json` | `674f81cc4a9e40f67e24bf37dfe06d80439afc92e6f6fe110e49144c1cd2d58b` |
| `tsconfig.harness.json` | `c4a51fba9b4b6f8ada810faf01ba79326bb53e3ba26a9f945d3df99d3b942912` |
| Root `package.json` | `4bbc0843cd586b09fc210c3572c0ea4f9e766b0f672b1676336b74a8a6c6fc16` |
| Root `.node-version` | `d9f318747a126ce2247661af67852b185def7789492eabfad7bba322be087c33` |
| `.github/workflows/effect-diagnostics.yml` | `853f248787e73da3ba879d96e9d7a46b45faf6134ded26e6a7ba73d81ef03490` |
| `results/latest.json` | `a7d6a50b06ac518fd1befab9b396cc5b00161240357b7024f98eaef89e33af96` |

The final result was observed at `2026-11-24T20:13:54.251Z`. Its complete 32-entry `inputs` map matches the actual current input bytes. SHA-256 of that map serialized as sorted-key JSON without optional whitespace is `671cba39b9ed03433d49b79269201d036f335228a72e7542a6326b547aa5f696`.

## R3-C1 — unknown compiler output could be accepted as expected rejection

**Initial severity: medium; disposition: CLOSED.**

Affected initial source: `qualify.ts` SHA-256 `93f6ea0b66eb73bf2ddc6ced0114630b44e3a50eb29ed52ccc0a8fe5b1878718`, functions `diagnostics()` and `checkResult()`.

The original parser retained only lines containing recognized primary TS diagnostics and silently discarded other output. Negative cases accepted exit status 1 or 2. Therefore a compiler observation containing the complete expected diagnostics followed by `panic: ...` on stdout or stderr and a permitted nonzero status would pass. This is a concrete control-flow false-green, not a claim that the real compiler crashed in the observed run. Signals, launch errors, timeout and output-buffer errors already failed separately.

The final correction requires empty stderr and parses **every nonempty stdout line** as the pinned primary diagnostic format. Unknown output now rejects; unqualified multiline output is not silently accepted. The corpus actually emits one primary diagnostic per nonempty stdout line, so no generic parser framework or speculative continuation support is needed.

Two small synthetic controls pass an expected TS2322 diagnostic plus controlled crash text on stderr or stdout. Each must throw at its precise rejection point. They are wired after the strict harness check and before the real scenario loop; the old parser would make these controls fail. The successful new runner receipt therefore covers their execution without counting them as additional compiler processes.

## Strict coverage and non-vacuity

- The maintained runner is ordinary TypeScript. Its actual stock-native 7.0.2 project explicitly includes `qualify.ts` with strict checking, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitReturns`, no fallthrough and no emission. The final receipt contains the successful `strict-harness` compiler invocation with empty stdout/stderr.
- The 15 scenario configs resolve through exactly 17 config files: all 15 selected configs and the two shared bases. The reviewer computed the current extends closure; there are no orphan config files.
- The source manifest covers all 10 fixture `.ts` files. The runner independently unions the effective `--showConfig` file roots and compares them to the filesystem inventory. Current fixture files are deliberately valid/negative inputs; none is silently omitted.
- All 15 observed effective configurations have `strict: true`, `noEmit: true`, `noCheck: false` and `skipLibCheck: false`. The new explicit `skipLibCheck` assertion preserves that contract. Current configs contain no strict-suboption disablement.
- Every scenario runs an independent stock compiler control and the native Effect compiler. The ordinary TS2322 rejection must occur in both. Effect-only diagnostic cases must remain clean under stock, so an unrelated type error cannot replace the expected Effect finding.
- Expectations compare the complete primary-diagnostic multiset by source file, line, code and category; duplicates, missing records, extra primary records and wrong severity fail. Current cases place the relevant uses on distinct lines, so omission of column matching is not an observed ambiguity.
- Positive and negative controls distinguish stable use, unused imports, actual unstable use, aliases, exact allowlists, override replacement, stable API leakage, a structural port, warning exit policy, absent/disabled plugin and default-off leakage. The latter controls record non-enforcement honestly; they do not establish consumer adoption.

## Execution and input boundaries

The runner invokes only explicitly resolved native binaries from the experiment's installed graph. It validates exact package names/versions, absence of package dependencies/lifecycle scripts for these native packages, fixed executable SHA-256 values, both reported 7.0.2 versions and parity of all 108 standard-library declaration files. The incompatible JavaScript launcher is rejected. There is no compiler fallback, toolchain downgrade, `noCheck`, lifecycle-script execution or recovery-to-success path.

`spawnSync` has a 60-second timeout and a 2 MiB buffer bound. Launch, timeout and output-buffer errors, any signal and a missing status reject. The final observed 48 processes comprise two version checks, one strict runner compilation and three invocations per scenario. All signals are null and all stderr is empty. Every actual rejecting case returned status 1; the allowed 1/2 rejection range no longer hides unknown output.

The source/config/fixture/manifest/lock hashes are captured before checking and compared after it. Reports are written only to the dedicated results directory. The successful receipt's 32 input hashes also match the independently read current files. This is a bounded experiment-input custody check, not a claim that every external CI or operating-system input is hashed.

## Installation, provenance and CI route

The exact private cohort is declared in a single pnpm lock: native Effect tool 0.73.4, stock native TypeScript 7.0.2, Effect 4.1.5, Node types 24.19.2 and transitive undici types 7.24.6. The package check first runs official `npm audit signatures --json --include-attestations`; shell `&&` prevents the runner from starting after a failed audit. The runner rejects nonempty `invalid`/`missing` lists and requires the named Effect/native-tool verification entries. The signature report digest is retained in the result cohort.

The actual final signature-report digest matches the receipt. Its invalid/missing arrays are empty and its verified SLSA provenance entries cover Effect, the Effect native compiler and undici types. This does not claim SLSA provenance for all five coordinates. Fixed binary hashes and stock-native comparison remain separate checks.

The workflow runs on PRs, main pushes and manual dispatch; there is no path filter that omits fixture/config changes. It uses pinned Actions, read-only repository permissions, no persisted checkout credentials, the repository's Node file, disabled package-manager cache, frozen install and disabled lifecycle scripts. `PNPM_MAX_WORKERS=1` bounds the supported pnpm worker pool without weakening integrity controls. The checked root script routes directly to the experiment's package check. There is no `continue-on-error`, success fallback, skipped check condition or swallowed pipeline status. Log retention under `if: always()` does not convert a failed qualification step into success.

This source review approves the recorded workflow bytes. It does not establish a hosted run, cover Windows/macOS or qualify EF/GM/application adoption. Local result Node is 24.22.3; the current CI Node file selects 24.22.1, so hosted evidence must retain its actual runtime separately.

## Completion boundary

The coordinating author may publish these reviewed inputs and run the ordinary current-head CI/admission path. At the final read, `results/local-2026-11-24.json` had not yet been created; the planned immutable copy must match the exact `results/latest.json` hash above before it is claimed as retained evidence. Additional log-printing-only workflow changes can receive a narrow delta review; no new corpus-wide or application-level work is required by this finding.

## Final delta closure — 2026-11-24 20:20 UTC

**PASS; no new findings. The earlier pending frozen-copy check is closed.** The reviewer independently read both retained files:

| Retained file | Verified SHA-256 |
| --- | --- |
| `results/local-2026-11-24.json` | `a7d6a50b06ac518fd1befab9b396cc5b00161240357b7024f98eaef89e33af96` |
| `provenance/npm-signatures-2026-11-24.json` | `9e9ff43602cddaa4c72b4191cd6c46206011a4c90def988479da36e7d546dbe6` |

The signature-file hash equals the frozen result's `cohort.signatureReportSha256`. The frozen result is the exact successful 20:13:54.251Z receipt with 48 observations. All 32 recorded input hashes still match current input files; `qualify.ts` remains `a42654d31f3217b4acc3fcb2d8cec778a0c8fea679ef2187bb60613d6ab4c3b5`. The retained audit's invalid/missing lists remain empty.

Final workflow SHA-256 is **`ad7d7fb8a5cc3f50bb98d64416161624a2aea595b1cf3947b99b7c10c9215ade`**. Its only delta is three lines in the existing `if: always()` log step: conditionally print `results/signatures-latest.json` before printing the qualification result. Removing those exact three lines reproduces the earlier reviewed workflow hash `853f248787e73da3ba879d96e9d7a46b45faf6134ded26e6a7ba73d81ef03490`. No invocation, permission, action pin, trigger, install option, timeout, cache or qualification status handling changed. Failed signature-audit output can now be retained in the same job log.

Root package route and Node-version-file hashes remain the values in the exact-subject table. No compiler rerun was performed by this reviewer. The coordinating author's separate execution of the public root route and Docs check, and subsequent hosted CI, remain separate evidence; this delta receipt makes no hosted-success claim.
