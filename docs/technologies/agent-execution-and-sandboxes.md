---
id: research.technologies.execution
type: technology
status: active
owner: research/maintainers
summary: Agent SDK and sandbox candidates, with supported interfaces, custody, authority and local deployment limits.
---

# Agent Execution and Sandboxes

Initial entries reviewed **2026-11-06**; the Substrate entry was added after its separate **2026-11-22** review. These technologies can supply bounded execution capabilities; they do not acquire product scheduling, commercial authority or permission to perform an effect. Fit/confidence scores are scenario-specific engineering judgments, not reliability measurements or adoption decisions. Current upstream capabilities are distinct from the pinned AutoGPT integrations described below.

## Claude Agent SDK

**Implementation and clients.** Python and TS SDKs run the Claude Code binary with its agent loop, tools, sessions, hooks and permissions. This differs from an ordinary model API client, where the application supplies its own loop. The binary's internal implementation was not audited here. AutoGPT pins Python SDK **0.2.161** and imports private transport symbols in its adapter. [Official SDK overview][claude-sdk] [Pinned private import][ag-private] [Dependency lock][ag-lock]

**Scenario: one bounded external-agent provider; fit 8/10, confidence 9/10.** Good fit is embedding an already capable coding agent through supported interfaces. Poor fit is letting its session/loop become another product orchestrator, or assuming a local process means offline model inference. Current official documentation also distinguishes supported API authentication from unapproved use of consumer login/rate limits in third-party products. [SDK deployment/authentication context][claude-sdk]

**Concrete risks.** SDK/binary compatibility, private API coupling, retained session state and late output need lifecycle ownership. Hooks and SDK permissions must map to existing grants and path/network boundaries. A session identifier is correlation, not product identity. File checkpoints cannot establish compensation for an external action.

**Bounded next research:** pin a public SDK/binary pair and exercise one resumed session, denied tool, canceled command and process loss. Verify how results map to completion, failure or uncertainty, and that stale sessions cannot regain authority. Estimate only the chosen adapter once these semantics are fixed.

## E2B

**Implementation and clients.** Sandbox runtime/service with TS/Python clients for commands, files, code interpretation and desktop control. The upstream runtime workspace includes Go API, orchestrator and `envd` modules; the Python SDK is not the execution engine. AutoGPT has a sandbox adapter and locks **E2B 2.49.1** and **code interpreter 2.10.0**. [SDK capabilities][e2b-docs] [Runtime workspace][e2b-go] [Pinned adapter][ag-e2b] [AutoGPT lock][ag-lock]

**Scenario: an optional remote or controlled-Linux execution provider; fit 7/10, confidence 8/10.** Good fit is a workload needing an isolated disposable execution environment. Poor fit is assuming this alone implements the required native-local baseline and its selected OS matrix.

**Deployment evidence.** Current official **Embed** documentation provides a self-operated complete stack on a Linux node through Docker Compose, Kubernetes or cloud deployment paths. E2B is therefore not hosted-only. Self-operated Embed, managed BYOC and hosted E2B are different operational choices; none establishes Docker-free native Windows/macOS parity. [Embed deployment][e2b-embed]

**Concrete risks.** Template trust, sandbox network access, credential injection, pause/resume retention and confirmed termination require explicit integration semantics. A successful sandbox creation does not authorize every command inside it. A timeout does not prove that work or an external effect stopped.

**Bounded next research:** choose one deployment profile and test create → run → cancel/reconnect → destroy, including lost responses, retained files and late output. Verify cleanup evidence and secret lifetime before measuring overhead. Do not extrapolate capacity from a vendor startup-time claim or introduce a second global grant ledger.

## Stagehand

**Implementation and clients.** Browser automation runtime/extension with TS, Python and currently documented Go SDKs. Current **v4** runs the runtime alongside the page, uses CDP and combines deterministic browser methods with model-assisted `act`, `observe` and `extract`; its extension build is TypeScript. AutoGPT locks Python **3.23.0**, so current v4 documentation is not proof of that adapter's behavior. [v4 introduction][stage-intro] [Extension manifest][stage-extension] [Pinned AutoGPT integration][ag-stage] [Lock][ag-lock]

**Scenario: a bounded browser capability; fit 7/10, confidence 8/10.** Good fit combines deterministic navigation with limited inference for changing interfaces or extraction. Poor fit uses inference for a stable API or treats self-healing actions as transaction recovery.

