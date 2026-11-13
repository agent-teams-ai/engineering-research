---
id: research.studies.task-verification-critical-audit-2026-11-13
type: study
status: active
owner: research/maintainers
summary: Recheck managed OCR and comparator result semantics, refine evidence sufficiency, and tighten the bounded Stage A/B plan without real model calls.
reviewed_at: 2026-11-13
---

# Task Verification: critical architecture and evidence audit, 2026-11-13

## Scope and status

**Observation date: 2026-11-13. Research and bounded executed probes; no real model/provider calls.** This audit extends the [2026-11-12 follow-up](task-verification-architecture-and-routing-follow-up-2026-11-12.md) and qualifies the hypotheses in the [five-options study](task-verification-five-practical-options-2026-11-11.md). It adds exact managed OCR execution, critical inspection of comparator aggregation, and a tighter experimental design. It does not adopt a product ADR, qualify production, or implement Task Verification.

**Recommendation:** retain a small in-process core, resolve criteria through predeclared sufficient machine evidence where possible, and use a semantic reviewer for the remainder. Reuse Account Gateway for model execution and existing consumer publication/acceptance boundaries. The new evidence strengthens the need for a result contract owned by Task Verification. It weakens the assumption that unchanged managed OCR can acquire that contract through prompting alone.

The agreed public experimental repository and **Milestone 1: Stage A/B plan, 4–6 focused hours** remain the collaboration scope. This document does not establish that the repository exists or authorize stable SDK publication, production integration, or support commitments. Hassan's Phase 0 import and the 2026-11-12 frozen evidence are unchanged. The new [evidence bundle](../../evidence/experiments/task-verification-2026-11-13/README.md) is separate dated research evidence.

Read sections 1–2 for the changed implementation choice, 3–5 for the reliability arguments, and 6–8 for the bounded planning handoff. Source inspection, documented behavior, actual native execution and recommendations are distinguished below.

## Evidence and counterevidence

### 1. What changed, and what remains a hypothesis

| Earlier position | New evidence or correction | Practical consequence |
| --- | --- | --- |
| TV-O1 combines machine evidence and a dedicated criteria reviewer | A deterministic comparator is missing from the proposed Stage B comparison; some criteria may already be resolved by approved checks | Make semantic review conditional on unresolved questions. Measure its incremental value beyond receiving a machine fact |
| Exact managed OCR output must be qualified | The released managed binary was executed against synthetic Responses streams. Criterion data placed in assistant text, `task_done` arguments or extra comment fields did not survive as structured criterion results | A prompt change alone is insufficient for the inspected native-result/parser path. TV-O3 needs an explicit output extension or another supported result channel |
| A critic can reduce false findings | Two exact Kodus transformations promote a supplied refutation to `met`/`compliant` without requiring positive satisfaction evidence; the verifier contract also permits retracting unsupported claims | Retracting a violation must not establish satisfaction without positive evidence |
| Complete criterion IDs protect coverage | Kodus can aggregate a mixed run after omitting a failed task; complete IDs also say nothing about subclauses inside a compound criterion | Preserve expected subjects as well as criteria, plus the authored meaning and coverage mapping |
| Expose accuracy and its denominator | Inspect and Harbor distinguish evaluated-system failure, measurement failure and reward validity in different ways | Preserve raw attempts and error origin before exclusions, retries or epoch reduction |
| Four candidates and repeated A/B runs diagnose fit | Repetitions do not create new independent tasks; Stage B selection and prior-verdict carryover can bias the comparison | Keep the full preselected case set, use fresh B contexts for the evidence comparison, and report case/trial counts separately |

These are targeted revisions, not a new measured ranking of competitors. Historical TV-O1–TV-O5 scores and code estimates remain dated judgments. In particular, the earlier TV-O3 estimate must not be interpreted as a verified cost for a prompt-only change: native output extension, parser admission and ordinary-review parity are still unestimated work.

### 2. Exact managed OCR: execution and output boundaries

