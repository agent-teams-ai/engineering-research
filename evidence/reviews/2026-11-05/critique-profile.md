# Second-round adversarial review: complete profiles, sustained capacity and custody

Date: 2026-11-05. Reviewer: `scale_cross_profile_critic`.

Read-only evidence review of `BRIEF.md`, `industry.md`, `workflow.md`, `vision-boundaries.md`, fresh Orchestrator and Agent Runtime source documents, the retained PR90 fixture, and PostgreSQL 18 primary documentation. No production changes, remote mutations, provider execution, historical engine reruns, or newly invented approval gates. Source revisions are recorded below. This report is a scratch intermediate for the coordinator.

## Verdict

**Retain the accepted role map and accepted-on-PR90 native Temporal direction. Neither is disproven by the evidence. Tighten the qualification description and the cross-store restore counterexample.**

The first-round reports correctly distinguish logical agents, durable workflows, worker tasks, actual provider execution, process custody and resource occupancy. They also correctly decline to import Loki co-location, Ray actors, AWS cells or Temporal dispatch fairness as wholesale product architecture. I found no new high-severity production defect: this remains mostly an unimplemented architecture with explicitly open owners. Two omissions in the proposed synthesis matter, however, because they can cause a misleading eventual qualification even if the structural architecture is respected. A third issue concerns comparability of estimates.

### Findings

| ID | Severity and status | Finding | Minimal correction | Existing owner |
| --- | --- | --- | --- | --- |
| P1 | High consequence if used for a capacity claim; medium omission in the proposed summary | Sustained concurrent execution count can hide accumulating output/closing/cleanup debt and declining useful throughput | Link the existing AR fleet campaign contract from O qualification and research; retain offered-load model, useful completions, turnover/debt bounds and post-overload drain | AR greenfield §11.1; AR C0–C3; O testing/reliability and OD-030/039 |
| P2 | High consequence if implemented incorrectly; medium omission in evidence translation | One PostgreSQL executable does not make O and Temporal databases one logical backup snapshot or one recovery authority | Name exact engine stores/config/history-compatible Worker artifacts in the existing product recovery set; use the already-owned quiesce/reconcile/fence protocol | O OD-003/021/035/040; branch ADR-0116 |
| P3 | Medium analytical correction | Smaller local adapter LOC does not establish a cheaper whole product when hosted Temporal remains alongside a second local engine | Label ranges as narrow local/integration scopes and explicitly leave two-engine semantic/release maintenance unestimated; do not derive total-product ranking from the range | Existing engine-comparison dossier/OD-035, no new implementation decision |
| P4 | Wording guard, not a source defect | A blanket “no process per agent” would erase legitimate provider/native resource costs | Scope the prohibition to O/engine infrastructure; count AR/provider process/sandbox/workspace costs when the selected execution profile requires them | O deployment role map; AR technical-execution/native/capacity owners |

## P1. Count is insufficient even when the agents really execute

**Exact evidence.** O main `testing-strategy.md`, “Concurrent execution and service-role qualification”, requires workload, duration, hardware, connection budgets, saturation, hot-tenant contention and actual AR/provider evidence. Those are strong existing requirements. The first-round `vision-boundaries.md` qualification table adds “active execution count and duration” and `industry.md` requires a sustained interval and progress. Neither summary makes explicit the stronger existing AR acceptance contract.

AR main `agent-runtime-greenfield-foundation-plan.md`, **§11.1 Fleet qualification charter**, already requires a campaign-specific pass/fail contract before capacity qualification. It names:

- offered arrival rate/concurrency and whether new arrivals depend on completions;
- useful completion throughput and admission/start/cancel/settle/refusal bounds;
- steady-state/overload/recovery duration justified by turnover and retention/reclaim cycles;
- permitted drift and final bounds for backlog, output, actual waiters and cleanup debt;
- post-overload recovery/drain.

It explicitly says a completion-coupled generator can reduce offered load as the runtime slows, and supplies a rejecting case that delays append or retains closing obligations during each turnover. AR C0–C3 additionally distinguishes accepted/queued/granted from actual started execution and preserves `reclaim_pending` capacity until safe reuse.

**Counterexample.** A test maintains N actually executing operations while each completed operation leaves one unresolved pipe reader, closing process or workspace cleanup obligation. New operations start, so the advertised concurrency remains N, but retained debt grows with every turnover and eventual resource exhaustion is guaranteed. A completion-coupled generator can hide the throughput collapse by reducing arrivals. Neither counterexample needs parked workflows or fictitious execution. The count can be literally true and the sustainable-capacity claim still false.

