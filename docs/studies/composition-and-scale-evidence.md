---
id: research.studies.composition-scale
type: study
status: active
owner: research/maintainers
summary: Reusable module-composition and scale lessons separated from consumer framework pins.
---

# Static composition, observation and cleanup: mechanisms and scale evidence

## Source provenance

For the separate 2026-11-14 source audit of Effect, T3 Code, OpenCode, LiveStore, Alchemy and large-codebase enforcement, see [Effect Architecture and Reusable Mechanisms](effect-architecture-and-reusable-mechanisms-2026-11-14.md). That newer study adds owner-specific research and proposed qualification cases; it does not refresh the historical measurements or consumer activation below.

This is a shared evidence extract from the [Orchestrator composition review][original],
preserved at Orchestrator commit `981dd836ca3d35b764561bdc11dc2e0544d83416`.
The original review was recorded **2026-10-21**, archived **2026-10-22** from PR #86 head
`8483949960cb783fe70090e2e7fbf526a043d362`, and carries an integration note dated 2026-10-28.
Its upstream source baseline is Get Modular **`ddf1e0b0053f546f12ca70190b237b4f7e78d09d`**.
No new installation, consumer benchmark, browser qualification or migration was run here.
This extraction is not a November re-audit or a current package availability claim.

The original report preserves an older adoption history. Current Orchestrator reconciliation
belongs to [ADR-0117][adr117] and its canonical [ADR-0113][adr113] baseline; backend placement
and Fully Local V1 belong to [ADR-0114][adr114] and [ADR-0115][adr115].
Those decisions, exact release/package pins and activation gates stay owner-local.
The shared document records mechanisms and scoped evidence, not a competing adoption authority.

## Compared mechanisms and boundaries

| Mechanism or approach | Useful responsibility | Boundary or limitation |
| --- | --- | --- |
| Get Modular Core and Assembly | Static graph semantics; explicit entries, groups, bindings, preparation and construction. [Assembly contract][assembly-contract] | Does not choose service topology, implement authentication or supply durable workflow semantics. A graph declaration is not evidence of consumer installation. |
| Ordinary cohesive factories/functions | Implement an owner-local capability or pure helper with explicit inputs | A factory need not become a package or graph entry. A second resolver/registry adds a different composition authority and requires justification; the original product's choice is not reopened here. |
| Context-private DI container | Resolves dependencies within a local container | The original review treated Awilix as superseded product history. It provided no comparative benchmark proving containers universally worse. Current framework choice belongs to the consumer ADR. |
| Observation | Replaceable latest-state views through `watch`/`load`; several commits can coalesce and unchanged state can repeat. [Contract][observation] | Not an occurrence log, durable work queue, billing source, audit trail or authoritative revocation channel. |
| Resources | Cooperative ordered cleanup of registered acquisitions. [Contract][resources] | Callback completion is not physical resource release, readiness, authorization or containment of untrusted code. |
| Published remote contracts | A process-local adapter can consume a remote capability | A remote service is not resolved through a shared cross-process DI container; transport and durable communication remain separately owned. |

The original report contains no measured LOC saving or numeric reliability comparison for
these approaches. A mandatory composition choice establishes product direction, not a measured
migration cost or representative scale envelope.

## Reusable communication distinctions

A command asks an owner to act and can be rejected; a query observes state; a contribution
contract supplies ordered policies/hooks; a durable occurrence must retain its owner-defined
receipt/replay semantics. Latest-state Observation is useful after a durable projection has
committed its checkpoint, but does not replace the durable source that produced the view.
These distinctions follow the pinned [Observation][observation] and [Assembly][assembly] contracts.

Optional notification hooks should not become the only authority for authorization or business
invariants. Reusable technical mechanisms can cross product repositories without merging
membership policy, commercial authority, Task/Run aggregates or owner-local persistence.
The original review's product-specific boundary mappings remain in the [source study][original].

The reviewed Observation contract limits one store to **64 live subscriptions in one scope**
and **8,192 store-wide**. Child scopes or an explicitly managed shared subscription can bound
short-lived work. These are pinned mechanism limits, not measured concurrent-agent capacity.
The Node asynchronous echo guard does not prove browser behavior; browser qualification was
outside the reviewed consumer evidence.

## Scoped growth evidence retained from upstream

The pinned [growth record][growth] separates supported-toolchain results, failed bounds and
private compiler experiments. The following are attributed upstream observations, not new runs.

