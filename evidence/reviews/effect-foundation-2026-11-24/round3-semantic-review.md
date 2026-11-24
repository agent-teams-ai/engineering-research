# Effect diagnostics qualification: round 3 semantic review

Date: 2026-11-24 UTC. Reviewer role: independent semantic/architecture reviewer.
Scope: actual fixtures, effective ordinary compiler settings, retained stdout/stderr/status observations, and Foundation-first implications. The separate gate reviewer owns the complete runner/CI assessment. This reviewer did not rerun compilers or change repository code.

## Verdict

**The 15-scenario experiment demonstrates the promised narrow semantic behavior on the pinned Linux x64 cohort. No unresolved P0/P1/P2 semantic finding remains in the reviewed corpus and result.** It supports publishing a reproducible, explicitly opt-in research recipe and preparing a scoped Stack Toolchain integration proposal. It does not establish a general supported toolchain profile, EF capability activation, production consumer adoption or whole-program diagnostic soundness.

The warning/default-policy correction from round 2 is implemented and observed. Native-only execution avoided the incompatible JavaScript launcher. The independent stock TypeScript controls make the semantic comparison substantially stronger than a rule-off run of the same patched compiler.

No further optional test is required for the current bounded semantic conclusion. Missing/wrong artifact and malformed configuration qualification become required only if the next integration promises those failure semantics; the current report should not claim those rejection paths were executed.

## Exact reviewed evidence

Inspected experiment directory:

`/tmp/research-effect-20261124/evidence/experiments/effect-diagnostics-2026-11-24`

### Result identity and delta closure

| Evidence | Exact identity / observation |
| --- | --- |
| First retained result, before the gate review's output-parser hardening | `results/latest.json`, observed 2026-11-24T20:09:48.532Z, SHA-256 `cab95ee2c66709ba5b05c3cd98efdb68b698b9c5a327fc5e9893b65f15c2d8a4` |
| **Accepted post-fix result** | `results/latest.json`, observed **2026-11-24T20:13:54.251Z**, SHA-256 **`a7d6a50b06ac518fd1befab9b396cc5b00161240357b7024f98eaef89e33af96`** |
| Reviewed current harness `qualify.ts` | SHA-256 **`a42654d31f3217b4acc3fcb2d8cec778a0c8fea679ef2187bb60613d6ab4c3b5`** |
| Unchanged `cases.json` | SHA-256 **`674f81cc4a9e40f67e24bf37dfe06d80439afc92e6f6fe110e49144c1cd2d58b`** |
| Signature report bound by accepted result | SHA-256 `9e9ff43602cddaa4c72b4191cd6c46206011a4c90def988479da36e7d546dbe6` |
| Input closure | All **32** recorded input hashes independently matched current files; no drift |
| Observation count | **48**: two version invocations, one strict harness check, 15 effective-config observations, 15 stock compiler runs, 15 Effect compiler runs |
| Scenario count | **15**, not 48 independent semantic cases |

The parent plans to retain the accepted bytes as `results/local-2026-11-24.json`. At this review's final filesystem check, that frozen filename had not yet been created. The acceptance here is bound to the SHA above; copying those exact bytes to the retained path preserves the reviewed identity. Verify the destination hash when recording the durable link.

The separate gate reviewer found a real false-acceptance risk: the first parser could discard unknown stdout/stderr surrounding an expected diagnostic. The current source now requires blank stderr and every nonempty stdout line to match the pinned primary-diagnostic format. It includes separate synthetic stdout/stderr crash controls. I inspected that change and the new result; the complete 15-case semantics remain unchanged. The current result therefore replaces the earlier result as the acceptance evidence.

### Independently rechecked physical inputs

