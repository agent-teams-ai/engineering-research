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


### Additional focused source pass: coding workspaces and durable execution

The following four repositories were inspected at the exact commits listed below, separately from the earlier broad comparison. This is a source/contract review, not an executed integration, security assessment or performance benchmark.

| Source snapshot and inspected seam | Useful observation | Limit / rejecting case for our architecture |
| --- | --- | --- |
| [Gas Town scheduler design](https://github.com/gastownhall/gastown/blob/94cc82289d2ead275a62e1db4ef1d4ada4a1f98e/docs/design/scheduler.md), [dispatch implementation](https://github.com/gastownhall/gastown/blob/94cc82289d2ead275a62e1db4ef1d4ada4a1f98e/internal/scheduler/capacity/dispatch.go) (2026-11-12) | The design records an actual refactoring from scheduler metadata embedded in work-task descriptions/labels to separate scheduling-context records. A generic dispatch cycle accepts injected capacity, query, validate, execute and outcome callbacks; plan and execute are separate. A typed error distinguishes a launched agent whose scheduling-context closure failed from a launch failure. | Default direct dispatch bypasses the optional concurrency governor; deferred dispatch uses a daemon heartbeat, local flock and tmux counts. The prefix guard explicitly accepts an unknown configured prefix. These are local-scope semantics, not fleet guarantees. Do not infer duplicate launch from the partial-success error alone: the downstream recovery path needs its own evidence. In hosted scope reject unknown authority, reserve resources before launch, persist intent/receipt, and reconcile successful launch plus failed bookkeeping without blind repeat. |
| [Warren runtime contract](https://github.com/jayminwest/warren/blob/5e54764071826cc9c84b924d6d76099b0e23ae69/src/runtime/contract.ts), [runtime/supervisor design](https://github.com/jayminwest/warren/blob/5e54764071826cc9c84b924d6d76099b0e23ae69/docs/design/runtime-and-supervisor.md), [scheduler source](https://github.com/jayminwest/warren/blob/5e54764071826cc9c84b924d6d76099b0e23ae69/src/server/scheduler.ts) (2026-11-14) | Explicit RuntimeProvider, intent rather than prebuilt workspace, ordered resumable event cursor, differentiated lost/evicted/preempted/OOM terminal reasons. Design documents the deliberate daemon-to-in-process simplification for local use and retained Kubernetes pod reattachment. Private Git metadata, read-only shared object store, GC keep-refs and stop/seal before host Git operations are valuable workspace-isolation ideas. | Contract still contains provider-specific host clone hints and explicitly ignored resource/concurrency fields for some backends. Local restart marks live rows lost; Kubernetes can reattach. Single-flight scheduler scans projects and its in-memory retry tracker resets on restart. Do not represent unsupported admission or persistence as equivalent across adapters. Add capability-profile validation; test controller loss, stale cursor, secret revocation, teardown vs Git GC, and repeated restart across retry budget. Shared Git storage must stay within qualified trust/tenant scope. |
| [Restate invocation state machine](https://github.com/restatedev/restate/blob/5fb156a12983b0e7e02308ff6d59e5c5c5c1e866/crates/invoker-impl/src/invocation_state_machine.rs) (2026-11-27) | Invoker generation fencing on effects; resource permit and per-invocation memory budget; journal tracker waits for acknowledgements of commands and notifications before retry. Generic timer key allows deterministic unit tests. This is a concrete implementation example for Runtime C0-C3 and the existing uncertain-outcome/effect-fence decisions. | A journal/fence cannot by itself make a third-party effect exactly-once. Do not use Restate and Temporal simultaneously as competing owners. The inspected server source is under Business Source License with a later Apache-2.0 change date; verify the pinned LICENSE/additional-use grant and intended commercial hosting before any adoption. Reference the mechanism now, not a dependency recommendation. |
| [OpenHands SDK conversation protocol](https://github.com/OpenHands/software-agent-sdk/blob/cf8158bc25f5552c50ad131a5f0ce2dbc297789b/openhands-sdk/openhands/sdk/conversation/base.py), [event-list port](https://github.com/OpenHands/software-agent-sdk/blob/cf8158bc25f5552c50ad131a5f0ce2dbc297789b/openhands-sdk/openhands/sdk/conversation/events_list_base.py), [workspace base](https://github.com/OpenHands/software-agent-sdk/blob/cf8158bc25f5552c50ad131a5f0ce2dbc297789b/openhands-sdk/openhands/sdk/workspace/base.py) (2026-11-27) | Local/remote conversations and event lists share interfaces; append returns assigned sequence. Workspace lifecycle uses context-manager ownership. Independent SDK snapshot corroborates the earlier UI/API separation review. | Workspace base also imports conversation errors, registers LLM cost and implements an environment-configured best-effort completion callback. Useful for its SDK, but do not make our Workspace port own commercial accounting, business completion or automation notifications. Delivery failure after successful work must not become run failure. Test durable completion receipt independent of webhook, replay without duplicate billing, and failure of sandbox cleanup after business completion. |

**Decision routing, not another architecture gate:** keep Gas Town's separate scheduling intent under the existing Orchestrator/AR ownership split (not a new Task model); route Warren's workspace/capability/reattachment evidence to AR provider conformance and Extension/LMU generation retirement; route Restate's journal and fence example to the existing durable effect and retry decisions; route SDK completion/accounting separation to OD-024 and the existing usage owner. A provider with weaker local guarantees may be useful if the profile declares them, but must not silently satisfy a stricter hosted contract.

**Reference candidates not inspected in this pass:** Composio agent-orchestrator could not be retrieved through the GitHub connector. Do not assign it a source-based finding. LangGraph checkpointing, Daytona editions, and other workspace services remain candidates for narrower future qualification against specific owner contracts, not additions to the dependency graph.

## Deep follow-up: live plugin custody and OpenClaw failure history — 2026-11-27

Continuation of the fleet study, not a new product roadmap. The previous draft
checkpoint was [3766a8d](https://github.com/agent-teams-ai/engineering-research/commit/3766a8d85911bb64e532122d4850088d796b5236).
The original agent's local working directory/transcript was unavailable;
the published evidence is the recovery basis. Focused source inspection,
not an executed OpenClaw installation, independent defect reproduction or
proof of current unrepaired bugs.

### Passes 1–3: ownership, live update and adversarial lifetime review

Owner baselines inspected on November 27:

- [Ecosystem vision](https://github.com/agent-teams-ai/.github/blob/main/docs/architecture/ecosystem-vision.md):
  reusable foundations, independently useful products, one-agent local profile,
  greenfield Runtime v3; its older tens-of-thousands target needs reconciliation
  with the owner's new hundreds-of-thousands target.
- [GM system boundary](https://github.com/agent-teams-ai/get-modular/blob/27dfb4ddf67cead198fee6e781ab355c37782928/docs/architecture/system-boundary.md#L33-L75):
  static graph and plans, not active-head, trust or product authority.
- [Extension Foundation live-system map](https://github.com/agent-teams-ai/extension-foundation/blob/a1b5007ae4777bb5b01adab35a9ee83546a62333/docs/architecture/live-extension-system-map.md#L87-L237):
  separate artifact/installation/runtime identity, actual custody, optional
  profiles, retained state and grants.
- [LMU operation](https://github.com/agent-teams-ai/live-module-updates/blob/77a3ecc4ace12509961bd3ff43e80703b0303c40/docs/architecture/operation.md#L17-L126)
  and [Programme C invariants](https://github.com/agent-teams-ai/live-module-updates/blob/77a3ecc4ace12509961bd3ff43e80703b0303c40/docs/plans/composed-module-adoption-plan.md#L132-L161):
  already require actual attempt-bound publication, atomic admission, whole
  dependency closure, cleanup debt and separate retention holds. Do not propose
  these again as absent requirements. The contribution below is sharper
  rejecting scenarios and operator evidence, not another lifecycle kernel.

OpenClaw source snapshot: [773acb717fb30b4e7872175d449e4d6ea1d19014](https://github.com/openclaw/openclaw/tree/773acb717fb30b4e7872175d449e4d6ea1d19014),
main retrieved November 27. The relevant profile is a single trusted Gateway
with cooperative JS plugin work, not hostile multi-tenant hosting.

| Source-inspected mechanism | Benefit and strongest counterexample | Transferable law / proposed test |
| --- | --- | --- |
| [Registry lifecycle](https://github.com/openclaw/openclaw/blob/773acb717fb30b4e7872175d449e4d6ea1d19014/src/plugins/registry-lifecycle.ts#L260-L415): borrowed records explicitly marked; publication transfers unchanged records; quiescing closes admission before abort listeners; cache deletion by retired value, not reused key. | Reusing unchanged instances is more efficient than rebuilding all plugins. Identity mutation of a borrowed owner, registry membership, epoch and instance authority are intertwined. Code comments explicitly avoid cancellation of a successor by stable plugin ID. This is not evidence of a current race. | GM/LMU: independent H1/H2 hosts; A/B share a dependency; replace A, keep B's admitted call and resource; old reentrant abort callback must neither admit new A nor cancel B/new A. Test owner versus borrower explicitly, not a registry-wide reference count. |
| [Instance scope](https://github.com/openclaw/openclaw/blob/773acb717fb30b4e7872175d449e4d6ea1d19014/src/plugins/plugin-instance-scope.ts#L140-L218): invocation scope carries exact instance and current-authority guard; cleanup runs under host-owned admission. | Good delayed callback guard; AsyncLocalStorage and a process object identity are neither cross-process proof nor sandbox. A plugin can still bypass cooperative wrappers if allowed arbitrary host APIs. | LMU retains cohort through awaited work and streams; extension admission denies unsupported trust profiles. Receiver validates resource-specific generation/authority for protected writes. Test async context loss, wrong host and expired grant independently. |
| [Cache lifecycle](https://github.com/openclaw/openclaw/blob/773acb717fb30b4e7872175d449e4d6ea1d19014/src/plugins/plugin-cache.ts#L314-L444): cache invalidation and retirement separated, one original deferred completion, retained callers settle, source files retained for timed-out calls. | A bounded report may return while physical cleanup continues. Process maps are scoped to this host; copying this storage model into a fleet would couple ownership to process lifetime. | LMU/EF/AR: separate metadata invalidation, unload, native-stop observation and artifact deletion. A timeout returns cleanup debt with original completion; retry joins that completion rather than erasing debt. Independent artifact holds for lazy imports, replay and rollback. |
| [Native ESM capture](https://github.com/openclaw/openclaw/blob/773acb717fb30b4e7872175d449e4d6ea1d19014/src/plugins/plugin-instance-module-loader.ts#L104-L188): source/realpath/workspace/SDK resolution and admitted source identity scope retained maps; ambiguous owners rejected. | Source capture solves part of lazy-load continuity; it is not proof of reclaiming evaluated native ESM/native addons or isolation. Global maps and workspace paths are local implementation choices. | EF: bind artifact/import closure and execution profile, not package version or plan digest alone. Test lazy dynamic import after replacement, same digest/different host grants, partial acquisition and bounded disk/memory growth. For actual physical reclamation compare a disposable worker/process profile. |
| [Lifecycle lease](https://github.com/openclaw/openclaw/blob/773acb717fb30b4e7872175d449e4d6ea1d19014/src/plugins/plugin-lifecycle-lease.ts#L145-L280): explicit detached observer scope; state-directory lease, worker heartbeat, owner checks at cleanup. | Useful local cross-process serialization. Lease demand is tracked in-process and a state-path lease can serialize unrelated work in that scope; a lease is not a distributed receiver fence. | LMU and product owner: dependency-closure conflict domain, independent updates can progress; prove self-update from retained caller rejects or defers without deadlock; delayed former holder cannot publish/delete in a successor's epoch. |
| [Generation receipt](https://github.com/openclaw/openclaw/blob/773acb717fb30b4e7872175d449e4d6ea1d19014/src/plugins/plugin-generation-receipt.ts) and [retention test file](https://github.com/openclaw/openclaw/blob/773acb717fb30b4e7872175d449e4d6ea1d19014/src/plugins/plugin-instance.retention.test.ts#L25-L110): source receipt, tests for released reload preludes, owner work after caller release, pending physical callbacks. | Stronger evidence than feature marketing; the tests were inspected, not executed. WeakRefs alone do not establish stable retained heap/disk over a real long-lived deployment. | EF qualification: assert unchanged useful output, exact ownership, bounded retained bytes/objects and actual settlement across repeated replacements. Test with real packaged consumers, not just test doubles. |

Historical reports and documented limitations (not independently reproduced;
no claim that these remain unfixed at the source snapshot):

| Evidence | Consequence for our conformance fixtures |
| --- | --- |
| [#152965](https://github.com/openclaw/openclaw/issues/152965), September 19: reporter describes unrelated non-channel configuration reload disposing live channel adapters and losing traffic. | Update affected closure only; long-running ingress, subscriptions and unrelated modules remain useful. Test shared dependency that really requires wider replacement, too. |
| [#153290](https://github.com/openclaw/openclaw/issues/153290), September: reported earlier source capture removed while a channel adapter still resolves code; follow-up describes another retained consumer failure. | Reproduce with delayed dynamic import, after-delivery callback, worker and UI client; no garbage collection from registry refcount alone. |
| [#155737](https://github.com/openclaw/openclaw/issues/155737), September: reporter observed large accumulated build directories and quota-exhausted reload. Reported sizes are incident-specific, not measured here. | Test the opposite failure to premature deletion: disk/memory/generation budgets, repeated successful and failed updates, offline/restart cleanup and protected retained artifacts. |
| [#181106](https://github.com/openclaw/openclaw/issues/181106), October: reporter describes event-loop stall causing forced retirement and later shutdown failure. | Monotonic elapsed deadlines, actual native settlement independent of timer ordering, blocked event loop, cancellation during cleanup, late success; refuse false clean status. |
| [Manage plugins](https://docs.openclaw.ai/plugins/manage-plugins.md), [SDK runtime](https://docs.openclaw.ai/plugins/sdk-runtime), [architecture](https://docs.openclaw.ai/plugins/architecture), rolling docs: cold inspection vs active Gateway, restart-required bundled changes, best-effort cleanup, bounded drain and explicit turn-handover modes. | Expose declared/installed/verified/selected/useful/retired facts separately. Advertise hot swap only for qualified profiles. Do not allow a plugin to declare overlap as self-authorization. Turn handover requires state/effect compatibility and a tested safe boundary. |

**Practical owner split:** LMU already specifies cohort/cleanup/uncertainty; add
the selective-replacement, lazy-load and event-loop-stall cases to its existing
Programme C fixture design. Extension Foundation owns trust, import closure
admission, artifact retention and conformance profile; Engineering Foundation
owns development-only contract tests/mutation checks, not runtime logic. GM
owns the graph and public resource laws, not dynamic capability registries or
a second updater. Actual AR/Orchestrator/Platform owners decide durable state,
routing and protected-write authority. A local live update success is not a
fleet rollout or a security claim.

**Critique:** do not equate a large number of plugin-related files with bad
architecture: explicit owner-scoped modules are often valuable. The actionable
risk is duplicated authority, leaked shared realms and ambiguous lifetime,
not file count. Broad hook/event APIs and transparent proxies can help an
existing host preserve compatibility, but the greenfield default should be
small typed consumer-owned capability ports with explicit lifetime; avoid
global service discovery and implicit auto-activation for untrusted packages.
For a pure deterministic module, no mandatory dynamic loader, process,
network hop or per-call distributed generation lookup is justified.

### Pass 4: mature modular systems — OSGi versus JS generation replacement

[OSGi Core R8 §7](https://docs.osgi.org/specification/osgi.core/8.0.0/framework.wiring.html)
is a versioned specification, not a recommendation to introduce Java/OSGi.
It deliberately distinguishes a bundle revision, the current wiring and older
wiring still used by dependents. Refresh computes the reverse dependency
closure and may stop/restart affected bundles. [Equinox ServiceUse](https://github.com/eclipse-equinox/equinox/blob/78c4d50c10aeb3505a4c210c30bb6d043103fdd7/bundles/org.eclipse.osgi/container/src/org/eclipse/osgi/internal/serviceregistry/ServiceUse.java#L57-L182)
implements acquired-use tracking and rejects a release for the wrong object.
These support LMU's separation of graph, incarnation, admitted work and
retention. Counterexample to blindly copying OSGi: automatic closure refresh
may interrupt unrelated useful work through shared dependencies, and a use
count cannot prove external side-effect settlement or release of escaped JS
references. Model the actual affected closure, exclusive/shared resources
and different support modes (overlap, drain-and-switch, restart-only).
No runtime OSGi dependency or dynamic service locator.

### Pass 5: additional competitor source audit — coordination and operational recovery

All snapshots below retrieved November 27, focused excerpts only; no competitor
test suite executed. Proposed consequences are inference unless labelled
source/documented fact.

| Pinned evidence | Useful mechanism | Challenge and decision consequence |
| --- | --- | --- |
| [Paperclip continuation classifier](https://github.com/paperclipai/paperclip/blob/c72c4687083db82348baa03a7d57cb6963245f44/server/src/services/continuation-cause.ts#L91-L180) | Explicit user-owned stops, provider exceptions, setup-before-provider-work and recovery causes; corresponding SQL selectors reuse constants. | Some classification logic exists twice (TS predicate/SQL predicate) and extracts a cause from an error string. Nonempty unknown failure codes are initially classified system-owned subject to other checks. Test truth-table equivalence, missing/null fields, new error codes, and mandatory authorization before resuming. Prefer typed immutable reason and explicit default refusal for unsupported unsafe effects. No claim of observed retry bug. |
| [Paperclip budget recheck](https://github.com/paperclipai/paperclip/blob/c72c4687083db82348baa03a7d57cb6963245f44/server/src/services/budget-reservations.ts#L14-L65) and [workspace lifecycle lock](https://github.com/paperclipai/paperclip/blob/c72c4687083db82348baa03a7d57cb6963245f44/server/src/services/execution-workspace-lifecycle-lock.ts) | Rechecks held reservation before dispatch after preparation, documents lock order and revalidates workspace roots under lock. | Dedicated connection + advisory transaction lock kept across async work, with keepalive, consumes a connection for the critical-section lifetime. Not a measured bottleneck. Audit actual lock duration, contention, pool headroom and failure; keep external work out of owner transactions as already required in our architecture. |
| [AgentField limiter](https://github.com/Agent-Field/agentfield/blob/1b3c68a3e6fb06c5dcd8869245f954fbc931b982/control-plane/internal/handlers/agent_concurrency.go#L10-L79) and [state validator](https://github.com/Agent-Field/agentfield/blob/1b3c68a3e6fb06c5dcd8869245f954fbc931b982/control-plane/internal/storage/execution_state_validation.go#L21-L55) | Simple atomic local guard and explicit legal state transitions; accommodates delayed queued projection. | This limiter is a singleton backed by process-memory counters; it does not by itself enforce cross-replica quota. Release by agent ID rather than reservation ID is weaker than exact once accounting. A timeout can transition back to running in the validator; distinguish uncertain execution from terminal business outcome. Not an assertion that no other AgentField control exists. Reference discovery/typed invocation, not a replacement for AR custody and Orchestrator. |
| [Symphony GenServer state](https://github.com/openai/symphony/blob/be10a1b79df723d6d7612b5651c8522704dafb2e/elixir/lib/symphony_elixir/orchestrator.ex#L24-L77) | Local supervision, monotonic poll timer, clean isolated workspace management. | State maps carry running/claimed/blocked/retry information inside one process. For hosted use persist authoritative state or reconstruct from durable receipts; don't copy a GenServer-sized global business coordinator. Local standalone implementations can retain a simpler physical topology. |
| [Gas Town scheduler persistence](https://github.com/gastownhall/gastown/blob/94cc82289d2ead275a62e1db4ef1d4ada4a1f98e/internal/scheduler/capacity/state.go#L22-L100) | Atomic temp-file rename prevents readers seeing partial JSON; migration reads legacy path. | Atomic replacement alone does not prevent stale read-modify-write/lost updates or prove power-loss durability. Caller locking may address concurrent mutation; not audited end-to-end. Keep explicit monotonic revisions and atomic conditional mutation for distributed scheduler state. |
| [Vercel Open Agents lifecycle workflow](https://github.com/vercel-labs/open-agents/blob/cf865e94de7729751c747171785b6ce57e7b178c/apps/web/app/workflows/sandbox-lifecycle.ts#L18-L124), [session database helpers](https://github.com/vercel-labs/open-agents/blob/cf865e94de7729751c747171785b6ce57e7b178c/apps/web/lib/db/sessions.ts#L305-L356), [hibernate path](https://github.com/vercel-labs/open-agents/blob/cf865e94de7729751c747171785b6ce57e7b178c/apps/web/lib/sandbox/lifecycle.ts#L170-L270) | Separates durable agent loop from VM lifetime, snapshots/hibernation, activity rechecks. Has an atomic lifecycle-run claim helper in database layer. | The inspected workflow's claim/clear uses read-then unconditional update by session ID rather than that CAS helper; evaluation calls stop after checking activity, then updates state. Competing wake/clear/new-admission/stop is a concrete race hypothesis; outer caller/platform serialization may constrain reachability. Reproduce before filing defect. For AR enforce owner/epoch at mutation, reconcile unknown stop; VM/harness state must not silently lose workspace or admitted work. |
| [Mastra durable execution fence](https://github.com/mastra-ai/mastra/blob/6c8c7025be00578fc990d1aca09ae5e4142109d5/packages/core/src/agent/durable/execution-fence.ts#L1-L24) and [settlement](https://github.com/mastra-ai/mastra/blob/6c8c7025be00578fc990d1aca09ae5e4142109d5/packages/core/src/agent/durable/execution-fence.ts#L643-L735) | Distinguishes storage-checked generations from fallback PubSub lease and no-op single-process provider. The source explicitly acknowledges the check-to-write gap in weaker profile. | Do not hide those profiles behind equivalent success signatures. Comments describe disarming owned-settled fences for background writes; the permitted write set needs separate examination, not a blanket current bug claim. [Closed historical issue #18031](https://github.com/mastra-ai/mastra/issues/18031) describes suspended tool resume failing on cold process despite persisted payload. Test cold resume with original input, worker version and approval/authority, plus terminal late writes, storage generation and stale memory store. |

OpenHands SDK and Warren earlier in this study remain more relevant to portable
workspace contracts than a generic agent loop. Restate/Temporal are stronger
durable execution references. Composio Agent Orchestrator and Orleans could not
be source-pinned through the connector on this pass; retain as unscored
watchlist/documentation references, not negative assessments.

### Pass 6: fleet controller behavior, admission and backpressure

[Kubernetes Agent Sandbox warm-pool controller](https://github.com/kubernetes-sigs/agent-sandbox/blob/6242490fac541912665243d67c42405be0cb692d/extensions/controllers/sandboxwarmpool_controller.go#L125-L205)
documents two important failure shapes: creation ahead of informer-cache
observation and replenishment delay repeatedly re-arming under sustained
arrivals, starving refill. The implementation tracks expected writes and
optionally shapes refill with per-pool token buckets. It includes author-reported
benchmark comments (not reproduced here); no extrapolation to 100k agents.
The [claim controller](https://github.com/kubernetes-sigs/agent-sandbox/blob/6242490fac541912665243d67c42405be0cb692d/extensions/controllers/sandboxclaim_controller.go#L295-L440)
treats pending warm candidates as transient, not as terminal failure.
The [release history](https://github.com/kubernetes-sigs/agent-sandbox/releases)
reports fixes for scheduling-gated warm pool members, stale UID cache eviction
and partial-throttling status updates. These are useful hosted sandbox
adapter candidates and failure scenarios, not business execution authority.

[Hatchet tenant-scoped lease repository](https://github.com/hatchet-dev/hatchet/blob/8f0821b8a59758eb2364a67a59867e18849b062f/pkg/repository/scheduler_lease.go#L35-L113)
and [batch scheduler](https://github.com/hatchet-dev/hatchet/blob/8f0821b8a59758eb2364a67a59867e18849b062f/pkg/scheduling/v1/batch_scheduler.go#L960-L1048)
show transactional acquire/release and atomic batch reservation + assignment.
Useful as scheduling evidence; not proof that arbitrary external work is
exactly once or that tenant pools scale linearly. A task queue is not an
agent session, sandbox or business Run. Preserve current C0-C3 fair admission
plan and OD-024 consumption ownership; compare a bounded candidate adapter
only where a real gap remains.

**Fleet-level discriminators:** use delayed/duplicate projections, a continuous
arrival rate below and above service rate, scale-out plus partial pool refill,
provider 429s, delayed claim readiness, hot partition, stale status UID, and
burst of terminal cleanup. Measure useful accepted/completed work, oldest
eligible wait, control lag, refill rate, pending bytes, retained cleanup debt,
false-ready observations and resource cost. Reconcile desired/accepted/
observed state without mistaking a queue lag for capacity or failure.

## Second deep campaign: executable LMU boundary and competitor implementation review — 2026-11-27

The owner requested further source-level adversarial review, not another broad
catalog. Continue the existing draft from 6af725b. Distinguish source-inspected,
locally executed, reported upstream tests/incidents, and design hypotheses.

### A1 — Inspect the actual LMU implementation and tests, not only the plan

At [LMU main 77a3ecc4](https://github.com/agent-teams-ai/live-module-updates/tree/77a3ecc4ace12509961bd3ff43e80703b0303c40)
the cooperative implementation is already substantial. The [status](https://github.com/agent-teams-ai/live-module-updates/blob/77a3ecc4ace12509961bd3ff43e80703b0303c40/docs/status.md)
and [Programme C](https://github.com/agent-teams-ai/live-module-updates/blob/77a3ecc4ace12509961bd3ff43e80703b0303c40/docs/plans/composed-module-adoption-plan.md)
record the exact supported finite profile and independent native fixture results.
Do not describe these as pending design-only work.

- [Invocation boundary](https://github.com/agent-teams-ai/live-module-updates/blob/77a3ecc4ace12509961bd3ff43e80703b0303c40/src/features/update-operation/application/invocation.ts):
  one per-Host map, synchronous inert selection, shared work budget, cumulative
  generation identities; no process-wide singleton.
- [Generation owner](https://github.com/agent-teams-ai/live-module-updates/blob/77a3ecc4ace12509961bd3ff43e80703b0303c40/src/features/update-operation/application/generation.ts):
  reserve before callback, child tracking, per-call continuations, immutable
  original close, separate eligible cleanup retry, forgetting only when sealed,
  drained and actual native receipt complete.
- [Update operation](https://github.com/agent-teams-ai/live-module-updates/blob/77a3ecc4ace12509961bd3ff43e80703b0303c40/src/features/update-operation/application/update-operation.ts)
  + [state](https://github.com/agent-teams-ai/live-module-updates/blob/77a3ecc4ace12509961bd3ff43e80703b0303c40/src/features/update-operation/application/operation-state.ts):
  retain preparation before publication, exact attempt receipt and reconcile,
  distinguish terminal logical observation from in-flight authority calls and
  physical cleanup debt. The optional adoption probe invokes the expected head.
- Actual test source: [invocation](https://github.com/agent-teams-ai/live-module-updates/blob/77a3ecc4ace12509961bd3ff43e80703b0303c40/tests/features/update-operation/invocation.test.ts),
  [operation](https://github.com/agent-teams-ai/live-module-updates/blob/77a3ecc4ace12509961bd3ff43e80703b0303c40/tests/features/update-operation/operation.test.ts),
  [budget](https://github.com/agent-teams-ai/live-module-updates/blob/77a3ecc4ace12509961bd3ff43e80703b0303c40/tests/features/update-operation/budget.test.ts),
  [ownership](https://github.com/agent-teams-ai/live-module-updates/blob/77a3ecc4ace12509961bd3ff43e80703b0303c40/tests/features/update-operation/ownership.test.ts),
  [recovery](https://github.com/agent-teams-ai/live-module-updates/blob/77a3ecc4ace12509961bd3ff43e80703b0303c40/tests/features/update-operation/recovery.test.ts),
  [shutdown](https://github.com/agent-teams-ai/live-module-updates/blob/77a3ecc4ace12509961bd3ff43e80703b0303c40/tests/features/update-operation/shutdown.test.ts).
  These already address the majority of the earlier suggested negative cases.
  In particular the existing budget test intentionally expects a failed B
  adoption probe while all work capacity is occupied by A. It subsequently
  proves fresh B work succeeds. Do not open a bug merely for that behavior.

### A2 — Executed source-backed boundary probes (8/8)

The network-restricted research environment could not clone the repo. Three
exact source files were transcribed from GitHub at 77a3ecc4 and independently
verified with `git hash-object` against returned blob SHAs:

| Source under src/features/update-operation/application/ | Git blob SHA |
| --- | --- |
| generation.ts | 94e91f5e7ad698f85e84798f69abd93531f5e101 |
| invocation.ts | 34a7498eb3adfe8f80b90ff2d315334ce53ad986 |
| cleanup-report.ts | 72e77997f9be6fb6c42c8dc1481df416a4fdb9ab |

Executed a new local Node v22.16.0 harness using `node --experimental-strip-types --test probe.mjs`.
Type-only imports were stripped, no external package or actual product Host
loaded. Results: 8 passed, 0 failed, 0 skipped. This is a narrow execution of
the three exact files, not the upstream suite, released package, TS7/Node26
qualification, real native cleanup or a distributed proof.

| Executed case | Result and interpretation |
| --- | --- |
| Reentrant close requested but not awaited inside A; admitted child remains A | PASS; fresh admission refused, child completes, exact cleanup runs once. Positive control matching the existing upstream test. |
| Active A callback waits for its own close | Observed cycle: pending=1, admission sealed, cleanup original=not-started, no native release or return after five event-loop turns. Independent escape gate lets A return, then original close completes once. Conditional failure if management authority leaks into a retained callback, not a proven bug in the currently qualified Host-only API. |
| Native disposer waits for the same original close | Observed cycle: original cleanup=pending, disposer called once, close unresolved until external escape. Joining the same promise is correct for external observers, not for its own producer. |
| Invocation returns an async iterator, then A is closed/forgotten | Pending=0 before iterator consumption; late next() touches the disposed fixture and rejects. This is the explicitly excluded escaped-work case, not a regression in finite cooperative support. |
| Escaped bound context after actual return and forget | Refuses with continuation-closed. Good behavior. |
| Three identities, two retired and forgotten, fourth identity proposed | Refuses generation-capacity despite one registered generation, old ID reuse refused; C remains useful. Deliberate finite session-history policy. |
| Two independent boundaries both use A, one saturated | Other boundary remains useful and closes its own native owner only. Good behavior, not fleet-wide proof. |
| A fills the shared work budget, B becomes head | Expected B invocation refused work-capacity until A settles; subsequent B invocation succeeds. Confirmed shared limit, not a new bug. |

Minimal executable discriminator for the two central lifetime cases, using the
verified invocation/generation source (the eight-case local harness used Node's
test runner and assert/strict; this reduced snippet reproduces the same
self-join and iterator mechanisms):

```js
import assert from "node:assert/strict";
import { setImmediate as turn } from "node:timers/promises";
import { createInvocationBoundary } from "./invocation.ts";
const clean = () => ({ complete: true, settled: true, debts: [] });
const boundary = () => createInvocationBoundary({
  readCanonicalHead: () => ({ generationId: "A", revision: "r/A" }),
  maxActiveWork: 16, maxGenerationIdentities: 32,
});
const b = boundary();
const escape = Promise.withResolvers(), entered = Promise.withResolvers();
let a, closing, releases = 0;
a = b.attachGeneration({
  generationId: "A",
  invoke: async () => {
    closing = a.close();
    entered.resolve();
    return Promise.race([closing.then(() => "close"), escape.promise]);
  },
  release: async () => { releases++; return clean(); },
}).control;
const call = b.invoke();
await entered.promise;
for (let i = 0; i < 5; i++) await turn();
assert.equal(b.pending(), 1);
assert.equal(a.snapshot().cleanup.original.status, "not-started");
assert.equal(releases, 0);
escape.resolve("escaped");
assert.equal((await call).value, "escaped");
assert.equal((await closing).complete, true);
assert.equal(releases, 1);

const c = boundary();
let disposed = false;
const g = c.attachGeneration({
  generationId: "A",
  invoke: () => (async function* () {
    if (disposed) throw Error("native owner gone");
    yield "A";
  })(),
  release: async () => { disposed = true; return clean(); },
}).control;
const result = await c.invoke();
assert.equal(c.pending(), 0);
await g.close();
assert.equal(g.forget().status, "forgotten");
await assert.rejects(result.value.next(), /native owner gone/);
```

### A3 — OpenClaw resolves these precise problems at management seams

Pinned [773acb717](https://github.com/openclaw/openclaw/tree/773acb717fb30b4e7872175d449e4d6ea1d19014).
This source review traces actual reload path, not only registry data structures.

- [Gateway reload 237–330](https://github.com/openclaw/openclaw/blob/773acb717fb30b4e7872175d449e4d6ea1d19014/src/gateway/server-plugin-reload.ts#L237-L330):
  metadata-only preflight, affected channel/resources, overlap check, captured
  recovery, explicit self-reload refusal before stopping the dependent callback,
  drain retained work, quiesce, then drain admitted calls and sidecars.
- [Replacement reservation](https://github.com/openclaw/openclaw/blob/773acb717fb30b4e7872175d449e4d6ea1d19014/src/plugins/plugin-replacement-operation.ts):
  private exact instance reservation, refuse self-replacement, settlement token
  identity; a stale release cannot clear another reservation.
- [Retry after replacement](https://github.com/openclaw/openclaw/blob/773acb717fb30b4e7872175d449e4d6ea1d19014/src/plugins/plugin-replacement-retry.ts):
  only a named admission error with a replacement promise, then a single
  re-resolve on current registry. Do not generalize this to retry after
  execution/unknown effect. A pre-admission refusal and an executed effect
  have different retry semantics.
- [Publication/activation/cleanup](https://github.com/openclaw/openclaw/blob/773acb717fb30b4e7872175d449e4d6ea1d19014/src/gateway/server-plugin-reload.ts#L355-L485):
  recheck overlap after loading, reject exclusive registrations, publication
  and after-commit failures separate; independent activation tails and old
  retirement joined. These are cooperative local publication mechanics,
  not a distributed atomic transaction across all those resources.
- [Turn handover](https://github.com/openclaw/openclaw/blob/773acb717fb30b4e7872175d449e4d6ea1d19014/src/agents/plugin-turn-handover.ts):
  all held replaced plugins must support handover; one pinning plugin keeps
  old turn. At next step boundary, yield work while retaining custody;
  rebind through the existing run refresh. Eligibility derives partly from
  manifest declaration in [eligibility](https://github.com/openclaw/openclaw/blob/773acb717fb30b4e7872175d449e4d6ea1d19014/src/plugins/plugin-turn-handover-eligibility.ts).
  In our hostile/managed profiles a declaration cannot self-approve overlap,
  handover or compatibility. It needs verified contract + actual Host
  policy and step/effect/state receipt.
- [Retention diagnostic tests](https://github.com/openclaw/openclaw/blob/773acb717fb30b4e7872175d449e4d6ea1d19014/src/gateway/server-plugin-reload.retention.test.ts#L42-L136)
  inspect exact owner/reference ID, 60-second bounded wait, admission retained
  after deferral, and separate support-log redaction. Tests were inspected,
  not run. This is a practical operator feature worth borrowing: name which
  admitted work holds a generation, its age, dependency, and permitted
  recovery actions, while minimizing sensitive identities in support logs.
- [Reload lifecycle](https://github.com/openclaw/openclaw/blob/773acb717fb30b4e7872175d449e4d6ea1d19014/src/gateway/server-plugin-reload-lifecycle.ts):
  reservation release, committed, applied/restored/failed, and physical
  recovery are distinct. LMU already has richer independent facts; use those,
  not OpenClaw's Gateway-specific phase vocabulary.

**Action and critic:** keep management and invocation capabilities separate
as the current LMU [usage contract](https://github.com/agent-teams-ai/live-module-updates/blob/77a3ecc4ace12509961bd3ff43e80703b0303c40/docs/architecture/cooperative-operation-usage.md)
requires. For an actual plugin-initiated update, do not inject the full update
runtime/close handle. Accept an authorized intent, return an acceptance receipt,
then run the management operation outside that retained callback and observe
completion independently. An explicit synchronous self-update refusal may
be useful where the existing owner can identify the actual dependency cycle;
do not add AsyncLocalStorage as a mandatory dependency of portable LMU
or infer arbitrary cycles from stable IDs. Existing GM Hosts expose only the
application capability. For handover, streaming, long-lived session renewal,
and cross-process recovery, preserve the existing deferred decision route
(Programme C). Adopt no new runtime API until the supported use case and
independent rejecting evidence warrant it.

### A4 — Get Modular: inspect the graph kernel and the already available lifetime mechanisms

[GM main 27dfb4dd](https://github.com/agent-teams-ai/get-modular/tree/27dfb4ddf67cead198fee6e781ab355c37782928),
source inspected November 27. Avoid conflating a graph of implementation
declarations with an inventory of agents or the number of repository files.
The admitted [resource limits](https://github.com/agent-teams-ai/get-modular/blob/27dfb4ddf67cead198fee6e781ab355c37782928/packages/core/src/features/input-admission/resource-limits.ts)
include 4096 declarations/selections, 65,536 bindings, 16 MiB aggregate raw
documents, 1024 roots, and independently bounded depth; these are meaningful
per compilation, not a global ecosystem/agent limit.

The [selected graph](https://github.com/agent-teams-ai/get-modular/blob/27dfb4ddf67cead198fee6e781ab355c37782928/packages/core/src/features/composition-semantics/selected-graph.ts)
deduplicates adjacency while counting original edge occurrences. It uses
iterative [SCC](https://github.com/agent-teams-ai/get-modular/blob/27dfb4ddf67cead198fee6e781ab355c37782928/packages/core/src/features/composition-semantics/graph-components.ts)
and numeric [min-heap](https://github.com/agent-teams-ai/get-modular/blob/27dfb4ddf67cead198fee6e781ab355c37782928/packages/core/src/features/composition-semantics/ready-queue.ts)
rather than repeated whole-array sorting or recursive DFS. The existing
[graph tests](https://github.com/agent-teams-ai/get-modular/blob/27dfb4ddf67cead198fee6e781ab355c37782928/packages/core/tests/features/composition-semantics/selected-graph.test.mjs)
include all 65,536 four-node directed graphs against an independent oracle,
full 262,144-edge input, depth/cycle/low-stack and permutation cases. The
[scale integration](https://github.com/agent-teams-ai/get-modular/blob/27dfb4ddf67cead198fee6e781ab355c37782928/packages/core/tests/features/composition-semantics/scale-integration.test.mjs)
uses full-pipeline independent plan/digest evidence. These source tests were
inspected, not rerun here.

**Executed kernel-only microprobe.** The three graph source files were copied
and checked by Git blob SHA (selected-graph.ts d046624c9e830e6d9de94dd1a5430bcac6a4a2ff;
graph-components.ts 3b2dd088f9d9e73af034bde8be64a9159eaea0fd;
ready-queue.ts 3ce808301fd313a3e024c95a54c78bc4b9230e01).
Only runtime filenames were resolved via local symlinks to the exact TS
sources. Node 22.16.0 with experimental type stripping; uncalibrated local
research machine, 3 warm-up and 10 observed runs per shape. Independent
shape-specific assertions, reversed node/edge/root permutations, and bounded
edge-visit checks all passed. Timings exclude input generation, parsing,
admission, hashing, canonicalization, construction, packaging and I/O.

| Shape | Vertices / edge occurrences | Median elapsed, observed range | Checked behavior |
| --- | --- | --- | --- |
| Chain | 128 / 127 | 0.396 ms, 0.243–1.226 | Ordered closure, depth 128 |
| Chain | 512 / 511 | 0.588 ms, 0.462–1.098 | Ordered closure, depth 512 |
| Chain | 2048 / 2047 | 2.140 ms, 0.603–11.450 | Depth 2048 |
| Chain (kernel diagnostic beyond accepted depth) | 4096 / 4095 | 3.565 ms, 1.133–10.966 | Stack-safe, depth saturates at 2049, not an admitted plan |
| Giant cycle | 4096 / 4096 | 1.403 ms, 1.100–2.398 | One SCC, no dependency order |
| Bipartite graph (kernel boundary) | 4096 / 262144 | 39.660 ms, 33.967–59.041 | Depth 2, 524288 SCC visits, 85107 ready comparisons, 129-node selected root closure |
| 256 independent groups | 4096 / 4096 (3840 unique) | 1.805 ms, 1.573–8.164 | Depth 2, 512-node closure, parallel occurrence accounting |

Reproduce by using `x/n` + five-digit index as the ID, chaining consecutive
nodes, closing the chain for the cycle, or connecting every provider index
0..127 to every consumer index 128..2175 for the bipartite shape; select its
first consumer as root. For independent groups use 256 groups of 16 nodes
and 16 edges from each first node to its other 15 members (one repeated);
select the last member of each. Record `performance.now()` around the kernel
only and assert statistics and semantic projections. Do not extrapolate
these numbers to a full compiler, actual ESM loading, 100k agents, or Node26.

The most important architectural discriminator is **root closure versus
affected closure**. With A->B, B->C, A->D, X independent, the actual compiler
kernel gives root C's provider closure {A,B,C}; changing A may affect
{A,B,C,D}. A loader that uses root closure for retirement misses D. A source
inspection of the kernel confirms it computes provider reachability from
selected roots, not an LMU affected-closure algorithm. The latter also
depends on both old/new plans, concrete sharing, state/grants and exclusive
resources. Use GM's existing public plan facts and LMU's existing planner
boundary; no second graph authority. Test removed provider, new binding,
ordered many, unchanged-but-shared provider and dependent outside a single
root. Keep ordinary static composition and independent product/feature
Hosts; prefer measured full recomputation within bounded graphs until actual
product latency justifies incremental machinery.

**Reuse rather than extract:**

- [Resources](https://github.com/agent-teams-ai/get-modular/blob/27dfb4ddf67cead198fee6e781ab355c37782928/packages/resources/README.md#closing)
  already documents self/ancestor-cleanup wait deadlock, same original close,
  abandon-versus-settlement, ordered debts and scope detachment. This narrows
  A2: the self-join problem is a known native ownership constraint, not a
  newly discovered GM defect. Its package-copy brand and one-copy Host rule
  matter for hot updates; qualify peer deduplication/realm placement rather
  than sharing raw Resources facades across independent executor realms.
- [Observation](https://github.com/agent-teams-ai/get-modular/blob/27dfb4ddf67cead198fee6e781ab355c37782928/packages/observation/README.md#reference)
  owns bounded latest-state observation, scope-bound detach, one waiting
  load, stale-result rejection, echo/cascade guards. Its default 64 per
  scope / 8192 per store is not a fleet design limit. A commit coalesces;
  it does not guarantee every discrete event. Async echo across real I/O,
  timers and weaker environments is explicitly excluded. Use it for
  local LMU progress/current snapshots where actual subscribers fit,
  not original receipt delivery, durable causation, authorization or
  distributed OODA loop prevention. No second local state observer.
- [GM+Effect](https://github.com/agent-teams-ai/get-modular/blob/27dfb4ddf67cead198fee6e781ab355c37782928/packages/effect/README.md)
  already owns native Layer construction of an exact GM binding graph.
  [Implementation](https://github.com/agent-teams-ai/get-modular/blob/27dfb4ddf67cead198fee6e781ab355c37782928/packages/effect/src/features/construction/lower.ts)
  uses fresh mapper identities per graph and native memoization; its
  [practices](https://github.com/agent-teams-ai/get-modular/blob/27dfb4ddf67cead198fee6e781ab355c37782928/packages/effect/docs/practices.md)
  explicitly warn about escaped streams and shutdown wait graphs. Evaluate a
  native owned streaming adapter using that integration before writing
  generic lifetime or stream abstractions. Do not import private lifecycle
  kernel or force Effect into ordinary typed interfaces.

### A5 — Extension Foundation actual draft artifact adapter and physical code retirement

Main has the accepted safety model and qualification fixtures, but the newer
working implementation was inspected on the actual
[EF PR #70 at 8c16e5db](https://github.com/agent-teams-ai/extension-foundation/tree/8c16e5dbf24d8a09d9f33fe7c3ee8f38bf74599c).
It was open/not draft at observation, not assumed merged or released.
The [node-artifact README](https://github.com/agent-teams-ai/extension-foundation/blob/8c16e5dbf24d8a09d9f33fe7c3ee8f38bf74599c/packages/node-artifact/README.md)
explicitly supports trusted finite self-contained ESM on Linux x64, direct-key
Cosign, digest-pinned captured bytes, no dependency resolver, no unload or
hostile sandbox claim. Native Node24/26, ORAS1.4.0, Cosign3.1.6 loopback
qualification is distinct from public registry or hostile execution.

Trace [verify](https://github.com/agent-teams-ai/extension-foundation/blob/8c16e5dbf24d8a09d9f33fe7c3ee8f38bf74599c/packages/node-artifact/src/features/verified-artifact/verify.ts):
snapshot immutable request -> inspect tools -> fetch/hash manifest ->
direct-key signature over captured bytes -> inspect closed descriptor ->
hash each blob -> stage and capture verified bytes -> validate exact staging
entries -> verified capability. [Staging](https://github.com/agent-teams-ai/extension-foundation/blob/8c16e5dbf24d8a09d9f33fe7c3ee8f38bf74599c/packages/node-artifact/src/features/verified-artifact/staging.ts)
refuses symlink/aliased entries and captures opened inode bytes.
[Evaluation](https://github.com/agent-teams-ai/extension-foundation/blob/8c16e5dbf24d8a09d9f33fe7c3ee8f38bf74599c/packages/node-artifact/src/features/verified-artifact/evaluate.ts)
checks exact ABI and synchronous Host admission, imports data URL + unique
evaluation ID, then validates exports. These are intentionally separate
facts. The accepted [ADR-0011](https://github.com/agent-teams-ai/extension-foundation/blob/a1b5007ae4777bb5b01adab35a9ee83546a62333/docs/decisions/0011-extension-admission-custody-and-retirement-closure.md#L98-L186)
owns revision-bound grant, scope/artifact/source fence hierarchy and
receiver enforcement; the initial artifact adapter does not implement all
production-host rules.

**Executed narrow evaluation probe.** Exact draft files contracts.ts
(88f6a0e403202d3b5599aecbf3bce96a2ec5d672) and evaluate.ts
(b90b46dce55e21d78d65ea97259bc4060462f522), verified via Git blob hashes.
Node 22.16.0 `--expose-gc --experimental-strip-types`. Called the internal
verified-artifact factory with an inert synthetic metadata fixture and
benign self-contained source; deliberately bypassed actual registry and
signature verification. No claim of native qualification, real artifact
admission, or release defect. Confirmed:

1. A refused authority callback did not evaluate the module; a refused export
   predicate **after** evaluation did not undo its benign top-level counter.
2. 200 evaluations of identical source produced 200 distinct evaluation IDs.
   Each exported a 256 KiB initialized Uint8Array. Dropped strong result
   references, used five separate event-loop/forced-GC rounds, then observed
   all 200 module namespace WeakRefs still live. ArrayBuffers grew by
   52,436,992 bytes (~50 MiB), RSS by 50,855,936 bytes (noisy process metric).
   Not a universal memory cost or proof of permanent retention on every V8.
3. Three distinct cooperative worker realms, 50 of the same benign
   evaluations per worker, each emitted readiness and exited with code 0.
   This proves the worker exit in the fixture, not exact reclaimed bytes,
   descendant processes, external effect settlement or hostile isolation.

Minimal reproducer after checking the two exact blobs, in the same directory
as evaluate.ts and contracts.ts:

```js
import { createVerifiedArtifact } from "./evaluate.ts";
import { setImmediate as turn } from "node:timers/promises";
const facts = { contract: "test/payload", revision: 1, loader: "esm-test" };
const binding = { ...facts, authorize: () => true, validate: () => true };
const artifact = createVerifiedArtifact(facts,
  "export const payload=new Uint8Array(262144).fill(7)", new Map());
for (let i = 0; i < 5; i++) { await turn(); global.gc(); }
const baseline = process.memoryUsage().arrayBuffers;
const weak = [];
for (let i = 0; i < 200; i++) {
  const result = await artifact.evaluate(binding);
  weak.push(new WeakRef(result.value));
}
for (let i = 0; i < 5; i++) { await turn(); global.gc(); }
await turn();
console.log(weak.filter(r => r.deref() !== undefined).length,
  process.memoryUsage().arrayBuffers - baseline);
```

[Node ESM URL cache](https://nodejs.org/api/esm.html#urls) documents URL-based
identity. [IntelliJ dynamic plugins](https://plugins.jetbrains.com/docs/intellij/dynamic-plugins.html)
documents eligibility restrictions, explicit restart fallback, and heap
snapshot diagnostics when a plugin classloader stays reachable.
[OSGi R8 wiring](https://docs.osgi.org/specification/osgi.core/8.0.0/framework.wiring.html)
deliberately retains old wirings and batches disruptive refresh. These are
independent maturity signals: correct disposal of owned resources is not
automatically reclamation of evaluated code. EF already says so; do not
mislabel this as a newly discovered regression. The practical delta is
**budgeting cumulative evaluated generations and retained bytes at the actual
realm**, even after LMU has logically forgotten an instance.

Compare options for an indefinitely running Host before claiming that
profile: (A) trusted finite in-process with explicit update/heap budgets
and controlled Host restart; (B) reusable disposable realm for a compatible
module/feature cohort, stable facade across realm replacement and native
termination receipts; (C) external isolated executor for untrusted/native
plugin profiles, with cost, capability and security admission. Reuse worker
or process owner, GM resource primitives and LMU coordination. Do not create
one worker or process for every pure module or every logical agent. Avoid
using cache-busting import as an unlimited hot-reload implementation.
The first supported profile and its existing qualification remain unchanged.

### A6 — Rollout, version selection and runtime custody in mature control planes

Additional exact source snapshots inspected 2026-11-27; no upstream suite
was run. These are mechanisms and explicit counterexamples to simplistic
versions of the proposed architecture, not new competitor rankings.

| Source | Mechanism worth transferring | Boundary / counterexample |
| --- | --- | --- |
| [Temporal version workflow, c2ec24c0](https://github.com/temporalio/temporal/blob/c2ec24c01c519234de9dd01881b968c1b14473f2/service/worker/workerdeployment/version_workflow.go#L501-L594) and [drain refresh](https://github.com/temporalio/temporal/blob/c2ec24c01c519234de9dd01881b968c1b14473f2/service/worker/workerdeployment/version_workflow.go#L1122-L1195) | Current/ramping versus draining/drained; active pollers block ordinary deletion, grace period for visibility, late status refresh rechecked after acquiring the lock. Continue-as-new and explicit workflow.GetVersion gates account for history and deterministic rollback. | A visibility query is not a physical external-effect receipt; skip-drainage is an explicit override, not a correctness default. Workflow/worker version routing does not replace LMU artifact/instance custody, AR provider authority or product data migration. |
| [Envoy snapshot](https://github.com/envoyproxy/go-control-plane/blob/151ca724d3b8ceecb8b519b23bbc1c87fb1606c0/pkg/cache/v3/snapshot.go#L84-L130), [SetSnapshot](https://github.com/envoyproxy/go-control-plane/blob/151ca724d3b8ceecb8b519b23bbc1c87fb1606c0/pkg/cache/v3/simple.go#L287-L317), [xDS protocol](https://www.envoyproxy.io/docs/envoy/latest/api-docs/xds_protocol) | Referentially consistent immutable resource sets, per-resource version reuse for unchanged objects, changed-version watches; protocol nonce distinct from version, ACK/NACK and reconnect state. | The new snapshot is stored before responding to watches; response can fail afterward. The cache lock also encloses watch response work. Protocol ACK does not guarantee successfully applied configuration or external effect. Do not copy one global cache lock or interpret distribution as activation. |
| [HashiCorp go-plugin client, 415e29b9](https://github.com/hashicorp/go-plugin/blob/415e29b9562b51ba63782ecbd719927b022c43eb/client.go#L143-L175), [Kill](https://github.com/hashicorp/go-plugin/blob/415e29b9562b51ba63782ecbd719927b022c43eb/client.go#L495-L572), [reattach restrictions](https://github.com/hashicorp/go-plugin/blob/415e29b9562b51ba63782ecbd719927b022c43eb/client.go#L588-L620) | Versioned RPC plugin sets, separate subprocess runner, explicit reattach, graceful shutdown then forced kill, joining client goroutines. Strong inspiration for optional realm/process adapter. | SecureConfig and Reattach cannot be combined in this path; integrity at launch is not evidence for recovered execution identity. Kill returns void; kill error is logged and socket removal failure ignored. AR/EF needs typed physical custody/cleanup receipt, process incarnation and descendant/remote obligations. Not a drop-in TS security boundary. |
| [DBOS TypeScript claimStartableWorkflows, adde4eb4](https://github.com/dbos-inc/dbos-transact-ts/blob/adde4eb4037d64cd3072d5c6b875cf0bd2927d75/src/system_database.ts#L4720-L4793), [selection and claim](https://github.com/dbos-inc/dbos-transact-ts/blob/adde4eb4037d64cd3072d5c6b875cf0bd2927d75/src/system_database.ts#L4848-L4958), [queue configuration](https://github.com/dbos-inc/dbos-transact-ts/blob/adde4eb4037d64cd3072d5c6b875cf0bd2927d75/src/wfqueue.ts#L81-L88) | Worker-local limits checked without DB; shared limits use budget-scope advisory locking or serializable isolation. Different partition heads otherwise permit write skew. NOWAIT on shared budget, SKIP LOCKED otherwise; atomic UPDATE RETURNING decides actual claims. Queue config can be protected from old deployment overwrites. | Whole-queue lock serializes shared budget claims; measure this bottleneck before choosing shared versus partition grants. Sharded path explicitly cannot span version-row and claim transactions. Do not infer linearizable cross-shard policy from SQL isolation names or exactly-once arbitrary provider effects. |
| [LangGraph runner, 3e3dbd42](https://github.com/langchain-ai/langgraph/blob/3e3dbd42c5329dd404669ccd923c005c814bee3a/libs/langgraph/langgraph/pregel/_runner.py#L139-L175), [loop pending-write comments](https://github.com/langchain-ai/langgraph/blob/3e3dbd42c5329dd404669ccd923c005c814bee3a/libs/langgraph/langgraph/pregel/_loop.py#L225-L275) | Separate task commits and checkpoints; delta-channel write futures are awaited before checkpoint durability, pending writes and sparse replay are accounted for. | A checkpointed graph task is not a physical CLI/browser operation. Copy state, pending writes, stable effect IDs and dedup evidence together. Explicit replay policy at tool/effect boundary is still needed. |
| [Kubernetes controller-runtime, 1e19b8e0](https://github.com/kubernetes-sigs/controller-runtime/blob/1e19b8e06116d06d05dc518c6632817cef14e083/pkg/internal/controller/controller.go#L420-L515) | Configured bounded reconciler workers, separate explicit requeue-after and rate-limited error requeue, success forgets retry state. | Local queue semantics are not globally durable ownership or a fairness proof. Keep owner transactions, resource-version checks and reconciliation; avoid using one poll loop or unbounded retry work for the full fleet. |

The useful distinction for our rollout is: **desired artifact/version, accepted
installation intent, staged plan, active generation for a particular scope,
receiver authority, useful-work observation, old-work/stream retention,
physical realm retirement and cleanup debt** are separate records. Reuse
existing owner-specific contracts to represent them; there must not be a
second master state machine that claims to own all product state. In a mixed
version fleet, gate commands by the capability and contract revision actually
offered at the receiver. Retain old readers while required. A rollback
publishes a new monotonic authority revision referring to compatible content;
it does not restore an old fence. For database evolution use owner-approved
expand/compatible write or read/contract sequences and verify mixed-version
read/write and replay; no automatic general schema migration engine.

### A7 — Compare those mechanisms against actual product implementation

At [Platform main 76fc9734](https://github.com/agent-teams-ai/agent-teams-platform/tree/76fc9734f6128b78c7a8b1bc858859fb1cbe835a)
the managed-project-scope-admission feature already demonstrates a suitable
owner-local pattern. [Dispatch](https://github.com/agent-teams-ai/agent-teams-platform/blob/76fc9734f6128b78c7a8b1bc858859fb1cbe835a/packages/contexts/project-management/src/features/managed-project-scope-admission/application/dispatch-scope-admission.ts#L49-L139)
claims a lease, rechecks current authority, authorizes the claim, checks both
expiry bounds, and distinguishes not-submitted from outcome-unknown.
[Reconciliation](https://github.com/agent-teams-ai/agent-teams-platform/blob/76fc9734f6128b78c7a8b1bc858859fb1cbe835a/packages/contexts/project-management/src/features/managed-project-scope-admission/application/reconcile-scope-admission.ts#L25-L100)
recovers by original process generation and command ID/digest, and only
known-not-accepted can go back to safe retry. [Receipt application](https://github.com/agent-teams-ai/agent-teams-platform/blob/76fc9734f6128b78c7a8b1bc858859fb1cbe835a/packages/contexts/project-management/src/features/managed-project-scope-admission/application/apply-scope-admission-receipt.ts#L22-L60)
separates observed admission from current local authorization; a conflicting
digest blocks for integrity. The [in-memory lease adapter](https://github.com/agent-teams-ai/agent-teams-platform/blob/76fc9734f6128b78c7a8b1bc858859fb1cbe835a/packages/contexts/project-management/src/features/managed-project-scope-admission/adapters/in-memory/in-memory-dispatch-leases.ts#L19-L79)
checks project incarnation/revisions, lifecycle epoch, exact lease and expiry;
expired committed dispatch becomes reconcile-required, not ordinary retry.
These source observations are not a fleet SQL/recovery qualification.
The in-memory expiry sweep scans the map; when a persistent adapter is selected,
index by owner, due time and state, process bounded batches, measure oldest
eligible age and avoid copying the scan shape into production.

At [AR main cae4d350](https://github.com/agent-teams-ai/agent-runtime/tree/cae4d350c947cd9f74bc04130531527c9a36baeb),
[provider-generation fence](https://github.com/agent-teams-ai/agent-runtime/blob/cae4d350c947cd9f74bc04130531527c9a36baeb/packages/apps/embedded-runtime/src/features/interactive-session-runtime/adapters/outbound/provider-generation-fence.ts)
checks generation before dispatching provider commands and acquiring an
observation iterator; close remains callable. [Host owner](https://github.com/agent-teams-ai/agent-runtime/blob/cae4d350c947cd9f74bc04130531527c9a36baeb/packages/apps/embedded-runtime/src/features/interactive-session-runtime/application/use-cases/create-session-host.ts)
retains generation even during late durable acquisition. This is admission
at the adapter, not atomic revocation of a previously returned iterator or
already executing external operation. Do not call that a bug without the
full downstream contract. Qualify delayed next()/ack after generation change,
in-flight external commit and stale owner cancellation/cleanup with actual
provider receipts. Existing [grant settlement regression](https://github.com/agent-teams-ai/agent-runtime/blob/cae4d350c947cd9f74bc04130531527c9a36baeb/packages/contexts/agent-execution/tests/features/contained-agent-turn/contained-turn-grant-settlement-regression.test.ts)
asserts that settlement replay cannot restore start authority;
[Postgres recovery tests](https://github.com/agent-teams-ai/agent-runtime/blob/cae4d350c947cd9f74bc04130531527c9a36baeb/packages/contexts/agent-execution/tests/features/contained-agent-turn/postgres-contained-turn-recovery.test.ts)
already include quarantine, bounded history, identity, concurrent insertion
fencing and conservative cleanup debt. Reuse these laws and fixtures before
designing new primitives. Tests inspected, not executed against PostgreSQL.

For Orchestrator, the previous exact OD-033/OD-005/035 review remains
applicable: no new broker or workflow engine is needed to settle these
semantics. Attach placement to a stable owned execution partition, preserve
one authoritative aggregate writer; Platform assigns and revokes placement,
Orchestrator owns domain acceptance, AR owns execution/physical custody.
Keep pure business logic free of cluster dependencies. A partition map and
bounded cell-local transactions are choices for the affected owners, not a
new universal distributed aggregate framework.

### A8 — Executed bounded adversarial models for fleet moves and shared budgets

A standalone Python 3.13.5 exhaustive enumeration was run locally. It
compares deliberately naive variants against stronger candidate invariants.
It is a counterexample generator, not a proof of the implementation.

| Model | Legal schedules / cases per variant | Naive violations | Candidate violations |
| --- | ---: | ---: | ---: |
| Source freeze, copy, placement CAS, old/new commands and same-ID retries | 21 | 15 | 0 |
| Physical reservation after lease expiry, grant/start/stop and retry | 90 | 10 | 0 |
| Two partitions spend one shared slot from separately read budget | 6 | 4 | 0 |
| Old effect accepted/not accepted, retry same ID with same/different digest | 4 | 2 | 0 |
| Total (different bounded scenarios, not independent probability samples) | 121 | 31 | 0 |

The first model requires freeze < copy < move < new, old < retry_old,
new < retry_new. A naive writer can still commit after the freeze or move,
or after copying receipts; reject new old-owner writes at the receiver
once frozen. The second requires grant_B < start_B < stop_B and
grant_B < retry_B. Expire/grant_B/start_B/stop_A/retry_B/stop_B demonstrates
two live operations for one slot when expiry returns physical capacity.
A conservative reservation keeps the slot until confirmed stop; expiry
may close admission but cannot manufacture physical release. The third
allows all interleavings respecting read-before-commit for each partition;
read_A/read_B/commit_A/commit_B demonstrates write skew. The fourth
copies the state but intentionally omits the dedup record in the naive
variant: a lost response followed by retry can apply X twice or accept a
conflicting digest.

The candidate placement protocol to evaluate is a fenced state machine:
close old admission and stop old owner writes at the actual receiver;
record a barrier/watermark and durable state plus unexpired dedup/tombstones,
outbox and unresolved obligations; verify destination staging; CAS current
placement revision and activate new receiver authority; route with the new
epoch; preserve recoverable old receipt queries and reject delayed old
mutations. A publication response or local cache refresh is not the
linearization point. For a cross-store transfer, design recovery for every
step and do not assume atomic commit across stores. If a partition is
unreachable, fence/lease proof or fail closed; never restore an older
authority epoch from backup. Remote providers that cannot verify fences
need reconciliation or isolation/termination before unsafe reassignment.

Capacity alternatives: (A) one atomic budget per owner scope, simple but
serializing; (B) bounded cell-local escrow grants with conservation,
release evidence and grant epoch; (C) fixed per-cell quotas, safe but
potentially stranded capacity. A shared budget authority is required only
for a genuine shared hard cap. A soft limit may explicitly overshoot.
Separate admission grants, physical reservations and financial
settlement; unresolved external work stays charged/reserved according
to the owner policy. This is consistent with AR's existing capacity plan.

**Model limits:** freeze and receipt copy are assumed atomic abstract
actions; no network, SQL, clocks, actual providers, crash recovery, liveness,
multi-cell replication or cryptographic enforcement was executed. The
safe variants reject some work that a live protocol must later recover or
retry. The schedule counts are not failure-rate measurements. Before
adoption, execute real two-receiver tests using the chosen database,
transport and provider; inject pause/crash before and after each durable
boundary, stale restore, lost ACK, duplicate/digest conflict and partition.
An independently reviewed oracle must be separate from implementation.

Compact executable reproduction of the enumeration (Python standard library,
the same legal-schedule and failure conditions):
```python
from itertools import permutations

def placement(safe):
    n = bad = 0
    for t in permutations(('old','freeze','copy','move','new','retry_old','retry_new')):
        if not t.index('freeze') < t.index('copy') < t.index('move') < t.index('new'):
            continue
        if t.index('retry_old') < t.index('old') or t.index('retry_new') < t.index('new'):
            continue
        n += 1
        frozen = moved = violation = False
        old, new = set(), set()
        for e in t:
            if e == 'freeze': frozen = True
            elif e == 'copy': new = set(old)
            elif e == 'move': moved = True
            elif e in ('old','retry_old'):
                if safe and frozen: continue
                if 'X' not in old:
                    old.add('X')
                    violation |= frozen or moved
            elif e in ('new','retry_new') and moved: new.add('Y')
        bad += int(violation or not old <= new)
    return n, bad

def escrow(safe):
    n = bad = 0
    for t in permutations(('expire','grant_B','start_B','stop_A','retry_B','stop_B')):
        if not t.index('grant_B') < t.index('start_B') < t.index('stop_B'):
            continue
        if t.index('retry_B') < t.index('grant_B'): continue
        n += 1
        a = reserved_a = True
        b = reserved_b = violation = False
        for e in t:
            if e == 'expire' and not safe: reserved_a = False
            if e == 'stop_A': a = reserved_a = False
            if e in ('grant_B','retry_B') and not reserved_a and not reserved_b:
                reserved_b = True
            if e == 'start_B' and reserved_b: b = True
            if e == 'stop_B': b = reserved_b = False
            violation |= a and b
        bad += int(violation)
    return n, bad

def shared(safe):
    n = bad = 0
    for t in permutations(('read_A','commit_A','read_B','commit_B')):
        if any(t.index('read_'+p) > t.index('commit_'+p) for p in ('A','B')):
            continue
        n += 1
        used, reads = 0, {}
        for e in t:
            op, p = e.split('_')
            if op == 'read': reads[p] = used < 1
            elif reads[p] and (not safe or used < 1): used += 1
        bad += int(used > 1)
    return n, bad

def receipts(safe):
    bad = 0
    for accepted in (False, True):
        for digest in ('d1','d2'):
            old = {'X':'d1'} if accepted else {}
            new = dict(old) if safe else {}
            effects = int(accepted)
            if 'X' in new: status = 'duplicate' if new['X'] == digest else 'conflict'
            else: effects += 1; new['X'] = digest; status = 'accepted'
            bad += int(accepted and (effects != 1 or (digest == 'd2' and status != 'conflict')))
    return 4, bad

for f, expected in ((placement,(21,15)),(escrow,(90,10)),(shared,(6,4)),(receipts,(4,2))):
    assert f(False) == expected
    assert f(True) == (expected[0],0)
```

This is a follow-through of the earlier architecture priorities, not a demand
to implement fleet migration in the first local host milestone. Specify the
authority/receipt boundary before affected schema/transport choices. Build
the simplest owner-scoped implementation first and promote the hosted
profile only on real qualification evidence.