The probe used the published ReviewRouter managed release **`ocr-v1.13.1-rr.6`**, version **`1.13.1-rr.6`**, with its asset digest verified. Its full identity, commands, scenario inputs, bounded wire summaries and native results are in the [OCR receipt](../../evidence/experiments/task-verification-2026-11-13/ocr/README.md). The inspected Action source remains pinned to `7a079c382d8e98b426ee90a6b3764be2a21b4c49`; a release asset and an inspected source pin are recorded separately, rather than assumed to be interchangeable.

The actual Go binary ran on a tiny synthetic Git repository, with an isolated home/configuration and a local fake Responses provider. There were **10 managed review invocations, one separate version check and 14 local fake-provider POSTs**, including deliberate stream/cancellation cases and one retained incorrect fake filtering response. Separate exact-source parser checks made **9 assertions**. No Account Gateway runtime, backend relay, real provider, semantic model quality or production deployment was exercised.

| Probe | Observed behavior | What it establishes |
| --- | --- | --- |
| Normal completion | Native exit 0 and a complete file-oriented result | A working controlled baseline, not criterion satisfaction |
| Criterion ledger in assistant text, then `task_done` | Native result completes, but the ledger is absent from `native-result.json` | Unstructured assistant text is not a supported retained criterion-result channel in this path |
| Ledger added to `task_done` arguments | Extra criterion data is also absent from the native result | Adding fields to the model's tool arguments does not extend the native result contract |
| Ledger fields added to `code_comment` | After the corrected `approve_all_comments` filter response, an ordinary comment survives; added criterion ID/status/evidence fields do not | Findings retain their review-comment semantics. A comment cannot represent a complete criterion ledger merely by adding JSON fields |
| Unchanged `context.ts` read | The binary calls `file_read`; its second request contains prior history and `function_call_output` | Targeted unchanged-file context is available in this controlled native path |
| Legacy rule shape versus native path rule | An `id`/`content` marker is absent from model input; a native `path`/`rule` marker is present | A concrete input-contract mismatch for the supplied legacy shape |
| Early stream termination and cancellation | Exit 1, partial output, one fake request in each case; no retry in those scenarios | Failure remains visible in these controlled cases; no general recovery or exactly-once guarantee is inferred |
| 8,001 ASCII background characters | Rejected before a fake-provider request | The native boundary rejects this oversize input; the existing Action truncation observation is a different boundary |

**Rule-shape scope matters.** The pinned [production runner][rr-runner] selects `buildOcrControlledRuleText` for legacy Skills. The [invocation adapter][rr-adapter] translates legacy `content` into native `path`/`rule` entries when appending a memory snapshot. Captured Skills already use native rule entries. Consequently, the reproduced mismatch matches the **legacy Skills plus no memory snapshot** source branch. The probe supplied that serialized shape directly; it did not execute the complete production runner or measure a live incident. This is a separate Action follow-up, not a reason to expand Hassan's planning task into a production repair.

**Completion and cost also need precise units.** The successful finding scenario used three model-facing HTTP requests: report a comment, finish, and filter comments. One OCR invocation therefore does not imply one model call. In the controlled differing-model scenario, native `llm.model` retained the requested name despite a different returned provider model string. Record requested model, observed provider metadata and unknowns separately; native metadata alone does not prove the actual routed model.

The observed wire used streaming full-history Responses requests without `previous_response_id`, a Gateway request ID or `max_output_tokens`. The CLI's `--max-tokens 8192` did not become a provider output-token cap in those requests. The adapter must retain distinct request identity, output admission and transport-header responsibilities; blindly forwarding OCR headers is not a qualified Gateway integration. The bundle records this observed wire and a source-derived compatibility mapping, not a runtime Gateway test.

The exact normalization/outcome code was executed with synthetic inputs; the nine assertions are retained separately from native runs. Node's transform-types mode was needed for an upstream TypeScript parameter property. Neither successful execution nor transformation is a strict TypeScript typecheck. The initial unsupported strip-only attempt and the incorrect fake filter response are recorded, not erased from the experiment history.

