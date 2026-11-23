---
id: research.competitors.waku-agent-second-pass-2026-11-23
type: research
status: active
owner: research/maintainers
summary: Second-pass Waku source audit with real CI evidence, critical execution paths, architectural risks and bounded owner actions.
---

# Waku Agent vs Agent Teams — second-pass source and risk review

**Reviewed 2026-11-23.** This is a targeted follow-up to the [original Waku dossier](waku-agent-2026-11-23.md), not a silent refresh of its 13-criterion scorecard or an accepted product decision. The original dossier pins Waku at `edc3bc5`; this report pins its **later** revision `981d4d1`. Findings distinguish inspected source, exact-head GitHub Actions results, engineering inferences and absent E2E.

## Immutable sources and evidence limits

| Component | Pin | Evidence examined |
| --- | --- | --- |
| Waku local / hosted | [981d4d171cb5](https://github.com/ShenSeanChen/waku-agent/tree/981d4d171cb5290ad825d7af84fd49fdbd643adb) | Agent loop, graph, approvals, worker, outbox, memory, provider registry, delegated Pi, hosted Docker mechanisms, tests, actual CI job logs |
| Agent Runtime | [0ce60d747415](https://github.com/agent-teams-ai/agent-runtime/tree/0ce60d7474159396132752a625c914ffa87c5049) | Contained-turn dispatch and committed proof, source-tree layout, readiness, capacity plan |
| Orchestrator | [c6ce98cd1a8a](https://github.com/agent-teams-ai/agent-teams-orchestrator/tree/c6ce98cd1a8ac1dd27ec877c018e5aa7cd5adff7) | Narrow implemented slices, eventing, collaboration, Fully Local and service placement decisions |
| Platform | [3bbc11ee08cf](https://github.com/agent-teams-ai/agent-teams-platform/tree/3bbc11ee08cf7c896ed4228a3fd3e6eb5ac5d745) | Real project-scope admission slice and installation/authority boundaries |

**Not done:** we did not rerun upstream suites, conduct a live provider/Slack/Gmail workflow, kill an actual external-effect worker at the critical instruction, perform security penetration tests or run common active-agent fleet performance trials. A documented scenario is not a reproduced incident. Waku's local assistant and Agent Teams' planned large multi-human/multi-agent platform are different cohorts; only named, fixed scenarios may be compared. No project has demonstrated a common thousand-active-agent workload in this audit.

## Correction to prior report: exact CI logs are stronger evidence

The [validate workflow](https://github.com/ShenSeanChen/waku-agent/actions/runs/45238359840) at Waku `981d4d1` finished **SUCCESS**. Its actual downloaded job log recorded **4,865 passed / 62 skipped / 0 failed** deterministic tests. The separate [hosted-docker workflow](https://github.com/ShenSeanChen/waku-agent/actions/runs/45238359846) at the identical HEAD finished **SUCCESS** with **52 passed / 0 skipped / 0 failed**. Its job built both images, mounted XFS with quota enforcement, confirmed an enforced project quota and ran real Docker-level checks. The main 62 skips are not passes; neither workflow establishes all live integrations, Windows qualification or cross-host capacity.

**Positive security counterevidence:** the [container template][w-template] restricts root filesystem, capabilities, new privileges, PIDs and resources; [hosted tenant networking][w-tenant] explicitly constrains cross-tenant network access; [Docker isolation tests][w-docker] assert kernel-enforced restrictions and actual denial. This is notably stronger than mock-only security. Still, Waku's [hosted deployment][w-hosted] starts from a single Ubuntu VM and capped running tenants. It is not a distributed active-agent capacity benchmark. The older [status document][w-status] reports 4,739 offline tests as of 2026-11-20; do not reuse that historic count as the exact-head outcome.

## Critical source-path findings

### WA-01 — Post-effect/pre-receipt approval crash window

[Worker._resolve][w-resolve] performs the stored approved tool call before persisting the approval outcome and resolving the parked Run. [Worker recovery][w-step] requeues a claimed input after restart. If a non-idempotent third-party effect succeeds and the worker dies before the durable resolve, approval input can be retried with the call still parked. This is **source-derived potential duplicate external execution**, not a reproduced upstream incident. The [approval tests][w-approval-tests] include normal replay and deny cases; a killed-worker reproduction at this exact post-effect point was not performed here.

**For Agent Teams:** keep AR's [committed dispatch proof][a-proof], semantic effect identity and uncertain result; product approval is a separate Orchestrator owner. Test loss of ACK after dispatch with changed authority and no blind replay. A unique outbox row does not make arbitrary remote tools exactly-once.

### WA-02 — Model replay identity derived from invocation order

[Waku run matching][w-runs] uses the first event to find a previous Run; [outbox next_key][w-outbox] derives an outgoing key from Run ID plus call ordinal. The [outbox insert][w-outbox-insert] drops an existing key without checking canonical payload equality. A model that changes action order after replay can change the meaning of the same ordinal. **Inferred risk**, not a recorded duplicate-write event. AR's [technical dispatch][a-dispatch] and Platform's [command receipt][p-admission] keep stronger scoped identities; those are implemented slices, not whole-system proof.

### WA-03 — Shallow shared graph state despite top-level collision checks

[Graph.run_one][w-graph] passes `dict(state)` (shallow copy) to each node and validates collisions only among returned top-level keys. A node can mutate an aliased nested dict/list and affect another branch without returning that key. Ready waves allocate `ThreadPoolExecutor(max_workers=len(wave))`, without a separate total-concurrency budget, and there is no durable graph checkpoint across process death. The [graph tests][w-graph-tests] cover top-level collisions and ordered fan-in, not nested aliasing. Reuse deterministic *routing decisions*, not the graph executor or mutable blackboard, for distributed Orchestrator workloads.

### WA-04 — A skipped judge can coexist with an open release gate

[Release gate][w-gate] runs judged suites only when an API key is present. If absent, it records `judge=skipped`, prints a skip reason and then prints `GATE OPEN` with exit code zero. This can be a reasonable offline-development policy, **not** evidence of a completed judged release. Distinguish required and optional suites, and never report `SKIPPED`/`QUEUED` as `PASS`. The Waku GitHub default CI verifies deterministic tests; it does not claim the judge tier passed in CI.

### WA-05 — Experimental delegated subprocess may disclose provider credentials

The **opt-in** [Pi delegate tool][w-delegate] retrieves a provider API key, adds it to child-process argv and then writes the constructed command line to a plaintext transcript. The [test][w-delegate-test] even expects the API key flag; the [environment helper][w-env] strips only explicitly denied environment names and does not redact argv. This provides a direct **source-level credential exposure path** when that experimental mode and a configured provider key are used; not a claim of a confirmed third-party compromise or default hosted leak. Recommend responsible private upstream review, not public exploit automation. Our Runtime provider/custody adapters should never put secrets into argv, diagnostics, transcripts or errors; verify with a synthetic canary.

### WA-06 — Shared-channel memory needs authorization, not model etiquette

Waku's [shared-channel prompt][w-shared] admits a past personal-memory disclosure and candidly says the extra instruction is not an isolation wall. [Research-first search][w-brain] uses `scope=all`, relying on the upstream memory service to enforce the trusted actor's scopes. Separate hosted team-home keys are meaningful mitigation. We **cannot** infer from `scope=all` alone that server-side authorization is absent. For Orchestrator/Platform memory consumers: trusted scope, identity, recipient and grant-revocation enforcement before retrieval and before output; add stale cache and streaming disclosure E2E.

### WA-07 — Hosted policy has explicit cross-layer tradeoffs

The [hosted policy][w-policy] defaults unknown paths to the `/` PASS rule while maintaining a conformance test against the known route inventory. Container isolation and gateway authentication remain distinct layers. This is a *change-coupling risk* if route classification and enforcement drift, **not** proof of an exploit. Prefer default-deny at sensitive public contracts and keep real route coverage checks; do not discard Waku's verified kernel isolation strengths.

### WA-08 — Provider catalog correctness differs from compatibility

[Waku model access][w-model] reads the [providers TOML][w-providers] for provider definitions and derives UI/catalog metadata. That is a valuable DRY mechanism. But an upstream [model-picker bug](https://github.com/ShenSeanChen/waku-agent/issues/137) reports models that 404, and the [Responses API support request](https://github.com/ShenSeanChen/waku-agent/issues/341) shows protocol gaps. In AR, one Provider Access owner must distinguish configured/discovered from **verified on exact model/protocol/OS**. Do not create a second model registry in Orchestrator or Platform.

## Positive Waku designs not to overlook

- **Transparent per-turn QA:** [turn_evals][w-turn-evals] grades spend claim, report count, source-backed numbers, handled tool errors and budget adherence as pass/fail/**n/a**. A very useful user-facing *advisory* read model, never runtime authorization or correctness proof.
- **Graph topology from live definitions:** [Graph.describe][w-graph] supplies nodes and edges consumed by the dashboard. We can render our Task→Run→Operation→tool→receipt from **existing** workflow definitions and versioned observations instead of hand-maintained UI diagrams or a new scheduler.
- **Memory before research:** [brain.read_first][w-brain] searches prior reports, reads digest-sized summaries and avoids repeating the full context. [Consolidation][w-consolidation] suppresses redundant recalled facts and transient account/tool state. Measure this against direct authorized retrieval and existing Hindsight/provider capabilities before adoption.
- **Effective lightweight local investigation:** SQLite state, per-turn trace, deterministic tests and explicit waiting/outbox status make a single user's agent easy to debug. Waku's provider-neutral *agent loop* is readable, but that does not make its entire hosted infrastructure small.

## Agent Teams critique: do not let strong architecture become excessive ceremony

### AT-01 — Many tiny forwarding/composition surfaces

At the pinned Git trees, our counting convention (source `.ts` under `packages/` or `apps/`, excluding tests) found **818 Runtime production source files**, including **117 smaller than 500 bytes** and **128 under a `/composition/` path**. Examples are [re-exporting composition][a-wrapper] and [feature internal exports][a-internal]. These may intentionally enforce imports; **file count alone cannot prove overengineering**. It is, however, a concrete reason to run a fixed-task change-cost measurement before adding new packages and wrappers. Remove only redundant edges that do not enforce a meaningful boundary.

Waku also has a **real opposite risk**: a compact loop coexists with large coordinators. At the pinned source: `waku/ops/dashboard.py` ~1,894 lines, `hosted/gateway/app.py` ~1,155, `waku/ops/turn_evals.py` ~991, `waku/alwayson/worker.py` ~687 and `waku/loop/models.py` ~631. File size is not by itself a defect, but inspect coupling and test surface. Ideal direction: cohesive features with one invariant owner, neither god-coordinator nor unnecessary one-line layers.

### AT-02 — Architectural plans far ahead of the integrated product

Orchestrator has **18 implementation .ts files** in its two narrow current features, Platform **42 source .ts files** mostly in project-scope admission. These counts are for the **three named canonical public repositories**, not all Agent Teams work. [Runtime readiness][a-readiness] says one exact target is implementation-qualified and none deployment-qualified; [Orchestrator profiles][o-profiles] remain V1 targets with qualification blocked. The [Platform boundary][p-boundary] retains proposed details. A large ADR inventory does not substitute a user→Task→Run→real provider→visible receipt→approval/recovery end-to-end slice.

### AT-03 — Fully Local is intentionally heavy

The accepted [Fully Local design][o-local] selects native PostgreSQL, `nats-server`, admitted service/worker processes and needed `daprd` components. The [Temporal decision][o-temporal] selects full native Temporal backed by PostgreSQL. Its uniform server semantics and durable recovery are real design benefits, but compared with Waku's one-file local baseline the local install, cold start, idle RSS/CPU, disk, upgrade and disaster recovery are **much more demanding**. These costs are not qualified yet. Do **not** overturn accepted choices from a competitor source review; measure budgets and failure cases on supported OSs first.

### AT-04 — Thousands-active is a target, not evidence

[Runtime capacity plan][a-capacity] distinguishes Stage K's synthetic 32-claim/eight-slot database model from real workers, which it did not run. Orchestrator's independent service-role map is a design suitable for distributed growth, but it is not a measured 1,000-active-agent outcome. Measure active execution, not idle identities or queued work; declare provider limits, worker placement, tenant skew, cancellation latency, overflow and resource costs.

## Two separate 10-point lenses, not a combined winner

These are **advisory engineering judgments in named scenarios**, not new scores under the frozen 13-criterion method. Never average current implementation and conditional target values.

| Fixed question | Waku source now | Agent Teams now | Agent Teams conditional selected design |
| --- | ---: | ---: | ---: |
| Fit to distributed human+AI teams, multiple organizations and large fleet | **3/10** | **unscored** | **9/10** |
| Simple local personal assistant deployment and debugging | **9/10** | **unscored** | **5/10** |
| Correctness model for effect/custody after crash | **4/10** | **7/10 scoped** | **9/10** |
| Selected real Docker tenant isolation | **7/10 scoped** | **7/10 scoped runtime containment** | **9/10** |
| Contributor on-ramp/change-cost risk | **8/10 core, 6/10 hosted** | **5/10 Runtime** | **7/10 if kept proportional** |
| User-visible per-turn diagnostics and eval feedback | **8/10** | **unscored product-wide** | **8/10** |

**Interpretation:** Waku wins implementation simplicity and immediate personal-agent value. Agent Teams has a superior *conditional* design for its own scope, but the delivered three-repository control plane is not proven more capable today. The source-audited Waku hosted container isolation deserves substantive credit. Both sides' **measured active-fleet capacity remains unknown**, not zero.

## Owner-specific actions, only within accepted boundaries

| Priority | Recipient | Minimal proof and what *not* to add |
| --- | --- | --- |
| **P0** | Runtime Security + delegated process adapters | Synthetic canary secret: absent from argv, logs, errors, transcript and child environment after launch, failure and timeout. Do not copy Waku's Pi shell contract or add an abstract credentials service. |
| **P1** | Runtime technical effect + Orchestrator approval | Crash after effect / before receipt, restart/replay, changed approver or stale grant: no unapproved duplicate and truthful `uncertain`. Do not create a second approval Run engine. |
| **P1** | FMS/architecture authoring owners | Same real small feature change: measure touched modules, non-generated LOC, build/test time, re-export hops, testability and external-consumer use. Do not enforce a universal 500-byte file ban. |
| **P1** | Fully Local supervisor/deployment owner | Cold start, idle RSS/CPU, disk, port conflict, restart, upgrade/rollback and backup/restore on macOS/Windows/Linux for exact product targets. Do not swap accepted infrastructure on opinion. |
| **P2** | Existing Agent Context and authorized memory consumer | A/B fixed-query retrieval vs extra gate+digest: latency, spend, hit precision, stale fact, tenant/recipient disclosure. Stop if it loses; no new memory backend. |
| **P2** | Attention Inbox + Run observation consumer | Recipient-authorized waiting projection and visible source-derived graph/timeline, using existing facts. No second canonical queue/graph scheduler. |
| **P2** | Runtime Provider Access | One real model/protocol/OS capability smoke with truthful supported/unverified state. No duplicate registry. |

Test/experiment-only **rough estimates**, not implementation commitments: credential canary ~80–160 LOC, complexity 4/10; lost-ACK approval E2E ~120–240 LOC, 7/10; change-cost specimen ~90–160 LOC, 4/10; memory A/B ~140–260 LOC, 5/10. Actual scope depends on the owning feature's existing tests and already-scheduled delivery; avoid doing work twice.

## Adversarial review and limitations

**Counterclaim: Waku has poor security.** Rejected as too broad: real Docker/XFS conformance succeeded on pinned HEAD. Keep the narrow Pi credential, privacy-prompt and external-effect source findings with nonproduction caveats.

**Counterclaim: Agent Teams already beats Waku.** Rejected for current product usability: Waku local assistant works; our multi-system integration is still limited. The architecture fits the team/fleet goal better *if implemented and qualified*.

**Counterclaim: 117 tiny Runtime files are a bug.** Rejected without measured change costs: some are intentional entrypoint constraints. Use bounded external-consumer and edit-cost tests before simplification.

**Counterclaim: the graph aliasing risk proves Waku is broken in production.** Rejected: the design gives shallow snapshots, but this review executed no reproducer and no affected live workflow was shown. Treat as a testable contract gap.

**Counterclaim: all green Waku CI means judge passed.** Rejected: the 62 standard skips are preserved, judge is optional without a key, and the Docker set had zero skips. Distinguish test suites and qualification scopes.

**Licensing:** [Waku core license](https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/LICENSE) is MIT; [hosted license][w-license] is Elastic License 2.0; brand/design assets are separate. Reuse engineering concepts, not unreviewed hosted implementation bytes.

**Refresh:** inspect relevant diffs on upstream change or by 2026-12-23; preserve older immutable source/evaluation snapshots. Research is neither an ADR nor a qualification authority.

[w-status]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/docs/status.md
[w-resolve]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/waku/alwayson/worker.py#L560-L589
[w-step]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/waku/alwayson/worker.py#L453-L497
[w-approval-tests]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/evals/deterministic/test_deferred_approval.py
[w-runs]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/waku/alwayson/runs.py#L70-L99
[w-outbox]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/waku/alwayson/outbox.py#L178-L198
[w-outbox-insert]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/waku/alwayson/outbox.py#L110-L141
[w-graph]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/waku/graph/engine.py#L106-L214
[w-graph-tests]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/evals/deterministic/test_graph_engine.py
[w-gate]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/waku/ops/release_gate.py#L62-L88
[w-delegate]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/waku/tools/experimental.py#L219-L265
[w-delegate-test]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/evals/deterministic/test_delegate.py#L75-L88
[w-env]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/waku/tools/_env.py#L34-L45
[w-shared]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/waku/alwayson/worker.py#L314-L334
[w-brain]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/waku/memory/brain.py#L186-L256
[w-consolidation]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/waku/memory/consolidation.py
[w-policy]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/hosted/core/policy.py#L280-L383
[w-model]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/waku/loop/models.py#L122-L169
[w-providers]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/waku/providers.toml
[w-template]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/hosted/spawner/template.py#L225-L400
[w-tenant]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/hosted/core/tenant.py#L27-L141
[w-docker]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/evals/hosted_docker/test_isolation.py
[w-hosted]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/hosted/README.md#L1-L79
[w-license]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/hosted/LICENSE
[w-turn-evals]: https://github.com/ShenSeanChen/waku-agent/blob/981d4d171cb5290ad825d7af84fd49fdbd643adb/waku/ops/turn_evals.py#L1-L70
[a-proof]: https://github.com/agent-teams-ai/agent-runtime/blob/0ce60d7474159396132752a625c914ffa87c5049/packages/contexts/agent-execution/src/features/contained-agent-turn/domain/committed-dispatch-proof-v1.ts
[a-dispatch]: https://github.com/agent-teams-ai/agent-runtime/blob/0ce60d7474159396132752a625c914ffa87c5049/packages/contexts/agent-execution/src/features/contained-agent-turn/application/contained-turn-dispatch.ts
[a-readiness]: https://github.com/agent-teams-ai/agent-runtime/blob/0ce60d7474159396132752a625c914ffa87c5049/docs/architecture/readiness.md
[a-capacity]: https://github.com/agent-teams-ai/agent-runtime/blob/0ce60d7474159396132752a625c914ffa87c5049/docs/architecture/capacity-admission-delivery-plan.md
[a-wrapper]: https://github.com/agent-teams-ai/agent-runtime/blob/0ce60d7474159396132752a625c914ffa87c5049/packages/apps/embedded-runtime/src/composition/contained-turn-provider-selection.ts
[a-internal]: https://github.com/agent-teams-ai/agent-runtime/blob/0ce60d7474159396132752a625c914ffa87c5049/packages/apps/embedded-runtime/src/features/contained-turn-cancellation-proof/internal.ts
[o-local]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/c6ce98cd1a8ac1dd27ec877c018e5aa7cd5adff7/docs/decisions/0115-canonical-fully-local-v1-adoption.md
[o-temporal]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/c6ce98cd1a8ac1dd27ec877c018e5aa7cd5adff7/docs/decisions/0116-native-temporal-for-fully-local-durable-workflows.md
[o-profiles]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/c6ce98cd1a8ac1dd27ec877c018e5aa7cd5adff7/docs/architecture/deployment-profiles.md
[p-admission]: https://github.com/agent-teams-ai/agent-teams-platform/blob/3bbc11ee08cf7c896ed4228a3fd3e6eb5ac5d745/packages/contexts/project-management/src/features/managed-project-scope-admission/application/create-product-project.ts
[p-boundary]: https://github.com/agent-teams-ai/agent-teams-platform/blob/3bbc11ee08cf7c896ed4228a3fd3e6eb5ac5d745/docs/architecture/platform-orchestrator-boundary.md
