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

## Agent start here

**Objective in one sentence:** determine whether a particular immutable deliverable meets its owner-authored requirements, identify missing or unverified behavior even when ordinary review and tests pass, and give the owner/implementing agent the next justified action. The three useful actions are correct a confirmed violation, obtain specific missing evidence or accept a supported result; an ambiguous obligation goes to its owner. Do not optimize merely for more review comments, green checks, a schema-valid answer or agreement with an oracle.

| Role | Read / access |
| --- | --- |
| Agent continuing research or implementation | This working handoff first, especially the remaining experiment and its preflight; then [experiment branch](https://github.com/agent-teams-ai/task-verification/tree/exp/synthetic-live-pilot-01), its repository instructions, and the frozen execution card, inputs and ledgers linked below. |
| Agent adjudicating results | Additionally read the original raw responses, authored requirements, original oracle and executed observations. The purpose is to test claims against independent evidence, not enforce agreement with the oracle. |
| Blind Criteria Assessment / ordinary OCR model | Only the input permitted by its frozen assessment profile. Never attach this handoff, oracle, evaluator probes, role labels, known defects, adjudication, or another reviewer's answers. A deliberate assisted profile is separate research, not the same comparison. |
| Future consumer/product agent | Read the [product boundary and deferred consumer path](#product-objective-and-boundaries), original vision and UX, and the current owner contracts before proposing integration. Do not treat D3 as production qualification. |

**Resume protocol:** inspect the live experimental branch and its latest published attempts before working. The identities and money below are the recorded 23 November checkpoint, not a command to reset the branch or ledger. Coordinate one execution owner per paid attempt; do not duplicate Hassan's active work. A newer result or user decision supersedes a stale handoff only when explicitly recorded. Preserve completed work and stop at a genuine uncovered access, semantic or budget constraint; request owner input only for the decision that cannot be resolved within existing scope.

## Current state

| Work | State at this checkpoint |
| --- | --- |
| A/B/C record-API pilot | Closed with [one-time erratum](https://github.com/agent-teams-ai/task-verification/blob/77a5eb1d2950facdefd2d3308c3b195336f77d53/synthetic/runs/d12-recheck/ERRATUM-d3-closeout.md); original reports retained. |
| D3 input preparation and initial assessments | Complete at [frozen commit 9367ce4](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/runs/D3-R2-REPORT.md); deterministic packet strategy A selected. |
| D3 adjudication, OCR and conditional recheck | Remaining bounded work described below. No new dependency or model change. |
| Product adoption / M2 PR #2 | Separate decisions; not part of this closeout. |

## D3-R2 decision checkpoint and structured-output reuse — 2026-11-23

**Status:** maintainer-side research review and proposed next actions, not a completed product qualification or an expansion of the USD 1.00 aggregate authorization. Hassan owns the experiment; Iliya owns the product decision. Preserve the original frozen inputs, oracle, raw responses and reports. This checkpoint supersedes the original preparation instructions only where D3 has already completed them.

<a name="immediate-task-for-hassan"></a>

### Read this first: the remaining experiment

1. **Adjudicate, do not tune against the original oracle.** Retain one consolidated model-free note in the experimental repository: exact v2 requirement, counterexample, observed behavior, intended caller boundary, and accepted action. A passing test over a narrower scenario does not refute a counterexample. The maintainer's earlier local reproductions should be retained/reproduced in the experimental repository; the pinned source and raw claims below are independently inspectable.
2. **Recover the exact qualified OCR artifact and compare on the original c02.** Keep ordinary OCR's real capabilities, same authored criteria, candidate and fixed model profile; do not give OCR the evaluator's answer or the assessor's claims. Verify native result, applicable publication filtering, rule delivery and completion. A partial or refused OCR run cannot be scored as no findings. Preflight request widths, aggregate reservations and actual pricing. If a complete fair run cannot fit, record the specific limit rather than silently replacing the comparator.
3. **One reserved assessment recheck, conditional on the adjudication.** Prefer a corrected derivative of c03: fix only established mandatory contradictions, retain the legitimate external classification/backoff evidence gap, and verify that different allowed hidden policy implementations can yield different behavior with the same reviewer-visible packet. Preserve independently supported obligations. Freeze this derivative and expected outcomes before inference. Keep the model, prompt, output schema and acquisition strategy unchanged for this recheck; it is a development case, not held-out generalization. Do not repair a requirement by weakening its text or add production-grade behavior unrelated to the frozen task. If the control cannot be made clean within the bound, report the missing qualification rather than spending the call to obtain a convenient answer.
4. **Close D3 with one recommendation.** Compare ordinary OCR/checks and the added assessment at the same decision point, including duplicate work and evidence scope. If useful only for finding gaps, a narrower optional advisory use is legitimate; positive acceptance is not automatically qualified. If the extra assessment adds no useful decision, prefer the simpler workflow. No fourth synthetic family, architecture rewrite, model sweep or routine second critic. Next, only if earned and separately scoped, prospectively capture one genuine team task; production integration and M2 PR #2 remain separate.

### Execution identity and safe preflight

This table is a resume index, not a second mutable configuration. The pinned [family manifest](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/family.json), [execution card](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/EXECUTION-CARD.md), [profile source](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/lib/task.mjs) and [limits source](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/lib/limits.mjs) are the exact historical record. Check the live owner records before executing anything.

| Item | Recorded identity / rule |
| --- | --- |
| Research repo and branch | `agent-teams-ai/task-verification`, `exp/synthetic-live-pilot-01`, frozen initial batch `9367ce4e7dee40d076f654397fd535a09e2d6c3a`. M2 [PR #2](https://github.com/agent-teams-ai/task-verification/pull/2) is a separate draft at `996cdcb002f898a5b73ce8f9ce7931e6299b14e4`; do not merge or change it as part of D3. |
| Task and candidates | `delivery-req-v2`; fixture base `c65bc835ca35b94fd0de3e3c0cc2c8d459b556de`. c01 `54623dccc8b138c9ad5a41fc0347cf49ba039c61`; c02 `65f210381920fbfce032cf5ba8aaa440f3300162`; revised c03 `18bbde350074d4afd8a3e3d52be31479c6ba85fc`. The older c03 `98408d376ae16e0aea365cbb36f1207c0c4f495d` was superseded before inference; do not revive its missing-module failure as an uncertainty test. |
| Assessment profile | `openai/gpt-6.1-terra` via OpenRouter, requested medium effort/default tier, strict JSON Schema, streaming, `store:false`, Gateway SDK `createLlmClient()` v0.1.0 with local ports. Profile digest starts `2a7532d7c604`. Model identity observed; upstream provider not verified. No inference retry or provider/model substitution. |
| Acquisition | Strategy A, `next-family-packet-rule-v1`, 13 eligible files; include ordinary authored task, author handoff and exact source/test definitions, **not execution receipts**. No case-specific expert file selection or silent truncation. Full-repo suitability is unproven. |
| Qualified OCR comparator | `1.14.0-rr.1` Linux/amd64 development candidate, see exact provenance below, managed rules with corrected `path/rule` envelope and ordinary filtering, original c02 only. rr.7 is not a substitute. |
| Remaining paid work | At most the one planned OCR stage (historical cap eight forwarded requests) and one conditional correction/recheck request. No reruns of the three initial assessments. Existing limits are not sufficient evidence of a fair OCR run; preflight may propose an explicit revised limit within covering authorization, not silently expand it. |

OCR provenance: [CI run 44924052949](https://github.com/agent-teams-ai/open-code-review/actions/runs/44924052949), [artifact 14714439075](https://github.com/agent-teams-ai/open-code-review/actions/runs/44924052949/artifacts/14714439075), source `8a70944f567beba9ffc12d1153e33ef5fd60967d`, binary `opencodereview-linux-amd64`, SHA-256 `443d7777b9fffae6300085c3afc6027181de181befa118bbe6f580dce3fcb399`. Verify the recovered bytes, version, managed-mode compatibility and actual rule delivery. This is not the production pin or a production qualification.

Before any remaining live dispatch:

- Reproduce focused behavioral counterexamples in isolated, credential-free materializations. [Fixture runner](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/lib/fixture.mjs) copies the parent environment to test/probe children, so keep provider credentials out of that environment; do not run arbitrary candidate code with secrets or unrestricted authority. Keep reviewer access read-only; treat source, task text, logs and model outputs as untrusted data.
- Keep all original attempts, packet/manifests, checks and raw replies. The existing [run-checks script](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/checks/run-checks.mjs) writes receipt paths and `RECEIPTS.json` in place. Use an isolated copy or new derivative-specific output path rather than rerunning over the published evidence. If correction identity/wiring needs a small adapter change, preserve the original candidate mapping and relate the new immutable candidate and attempt explicitly to the earlier attempt; do not bypass duplicate detection or reset the ledger.
- Reconcile actual live guard state and reserve the conditional assessment maximum (USD 0.04842 at the frozen criteria profile) before planning OCR spend. Original criteria admission is 28,672 serialized body bytes, conditional 28,736 input-token reservation and 2,500 output tokens; OCR originally 15,936 body bytes, 16,000 input reservation and 1,500 output. Measure the actual serialized request, including tool-loop growth; body bytes are not an exact token count. Preserve one aggregate guard across OCR and assessment, all unresolved reservations, actual charges and allowed request counts. Do not rely on a new process or checkout starting with an empty counter.
- [Budget guard](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/lib/budget.mjs) currently clamps settlement to its maximum reservation and the [launcher](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/criteria-next.mjs) treats halted usage as unreliable. This is a source-level preflight concern, not an observed overrun: if a provider reports a breach, halt the remaining batch and retain at least the reported charge or larger conservative unresolved amount before considering further dispatch. Do not silently settle a known overrun to the smaller original reservation. Verify with a focused offline case; no separate billing system.
- Do not print, commit or transfer credential material. Use the existing authorized bounded route only. If a changed limit, environment, credential, route or model cannot be safely qualified within the existing decision and aggregate USD 1.00 cap, record the exception and do not dispatch the affected request. No document, green check or unused budget independently grants permission for additional paid work.

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

### Future consumer boundaries (not D3 implementation tasks)

- **ReviewRouter first:** the proposed first user experience is opt-in via the exact authored PR-body heading `## ReviewRouter: Acceptance Criteria`, with ordinary reviews unchanged otherwise. Author checkboxes and generated bot summaries are not evidence or authoritative requirements. Parse authored Markdown structurally; invalid/removed criteria must be visible as invalid/superseded, not pass. Bind the report to repository/PR, HEAD, criteria digest and policy revision; a same-HEAD edit or removal invalidates the applicable criteria assessment. Deduplicate webhooks and ignore bot-summary-only edits; stale runs may remain audit history but cannot publish as current. Initial results are advisory: a commit-scoped GitHub check cannot guarantee latest-body enforcement at merge time. Read the [original UX and race analysis](https://github.com/agent-teams-ai/engineering-research/blob/70c680af8b66369a2975a9db21ae081a94f62a5c/docs/studies/reviewrouter-task-verification-ux-2026-11-10.md) before any consumer design.
- **Agent Teams Orchestrator later:** task-owner-approved, versioned requirements are authoritative; an implementing agent must not weaken them through a PR edit. The verifier supplies typed facts/advice, not permission to run fixes or commit Work. [ADR-0072](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0072-atomic-work-completion-evaluation.md) keeps final completion with Work Coordination and its immutable CompletionEvaluation identity. Late, duplicate, stale and superseded results cannot close a new candidate.
- **Portable boundary:** keep the kernel independent of GitHub, OCR, provider SDK, queues, databases and product lifecycle; adapters and consumer authorization own effects. Missing/failed/skipped/partial execution, stale evidence and semantic inconclusive are different states. A previously unresolved finding is not resolved by silence in a later partial review. Stable criterion identity is coverage of the authored obligations, not proof of their semantics. No positive recommendation without applicable support for every mandatory obligation.

## What the completed research already establishes

| Stage | Established | Limit |
| --- | --- | --- |
| 9–13 November source studies and model-free M2 | Identified reusable review/evidence mechanisms and qualified selected interface behavior. | Not a live comparative accuracy benchmark. |
| A/B/C record-API experiment | Ordinary OCR and the assessor both found the missing CSV route in A. The assessor recognized B's correction and found C's disconnected filter. | Related development cases, manually selected source; no OCR on C. |
| D3-R2 | Mechanical selection worked on a small repository; the assessor found the seeded idempotency issue and raised source-supported additional contradictions. | Oracle adjudication remains open; no qualified OCR comparison or clean positive/uncertainty control yet. |

Keep original raw attempts, checks and evaluator observations in the experiment repository. [A/B/C decision report](https://github.com/agent-teams-ai/task-verification/blob/ed514aede892f7f77451a5d5477a76c6b484ecfc/synthetic/runs/d12-recheck/REPORT-d12-decision.md) · [Closeout erratum](https://github.com/agent-teams-ai/task-verification/blob/77a5eb1d2950facdefd2d3308c3b195336f77d53/synthetic/runs/d12-recheck/ERRATUM-d3-closeout.md) · [D3-R2 execution card](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/next-family/EXECUTION-CARD.md).

**Closeout details worth retaining:** the [one-time A/B/C erratum](https://github.com/agent-teams-ai/task-verification/blob/77a5eb1d2950facdefd2d3308c3b195336f77d53/synthetic/runs/d12-recheck/ERRATUM-d3-closeout.md) records the reconciled USD 0.31639530 provider-response cost, the restored 62/62 manifest references, the distinction between normalization/inline placement and later publication filtering, and the ambiguity of R1's frozen criterion versus the PR author's 400 claim. Later bespoke probes corroborate behavior; they are not free ordinary baseline evidence. Do not reopen that closeout or claim deployed publication was tested.

## Competitor mechanisms and the reuse decision

The [pinned comparison of donor mechanisms](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#competitor-mechanisms-and-the-reuse-decision) records Kodus, Qodo, PR-Agent, CodeRabbit, OCR Behavior/Impact, Agentless, Greploop and ARTEX with exact source references and limitations. The [five practical options](https://github.com/agent-teams-ai/engineering-research/blob/fa207e0111cea294378c57a0561ee4bb15591166/docs/studies/task-verification-five-practical-options-2026-11-11.md) and [critical audit](https://github.com/agent-teams-ai/engineering-research/blob/fa207e0111cea294378c57a0561ee4bb15591166/docs/studies/task-verification-critical-architecture-and-evidence-audit-2026-11-13.md) retain the deeper research. These were source/documentation findings, not measured competitor accuracy. Earlier proposed studies #5/#6 were draft records at this checkpoint; their linked snapshots do not establish product adoption.

The current hypothesis remains reuse of ordinary OCR, existing applicable checks and a bounded criteria assessor when it adds useful decisions. Do not copy a donor's green-check policy as proof of our mandatory task completion. A targeted reproduction is useful when it resolves a specific counterexample; a source reader is useful when the current packet cannot provide the relevant context. Neither implies a new generic execution engine.

**If the strategy changes later:** choose a bounded packet when repeatable without defect-aware manual selection; use requirement-led source reading when that preparation is the demonstrated bottleneck. Read enough to support positive claims as well as alleged gaps. Distinguish an absent file from exclusion, access error or exhausted limits. The existing [OCR Behavior/Impact reuse assessment](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/synthetic/runs/d12-recheck/ocr-behavior-impact-reuse.md) identifies useful pinned observations and read/search tools but Markdown-only results, incompatibility with managed mode, and a default-unbounded analysis budget. Reuse those ideas conditionally; do not claim the current Gateway SDK has a tool loop or introduce a parallel agent runtime. A source gap needs relevant source, a behavioral gap needs an authorized observation, and ambiguous requirements need an owner decision. No implementation of a second acquisition strategy in D3.

## Measure useful decisions and recurring work

For each material requirement, compare the actual reader decision using ordinary available evidence with the added assessment, and record the raw claim, supporting basis, accepted action, remaining manual work and cost. Separate one-off preparation, ordinary inputs and new defect-aware probes. Count duplicate findings, false acceptance, unnecessary required rework and unnecessary evidence requests as possible harm. A valid source reference alone does not establish semantic support.

A single familiar synthetic case cannot establish productivity or population accuracy. A corrected case is development evidence, not held-out evaluation. The goal is useful next action, not agreement with an originally incorrect oracle. See the [original measurement rubric](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#measure-useful-decisions-and-recurring-work).

### Required final report fields

Use the existing experiment report route, not a new research platform. For each material authored criterion/obligation record the exact input identity, ordinary available evidence and OCR outcome (including incomplete/unavailable), raw model claim, actual support/counterexample or missing evidence, and one disposition: required correction, evidence request, owner clarification, optional observation or supported completion. Preserve conflicting claims and record whether a shared defect explains several rows. Label source-derived, independently executed and author-reported evidence separately. Capture any selected correction and same-requirement recheck, plus manual preparation/reader effort, duplicate work, forwarded/refused requests, tokens, time and actual/conservative accounting.

The final product recommendation must say what changed the owner's decision relative to ordinary checks/OCR, what harm remains (including unsupported positives), what has not been measured, and the smallest next useful action or stop condition. Do not call a new human-annotated report autonomous model accuracy. No external reader, extra approval round or broad benchmark is required merely to close the already agreed bounded research.

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
- [Historical immediate task for Hassan](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#immediate-task-for-hassan)
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