**Revised TV-O3 decision:** reuse of OCR materialization, tools and model routing is credible; complete criteria output in the unchanged managed result path is not established and the tested carriers lose it. A combined profile remains an option only after a bounded engine/result extension or supported side channel preserves every criterion and passes ordinary-review parity. Scraping human logs or encoding satisfaction as review comments is not a qualified substitute. A separate structured criteria reviewer may be cheaper to establish, but its semantic quality and end-to-end cost remain unmeasured.

### 3. Kodus: preserve uncertainty through critique and aggregation

The inspected source is `kodustech/kodus-ai@f74afbb486bc5434c1190aeb8433d59f6f7847d2`. This is a relevant semantic-review implementation, not evidence about every Kodus deployment or merge policy.

#### 3.1 Retracting a claim does not prove its opposite

The optional [business-rules verifier][kodus-verifier] permits `keep:false` when the diff satisfies the task **or** when the alleged gap is unsupported by the available material. Its [intent-judge transformation][kodus-intent] turns a refuted `missing`/`partial` requirement into `met`; the legacy transformation returns `compliant` and clears findings. The transformations do not require newly established positive evidence.

Two [source-extracted scenarios](../../evidence/experiments/task-verification-2026-11-13/kodus/receipt.json) reproduced those outcomes. The input requirement had `evidence:[]`; the stub verdict said the supplied diff could not establish whether retry existed elsewhere. The resulting requirement was `met` with the same empty evidence array. The legacy case became `compliant`. Exact upstream Git blobs were checked before extraction. These are two executed pure transformations, not two live model judgments or complete service tests.

Counterevidence and limits: this pass is opt-in through `verifyAnalyzerResult`, requires completed analysis without `needsMoreInfo`, and retains the analyzer result if verification fails. In the requirements-array path, it verifies eligible missing/partial entries among the first eight requirements; the legacy path verifies the whole verdict. The prompt also tells the verifier to retain a claim when uncertain. The transformation does not distinguish satisfaction-based refutation from retraction of an unsupported claim. The probe does not establish whether a live verifier would emit the supplied verdict or whether its exact rationale follows every prompt instruction.

For Task Verification, a critic needs distinct effects:

| Critic conclusion | Allowed implication |
| --- | --- |
| The violation is supported | Retain `violated` and its supporting evidence |
| The violation is unsupported; available evidence cannot decide the criterion | Retract that finding and retain `inconclusive` |
| Positive evidence establishes the criterion under the declared policy | Admit `satisfied` with that evidence and its coverage |

This is a semantic invariant, not a required new critic service. TV-O4/O5 should be tested against it if either profile is later justified.

#### 3.2 A missing task can disappear before aggregation

The pinned [business-validation service][kodus-service] returns `undefined` for certain analyzer/parser failures, filters those entries out, and computes `checks.every(c => c.passed)` over remaining checks. A mixed run with one passing task and one omitted failed judgment can therefore produce advisory `passed:true` for the retained subset. The all-failed case is handled separately as `skipped/judge_failed`; this is not an empty-array claim about the entire service.

The [publisher][kodus-publisher] is explicitly comment-only and can still publish actionable partial/manual findings. Its [carry-over processing][kodus-carry-over] operates on existing checks. Therefore this finding does **not** establish a merge bypass or claim that all user-visible information is absent. It establishes why copying the advisory boolean into a stricter acceptance contract would be unsound. This mixed-task path was inspected, not executed as a full service test.

Capture expected subject/task IDs before execution and retain an outcome for each, including unavailable or failed assessments. Then check complete expected criterion IDs within each subject. A first consumer with one PR task can use one subject; this does not require a task hierarchy framework. Missing or inapplicable results must remain distinguishable from explicit satisfaction.

### 4. Evaluation and publication policies must keep their meaning

#### Inspect AI: attribute the failed output to the correct actor

The pinned [scoring policy][inspect-policy] distinguishes malformed evaluated-model output, which can count as incorrect, from an unreadable grader verdict, which can be unscored. Returning `None` creates no score entry and adds no unscored count. With default mean epoch reduction, one correct epoch plus one unscored epoch can become score 1 with no unscored sample in the reduced counts. A sample retry can rerun evaluated generation, whereas an unscored verdict alone does not trigger that retry.

