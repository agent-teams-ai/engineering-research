# Effect diagnostics qualification: round 2 before implementation

Date: 2026-11-24 UTC. Reviewer: independent architecture/governance reviewer.
Scope: challenge of the parent's revised native-only research experiment plan before implementation. Read-only source/artifact inspection; no installation, compiler execution, application execution, repository edits or PR writes.

## Verdict and ratings

**Proceed with the native-only experiment after correcting the ordinary-tsc warning/exit expectation below.** The revised plan is materially better bounded than running the JavaScript wrapper: direct invocation can reuse the shipped compiler without initializing its bundled TypeScript 5.9.3. Keep this as exact-version experimental qualification, not a supported generic public adapter or EF activation.

| Dimension | Rating /10 | Interpretation |
| --- | ---: | --- |
| Usefulness for the current decision | 9 | Directly determines whether upstream rules can enforce the promised contract under permitted compiler inputs |
| Achievable reliability within this fixture scope | 8 | Strong positive/negative controls are feasible; no claim about general program soundness or all environments |
| Complexity / maintenance burden | 4 | A small fixture harness and one explicit native path; rises if multiple engine selection, caching or generalized reporting is added |
| Confidence in ownership and design fit | 9 | Research-only qualification leaves Stack Toolchain, EF, Get Modular and consumers unchanged |
| Confidence in unexecuted behavioral outcome | 6 | Source supports the route, but fixture results, ordinary CLI formatting, platform behavior and final installed closure remain to be observed |

Ratings are engineering judgments, not measured reliability. The proposed 150–250 harness LOC and 100–180 fixture/configuration LOC are plausible estimates, not a quality target or a reason to omit a necessary negative control. Retain actual LOC separately from dependency/artifact size.

## Inputs independently inspected

