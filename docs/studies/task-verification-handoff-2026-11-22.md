---
id: research.studies.task-verification-handoff-2026-11-22
type: study
status: active
owner: research/maintainers
summary: "Current Task Verification research checkpoint, bounded next actions, ownership, decision criteria and links to preserved evidence and reusable library research."
---

# Task Verification: working handoff

**Current checkpoint: 2026-11-23 (D3-R2).** Research direction only; no production adoption. This is the working entrypoint for Hassan and Iliya. Follow the active instructions below, not historical preparation steps.

| Read for | Where |
| --- | --- |
| What to do next | [Remaining experiment](#read-this-first-the-remaining-experiment) |
| What the latest results mean | [Facts and interpretation](#facts-and-interpretation-at-the-frozen-checkpoint) |
| What we are building | [Product objective and boundaries](#product-objective-and-boundaries) and [structured output](#structured-output-distinguish-shape-truth-and-action) |
| How we decide when to stop | [Decision criteria](#measure-useful-decisions-and-recurring-work) and [stopping rules](#stopping-rules-and-the-final-recommendation) |
| Competitors and reusable libraries | [Competitor mechanisms](#competitor-mechanisms-and-the-reuse-decision) and [technology catalog](../technologies/observability-and-prompts.md#structured-output-and-evidence-testing--2026-11-23) |
| Earlier instructions and source research | [Historical record](#historical-record-and-pinned-references) |

## Current state

| Work | State at this checkpoint |
| --- | --- |
| A/B/C record-API pilot | Closed with [one-time erratum](https://github.com/agent-teams-ai/task-verification/blob/77a5eb1d2950facdefd2d3308c3b195336f77d53/synthetic/runs/d12-recheck/ERRATUM-d3-closeout.md); original reports retained. |
| D3 input preparation and initial assessments | Complete at [frozen commit 9367ce4](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/runs/D3-R2-REPORT.md); deterministic packet strategy A selected. |
| D3 adjudication, OCR and conditional recheck | Remaining bounded work described below. No new dependency or model change. |
| Product adoption / M2 PR #2 | Separate decisions; not part of this closeout. |

## D3-R2 decision checkpoint and structured-output reuse — 2026-11-23

**Status:** maintainer-side research review and proposed next actions, not a completed product qualification or an expansion of the USD 1.00 aggregate authorization. Hassan owns the experiment; Iliya owns the product decision. Preserve the original frozen inputs, oracle, raw responses and reports. This checkpoint supersedes the original preparation instructions only where D3 has already completed them.

### Read this first: the remaining experiment

1. **Adjudicate, do not tune against the original oracle.** Retain one consolidated model-free note in the experimental repository: exact v2 requirement, counterexample, observed behavior, intended caller boundary, and accepted action. A passing test over a narrower scenario does not refute a counterexample. The maintainer's earlier local reproductions should be retained/reproduced in the experimental repository; the pinned source and raw claims below are independently inspectable.
2. **Recover the exact qualified OCR artifact and compare on the original c02.** Keep ordinary OCR's real capabilities, same authored criteria, candidate and fixed model profile; do not give OCR the evaluator's answer or the assessor's claims. Verify native result, applicable publication filtering, rule delivery and completion. A partial or refused OCR run cannot be scored as no findings. Preflight request widths, aggregate reservations and actual pricing. If a complete fair run cannot fit, record the specific limit rather than silently replacing the comparator.
3. **One reserved assessment recheck, conditional on the adjudication.** Prefer a corrected derivative of c03: fix only established mandatory contradictions, retain the legitimate external classification/backoff evidence gap, and verify that different allowed hidden policy implementations can yield different behavior with the same reviewer-visible packet. Preserve independently supported obligations. Freeze this derivative and expected outcomes before inference. Keep the model, prompt, output schema and acquisition strategy unchanged for this recheck; it is a development case, not held-out generalization. Do not repair a requirement by weakening its text or add production-grade behavior unrelated to the frozen task. If the control cannot be made clean within the bound, report the missing qualification rather than spending the call to obtain a convenient answer.
4. **Close D3 with one recommendation.** Compare ordinary OCR/checks and the added assessment at the same decision point, including duplicate work and evidence scope. If useful only for finding gaps, a narrower optional advisory use is legitimate; positive acceptance is not automatically qualified. If the extra assessment adds no useful decision, prefer the simpler workflow. No fourth synthetic family, architecture rewrite, model sweep or routine second critic. Next, only if earned and separately scoped, prospectively capture one genuine team task; production integration and M2 PR #2 remain separate.

### Facts and interpretation at the frozen checkpoint

Source: [D3-R2 original report](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/runs/D3-R2-REPORT.md), [execution card](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/EXECUTION-CARD.md), [index](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/runs/D3-R2-INDEX.json), [authored task v2](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/TASK.md).

- Three real one-call criteria assessments completed without retries or refusals; 10 violated, 5 satisfied, zero inconclusive are **raw claim counts**, not accuracy. The 13-file deterministic packet is a useful small-repository preparation result, not a large-repository qualification. Receipts were deliberately absent from the model's input. There is no deployed Gateway integration in this experiment.
- The conservative batch guard records USD 0.05555250 for D3-R2 and USD 0.38515750 remaining after the historical conservative USD 0.55929. The three retained provider response costs sum to USD 0.05555025, slightly lower than the guard's all-input-at-cache-write charge; do not describe the guard figure as the exact provider bill or relax the guard. Account-level settlement and upstream provider identity remain unverified. No new spend is authorized by this document.
- Ordinary OCR was not executed. The [original CI artifact](https://github.com/agent-teams-ai/open-code-review/actions/runs/44924052949/artifacts/14714439075) was listed as unexpired at the prior checkpoint review; recover and verify its exact manifest/binary hash rather than substituting rr.7. The D3 card limits OCR to 15,936 serialized body bytes and eight forwarded requests, whereas the previous complete OCR run reached 62,517 bytes and ten requests. These are historical observations, not a prediction for c02. Use actual offline shapes, sequential admission and retained outstanding reserves; a byte-based token bound is conditional on the provider's serialization/tokenization assumptions, not a universal proof of billed tokens. The existing correction reservation is USD 0.04842; remaining conservative headroom after reserving it is USD 0.33673750. Do not raise the aggregate cap or count a refused comparator as successful.

| Claim | Source-grounded interpretation | Required handling |
| --- | --- | --- |
| c02 C1, payload hash instead of submission key | Confirmed from source and the retained evaluator observations: different payloads with the same key can create two deliveries, while identical keyless submissions can collapse. | Genuine discovered requirement gap. |
| C2/C4, repeated worker invocation | All three worker implementations permit a new target call after a terminal failure while the attempt counter is below three. The store's pending list includes terminal deliveries. The retained checks exercise one invocation only; they do not contradict a later invocation. The maintainer reported local reproductions after 400/410; automatic scheduling in a production worker is not established. | Reproduce once against the pinned fixture; adjudicate the caller boundary and count shared root cause separately from multiple criterion hits. Do not call c01 complete by fiat. |
| c03 C2, absent policy | Its raw reply identifies a terminal-state contradiction and separately requests external policy/receipt evidence. A demonstrated violation of a required conjunct can justify an overall violated status while other conjuncts remain unknown. | The original case does not isolate inability to abstain. Keep the unresolved classification/delay visible even when a different clause fails. |
| C1, header case and empty key | The Request interface accepts a string-keyed map; the implementation recognizes only a lowercase nonempty key. HTTP normalization is normally expected but transport is out of scope and the fixture does not declare its exact input boundary. Empty-key validity is not explicit. | Separate reproduced behavior from contract ambiguity. Do not force extra acceptance requirements without owner clarification. |
| C3, empty subscription ID | Equivalent size/validation code received violated on c01 and satisfied on c02/c03. Empty-string ID is rejected before size; v2 specifies missing/non-string shape validation followed by size. | Real inconsistency; adjudicate the exact valid-input domain without silently amending v2 after results. |
| Null JSON body and concurrent worker calls | Source supports a null-property-access fault; a simple terminal guard addresses sequential re-entry, not concurrent execution. | Record separate review observations where not established as mandatory obligations. Avoid scope expansion. |

Pinned sources: [c01 packet](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/packets/packet-54623dccc8b1.md), [c02 packet](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/packets/packet-65f210381920.md), [c03 packet](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/packets/packet-18bbde350074.md), [original oracle](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/evaluator/ORACLE.json), [original behavior probe](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/evaluator/behavior-probe.mjs), [raw c03 reply](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/runs/attempts/att-c03-criteria-20261123T164113224Z-6d96a7/raw/response.txt). Evidence categories here are source inspection, retained execution records, and earlier maintainer-side reproduction reports; no new provider call or production qualification follows from this review.

### Structured output: distinguish shape, truth and action

The important weakness is not malformed JSON. D3 already returns well-formed structured results. The [frozen experimental schema and decoder](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/lib/task.mjs) provide one status, references, explanation and a single correction string for each criterion. That string conflates a required code change, a request for evidence, clarification and optional advice. A composite criterion can contain both a demonstrated violation and an unresolved obligation. Do not convert that into an apparently complete correction request.

Proposed product direction (not an adopted API): preserve authored criterion identities/text. When a criterion has several mandatory obligations, retain independently scoped claims, their evidence references and their remaining unknowns. If clause identities are required, derive them from a reviewed/frozen interpretation of the authored requirement, not an unconstrained model-invented checklist. For a conjunctive requirement, a small deterministic reducer over admitted, applicable judgments can return violated for a demonstrated required contradiction; satisfied only if all required obligations are supported; otherwise inconclusive. Missing/invalid execution and stale evidence remain separate from a semantic inconclusive finding. Alternative/disjunctive or ambiguous requirements need their explicit semantics, not this conjunctive rule. A typed claim is not an admitted fact merely because it is valid JSON or has a real source reference.

For later consumers, keep the following output categories distinct:

| Category | Reader/agent action |
| --- | --- |
| Supported mandatory violation | Correct the named behavior, with a concrete counterexample or sufficient source basis. |
| Missing evidence | Obtain the named applicable observation or source; not automatically rewrite code. |
| Ambiguous authored obligation | Request an owner decision; do not silently weaken or expand it. |
| Optional code-review observation | Retain as advisory, not a completion gate. |

Keep raw claims and contradictory evidence; resolve references against the frozen inventory and candidate, and do not suppress an ordinary OCR finding because of a criteria status. Deduplicating exact identities is deterministic; grouping different statements as one underlying defect requires justified equivalence, not a text-similarity threshold alone. No model may grant execution authority or commit Work. Reuse the [M2 result contract](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/src/result-contract.ts) and applicability/admission boundaries. For D3 closeout render this distinction in the report; **do not change the frozen wire schema for the remaining recheck**, and do not represent human-adjudicated output as autonomous model quality.

## Product objective and boundaries

The original vision is to assess an immutable deliverable against explicitly supplied, versioned acceptance criteria, identify missing or unverifiable outcomes, and provide actionable feedback. ReviewRouter is the first consumer; Orchestrator is a later consumer. The portable capability returns facts and advisory assessments. Work Coordination retains terminal Work authority.

For the current experiment, Iliya is the report reader and decision owner. Hassan prepares and runs the bounded research. A third independent expert is not required. Independent expected behavior means that reviewer output does not define its own correct answer.

Retain these boundaries:

- Criteria come from the task owner. The model may explain a criterion but cannot silently add obligations, drop a clause or weaken the requested outcome.

- Ordinary OCR findings remain available. A criteria result neither overrides them nor automatically confirms them.

- Results apply to the exact candidate, criteria and assessment profile. Publication, permissions, credentials and final product decisions remain with their existing owners.

- The reviewer reads the candidate. Existing authorized runners produce execution evidence when needed.

- Specification generation, automatic implementation, unrestricted test generation, merge gating, Work completion, a new service/database/queue and a stable cross-product SDK are outside this research.

Source: [product vision](https://github.com/agent-teams-ai/engineering-research/blob/70c680af8b66369a2975a9db21ae081a94f62a5c/docs/studies/task-verification-vision-2026-11-10.md) and [consumer UX](https://github.com/agent-teams-ai/engineering-research/blob/70c680af8b66369a2975a9db21ae081a94f62a5c/docs/studies/reviewrouter-task-verification-ux-2026-11-10.md).

## What the completed research already establishes

| Stage | Established | Limit |
| --- | --- | --- |
| 9–13 November source studies and model-free M2 | Identified reusable review/evidence mechanisms and qualified selected interface behavior. | Not a live comparative accuracy benchmark. |
| A/B/C record-API experiment | Ordinary OCR and the assessor both found the missing CSV route in A. The assessor recognized B's correction and found C's disconnected filter. | Related development cases, manually selected source; no OCR on C. |
| D3-R2 | Mechanical selection worked on a small repository; the assessor found the seeded idempotency issue and raised source-supported additional contradictions. | Oracle adjudication remains open; no qualified OCR comparison or clean positive/uncertainty control yet. |

Keep original raw attempts, checks and evaluator observations in the experiment repository. [A/B/C decision report](https://github.com/agent-teams-ai/task-verification/blob/ed514aede892f7f77451a5d5477a76c6b484ecfc/synthetic/runs/d12-recheck/REPORT-d12-decision.md) · [Closeout erratum](https://github.com/agent-teams-ai/task-verification/blob/77a5eb1d2950facdefd2d3308c3b195336f77d53/synthetic/runs/d12-recheck/ERRATUM-d3-closeout.md) · [D3-R2 execution card](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/EXECUTION-CARD.md).

## Competitor mechanisms and the reuse decision

The [pinned comparison of donor mechanisms](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#competitor-mechanisms-and-the-reuse-decision) records Kodus, Qodo, PR-Agent, CodeRabbit, OCR Behavior/Impact, Agentless, Greploop and ARTEX with exact source references and limitations. The [five practical options](https://github.com/agent-teams-ai/engineering-research/blob/fa207e0111cea294378c57a0561ee4bb15591166/docs/studies/task-verification-five-practical-options-2026-11-11.md) and [critical audit](https://github.com/agent-teams-ai/engineering-research/blob/fa207e0111cea294378c57a0561ee4bb15591166/docs/studies/task-verification-critical-architecture-and-evidence-audit-2026-11-13.md) retain the deeper research. These were source/documentation findings, not measured competitor accuracy. Earlier proposed studies #5/#6 were draft records at this checkpoint; their linked snapshots do not establish product adoption.

The current hypothesis remains reuse of ordinary OCR, existing applicable checks and a bounded criteria assessor when it adds useful decisions. Do not copy a donor's green-check policy as proof of our mandatory task completion. A targeted reproduction is useful when it resolves a specific counterexample; a source reader is useful when the current packet cannot provide the relevant context. Neither implies a new generic execution engine.

## Measure useful decisions and recurring work

For each material requirement, compare the actual reader decision using ordinary available evidence with the added assessment, and record the raw claim, supporting basis, accepted action, remaining manual work and cost. Separate one-off preparation, ordinary inputs and new defect-aware probes. Count duplicate findings, false acceptance, unnecessary required rework and unnecessary evidence requests as possible harm. A valid source reference alone does not establish semantic support.

A single familiar synthetic case cannot establish productivity or population accuracy. A corrected case is development evidence, not held-out evaluation. The goal is useful next action, not agreement with an originally incorrect oracle. See the [original measurement rubric](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#measure-useful-decisions-and-recurring-work).

## Stopping rules and the final recommendation

Finish the planned D3 comparison and at most one justified assessment recheck. Keep the original outputs, record any changed profile and do not spend a reserve solely to improve the expected score. Provide one side-by-side report, accepted feedback, any correction/recheck trace, preparation and execution costs, and one recommended direction with conditions that would change it.

| Observed benefit | Recommendation |
| --- | --- |
| Existing checks and OCR deliver the same useful decisions with less work | Prefer the simpler workflow. |
| Assessment adds a justified correction, evidence request or completion decision | Retain the narrow advisory assessment within the tested scope. |
| Positive completion is unreliable but gap discovery is useful | Limit it to advisory gaps; do not authorize automatic completion. |
| A concrete missing basis prevents a conclusion | Name the gap and close the bounded stage without claiming success. |

Only if justified and separately scoped, capture the next genuine team task prospectively. Preserve the ordinary review path. Production Gateway qualification, opt-in publication, merge gating, Work completion and new dependency adoption remain separate owner decisions. See the [original stopping rules](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#stopping-rules-and-the-final-recommendation) and [implementation scope](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#implementation-scope-and-final-deliverables).

## Library reuse decision (documentation/source review, 2026-11-23)

The complete dated library review now lives in the [Technology and Library Catalog: structured output and evidence testing](../technologies/observability-and-prompts.md#structured-output-and-evidence-testing--2026-11-23). Reuse Gateway and M2; no dependency changes for D3. This cross-product research is not another task for Hassan.

## Collaboration and durable handoff

Keep this document as the current planning and decision navigation point. The experiment repository owns raw attempts, checks, frozen fixtures and the eventual adjudication/final report. Add dated checkpoints here only for a material change in direction, result interpretation or adoption decision; link pinned evidence instead of duplicating logs. In Discord, send the decision, next concrete task and the latest document link; ask Hassan to include the new report path and commit in each material update. A chat thread is not the only record of scope, evidence or the decision. Do not create a new issue, tracking service, or separate library project for every discussion.

## Historical record and pinned references

The full [22 November plan](https://github.com/agent-teams-ai/engineering-research/blob/56df6b530452da5d4a51ba0ba8746b63420d50eb/docs/studies/task-verification-handoff-2026-11-22.md) and [23 November merged checkpoint](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md) remain available byte-for-byte at their immutable commits. The current working page is a navigation and decision record; it does not replace their historical claims or raw evidence.

Further research: [original vision](https://github.com/agent-teams-ai/engineering-research/blob/70c680af8b66369a2975a9db21ae081a94f62a5c/docs/studies/task-verification-vision-2026-11-10.md), [ReviewRouter UX](https://github.com/agent-teams-ai/engineering-research/blob/70c680af8b66369a2975a9db21ae081a94f62a5c/docs/studies/reviewrouter-task-verification-ux-2026-11-10.md), [evaluation plan](https://github.com/agent-teams-ai/engineering-research/blob/70c680af8b66369a2975a9db21ae081a94f62a5c/docs/studies/task-verification-evaluation-plan-2026-11-10.md), [architecture and routing follow-up](https://github.com/agent-teams-ai/engineering-research/blob/fa207e0111cea294378c57a0561ee4bb15591166/docs/studies/task-verification-architecture-and-routing-follow-up-2026-11-12.md). These are pinned draft research sources, not adopted product policy.

### Earlier plan sections (legacy links)

The following section links lead to the preserved planning version. They are historical references, not a second active to-do list.

- <a name="draft-task-verification-handoff-and-plan"></a>[Draft Task Verification Handoff and Plan](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#draft-task-verification-handoff-and-plan)
- <a name="immediate-task-for-hassan"></a>[Immediate task for Hassan](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#immediate-task-for-hassan)
- <a name="reconcile-the-existing-evidence-once"></a>[Reconcile the existing evidence once](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#reconcile-the-existing-evidence-once)
- <a name="adapt-the-donor-policy-to-our-decision"></a>[Adapt the donor policy to our decision](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#adapt-the-donor-policy-to-our-decision)
- <a name="choose-one-assessment-strategy"></a>[Choose one assessment strategy](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#choose-one-assessment-strategy)
- <a name="close-the-current-research-and-prepare-the-next-batch"></a>[Close the current research and prepare the next batch](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#close-the-current-research-and-prepare-the-next-batch)
- <a name="freeze-the-model-input-profile-explicitly"></a>[Freeze the model input profile explicitly](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#freeze-the-model-input-profile-explicitly)
- <a name="cases-that-change-a-decision"></a>[Cases that change a decision](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#cases-that-change-a-decision)
- <a name="keep-source-investigation-and-execution-narrow"></a>[Keep source investigation and execution narrow](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#keep-source-investigation-and-execution-narrow)
- <a name="when-a-targeted-execution-probe-is-justified"></a>[When a targeted execution probe is justified](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#when-a-targeted-execution-probe-is-justified)
- <a name="adoption-after-the-next-bounded-decision"></a>[Adoption after the next bounded decision](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#adoption-after-the-next-bounded-decision)
- <a name="implementation-scope-and-final-deliverables"></a>[Implementation scope and final deliverables](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#implementation-scope-and-final-deliverables)

[Studies index](README.md) · [Documentation map](../README.md)
