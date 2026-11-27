---
id: research.lessons.preimplementation
type: lesson
status: active
owner: research/maintainers
summary: Concrete alternatives and priorities inside existing Runtime, Orchestrator and Platform plans.
---

# Preimplementation Decisions

These decisions are bounded refinements inside existing product plans. They are proposed research follow-through, not a new cross-product release gate or a request to reopen accepted choices. Evidence is maintained in the [Paperclip dossier](../competitors/paperclip.md) and [composition and scale study](../studies/composition-and-scale-evidence.md); each product retains applicability and acceptance ownership.

## Priorities before the affected implementation

Current consolidation: **2026-11-27**, from the source-backed D/E cards and
[A9/A10 follow-through](#second-campaign-discriminate-the-remaining-design-decisions)
at [research checkpoint 9f5c0cbc](https://github.com/agent-teams-ai/engineering-research/tree/9f5c0cbc7581d74c28a331f33bc6a1b14d1956ee).
This is the short action index; the linked records retain alternatives and evidence.
P0 means before offering the affected guarantee, not before every unrelated delivery.

| Priority and boundary | Existing baseline | Remaining bounded action and owner |
| --- | --- | --- |
| P0: effect authority and recovery | Execution generations, unknown outcomes and one canonical writer already have owners. | Runtime/provider and Orchestrator OD-032 owners name the actual receiver fence and supported failure profile; retain original command ID/receipt through lost ACK, restore and stale-writer attempts. A lease-only provider cannot advertise receiver-enforced safety. See E2/E5 and A10. |
| P0: hard admission and physical release | C0-C3 already owns atomic grants, bounded fairness, control capacity and reclaim debt; Consumption Governance owns money. | Inventory each quota scope, transaction or finite share, physical resource and release receipt. Cover lease expiry while the process lives. When the selected scope spans independently admitted partitions, cover two partitions spending the last shared slot. Reuse C0-C3/D2; commercial reservations remain D1/OD-024. |
| P0: causal activation and bounded data | OD-033 and output/event owners already describe causal budgets, durable waits, replay and backpressure. | Choose the dependent wait/wake protocol; cover self-wake without progress, explicit user stop, unknown effect and stale replay. Name count/byte/time limits and real DB/RPC/provider resources reserved for cancel/renew/reclaim. Owners: OD-033/026/027, output owners and Runtime S2/C0-C3; D3/A10. |
| P0 when extending live-update profiles | The finite cooperative LMU profile is retained; streams, self-handover and recyclable realms are separate extensions. | LMU and the EF loader/Host owner select the relevant A9 mode. Specify lifetime through actual stream consumption, detached self-update intent, original cleanup and cumulative evaluation budgets. Logical retirement does not promise Node ESM unloading. |
| P0 before selective replacement | GM owns composition facts; LMU owns the replacement plan. The finite whole-composition profile does not require minimal-subgraph replacement. | The LMU planner compares old/new dependencies, bindings, resource owners and compatibility. Preserve unrelated/shared owners; include affected dependants outside one root closure. Use A10's A/B/C/D case; no second graph compiler. |
| P0 before durable plugin/state contracts | Artifact identity, installation permission, runtime authority and versioned state are separate; owner invariants remain authoritative. | State and extension owners define the compatibility horizon, old readers/writers, replay/cleanup paths and allowed migration. Rollback uses fresh authority. Name actual containment for an untrusted profile; a signature or Worker alone is insufficient. Use E6, EF OD-003 and Orchestrator OD-043. |
| P0 before hosted partition/routing schemas | ADR-0079/0048/0065 retain placement, logical transfer and successor ownership. | Orchestration Scope retains project-to-runtime binding authority. Record stable logical identity, initial placement scope and hot-tenant workload before physical keys. A future cross-cell move separately preserves receipts, deduplication, custody and pending obligations; no implicit active-Run relocation. Owners: deployment/OD-038/039, Platform installation and AR C0; A9. |

### Owner follow-through for competitive plugins

The owner's expanded request on 2026-11-27 requires competitive modularity,
plugins and live updates as target outcomes. The [plan-level comparison](../technologies/modularity-and-extension-contracts.md#plan-level-plugin-parity-target-2026-11-27)
acknowledges competitors' substantial lifecycle designs and distinguishes
target architecture from executed guarantees. The following existing owner
records hold the concrete acceptance refinements; publication state remains
visible in each linked commit or PR.

| Owner and publication record | Existing document and required follow-through |
| --- | --- |
| [Get Modular #260](https://github.com/agent-teams-ai/get-modular/pull/260) | Compiler engineer handbook: selected-root closure versus affected old/new replacement, exact bindings and retained shared resources. |
| [Extension Foundation #71](https://github.com/agent-teams-ai/extension-foundation/pull/71) | OD-003: complete installed-plugin journey, trust profiles, versioned headless/UI contracts and authoring proof. |
| [LMU f38f2e63](https://github.com/agent-teams-ai/live-module-updates/commit/f38f2e634e7b9e28e4294f1ea8f7ead909e35ab9) | Foundation delivery plan: required continuous-update outcomes, applicable replacement modes, real stream lifetime, independent self-update and cumulative realm budgets. |
| [Agent Runtime #264](https://github.com/agent-teams-ai/agent-runtime/pull/264) | Capacity delivery plan: quota scope and release receipt, actual downstream control reserves, receiver enforcement and unresolved physical custody. |
| [Orchestrator #112](https://github.com/agent-teams-ai/agent-teams-orchestrator/pull/112) | OD-033 and OD-043: causal wait/wake and budgets, existing placement ownership, useful product lifecycle and compatible state/recovery. |
| [Platform #66](https://github.com/agent-teams-ai/agent-teams-platform/pull/66) | Shared research integration plan: mixed-version rollout, distinct authority dimensions, qualified future moves and bounded offline/revocation behavior. |
| [Engineering Foundation #489](https://github.com/agent-teams-ai/engineering-foundation/pull/489) | Executable capabilities, Deferred work: optional development-time conformance extraction with owner-supplied semantics and real-store/provider evidence. |

These reviewed owner additions total **372 Markdown lines across eight existing
documents**, separately from this research corpus and its review corrections.
They add **0 production/integration LOC and 0 new test LOC**. The full journey
is a required target; accepted finite envelopes and each owner's implementation,
public-contract, isolation and release qualification remain distinct.
Use these owner records for implementation sequencing and new estimates.

### Smallest documentation handoff

Close an item by linking existing owner coverage when it already specifies the
law and rejecting scenario. Add only a missing decision, parameter, supported
profile or counterexample to the existing plan/OD; preserve accepted ADR bytes.
Research records a proposal and cannot accept a new runtime, isolation policy,
public SPI, distributed topology or product capability.

For each applicable item, leave one owner-local record with: selected scope;
accepted invariant versus open mechanism; canonical owner; negative scenario;
implementation trigger; and a link back to D/E or A9/A10. A current source
inventory comes before any implementation estimate. Stop an extraction when
the existing primitive and conformance already cover the case.

**Initial minimal handoff estimate, before the expanded owner request:** about
40-65 changed/added Markdown lines for this
compact entrypoint, then roughly 150-250 lines across existing owner plans
for minimal routes and missing acceptance details after checking coverage.
The combined planning envelope is about 200-320 lines, not a requirement to
fill that many lines. Confidence is 6/10; editorial complexity is 3/10.
This excludes fully designing a new streaming, realm, transfer or quota profile.
Such a decision keeps its own contract, alternatives and estimate with its owner.

**Current code delta: 0 production/integration LOC and 0 new test LOC.**
Finite-profile iterator/self-wait probes, ESM retention and GM root-closure
semantics are not newly demonstrated defects of a supported consumer profile.
Do not add completed EF/LMU work or the existing S1-S5/C0-C3 programs to this
research as new implementation cost. D1-D3 implementation sizing remains
unestimated (confidence 2/10); overlapping alternatives are not summed.

P1 follow-through is a simple author-facing SPI and narrowly reusable
conformance after checking existing coverage. Reuse GM Resources/Observation,
Effect and the selected durable engine before proposing another shared runtime,
stream library, scheduler, analyzer or global lifecycle state machine.
Preserve the real one-agent local profile; qualify only the claimed workload.
The current index creates no new release gate and does not block unrelated work.

## Three bounded implementation questions within existing owner decisions

These cards preserve accepted product scope. They do not ask the user to select the product baseline again, create implementation authority, or establish a new prerequisite for research publication. D1 refines OD-024 within ADR-0045; D2 retains the existing initial C0–C3 architecture and compares conditional quota strategies for a later multi-pool scope; D3 selects a mechanism only after reading the actual producer contract. The source risks remain targeted cost hypotheses, not proof that a rewrite or additional service is needed.

All ratings are ordinal **planning judgments out of 10**, not probabilities or benchmark scores. `R` is conditional reliability in honoring the stated invariant if correctly implemented; `P` is confidence in the planning recommendation from the inspected evidence; `C` is conceptual and operational complexity, with 10 highest. Comparable correctly implemented choices receive the same reliability rating; complexity does not itself make a distributed design less correct. Planning confidence is separate from implementation sizing confidence.

**This documentation change adds 0 handwritten production TS LOC in every option.** Future implementation LOC is unestimated: the former decimal-thousand envelopes lacked an owner seam inventory and have been removed. Sizing confidence is **low, 2/10**, for all rows. The bounded scope column identifies existing/reused seams, the conditional change, and unresolved scope. It is an inventory assumption, not a line estimate. Existing functionality is counted once in its owning delivery: D2 sits **inside C0–C3**, ordinary S1–S5 is not an additional D2 cost, and alternatives are not summed. SQL migrations, native/Rust work, tests, failure/soak qualification, infrastructure, operations, generated code and UI require separate owner work categories; excluding them from TS LOC never excludes them from delivery effort.

### D1: how should authoritative hard-quota reservation state be maintained?

**Fixed baseline.** ADR-0045 already requires both soft limits and hard quotas, with distinct policy contracts sharing usage evidence. Each hard policy declares its unit/basis, reservation estimate and permitted overshoot. Immutable evidence remains with Usage Metering; rating/projections remain with Usage Accounting; Consumption Governance owns reservation authority. No option below reads another context's tables, turns sampled telemetry into usage authority, or replaces hard admission with an eventual spend projection. OD-024 owns exact quantities, periods, hierarchy, unknown outcomes and late corrections. [A2]

| Option | Same promised invariant; implementation tradeoff | R / P / C | Bounded seams and LOC status |
| --- | --- | --- | --- |
| **1. Narrow transactional reservation state — recommended starting candidate within OD-024** | Maintain authoritative governance-owned allowance/reservation state at grant, capture, release and expiry. Independently ingest usage evidence and publish rebuildable soft-threshold views. Avoid per-receipt tenant-wide accounting coupling while retaining a short serialization point where the hard allowance actually changes. | **8 / 8 / 5** | Reuse accepted exact-value types, owner transactions and idempotent publication. Conditional work: reservation transition/store plus policy reconciliation. OD-024 must first settle aggregate/scope/period semantics; existing implementations are reused. **0 now; future TS delta unestimated, sizing 2/10.** |
| 2. Recompute authoritative exposure at each reservation decision | Derive available allowance from governance-owned reservation/settlement facts within the same authoritative transaction, then reserve. Soft projections remain separate. Fewer maintained balance projections can simplify correction/rebuild reasoning, but decision work grows with the facts read unless the owner establishes a bounded summary. This is plausible for low admission rates or naturally bounded scopes. | **8 / 7 / 5** | Reuse the same contract, quantities and transaction owner as option 1. Conditional work: exposure-query/summary strategy and reservation write. No accounting-table join or general ledger service. Scope/period/correction cost remains unresolved. **0 now; future TS delta unestimated, sizing 2/10.** |
| 3. Finite suballowances issued by the same governance authority | Conservatively partition a declared hard allowance into fenced finite shares, each with a local reservation owner. Preserve total conservation, expiry and reconciliation; soft thresholds still share published usage facts. Can reduce same-scope grant contention but strands allowance and adds refill/reclaim/unknown-outcome obligations. Consider only after a concrete contention or autonomy need. | **8 / 5 / 8** | Reuse option 1's authority semantics. Conditional additional seams: share issuance, local debit binding and fenced return/reconciliation. Allocation unit, hierarchy and recovery behavior remain OD-024 decisions; no new service or distributed transaction is presumed. **0 now; future TS delta unestimated, sizing 2/10.** |

The recommendation is to keep synchronized work at the narrow hard-admission boundary, not to eliminate every lock. The measured quantity may be tokens, resource time, estimated money or another explicitly typed allowance; reserving an estimate does not guarantee actual external provider spend. Provider-enforced caps are separate capabilities. Paperclip's proposed bounded-lag spend architecture is useful for independent evidence ingestion and soft views, but cannot replace this accepted hard-quota authority. Option 2 remains credible when its simpler derivation is sufficient; option 3 is an optimization, not a new product promise.

**Remaining owner choices:** exact aggregate boundaries and scope order, reservation unit/estimate, permitted overshoot, period rollover, late/corrected usage, uncertainty and expiry. They remain in OD-024; the research does not settle or re-vote them. The existing owner scenarios apply. A narrow future experiment may compare same-scope grant contention after those semantics are chosen; no new preliminary framework is proposed.

### D2: how are applicable technical quotas preserved when capacity spans pools?

**Retained initial choice.** C0–C3 already prefers an owner-local PostgreSQL admission queue, bounded dispatcher and explicit reservation CAS. Start with C0's one selected resource/pool scope and no autonomous movement. “One logical authority” names the invariant owner, not one permanently elected process or a ban on concurrent scheduler implementations. Scheduler processes must serialize the minimum relevant state or prove the existing equivalent fence contract. These are **technical** resource quotas; product monetary allowances remain Orchestrator Consumption Governance decisions. [A1–A3]

Independent pools cannot each spend a shared tenant/global/provider allowance merely because each sees spare local capacity. The following alternatives preserve the same no-over-admission requirement. Options 2 and 3 are conditional expansions when an actual multi-pool requirement appears; neither is a new first-delivery mandate.

| Option | Authority and tradeoff | R / P / C | Bounded seams and LOC status |
| --- | --- | --- | --- |
| **1. Initial pool with one owner-local admission transaction — retain existing first scope** | All applicable technical quota checks and pending-to-active reservation changes for the selected pool occur in the same owning transaction. Concurrent schedulers use the accepted CAS/fence contract. This is the initial scope to qualify and says nothing about autonomous cross-pool movement. | **8 / 9 / 3** | Reuse C0–C3's admission/store, fairness and reclaim owners. Reconcile existing implementation before adding anything; identify exactly which scopes are atomic in this transaction. **0 now; C0–C3 implementation TS unestimated, sizing 2/10.** |
| 2. Independent pools with fixed finite quota shares | A technical quota authority assigns non-overlapping finite shares whose sum never exceeds each shared limit; a pool admits only against its own share. Conservative static partitioning avoids a shared mutation on every grant. Spare capacity can be stranded. Shrink/reallocation waits for the owner-defined drain/fence/return condition; it is not an instantaneous balance transfer. | **8 / 6 / 6** | Reuse pool-local grants; conditional additions are share identity/revision, pool binding and drain/reallocation accounting. Map overlapping tenant/global/provider scopes explicitly. Dynamic balancing is excluded until separately justified. **0 now; conditional delta unestimated, sizing 2/10.** |
| 3. Multiple pool schedulers with one shared authoritative quota transaction | Keep shared limits and admission reservations under one existing technical store/transaction owner; the transaction binds the selected pool as well as all applicable quota scopes. Pool schedulers can scale independently while shared allowance remains serialized only where required. Better utilization than fixed shares, with shared-store contention and availability dependence. | **8 / 7 / 6** | Reuse the existing capacity store if it can own the full atomic transition. Conditional work: explicit pool identity/routing and expanded admission queries. If no such atomic owner exists, this row is inapplicable until the owner selects a supported protocol; it does **not** imply cross-database or cross-product distributed transactions. **0 now; conditional delta unestimated, sizing 2/10.** |

C0's existing scope inventory should map every tenant/global/provider constraint to its authoritative transaction or finite share. A cross-pool race in which two grants compete for the last shared allowance is a concrete rejecting case within C1/C2's existing concurrency obligations. Product governance decisions cross the existing product/runtime boundary; AR must not join Orchestrator tables to create apparent atomicity.

Keep fairness separate from physical placement. Preserve the existing assumptions: a fixed finite tenant set, persistent eligibility, a finite older eligible set, and eventual release of needed capacity. A large resource request cannot be called perpetually “ineligible” just because smaller new requests repeatedly consume releases; C0–C3 already proposes bounded bypass/reservation for this case. No wall-clock progress promise is added.

Partitioning and process separation are independent future triggers. Measured per-pool claim contention or a resource-isolation need can justify additional pools and one of the quota strategies above. Measured CPU interference, independent operation or a distinct failure boundary can justify moving the **same** authority behind a service. Either topology still needs the same idempotency, fairness, cancellation and reclaim contracts. This report adds no port/package/service, does not reopen JetStream, and does not count extraction as a third scheduling algorithm.

### D3: how should the existing canonical writer do bounded receipt work?

**Common guarantee.** All choices preserve the selected owner's canonical output order and durable ACK/replay meaning. Keep source occurrence identity, canonical runtime cursor and reader cursor distinct. Canonical visibility and the prefix safe for producer deletion cannot advance over an unproved source gap where the selected source contract promises continuity. All choices can advance cursors incrementally, use bounded asynchronous view projections and reserve control resources. Strict contiguity is compatible with all three. Separate service placement is an independent later deployment choice, not a receipt algorithm. [A5]

| Option | Same canonical contract; mechanism and applicability | R / P / C | Bounded seams and LOC status |
| --- | --- | --- | --- |
| **1. Individual contiguous commits for an ordered producer — preserve where already sufficient** | Validate the next stable occurrence, persist it and advance the canonical/source checkpoint in one bounded owner transaction. Reject/reconcile duplicates or gaps according to the existing source contract. Fewest buffering states and direct ACK timing; per-event commit overhead can matter at high rates. | **8 / 9 / 3** | Reuse the existing append/attempt/identity checks and producer adapter. Conditional delta is only an evidenced historical-query optimization. No new gap store or universal cursor. **0 now; any TS delta unestimated, sizing 2/10.** |
| 2. Bounded contiguous batch commits for the same ordered producer | Commit a bounded consecutive range and its checkpoint atomically, preserving option 1's ordering and durable-prefix ACK. Reduces transaction overhead; count/byte/time bounds and backpressure add batching behavior. Partial/unknown commit reconciles the original identities, not a freshly numbered batch. | **8 / 8 / 4** | Reuse the same canonical writer/receipt meaning. Conditional seams: bounded batch admission, ACK aggregation and drain/replay behavior. Terminal/control responsiveness remains protected; no automatic throughput claim. **0 now; conditional TS delta unestimated, sizing 2/10.** |
| 3. Bounded source-specific staging before the same contiguous canonical writer | Only for a demonstrated producer that validly delivers stable occurrences out of order: retain bounded individual receipts, then publish the now-contiguous prefix through option 1 or 2. Accommodates that source without weakening canonical continuity. Adds gap/expiry/continuation recovery and retained-byte obligations. An ordered source does not need this mechanism. | **8 / 6 / 7** | Reuse canonical append and existing source adapters. Conditional seams: source-bound receipt staging and durable prefix continuation. Gap count/bytes/age, retention and expiry outcome require that source owner's contract. No-replay or reconstructed-history sources do not acquire stable replay by using this adapter. **0 now; conditional TS delta unestimated, sizing 2/10.** |

The immediate proposal is historical-growth measurement at the existing append seam. Keep option 1 when it already meets the selected workload; use option 2 for measured commit cost; use option 3 only when the real source contract requires out-of-order receipt. This is not authorization to change strict canonical append into a gap-tolerant public API. For no-replay or reconstructed-history sources, preserve the existing explicit incomplete/reset/snapshot semantics rather than fabricate occurrence identities or deduplicate by text.

If option 3 applies, late filling of the first gap before a long retained suffix must not cause one unbounded transaction. Bound each prefix-advance step, persist continuation through restart, and distinguish receipt durability from contiguous-prefix acknowledgement. A producer may discard only the prefix proven safe by its contract. These are conditions on the source-specific mechanism within the existing owner scope, not a new service or release gate.

## Foundation-first decision docket (2026-11-24)

The owner confirmed the [ecosystem vision](https://github.com/agent-teams-ai/.github/blob/main/docs/architecture/ecosystem-vision.md):
design the global architecture and reusable foundations before main product
implementation. Runtime v3 is greenfield; do not treat current Runtime code as
the target. These cards identify **open review questions**, not adopted ADRs.
Use the existing owning decision or a narrowly scoped successor only if a
real conflict or material improvement is established. No product code or
additional release gate is authorized by this docket.

### Decision routing and order

| Priority | Question | Existing owner route | Disposition |
| --- | --- | --- | --- |
| P0 | Early shared-library design versus later feature extraction and stable SPI publication | FMS v1.1 promotion; Engineering Foundation ADR-0061; Extension ADR-0015/OD-003 | E1: clarify distinction; owner successor only if necessary |
| P0 | Complete module/update operation, optional SDK and open contribution vocabulary | Extension [#57](https://github.com/agent-teams-ai/extension-foundation/issues/57), [#62](https://github.com/agent-teams-ai/extension-foundation/pull/62), [LMU delivery plan](https://github.com/agent-teams-ai/live-module-updates/blob/main/docs/plans/foundation-delivery-plan.md) | Existing active workstream; no competing implementation |
| P0 | Cell-ready managed placement and transfer | Platform [#62](https://github.com/agent-teams-ai/agent-teams-platform/pull/62), Orchestrator OD-033 | Candidate contract; owners agree authority partition and routing before affected code |
| P0 | Cross-store recovery and non-reuse of effect authority | Runtime v3 S2/F03/F04/F12/F14; Orchestrator OD-003/013/032; Platform authority | E2: explicit cross-owner recovery review |
| P0 | PostgreSQL bundle versus feature-owned persistence | Runtime [#245](https://github.com/agent-teams-ai/agent-runtime/issues/245), [#246](https://github.com/agent-teams-ai/agent-runtime/issues/246) | Existing decision packets; prove dependency graph and external packed consumer |
| P0 | Bounded causal work and hard reservations | OD-024, OD-033, D1/D2 above, Runtime C0-C3 | Reuse owning plans; do not introduce a global scheduler |
| P0 | Authorization freshness at a cross-cell effect boundary | Orchestrator OD-012/031/032, Runtime F12/F16 and Platform authority | E5: compare freshness mechanisms without reopening provisional IAM selection |
| P0 | Independent upgrades with retained durable work | Runtime F13/F14; Orchestrator public contracts; Extension OD-003 and LMU | E6: compare supported upgrade profiles, not a second update framework |
| P1 | Exclusive saved Agent assignment versus large-scale reuse of definitions | Orchestrator ADR-0100/0101 and OD-019 | E3: preserve accepted semantics pending product/identity review |
| P1 | Fully Local process/engine footprint | Orchestrator ADR-0114/0115/0116, OD-021/040, [enterprise execution study](../studies/one-agent-through-enterprise-execution.md#workflow-alternatives-scoped-estimates-not-an-engine-re-election) | E4: retain selection until a measured whole-profile limitation justifies successor |
| P1 | Federated architecture checks and independent compatibility | Engineering Foundation [#474](https://github.com/agent-teams-ai/engineering-foundation/pull/474), Get Modular growth qualification, independent AAS | Reuse existing owner mechanisms; no second analyzer |

For E1-E3 and E5-E6, numbers are preliminary planning ranges of incremental
handwritten implementation and tests for the named seam, not measured work,
full product cost or qualification estimates. Sizing confidence is low
(3/10); inventory existing code, tests and current owner plans before any
implementation budget. Reliability assumes the stated guarantees are actually
proved. Alternatives are mutually exclusive only where their guarantees
overlap; do not sum overlapping costs with the existing plans.

The combined LOC columns in E1-E3 remain incomplete planning notes. Before an
owner implementation decision, complete the [comparison packet](https://github.com/agent-teams-ai/.github/blob/main/docs/engineering-quality-standard.md#owner-facing-architecture-decisions-and-estimates)
with comparable scope, separate production/integration and test/fixture ranges,
engineer-days and estimate confidence, or mark the missing estimate explicitly.
Their presence here does not make that decision packet complete.

### E1: library-first without invalidating the Feature Module Standard

Read [FMS v1.1 promotion](https://github.com/agent-teams-ai/.github/blob/03c8f102681569f525f44577a705bc4e5900e492/docs/architecture/feature-module-standard/v1.1.md#promoting-a-feature-to-a-module)
and [Foundation ADR-0061](https://github.com/agent-teams-ai/engineering-foundation/blob/3e859413fcdcbf8a159fd4bad89a8b35b1ce83d5/docs/decisions/0061-library-first-foundation-boundary-evolution.md).
The former governs promotion of an existing feature to a module; the latter
admits early design of new reusable engineering mechanisms. FMS already
allows independent lifecycle boundaries in addition to actual reuse evidence.
It does not require two consumers for every boundary. The open issue is whether
a particular new shared library is incorrectly classified as feature extraction,
and how Extension Foundation's retained product-first triggers apply.

| Candidate | R / C / P | Incremental implementation and tests LOC |
| --- | --- | --- |
| Distinguish new library design from existing feature extraction; retain stable SPI and actual adoption gates | 9 / 3 / 9 | 0-300 (mostly clarification; only necessary checker fixtures) |
| Versioned FMS successor for an explicit planned-consumer foundation admission path | 9 / 5 / 7 | 400-1,200 (profile, validator and positive/negative fixtures) |

These are two routes within the accepted library-first direction, not a new
architecture vote. Requiring each planned product to copy an already identified
shared mechanism before reusable-library design is the rejected counterexample,
not a third alternative. Existing owned feature extraction retains its applicable
admission route. The open question is which existing rule admits the named seam
or whether a scoped successor is needed.

Prefer the first interpretation where the adopted profile and actual scope
permit it. Do not silently override ADR-0015/OD-003 or FMS. If a named
foundation is genuinely blocked, an owner-reviewed successor may distinguish
pre-1.0 implementation admission from public stable claims. Prove a real
independent library consumer and rejecting cases; planned consumers alone do
not prove conformance. Avoid introducing any new rule if the existing
hard-boundary criterion already suffices.

### E2: recovery after independent stores and external effects diverge

[ADR-0114](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/e09cd468d3b5a89e42ce16e2268d17533e046126/docs/decisions/0114-canonical-backend-stack-and-distributed-role-adoption.md)
already states that one SQL snapshot is not an atomic backup of NATS, AR and
external effects. The missing implementation contract is the handoff of
recovery evidence across owners. Distinguish application state, broker
positions, engine histories, credentials, execution custody and real external
effects. A recovered epoch alone is not fresh authority.

| Candidate | R / C / P | Incremental implementation and tests LOC |
| --- | --- | --- |
| Per-owner restore watermarks, explicit reconciliation, and non-reusable fencing authority outside the affected recovery set | 9 / 7 / 8 | 4,000-10,000 across owners |
| Coordinated quiesced restore checkpoints plus explicit external-effect reconciliation | 9 / 8 / 7 | 5,000-12,000 across owners |
| Operator-driven fail-closed recovery and fresh scope enrollment, no automatic reactivation of ambiguous work | 9 / 5 / 8 | 1,500-4,000 for the restricted profile |

Prefer the first for the eventual fleet and retain the third as a safe
restricted recovery profile. Coordinated checkpoints can complement either;
they cannot make external effects atomic. Compare the availability and
operational cost, not just durability. Before an affected contract is frozen,
name the real authority/fencing source, recovery-set membership, compatibility
horizon, typed uncertainty and permitted recovery operations. If a Fully Local
device loses every trusted anchor, do not pretend a restored counter proves
continuity: require isolation/re-enrollment or explicit manual reconciliation.
The owner still must choose the exact anchor and policy.

Reject a restore that forgets a completed remote effect, resurrects deleted
authority, grants a successor while a predecessor can write, replays against
an incompatible provider, or allows an old broker/engine delivery to become
a fresh operation. Require recovery-only progress without unsafe dispatch,
and a positive trace in which unaffected scopes continue. Reuse owner-local
receipts and existing recovery/transfer plans; no global transaction or new
workflow engine.

### E3: Agent identity and scalable reusable definitions

[ADR-0100](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/e09cd468d3b5a89e42ce16e2268d17533e046126/docs/decisions/0100-persistent-agents-and-exclusive-team-membership.md)
and [ADR-0101](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/e09cd468d3b5a89e42ce16e2268d17533e046126/docs/decisions/0101-run-specific-rosters-coordination-and-exclusive-agent-occupancy.md)
require one current Team assignment and at most one unreleased occupancy for
one persistent Agent. Explicit copies have distinct identity and statistics;
this is a valid safety and UX choice, not an established fleet bottleneck.
The architectural question is how to reuse configuration and behavior without
implicitly sharing writable state or cloning large definitions.

| Candidate | R / C / P | Incremental implementation and tests LOC |
| --- | --- | --- |
| Retain exclusive Agent; explicit copy with shared immutable library/template definition where owner approves | 9 / 5 / 8 | 1,000-3,000 |
| Separate reusable definition and independently named Agent instances, each with exclusive occupancy | 9 / 7 / 7 | 2,000-6,000 |
| One saved Agent may have concurrent isolated participation across Teams/Runs | 8 / 8 / 6 | 3,000-8,000 |

Keep the accepted first-direction semantics while comparing the two broader
product models; do not implement a successor without the product owner.
A content reference or template must never implicitly share session, workspace,
secrets, cancellation, statistics or occupancy. Test version pinning, edits
during runs, independent cancellation, copy/move, stale release, cross-tenant
denial and provenance. Require actual product scenarios that explicit copies
cannot meet before changing identity semantics. High agent counts alone do
not prove a need to remove occupancy protection.

### E4: Fully Local operational footprint

Retain ADR-0114/0115/0116 and the three engine alternatives already estimated in
the [enterprise execution study](../studies/one-agent-through-enterprise-execution.md#workflow-alternatives-scoped-estimates-not-an-engine-re-election).
Do not re-elect PostgreSQL or Temporal merely because an isolated component
looks expensive. First compare the complete minimum qualified profile:
mandatory role processes, Supervisor, PostgreSQL, broker, workflow engine,
authority, one real executing agent, and outstanding durable obligations.
Measure cold and warm startup, aggregate resident memory/CPU, disk, offline
recovery, suspend/resume, upgrades and safe drain. Consider on-demand activation
only where the owner can preserve required progress and current process
isolation; co-location that weakens an accepted role boundary requires an
explicit successor. Record approved resource budgets and a counterexample
before deciding whether a different engine or topology is justified.

### E5: authorization freshness at a cross-cell effect boundary

[OD-012](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/592ab361562a50ff63c0cde61985abee9334fc3d/docs/open-decisions/OD-012-identity-authorization-tenant-isolation.md),
[OD-031](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/592ab361562a50ff63c0cde61985abee9334fc3d/docs/open-decisions/OD-031-semantic-authority-and-claim-admission.md)
and [OD-032](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/592ab361562a50ff63c0cde61985abee9334fc3d/docs/open-decisions/OD-032-last-mile-side-effect-safety.md)
already own IAM qualification, semantic claim admission and last-mile effect
safety. Their existing ownership alternatives are not being reopened. The
remaining narrower choice is how a receiver establishes a sufficiently fresh
authorization decision when authority and execution are placed independently.
The provisional Keycloak/OpenFGA direction does not answer source-projection
freshness, an in-flight revoke race or the final external check/send race.

| Candidate | R / C / P | Production/integration LOC | Tests/fixtures LOC | Effort, engineer-days |
| --- | --- | --- | --- | --- |
| Owner-authoritative check on each protected admission, with receiver-enforced fence or explicitly bounded external dispatch | 9 / 5 / 9 | 400-1,000 | 500-1,200 | 5-12 |
| Owner-issued scoped evidence and bounded freshness leases, with receiver fence and explicit revocation policy | 9 / 7 / 8 | 900-2,200 | 1,000-2,500 | 10-25 |
| Durable local policy projection with source-specific causal watermarks, gap rejection and receiver enforcement | 9 / 8 / 6 | 1,500-3,500 | 1,500-4,000 | 20-45 |

These are narrow deltas to existing owner seams, not estimates of IAM, a
complete distributed security layer or all supported targets. Sizing
confidence is 3/10; ranges exclude native/provider changes, new deployment
infrastructure and production load qualification. Reliability assumes the
same declared cutoff guarantee; an expiring cached allow cannot be compared
to immediate revocation as if they were equivalent.

Retain the first as the baseline hypothesis until the relevant owner defines
which requests may use bounded freshness. The second or third may reduce
remote check amplification, but neither permits execution after a required
revocation barrier. Unknown source revisions, projection gaps, stale grants
and unsafe receiver state fail closed. A remote effect already in flight
cannot be unexecuted by revoking a grant; when the external target cannot
enforce a fence, expose the applicable bounded exposure and reconcile the
outcome rather than claim instantaneous revocation.

Compare actual standalone and managed authority paths, a concentrated tenant,
revocation racing dispatch and failover, stale cache after restore, delayed
source projection, delegation narrowing and saturation of the reserved
control lane. Retain independent tenant, actor, subject, Agent, Run, client,
credential and provider identities. The open owner decision is the required
freshness/cutoff per risk profile and which receiver primitive can prove it;
do not create a generic authorization service or select another IAM engine
from this note.

### E6: independent upgrades with retained durable work

[Runtime v3 contracts and updates](https://github.com/agent-teams-ai/agent-runtime/blob/f05c3a39c070a258958b6913304460bf4e71c61f/docs/architecture/agent-runtime-greenfield-foundation-plan.md#10-контракты-и-обновления),
[Orchestrator compatibility](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/592ab361562a50ff63c0cde61985abee9334fc3d/docs/architecture/public-control-contracts.md#compatibility-and-tooling)
and [Extension OD-003](https://github.com/agent-teams-ai/extension-foundation/blob/5ee8a788935c885fac075a5860a0217cf420b4d7/docs/open-decisions/OD-003-module-runtime-and-public-spi-choices.md#public-extension-spi-and-compatibility)
already distinguish API, artifact, contract and state identities. Preserve
their current commitments and the LMU workstream. The open cross-owner
question is which compatibility horizon each deployment must support while
old accepted work and cleanup obligations still exist.

| Candidate | R / C / P | Production/integration LOC | Tests/fixtures LOC | Effort, engineer-days |
| --- | --- | --- | --- | --- |
| Compatible rolling changes with explicit expand/contract, negotiated profiles and a bounded retained recovery horizon | 9 / 7 / 9 | 800-2,000 | 1,200-3,000 | 10-25 |
| Parallel incompatible version lanes with explicit operation/generation affinity until drain and migration | 9 / 9 / 7 | 2,000-5,000 | 2,500-6,000 | 25-60 |
| Restricted installation stop/drain/upgrade with verified restore and no live continuity claim | 9 / 4 / 9 | 500-1,200 | 700-1,800 | 6-16 |

Ranges describe one representative cross-version seam using existing
protocol, migration and generation owners; they exclude general installer,
native build, fleet deployment automation and exhaustive release matrices.
Sizing confidence is 3/10. These profiles have different continuity and
availability guarantees, so equal conditional reliability scores are not
an assertion of equal product capability.

Prefer compatible rolling evolution for the hosted baseline and explicit
stop/drain for supported local restart-only profiles. Use incompatible lanes
only when a consumer or retained obligation requires them. Every old accepted
operation must retain a compatible recovery/cleanup path or have an explicit
safe migration and retirement outcome; retaining a package archive or a schema
reader alone is insufficient. State migrations and live replacement are
separate capabilities and can be combined only with qualified custody and
receiver fencing. Unknown protocol versions fail closed before effects.

Required owner questions are the actual compatibility window, supported
old-worker retention, schema expand/contract rules, release skew, and conditions
for an irreversible migration. Test an old client against a new host, a new
client against an old host, a pending operation across skipped upgrades,
interrupted migration, stale-generation writes, lost update receipt, rollback
with newer durable data and removal with unresolved cleanup debt. Use the
existing release/compatibility and LMU mechanisms; no second update controller,
universal migration language or permanent support for all past versions is
proposed.


## Fleet-scale follow-through — 2026-11-27

The owner raised the long-term aggregate active-execution target to hundreds
of thousands, while retaining one-agent Fully Local and Foundation-first,
modularity, SOLID, Clean/Hexagonal Architecture, DDD, DRY and LMU direction.
The [pinned source follow-up](../studies/composition-and-scale-evidence.md#fleet-scale-foundation-first-follow-up--2026-11-27)
records the evidence, counterexamples, historical issues, capacity arithmetic
and explicit limits. The [technology screen](../technologies/agent-execution-and-sandboxes.md#fleet-infrastructure-candidate-screen--2026-11-27)
records ready mechanisms and what they cannot replace.

The target differs from the accepted deployment document's tens of thousands.
Reconcile through the owner-local documents and review; do not silently edit
accepted ADR bytes, change a release gate or label the target measured.
The current C0–C3, D1–D3, E1–E6, existing implementation readiness gates and
ordinary Runtime S1–S5 remain separate. The following are **delta questions**
inside those owners, not a new program that blocks every module.

| When / priority | Owner route | Smallest useful reviewed output |
| --- | --- | --- |
| Before freezing cross-owner routing and persistence identities (P0) | Orchestrator deployment profile and OD-038/039; Platform placement/managed installation; Runtime C0 | One target workload + explicit placement/partition scope, route generation, authoritative mutation owner and handoff contract. Compare one-cell baseline, tenant-affine cells and concentrated-tenant split. Include failover and restore rejection traces. Do not build a multi-region control plane yet. |
| Before attention-to-activation and scheduled retries (P0) | Orchestrator OD-033/026/027, existing asynchronous-question study, Runtime operation port | Durable cause, progress discriminator, wait predicate, retry budget and bounded reconciliation. Include Paperclip's documented no-progress continuation loop and stale wait projection as rejecting cases. No new universal workflow engine. |
| Before cross-cell protected admission (P0) | E5, OD-012/031/032, Platform and Runtime security | Receiver enforcement of current route/execution/credential authority and approved freshness/cutoff; fail closed on stale evidence, partition and restore. OpenClaw's trust boundary is not a multi-tenant substitute. |
| Before choosing durable state and extension SPI (P0) | E1/E6, Extension, Get Modular and LMU owners; product contracts and state migrations | A versioned feature-owned invocation boundary, compatible old-generation custody, migration/rollback/retirement obligations and trust profiles. Use existing GM/LMU fixtures and representative independent Hosts; no distributed hot replacement claim from a cooperative in-process pass. |
| Before committing output and journal physical schema (P0) | OD-009/018/024/030, D3, AR S2/C0 | Workload-bytes and retention matrix, cursor scope, bounded batches/replay, payload reference, canonical-versus-projected output, connection budget and isolated control path. Prove lost cursor, large payload, slow subscriber and replay after retention. |
| Before capacity policy implementation (P0) | D1/D2, OD-024, AR C0–C3 | Distinguish commercial reservation, technical multi-resource admission, provider quota and custody. Compare Kueue-style usage fairness and existing Stage K policy, cross-pool escrow vs centrally serialized hard limit, progress and stop under saturation. |
| Before each qualified capacity increment (P1) | Existing reliability and deployment gates, EF conformance and AR/Orchestrator owners | Report a one-agent local profile and separate synthetic/real worker/real provider levels; concentrated tenant, multi-tenant, restart, reconnect, slow storage, partial rollout and provider failures. Publish observed envelope only, never extrapolate linear scaling. |

**Recommended execution order:** first resolve placement, durable identifiers
and authority contracts required by the initial slice; in parallel qualify
LMU/GM/Extension boundary mechanisms and deterministic rejecting fixtures;
then design the bounded owner-local storage, replay and causal admission
contracts; finally qualify progressively larger actual deployments using
their existing gates. Earlier ordinary module development may proceed wherever
its accepted owner contracts are unaffected. Platform, AR and Orchestrator
each retain independent authority. No standalone dependence on Platform is
introduced.

The next owner review should choose the actual placement scope and movement
policy, traffic/retention and failure assumptions, version compatibility
horizon, and relevant external service limits. Do not estimate implementation
LOC for an unselected topology or repeat previous D/E card estimates as
fleet capacity evidence. Review source observations and alternatives with
independent critics before owner acceptance; this follow-up has not received
independent review or executed load tests.

## Product-specific follow-through

| Owner/repository | Already required or accepted | Proposed future delta and activation scope | Remaining owner decision |
| --- | --- | --- | --- |
| **Agent Runtime** | Ordinary v3 S1–S5 ownership/append semantics; C0–C3 durable admission, fair scheduling, isolated control, replay and fenced reclaim. | Reconcile coverage, then propose long-history query-work measurement for the actual writer and a last-shared-slot cross-pool race only if C0 selects multi-pool capacity. Include one-large-tenant/active-worker saturation in the existing C3 workload scope where not already covered. | C0 chooses actual pool/resource scope and applicable quota authority; source owners establish whether out-of-order staging is needed. No new package/port or S1–S5 dependency. |
| **Orchestrator** | ADR-0045's metering/accounting/governance split and both soft/hard semantics; JetStream, owner-local transactions/outbox/inbox and Runtime ACL. | Use Paperclip's company-lock example to compare D1 mechanisms in OD-024's existing reservation/period/correction scenarios. Clarify authorized technical classification and product observations only through existing boundary owners. | OD-024 owns detailed contracts/aggregates/allowance basis/overshoot. No new choice on whether accepted soft/hard capabilities exist, and no AR scheduler in product policy. |
| **Platform** | Product tenancy/membership/commercial ownership, installation-plan fencing and local/self-hosted independence. | In the next managed profile review, compare immutable replacement with explicitly supported field reconciliation; record desired/accepted/observed policy separately. Reuse existing authorized summary/transcript contracts before adding viewer machinery. | Platform/installation owners define supported mutable fields, technical entitlement mapping and honest degraded-convergence outcomes. Orchestrator does not own Kubernetes resources. |

There is no new Agent Teams defect finding or automatic acceptance change in these rows. Existing scoped qualification remains valid, including scopes beyond S1/S2. Any proposed scenario becomes required only through its existing owner's accepted change and the named activation/profile scope. Ordinary S1–S5 and the separate fleet C0–C3 remain distinct; neither this research nor a missing fleet benchmark retroactively withdraws qualified ordinary behavior.

All three drafts should link one shared research record and keep their decision delta and status locally. Concrete reusable mechanisms can share libraries through existing narrow contracts; no shared product domain model, universal scheduler or additional governance framework is proposed.

## Owner source references

- **A1 — runtime ordinary/fleet separation and model evidence:** [`architecture-program-plan.md`](https://github.com/agent-teams-ai/agent-runtime/blob/4bdc93a43b58469f60ca10c0dca512824650c8ac/docs/architecture/agent-runtime-architecture-program-plan.md), [`capacity-admission-delivery-plan.md:13–82,120–237`](https://github.com/agent-teams-ai/agent-runtime/blob/4bdc93a43b58469f60ca10c0dca512824650c8ac/docs/architecture/capacity-admission-delivery-plan.md#L13-L237), [`stage-k-capacity-fairness-results.md:10–69`](https://github.com/agent-teams-ai/agent-runtime/blob/4bdc93a43b58469f60ca10c0dca512824650c8ac/docs/spikes/stage-k-capacity-fairness-results.md#L10-L69).
- **A2 — accepted consumption baseline and open details:** [`ADR-0045`](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/decisions/0045-three-usage-bounded-contexts.md), [`OD-024`](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/open-decisions/OD-024-usage-accounting-boundaries-and-exact-quantities.md), proposed tactical dossier [`consumption-governance/README.md:1–76`](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/domain/contexts/consumption-governance/README.md#L1-L76).
- **A3 — Orchestrator transport and runtime boundaries:** [`eventing-and-reliability.md`](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/architecture/eventing-and-reliability.md), [`runtime-boundary.md`](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/architecture/runtime-boundary.md), [`deployment-profiles.md`](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/architecture/deployment-profiles.md).
- **A4 — Platform boundary/profile ownership:** [`platform-orchestrator-boundary.md`](https://github.com/agent-teams-ai/agent-teams-platform/blob/7f6eb3746c07dc01751c29a8dbc62e50b5f7ad6d/docs/architecture/platform-orchestrator-boundary.md), [`ADR-0010 fully local V1`](https://github.com/agent-teams-ai/agent-teams-platform/blob/7f6eb3746c07dc01751c29a8dbc62e50b5f7ad6d/docs/decisions/0010-fully-local-v1-and-shared-backend-profiles.md).
- **A5 — existing runtime append and source contracts:** [`S2 operations contracts`](https://github.com/agent-teams-ai/agent-runtime/blob/4bdc93a43b58469f60ca10c0dca512824650c8ac/docs/architecture/agent-runtime-architecture-program-s2-operations-storage.md#L230-L281), [`S3–S5 source/replay distinctions`](https://github.com/agent-teams-ai/agent-runtime/blob/4bdc93a43b58469f60ca10c0dca512824650c8ac/docs/architecture/agent-runtime-architecture-program-s3-s5-features-host.md#L241-L247), [`foundation output/cursor semantics`](https://github.com/agent-teams-ai/agent-runtime/blob/4bdc93a43b58469f60ca10c0dca512824650c8ac/docs/architecture/agent-runtime-greenfield-foundation-plan.md#L250-L259).

## Pass 9: owner-specific deep follow-through and foundation extraction — 2026-11-27

This is a candidate delta to the existing docket, not accepted product
implementation. The [deep source/incident study](../studies/composition-and-scale-evidence.md#deep-follow-up-live-plugin-custody-and-openclaw-failure-history--2026-11-27)
and [extension](../technologies/modularity-and-extension-contracts.md#deep-extension-lifecycle-candidate-screen--2026-11-27)
and [execution](../technologies/agent-execution-and-sandboxes.md#pass-8-additional-fleet-and-recovery-candidate-discrimination--2026-11-27)
catalog screens supply evidence. No source observation implies our existing
design is deficient. The earlier baseline already covers most fundamentals;
this pass prioritizes specific decisions and adverse cases that could change
an expensive implementation boundary.

### Product and foundation decisions to settle first

| Priority / owner | Existing direction, precise delta and rejecting evidence |
| --- | --- |
| P0 — Orchestrator OD-033, OD-038/039 and Platform/AR placement owners | [OD-033](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/3dccf2c53bf11f3939a19734a58f5e64d96673d0/docs/open-decisions/OD-033-ooda-convergence-and-context-activation.md#L246-L255) already separates placement from stable identity, causal quotas and current writer. Before choosing schemas/routing keys, select the actual semantic partition and authority directory, the minimum transferable group and how a large tenant spans partitions without splitting one Run/aggregate. Compare tenant-affine cells, tenant+owned-group placement and one initial cell. Specify migration/restore before and after authority transfer; source loss, delayed old writes, partial copy, conflicting rehome and stale directory, plus inability to reach global Platform. Reject global hot-path lock or Platform lookup for every operation. |
| P0 — Orchestrator OD-033, OD-032, OD-024 | Existing classification, no-op fingerprints, causal bounds and safety lanes are strong. Add Paperclip-derived fixtures for unknown error codes, SQL selector versus domain decision disagreement (if SQL prefilters), user-owned stops, wake from a self-authored message, stop/approve race, and external acceptance uncertain. Persist original wait reason and cause/budget; sleeping child/parent do not spawn unbounded wakeups or mint quota. Keep stable business identity, operation attempt and effect identity separate. |
| P0 — Agent Runtime [generation model](https://github.com/agent-teams-ai/agent-runtime/blob/cae4d350c947cd9f74bc04130531527c9a36baeb/docs/architecture/execution-generation-model.md), [capacity plan](https://github.com/agent-teams-ai/agent-runtime/blob/cae4d350c947cd9f74bc04130531527c9a36baeb/docs/architecture/capacity-admission-delivery-plan.md#L118-L210), C0–C3 | Already specifies atomic grant/accounting, tombstones, bounded fairness, control reserve and physical reclaim. Add comparison of storage fence vs lease-only provider, actual receiver stale-write rejection, cold resume of approved tool input, logical operation distinct from physical process/workspace, exact resource-specific receipts. Test a hot tenant, sustained arrival while warm pool replenishes, throttling at provider/API, stop after a new owner admitted, grant vs cancellation and old observer vs new session. Use exact provider capability/profile admission instead of one deceptive uniform guarantee. |
| P0 — Platform [managed installation](https://github.com/agent-teams-ai/agent-teams-platform/blob/76fc9734f6128b78c7a8b1bc858859fb1cbe835a/docs/architecture/managed-installation-control.md#L22-L156) | Already separates eight authority dimensions, signed plan, desired/accepted/observed state and offline/restore rules. Preserve those. Explicitly evaluate placement directory ownership, partition-move receipt and authority anchor, gradual per-cell version rollout, stale grant/revocation freshness, budget distribution and lost Platform connectivity. Preserve local/self-hosted independence. Use hierarchical allowance only with exact conservation and reconciliation; temporary grant expiration alone never frees still-occupied physical capacity. |
| P0 — Extension Foundation | Add conformance case inventory to existing admitted host safety/profile gates: verified import closure including native assets; disallow unknown executable ingress; grants bound to instance and effect target; explicit same-process trusted vs disposable worker vs hostile isolated host profiles; stable digest is not authorization. Cold catalog/installed vs actual active vs useful capability must not collapse. Test late lazy import, premature GC and accumulated artifact quota, selective plugin update and remote UI bridge access. Do not require hot reload for pure/built-in modules. |
| P0 — LMU | Existing Programme C and operation contract already address most of these laws. Add specific negative fixtures: independent Hosts with same plugin ID; unaffected plugin remains live; old callback cannot delete successor resource; explicit borrowed dependency; handover/self-update during active call; retained lazy import; event-loop stall and original disposal completion; failed prepare plus subsequent replacement; repeated updates exhaust retiring bytes and reject admission safely. Distinguish API response, actual useful new generation and physical old-code reclamation. Apply in existing C1–C7 scope where supported, not a new all-product gate. |
| P1 — Get Modular and Engineering Foundation | GM owns deterministic closure/bindings and qualified resource mechanisms. For large graph, test incremental affected-set correctness against full recomputation before optimizing; avoid global resolution/state. Engineering Foundation remains development-only: qualify authoring restrictions and negative runtime contracts with existing executable capability/evidence routes, not a second runtime checker. Use meaningful installed consumer tests and mutation cases, not folder counts. |

### Fleet envelope and decision criteria

The target is now hundreds of thousands of *actually admitted concurrent
executions* across independent Runs, not idle identities or merely queued work.
Retain the existing Orchestrator V1 distinction: per-Run capacity and local
one-agent qualification are separate. An illustrative 300k active execution
scenario with a 30s heartbeat creates 10k heartbeat observations/s; with 1
event/s and 1 KiB each it yields 300k events/s and about 26.54 decimal TB/day
before replication/indexes. Changing event rate by 10x changes raw bytes
by 10x. This is arithmetic, not measurement or an assumption that every
profile uses per-agent heartbeat. Avoid per-agent connection/subscription/sidecar.
Separate control, domain commands, journal, token/output streaming, artifacts
and metrics. Define work rates, resident worker/agent memory, provider quota,
backpressure, largest tenant and Run, retention and hardware explicitly.

**Choice sequence:** establish semantic owner partition and directory/revision
contract now; use one logical cell and owner-local transactions first; prove
duplicate, unknown result, restore and handoff via controlled fixtures before
real multi-cell deployment; then scale through 1, 1k, 10k, 100k and 300k+ in
existing qualification plans. These are proposed experimental increments, not
extra global release prerequisites. Do not split a Run or weaken semantic
invariants to meet a capacity number. Define negative proof (stale writer,
one hot partition, slow store, reconnect storm, quota exhaustion, cold recovery,
partial rollout) before choosing implementation. Real provider runs, simulated
sessions, scheduler fixtures and end-to-end concurrent agents remain separate.

### Potential reusable libraries — no speculative repository creation

The following are candidates for a mechanism with named intended consumers,
not a new umbrella Foundation runtime. Follow the organization's existing
library-first extraction/admission rule. Estimates are incremental design,
adapter and fixture effort for a *small discriminating slice* reusing existing
primitives, excluding production fleet delivery, generated code and vendor
code. Value / complexity / confidence (1–10) are ordinal judgments. A
reliability gain is expected only after qualification; no new code exists here.

| Candidate seam | Intended consumer / existing owner | Value / complexity / confidence | Proposed discriminating slice / decision |
| --- | --- | --- | --- |
| Resumable subscription application contract | AR output, Orchestrator SDK, ReviewRouter/client streams; existing Centrifugo, GM/Effect | 9 / 5 / 8 | 100–350 TS adapter + 250–700 fixture LOC. Separate transport position from committed application state, atomic snapshot+watermark, replay overlap, slow apply, cancel/resnapshot and stale tenant/generation. Compare existing SDK recovery first; extract narrow owner-neutral reducer/cursor law only if distinct consumers fit. |
| Durable operation receipt and reconciliation helpers | LMU updates, Platform installation, AR provider effects; domain owners retain state and policy | 9 / 7 / 7 | 150–450 adapter + 300–900 fixture LOC for one unknown-commit case. Reuse existing storage CAS/outbox/workflow engine; generic receipt lookup/retry classification only if semantics genuinely common. Do not share domain enums, add a canonical ledger or create another durable engine. |
| Bounded work/control and resource-limit laws | AR admission, Orchestrator dispatch, background jobs and gateway; existing Effect and AR | 9 / 7 / 7 | 100–350 adapter + 300–800 fixture LOC. Compare native semaphore/queue/rate limiter with typed count/bytes/resource-vector budget and reserved control path. Local primitive cannot implement global fairness or financial quota; initially share contracts and tests, not a universal allocator. |
| Generation-aware rollout / resource custody | LMU, GM Resources, EF artifact admission, Platform/AR native custody | 10 / 8 / 9 | Existing projects already own it. No new library. Add selective replacement, old callback, retained artifact, observed stop and cleanup debt tests inside the proper owner. |
| Contract/failure-model fixture kit | Engineering Foundation dev-only, EF/GM/LMU conformance and product owners | 9 / 5 / 8 | 100–300 harness + 300–800 fixtures LOC for one deterministic clock/scheduling/replay scenario. Reuse fast-check/native runner/Testcontainers/Toxiproxy; allow independent model/oracle, seed, real adapter evidence and negative mutation. No runtime import or mandatory DSL. |
| Typed API evolution / compatibility | Engineering Foundation, product-owned SDK/ports | 8 / 4 / 8 | Existing Buf/JSON-schema/API compatibility capabilities first. Reuse only exact available checks; no additional schema registry or global DTO library. |
| Credential/authorization and metering mechanisms | Existing identity/account gateway, Payments SDK, Platform and Orchestrator owners | 8 / 8 / 6 | No new universal IAM/billing library. Existing qualified owners, policy-specific authorization and exact quantities; compare a narrow adapter only when real duplication exists. |

### Pass 10: critical counter-review and stop conditions

This is an author counter-review (not independent reviewer approval). The
counterarguments narrow the proposals, and remain part of the record:

- **Overengineering critic:** a cell router, workflow engine, dynamic module
  host and resource scheduler for every local feature would sacrifice small
  profile usability. Keep static composition and one logical cell; only
  replaceable/independently owned capabilities need the applicable boundaries.
- **DRY critic:** sharing a generic Run/Task/Generation state machine creates
  cross-product ownership coupling. Keep semantic domain models independent;
  reuse tested technical operations and conformance laws. No second lifecycle,
  scheduler or authorization authority.
- **Security critic:** cooperative local scope, signed artifact, process-local
  refcount or successful lease check cannot prove tenant isolation, receiver
  fencing or external effect safety. Use exact profile evidence, durable
  receiver enforcement and fail-closed unsupported operations.
- **Performance critic:** per-agent objects, global sequencing, fanout and
  unbounded caches can hide cost in a modular design. Measure per-hot-key
  work, serialized transaction latency, queue bytes, control progress and
  retention; bound the affected graph, avoid blanket recomposition.
- **Evidence critic:** historical issues do not prove current defects; source
  tests were inspected, not executed. Source excerpts identify mechanisms and
  hypotheses, not comprehensive competitor correctness. No independent review,
  production benchmark, license verification or installed compatibility was
  performed. Do not refresh ranked competitor scores from these unequal
  scenarios. Recheck exact sources before owner acceptance.
- **Delivery critic:** existing C0–C3, D/E, S1–S5, OD and Foundation plans
  already own the important work. Route discriminating additions into those
  plans only after owner review. Stop an extraction/adoption experiment when
  the existing primitive already covers the law, the second consumer does not
  fit, or complexity/operating cost exceeds demonstrated benefit.

The next action is owner review of the concrete delta and existing fixture
coverage, prioritizing partition/authority, LMU generation/retention, and
bounded execution. No accepted ADR, production code, runtime dependencies,
release gate, or existing qualification receipt was modified by this research.

## Second campaign: discriminate the remaining design decisions

Follow the [new evidence and local probes](../studies/composition-and-scale-evidence.md#second-deep-campaign-executable-lmu-boundary-and-competitor-implementation-review--2026-11-27).
These A9/A10 follow-throughs narrow earlier recommendations, not create a
new approval gate. The finite cooperative profile, owner ADRs and qualified
artifacts remain valid. The experimental results concern exact slices and
abstract models, not production qualification.

### A9 — Select mechanisms per actual capability and boundary

**P0: before approving a continuous or distributed LMU profile.**
Keep finite typed request/response as the first low-risk profile.
Do not promise hot replacement of every module: distinguish four alternatives
for already admitted work, chosen by the capability owner before implementation.

| Mode | Exact applicability and retirement condition | Rejection boundary |
| --- | --- | --- |
| Pin and drain | Finite/cooperative calls; existing generation affinity, original close/retire receipts; new admissions route to published successor. | Indefinite stream, unregistered spawned work or self-retirement wait without separately owned lifetime. |
| Explicit safe-boundary handover | Step/turn has a versioned checkpoint, pending-write/effect/approval IDs, resumable protocol; all affected dependencies support transfer. | Arbitrary JS continuation/iterator, partially executed opaque tool, unproven compatibility, unknown irreversible external effect. |
| Quiesced exclusive-resource transfer | Old generation stops admitting, receiver revocation and resource disposition observed, then successor receives ownership. | Overlap while old external writer or exclusive resource remains authoritative. |
| Retire a recyclable realm | Typed RPC/worker/process boundary, stable facade, exact realm/incarnation and resource owner; observe stop plus separate remote obligations. | Assuming ESM unloading from deleting a cache entry, treating worker exit as cleanup of all descendants/external effects, or equating worker thread with hostile-code isolation. |

The measured EF evaluation retention and LMU finite identity budget make
unbounded in-process cache-busting a rejected default for indefinite service.
Retain cumulative realm evaluation/byte budgets in the actual loader owner,
not only a count of live generations. Compare bounded in-process restart
versus recyclable shared-trust cohort realm; use separate isolation for
untrusted providers. A coherent realm may host multiple modules; a business
agent need not own a separate Node process or composition graph.
For long-lived stream/callbacks define open/next/close/cancel, owner and
generation/epoch, bounded buffer and replay position. Compare native
Effect scoped streams and GM Resources first. Borrowed observation is not
an event ledger. Do not add a second lifetime library.

Self-update uses a separately owned management executor and request lifetime.
A capability may observe acceptance of a typed request; it cannot wait for its
own retirement. The executor owns completion independently of the caller;
preflight detects known reentry cycles.
The existing Host management/invocation boundary should remain narrow.
For old-work saturation, retain current LMU semantics (adoption observation
may be refused); evaluate bounded reserved control/observation capacity or
explicit deferred observation before claiming availability of new-generation
work. Do not bypass the configured work limit just to report healthy.

**P0: before hosted partition and migration choices.** 
Separate topology assignment from product authority and technical custody.
The accepted [ADR-0079](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/3dccf2c53bf11f3939a19734a58f5e64d96673d0/docs/decisions/0079-runtime-authority-binding-cutoff-and-disposition.md#L84-L205)
owns the boundaries; do not add a second binding writer. Prefer stable
owner-local keys with one authoritative aggregate writer and independent
execution/observation lanes. Begin with single logical placement and no
automatic movement of active Runs. A future cell rebalancing capability
needs a separately selected transfer policy, authoritative barrier and
monotonic generation, exact transferred obligations/receipts, receiver
fencing, recovery and rollback as forward revision. The physical partition
key is not automatically identical to tenant, project, Run or agent ID.
Compare tenant/project affinity and partitioned execution under the
largest tenant/hot-key stress; retain one aggregate transaction boundary.
Re-use [ADR-0048](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/3dccf2c53bf11f3939a19734a58f5e64d96673d0/docs/decisions/0048-single-persistence-authority-and-logical-transfer.md)
logical transfer and [ADR-0065](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/3dccf2c53bf11f3939a19734a58f5e64d96673d0/docs/decisions/0065-immutable-run-plan-and-work-placement.md)
staged successor/quiesced fallback instead of reopening them. A transport
route directory is rebuildable; authority cannot be reconstructed from
routing cache or ordinary observation.

**P0: before distributed admission.** 
The DBOS source and four bounded models identify discriminating tests:
per-row locks do not serialize a shared hard limit across disjoint
partitions; time expiry is not physical release; retry after move requires
receipt continuity. Keep Runtime's existing capacity plan (C0-C3) and
Orchestrator's OD-033 causal budgets. Compare a single scoped atomic
budget, fixed per-cell quotas and bounded escrow grants with conservation
and epoch; the second/third are useful only if the atomic shared scope
is measured as a bottleneck. Keep technical concurrency, resource custody
and money separate. Fencing is enforced by the actual technical receiver;
an Orchestrator binding revision is opaque correlation to AR. Preserve
debt and uncertain receipts across interruption and reactivation.

**P1: rolling deployment.** 
Reuse existing EF/LMU, Platform managed-installation and Orchestrator
OD-043 decisions. Desired state, verified staged artifact/plan, accepted
installation, active generation, authority observed, useful work, original
retirement and physical release are distinct. Validate old/new contract
versions at the receiver; pin stateful work until a supported transfer.
No old authority revival on rollback, no incompatible schema change while
old readers/writers are retained. Compare initial finite whole-Host
restart with scoped rolling deployment; canary per actual capability
and fault domain only when the hosted profile needs it.

### A10 — Adversarial acceptance docket, reuse, and decision reversibility

| Proposed test / owner | Concrete oracle and failure injection | Smallest next deliverable |
| --- | --- | --- |
| LMU / EF: indefinite stream, self-update and partial preparation | old/new result identity; original close once; rejected self-wait or detached intent; preflight failure leaves previous active; close escaped iterator or explicitly fence it; new-work refusal does not fake adoption | extend existing finite tests only for in-scope behavior; separately qualify new streaming/realm profile through actual owner gate |
| EF / GM: retention vs logical retirement | repeated exact digest and different versions; measured cumulative eval/heap/ArrayBuffers and live instances; failed export validation may have executed top-level; late owned cleanup; terminate selected realm; no claim of all memory freed from exit alone | bounded native Node24/26 test of one real consumer capability, compare fresh isolated realm vs finite cooperative restart |
| GM: root closure vs affected closure | A->B->C and A->D; replace/remove A, mutate binding/ordered-many and compare old/new plan; D cannot be missed just because root C excludes it; unchanged shared resource not blindly recreated | use existing public plan and LMU planner, benchmark full pipeline vs incremental only if required |
| Orchestrator / AR / Platform: stale authority and lost ACK | after committed dispatch before receipt, after source freeze/copy/transfer, stale route, restore old database, expired lease, duplicate original ID and conflicting digest; actual receiver refuses stale mutation; no implicit Run relocation | cross-owner conformance experiment for selected topology; one authoritative writer in each existing boundary; no global epoch authority for all domains |
| AR: quota/custody under hot shard and partition | two distinct partitions simultaneously consume last slot; expire without stopping process; cancellation/fan-out/renewal and unknown settlement; no over-allocation under the promised hard cap; control lane progresses at saturated data capacity | real bounded PostgreSQL/native-provider test in existing capacity/contained-turn qualification; compare indexed/batched vs scanning adapters |
| Orchestrator: durable activity and replay | late old result, duplicate task/event, persisted receipt and pending writes before snapshot/restore; old command ID/digest is recovered or explicitly unresolved; old writer cannot restart on stale observation | route to OD-033 and OD-005 tests under accepted ADR-0116; OD-035's engine selection is resolved. Use the existing delivery boundary and selected native Temporal engine |
| Platform: installation rollout mixed versions | stale controller, reconnect with previous configuration, ACK/NACK, old worker still draining, invalid artifact, rollback to compatible content with new authority; observed state cannot grant permissions | owner-specific conformance in managed-installation control; no replacement of actual admission receipts by deployment status |

Counter-review conclusions:
- Keep GM static graph bounded; kernel tests and local measurements do not
  justify incremental compiler infrastructure or composition per agent.
- Keep existing GM Resources, Observation and Effect integration. Apply the
  existing [Foundation extraction invariant](https://github.com/agent-teams-ai/engineering-foundation/blob/2a70fe1ccc6f223c2da1a9ec0324ac5d071662b6/docs/architecture/executable-capabilities.md#extraction-admission-invariant)
  to a shared technical law: name intended reuse, verify common semantics and
  existing coverage, and qualify with disposable fixtures and at least one
  real consumer. Current consumer count is not an admission gate. Shared
  lifecycle fixtures are more promising than another runtime dependency.
- Compare shared budget locking versus escrow by measured serialized
  transaction rate, oldest eligible age, reconciliation debt and idle
  stranded capacity. A safe but permanently blocked model is not sufficient.
- A multi-cell move is not necessary for the initial supported deployment;
  prioritize a real one-agent local and one bounded hosted profile, then
  instrument hot keys, memory and physical ownership and increase workload.
- No exact fleet capacity claim, independent critic signoff, product change,
  package pin/release adoption or external license/security approval follows
  from these passes. No new implementation gate is imposed on unrelated
  PRs. Reassess the candidate against its owner and stop if existing
  conformance already proves the law.

The A1-A10 sequence was a single-agent research and self-critique campaign.
The local bounded probes, upstream source excerpts and prior repository
qualification receipts are deliberately distinct evidence classes.