**Minimal correction.** Reuse the AR contract, not another benchmark framework or new mandatory 10k CI. Proposed sentence for O:

> Actual execution-capacity claims also use the AR-owned fleet qualification charter: record the campaign's offered-load model and useful completions through execution turnover, enforce its bounded pending/output/cleanup debt and cancellation/settlement criteria, and demonstrate the declared post-overload recovery or drain; a sustained concurrency count alone is insufficient.

Link to:
`https://github.com/agent-teams-ai/agent-runtime/blob/ab0387c02fe75ed0c9bb456caaad9a6d2723795b/docs/architecture/agent-runtime-greenfield-foundation-plan.md#111-fleet-qualification-charter`.

The scenario is already owned, not a new AR defect or a reason to rewrite v3. Numbers belong to the campaign/profile under the existing numerical-target and release owners. No mass provider run is needed for the present documentation task.

## P2. A shared native PostgreSQL process still has several recovery participants

**Exact evidence.** PR90's retained `scripts/research/od035/temporal/initialize.ts` defines `temporal_spike_engine` and `temporal_spike_visibility`, explicitly creates both databases and assigns them as `defaultStore` and `visibilityStore`. The business connection has its own database. This is directly observed fixture configuration, not an inferred future production topology.

O main `persistence-boundary.md`, “Backup and restore”, already requires a product manifest, per-context admission closure/drain, integrity/compatibility checks, fresh recovery authority and external-effect reconciliation before dispatch. It expressly says PostgreSQL cannot atomically snapshot AR, NATS, filesystem objects or external effects. It also permits a whole-database logical dump if selected and distinguishes it from physical cluster restore. OD-003 still selects the actual local artifact.

PostgreSQL 18's official SQL Dump documentation, §25.1.2, says `pg_dumpall` invokes `pg_dump` separately for each database: each dump is internally consistent, but the databases' snapshots are not synchronized. Read on 2026-11-05: <https://www.postgresql.org/docs/18/backup-dump.html>. This is a specific limitation of logical multi-database dumping; it does not say a correctly qualified physical cluster backup is impossible.

**Counterexample.** An implementation carries forward an O-context backup participant set after integrating native Temporal. O mutation/dispatch admission pauses, but the separate engine can still advance timers and history. An O-only `pg_dump` omits engine state; independently timed dumps can capture O and engine at different recovery points. After restoration, the engine can consider an Activity completed while the restored O receipt/intent state predates it, or vice versa. Visibility is not the execution authority, so requiring visibility to be perfectly synchronous would also be the wrong fix. AR and external effects remain outside the SQL snapshot regardless.

The first-round reports correctly require “full-stack backup/restore”, but this concrete native-Temporal consequence should be named so “same PostgreSQL” cannot be mistaken for a complete recovery design.

**Minimal correction.** The existing recovery set and lifecycle protocol must bind the selected Temporal default/visibility stores as applicable, engine/config/schema identities and available compatible Worker code together with O state, blobs and external reconciliation obligations. For a logical backup, freeze the relevant participants or use an explicitly qualified consistent/reconciliation strategy; do not assume `pg_dumpall` supplies cross-database synchronization. Keep restored dispatch fenced until current authority and uncertain AR/effect outcomes reconcile.

The smallest future rejecting fixture restores a pending timer plus an app receipt/AR effect boundary from the actual product stores and proves there is no duplicated dispatch or falsely completed work. It belongs to the already required product restore qualification. Do not add a second backup framework, prescribe physical versus logical storage now, or claim current production restore is defective: production native-Temporal integration is not yet qualified.

## P3. The alternatives table needs a total-product cost caveat

`workflow.md` correctly scopes its figures to one representative owned coordination adapter plus native engine lifecycle/recovery/version integration and excludes general Supervisor, installers, business features and ongoing operations. It also says a second engine adds semantic/version/retention conformance maintenance. Those caveats should remain immediately next to any reused table.

The candidate labels, however, compare “native Temporal + PostgreSQL” with “DBOS/OpenWorkflow locally, Temporal hosted.” A reader can easily read lower local adapter LOC or lower complexity as lower total product engineering cost. That does not follow: the two-engine alternatives retain the hosted Temporal adapter, old-history support and hosted release requirements while adding local engine semantics and cross-profile conformance. A single representative adapter estimate cannot quantify that release lifetime, and the existing dossier ranges are not a measured total.