**Deployment evidence.** Local Chrome and Browserbase sessions are supported. Cloud caching/Model Gateway and local operation differ. The v3-to-v4 migration changes APIs and caching; current browser documentation separates closing the Stagehand connection from terminating the browser. [Browser environments/lifecycle][stage-browser] [Migration][stage-migration]

**Concrete risks.** Authenticated profiles, downloads, model-selected actions, ambiguous form submission and leftover browsers need custody. Observing a possible action is not approval to execute it. Local Chrome does not remove model/network requirements or prove equivalent behavior on every platform.

**Bounded next research:** use one disposable fixture site to compare deterministic and model-assisted actions, extraction, authenticated state and a side-effecting form under cancellation/timeouts. Pin the intended major version and verify both connection and browser cleanup before estimating integration work.

## Substrate

**Reviewed 2026-11-22; conditional resource-efficiency and scaling idea.**
The [dated Substrate study](../studies/substrate-resource-efficiency-and-scaling-2026-11-22.md)
owns the detailed source evidence, exact four repository revisions, upstream CI
observations, issue status, scenario ratings and review triggers. The inspected
Substrate source is `f5428049ac0b81458eb12e81fa5a6b65cd39a2ad`; the observed
latest release `v1.0.1` is a different source identity. This record does not adopt
a backend or qualify a deployment.

**Implementation and operating model.** Go control plane and Linux execution
infrastructure on Kubernetes, with gVisor or Cloud Hypervisor microVM workers,
Postgres and object storage. OCI workloads do not require a proprietary agent
SDK. The separate alpha `agent-substrate/env` bridge supplies process/file RPCs;
its timeout exists, but its API and lifecycle semantics do not automatically
satisfy the complete Runtime operation/custody contract.

**Scenario: optional cloud sandbox backend for many safely idle environments;
fit 7/10, confidence 8/10.** The opportunity is lower idle resource consumption
and denser placement while retaining environments. Good fit requires measured
safe idle time, explicit lifecycle ownership and sufficient operating capacity
for the infrastructure. Poor fit includes native macOS/Windows execution,
nearly continuous workloads without meaningful idle savings, and an assumed
transparent pause of an active LLM stream. This is an infrastructure candidate
under Agent Runtime; it does not replace Orchestrator or durable workflows.

**Concrete risks and counterevidence.** Resume fidelity is best effort and can
fall back to a fresh process; asynchronous suspension is not itself durable
upload; suspension interrupts network streams; snapshots do not undo external
effects. Public lifecycle preconditions and Docker-in-actor support still have
open upstream work at the review date. Conversely, real sandbox implementations,
internal concurrency protections and the successful eight-variant upstream E2E
matrix are meaningful positive evidence. No cluster or our agent workflow was
run during this review; cost savings remain unmeasured.

**Bounded next research:** return when safely idle cloud sandbox cost becomes a
measured bottleneck or upstream closes the relevant contract gaps. Compare one
pinned backend/workload against the existing baseline, retaining operation
authority outside snapshots, and exercise lost launch replies, cancel/restore,
node loss before upload, incompatible workers and a real coding workflow. The
dated study specifies the proposed cases; they are not newly adopted gates or
a promised implementation schedule.

## Common decision boundary

Reuse the existing runtime/provider and effect-admission boundary. Preserve bounded concurrency, deadlines, cancellation, operation identity, uncertainty and cleanup. These are candidate implementations of a capability, not newly selected owners. A small TS client can still depend on a substantial runtime, browser, filesystem and service stack; its LOC must not be presented as the complete execution-platform cost.

[claude-sdk]: https://code.claude.com/docs/en/agent-sdk/overview
[ag-private]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/sdk/cli_prelaunch.py
[ag-lock]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/poetry.lock
[e2b-docs]: https://docs.e2b.dev/
[ag-e2b]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/tools/e2b_sandbox.py
[e2b-go]: https://github.com/e2b-dev/runtime/blob/main/go.work
[e2b-embed]: https://github.com/e2b-dev/runtime/blob/main/embed/README.md
[stage-intro]: https://docs.stagehand.dev/v4/first-steps/introduction
[stage-extension]: https://github.com/browserbase/stagehand/blob/main/packages/extension/package.json
[ag-stage]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/stagehand/blocks.py
[stage-browser]: https://docs.stagehand.dev/v4/configuration/browser
[stage-migration]: https://docs.stagehand.dev/v4/migrations/v3

## Fleet infrastructure candidate screen — 2026-11-27