- Upstream source: [Effect-TS/tsgo @ aa2db44499067a798028cff9d3b1b9ca1e156f57](https://github.com/Effect-TS/tsgo/tree/aa2db44499067a798028cff9d3b1b9ca1e156f57), package 0.73.4.
- [Support matrix / README](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/README.md) and [upstream metadata](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/_packages/tsgo/upstream.json): 7.0.2 is the pinned latest TypeScript component, provider typescript-go, gitHead `2bd066d87f5bafd315be9f40889d0a60b9e58e0b`.
- Local inert archive `/tmp/effect-preflight-20261124/effect-tsgo-linux-x64-0.73.4.tgz`: inspected its package.json and lib/upstream.json through tar reading, without extracting or executing further artifacts.
- Independently recomputed selected native binary SHA-256 from `/tmp/effect-preflight-20261124/native-reviewed/lib/tsc`: **`18b0b3fdac7d76b8c9b97e64c185ce8d92f2e13ab2307ae18a27fb11a62c045c`**.
- Read the other reviewer's `preflight-static.json`, `native-dist.json` and `registry-signatures-verified.json`. Their recorded archive SRI/payload and signature checks are attributed observations, not checks this reviewer independently reran. Full final installed-closure/Sigstore verification remains the parent's gate.
- Planned Effect 4.1.5 release/source `e3aca1f1484e623cee09b7f3fa18d6ff5d66c0e8` is supplied by the parent; its actual installed content is not qualified by this review.

The native package manifest has no scripts, dependencies or JavaScript entrypoint. The static archive inspection records no JavaScript files or links. It includes multiple native components, so selecting the package version alone does not identify the executed compiler.

The static preflight reports that published wrapper bundle `effect-tsgo.cjs` contains TypeScript 5.9.3 and top-level `require_typescript()` (bundle lines 61587, 63866 and 208719). Do not run the wrapper even for help, setup, patch or diagnostics. A direct path must not reach it indirectly through an imported helper or npm bin alias.

## Findings requiring plan precision

### R2-01 — P1: ordinary tsc warnings do not default to successful exit

The proposed “warning exit 0 versus error nonzero” pair is incorrect unless its exact exit-policy configuration is stated.

At the pinned source:

- [etscore/options.go](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/etscore/options.go#L45-L56) says `ignoreEffectWarningsInTscExitCode` defaults to **false**, so warnings affect ordinary tsc status.
- [etsexecutehooks/init.go](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/etsexecutehooks/init.go#L29-L58) filters only Effect diagnostics according to explicit options and retains ordinary TS diagnostics.
- [Tests](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/etsexecutehooks/init_test.go) distinguish nothing-ignored, warnings-ignored and errors-ignored cases.

Correction: for the intended warning-success fixture set `ignoreEffectWarningsInTscExitCode: true`, keep `ignoreEffectErrorsInTscExitCode: false`, assert the warning is still present, then promote the same rule to error and require a nonzero ordinary compiler result. Add a default-warning control if the report discusses default behavior. Never imply that rule severity alone determines ordinary native-tsc status.

Do not “fix” an unexpected failure by silently enabling `ignoreEffectErrorsInTscExitCode`.

### R2-02 — P1 if conflated: native JSON diagnostics is not the typecheck gate

There are two native entry modes. They must remain distinct:

| Mode | Ordinary TS errors | Warning/status policy | Permitted role |
| --- | --- | --- | --- |
| `lib/tsc -p ... --noEmit` | Preserved | Effect exit options apply; warnings affect status by default | Required strict typecheck and ordinary diagnostic scenario authority |
| `lib/tsc --effect-cli-diagnostics '<JSON>'` | Explicitly filtered from its reported findings | Nonzero on Effect errors, or warnings with JSON `strict: true` | Optional secondary Effect inventory/structured diagnostic observation |

The JSON entry is implemented in [native main patch](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/_patches/typescript-go/001-cmd-tsgo-main.patch) and used by the [wrapper's diagnostics adapter](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/_packages/tsgo/src/cli/diagnostics.ts). This does not require executing that adapter.

The native [collector](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/etsdiagnostics/diagnostics.go#L250-L305) skips files lacking the plugin and filters non-Effect codes. [Run](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/etsdiagnostics/diagnostics.go#L99-L142) does not make a positive filesWithoutPlugin count itself a failing exit.

Smallest scope: use ordinary tsc for this spike and omit JSON mode if stable ordinary output is sufficient. If JSON mode is included, assert exact intended file inventory, no unexplained filesWithoutPlugin, supported Effect v4, and the expected rule/diagnostic list. Never treat empty JSON findings or exit 0 alone as coverage. The ordinary TS2322 case must still fail through ordinary tsc.

### R2-03 — P2: direct lib/tsc is a valid pinned experiment seam, not a floating API

The upstream [path mapping](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/_packages/tsgo/src/patcher/index.ts#L176-L185) maps the TypeScript component equal to the pinned `upstream.tags.typescript.latest` to `lib/tsc`; other versions use versioned artifact paths. At this release that means 7.0.2. The [tsc proxy](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/_packages/tsgo/src/cli/proxy/resolve.ts#L148-L168) checks the artifact, ensures executable permission and delegates argv/env. It adds no essential semantic wrapper needed for the ordinary native compiler.

Pin the package, lock/SRI, binary identity and version metadata; preserve its adjacent matched standard libraries. Verify the installed binary equals the reviewed hash, then check its reported version before scenario execution. Do not copy the binary alone into another directory and accidentally change its lib resolution.

Unsupported OS/architecture or missing native artifact is an explicit unsupported/failure outcome, never wrapper fallback, “best available” version selection or successful skip. This review qualifies only the proposed Linux x64 route, not musl, ARM, macOS or Windows.

The inspected archive is about 130 MB compressed / 334 MB unpacked and contains multiple unused engine builds. This is an observed installation-cost consideration for a later tool-owner decision; it does not turn the small fixture experiment into a scalability benchmark.

### R2-04 — P2: ensure negative controls prove the rule and scope intended

The revised scenario inventory is strong. Make these distinctions explicit in implementation:

- **Bare import:** a control expected not to diagnose unstable usage; it is not proof of protection. It may still trigger unrelated compiler unused-import settings, so choose an explicit fixture config and do not confuse that with the Effect rule.
- **Use and alias:** assert TS377136 at the actual expected use site, with no unrelated compiler failure substituted for the finding.
- **Public stable leak:** isolate apiStabilityLeak from unstableApiUsage so one rule cannot accidentally satisfy the other scenario. The rule advertises codes TS377137 and TS377138; source emits TS377137 as the primary surface finding and TS377138 as related declaration information. Do not flatten related information into “two independent failures” or reject a correct result because the secondary code exists.
- **Exact allowlist plus sibling:** assert the allowed use passes while another export in the same module still fails. A package-wide allowance would otherwise make this a vacuous success.
- **File-scoped exception:** compile both allowed and non-allowed files in the same project. Prove the neighboring file remains checked and rejects; excluding it from the tsconfig is not a scoped exception test.
- **Ordinary TS2322:** keep it independent and require its exact ordinary compiler finding. Also assert that toggling the Effect rule off cannot erase the ordinary type error.
- **Positive stable case:** require the intended files were compiled and a clean status, not merely absence of the target Effect code in arbitrary output.

Sources: [unstable rule](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/docs/rules/unstable-api-usage.md), [leak rule](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/docs/rules/api-stability-leak.md), [alias-use fixture](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/testdata/tests/effect-v4/stabilityApiUsageImports.ts), [leak implementation](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/internal/rules/api_stability_leak.go#L252-L278), [file override options](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/etscore/options.go#L155-L176).

A basic pinned-output assertion is enough; do not create a reusable diagnostic parser/service to support this small corpus. Use stable non-pretty output and bounded normalization, preserve raw stdout/stderr, and define unexpected primary diagnostics as failures.

### R2-05 — P2: harness failure and CI coverage must not masquerade as a rejecting fixture

The strict harness and pre-scenario typecheck resolve Round 1's main source-coverage concern if actually implemented and executed. Keep its tsconfig separate from deliberate negative fixtures. `strict: true`, effective noCheck false, exact source inventory and noEmit must be real settings, not documentation.

Child-process assertions must distinguish:

- expected compiler diagnostic exit;
- missing executable or spawn error;
- timeout/cancellation/terminating signal;
- output truncation or maxBuffer exhaustion;
- unexpected compiler/configuration failures.

A killed process or invalid config is not a successful TS377136 fixture merely because it failed. Use one fixed executable, no shell interpolation, explicit cwd/config and bounded output/time; wait for each process to settle before advancing. This is a small test harness, not a new process supervisor or runtime framework.

A bounded Linux CI job is sufficient if it actually runs the isolated package's strict check before scenarios and is included in the delivery's required evidence. Preserve Docs Protocol. Do not claim branch protection is configured merely because the workflow exists, and do not make absent/unsupported-platform execution a green qualification. Root `pnpm check` may remain portable if the isolated Linux qualification is an explicit separate required delivery route.

## Independent baseline and evidence limits

The optional stock TS7.0.2 comparator adds useful independence, but it is not necessary to unblock this bounded native-rule experiment if its permitted official closure cannot be established. Do not execute an unreviewed JS launcher to obtain it.

If available, match compiler/version/lib inputs as closely as the official artifact permits, retain its identity and report any differences. Test both the stable positive and ordinary TS2322 controls. If unavailable, retain rule-off/native controls and state clearly: **there was no independent stock-compiler comparison**. Rule-off execution of the same patched binary is a within-engine control, not parity against stock TypeScript.

Signed archive/provenance validation and a source commit establish different facts from reproduced source-to-binary build equivalence. Report the checks actually done; the experiment does not need a new reproducible-build project.

## Scope and next decision

No new EF capability, default compiler migration, app integration, npm release, runtime wrapper or organization policy change is needed.

Once the exact experiments and evidence pass, the owning study should choose one disposition:

1. Ready-made native diagnostics work within the qualified envelope; propose the smallest explicit opt-in tool-owner integration.
2. Rules work but the installed cohort or supported execution interface is unsuitable; retain the result and open only the concrete compatibility question.
3. Scope/noise/performance or default-policy behavior does not meet the desired contract; document the counterexample and defer adoption.

For each disposition, preserve the wrapper TS5.9.3 finding and the ordinary-tsc warning policy. These are immediately useful reusable lessons even if no integration follows.

**Implementation readiness:** ready once R2-01's exit configuration is made explicit and R2-02's mode boundary is fixed in the plan. Final acceptance still requires the actual strict check, complete scenarios, exact installed identities, independent review of output and current-head repository gates.