For our experiment, Task Verification is the evaluated system. Its schema/coverage failure is a TV operational or contract failure; it must not quietly disappear as if only the measurement instrument failed. Show semantic accuracy on its stated scoreable subset alongside all-attempt decision coverage and operational success. Retain planned/attempted trials, raw outputs, TV failures, provider/harness failures, grader failures, explicit exclusions, and retries before reduction. This is an experiment-runner responsibility, not a new core analytics service.

#### Harbor and Rewardkit: validity is not success

At the inspected [Harbor error-policy pin][harbor-errors], retry, grading and reward validity are separate decisions. Agent timeout/output limits can retain valid reward; verifier parse/timeout failures invalidate it. Unknown exceptions default to `has_valid_reward=True`, subject to reward presence and the remaining recorded-error policies in [TrialResult][harbor-result]. A valid reward may be zero. Rewardkit's [`on_error:"drop"` branch][rewardkit-source] scores criteria without a valid judge sample as zero rather than removing those criteria; `on_error:"fail"` raises. Separate verifier execution is supported, but [shared execution remains a documented fallback][harbor-separate] when the relevant settings are absent.

Use these systems' explicit attribution and policy separation. Do not compress their behavior into a universal rule that all errors are excluded, or import a reward-eligibility default as a Task Verification acceptance rule. These are source/documentation findings, not executed Harbor/Inspect suites.

#### CodeRabbit: applicability and external check identity are explicit

The current official [Pre-Merge Checks contract][coderabbit] distinguishes native Walkthrough results from directory checks published as GitHub Check Runs. In the supported platform mode, incomplete/inconclusive execution maps to `action_required`; loaded disabled, nonapplicable or overridden definitions map to `skipped`. If review stops before definitions load, the external check may be absent. Identity depends on repository, kind, directory scope and ID, rather than display title. Required-check enforcement is configured in GitHub; a native ignore does not clear it.

The portable lesson is to preserve applicability, loading/execution outcome and stable subject/check identity. The consumer publisher owns platform conclusions, names, required-check configuration and overrides. An absent check is not positive evidence. These are documented product contracts, not an audit of closed source or an executed CodeRabbit run.

### 5. Evidence provenance and complete IDs are necessary but insufficient

There are three distinct questions: **did this trusted execution produce this observation for this candidate; does its oracle actually cover the authored requirement; does the consumer accept that basis?** A signature, digest or complete list of criterion IDs answers neither semantic sufficiency nor final authority.

Consider the synthetic requirement “an unauthorized request returns 401 and creates an audit event.” A trusted test that checks only the status code does not establish the audit event. Returning the one expected criterion ID with `satisfied` still hides a coverage gap. Preserve the authored text and version, plus the admitted criterion-to-check mapping. Any decomposition must retain the complete meaning; a model cannot silently weaken the requirement or generate the independent expected inventory against which its own answer is checked. This counterexample is reasoning, not another executed probe.

Hidden tests reduce the candidate's ability to alter the oracle. They do not establish that the expected value is right, the mapping is sufficient, or a reference implementation is the only valid solution. [PatchDiff's primary study][patchdiff] distinguishes behavioral disagreement with a reference patch from confirmed incorrectness, including invalid differentiating tests and insufficiently specified behavior. Its measured rates do not transfer to our system.

Freeze gold labels and oracle mappings before trials, keep reference answers/fixture class separate from reviewer-visible facts, and preserve disputes rather than silently repairing the criterion to fit a result. A model-generated test can supply useful evidence after its oracle is reviewed; generating it does not automatically authorize it as sufficient. A conflicting or underspecified oracle requires the criterion owner's decision. This fits the existing consumer-owned policy boundary.

## Implications and limits

### 6. Recommended minimal architecture and alternatives

Start with a small in-process feature whose durable authority remains in the consumer. The conceptual responsibilities below are not a proposed package API or an instruction to build five services.