| Input | SHA-256 / observation |
| --- | --- |
| Effect native `lib/tsc` | `18b0b3fdac7d76b8c9b97e64c185ce8d92f2e13ab2307ae18a27fb11a62c045c` |
| Stock native `lib/tsc` | `4f2de678286401759b3fb4475bafe35b8f32b4b3a07d92642bbf37eadc9b34a4` |
| Standard libraries | Independently rehashed **108** adjacent `lib*.d.ts` files for each compiler; both complete maps matched each other and the result |
| Actual compiler version stdout | Stock: `Version 7.0.2`; Effect: `Version 7.0.2+effect-tsgo.0.73.4` |
| Runtime / environment | Result records Node v24.22.3, Linux x64, GOMAXPROCS=2 |
| Dependency cohort | `effect@4.1.5`, `@effect/tsgo-linux-x64@0.73.4`, `@typescript/typescript-linux-x64@7.0.2` |

All recorded compiler invocations use one of the two explicit native executable paths. The ordinary harness invocation code contains no wrapper launch and no JSON-only diagnostics invocation. These observations support “zero JavaScript wrapper executions in this qualification route”; they do not purport to audit arbitrary unrelated processes on the host.

The retained npm audit report has empty invalid/missing arrays and verified entries for the Effect package and Effect native package, matching the parent's completed provenance-validation result. The stock package has registry authentication evidence but no published SLSA provenance; do not describe all cohort members as possessing the same attestation class. This review inspected the report and binding hash; it did not independently rerun the signature verifier.

## Scenario-by-scenario semantic assessment

The table describes the accepted post-fix raw outputs. Exit 1 in a negative case is the expected compiler rejection and therefore a passing experiment assertion.

| Scenario | Stock exit | Effect exit | Observed semantic result |
| --- | ---: | ---: | --- |
| stable-effect | 0 | 0 | Stable `Effect.succeed` use accepted with empty output |
| ordinary-type-error | 1 | 1 | Both emit TS2322 at the intentional string-to-number assignment |
| unused-import | 0 | 0 | A bare unused unstable import alone produces no unstable-use finding |
| actual-unstable | 0 | 1 | Native Effect emits TS377136 at the actual `HttpClient.get` call |
| aliases | 0 | 1 | TS377136 at the imported-alias assignment and at both renamed/direct-local-alias calls, lines 3/4/5 |
| stable-leak | 0 | 1 | TS377137 on stable `StableClientPort` exposing unstable `HttpClient`; usage rule is disabled to isolate leak detection |
| structural-port | 0 | 0 | Stable structural port accepted under the same leak-enabled policy |
| exact-allowlist | 0 | 1 | Allowed get survives alias and namespace usage; sibling post alone rejects at line 7 |
| overrides-replace | 0 | 1 | Inside adapter scope, post is allowed and get rejects; outside it, get is allowed and post rejects |
| default-warning | 0 | 1 | TS377136 category warning is printed and still blocks by default |
| warning-nonblocking | 0 | 0 | Same warning remains printed when the explicit warning-exit option ignores it |
| errors-blocking | 0 | 1 | Raising that rule to error blocks despite warning-ignore being enabled |
| leak-default-off | 0 | 0 | Unstable public leak is accepted when leak rule is not enabled |
| missing-plugin | 0 | 0 | Native binary presence alone does not activate the diagnostics |
| disabled-plugin | 0 | 0 | Explicit diagnostics:false disables them despite an error rule entry |

These are substantive controls:

- The stock compiler accepts the Effect-only negative cases, so ordinary TS type errors are not accidentally satisfying their assertions.
- The ordinary TS2322 control proves that the route retains ordinary type checking.
- The alias case tests both imported renaming and a local alias; the previously uncertain line-5 propagation is now observed on this exact artifact.
- Exact allowance and its rejected sibling coexist in one checked file.
- The override scenario checks two actual files in the same project. Both produce the complementary expected finding, proving that the path override did not silently exclude the outside file and that the override list replaces the base list for the matching scope.
- The public leak finding is isolated from unstable-use diagnostics. The selected ordinary output emits only primary TS377137, so no related-info parser assumption was needed.
- Positive structural-port evidence demonstrates that the rule can admit a narrow stable surface; it does not imply that Promise ports are universally preferable to native Effect contracts.

The current `configs/strict.json` has strict=true, noCheck=false, noEmit=true, skipLibCheck=false and additional strict options. All 15 emitted configurations confirm the ordinary compiler settings and explicit root files. The declared 10 fixture TS files are all present in the checked root inventory. This is an experiment inventory, not proof of source coverage in a future consumer repository.

