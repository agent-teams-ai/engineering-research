# Independent adversarial review A

Reviewed 2026-11-03. One bounded read-only source pass; no tests or benchmarks rerun, no remote writes, no author files modified. Scope: `paperclip-deep-audit.md`, `evaluation-methodology.md`, `docs-protocol-inventory.md`, selected implementation/owner sources. Paperclip HEAD independently verified as `61e8d5c7eb097664958e00c30ccd88bb51359043`.

## Disposition

**Publish after narrow corrections; do not expand the research campaign or create more product infrastructure.** The source-backed Paperclip findings are credible and substantially more balanced than a bottleneck list. The material risk is in moving from findings to supposedly comparable design options and rankings. One accepted product decision is inadvertently reopened; several alternatives combine independent decisions; proposed LOC envelopes are not yet scope-complete implementation estimates.

Severity: **High** means correct before making the recommendation operative; **Medium** means clarify before scoring/adopting the specific choice; **Low** is an editorial or future-maintenance improvement. These are research findings, not claims of defects in Agent Teams production.

## Findings and minimum corrections

### A1 — High: D1 reopens an accepted budget baseline and compares different contracts

**Source:** audit lines 127–135; Orchestrator `docs/decisions/0045-three-usage-bounded-contexts.md`, accepted at snapshot `981dd836ca3d35b764561bdc11dc2e0544d83416`; `docs/open-decisions/OD-024-usage-accounting-boundaries-and-exact-quantities.md`; proposed Consumption Governance dossier.

ADR-0045 already assigns soft limits, hard quotas, reservations, capture/release, expiry and consumption decisions to Consumption Governance. It explicitly requires reserve/authorize/capture-or-release with identity, revision, expiry and fencing; every hard policy declares estimates and permitted overshoot. OD-024 leaves exact algorithms/aggregates open. Consequently D1's “which budget promise should the product offer?” and soft-only option are not three equivalent implementations of the accepted product. Escrow is an implementation of strict allowances and can coexist with soft thresholds; it is not a competing product promise either.

**Minimum correction:** state the accepted two-semantics baseline first. Reframe the three alternatives around implementation/staging under that baseline: narrow authoritative reservations plus independent receipt ingestion; initial soft-only delivery explicitly marked incomplete for the full accepted scope; escrow as a later optimization of strict reservation authority. A stricter apples-to-apples table could compare central grant-time reservation, synchronous aggregate/exposure evaluation, and suballocated reservation while preserving soft thresholds in all three. Do not silently adopt or remove hard quotas in the research repository.

Also replace “two small policy branches” with “two separately specified policy contracts sharing usage evidence.” Reservation expiry, period rollover, hierarchical scope locking, uncertain provider outcomes, and late corrections are actual semantics in the owner dossier. “Hard reservation” guarantees a declared authorization allowance; it does not guarantee provider spend cannot exceed the estimate. The draft already says the latter correctly—retain it.

### A2 — Medium: D2's multiple pools need an explicit shared-quota owner

**Source:** audit lines 139–145; Runtime `docs/architecture/capacity-admission-delivery-plan.md`, “Admission and whole-path bounds” and “Fair scheduling”; `docs/spikes/stage-k-capacity-fairness-results.md`, accepted facts/remaining gates, snapshot `4bdc93a43b58469f60ca10c0dca512824650c8ac`.

The recommended one-authority-per-pool architecture is sensible, but option 1 already permits multiple independent pools, while option 2 introduces pool shards. The difference is not explicit enough. More importantly, independent pool authority alone cannot enforce a tenant/global/provider quota shared across pools: two pools can each admit against the same remaining allowance. This is not evidence that the existing plan is wrong; that plan already demands atomic applicable scopes. The decision table needs to preserve that obligation visibly.

**Minimum correction:** define option 1 as one initial pool/no autonomous movement, with any shared quotas checked in the same owning transaction, and option 2 as explicit routing/movement across independently scheduled pools. State that cross-pool shared quota authority must be either an atomic owner or conservatively preallocated finite shares. Do not implement a global allocator now. Record the mapping in existing C0, including one rejecting cross-pool race.

Preserve the Stage K qualification limits verbatim: fixed finite tenant set, persistent eligibility, finite older eligible set, eventual release of needed capacity. The paper correctly avoids a wall-clock promise. For mixed vectors, “eligible” must not be defined to exclude a large request forever while small arrivals consume every release. The existing plan's bounded bypass/reservation candidate handles that obligation; link it rather than inventing another fairness framework. Option 3 is a deployment/extraction choice that can combine with either scheduling option, not a distinct fairness algorithm.

### A3 — Medium: D3 recommends gap complexity before establishing that the owner contract requires gaps

**Source:** audit lines 147–155 and finding 3; Paperclip `server/src/services/heartbeat-run-events.ts:234–270`, `native-runtime/native-run-coordinator-store.ts:246–334`; Runtime `docs/architecture/agent-runtime-architecture-program-s2-operations-storage.md:230–281` and the S3–S5 cursor/continuity contract.

The historical `count(*)` concern is correctly sourced. However, D3 option 1 mixes gap-tolerant receipt ingestion, projection decoupling, and control isolation; option 2 mixes strict input contiguity with synchronous writing. These are independent axes. A strict contiguous canonical writer can use asynchronous projections and isolated control. Paperclip itself has the cheaper strict-contiguity path, which the audit fairly acknowledges. The inspected Runtime plan establishes owned append/attempt semantics but does not, by itself, establish a need for this new gap-tolerant source cursor machine.

**Minimum correction:** make isolated control and rebuildable bounded views common requirements. Prefer the existing owner append contract; use strict contiguous admission where its producer/retry contract permits it. Select an incremental gap checkpoint only if real source delivery requires out-of-order acceptance. Keep historical-growth measurement as the immediate delta.