**Counterexample.** DBOS saves one local process but a future cancellation/retention/update requirement needs two engine-specific implementations and two migration histories. Counting only the new local adapter makes its initial local integration look cheaper while excluding the hosted implementation that remains necessary. Conversely, full Temporal's native distribution/upgrade burden is real and cannot disappear from its column merely because the same workflow SDK is used hosted.

**Minimal correction.** Retain the accepted candidate as baseline. Present the numerical table only for its stated scope; explicitly say total two-engine product cost is not estimated by it and cannot be ranked from those LOC. If a future measured local budget failure makes a successor comparison necessary, compare the same selected features, supported platforms, upgrade/recovery horizon and both deployments, with integration, tests and configuration separated. No new scores are justified in this critique because it introduces no newly researched implementation alternative or empirical cost evidence.

## P4. Infrastructure multiplicity and execution multiplicity are different

O's canonical wording is precise: no **Orchestrator** process, sidecar, SQL pool, database cluster or logical durable subscription per agent. AR's v3 plan separately counts preparing/running/closing operations, processes/containers, CPU/RAM, descriptors, workspaces and helpers. Its native owner retains actual custody; membership or leases do not establish physical fencing.

A provider harness may require one process or sandbox for an active execution. That is not a violation of the O rule and cannot be wished away by durable workflow multiplexing. A blanket prohibition on “a process per agent” in the synthesis would accidentally alter the execution contract and undercount the very fixed/per-execution cost the user wants understood.

**Minimal correction:** preserve the qualifier and measure the selected execution class. This is a review guard against possible compression of the reports, not a defect in their detailed source text.

## Claims I deliberately do not make

### Nine roles inherently make one-agent usage impractical

Not established. The accepted map requires each isolated role with its first owning feature, not nine empty services on day one. Once selected, a role must remain a separate OS process; choosing fewer capabilities cannot omit authority, observation, durable timers or cleanup required by an advertised useful Run. Measure the complete smallest supported product on named hardware. A two-role Team CRUD slice is not a one-agent product benchmark. If that complete required composition misses a calibrated low-end budget, an explicit compact-placement successor is a real option; today there is no measured basis to select it.

### A hot tenant requires cells now

Not established. O already qualifies concentrated same-team/tenant load and explicitly names Run authority gates, feed sequence and shared quota contention. OD-006 leaves exact containment/transactions open while preserving exclusive Agent occupancy. AR's capacity plan requires atomic quota/reservation accounting and explicitly prevents `SKIP LOCKED` lock luck from being called fairness. The source-backed next work is bounded owner-local transactions and a campaign that reveals contention. A cell, shuffle shard or universal scheduler before that evidence adds migration and authority complexity without proving capacity.

### Replicas eliminate SQL/custody limits

False, but already explicitly rejected. O's persistence contract counts every pool across live instances, rollout surge, terminating instances and overlapping rollouts. Its role map says Dapr balances only interchangeable methods and cannot transfer workspace affinity/custody. AR says a reclaim-pending resource cannot be granted again until a fence acknowledgement or enforced quarantine makes reuse safe. The reports should point to these open qualification owners, not manufacture new architecture findings.

### A single Temporal engine makes deployment topology identical

False, and already correctly rejected. Native all-services-in-one-process Temporal is compatible with separately scaled hosted Temporal services; neither permits collapsing selected O role processes. Immutable Temporal history-shard configuration and native upgrade paths remain qualification concerns. Same semantic architecture is not an automatic in-place resize or zero-downtime migration guarantee.

### Upstream mechanism counts prove actual agent capacity

False. Actor count, open workflows, queue consumers, pollers and dispatch fairness do not measure resident provider operations, active resource vectors, account limits or sustained useful completions. The first-round reports already handle this correctly. Do not weaken that distinction while shortening the final answer.

## Evidence coordinates

