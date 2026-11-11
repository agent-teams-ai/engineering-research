---
id: research.studies.task-verification-five-options-2026-11-11
type: study
status: active
owner: research/maintainers
summary: Source-backed comparison of five practical Task Verification strategies, with scoped reliability judgments, implementation estimates, critical counterexamples and a recommended evidence-first hybrid.
reviewed_at: 2026-11-11
---

# Task Verification: Five Practical Implementation Options — 2026-11-11

## Scope and status

**Observation date: 2026-11-11.** This is decision-support research for the owner's Task Verification initiative and the collaborator's bounded Phase 0 architecture audit. It does not approve a new package, production integration, provider change, Task lifecycle implementation or an amendment to an accepted ADR. The [2026-11-09 combined study](evidence-based-feedback-and-rework-2026-11-09.md) remains a separate historical source audit. The later [vision and Phase 0 proposal in draft PR #5][proposal] is not merged product policy.

The user's question is which **implementation strategy** is most practical, how reliable its design appears, how much new code it would need, and what to borrow critically from open source. We compare five strategies for the **same first software-task scenario**, not five whole frameworks with different responsibilities. Several strategies can evolve from the same small core; implementing all five is not recommended.

Hassan's supplied report separates agent claims, system observations, machine verification, reviewer findings and human decisions, and preserves Work Coordination's completion authority. Its source-only research and incomplete attachment are documented in the earlier study. This comparison preserves that framing; additional findings below are our source inspection and engineering judgments, not conclusions attributed to Hassan.

**Method and limits:** inspected source files, selected test source, project documentation and one reported adversarial reproduction. No paid model evaluation, upstream test-suite execution, performance comparison or production rollout was performed. Three critical passes were performed by the **same research author** from safety, semantic-quality and implementation-cost perspectives; these were not independent agents. The requested `6.1sol xhigh` execution/model selection was not available and is not claimed. Scores are ordinal judgments, not measured model accuracy or a probability that production will be correct.

**Recommendation:** start with **Option 1, an evidence-first hybrid**, using existing CI/test results and one specialized criteria reviewer through an approved ReviewRouter execution adapter. Option 2 is the smaller useful semantic-only experiment. Option 3 is a cheap baseline/possible optimization, not a sufficient acceptance mechanism by itself. Add Option 4 or 5 only for a measured gap.

## Evidence and counterevidence

### 1. Common scenario and comparison rubric

All options receive a fixed candidate, an explicit versioned criterion set, a bounded inspection scope and a consumer-owned evaluation policy. The first consumer is an advisory ReviewRouter check enabled by `## ReviewRouter: Acceptance Criteria` in the authored PR body. Markdown/GitHub are input adapters. The reusable core does not execute shell commands, hold credentials, change the implementation, merge a PR or complete Work. Existing CI or an isolated runner executes tests; ReviewRouter provides the model/reviewer execution route. A subscription is not unlimited or free compute.

The common comparison includes missing functionality outside the diff, correct functionality in unchanged helpers, misleading test claims, criteria changes at the same HEAD, partial reviewer output and a correction that introduces a regression. No option is permitted to interpret missing evidence as a passing mandatory gate. The original planned criterion set, not just the subset returned by the model, defines coverage.

Rubric **TV-options-v1**:

- **Engineering reliability (1–10, higher better):** structural resistance to wrong acceptance and wrong rework for this scenario: evidence strength, explicit uncertainty, coverage, applicable provenance and complexity-induced failure modes. It is an expectation conditional on correct implementation, not the observed accuracy of a model or a donor product.
- **Confidence in this assessment (1–10, higher better):** source-backed confidence in the suitability judgment. It does not mean a model's self-reported confidence. Live semantic accuracy remains unknown for every option; integer scores should be read with roughly one-point granularity.
- **Implementation complexity (1–10, higher harder):** new behavior, state/adapter interactions, test burden and maintenance under the bounded reuse assumptions below.
- **Lines of code:** planning ranges for new, handwritten TypeScript and tests, excluding blanks, generated outputs, lockfiles and vendor code. They are estimates, not measured implementation size. Requirements ambiguity and interface availability can move them substantially; they are not quotas or delivery promises.

| Rank / option | Reliability | Confidence | Complexity | New runtime/integration LOC | Total with tests/fixtures LOC | Recommended role |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| 1. Existing machine evidence + criteria reviewer | 8 | 8 | 6 | 2,300–3,900 | 4,700–7,900 | Preferred first product-shaped experiment |
| 2. Dedicated criterion-by-criterion repository reviewer | 7 | 8 | 5 | 1,700–2,900 | 3,300–5,900 | Smaller experiment when usable CI evidence is sparse |
| 3. One combined review invocation with criteria output | 5 | 6 | 4 | about 1,400–2,400 | about 2,800–4,900 | Low-cost baseline; native output support must be demonstrated |
| 4. Hybrid plus executable counterexample/reproduction probes | 8 | 6 | 9 | 4,500–7,700 | 9,400–15,700 | Later extension for testable disputed/high-risk requirements |
| 5. Hybrid plus independent critic/adjudication | 7 | 6 | 8 | 3,900–6,500 | 8,000–13,200 | Later selective second opinion, not universal majority voting |

These are ranked by present **fit**, not decreasing reliability alone. Option 4 may provide the strongest concrete evidence for a particular behavior, but its test oracle and sandbox burden make it a worse first implementation. Option 5 cannot receive a higher semantic score merely because it calls more models. A human decision can be an explicit consumer-owned escalation in any option; it is not an automatic correctness proof or a separate universal framework.

### 2. Option 1 — Evidence-first hybrid

**Flow:** snapshot criteria/candidate → validate existing CI evidence → evaluate mandatory machine checks → use a specialized model reviewer for semantic gaps → combine typed per-criterion results → return findings and advisory eligibility.

A failed applicable mandatory test is not overturned by an LLM opinion. An inconclusive infrastructure result requests evidence/retry rather than code rework. A passing test satisfies only the behavior it actually exercises: one green build never automatically discharges every acceptance criterion. Independent semantic findings can still expose an untested counterexample or a contradictory requirement.

This combines the strengths of [ReviewRouter's managed run admission][rr-run-tests], [Kodus's requirement investigation][kodus-gap], formal gate separation illustrated by [Gerrit][gerrit], and [our accepted ADR-0072][adr72]. It does **not** require installing Gerrit, Kodus, Inspect, Haystack or a new orchestration framework.

**Strengths:** objective results reduce dependence on model interpretation; unknown and actual failure have different consequences; the same kernel works for tests, documents and future artifact-specific evidence; existing CI and reviewer execution can be reused.

**Weaknesses:** test success is only as meaningful as the chosen assertions; CI provenance and the mapping from a criterion to its checks need a real contract; a test modified by the implementing agent can be weakened to pass. Some requirements will remain unverifiable and require clarification or a human decision. A CI run against a synthetic merge commit must not be mislabeled as a run against the raw PR head.

**Important counterexample:** Inspect's [cascade implementation][inspect-cascade] stops at the first positive score, not at the first authoritative result. Its [tests][inspect-cascade-tests] explicitly allow an earlier `INCORRECT` to be followed by a model's `CORRECT`. That is sensible for an approximate exact-match scorer falling through to semantic grading. It is **not** a safe default for our failed mandatory integration test. We borrow cheap-first routing, but preserve evidence authority and contradictions. No numeric average can wash out a failed required gate.

**Decision:** strongest default for a real software-development task, provided the first adapter consumes a small trustworthy set of existing checks rather than trying to infer a complete test plan automatically.

### 3. Option 2 — Dedicated requirements reviewer with targeted investigation

**Flow:** give a separate read-only reviewer all numbered criteria and a pinned candidate → require one result per criterion → retrieve related source beyond the diff → attach actually observed citations → second-look disputed/missing criteria → return `satisfied`, `violated` or `inconclusive`.

The direct source reference is Kodus's [gap-check implementation][kodus-gap]. It has bounded steps and read windows, allows investigation of unchanged helper code, and validates citations against the lines actually shown to the reviewer. [Scripted regression tests][kodus-tests] reject unread files, out-of-range or blank lines and lines outside the displayed window. These tests protect mechanism behavior; they do not prove LLM accuracy.

**Strengths:** directly targets entirely missing requirements; recognizes an existing implementation outside the PR diff; can be evaluated without building a new execution service; provides concrete criterion-linked feedback. The portable contract remains small.

**Weaknesses:** valid citation provenance does not prove that the cited code satisfies the requirement; the model can miss interactions or misread valid alternative implementations; repository search can be expensive. No runtime behavior has been observed solely because source code looks plausible.

**Two donor limitations not to copy:**

1. Kodus's [check policy][kodus-policy] intentionally permits `PARTIAL`, `CHECK MANUALLY` and `part_of` work without necessarily failing the PR check. Its advisory scope is different from accepting a complete Work item. Our mandatory-criteria policy must not inherit that shortcut.
2. In `gap-check.ts`, a failed `listFiles` call is caught as an empty list, and a failed file read as absence. This can hide an infrastructure problem behind "not found." In our adapter, unsuccessful retrieval must remain explicit uncertainty; absence should only be inferred from a successful appropriately complete search.

Its [paired requirement evaluation][kodus-evals] is a useful methodology: 29 author-created cases with correct/incomplete twins, separate false-gap and missed-gap measurements, and a penalty for requirements omitted from the verdict. This is a usable reference design, not an independent production accuracy guarantee.

**Decision:** best smaller first experiment if requirement completeness is the central uncertainty and a trustworthy CI result interface is not yet ready. Do not report runtime verification for criteria requiring actual execution.

### 4. Option 3 — One combined review invocation

**Flow:** retain the existing reviewer run, add captured acceptance criteria, and request two separate result collections: ordinary code findings and explicit criterion assessments. Validate the returned criterion identities against the full input set. One invocation can contain several model requests.

**Strengths:** less repeated context and orchestration; potentially lowest token/latency overhead; fastest way to establish a comparison baseline when the engine supports both outputs. Existing reviewer credentials and execution controls remain unchanged.

**Weaknesses:** a diff-centered search can miss an entirely absent feature; code-defect review and requirement completeness compete for attention; a unified prompt makes regression attribution harder. A clean comment list is not a criterion report. Resource savings and quality for this mode have not been measured.

**Specific ReviewRouter gap:** the inspected [managed OCR adapter][rr-ocr] is designed around material issues introduced or worsened by changed paths. It does not demonstrate a native, complete per-criterion contract. It also has `OCR_BACKGROUND_HARD_CHAR_LIMIT = 8000`; `boundOcrBackgroundText` truncates the input. Appending acceptance criteria as ordinary background can silently drop the final requirements. A Task Verification adapter must reject oversize criteria, return explicit missing coverage, or use reviewed bounded splitting; it must never call truncated input fully covered.

The existing managed-run tests protect process exit, actual model attribution, unknown execution effects, environment isolation and oversized output handling. Those strengths should be retained, not bypassed for a new prompt mode. The extra output contract must be tested against the exact managed binary; current upstream documentation is not evidence that our pinned managed variant supports it.

**Decision:** compare as a baseline/possible later optimization, not the default acceptance design. The low LOC estimate is conditional on a qualified output extension already being available. If it needs changes to Go patches, managed schema and authorization, this may cease to be the simplest option; return to Option 2 instead of weakening the contract.

### 5. Option 4 — Executable witnesses and counterexample-driven checks

**Flow:** Option 1 identifies an uncertain or disputed criterion → a read-only model proposes a bounded behavioral test or reproduction → an authorized external runner executes it on known snapshots → validate the failure reason and expected behavior → use observed results as scoped evidence → recheck after correction.

The core never executes arbitrary test code. Proposed tests are untrusted artifacts, not policy authority. The test definition, intended observation, runtime identity and results must be recorded independently of the candidate code.

[SWT-Bench's grading code][swt-grading] demonstrates differential test evidence: the generated test must distinguish buggy and fixed behavior while not introducing unrelated failures. Its benchmark has a known reference fix. A live task does **not** usually have that oracle; test validity cannot be inferred by checking that a model-generated patch makes a model-generated test pass.

[Agentless's reranking implementation][agentless] is another practical reference for reproduction and regression checks, but it solves a different decision: choose a patch to submit. It marks minimum-regression-count candidates as best even when that minimum need not be zero; when no candidate passes reproduction it can fall back to regression-only selection. That is best-effort search, **not** permission for Task Verification to declare a task complete.

**Strengths:** a concrete failing request/test is stronger feedback than a textual suspicion; it can expose false reviewer claims; validated tests become useful future regressions; especially attractive for API rules, permissions and deterministic calculations.

**Weaknesses:** generated tests may embody the wrong specification, fail from setup errors, overfit the visible patch or depend on a known benchmark fix. Isolation, dependencies, repeated execution and flakiness add cost. Some criteria (UX suitability, architecture, operational behavior) do not admit one small decisive test. An unsuccessful probe can be inconclusive, not automatically a defect.

**Decision:** selective extension for valuable, testable uncertainties after the basic verifier is measured. Require independent expected behavior and the correct failure reason; do not insist every new feature must already have a gold implementation.

### 6. Option 5 — Independent critic or reviewer panel

**Flow:** Option 1 produces a structured assessment → a separate reviewer inspects the same pinned criteria/candidate, preferably making an initial judgment without the first verdict → compare disagreements → bounded adjudication or explicit uncertainty/human escalation.

Use separate reviewer invocations, identities and captured contexts; different accounts on the same model are not evidence of statistically independent mistakes. A critic that only sees the first review can inherit its missing requirement. Triggering a second pass solely from the first model's low confidence misses confidently wrong conclusions; risk classes or a sampling policy are more defensible triggers.

Useful references are [Inspect's model-grading regression tests][inspect-panel] and our own [ReviewRouter lifecycle aggregation][rr-quorum]. ReviewRouter deduplicates planned provider identities, retains unresolved states when evidence is insufficient, and prevents an explicit still-valid vote from closing a finding. Its rule of at least two resolved votes is a finding-resolution policy, **not** a universal threshold for whole-task acceptance.

Inspect tests a prior failure where dropping a reviewer that produced no parseable result altered the voting denominator and let order decide a tie. A missing configured judge must not silently make a smaller panel sufficient. These are mechanical protections, not proof that consensus is true.

**Strengths:** can catch an individual reviewer's unsupported finding or omitted reasoning; useful on disputed/security-sensitive criteria; reuses existing execution channels rather than adding a new agent platform.

**Weaknesses:** correlated error, anchoring and common incomplete context remain; additional rounds increase latency, cost and chances of false rework; a numeric majority does not overrule trusted failing tests. Full output reconciliation and exhaustion states add substantial code. Positive-only filtering and removal of unavailable reviewers create unsafe shortcuts.

**Decision:** not the initial default for every task. Add only where a paired evaluation shows fewer false acceptances/rejections at an acceptable end-to-end cost. Preserve a stop/unknown outcome instead of debate until agreement.

### 7. Cross-cutting trust issue: observed output is not necessarily trustworthy evidence

The inspected [SWE-bench grading code][swe-grading] contains valuable protections against a test suite never running and against logs that claim success despite a nonzero command exit. However, its `parse_test_exit_code` reads the **first matching textual marker** from the same output stream, and its test-region extraction uses the first delimiter pair.

[Issue #667][swe-issue] reports a reproduction in which candidate-controlled output prints an earlier success marker while the real command later reports failure. We inspected the relevant source and issue; we **did not reproduce the exploit or run SWE-bench**. This is a specific source-level concern in the pinned version, not a claim that all benchmark results are invalid or that every subsequent version remains vulnerable.

For our design, process completion/exit code and runner identity should come through the authorized execution boundary, not be inferred solely from prose that the candidate process can print. Even a real exit 0 does not prove adequate testing: a candidate can weaken tests, change collection or skip assertions. Preserve the selected check definition, expected test inventory and actual observed scope where applicable. A digest/signature proves identity or origin under its trust assumptions, not semantic validity.

### 8. What the earlier research contributes, and what it does not

The earlier [combined audit](evidence-based-feedback-and-rework-2026-11-09.md) contains the detailed pinned inspection of Paperclip, Ruflo, Orca, OpenHands and other references. Their claims were not all refreshed here.

| Reference | Reuse-worthy mechanism | Do not infer |
| --- | --- | --- |
| Paperclip | Enforced review steps and exact-result human approval | A general automatic semantic verifier or authority for our Work |
| Ruflo | Real regression smoke checks and witness history | That marker presence/signature proves task completeness |
| Orca | Feedback batches and worktree-based collaboration | That a worktree is a security sandbox or a moved line proves fresh review |
| OpenHands | Evidence-aware review and explicit unknown publication outcomes | That every experimental publication path is deployed |
| Haystack / Inspect / Pydantic Evals | Evaluator composition, datasets and failure accounting | That an average score authorizes task completion |
| Gerrit | Versioned submit requirements and explicit errors/overrides | That a positive human/model vote is a proof of all requirements |

No donor project is a drop-in, production-qualified implementation of our entire proposed contract. The strongest path is to reuse narrow mechanisms and test the gaps rather than adopt a complete framework or count GitHub stars.

### 9. Code estimates and assumptions

**Shared baseline, counted once in each complete option:** approximately **1,100–1,900 runtime LOC** and **1,000–1,800 test/fixture LOC** for immutable criterion/candidate identities, strict input/output schema, evidence references and applicability, complete criterion coverage, deduplication/current-result checks, narrow ports and a minimal PR input/report adapter. Reuse existing Markdown/schema/tooling libraries; do not create a parser or DI container from scratch.

| Added beyond shared baseline | Runtime LOC | Tests/fixtures LOC |
| --- | ---: | ---: |
| Option 3: combined reviewer profile/normalization | 250–500 | 400–700 |
| Option 2: targeted criteria assessment/read-only investigation | 600–1,000 | 600–1,200 |
| Option 1: CI evidence import/mapping plus semantic reviewer policy | 1,200–2,000 | 1,400–2,200 |
| Option 4: additional to Option 1, probe proposal/validation/results handling | 2,200–3,800 | 2,500–4,000 |
| Option 5: additional to Option 1, critic/adjudication/quorum/exhaustion | 1,600–2,600 | 1,700–2,700 |

Totals in the ranking table are alternatives, **not numbers to sum**. Option 4/5 include Option 1's base; the test corpus is not repeated as separate production packages. Estimated authoring varies substantially with the chosen API and existing reusable surfaces (allow roughly 40–50% planning uncertainty, not a statistical interval).

Excluded: a new model runtime, credential store, container scheduler, database service, stable public SDK, workflow editor, frontend redesign, automatic merge, generalized human-review product, complete Orchestrator integration and production rollout. If ReviewRouter lacks the required machine-readable result access, budget an additional **1,000–3,000 runtime LOC plus relevant tests** for a separately reviewed consumer contract/adapter; do not invent availability or parse free-form bot comments as a stable API. If a new sandbox/CI service is needed, these estimates no longer describe the work.

Phase 0 itself requires **no production LOC**. A small disposable experiment may be much shorter than these retained-feature estimates but must not be advertised as the same delivered scope.

### 10. Three critical passes and resulting corrections

These are explicit **same-author critical perspectives**, not independent reviews or multiple model runs.

| Perspective | Strongest objection | Adjustment to the recommendation |
| --- | --- | --- |
| Safety/adversarial | A forged or stale result can look structured and signed; a required criterion can disappear through truncation | Verify producer authority and actual runner facts, exact candidate/check identity and full criterion inventory; retain unknown; never truncate requirements silently |
| Semantic quality | A reviewer can demand changes to correct code, while several reviewers share the same blind spot | Correct/incomplete twins, unchanged-helper cases, independent expected outcomes, counterevidence and a held-out set; do not infer correctness from consensus/confidence |
| Scope/economics/DRY | A generic evidence platform, new sandbox or mandatory three-model panel could dwarf the useful feature | One small core, one approved model route, one bounded evidence adapter; use additional probes/critics selectively only after measured benefit |

Two candidate shortcuts were rejected after source inspection: copying Inspect's positive-settling cascade as mandatory CI policy, and copying Agentless's best-available-patch fallback as acceptance. Kodus's partial-pass rules were also rejected for required Work criteria, without describing its advisory policy as a defect in its own intended product.

## Implications and limits

### Recommended minimal behavior

A first retained design should accept `CriterionSet`, `CandidateRef`, versioned evaluation policy and typed evidence from adapters. It returns every input criterion exactly once, its assessment/provenance, missing coverage, contradictions and concrete findings. Wrong/duplicate/extra criterion IDs and missing required results must not produce a complete report. Model findings can be advisory even when a mandatory runtime fact is unavailable.

A practical example is `GET /profile`: expected authenticated access, 401 without a token, denial for another user's profile, and updated public contract. Existing CI can demonstrate the two authorization behaviors. The reviewer checks that a required contract or feature was not omitted and investigates unchanged helpers. If CI did not run, report **inconclusive**, not "rewrite the endpoint." If the actual authorization test fails, report a demonstrated violation; a model's positive opinion cannot dismiss it. If the requirement is vague ("works well"), request clarification rather than secretly invent a convenient acceptance rubric.

The initial output is advisory. Work Coordination alone owns readiness/terminal consequences through [ADR-0072][adr72]. Model-based satisfaction remains a typed assessment with a scoped evidence basis, not a universal mathematical proof. Tests and models provide different kinds of evidence; neither automatically establishes all behavior of a complex program.

### Freshness without gratuitous recomputation

A changed candidate or criteria version invalidates the **assessment's applicability**. This need not imply rerunning every unrelated check. Raw test facts for the same artifact, same trusted test definition, environment/configuration and applicable validity may remain reusable when only criteria text changes, provided a **new** assessment explicitly maps them under the new criteria and policy. Do not relabel an old verdict with a fresh digest. If a new criterion requires different behavior/tests, new evidence is necessary. The owning consumer decides reuse rules; this study does not amend existing policies.

For PR integration, changes in the authored criteria section must be distinguished from the bot's generated summary. Handle edits, removal/readdition, duplicated events and late responses. Keep ordinary code review intact; do not needlessly repeat it on a description-only update. Since GitHub checks are commit-scoped, edited-body webhooks alone do not eliminate every merge-time race; keep the initial verification advisory as proposed in [PR #5][proposal].

### Smallest useful comparison before choosing the long-term profile

Recommend one frozen corpus with correct/incomplete pairs, an out-of-diff omission, an unchanged-helper correct implementation, a misleading test report, and a correction that regresses earlier behavior. Add deterministic fault cases for stale criteria, parser omissions, duplicate results and unavailable evidence. Keep a holdout set not used for prompt tuning. Compare the existing ordinary reviewer baseline with Options 2 and 1 under the same candidate/model/tool budgets; Option 3 is only comparable if its criterion output is actually supported.

Measure false acceptance among known-incomplete candidates, false rework among correct candidates, missing-criterion recall, inconclusive/failed-run rate, criterion coverage, end-to-end token/call/time cost and correction yield. Do not exclude infrastructure failures and then present conditional accuracy as overall reliability; publish both. Do not set a universal accuracy threshold after seeing the results. Agree on task-specific quality/cost tolerances before the evaluation. Small-sample zero failures are useful checks, not proof of production reliability.

**Next decision for Phase 0:** assess this recommendation and challenge the standalone-library boundary. If approved, choose one profile and one minimal experiment. Do not implement five frameworks, introduce Temporal/LangGraph inside the verification kernel, select a new account gateway or start production changes from this research alone.

### Documentation delivery limitations

This record follows the existing study metadata/schema and category navigation. The current authoring environment did not provide the repository's supported Node 24/26 runtime or installed pinned Docs Protocol CLI; local `docs:new` preview/apply and the local full catalog check were **not executed**. The documentation PR must report the actual hosted Docs Protocol result separately. No claim of product E2E, native source tests or independent-agent review follows from a documentation CI pass.

## Sources

Source code/test code was read at the following revisions or exact blob identities. Mutable documentation pages were read on 2026-11-11 and are not immutable source qualification. Donor licensing must be checked before copying implementation code; learning a design or test scenario does not imply importing a whole project.

| Source | Inspected scope | Evidence class |
| --- | --- | --- |
| ReviewRouter Action `6988fe0f6eb07c04ee16f2542cf24ecf7689f6cd` | Managed input policy/background limit, run admission tests, thread quorum | Source and selected test source inspected, not executed |
| Kodus `2092395a6fa0eb393951b0198f1ce574ebad9184` | Gap-check, policy and regression tests | Source/test source inspected; gap-check/policy blobs match earlier `b759339...` |
| Kodus `b759339a7435bd8c6064ff349cd7a65c1c5a033c` | 29-case eval methodology | Author-documented harness, not run here |
| Inspect AI `67873ea965f2d5acd46b2327ea17aecff30026c1` | Cascade source/test; panel regression identified in test source | Source inspection; no statistical claim |
| Agentless `5ce5888b9f149beaace393957a55ea8ee46c9f71` | Patch reranking/reproduction fallback | Source inspected; research solver, not a production gate |
| SWT-Bench source ref `be12d4c8e7a5315a6bd60b0cad72736e96a4af3e` | `get_resolution_success` and pre/post test grading | Source inspected; known-gold benchmark boundary |
| SWE-bench `02e7a74ffd0b707aab73d203fe87bdc7c76afc8e` | Text-exit-code parser and result guards; issue #667 | Source plus reporter reproduction, not reproduced here |
| Orchestrator `a34587b313e656eeb43d755b4a4f08c40dff2116` | ADR-0072 | Accepted architecture, not a completed product implementation |

[proposal]: https://github.com/agent-teams-ai/engineering-research/pull/5
[adr72]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0072-atomic-work-completion-evaluation.md
[rr-ocr]: https://github.com/777genius/review-router/blob/6988fe0f6eb07c04ee16f2542cf24ecf7689f6cd/src/review-orchestration/infrastructure/ocr-review-invocation-adapter.ts
[rr-run-tests]: https://github.com/777genius/review-router/blob/6988fe0f6eb07c04ee16f2542cf24ecf7689f6cd/__tests__/unit/review-orchestration/ocr-review-managed-run.test.ts
[rr-quorum]: https://github.com/777genius/review-router/blob/6988fe0f6eb07c04ee16f2542cf24ecf7689f6cd/src/analysis/thread-lifecycle.ts
[kodus-gap]: https://github.com/kodustech/kodus-ai/blob/2092395a6fa0eb393951b0198f1ce574ebad9184/libs/agents/business-validation/judge/gap-check.ts
[kodus-policy]: https://github.com/kodustech/kodus-ai/blob/2092395a6fa0eb393951b0198f1ce574ebad9184/libs/agents/business-validation/check-policy.ts
[kodus-tests]: https://github.com/kodustech/kodus-ai/blob/2092395a6fa0eb393951b0198f1ce574ebad9184/libs/agents/business-validation/judge/gap-check.spec.ts
[kodus-evals]: https://github.com/kodustech/kodus-ai/blob/b759339a7435bd8c6064ff349cd7a65c1c5a033c/evals/business-logic-requirements/README.md
[inspect-cascade]: https://github.com/UKGovernmentBEIS/inspect_ai/blob/67873ea965f2d5acd46b2327ea17aecff30026c1/src/inspect_ai/scorer/_cascade.py
[inspect-cascade-tests]: https://github.com/UKGovernmentBEIS/inspect_ai/blob/67873ea965f2d5acd46b2327ea17aecff30026c1/tests/scorer/test_cascade.py
[inspect-panel]: https://github.com/UKGovernmentBEIS/inspect_ai/blob/67873ea965f2d5acd46b2327ea17aecff30026c1/tests/scorer/test_model_graded.py
[agentless]: https://github.com/OpenAutoCoder/Agentless/blob/5ce5888b9f149beaace393957a55ea8ee46c9f71/agentless/repair/rerank.py
[swt-grading]: https://github.com/logic-star-ai/swt-bench/blob/be12d4c8e7a5315a6bd60b0cad72736e96a4af3e/src/grading.py
[swe-grading]: https://github.com/SWE-bench/SWE-bench/blob/02e7a74ffd0b707aab73d203fe87bdc7c76afc8e/swebench/harness/grading.py
[swe-issue]: https://github.com/SWE-bench/SWE-bench/issues/667
[gerrit]: https://gerrit-review.googlesource.com/Documentation/config-submit-requirements.html