This capability-oriented screen accompanies the [fleet-scale source study](../studies/composition-and-scale-evidence.md#fleet-scale-foundation-first-follow-up--2026-11-27).
It is a discovery/selection aid, not a dependency list, implementation
assignment, or evidence of installed compatibility. Current choices retain
their owning ADRs. The source study pins inspected competitor code; the
official library documentation links below are rolling unless versioned.
Licensing, security posture, exact releases, support matrix and representative
integration tests must be checked before adoption. Prefer existing accepted
infrastructure and narrow product-owned ports over new universal libraries.

| Mechanism and candidate | Where it may fit | What it does not supply / first discriminator |
| --- | --- | --- |
| [NATS JetStream](https://docs.nats.io/learn/jetstream/pull-consumers) — existing selected broker family | Orchestrator integration delivery, bounded pull consumers and replay. Tune maximum in-flight messages, bytes and wait. | Not a canonical business scheduler, tenant fairness, semantic effect deduplication or unbounded history. Qualify total retained bytes, lost ACK, duplicate, slow consumer and partitioned topology. |
| [KEDA NATS JetStream scaler](https://keda.sh/docs/2.21/scalers/nats-jetstream/) — 2.21 documented integration | Kubernetes role/worker autoscaling from consumer lag; optional operations adapter, not domain code. | Queue lag alone ignores resource fit, age, provider throttles, drain and cleanup. Compare HPA/custom metrics; never scale required lease/control/recovery roles to zero merely because ordinary backlog is empty. |
| [Kubernetes Kueue](https://github.com/kubernetes-sigs/kueue), [fair-sharing design](https://github.com/kubernetes-sigs/kueue/blob/main/keps/4136-admission-fair-sharing/README.md) | Candidate if managed AR actually schedules Kubernetes workload resources. Quota cohorts and usage-based ordering are worth a small comparative experiment. | Does not own business budget, external provider account limits, session custody, cancellation of an external process, or non-Kubernetes local pools. Compare with existing C0–C3 before adding a scheduler. |
| [Temporal](https://docs.temporal.io/best-practices/worker), [worker versioning](https://temporal.io/changelog/worker-versioning-continue-as-new-worker-controller) | Existing workflow evaluation path in OD-005/035; durable timers, wait, replay, compatible worker versions and bounded history. | Not AR custody or exactly-once external effects. Verify accepted workflow boundary, effect identity and idempotency, non-deterministic changes, replay, old version drain, and local footprint. Keep alternate Restate/Cadence evaluation in existing durability study. |
| [Restate invoker source](https://github.com/restatedev/restate/blob/5fb156a12983b0e7e02308ff6d59e5c5c5c1e866/crates/invoker-impl/src/invocation_state_machine.rs) | Concrete generation-fence, bounded invocation memory and journal-ack-before-retry reference. Evaluate only as an alternative durable-execution adapter if the existing owner decision leaves room. | The inspected server source declares Business Source License; verify exact terms and hosting rights, not an assumed Apache-2.0 release. Journal replay is not exactly-once arbitrary effects. No second workflow authority alongside Temporal. |
| [PgBouncer](https://www.pgbouncer.org/features) | Candidate PostgreSQL connection budget for hosted roles, with distinct pool and migration owner. | Transaction pooling does not preserve LISTEN, session locks, temp state or arbitrary session settings; prepared statements require correct client/server configuration. Qualify actual PostgreSQL adapter and transaction semantics instead of adopting transparent pooling. Not a sharding solution. |
| [Centrifugo](https://centrifugal.dev/docs/) | Already researched real-time transport; bounded client subscriptions and recoverable projections, not durable owner authority. | Qualify exact chosen recovery and history profile and slow/reconnect burst; no global broadcast or tenant cross-read. Keep existing Orchestrator transport decision. |
| [OpenTelemetry](https://opentelemetry.io/docs/concepts/signals/metrics/) | Existing observability direction; SDK Views/cardinality limits and low-cardinality role metrics. | Exact agent/Run/tenant identities belong in bounded diagnostic traces/logs, not default metric labels. Overflow is observable but can change grouped-query accuracy; qualify actual JS SDK/export pipeline and control availability during failure. |
| [gVisor](https://gvisor.dev/docs/architecture_guide/security/) | Optional Linux container defense-in-depth profile for untrusted workload; compare real harness syscall compatibility, CPU/memory, startup, filesystem, egress and cleanup. | Does not implement provider/session identity, network authorization, resource limits or side-channel immunity. Host isolation and cgroups/egress are separate. No claim that Docker alone or gVisor alone creates a hostile tenant boundary. |
| [Firecracker](https://github.com/firecracker-microvm/firecracker), [Kata Containers](https://github.com/kata-containers/kata-containers), [E2B](https://github.com/e2b-dev/runtime), existing Substrate study | Candidates for stronger or alternative isolated execution profile; compare disposable and persistent workspace/restore, control API and provider custody. | No assumption of equal local/macOS/Windows support, exact session recovery or cost advantage. Firecracker/Kata reviewed here only as discovery candidates; E2B/Substrate retain their existing scoped evidence. |
| [OpenHands software-agent-sdk](https://github.com/OpenHands/software-agent-sdk), [AgentField](https://github.com/Agent-Field/agentfield) | Optional independently deployed agent/harness integration and typed capability discovery if an actual provider contract fits. | Do not add a second session/operation/capacity authority, reimplement our coordination domain in Python/Go, or infer provider portability from a wrapper. Prove launch/stop/uncertain result, stream replay, identity and admission for the exact profile. |
| [Kubernetes client-go workqueue](https://github.com/kubernetes/client-go/tree/master/util/workqueue) | Reference implementation or direct use inside a Go Kubernetes reconciler; local keyed reconciliation, rate limiting and drain. | In-memory queue cannot replace durable Runtime admission, nor do we need a TS port merely because it is good code. Reuse existing queue/owner primitives if semantics fit. |
| [FoundationDB simulation](https://github.com/apple/foundationdb/blob/main/documentation/sphinx/source/testing.rst), [fast-check](https://github.com/dubzzz/fast-check), [Testcontainers](https://github.com/testcontainers/testcontainers-node), [Toxiproxy](https://github.com/Shopify/toxiproxy) | Deterministic property/model tests, actual infrastructure fixture and fault injection; candidate evaluation within existing EF and product fixture contracts. | FoundationDB is a methodology reference, not a replacement database. Discovery-only for the latter three in this increment; verify installed versions, clocks, replay seeds and failure modes. Fault simulation cannot substitute for actual multi-host provider tests. |
| Get Modular, Extension Foundation, LMU, Effect/GM adapter | Prefer qualified in-house composition, extension trust, resource and update mechanisms at the real product seam. Effect may be a scoped adapter for cancellation/resource lifetime/concurrency when its profile is qualified. | Do not add a parallel DI container, public plugin loader, module updater, universal retry library or runtime import of Engineering Foundation. Existing accepted exact pins and owner qualification govern adoption. |

Do not select a tool because another product imported it. Use a small
capability-specific proof with accepted failure semantics and compare against
the simpler existing mechanism. Freeze concrete version/license and support
envelope only in the adopting owner; this catalog does not lock dependencies.

## Pass 8: additional fleet and recovery candidate discrimination — 2026-11-27

Extend the earlier capability screen, not the dependency graph. See
[the pinned source comparison](../studies/composition-and-scale-evidence.md#pass-5-additional-competitor-source-audit--coordination-and-operational-recovery)
and [controller evidence](../studies/composition-and-scale-evidence.md#pass-6-fleet-controller-behavior-admission-and-backpressure).
Scores are proposed fit/confidence for named scopes (1–10), not a global
ranking or installed qualification.

| Candidate | Fit / confidence | Use / limitation | First acceptance discriminator |
| --- | --- | --- | --- |
| [Kubernetes Agent Sandbox](https://github.com/kubernetes-sigs/agent-sandbox) | 9 / 8 for a Kubernetes AR provider | Warm pools, claims, sandbox lifecycle and controller reconciliation may avoid writing a new Kubernetes operator. Does not replace AR session/custody, commercial policy, local providers or hostile-code network security. | Real current harness, cold/warm creation, sustained refill, stop/reattach, UID fence, egress, hard resource enforcement; compare direct Pod/Job adapter plus Kueue. Check version and license. |
| [Hatchet](https://github.com/hatchet-dev/hatchet) | 8 / 7 for queue/worker scheduling evidence; 5 / 6 as a full engine alternative | Tenant-scoped lease and atomic batch assignment are useful examples. Task scheduler does not own session or arbitrary external effect. | Compare existing PG/NATS path, Temporal, local worker queue; queue admission and crash before/after external dispatch; verify hosting/license/edition, operational footprint and exact TS SDK before selecting. |
| [Mastra](https://github.com/mastra-ai/mastra) | 8 / 8 as a durability/profile reference, 4 / 7 as AR core dependency | Typed agent/harness and workflow recovery; current source explicitly differentiates storage fencing from lease-only/no-op guarantees. Adds overlapping loop, memory, state and workflow authority. | Optional harness/provider only where an actual integration has fit; prove cold resume, versioned approval, detached observer and stale writer; do not substitute all provider APIs. |
| [Vercel Open Agents](https://github.com/vercel-labs/open-agents) | 8 / 8 as reference app, 4 / 7 as reusable runtime | Separates workflow and sandbox and shows independent hibernation/reconnect. Vercel-specific managed services and inspected read-then-update lifecycle path require scrutiny. | Workspace lifecycle/receipt conformance; compare alternative sandbox provider with no managed dependency. |
| [Graphile Worker](https://github.com/graphile/worker), [pg-boss](https://github.com/timgit/pg-boss) | 7 / 5 as local PG background-job candidates | Discovery-only, not source/benchmark-qualified in this pass. Consider if a simple durable local queue fits OD-035; ordinary job execution is not arbitrary durable agent continuation, fairness or external-effect exactly-once. | Pin licenses/versions; transaction enqueue, crash and retry, queue bounds, concurrency key, timer and cancellation; compare existing chosen local path before introducing another queue. |
| [Dapr Actors](https://docs.dapr.io/developing-applications/building-blocks/actors/actors-features-concepts/), [Orleans request scheduling](https://learn.microsoft.com/dotnet/orleans/grains/request-scheduling) | 8 / 7 as design references, 3 / 6 as new default infrastructure | Lazy logical identities, activation and per-identity serialized turns. Circular calls and one hot identity can block progress; no automatic safe external effects. Orleans source retrieval failed, documentation only. | Use keyed local admission with durable waits; prove recursive/self-call, two-agent cycle, parent waiting for child and activation after failure. Do not equate virtual actor with one OS agent process or mandate a sidecar per agent. |
| [OpenTelemetry](https://opentelemetry.io/docs/concepts/signals/metrics/), existing [Centrifugo](https://centrifugal.dev/docs/) | 9 / 8 for existing observation and client recovery | Distinct observation/stream transport; not authoritative business journal. Reconnect, label cardinality and memory use remain consumer obligations. | Bounded sample/export queue, independent control metrics, resnapshot overlap/lag, authorization epoch change and reconnect burst; reuse existing detailed Centrifugo study. |

Highest-value next candidates: real Agent Sandbox provider experiment if the
hosted owner chooses Kubernetes; one bounded PG/JetStream versus selected
durability engine proof inside existing OD-005/035; native Effect and GM
resource contracts at eligible modules; independent generative/mutation test
fixtures. Reject an additional global agent framework, workflow engine,
actor cluster, DB or broker solely because its interface looks familiar.
The chosen one-agent fully local profile must not require a cloud runtime or
the hosted scheduler. Evaluate incremental maintenance, licensing, failure
semantics, delivery size, portability and performance before adoption.

## Distributed admission and versioning source follow-through — second campaign

See [A6 pinned control-plane implementations](../studies/composition-and-scale-evidence.md#a6--rollout-version-selection-and-runtime-custody-in-mature-control-planes)
and A7/A8 in the same study. These are conditional alternatives for current
OD-005/035 and capacity-admission owners, not a dependency decision.

| Candidate | Priority and fit | Discriminating proof |
| --- | --- | --- |
| Existing Postgres/JetStream and owner-local operations | First baseline for hosted; preserve independent SQLite local authority and selected local queue. | End-to-end acceptance/receipt and durable replay, two distinct partitions competing for a shared hard cap, reservation stays charged after expiry until physical release; quantify contention and recovery. |
| DBOS Transact TS | Strong SQL claim/admission reference; consider in a bounded durability comparison only if the selected engine cannot satisfy the law. | Shared vs partition lock scope, version pin during rolling deploy, fail after claim before effect, stale executor and DB failover. Measure transaction rate and cost; verify installed TS/Node compatibility/license. |
| Temporal | Strong durable workflow and worker versioning reference/candidate for existing OD-005. | Pinned vs supported auto-upgrade, old history queries, late drainage signals, incompatible worker, lost external receipt and graceful/forced retirement; compare existing local profile without mandatory server. |
| LangGraph | Checkpoint/pending-write reference or optional provider/harness where requested. | Resume at declared step boundary and reconstruct pending effects; cannot substitute graph checkpoint for CLI/process custody or external idempotency. |
| Kubernetes controller-runtime/Agent Sandbox | Reference and possible hosted infrastructure adapter; keep local provider independent. | Actual bounded reconciler queue, claim/UID incarnation, warm pool refill, failure and confirmed physical release; separate global policy/authority from local controller. |

No competitor or new workflow engine owns Orchestrator business state.
No additional queue, datastore, or per-agent control service is recommended
solely because a mechanism resembles existing Foundation contracts.