## New reusable lesson: showConfig does not attest Effect activation

Every retained `--showConfig` output omits the Effect plugin/options, including cases whose behavior plainly proves that the Effect rule ran. Therefore:

- It is legitimate to use these outputs as evidence of ordinary strict/noEmit/noCheck settings and explicit file roots.
- They do **not** attest effective Effect severity, allowance, override or plugin activation.
- Config source plus independent behavioral canaries establish those properties in this experiment.
- A future integration must not decide “Effect is enforced” merely from native binary presence, a successful normal compile, or `--showConfig`.

The missing-plugin, disabled-plugin and default-off cases are important counterevidence against such an overclaim. They intentionally pass and explain why explicit adoption is necessary. This is upstream opt-in behavior, not a defect inferred from an absent rule.

## What the successful experiment justifies

### Ready now

1. A pinned research recipe reproducing these exact Linux x64 observations, using the explicit native binaries and retained configuration.
2. A clear usage guide showing good/bad cases for actual unstable use, public leakage, narrow allowances, path-scoped replacement, and severity versus exit policy.
3. A source-backed record of the wrapper's TypeScript 5.9.3 incompatibility and the viable native-only route.
4. A scoped proposal to the existing technical tool owner, informed by executed evidence rather than only upstream documentation.

A suitable status sentence is:

> The native-only Linux x64 diagnostic recipe is qualified against the retained 15-scenario corpus and stock TypeScript 7.0.2 controls; shared-tool integration and consumer activation remain separate owner work.

### Not established by this result

- A released or officially supported general-purpose command/profile.
- Windows, macOS, ARM, musl or other compiler/backend support.
- General soundness for all aliases, re-exports, generic public types, declaration emits, incremental builds or project-reference graphs.
- Any application/runtime migration or EF capability activation.
- Throughput, memory scaling or cost at a large codebase size.
- Cryptographic source-to-binary reproducible-build equivalence.
- Executed malformed-config, missing-native-artifact or wrong-binary rejection paths; current source guards exist, but guards and executed rejection evidence are different claims.

The stock comparison is independent at the artifact/engine level and uses identical standard-library bytes. It is not a comprehensive equivalence proof for two whole compiler implementations.

## Foundation-first next steps

### 1. Finish the retained recipe and study — current delivery

Preserve the first result as historical if retained, make the post-fix identity the active acceptance result, and write the exact reproduction/limitations once. Keep the research corpus and prior PR9 observations distinct by date. Record the gate review's actual parser finding and correction, rather than describing every review as finding nothing.

The cost supplied by the implementing agent is roughly 503 data/fixture/configuration LOC plus a small harness initially around 207 LOC, with the subsequent parser guards added. There is no new application runtime or general compiler implementation. Use actual final counts if the final document reports precise LOC.

The accepted run records a total of 32,694 ms across its 48 commands. That is one sequential execution observation, **not a benchmark** or a meaningful general performance comparison. Avoid turning per-case elapsedMs into an adoption speed claim.

### 2. Consider one opt-in integration at the existing Stack Toolchain owner

The demonstrated missing concern is safe exact selection and evidence for these upstream diagnostics within the existing tool contract. It is not a need for a new semantic analyzer, generic linter framework or EF runtime.

Evaluate whether an explicit opt-in command/integration can preserve:

- exact native engine and standard-library identity;
- ordinary TypeScript failures and diagnostic exit-policy choices;
- explicit consumer source/allowance policy;
- negative behavioral canaries that prove activation;
- cancellation/timeout/output failures as failures;
- no silent fallback to a checker without the semantic rules.

A later engineering-tool consumer can be a real library or repository check; it does not have to be a mature application. Planned/disposable seams remain useful foundation evidence, while the owner records separately when a real repo has actually enabled the shared tool.

Do not implement a new Foundation capability merely because the tool lives in Foundation's monorepo. A capability is justified only if a distinct reusable orchestration/reporting policy is needed beyond the technical tool command.

### 3. Add further cases only where an integration promise creates a concrete risk