| Fixture/toolchain | Retained observation | Safe interpretation |
| --- | --- | --- |
| Inherited-map consumer, supported TypeScript 7.0.2, N=8 and N=100 | Passed the recorded research stages | Evidence for those fixtures and sizes, not Orchestrator consumer activation |
| Same supported route, N=500 | Cold emit reached 180.046857485 seconds at the 180-second cap; N=1,000 was not created/run on that route | The supported-route growth blocker was open at that reviewed pin |
| Private patched 7.1.0-dev compiler, 2026-10-20 | Completed unchanged G-01 and G-02/G-03 through N=1,000 with retained patch, controls, reports and logs | A bounded remedy candidate; not a maintained released compiler, supported adoption or complete consumer source conformance |
| Earlier public N=1,000 diagnostic attempts | Infrastructure interruption without complete retained stage artifacts | Unknown outcome; not a pass, established OOM or compiler-timeout diagnosis |

The private series retained the original 180-second compiler, 120-second runtime and
600-second per-size aggregate bounds. Changing timeouts or weakening the fixture would
answer a different question. Compiler memory diagnostics and highest waited-process RSS
were not simultaneous aggregate process-tree memory measurements.
`N` is a fixture-generated scale parameter: it is not a count of services or active agents.

## Structural ceilings are not throughput evidence

The reviewed [Assembly contract][assembly-contract] exposes carrier limits that bound
allocation and validation. They do not establish useful workload size or deployment capacity.

| Dimension at the reviewed pin | Ceiling |
| --- | --- |
| Entries and group nodes combined; selections and order entries | 4,096 |
| Members of one group | 4,096 |
| Group nesting (`modules` at level 0) | 16 levels |
| Roots | 1,024 |
| Bindings | 65,536 |
| Providers per binding row / total provider occurrences | 1,024 / 262,144 |
| Provides / slots per declaration | 64 / 128 |
| Owner-path segments | 8 |

A feature hierarchy, Assembly group, package and deployed service are different identities.
Thousands of agent executions do not require thousands of process-wide composition graphs.
Conversely, a structurally valid graph does not prove acceptable compiler time, runtime
memory, startup latency or cleanup behavior for a representative consumer.

## Cleanup and ownership lessons

Under the pinned Resources contract, modules release resources they acquire and borrow
dependencies without disposal rights. The Host owns startup, readiness, drain, shutdown,
deadlines, escalation and cleanup-debt reporting. `complete: true` means the registered
callbacks returned; a separate mechanism must establish any stronger physical-release claim.
Successful construction likewise does not establish readiness or recovery of durable state.

This evidence supports narrow composition seams and truthful lifecycle observations.
It does not justify wrapping every helper in a lifecycle object, building a second graph
engine, or treating in-process cooperative cleanup as a hostile-code sandbox.
Language/runtime enforcement and external process custody remain separate concerns.

## Limits and owner-local decisions

A smaller independently qualified consumer envelope can be useful even if a larger growth
row remains open. New shared research does not revoke that existing scoped qualification.
Actual source visibility, packed imports, construction, cancellation, alternative profiles
and cleanup need evidence in their consuming scope; upstream tests alone do not qualify it.
The original [owner composition guide][composition] retains the adoption details and gates.

Dynamic plugins, hot replacement, browser operation and lifecycle-kernel admission are
separate scopes. This static evidence does not qualify them or authorize a new framework.
Current compiler/package versions and supported ceilings require a fresh bounded check
before a new activation; the dated results above must not be silently presented as current.

## Pinned references

[original]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/research/get-modular-adoption-and-scale-review-2026-10-21.md
[adr117]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/decisions/0117-reconcile-mandatory-module-composition.md
[adr113]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/decisions/0113-canonical-module-and-composition-adoption.md
[adr114]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/decisions/0114-canonical-backend-stack-and-distributed-role-adoption.md
[adr115]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/decisions/0115-canonical-fully-local-v1-adoption.md
[composition]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/architecture/composition-and-dependency-injection.md
[assembly-contract]: https://github.com/agent-teams-ai/get-modular/blob/ddf1e0b0053f546f12ca70190b237b4f7e78d09d/docs/architecture/common-assembly.md
[assembly]: https://github.com/agent-teams-ai/get-modular/blob/ddf1e0b0053f546f12ca70190b237b4f7e78d09d/packages/assembly/README.md
[resources]: https://github.com/agent-teams-ai/get-modular/blob/ddf1e0b0053f546f12ca70190b237b4f7e78d09d/packages/resources/README.md
[observation]: https://github.com/agent-teams-ai/get-modular/blob/ddf1e0b0053f546f12ca70190b237b4f7e78d09d/packages/observation/README.md
[growth]: https://github.com/agent-teams-ai/get-modular/blob/ddf1e0b0053f546f12ca70190b237b4f7e78d09d/tests/qualification/consumer-fixtures/growth/README.md

## Fleet-scale Foundation-first follow-up — 2026-11-27

### Scope, checkpoint and non-goals

