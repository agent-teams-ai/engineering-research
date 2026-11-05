# Second-round workflow and lifecycle critique

Date: 2026-11-05. Independent reviewer: `scale_workflow_adversary`. Read the task brief, first-pass `workflow.md` and `industry.md`, Orchestrator main instructions and the organization quality standard; inspected the actual PR90 fixture, ADR-0116, current OD-005/021/033/040, exact upstream Server 1.32.1 and SDK 1.24.0 source, and current official documentation. No production or remote mutation, engine rerun, provider execution, or capacity benchmark was performed.

## Verdict

**Keep the accepted-on-open-PR90 full native Temporal + PostgreSQL direction. Do not promote it to merged policy or a qualified product.** The same engine is a credible way to reduce semantic differences between Desktop and cloud. The full server's existing all-services process is a sound first local composition to qualify. Neither engine sameness nor this composition establishes a convenient one-agent product or a ten-thousand-executing-agent product.

The first-pass reports are substantially careful and do not need another engine contest. However, four items need sharper treatment before their conclusions become canonical: the Node baseline conflict is real; strict-priority fairness does not meet the already-written starvation bound; polling removal needs a no-lost-wake invariant; and skipped releases need a Worker-history support horizon in addition to a server/schema upgrade sequence. The remaining changes below belong to existing owners.

## Findings and minimal corrections

### 1. The Worker runtime mismatch is an actual contract conflict, not just an upstream caveat

Main `AGENTS.md` sets Node **26.11.1** as the default and Node **24.21.0** as a compatibility lane. Main OD-005 says the first official Temporal Worker uses the repository's pinned Node baseline. Exact SDK **1.24.0** `README.md`, inspected locally at `1fd1c81a0383f5f5c7923dd735472c7d1ffdc867`, lists official support for Node **20/22/24**. The PR90 fixture ran Node **24.21.0**. The SDK README does not establish that Node 26 fails; it establishes that the claimed supported combination has not been shown.

**Correction:** route this to OD-005 plus the existing runtime/dependency owner before the first Worker package is materialized. Record the exact release Worker runtime and SDK support evidence. If a later qualified SDK supports the repository baseline, adopt that combination through the normal dependency route. If the implementation needs a separate supported Worker runtime, resolve that narrow contract explicitly; do not silently downgrade the whole repository or infer permission from a compatibility lane. This is not a reason to choose another language or another engine.