For the next actual adapter seam, malformed plugin/configuration and missing/incompatible executable are useful rejecting controls because that adapter would promise fail-closed selection/configuration. A representative inherited-config consumer would also test whether actual adoption canaries remain connected.

Those cases are not prerequisites for accepting the current exact semantic corpus. Do not manufacture a general fault-injection framework or repeat upstream compiler suites to lengthen the checklist. Any future declaration/public-export or incremental-build claim should receive the specific matching proof then.

## Closure against round 2

| Round 2 point | Current disposition |
| --- | --- |
| Ordinary tsc warning status was underspecified | **Closed:** default, explicit warning-ignore and error-blocking behaviors separately configured and observed |
| JSON diagnostics could be mistaken for typecheck | **Closed for this route:** no JSON diagnostics mode used; ordinary TS2322 preserved |
| Native path/adjacent libraries/version identity | **Closed within this cohort:** exact binaries and all 108 adjacent libs independently rehashed; version outputs recorded |
| Alias, allowlist sibling, leak and scope discrimination | **Closed for selected fixtures:** raw findings match independent expected codes/sites |
| Harness failure could masquerade as expected diagnostic | Gate reviewer found and root fixed the concrete parser issue; **post-fix result inspected and accepted** for these semantics |
| Production/default adoption or scale overclaim | Remains an explicit boundary, not unfinished work in the experiment |

**Final semantic review verdict:** accept the current pinned experiment result and proceed with documentation/required repository gates. No further optional semantic tests requested. Final workflow/merge readiness remains with the root and separate gate reviewer.

## Final documentation delta acceptance

Observed after the root's narrow wording corrections, 2026-11-24 UTC. No compiler tests were rerun for this documentation review; code, cases and fixture inputs were unchanged.

Accepted final document identities:

| Document | SHA-256 |
| --- | --- |
| `docs/studies/effect-diagnostics-and-foundation-qualification-2026-11-24.md` | **`b99ab70e0cfe54f6fc0711b95848c62c4990926b21caaa14dd42c276d0cba705`** |
| `evidence/experiments/effect-diagnostics-2026-11-24/README.md` | **`b003a950531f73bb376dc4a955575703be4ecafdb28561e7bcf165a0bae0bef6`** |

The initial documentation snapshot had two P3 precision issues. Both are closed:

1. The study now says allowed **uses** pass within the adapter, while the replacing allowance still rejects get there and the neighboring file keeps the opposite policy. It no longer suggests that either entire file passed; the observed override case correctly returned status 1 with two findings.
2. The README now describes one retained complete input manifest with before/after byte equality verified by the runner. It no longer implies that two separate manifest maps are stored in the receipt.

The completed diagnostic spike is now marked **Completed in this scope** in the next-action table. Its rerun trigger is changed inputs or a new integration boundary, so a successor agent is not instructed to repeat finished work.

All inspected relative links in the study and experiment README resolve, including the workflow, retained result, provenance output and review directory. Both owner-navigation anchors exist in the current local research tree. The workflow's PR/main-push configuration matches the README. Hosted CI remains explicitly separate from the local result, with no premature claim that a configured workflow ran or that branch protection was enforced.

The frozen `results/local-2026-11-24.json` now exists and its SHA-256 is exactly **`a7d6a50b06ac518fd1befab9b396cc5b00161240357b7024f98eaef89e33af96`**, closing the earlier retention-path observation. The retained signature report also matches `9e9ff43602cddaa4c72b4191cd6c46206011a4c90def988479da36e7d546dbe6`. The historical 2026-11-14 study remains byte-identical at **`99fcc362e0d8c579b5d77779dc8651f71fc463ed802213a3566f5567536ed567`**.

The documented disposition accurately follows the evidence: a qualified pinned opt-in research recipe, followed by a scoped comparison of native tool-owner integration versus an upstream launcher fix. There is no claim of default compiler replacement, EF capability activation, production consumer adoption or measured large-codebase capacity.

**Documentation delta verdict: accepted; no unresolved finding remains in these two reviewed documents.** This acceptance is bound to the hashes above. Final source publication and hosted delivery verification remain with the root.