If gaps are required, name one additional rejecting case: fill the first hole before a very long already-received suffix. Cursor advancement must do bounded work per transaction, durably resume continuation after a crash, and distinguish an individual durable receipt from the highest contiguous prefix safe for producer deletion. Otherwise “incremental” can merely concentrate all historical work into the late-fill transaction. Bound gap state and retained receipt horizons as well as batch size. These are conditions on the existing writer, not authorization for a new service.

### A4 — Medium: the target board risks rating documentation quality instead of the user's assumed completed design

**Source:** methodology line 129; audit opening scope; user task supplied to this review.

The requested own-product comparison assumes selected plans are correctly implemented while leaving unresolved decisions unresolved. “Scores the specificity, coherence and expected fitness of design choices” can instead reward a particularly detailed specification or penalize not-yet-written code. That is a different question. Separating current evidence and target assessment is correct; losing the conditional completed-design comparison is not.

**Minimum correction:** say the target board assesses **expected behavior and tradeoffs assuming the selected plans are implemented correctly**, with explicit open branches for undecided semantics. Treat documentation specificity as confidence, not quality credit. Retain unknown measured capacity and no production-readiness claim. Label any comparison to a competitor's source “conditional architecture comparison”; do not invent unresolved provider, IAM, quota or deployment choices to complete a score.

### A5 — Medium: methodology top-three sets should compare realistic workflows at equivalent scope

**Source:** methodology lines 201–221; “Scenarios and weighting”; docs-protocol inventory “Minimal research adaptation.”

Choice A's three approaches are defensible, but equal weights are a **default preference**, not a neutral or scientific baseline. Thirty criteria and their groupings are normative choices. A3 also bundles simple dominance with more complex outranking; a manually inspected dominance table can be cheaper than totals. The current recommendation to use vectors and manual notes already avoids most of this problem.

Choice B's autonomous scoring-and-publishing engine is an easy-to-reject extreme rather than the strongest third practical option. It changes approval semantics as well as automation effort. This makes B1 look superior without comparing the realistic lightweight alternative: on-demand assisted extraction/diff drafting followed by human source and score review.

**Minimum correction:** call equal weighting “prespecified default.” Keep A1's vectors as the initial output and label automated outranking separately from manual dominance. Replace B3 with human-reviewed, on-demand assisted refresh; retain autonomous publishing in a short rejected-alternatives note. B1 remains a reasonable recommendation. No new scheduler, graph store, scraper or custom policy engine is justified for the first reports.

### A6 — Medium: LOC ranges are useful comparative envelopes, but not complete delivery bounds

**Source:** audit line 125 and all three decision tables; methodology line 203 and both choice tables; Runtime capacity plan “Delivery and evidence”; OD-024 “Required scenarios.”

The explicit exclusions and no-double-counting language are good. I found no basis to replace them with precise larger numbers. But medium confidence in exact sizing is too strong before the named seams and existing implementations are inventoried. D1's unresolved scope/period/correction interactions, D2's cross-pool quota/lease/restart semantics, and D3's gap-retention/continuation semantics can each exceed the small estimated adapter increment. Tests, SQL, native work and operations are excluded legitimately, so these figures must never be read as total implementation effort.

**Minimum correction:** retain the rough ranges as hypotheses, mark sizing confidence **low pending owner seam inventory**, and distinguish `existing/reused`, `new TS`, and `unresolved/excluded` for the selected option in its owner decision. Do not demand that inventory before ordinary S1/S2 or before publishing source research. Methodology A1/B1's **zero new production TS** path should be the actual first delivery; schema/checker estimates are optional follow-up, not a prerequisite to recording the first review.

### A7 — Low: keep source path risks separate from measured bottlenecks

**Source:** audit finding 1/2/3; Paperclip accounting investigation at `doc/plans/2026-11-03-accounting-contention-and-budget-enforcement.md`.

The report already makes this distinction carefully. Preserve it during synthesis: the company lock is a contention boundary, not a fleet ceiling; queued rows are **current queued backlog**, not historical completed work; counting occurs in one gap-tolerant native path, not every ingestion path. Usage receipts are not every text token. No inspected evidence establishes which path dominates an active-agent workload. Add one sentence to the decision summary that these are targeted cost hypotheses selected for transferable lessons, not an exhaustive capacity diagnosis.

## What should survive editing

Source checks confirmed the company lock and shared spend projection writes, all-queued selection before claiming, historical cursor aggregate, alternative contiguous writer, bounded viewer buffers, and actual module boundary rules. The audit preserves Paperclip's strongest evidence: durable command identities, truthful uncertainty, native custody/fencing, control reserve, independent liveness capacity, transaction-safe notifications, substantive modularization, and scoped component stress. Do not remove those to sharpen a competitive narrative. Maintainer tests were inspected, not rerun.

The migration inventory correctly preserves accepted ADR ownership, immutable experiment custody, historical/source status, cross-repository pins, owner-local qualification and existing indexes. Its flat research layout and portable Docs Protocol reuse are proportional. New research should not block the smallest useful product slice, and the fleet campaign belongs to C0–C3 rather than becoming an S1/S2 prerequisite.

## Resolution recommendation

Resolve A1 before presenting D1 as a live product choice. Resolve A2–A4 with brief table/contract edits; no implementation experiment is required for this research PR. Resolve A5 by making the methodology alternatives fairer and A6 by lowering estimate confidence, not adding tooling. The resulting recommendations remain: existing owner-local persistence first; strict reservation semantics where promised; isolated bounded control/evidence paths; manual source-reviewed comparisons; measured extraction only after a concrete pressure or autonomy need. There is no evidence here requiring a new framework, universal scheduler, language rewrite, or first-slice delay.