| Responsibility | Minimum contract | Placement |
| --- | --- | --- |
| Capture task and criteria | Exact authored/versioned meaning, independently captured IDs, candidate/basis and explicit applicability | Input adapter and consumer |
| Admit evidence | Producer, attempt, execution outcome, candidate binding, coverage mapping and relevant limitations | Evidence adapter plus deterministic admission |
| Resolve what the evidence establishes | Approved sufficient checks can resolve covered criteria; unresolved semantic questions may invoke a reviewer | Small core and replaceable reviewer port |
| Validate/reconcile results | Full expected subjects/criteria, no unsupported promotion, preserve violations, uncertainty and execution failure | Core/application boundary |
| Publish or accept | Current-basis fence, explicit policy, platform state, permissions and override | Consumer; Work Coordination retains Orchestrator completion authority |

The **zero-model baseline** applies exactly the same predeclared sufficiency policy as the semantic comparison: an observed mismatch against a valid applicable required-behavior oracle establishes that violation; missing required evidence stays inconclusive; a complete sufficient set of passing observations supports satisfaction only under the declared policy and coverage. A setup or execution failure alone does not establish a behavioral violation. No generic green-CI badge or test-count threshold is sufficient. When no such mapping exists, semantic assessment may be the useful starting profile and remains explicitly model-derived.

This refinement is compatible with TV-O1 and its existing condition to remove a reviewer that adds no value. It makes that condition an explicit experiment baseline. Shared materialization and evidence should be reused, but shared infrastructure does not require identical ordinary-review and criterion-result semantics.

| Option | Current recommendation after this audit | What would change the choice |
| --- | --- | --- |
| TV-O1: machine evidence plus semantic assessment | Preferred hypothesis; make semantic assessment conditional on unresolved criteria | Its integration cost exceeds observed incremental value, or evidence mapping is too weak |
| TV-O2: dedicated semantic assessment | Useful simple implementation/comparator when meaningful machine checks are scarce | Sufficient machine observations remove much of its work, or semantic errors exceed tolerance |
| TV-O3: combined ordinary and criteria review | Keep as a conditional optimization; unchanged tested OCR result path loses criterion data | A supported output extension preserves both contracts and demonstrates quality/cost parity |
| TV-O4: selective executable probes | Reserve for concrete disputed behavior with a credible oracle | Repeated failures reveal a bounded class that existing evidence cannot resolve |
| TV-O5: additional critic | Reserve for measured residual errors; preserve uncertainty on retraction | Held-out evaluation shows benefit after cost, correlated error and false promotion are counted |

Reliability should first come from complete contracts, explicit uncertainty and correct acceptance ownership. Adding judges is a hypothesis about semantic error reduction, not an architectural guarantee. Self-reported confidence and agreement between repetitions are diagnostics. [Trust or Escalate][selective-judge] calibrates human-agreement guarantees with labeled data and distributional assumptions; it does not prove code correctness or justify an acceptance threshold on four cases.