Owner direction on 2026-11-27 asks for architecture capable of growing to
hundreds of thousands of **simultaneously executing agents**, not merely stored
Agent definitions, and explicit Live Module Updates (LMU) seams from the
beginning. The [ecosystem vision](https://github.com/agent-teams-ai/.github/blob/main/docs/architecture/ecosystem-vision.md)
previously names tens of thousands and a first-class one-agent Fully Local
profile. [Orchestrator's README][fleet-orch-readme] says thousands; the
[accepted deployment profile][fleet-orch-deploy] says tens of thousands, across
independent Runs, including concentrated tenant load. The higher target is a
new owner direction to reconcile in the owning decisions, not a measured
capacity, public SLO or requirement for a 100k-agent first release.

This follow-up inspected current pinned product documents and selected upstream
source, plus official architecture and incident records. It is neither an
exhaustive code audit nor a common runtime benchmark. No competitor was
installed; no load, chaos, cost, security or provider test was executed. No
ranking is changed. Previous evidence, lesson IDs and accepted ADRs remain
intact. Existing D1–D3, E1–E6 and C0–C3 in the
[preimplementation docket](../lessons/preimplementation-decisions.md) remain
the routes for their existing decisions. New hypotheses below refine those
routes; no generic release gate, package, service or adoption is authorized.

### Product baseline and what must not be duplicated

| Owner and pinned main | Observed architecture or plan | Remaining scale-sensitive question |
| --- | --- | --- |
| Orchestrator `3dccf2c53bf11f3939a19734a58f5e64d96673d0` | [Deployment roles][fleet-orch-deploy], [eventing][fleet-orch-events], [five readiness gates][fleet-orch-gates], [OD-033 convergence][fleet-orch-ooda]. Headless Teams/Tasks/Runs, distinct AR observations, owner-local transaction and outbox, nine coarse role candidates and mandatory local profile. | Partition and placement identity, cross-cell scope, independently bounded replay/control work and concrete feedback convergence under the raised workload. |
| Platform `76fc9734f6128b78c7a8b1bc858859fb1cbe835a` | [Managed installation control][fleet-platform-managed] already separates desired revision, installation incarnation, epoch and lease; [boundary][fleet-platform-boundary] is proposed for exact contracts. | Routing/placement and handover authority for cell-scoped installations; tenant quotas, stale authorization, mixed-version rollout and revocation during isolation. No second task scheduler. |
| Runtime `cae4d350c947cd9f74bc04130531527c9a36baeb` | [Execution generations][fleet-ar-gen], [capacity plan][fleet-ar-cap], [readiness][fleet-ar-ready]. Ordinary S1–S5 and C0–C3 separate. Current V1 excludes cross-tenant/session/credential sharing of provider Host; Stage K is a model, not fleet evidence. | Multi-pool vector admission, enforceable fences, provider/process custody and output/checkpoint budgets at real fleet scale; no blanket pooling or weakened isolation. |

Existing sound choices: feature-owned invariants, portable headless modules,
product-neutral Get Modular composition, development-only Engineering
Foundation, separate artifact trust (Extension Foundation), LMU coordination
with product-owned switch authority, transport-neutral contracts and owned
published languages, separate technical/business/commercial resource policy.
Do not equate a module with a process, a process with a tenant or an agent with
a worker. Preserve the independent standalone product and avoid importing
Platform business concepts into Runtime. Coarse roles can be independently
replicated without making every feature a microservice.

### Fresh targeted competitor source observations

Exact revision is the inspected subject, not a claim about a hosted edition
or every branch. Source and documented claims are classified separately.

| Subject and source | Positive mechanism | Limit, observed issue or risk hypothesis | Transfer and counterevidence |
| --- | --- | --- | --- |
| Paperclip, [master f78a6f5][fleet-paperclip-tree] (2026-11-27); [wake admission][fleet-paperclip-wake], [cause classification][fleet-paperclip-cause], [continuation design][fleet-paperclip-cont] | Committed admission precedes wake/dispatch; typed skip/deferred/replayed outcomes; finite executions, persisted continuation intent, recovery reconciliation. | Upstream's own continuation document describes repeated recovery wakes; [issue 4482][fleet-paperclip-4482] reports self-generated activity waking the same agent, [issue 14424][fleet-paperclip-14424] reports stale wait summaries preventing progress. Reports are not reproduced and may be fixed. Periodic scans are a scale-cost hypothesis, not a measured ceiling. | OD-033 causal progress identity and explicit durable wait/wake, not activity timestamps. Test self-generated comment, no-op run, genuine external reply, stale review, crash before/after wake receipt. Preserve the existing independent-progress study. |
| OpenClaw, [main fde2c6c][fleet-openclaw-tree] (2026-11-27); [queue state][fleet-openclaw-queue], [registry lifecycle][fleet-openclaw-registry], [trust boundary][fleet-openclaw-trust] | Monotonic enqueue time, three priority FIFOs and lane generations; registry epochs, retained instance/cache owners, scoped disposal. Manifest-first discovery and lazy activation (upstream plugin docs). | Queue entries retain executable closures in process and state is a global singleton; local mechanism not durable distributed authority. Gateway trust model explicitly excludes mutually hostile tenants sharing one gateway. Registry lifecycle carries compatibility with already captured callbacks through package updates: valuable real complexity, not a reason to duplicate their singleton. | Adopt the ownership/generation discriminators as LMU/GM qualification cases; avoid equating route/session identity with authorization or memory lanes with durable fleet scheduling. Local profile may legitimately choose trusted process composition. |
| AgentField, [main 1b3c68a][fleet-agentfield-tree] (2026-11-23); [README][fleet-agentfield-readme], [transition validation][fleet-agentfield-transitions], [lock adapter][fleet-agentfield-locks] | Agent functions discoverable across languages; typed execution transitions; documented bounded admission and retry hints. | README reports 10k+ invocations within one workflow, not 10k simultaneous agents; documented queue is in-process. The inspected non-Postgres lock methods contain no-op placeholders returning nil/no lock or success without release implementation. PostgreSQL path is separate; no call-site or deployed security defect established. Projection transitions tolerate skipped running update; not an authoritative lifecycle proof. | Useful remote adapter/capability discovery reference, not replacement for AR or a dependency underneath all products. Require capability-profile rejection, owner-local receipts, terminal state versus projection separation, and kill-after-acceptance test before any integration. |
| OpenAI Symphony, [main be10a1b][fleet-symphony-tree] (2026-09-15); [Elixir GenServer][fleet-symphony-code], [SPEC][fleet-symphony-spec] | Workspace per issue, reconcile before dispatch, explicit claim state, separate normal continuation/failure backoff, repository workflow hot reload for future work. | Specification explicitly chooses in-memory scheduling with tracker/filesystem restart recovery, not exact durable retry restoration or multi-tenant distributed scheduler. Source State has running/claimed/retry maps. Single-owner mutation is sound within the selected envelope, not a global process design for our fleet. | Reuse provider/workspace reconciliation tests and declarative workflow versioning; retain owner-pinned execution identities, durable claims and fenced cleanup. |
| OpenHands Agent Canvas, [main 38efef1][fleet-openhands-tree] (2026-11-27); [architecture][fleet-openhands-arch], [conversation API adapter][fleet-openhands-adapter]; [separate SDK architecture][fleet-openhands-sdk] (rolling docs) | UI/Agent Server separation, typed SDK, local/remote execution profiles. SDK documents immutable event storage and independent read-side services. | Current Canvas adapter combines cloud, local backend resolution, settings, tags, metadata and service requests in one substantial file: a useful complexity review target, not a proven SOLID violation from file size alone. SDK and commercial edition not source-audited here. | Keep frontend independent; place cloud/local authority differences at explicit adapters, separate event read/projection ports. Do not import Python/TS framework models into DDD domain. |

Paperclip is the closest business-coordination analogue, OpenClaw the most
useful live-plugin/interaction analogue, AgentField the remote service/harness
mesh analogue, Symphony the narrow durable-workspace automation comparison,
OpenHands the workspace/SDK/client boundary comparison. Their scope differs.
A small reference project can be superior for one use case while being a poor
foundation for hostile multi-tenant fleet execution.

### Large-system evidence, not additional agent-product scores

| Reference | Mechanism and limit | Our application |
| --- | --- | --- |
| Temporal [server c2ec24c][fleet-temporal-tree], [matching partition manager][fleet-temporal-matching] (2026-11-26); [Worker Versioning GA][fleet-temporal-version] | Matching partitions and build-specific physical queues, including explicit draining and liveness relationships. Worker versions support rollout and migration at compatible continuation boundaries. A configured RPS constant is not a benchmark. | OD-005/035 and E6: workflow/history and version affinity through durable wait; Temporal behind an owning workflow port, not another business authority or automatic exactly-once external effects. |
| Kubernetes [client-go 96596e7][fleet-kube-tree], [typed workqueue][fleet-kube-queue] (2026-11-21); [large-cluster guidance][fleet-kube-scale] | Coalescing/reconciliation queue with replaceable storage and explicit drain; documented cluster scale envelope is for infrastructure objects, not agent throughput. | Reconcile desired versus observed placement and custody, not a global polling loop. Queue state may be disposable only when durable owner state reconstructs intent. Avoid one sidecar/SQL pool/Orchestrator process per agent. |
| [Kueue fair sharing][fleet-kueue], [admission design][fleet-kueue-kep] and [preemption request 17630][fleet-kueue-issue] | Quota-aware workload admission and usage-based preference; ordering and preemption are distinct decisions. Upstream issue records demand for separating them. | AR C0–C3/D2: compare hierarchical resource-vector fairness and non-preemptive baseline. Cannot terminate a provider process merely by releasing a scheduling reservation; retain custody. |
| [Ray actor fault tolerance][fleet-ray-actors] and [object recovery][fleet-ray-objects] (rolling official documentation) | Actor unavailable can leave effect result ambiguous; retries may re-execute; reconstruction assumes deterministic/idempotent tasks and surviving object owner. | Preserve unknown outcomes, owner-local durable references, explicit lineage limits, no automatic repeat of irreversible tool calls. Ray only a candidate substrate if needed, not semantic authority. |
| [AWS cell routing][fleet-aws-cells] and [cell/shuffle-sharding distinction][fleet-aws-shuffle] | Small partition router, bounded independent cells. Shuffle sharding is not itself self-contained stateful cells. | Compare deployment placement and bounded blast radius; a globally shared writable DB, queue, authorization service or logging path can defeat claimed cell isolation. Avoid adding global mutable scheduler state. |
| [FoundationDB simulation][fleet-fdb] (rolling upstream documentation) | Seed-replayable deterministic simulation, network/process/storage fault campaigns together with real performance tests. | EF may qualify reusable test primitives/fixtures; product owners retain invariant-specific tests, actual stores, providers and multi-host soak. Do not adopt FoundationDB as persistence from testing inspiration. |
| [NATS pull consumers][fleet-nats] | In-flight and fetch count/byte bounds with explicit expiration. Broker delivery limits are per consumer, not business fairness or exactly-once side effects. | Retain JetStream adapter and qualified topology. Test total work retained across ingress, retries, storage, consumer, output and reconnect; Dapr wrapping must not multiply retries. |

Broader follow-up queue, not completed audits: compare OpenHands SDK at its
own pinned source, E2B runtime and Substrate against real AR provider profiles,
Daytona's currently published execution source/edition (the inspected default
branch tree at ec4c21b contained only five entries, so no scheduler source
claim), LangGraph/Restate/Durable Task for long waits and effect receipts,
Kubernetes Kueue/Volcano/Nomad for multi-pool allocation, Argo Workflows and
Temporal/Cadence for history and worker upgrades, Ray Serve for actor pools,
Dify/AutoGPT/Waku for product workflows and typed extensions. Reuse existing
[framework and durability studies](agent-runtime-framework-research.md) and
[watchlist](../competitors/competitor-watchlist.md), not another popularity
ranking. This scope does not displace the existing November 25 Paperclip triage
PR or pending IAM review.

### Expensive decisions to settle before dependent implementation

These are **proposed discriminators**, not new accepted rules. Existing
ownership and qualification apply. The important design work is to decide
which invariants/keys/protocols cannot be changed cheaply, not implement all
future physical topology immediately.

| Priority and seam | Recommended starting direction | Rejecting case / acceptance evidence |
| --- | --- | --- |
| P0 placement and partition identity (Orchestrator deployment/OD-038/039, Platform managed installation, AR C0) | One canonical owner for each aggregate, effect and execution generation. Make partition scope and route/placement generation explicit in infrastructure envelopes/owner records; opaque stable domain IDs, no physical shard ID in business identity. Compare tenant-affine cell, split very large tenant by bounded Run/project or execution pool, and independent per-region installation. One-cell implementation may satisfy the first profile. | One noisy tenant, hot single Run, two cells and old route after migration, network partition and restore. Old owner cannot grant/append/reclaim successor; unrelated cell continues; global reads are projections, no global synchronous mutation lock. |
| P0 causal wake/continuation (OD-033, OD-026, OD-027, AR operation contract) | Durable explicit wait predicate, source watermark, stable continuation id and cause lineage; distinguish progress from activity. Persist bounded retry and recovery debt; self-feedback requires a new meaningful fact or authorized explicit retry. No universal OODA queue. | A self-comment or unchanged observation cannot create unlimited new runs; new external reply can wake exactly the intended scope, missed hint recovered, cancellation wins and no-op repetition terminates visibly. |
| P0 isolation and custody (OD-012/031/032, E5, AR security and C0) | Partition-aware authorization, capability-scoped credentials/egress, enforceable execution and cleanup fencing. Trusted local plugin profile distinct from untrusted process/sandbox profile; no host sharing across tenant/session/credential contrary to V1. | Stale policy/placement, revoke racing dispatch, malicious plugin/tenant, process that survives supervisor crash, stuck external call: fail closed where supported and retain honest uncertain outcome/cleanup debt. |
| P0 durable version and retirement (E6, LMU and Extension ownership) | Store artifact digest, contract/state schema and execution generation for affected durable obligations; pin old generation at admission, atomic publication/route, drain/transfer only qualified state. Independent module lifecycle, no global reload and no dependency on LMU internals in features. | A waits across B/C rollout, old callback and stale commit cannot mutate new state; migration interruption/rollback with new data is safe or explicitly refused; unavailable old artifact or unresolved cleanup blocks destructive retirement. |
| P0 bounded data and amplification (OD-009/018/024/030, D1–D3 and AR C0) | Separate control intent and receipts, canonical observation, transcript/log chunks/artifacts and derived UI views. Owner-local ordered cursor, byte and count caps, retention/resurrection guard, replay pagination and rate budget; no per-token distributed transaction or fanout to all clients. | Slow/absent consumers, 24h burst, 30s reconnect wave, replay and compaction under continuous writes, giant output, one hot tenant. Control still meets selected cancellation/reclaim budget; canonical loss is not masked as sampling. |
| P0 cross-pool admission and quota (D1/D2, C0–C3, OD-024) | Distinguish hard product budget reservation, technical resource vector, provider quota/rate limit, execution custody. Compare per-pool CAS, hierarchical delegated bounded credits/escrow and global authority on limited shared resources. Charge actual resource occupancy, not Agent definition. | Concurrent grants under stale snapshots cannot exceed stated hard limit. Fairness persists across restarts; parent wait cannot deadlock all child permits; provider outage leaves bounded pending bytes and control capacity. |
| P1 whole-path observability and stable conformance (OD-014/030, EF) | Stable low-cardinality metrics by role/profile/cell/class, trace/structured logs and bounded owner diagnostics for exact tenant/run/agent. Deterministic tests, fault injection, actual packed artifacts, real multi-host and provider qualification separated. | Hot cardinality, telemetry outage, queue saturation, overloaded API and rolling mixed versions cannot prevent stop/renew/reclaim; raw traces preserve original identities and ambiguity. |

Partitioning alternatives: (A) one cell with partition-ready contracts (lowest
initial complexity), (B) independent tenant-affine cells plus a small routing
plane (preferred candidate for large deployments), (C) cross-cell writes or
global shared scheduler (reject by default unless owner proves necessity and
availability). A very large tenant may eventually span cells; do not choose a
single tenant partition key without checking aggregate locality, cross-Run
semantics, data sovereignty, hot-tenant routing and movement. A cell must not
be assumed to be one Kubernetes namespace: shared DB/broker/credentials/control
dependencies determine actual fault boundary. No number of cells is selected
until the complete cell envelope is measured.

### Capacity arithmetic: scenario, not benchmark

Example sensitivity for 100,000 concurrently executing agents, not necessarily
100,000 simultaneously streaming provider responses. Assumptions deliberately
explicit; replace with measured distributions.

| Input scenario | Derived load |
| --- | --- |
| One heartbeat/30s per active execution | About 3,333 heartbeats/s before other operations |
| One canonical output event/s per execution; 1 KiB/event | 100,000 events/s, about 102.4 MB/s or 8.85 TB/day decimal raw payload, before indexes, replication and fanout |
| One output event/10s; 1 KiB/event | 10,000 events/s, about 0.885 TB/day raw |
| 256 MiB resident per executing process | About 24.4 TiB fleet RAM, before overhead |
| 512 MiB resident per executing process | About 48.8 TiB fleet RAM, before overhead |
| 1% reconnect in a second vs all clients reconnect | 1,000 vs 100,000 connections/s; enforce bounded reconnect/resume and retry jitter |

The primary implication is to model **admitted active execution, occupied
process slots, provider in-flight calls, parked durable work, output rates,
CPU/memory/disk/network, provider credentials and billable throughput**
independently. A simulation of 100k identities is not 100k active executions.
No monetary forecast follows without provider/token distributions, duty cycle,
hardware and storage assumptions. Provider quotas and process memory may
dominate even if control plane can handle the synthetic workload.

Suggested qualification increments, not promised capacity or fixed SLO:
one real local agent and recovery path; bounded independent test Hosts;
100/1k modeled agents plus real representative providers; 10k control-plane
shape plus measured multi-worker resource behavior; 100k/300k modeled and
then separately actual admitted execution under an approved hardware/provider
envelope. Every stage distinguishes simulation, real workers, real provider
turns and sustained active executions. Ramp only after bounded queue, control
latency, fairness, isolation, recovery, cost and retained data evidence.
Exercise both one concentrated tenant/many Runs and many tenants; report
p50/p95/p99 command acceptance, oldest eligible backlog, reservation and
reclaim latency, observation freshness, bytes, write amplification, replica
lag, resource saturation, failure blast radius and cost per admitted work.
Never weaken the strict loss/effect/cross-tenant invariants to achieve a score.

### LMU and modularity from the beginning without premature implementation

The current LMU library's qualified cooperative finite trusted in-process
profile is not a distributed hostile-plugin or rolling-fleet guarantee.
Get Modular produces plans; Extension Foundation owns artifact admission;
LMU coordinates update with narrow Host-owned authority and resource custody;
the product retains business invariants. Engineering Foundation remains
dev-only. Use existing foundation/fixture authoring and admission processes.

From the first module, record public contracts, dependencies and supported
profile, owned state/transactions and migration, lifecycle/resource scope,
generation-bound invocation at the actual replaceable seam, explicit
extension contribution types and conformance fixtures. Ordinary deterministic
business features need not know the loader, distributed generation protocol,
OCI registry, Effect runtime or remote update service. No generic lifecycle
interfaces on pure values; no plugin per agent process or runtime registry
global singleton. Qualify trusted in-process, isolated worker and remote/rolling
profiles separately; WASM sandbox is not a universal plugin host. Replaceable
does not mean every module is independently deployed or unconditionally
hot-replaceable.

Concrete rejecting cases at foundation and actual consumer seams: cancellation
during factory acquisition; partial contribution registration; borrowed
dependency lifetime; old generation async callback after switch; dual
publication race; update while old provider effect unresolved; rollback after
schema write; plugin removal with durable obligation; untrusted code attempting
capability or network escalation; mixed versions and partial cell rollout.
Use existing LMU and GM mechanisms rather than reimplementing an updater.

### Reuse candidates and decision follow-through

See the [execution and sandbox catalog](../technologies/agent-execution-and-sandboxes.md#fleet-infrastructure-candidate-screen--2026-11-27)
for ready components and narrow integration boundaries. No vendor is selected
by this follow-up; licensing, support, pinned release and representative
profiles remain adoption work. Use the
[owner-linked docket](../lessons/preimplementation-decisions.md#fleet-scale-follow-through--2026-11-27)
for prioritized next decisions, not a second cross-product roadmap.

### Pinned and rolling references for this follow-up

[fleet-orch-readme]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/3dccf2c53bf11f3939a19734a58f5e64d96673d0/README.md
[fleet-orch-deploy]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/3dccf2c53bf11f3939a19734a58f5e64d96673d0/docs/architecture/deployment-profiles.md
[fleet-orch-events]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/3dccf2c53bf11f3939a19734a58f5e64d96673d0/docs/architecture/eventing-and-reliability.md
[fleet-orch-gates]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/3dccf2c53bf11f3939a19734a58f5e64d96673d0/docs/architecture/implementation-readiness-gates.md
[fleet-orch-ooda]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/3dccf2c53bf11f3939a19734a58f5e64d96673d0/docs/open-decisions/OD-033-ooda-convergence-and-context-activation.md
[fleet-platform-managed]: https://github.com/agent-teams-ai/agent-teams-platform/blob/76fc9734f6128b78c7a8b1bc858859fb1cbe835a/docs/architecture/managed-installation-control.md
[fleet-platform-boundary]: https://github.com/agent-teams-ai/agent-teams-platform/blob/76fc9734f6128b78c7a8b1bc858859fb1cbe835a/docs/architecture/platform-orchestrator-boundary.md
[fleet-ar-gen]: https://github.com/agent-teams-ai/agent-runtime/blob/cae4d350c947cd9f74bc04130531527c9a36baeb/docs/architecture/execution-generation-model.md
[fleet-ar-cap]: https://github.com/agent-teams-ai/agent-runtime/blob/cae4d350c947cd9f74bc04130531527c9a36baeb/docs/architecture/capacity-admission-delivery-plan.md
[fleet-ar-ready]: https://github.com/agent-teams-ai/agent-runtime/blob/cae4d350c947cd9f74bc04130531527c9a36baeb/docs/architecture/readiness.md
[fleet-paperclip-tree]: https://github.com/paperclipai/paperclip/tree/f78a6f5ae3621694bed537f414271f07ad1c488c
[fleet-paperclip-wake]: https://github.com/paperclipai/paperclip/blob/f78a6f5ae3621694bed537f414271f07ad1c488c/server/src/modules/wake-queue/application/issue-wake-admission.ts
[fleet-paperclip-cause]: https://github.com/paperclipai/paperclip/blob/f78a6f5ae3621694bed537f414271f07ad1c488c/server/src/services/continuation-cause.ts
[fleet-paperclip-cont]: https://github.com/paperclipai/paperclip/blob/f78a6f5ae3621694bed537f414271f07ad1c488c/doc/architecture/durable-continuation-scheduler.md
[fleet-paperclip-4482]: https://github.com/paperclipai/paperclip/issues/4482
[fleet-paperclip-14424]: https://github.com/paperclipai/paperclip/issues/14424
[fleet-openclaw-tree]: https://github.com/openclaw/openclaw/tree/fde2c6cb4d69848b74fa7aa081a6235d3afaeb4b
[fleet-openclaw-queue]: https://github.com/openclaw/openclaw/blob/fde2c6cb4d69848b74fa7aa081a6235d3afaeb4b/src/process/command-queue.state.ts
[fleet-openclaw-registry]: https://github.com/openclaw/openclaw/blob/fde2c6cb4d69848b74fa7aa081a6235d3afaeb4b/src/plugins/registry-lifecycle.ts
[fleet-openclaw-trust]: https://github.com/openclaw/openclaw/blob/main/docs/gateway/security/trust-model.md
[fleet-agentfield-tree]: https://github.com/Agent-Field/agentfield/tree/1b3c68a3e6fb06c5dcd8869245f954fbc931b982
[fleet-agentfield-readme]: https://github.com/Agent-Field/agentfield/blob/1b3c68a3e6fb06c5dcd8869245f954fbc931b982/README.md#how-it-scales
[fleet-agentfield-transitions]: https://github.com/Agent-Field/agentfield/blob/1b3c68a3e6fb06c5dcd8869245f954fbc931b982/control-plane/internal/storage/execution_state_validation.go
[fleet-agentfield-locks]: https://github.com/Agent-Field/agentfield/blob/1b3c68a3e6fb06c5dcd8869245f954fbc931b982/control-plane/internal/storage/locks.go
[fleet-symphony-tree]: https://github.com/openai/symphony/tree/be10a1b79df723d6d7612b5651c8522704dafb2e
[fleet-symphony-code]: https://github.com/openai/symphony/blob/be10a1b79df723d6d7612b5651c8522704dafb2e/elixir/lib/symphony_elixir/orchestrator.ex
[fleet-symphony-spec]: https://github.com/openai/symphony/blob/be10a1b79df723d6d7612b5651c8522704dafb2e/SPEC.md
[fleet-openhands-tree]: https://github.com/OpenHands/OpenHands/tree/38efef1b1396b9bd10afaac33b094bad66cea41d
[fleet-openhands-arch]: https://github.com/OpenHands/OpenHands/blob/38efef1b1396b9bd10afaac33b094bad66cea41d/docs/architecture.md
[fleet-openhands-adapter]: https://github.com/OpenHands/OpenHands/blob/38efef1b1396b9bd10afaac33b094bad66cea41d/src/api/conversation-service/agent-server-conversation-service.api.ts
[fleet-openhands-sdk]: https://github.com/OpenHands/docs/blob/main/sdk/arch/overview.mdx
[fleet-temporal-tree]: https://github.com/temporalio/temporal/tree/c2ec24c01c519234de9dd01881b968c1b14473f2
[fleet-temporal-matching]: https://github.com/temporalio/temporal/blob/c2ec24c01c519234de9dd01881b968c1b14473f2/service/matching/task_queue_partition_manager.go
[fleet-temporal-version]: https://temporal.io/changelog/worker-versioning-continue-as-new-worker-controller
[fleet-kube-tree]: https://github.com/kubernetes/client-go/tree/96596e7a999d6a7b10f037ee1eabe384c4dd91a2
[fleet-kube-queue]: https://github.com/kubernetes/client-go/blob/96596e7a999d6a7b10f037ee1eabe384c4dd91a2/util/workqueue/queue.go
[fleet-kube-scale]: https://kubernetes.io/docs/setup/best-practices/cluster-large/
[fleet-kueue]: https://github.com/kubernetes-sigs/kueue/blob/main/site/content/en/docs/concepts/fair_sharing.md
[fleet-kueue-kep]: https://github.com/kubernetes-sigs/kueue/blob/main/keps/4136-admission-fair-sharing/README.md
[fleet-kueue-issue]: https://github.com/kubernetes-sigs/kueue/issues/17630
[fleet-ray-actors]: https://docs.ray.io/en/latest/ray-core/fault_tolerance/actors.html
[fleet-ray-objects]: https://docs.ray.io/en/latest/ray-core/fault_tolerance/objects.html
[fleet-aws-cells]: https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/cell-routing.html
[fleet-aws-shuffle]: https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/faq.html
[fleet-fdb]: https://github.com/apple/foundationdb/blob/main/documentation/sphinx/source/testing.rst
[fleet-nats]: https://docs.nats.io/learn/jetstream/pull-consumers