- O main `5a8496ce711909e381c5bc817fff5500be9a1761`: `AGENTS.md`; `docs/architecture/deployment-profiles.md` (concurrent target, role map, deployment forms); `testing-strategy.md` (concurrent/service-role qualification); `persistence-boundary.md` (admission/resource budgets, backup/restore); `local-host-lifecycle.md`; OD-006, OD-033 and OD-040.
- AR main `ab0387c02fe75ed0c9bb456caaad9a6d2723795b`: `docs/architecture/capacity-admission-delivery-plan.md`; `agent-runtime-greenfield-foundation-plan.md`, especially §§5/7/8/11.1 and staged G1–G5.
- Organization standards main `0b44c64c824f536bd1b085341e7669bcc64ef124`: complete Engineering Quality Standard read; ownership, comparable alternatives and risk-based evidence govern this review.
- PR90 supplied head `0af892165a023a274302f89b47ba514ab2915e59`: retained `scripts/research/od035/temporal/initialize.ts` read from the exact branch extraction at `/tmp/agent-teams-scale-20261105/workflow-evidence`; engine choice/status taken from the primary review and root's live audit, not independently re-certified.
- PostgreSQL 18 official §25.1.2 SQL Dump: <https://www.postgresql.org/docs/18/backup-dump.html>. Successfully opened after both search engines; root can reopen for final citation. Web references available from this agent: `turn455view0` / `turn455search0`.

## Draft review status

At initial checks, O checkout was clean and no canonical draft delta was yet present. The root is preparing drafts; this report will receive a scoped addendum after those changes are available. No document rewrite or checker run is justified merely by this review.

### Actual O/S draft review addendum

Reviewed the root's actual seven-file O working-tree diff and the standards README diff on 2026-11-05 after the initial report. O changes cover AGENTS, deployment profiles, evolution quality attributes, overview, persistence, reliability and testing. S adds only product/research navigation.

- **P1 resolved in O draft:** `testing-strategy.md` now links the AR-owned fleet charter and explicitly requires offered load, useful completions through turnover, bounded pending/output/cleanup debt, cancellation/settlement and recovery/drain. It does not change AR requirements or introduce a benchmark framework.
- **P4 resolved in O draft:** deployment target explicitly retains AR/provider processes, sandboxes and workspaces when required per execution and includes them in resource accounting.
- The actual target remains an architectural/qualification target; OD-030 retains numerical calibration/approval. The process map, per-Run qualification, hot-tenant requirement and occupancy/custody invariants remain intact.
- One-agent measurements include complete selected composition, not just the two-role Team slice. The lifecycle paragraph does not promise to run timers on a sleeping machine or select scale-to-zero implicitly.
- S README remains navigation and does not transfer product architecture authority to the organization repository.
- **No substantive O/S blocker found.** P2's concrete Temporal restore trace and P3's scope caveat belong in the forthcoming research narrative; they do not require broadening this bounded O vision edit or inventing another gate.

### Final integrated research study review

Read the complete root-authored `docs/studies/one-agent-through-enterprise-execution.md` in the materialized engineering-research checkout on 2026-11-05. This is one combined new study; no second new study is required. Review covers substantive claims and scope, not an independent rerun of external experiments or documentation CI.

**Disposition: approval with the stated evidence limits; no architecture or experiment blocker.** P1–P4 are now correctly incorporated: the existing AR sustainable-capacity charter accompanies actual executing counts; the PostgreSQL multi-database restore trace remains under existing owners; provider/native resource multiplicity is retained; and the LOC table explicitly prices local integration only and cannot rank total two-engine product cost. Industry mechanisms remain candidates/evidence rather than implicit adoptions. Branch acceptance, main status, historical component evidence and product qualification stay separate.

Two small wording corrections were sent to the root before handoff:

1. Replace categorical “The architecture is feasible” with “The architecture remains a credible direction” (or equivalent). The study establishes source-backed architectural plausibility, not feasibility of either still-unmeasured product resource envelope. The surrounding caveats already state this correctly; the opener should match them.
2. Replace “Adopt a successor engine only ... after a measured local budget failure” with a nonexclusive trigger statement: a measured budget failure would justify preparing a successor comparison; any engine change requires its owning explicit successor decision and equivalent qualification. Accepted branch ADR-0116 identifies budget failure as a DBOS reconsideration trigger, while its replacement boundary is more general. Research should not accidentally create an exclusive new decision gate.

Neither correction requires production work, another owner question, a checker, a new acceptance checklist, or repeated engine research. The study's factual qualification limits remain essential: no installer/whole-product footprint result, no real fleet execution result, no native release certification and no automatic live local-to-cloud migration guarantee.