Evidence: main [OD-005](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/open-decisions/OD-005-temporal-workflow-boundary.md), main [AGENTS](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/AGENTS.md), [SDK requirements at the exact tag](https://github.com/temporalio/sdk-typescript/blob/v1.24.0/README.md#nodejs), retained platform `results.json`.

### 2. Existing OD-033 starvation freedom is stronger than Temporal's priority/fairness mechanism

Exact Server 1.32.1 source has `matching.useNewMatcher=true`, `matching.enableFairness=false`, and five default priority levels. Exact SDK 1.24.0 defines and serializes `priorityKey`, `fairnessKey`, and `fairnessWeight`; its documentation says lower priority keys win before fairness is considered. These are verified source/API facts, not a running feature qualification.

OD-033 already requires maintenance progress under continuous interactive arrivals, with a finite bound in eligible grant opportunities under stated assumptions. Mapping Interactive to a higher strict priority and Maintenance to a lower priority cannot discharge that requirement: a perpetually nonempty higher-priority backlog can deny the lower tier indefinitely. Fairness within the higher tier does not fix this. This is a concrete semantic mismatch, even if every task has identical duration.

**Correction:** retain Temporal metadata as the leading mechanism to test, but say exactly which dispatch guarantee it implements. The existing policy owner must choose a mapping/admission policy compatible with its progress bound. For example, a common priority tier with qualified weights has different latency properties from strict priority plus already-owned capacity reservation. Neither option authorizes a generic cross-role scheduler. The current 80–250 LOC estimate is defensible only for metadata mapping once that policy is defined, not for the missing starvation guarantee.

Current official docs also say fairness mode changes drain the old backlog before dispatching new-mode tasks. Treat mode changes as an operational transition to qualify, not an emergency control for an already overloaded queue. This transition behavior was read in current docs, not executed or independently traced through every exact-pin server path. Do not attribute newer rate-limit/override controls to the research pins merely because the current page lists them.

Evidence: exact [server dynamic configuration](https://github.com/temporalio/temporal/blob/af08a5e5f2dd40f545f2afac7780daaa6987001e/common/dynamicconfig/constants.go), exact [SDK Priority contract](https://github.com/temporalio/sdk-typescript/blob/1fd1c81a0383f5f5c7923dd735472c7d1ffdc867/packages/common/src/priority.ts), main [OD-033](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/open-decisions/OD-033-ooda-convergence-and-context-activation.md), current [priority/fairness guide](https://docs.temporal.io/develop/task-queue-priority-fairness#enabling-or-disabling-fairness-with-an-active-backlog).

### 3. Outbox wakes should replace the fixture cadence, but a wake is a durable hint to recheck authoritative state

The actual fixture is `readState -> condition(notified, 2s) -> clear notified -> repeat`, with the handler registered before reads. It has no rollover. A parked workflow still repeatedly schedules Activities and timers. The first-pass arithmetic of approximately **5,000 reads/second for 10,000 waits** is a useful idealized extrapolation of that cadence; Activity duration, task queueing and saturation change the achieved rate. This is not a production defect or measured capacity. No-op waiting also grows engine history and storage; database read rate alone understates the cost.

Do not describe the existing fixture as having an observed lost-wake bug. Its timeout intentionally closes the committed-state/no-signal gap. The danger is a naive replacement: read old state; state commits and its signal arrives; clear a boolean; wait forever. Reliable outbox publication does not repair a signal that application-level wait logic discards after delivery.

**Correction:** OD-005's first feature-owned adapter should establish level-triggered convergence: a committed revision or a signal-arrival epoch observed before an authoritative read, followed by a re-read if another notification arrived during the read. Clearing a flag before the read is another small implementation shape if the exact read/notification semantics make it sufficient. Do not clear unseen progress between a stale read and indefinite sleep. Keep bounded, feature-owned reconciliation for missed/expired delivery and restore; it should use the existing dispatch/reconciliation machinery and measured cadence, not one fast polling loop per waiting workflow.

Also qualify three existing-boundary cases: delivery before initial workflow registration; delayed delivery to a completed or superseded process generation; and notification during Continue-As-New. A convenient signal-with-start call must not resurrect a terminal process or start a stale generation. Product state and generation remain authoritative. Signal acceptance only establishes that the service accepted the signal, not that business reconciliation occurred. Safe rollover must preserve the needed state/dirty revision and finish relevant handlers; a fresh history is not permission to drop pending work.

The smallest useful fixture has one committed state change in each unsafe window, one duplicate, one dropped publication followed by reconciliation, and one rollover. It asserts final owned state and effect count, not merely an SDK completion status. No new broker or scheduler is needed.

Evidence: exact [fixture workflow-common.ts](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/0af892165a023a274302f89b47ba514ab2915e59/scripts/research/od035/temporal/workflow-common.ts), main eventing transaction/outbox contract, [signal acceptance and handler semantics](https://docs.temporal.io/develop/typescript/workflows/message-passing#send-a-signal-from-a-client), [Continue-As-New](https://docs.temporal.io/develop/typescript/workflows/continue-as-new). Counterexample and proposed invariant above are review reasoning, not an executed product failure.

### 4. Skipped releases have two independent version horizons

Current official server upgrade guidance requires consecutive minor upgrades, the latest patch of each minor, and schema migration before the corresponding server step when required. It advises allowing about ten minutes per version for shard metadata work. This is upstream operational guidance, not a certified laptop outage or a completion predicate. A qualified updater needs completion evidence at each admitted step, not a chain of blind sleeps.

The less explicit gap is **Worker history age**. Testing only N/N-1 histories does not prove that an installation that skipped several Desktop releases can resume a workflow last touched by N-5. Sequential server upgrades do not automatically transform application Workflow commands, payload converters, or old pinned Worker routing. Conversely, retaining every old Worker process forever can invalidate the local idle budget.

**Correction:** OD-005/021/040 should bind the supported persisted-state horizon: which previous releases can upgrade automatically, which intermediate bundles are staged, how old histories are drained/patched/reconciled with one owner, and the bounded availability/retention of required Worker versions. Reuse the existing activation journal and migration authority; do not build a second upgrade manager. An unsupported starting version must produce a typed recoverable outcome preserving data, not reinitialize the engine database. Exact install/update artifacts need to include the necessary old-runtime and schema dependencies for the declared offline path.

The release test should start at the oldest **declared supported** persisted state, not at an arbitrarily chosen adjacent version. Interrupt the actual unsafe transitions and verify recovery. A server schema change, business-schema change, Worker deployment change and PostgreSQL engine change are separate compatibility edges. A PostgreSQL cluster backup can cover multiple databases only when its chosen backup mechanism actually does so; a business-only dump does not include Temporal default/visibility stores. Existing OD-003 backup manifests and dispatch fencing already own cross-store validation and fresh authority after restore.

Evidence: [official upgrade procedure](https://docs.temporal.io/self-hosted-guide/upgrade-server), [Worker deployment guidance](https://docs.temporal.io/production-deployment/worker-deployments), PR90 ADR-0116 obligations 3–5, main local-host lifecycle and OD-021. The history-horizon contradiction is an inference from long-lived histories plus skipped application releases, not a newly observed replay failure.

### 5. Same engine does not promise transparent migration of an existing four-shard installation

The immutable `numHistoryShards` claim is correct. Exact server `temporal/server.go` also has the mismatch diagnostic that persisted configuration wins when this value changes. The fixture selects four history shards. Adding history processes can redistribute existing shards; it does not create new ones by changing that setting. The official production checklist calls for a rebuilt service plus migration when more shards are required.

**Correction:** distinguish three claims: common product architecture, horizontal growth within a qualified provisioning envelope, and migration of live existing work into a different engine cluster/Target. The user's architecture objective establishes the first; it does not automatically promise the third. Pick a measured shard profile at provisioning and expose the existing capacity boundary. Do not burden the first parity slice with automatic resharding or local-to-cloud transfer. If later product language promises seamless migration, qualify it explicitly with OD-005/021 and persistence/authority owners. Copying a database and changing `numHistoryShards` is not that migration.

Temporal replication, if selected later, would cover its own state. Business schemas, receipts, AR custody, authority grants, artifacts and external-effect uncertainty still require their existing owners' transfer protocol. PR90 explicitly disclaims cross-Target synchronization and portable engine histories; preserve that limit.

Evidence: [service configuration](https://docs.temporal.io/references/service-configuration#numhistoryshards), [production checklist](https://docs.temporal.io/self-hosted-guide/production-checklist), exact [server.go](https://github.com/temporalio/temporal/blob/af08a5e5f2dd40f545f2afac7780daaa6987001e/temporal/server.go), exact fixture `initialize.ts`, PR90 ADR-0116 replacement boundary.

### 6. The single-process server is verified; “best small installation” remains a recommendation

Exact Server 1.32.1 `cmd/server/main.go` constructs one `temporal.NewServer` for the selected services; default services are frontend/history/matching/worker. The retained fixture exercises that full server with PostgreSQL and a separate SDK Worker. This is neither the SQLite dev server nor a fabricated embedded scheduler. An all-in-one service process is a suitable starting point without relaxing the selected Orchestrator role boundaries.

There is no component comparison proving it is the minimum-memory placement. The **517.2 MiB** figure is the sum of Linux server and Worker RSS immediately after Worker readiness, after schema migration and PostgreSQL startup. It is not steady idle, peak memory, private-memory accounting, total host memory, or an optimized floor; RSS can count shared pages in more than one process. It excludes the rest of the selected product. Server readiness is not time to first actual provider execution. The reports mostly say this correctly; preserve those qualifications whenever the headline number is reused.

**Correction:** call all-in-one the first composition to qualify. Measure the release process tree at fresh install, warm idle, first execution and upgrade overlap. Record selected features and all actually required role/sidecar processes. Include old pinned Worker availability in the upgrade footprint. Prebundling is a plausible startup optimization, not a measured saving. A one-agent acceptance budget needs named hardware and an explicit owner-approved target before “convenient” can become a release claim; no research snapshot supplies that target.

Evidence: exact server entrypoint/defaults above; retained Linux results and `run.ts` resource snapshot; fixture `worker.ts` uses `workflowsPath`, not a prebuilt workflow bundle.

## Prioritized owner routing

| Change to the research/draft | Existing owner | Gate affected |
| --- | --- | --- |
| Make Node26/SDK1.24 support mismatch a concrete unresolved dependency contract | OD-005 and runtime/dependency owner | First Worker package and exact release qualification |
| State that native fairness does not establish OD-033 starvation freedom or downstream safety capacity | OD-033, OD-005 adapter, AR capacity owner | Classified admission and bounded progress |
| Add no-lost-wake, delayed-generation and rollover acceptance semantics | OD-005 plus feature outbox/reconciliation owner | First real workflow integration |
| Bind oldest supported persisted release and old Worker availability | OD-021/040 with OD-005, OD-003 | Skipped-release/offline update and restore |
| Distinguish profile provisioning from live cluster/Target migration | Deployment qualification, OD-005/021, OD-003 | Claims about growth beyond a configured envelope |
| Preserve precise 517 MiB observation scope and measure complete useful profile | OD-040/deployment qualification | One-agent usability and actual executing-load evidence |

These are refinements of already-owned work, not six new architecture decisions or a reason to defer all implementation until fleet capacity is measured.

## Scoped estimates and confidence

Scores are independent engineering judgments: reliability is expected robustness after qualification, confidence is current evidence, and complexity is engineering/operational difficulty. They are not uptime or capacity measurements. LOC are **incremental within an already-created first owned workflow/lifecycle adapter**, exclude generated/vendor code and business feature logic, and must not be added mechanically to the first report's total adapter estimate.

| Bounded choice | R / C / X, out of 10 | Integration LOC | Focused test/fixture LOC | Config/migration wiring LOC |
| --- | --- | --- | --- | --- |
| Native all-services server composition through existing Supervisor component contract | 8 / 8 / 4 | 60–180 | 100–250 | 40–120 |
| Feature-owned outbox wake/recheck and bounded rollover using existing contracts | 9 / 7 / 4 | 150–350 | 300–700 | 20–60 |
| Map an already-approved fairness policy into verified Temporal fields | 8 / 7 / 3 | 80–250 | 200–500 | 20–80 |
| Add a bounded, declared skipped-release path to an existing lifecycle journal, including Worker compatibility edges | 8 / 5 / 8 | 400–1,000 | 600–1,400 | 100–300 |

Ranges are roughly 2× uncertain until adapter structure is concrete. The lifecycle row excludes a general updater, downloading/signing, PostgreSQL major-version migration, backup implementation, all-platform installed tests and operational support. Its estimate assumes those existing owners provide their promised ports. Full live cluster migration and a custom scheduler are deliberately unestimated: neither is required for the present parity study, and neither has a defined product contract. Reliability/confidence of an **already released integrated product** cannot be scored from the research component tests.

## Genuine owner questions, without blocking this documentation task

No engine-choice confirmation is needed. Native Fully Local V1 and the common one-agent-to-large-fleet architecture are already directed. Routine mechanism selection remains engineering work.

Before release, the existing owners must fix the minimum supported local hardware/resource envelope and the oldest persisted installation that upgrades automatically. These determine whether native Temporal's actual cost is acceptable and how many upgrade artifacts/history versions must remain serviceable. Do not invent numerical limits here. A separate product question arises only if “grow” is later advertised as moving an active local Target into cloud without interruption; current accepted constraints do not make that promise.

## Evidence bounds and draft-review status

Initial pass: no new O/R canonical drafts were present. Subsequent review examined the actual Orchestrator diff across AGENTS and six architecture files. No workflow/lifecycle blocker was found: it preserves accepted process boundaries, requires the complete composition including outstanding obligations, separates executing agents from parked workflows, and does not silently adopt PR90 on main. A minor precision suggestion is to bind “bounded wake” to a declared supported trigger while the required host resources are available; the adjacent warning about sleeping devices already limits the claim. The R study still contained only writer-created placeholders at this review point and was not substantively reviewed.

This critique does not invalidate the corrected three-OS component evidence, claim Node26 incompatibility was executed, or claim the fixture's current wake loop loses signals. It identifies the exact unsupported extrapolations and the smallest existing-owner changes needed to avoid them.

## Final substantive R draft review

Reviewed the complete integrated `docs/studies/one-agent-through-enterprise-execution.md` on 2026-11-05, content SHA-256 `efd4a705b5e4833b1098fc3ea6e25ca52ddb234054f01b9a5cc354cd850ffbe0`. This review is of the supplied materialized file, not a claim that the research directory is a git checkout or that publication checks passed.

**Disposition: approve as research/documentation, with no remaining workflow/lifecycle blocker.** The draft incorporates the substantive corrections:

- Exact-pin source/API observations, current upstream guidance, historical component execution, arithmetic and unmeasured product work remain distinct. PR90 is correctly owner-accepted on an open, unmerged proposal, while main OD-035 remains open.
- The 517.2 MiB sum-RSS observation and 80 parked workflows are bounded precisely. Neither is used as a local idle floor or execution-capacity certificate.
- Node26 support is explicitly unresolved against the exact researched SDK tuple. Replay covers the oldest admitted history horizon, with the dormant N-5 example correctly presented as a lifecycle scenario rather than an observed failure.
- Temporal fairness is not credited with the existing maintenance starvation bound, resource-time fairness or reserved downstream cancellation capacity. Current mode-transition documentation is not presented as an executed pin-specific feature test.
- The wake section states the required stale-read/no-lost-progress invariant and the registration, read-to-wait, rollover and successor-generation windows. Its prose is sufficient for this research scope; algorithm pseudocode is unnecessary. It does not falsely label the current fixture a demonstrated lost-wake defect.
- The multi-database backup statement is supported by the linked PostgreSQL 18 documentation, independently reopened in this pass: pg_dumpall invokes separate per-database dumps whose snapshots are not synchronized. The draft routes restore sets, quiescence, receipts and fencing through existing owners, and does not claim every physical cluster backup is inconsistent.
- The alternatives table now explicitly prices a narrow local adapter/lifecycle scope, excludes hosted integration and broad packaging, and separately warns that two-engine conformance/release cost is unpriced. It cannot reasonably be read as a whole-product complexity ranking. Ordinal R/C/X values remain judgments, not measured availability.
- Profile-specific history shard provisioning is distinguished from unqualified live cluster/Target migration. No automatic resharding, cloud dependency, custom scheduler or full-product benchmark is promised.

Limits of approval: no production code, fairness behavior, installed lifecycle, upgrade/restore path, Node26 Worker execution or fleet capacity was executed by this reviewer. Existing first-slice and release gates remain necessary. Documentation protocol checks and publication review belong to the coordinator's actual evidence. No additional user confirmation or new architecture decision is required for publishing this accurately scoped study.