The existing **Account Gateway-first** integration recommendation remains. OCR's tool loop needs a bounded multi-request execution through the documented lower-level client composition; the experimental `/llm` SDK entry is a single bounded generation, not a tool-loop session API. Use the organization's pinned Sub2API fork for any direct comparison. The [previous routing section](task-verification-architecture-and-routing-follow-up-2026-11-12.md#5-existing-account-gateway-route-and-the-right-integration-level) records the exact inspected/tested pair and deployment limits. This audit does not upgrade those pins or requalify the live Gateway/backend path.

Scale through the existing execution and consumer storage owners: bounded work, limits, identities and retries, with stateless assessment inputs/results where practical. No throughput, database race or crash-recovery claim follows from the in-memory 12 November spike or these native probes. A new distributed verifier, generic workflow engine, shared trust service or mandatory critic has no demonstrated need in this scope.

### 7. Corrected Stage A/B planning rules

Keep the proposed envelope: **Stage A 24 invocations = 4 candidates × 2 profiles × 3 isolated repetitions; conditional Stage B 12 = 4 × 3, plus 3 drift controls; total 39 if all proceed.** These are reviewer invocations, not necessarily underlying model HTTP requests. Capability qualification, tokens, tool turns and retries need separate accounting. No experimental real model calls have been made by this audit.

1. **Predeclare both stop and continuation conditions.** Reject invalid outputs without accepting the candidate. Stop the batch on missing authorization, unsafe/unsupported execution, systemic capability-qualification failure, or a predeclared error/budget cutoff. Retain isolated result-admission failures as attempted-trial outcomes. A correctly inconclusive A result that the planned evidence can resolve may justify B without first demonstrating an A win.
2. **If B proceeds, retain all four preselected candidates.** Do not select only A's wrong or inconclusive outcomes. Record harmful as well as beneficial changes, including correct-to-wrong and correct-to-inconclusive. For the effect of added evidence, use a fresh context without the prior A verdict; continuing that conversation also measures anchoring. Three drift controls can reveal gross drift, not prove its absence.
3. **Run a deterministic baseline on the same B packets.** This adds no model invocations. Compare the model's incremental semantic contribution with the result already implied by sufficient evidence; separate that from the benefit of receiving the evidence at all.
4. **Keep gold/oracle material separate.** Candidate authorship, expected labels, hidden class names and reference answers do not belong in reviewer input. Admit the selected factual observations. Resolve or label disputed requirements/oracles before interpreting model accuracy.
5. **Use metrics matching each profile's output.** Both profiles can be compared for known violation detection and false findings. Explicit justified satisfaction, criterion coverage and false acceptance apply to profiles that make those claims. Ordinary-review silence is not satisfaction or a criterion-level abstention.
6. **Keep every raw attempt.** Record native completion, criterion result admission, provider/harness failure, grader failure, cancellation and exclusion separately. Never shrink the required criterion inventory or repeat until a convenient positive answer appears. Automatic sample retries change cost and the evaluated procedure.
7. **Report cases separately from repetitions.** Three runs of the same case are isolated trials, not three independently sampled tasks. Show per-case outcomes, raw denominators and model/request counts. Do not calibrate a confidence threshold, quorum or production error rate from this corpus.

For a profile that explicitly makes acceptance claims, two negative cases repeated three times provide **six negative trial opportunities over only two distinct cases**. Even an idealized independent-identically-distributed binomial model with zero errors in six trials has a one-sided 95% upper bound of `1 - 0.05^(1/6) = 0.39303776899708276`, about 39.3%. That calculation is an illustration of small-sample weakness, **not a valid population confidence interval for these hand-selected correlated cases**. Do not compute ordinary-review false acceptance by converting silence into a claim. [Exact binomial methods][nist-binomial] explain the illustrative calculation; [Adding Error Bars to Evals][error-bars] and the [authors' statistical guidance][eval-statistics] explain why question variation, clustering and paired comparisons matter.

The earlier P1/P2/N1/N2 localhost examples remain architecture fixtures, not an unannounced replacement for agreed candidates. Their P2/N2 route diff is the same but their baseline snapshots differ. No semantic quality ranking can be inferred from their deterministic outputs.

### 8. Handoff and limits

Hassan can use this audit to plan three concrete decisions: which accepted observations resolve each chosen criterion without a model; which supported structured reviewer route can cover the remaining criteria; and which A/B outcomes would justify keeping, simplifying or extending that route. The output-loss finding means the plan should list OCR result extension as a dependency if it selects combined OCR. It should not assume the existing native parser already retains a ledger.

The source-traced legacy/no-memory rule mismatch belongs in a separately scoped ReviewRouter follow-up. Gateway reuse remains the consistency default; direct Sub2API means the organization's fork and an explicit statement of omitted Gateway guarantees. No credentials, product files, provider settings, accepted ADRs or live service state were changed by this research.

New executed evidence comprises **10 native OCR review invocations / 14 fake POSTs, one binary version check, 9 exact-source parser assertions, and 2 Kodus transformation scenarios**, with zero real model/provider calls. Counts are separate because they establish different properties. The older 44 local checks and 14 pure-function assertions remain historical receipts; they are not relabeled as native E2E checks. There is no production capacity, fault-tolerance, prompt-injection, ordinary-review parity or semantic-accuracy qualification.

Remaining uncertainty is consequential: which criteria need semantic judgment; whether a separate or combined reviewer performs better; the implementation cost of a robust OCR output extension; how evidence changes model error; and the recovery/performance of the future complete integration. The proposed bounded experiment can reject bad assumptions and guide the next step. It cannot establish production reliability from a tiny corpus.

This document was created using Docs Protocol 0.6.2 preview/apply with exact plan digest `sha256:4c9c3dbbc808ac15916ebad820ca418e060a4eb61d585d7d7502bf9c37c82ee2`. Documentation checks and commit-specific CI are recorded in the PR. They validate this research package, not a production verifier.

## Sources

Code sources are immutable inspected pins. Official product documentation is dated 2026-11-13 and can change. The [new evidence manifest](../../evidence/experiments/task-verification-2026-11-13/manifest.json) records the retained probe files and hashes; the OCR sub-bundle also records exact binary and source identities. Frozen scripts are retained research artifacts with execution limits, not maintained application/tooling code or a new CI gate.

[rr-runner]: https://github.com/777genius/review-router/blob/7a079c382d8e98b426ee90a6b3764be2a21b4c49/src/review-orchestration/infrastructure/production-t0-review-runner.ts
[rr-adapter]: https://github.com/777genius/review-router/blob/7a079c382d8e98b426ee90a6b3764be2a21b4c49/src/review-orchestration/infrastructure/ocr-review-invocation-adapter.ts
[kodus-verifier]: https://github.com/kodustech/kodus-ai/blob/f74afbb486bc5434c1190aeb8433d59f6f7847d2/libs/agents/business-validation/judge/business-rules-verifier.ts
[kodus-intent]: https://github.com/kodustech/kodus-ai/blob/f74afbb486bc5434c1190aeb8433d59f6f7847d2/libs/agents/business-validation/judge/intent-judge.ts
[kodus-service]: https://github.com/kodustech/kodus-ai/blob/f74afbb486bc5434c1190aeb8433d59f6f7847d2/libs/agents/business-validation/business-validation.service.ts
[kodus-publisher]: https://github.com/kodustech/kodus-ai/blob/f74afbb486bc5434c1190aeb8433d59f6f7847d2/libs/platform/application/services/business-logic-publisher.service.ts
[kodus-carry-over]: https://github.com/kodustech/kodus-ai/blob/f74afbb486bc5434c1190aeb8433d59f6f7847d2/libs/agents/business-validation/carry-over.ts
[inspect-policy]: https://github.com/UKGovernmentBEIS/inspect_ai/blob/e4435baa530d05324358bedc3782609c952f9876/docs/scoring-policy.qmd
[harbor-errors]: https://github.com/harbor-framework/harbor/blob/3bf4cb308b886d41c0151a21e7c3b6ec8cb68f07/src/harbor/models/trial/error_policy.py
[harbor-result]: https://github.com/harbor-framework/harbor/blob/3bf4cb308b886d41c0151a21e7c3b6ec8cb68f07/src/harbor/models/trial/result.py
[rewardkit-source]: https://github.com/harbor-framework/harbor/blob/3bf4cb308b886d41c0151a21e7c3b6ec8cb68f07/packages/rewardkit/src/rewardkit/reward.py
[harbor-separate]: https://github.com/harbor-framework/harbor/blob/3bf4cb308b886d41c0151a21e7c3b6ec8cb68f07/docs-mintlify/tasks/separate-verifier.mdx
[coderabbit]: https://docs.coderabbit.ai/pr-reviews/pre-merge-checks#github-check-runs
[patchdiff]: https://arxiv.org/html/2503.15223v2
[selective-judge]: https://proceedings.iclr.cc/paper_files/paper/2025/file/08dabd5345b37fffcbe335bd578b15a0-Paper-Conference.pdf
[nist-binomial]: https://itl.nist.gov/div898/software/dataplot/refman2/auxillar/exacbino.htm
[error-bars]: https://arxiv.org/abs/2411.00640v1
[eval-statistics]: https://www.anthropic.com/research/statistical-approach-to-model-evals
