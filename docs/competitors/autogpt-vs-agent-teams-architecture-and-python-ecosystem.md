---
id: research.competitors.autogpt
type: research
status: active
owner: research/maintainers
summary: Pinned AutoGPT Platform source audit compared with implemented Agent Teams target plans, including Runtime v3 scope, Python, plugins, reusable patterns and counterevidence.
reviewed_at: 2026-11-06
related:
  - research.methodology.evaluation
  - research.methodology.sources
  - research.competitors.agent-teams
---

# AutoGPT vs Agent Teams: architecture and Python ecosystem

## Scope and status

**Finding:** Agent Teams' selected architecture is the stronger fit for an independently extensible, multi-organization orchestration and execution platform, assuming the specified plans are implemented correctly. AutoGPT is stronger in the completeness and convenience of its defined workflow, integration, MCP and skill authoring surface. Python is not the principal reason for either conclusion.

This is research, not an adoption decision, production change, security certification or capacity qualification. The user's explicit comparison basis is implemented target architecture. We therefore do not deduct points merely because Agent Teams is still implementing its plans. We also do not fill unspecified interfaces, unresolved product decisions or separate future programs with imaginary capabilities. AutoGPT is assessed using the architecture actually represented in its pinned source, without adding hypothetical upstream fixes or an unseen commercial edition.

Observation date: **2026-11-06**. Repository sources were inspected locally at the following immutable identities. The separate [source manifest](../../data/autogpt-2026-11-06-sources.json) records file hashes, source classes and scope. The previous Paperclip assessment and its historical Agent Teams baseline are unchanged.

| Subject | Revision | Assessment scope |
| --- | --- | --- |
| Significant-Gravitas/AutoGPT | `9cb76f9026d388c9bf2e098af2beae1cc864f055` | Current `autogpt_platform`: graph workflows and Otto/Copilot/Experts; backend, selected frontend/testing guidance, deployment and dependencies. Classic is excluded. |
| agent-teams-ai/agent-runtime | `ab0387c02fe75ed0c9bb456caaad9a6d2723795b` | Explicit architecture program **v3 S1–S5**, its owner contracts and separately identified C0–C3 capacity follow-up. |
| agent-teams-ai/agent-teams-orchestrator | `5a8496ce711909e381c5bc817fff5500be9a1761` | Coordination, ownership, module composition, accepted backend roles, extensions and Fully Local V1. |
| agent-teams-ai/agent-teams-platform | `7f6eb3746c07dc01751c29a8dbc62e50b5f7ad6d` | Tenancy, identity, authority, commercial access, projects and deployment boundaries. |
| engineering-research baseline | `86bbdd819a3ecc85730f3cf2f45a5842b86294f1` | Existing method and lesson identities; this dossier is an additive assessment. |

Evidence labels used below:

- **Source-inspected:** directly read implementation or a specified plan at the revision above.
- **Test-inspected:** read upstream test assertions or harness configuration; this does not mean we executed its suite.
- **Maintainer-reported:** measurements or operational observations written by upstream maintainers.
- **Executed isolated probe:** the retained deterministic lock-renewal experiment; not a deployed product test.
- **Inference:** a consequence or risk derived from those facts, with its boundary stated.
- **Unknown:** no sufficient comparable observation. Unknown is not zero.

Three parallel source audits covered AutoGPT execution/reliability, Agent Teams plans, and Python/dependencies/extensions. Their synthesis received independent criticism; the [review record](../../evidence/reviews/2026-11-06/autogpt-review.md) records the actual rounds and corrections. No application fleet, paid LLM request, production tenant, cloud sandbox or upstream CI rerun was started for this assessment.

## What is being compared

### AutoGPT is a current platform, not the historical autonomous loop

The current README presents Otto and specialist Experts, with skills and repeatable workflows. The backend has distinct API, database/RPC, scheduler, graph execution, Copilot execution, websocket and other service roles. Graph workers use bounded pools, RabbitMQ prefetch/manual acknowledgement and persisted execution state. Copilot has durable queued turns, per-user active-turn admission and cancellation fanout. PostgreSQL stores organizations, teams, membership, credits and subscriptions. These are substantive mechanisms, not a single Python loop or a single-user prototype. [A-APP] [A-MANAGER] [A-ACTIVE] [A-SCHEMA]

There are at least four relevant extension surfaces: in-tree typed Python Blocks; remote MCP tools; skill packages; and workflow marketplace artifacts. Treating all of these as the old Classic plugin mechanism would materially distort the comparison. [A-BLOCKS] [A-MCP] [A-SKILLS]

### Agent Teams has three separate product owners

| Owner | Selected responsibility | Boundary that matters |
| --- | --- | --- |
| Platform | Customer ownership, tenancy, principals, access authority, commercial entitlements, project and deployment intent | Does not own a second Task/Run engine or Runtime process journal. |
| Orchestrator | Teams, work, Runs, product coordination, approvals, usage/consumption and provider-neutral runtime interaction | Uses consumer-owned ports/ACLs; does not mirror Runtime aggregates or decide physical custody. |
| Runtime v3 | Technical operations, durable claims, execution bindings, security/access owners, PostgreSQL storage and Host composition | Distinguishes acceptance, dispatch, provider outcome, cancellation, drain, cleanup and unresolved debt. |

These are selected ownership boundaries, not a claim that three repositories imply good architecture. Their value is one owner for each invariant, transaction and lifecycle, with narrow contracts between owners. [P-CONTEXT] [O-DEPENDENCIES] [R-PLAN] [R-S2]

**The v3 boundary is important.** S1–S5 includes reusable JSONL/protocol/native-client mechanisms; ordinary operations and stores; security and provider-access features; execution bindings; and the public Host/operations API. It preserves the frozen contained path and shared materialization ownership. It explicitly does not add a universal plugin loader, scheduler, extra persistence backend or arbitrary new providers. An additive interactive session path has its own owner and qualification. [R-PLAN]

**C0–C3 is a separate capacity program.** It specifies bounded dispatch/admission, resource budgets, reservations, fairness, protected control progress and fenced reclaim. The expanded target can be compared conditionally, but completing ordinary v3 cannot silently be described as completing C0–C3 or proving thousands of active agents. [R-CAPACITY]

Current canonical Orchestrator ADR-0114/0115 select PostgreSQL, backend role isolation and native Fully Local V1. Older SQLite/future-local passages are historical where superseded. Local workflow OD-035, provisional IAM choices and unresolved cross-product/plugin contracts remain open; this research does not choose them. OD-043 leaves concrete catalog, isolation tiers, lifecycle, hot update and public SPI conformance unresolved. [O-BACKEND] [O-LOCAL] [O-WORKFLOW-OPEN] [O-EXT-OPEN] [P-BOUNDARY]

## Comparative scores out of ten

These are **ordinal engineering judgments about the represented architecture**, not measurements, uptime estimates or feature counts. Higher is better, including the simplicity row. Integers follow the existing [rubric](../methodology/evaluation-methodology.md); intermediate values have a reason in the final column. Rough uncertainty is about one point for most judgments. Confidence is generally 8/10 for inspected mechanisms and 7/10 for target-fit forecasts; unresolved contracts are identified explicitly.

The following user-facing criteria overlap, so they are **not summed**. The same conditional basis is used on both sides: evaluate the defined mechanisms if implemented as specified, retaining source-observed limitations and unselected scope. The separate non-overlapping M1–M5 summary below has its own fixed denominator.

| Criterion | AutoGPT | Agent Teams target | Reason and limit |
| --- | ---: | ---: | --- |
| Clean Architecture | 6 | **9** | AutoGPT has functional/service separation but concrete ORM, API-feature, billing and execution dependencies cross its backend core. Our plan keeps domain/application, ports, adapters and composition separate. [A-DB] [O-DEPENDENCIES] [R-S2] |
| SOLID | 6 | **8** | Block/provider abstractions are useful OCP evidence. Broad managers, registry mutation and service access weaken SRP/DIP/ISP. Our narrow contracts are stronger; unresolved cross-product/public extension interfaces prevent a blanket top score. No universal LSP failure is alleged. [A-REGISTRY] [A-MANAGER] [P-BOUNDARY] |
| DDD and semantic ownership | 6 | **8** | AutoGPT has real business concepts and constraints, but much behavior is organized around data/services. Our contexts and state/transaction owners are explicit; not every tactical model is settled. [A-SCHEMA] [P-CONTEXT] [O-DEPENDENCIES] |
| DRY: one source for the same rule | 7 | **8** | AutoGPT centralizes schemas, model catalog and visibility predicates; duplicated executor ACK semantics have diverged. Our shared local/server behavior and owner-local contracts reduce semantic duplication, while protocol/ACL mappings still cost code. [A-TENANCY] [A-MANAGER] [A-COPILOT-MANAGER] [O-LOCAL] |
| Modularity and reusable library boundaries | 7 | **9** | AutoGPT supports real blocks and independent service roles but remains a tightly connected backend package. Runtime v3 specifies separately usable libraries, public implementer surfaces, packed-consumer checks and explicit composition. [A-APP] [A-BLOCKS] [R-PLAN] |
| Testability and verification design | 8 | **9** | AutoGPT has real-infrastructure, cancellation, billing and user-journey harnesses. Our selected plan adds independent behavioral oracles, conformance, uncertainty, state-machine and native-boundary cases. Neither number asserts that this review ran those suites. [A-TESTS] [A-LOAD] [O-TESTING] [R-S2] |
| TDD as actual red → green → refactor history | Unknown | Unknown | AutoGPT explicitly mandates test-first work. Runtime v3 preserves existing behavioral oracles and specifies risk-based regressions. A source snapshot does not prove development chronology or continuous compliance. [A-TESTS] [R-PLAN] |
| Recovery and ambiguous external effects | 7 | **9** | AutoGPT has durable graph/turn recovery and explicit unconfirmed turn publication. Its examined graph publication/ownership seams retain risks. Our v3 distinguishes unknown claim/commit/effect outcomes and forbids launch or blind replay without authority. [A-PUBLISH] [A-GRAPH-PUBLISH] [R-S2] |
| Execution ownership and stale-owner containment | 5 | **9** | The inspected graph/Copilot loops ignore failed lock renewal, and renewal has a reproduced isolated race. Runtime v3 requires durable claim, owner-loss reconciliation and native custody rather than interpreting a lease as complete fencing. This is a scoped design comparison, not an incident count. [A-LOCK] [A-MANAGER] [A-PROCESSOR] [R-PLAN] |
| Scaling architecture with ordinary v3 only | 7 | 7 | AutoGPT already separates worker roles and bounds pools/admission. v3 improves ownership/IO boundaries but is not the separate fleet program. Neither side earns measured-capacity points here. [A-MANAGER] [A-ACTIVE] [R-PLAN] |
| Expanded scaling design, explicitly including C0–C3 | 7 | **8** | Our capacity follow-up addresses multi-scope budgets, bounded backlog and fairness more systematically. This is a second named scenario, not extra credit silently added to S1–S5. [R-CAPACITY] [O-PROFILES] |
| Organization/tenant boundary design | 8 | 8 | AutoGPT has real organizations, teams, membership-verified context and shared visibility predicates. Our separate tenancy/access/execution owners are strong; exact cross-product authority mappings remain partly proposed. No universal isolation proof was executed. [A-SCHEMA] [A-TENANCY] [P-CONTEXT] [P-BOUNDARY] |
| Safety of extension contracts and authority boundaries | 6 | **8** | AutoGPT's metadata, MCP gating and package bounds are useful, but in-tree blocks are trusted in-process code. Our accepted invariants separate manifest requests, grants, active digest/generation and post-commit effects; exact isolation/lifecycle choices remain open. [A-BLOCKS] [A-EFFECTS] [O-EXT-SAFETY] |
| Completeness of defined public extension/skill surface | **8** | 6 | AutoGPT specifies and implements Blocks, ProviderBuilder, MCP, skill versions/updates and workflows. Our public SPI and loader/hot-update details are deferred or outside v3; a good future contract boundary is not a completed ecosystem. [A-SDK] [A-MCP] [A-SKILLS] [O-EXT-DISTRIBUTION] [R-PLAN] |
| Self-hosted/local autonomy design | 8 | 8 | AutoGPT has a persistent self-hosted appliance and local model path. Our target includes independent standalone and native Fully Local operation. Native packaging differs from Docker deployment; neither implies every provider works offline. [A-APPLIANCE] [A-LOCAL] [O-LOCAL] |
| Operational simplicity; higher means simpler | **6** | 5 | AutoGPT's appliance lowers entry effort but includes many services. Our role topology, distributed protocols, native custody and local packaging create substantial operation/upgrade responsibilities even when implemented correctly. [A-APPLIANCE] [O-BACKEND] [O-LOCAL] |
| Adding an ordinary external-service integration | **8** | 6 | AutoGPT's schema/provider/test path is convenient. Our boundary discipline has more contract and conformance work; actual LOC for equivalent changes was not measured. [A-SDK] [A-BLOCKS] [R-PLAN] |
| Proven sustained active-agent capacity and RAM efficiency | Unknown | Unknown | No common retained workload/hardware/SLO campaign was run. Neither plans, default worker counts, HTTP RPS nor idle sessions establish this result. [A-LOAD] [R-CAPACITY] [O-PROFILES] |

### Narrow architecture summary: M1–M5 only

This advisory view uses the existing method's five non-overlapping architecture criteria, one fixed equal-weight mask and the same implemented-as-specified basis. It excludes measured capacity, testing chronology, operational qualification and integration-catalog size. Scores were assigned against these criteria, not a weighting chosen to maximize our lead. It is **not a whole-product leaderboard**.

| Existing method criterion | AutoGPT | Agent Teams target |
| --- | ---: | ---: |
| M1: enforced responsibility/dependency boundaries | 6 | 9 |
| M2: reusable modules and substitutability | 7 | 9 |
| M3: proportional domain ownership | 6 | 8 |
| M4: change cost and boilerplate | 7 | 6 |
| M5: public contract and extension evolution | 7 | 8 |
| Equal-weight mean, 5/5 scored, rounded to one decimal | **6.6/10** | **8.0/10** |

For the source-based M4 forecast, the representative change is one external-service capability behind an existing integration port, using an already supported authentication type and without a new domain, permission model or deployment role. M4 credits AutoGPT's lower entry cost for that change without pretending we measured reviewer effort or equivalent-change LOC. Whole-harness, store and schema-changing use cases remain unmeasured. M5 covers caller/implementer/wire/persistence evolution, including Runtime's conformance and explicit format boundaries; it does not award a marketplace that the plans omit. Evidence confidence for this narrow comparison is approximately **7/10**. The conclusion is directional: our design has stronger separation/reuse, with higher ceremony and operational cost. The difference is not a claim of percentage improvement.

## Evidence and counterevidence

### AG-01 — Useful service separation, but broad shared backend coupling

`backend/app.py` starts distinct roles, and graph execution uses a worker pool with `prefetch_count=pool_size` and manual ACK. This is genuine scaling preparation. `DatabaseManager`, however, exposes a large cross-feature RPC surface; executor modules import concrete storage, billing, moderation, credentials and API feature code. `db_accessors.py` chooses direct/RPC behavior using global connection state. This is pragmatic product organization with a wide change surface, not strict dependency inversion. [A-APP] [A-DB] [A-ACCESSORS] [A-MANAGER]

For orientation, the inspected `executor/manager.py` has 2,694 physical lines and `executor/scheduler.py` 5,165. File length is a review signal, not the proof: the mixed responsibilities/import directions are the reason for the finding. Counterevidence matters: RPC boundaries reject raw Prisma objects and use application models; typed Blocks and shared schemas already eliminate meaningful duplication. [A-SERVICE] [A-BLOCK-BASE]

AutoGPT also has a separately packaged `autogpt-libs` distribution and a service-free CI job for it. Its `APIKeySmith` contract uses standard-library/cryptography primitives without backend or Prisma imports; backend authorization consumes that contract. This is concrete utility reuse supporting M2, although it does not establish a separately embeddable workflow engine or make every module in that package backend-independent. [A-LIBS-PACKAGE] [A-KEYSMITH] [A-KEYSMITH-CONSUMER] [A-CI]

**Transfer:** preserve explicit role placement and narrow contracts. Do not import AutoGPT's custom process/RPC/database facade into our already selected Connect/Dapr/Runtime boundaries. This supports existing MR-03/MR-04 and GP-09, not a new universal manager.

### AG-02 — Lease renewal is not an execution fence

`ClusterLock._refresh()` reads the owner, compares it with its own identity and separately calls `EXPIRE`. If the lease expires or is released between those commands, a different owner can acquire the key before the old holder extends its TTL. Both the graph loop and the examined Copilot loop call `refresh()` without acting on a false result. In the inspected output/status sinks, there is no matching execution-owner epoch argument that closes that specific gap. These are scoped source observations, not a claim that AutoGPT has no fences anywhere. [A-LOCK] [A-MANAGER] [A-PROCESSOR] [A-EXECUTION-DATA]

The [retained probe and result](../../evidence/experiments/autogpt-2026-11-06/README.md) compile the unchanged upstream `ClusterLock` class AST and provide a deterministic fake Redis. They execute three cases: stable owner returns true; owner already changed before GET returns false; owner changes after GET but before EXPIRE returns true and extends the successor's TTL. No AutoGPT dependency, real Redis or workload was started. This reproduces the renewal algorithm race only. The downstream overlapping-execution scenario remains an inference requiring a real executor failure experiment.

Counterevidence: acquisition uses `SET NX EX`; release uses an atomic owner-checked Lua script; the processor has bounded cancellation drain. These mechanisms reduce ordinary duplicates and protect release, but do not make the shown renewal atomic or cause the shown loops to stop on authority loss. [A-LOCK] [A-PROCESSOR]

**Transfer:** MR-17 and MR-15 already cover claim/fence-before-effects and cleanup truth. A future owning acceptance case can pause an old worker, expire/reacquire authority, then resume it and verify that it cannot write or perform a new effect. This research creates no new release gate by itself. Runtime v3's durable claims, one-shot dispatch and cleanup-only recovery are the relevant comparison. [R-PLAN] [R-S2]

### AG-03 — Duplicated ACK handling has diverged

The graph manager captures a RabbitMQ delivery tag but obtains the current channel when acknowledging; after reconnect, that channel may differ from the delivery channel. The Copilot manager instead retains the delivery channel and skips ACK when it is closed. RabbitMQ documents tags as channel-scoped and requires acknowledgement on the delivering channel. The graph reconnect path therefore has a concrete source-level protocol risk; we did not reproduce it against a live broker. [A-MANAGER] [A-COPILOT-MANAGER] [W-RABBIT]

**Transfer:** DRY should unify the owner of this narrow transport rule or its conformance contract. It does not require merging graph and conversational execution lifecycles into one generic engine. This is an example for MR-03/MR-04 and existing public-contract discipline.

### AG-04 — Recovery is real; arbitrary external effects are still a separate question

Graph recovery rebuilds persisted running/queued/review node state and retains a billing reconciliation baseline. Copilot explicitly models `TurnPublishUnconfirmed`: a publish exception does not prove that the broker failed to accept the turn. Per-user active turns use PostgreSQL locking/CAS, so saying AutoGPT has no admission, recovery or uncertainty handling would be false. [A-MANAGER] [A-PUBLISH] [A-ACTIVE] [A-COPILOT-DB]

The graph enqueue seam still updates database state and then publishes to the broker as separate steps; its exception path records failure. The inspected seam has no transactional outbox spanning that intention. A crash or ambiguous publication therefore needs reconciliation rather than an assertion of exactly-once behavior. The queued-turn inflight cap is explicitly described as non-locked count-then-insert and can briefly overshoot during bursts. That safeguard is distinct from the locked active-turn slot and from hard fleet resource reservation. [A-GRAPH-PUBLISH] [A-QUEUE]

A positive example is the MCP client: it uses one attempt for `tools/call`, while retrying selected other RPC methods, because a lost response may follow an already completed side effect. This is a reusable correctness pattern independent of language. [A-MCP]

**Transfer:** reuse MR-13/MR-14 and GP-07/GP-08: stable effect identity, explicit uncertainty and safe reconciliation. A billing-idempotency test cannot establish idempotency of arbitrary external tools. Runtime v3 already requires that an unknown claim does not authorize launch and unknown COMMIT does not authorize blind retry. [R-S2]

### AG-05 — Organizations and tenancy are substantive counterevidence

The schema contains Organization, Team, TeamMember, invitations, subscriptions, seat assignments and audit/transfer relationships. `tenancy.py` centralizes visibility rules and requires an already membership-verified context. Its personal/legacy paths and current writable-organization rules are explicit. The inspected billing authorization suite drives the mounted application and tests role-specific scope; separate visibility tests exercise predicates and mocked membership results. A full hostile cross-tenant audit was not performed; neither an attack claim nor perfect isolation follows from these files. [A-SCHEMA] [A-TENANCY] [A-TENANCY-TESTS] [A-CREDITS-AUTHZ]

Our advantage is the granularity of ownership between customer, tenant, commercial authority, orchestration and execution, not the invention of organizations. Platform's proposed ACL/wire/delegation mappings and provisional IAM choice prevent claiming that every exact authority flow is already specified. [P-CONTEXT] [P-BOUNDARY]

### AG-06 — Strong testing practices worth learning from

AutoGPT's backend instructions explicitly require a failing test before a fix, and describe race tests that force the dangerous order with a barrier rather than hoping `gather()` happens to race. Inspected tests cover multi-pod cancellation on RabbitMQ, billing redispatch with mocks, and a separate billing E2E that launches a fresh executor/DatabaseManager process with an external fake model endpoint and a controlled queue seam. Its frontend documents integration tests with Vitest/RTL/MSW and Playwright for critical flows. This is stronger than a mock-only test story; it is not a claim that every cited test uses real infrastructure throughout. [A-TESTS] [A-CANCEL-TEST] [A-BILLING-TEST] [A-BILLING-E2E] [A-FRONTEND-TESTING]

The load harness separates dummy, scripted and real-model turns; warm-up from steady state; time-to-first-token from full-turn time; graph completion from websocket delivery; and covered from skipped/failed journeys. Its documented baseline is approximately 11 HTTP requests/s on a particular preview and three graph starts/minute. Those numbers are configuration/maintainer evidence for that workload, not the platform's ceiling and not thousands of active agents. [A-LOAD]

**Transfer:** preserve comparable workload coverage, seeds, recovery traces and user-visible latency. Do not infer TDD compliance from policy/test counts, or capacity from HTTP RPS. The existing Agent Teams test strategy already selects meaningful risk-based tests and independent expected outcomes; no new test framework is proposed. [O-TESTING]

### AG-07 — Declarative Blocks reduce integration work, with a trust boundary

The Block base combines identity, Pydantic input/output schemas, credentials, examples/mocks, effects and asynchronous execution. ProviderBuilder centralizes authentication and provider metadata. A common test harness enumerates registered blocks and checks their declared examples/effects. This is valuable reuse: the same contract can serve validation, UI descriptions and authoring checks. [A-BLOCK-BASE] [A-SDK] [A-BLOCK-TESTS]

The loader scans and imports backend Python modules into the application process; class/subclass discovery and global registries populate the catalog. `patch_integrations()` replaces credential/webhook methods at runtime and is invoked by application startup/import paths. This is developer extensibility through trusted application code, not a general isolated third-party plugin host. An execution sandbox offered by one tool does not isolate every block. [A-BLOCKS] [A-REGISTRY]

**Transfer:** borrow a narrow declarative descriptor and contract-test pattern, but put registration in explicit composition. Preserve our accepted rule that manifest requests are not grants and external extension code never runs inside an owner transaction. Get Modular composition does not by itself supply a plugin loader, marketplace, authority model or sandbox. [O-EXT-SAFETY] [O-EXT-DISTRIBUTION]

### AG-08 — Skills and capability discovery contain unusually useful product patterns

Skill packages have one hash definition, immutable stored versions and bounded files/bytes/depth. On update, unmodified installed copies can advance directly; edited copies use a three-way merge preserving the user's side of conflicts. Skill bodies are loaded when needed, and index-only access avoids loading all defaults. Content identity is useful provenance, but a hash alone is not publisher authentication or a signature. [A-SKILL-PACKAGE] [A-SKILLS]

Capability discovery combines exact identity/name matches, lexical BM25 ranking, context/permission filtering and bounded fallback results. Matching connected services outrank overly generic tools. Effect metadata distinguishes read/computation from workspace/platform/external writes; unknown effects are treated conservatively in the inspected gate. Declared effects are inputs to policy, not an OS security boundary, and enforcement differs across paths/configurations. [A-CAPABILITIES] [A-EFFECTS]

**Transfer:** evaluate permission-aware capability search, lazy discovery, explicit effect handling and user-preserving updates. Do not assume user-wins merging is always safe: it can retain obsolete instructions, so an owning UX must expose meaningful conflicts. These are research candidates; no automatic skill update or new product mechanism is selected here.

## Python, TypeScript and memory

### Python is not an intrinsic horizontal scaling ceiling

For agents waiting on remote LLMs, tools or databases, asynchronous I/O can multiplex many tasks in Python as well as Node. An active logical operation need not mean a new interpreter. Standard CPython's GIL constrains parallel Python bytecode in threads of one interpreter; it does not serialize separate worker processes, replicas or every native numerical operation. Node also blocks other clients when expensive JavaScript runs on its event loop; CPU work requires partitioning, worker pools or native/service boundaries. [W-ASYNCIO] [W-PYTHON-THREADS] [W-NODE] [W-NODE-LOOP] [W-NUMPY]

Optional free-threaded Python has existed since 3.13, but requires a suitable build and compatible extensions. AutoGPT's inspected manifest permits Python >=3.11,<3.14 and its Dockerfile installs ordinary Python 3.13, not an explicitly selected free-threaded build. Neither "Python can never use multiple cores" nor "GIL no longer matters in this deployment" is justified. [W-FREE-THREADING] [A-PYPROJECT] [A-DOCKER]

TypeScript's static typing helps shared contracts and development; it is not runtime validation by itself. AutoGPT uses Pydantic schemas, whose validation core is Rust. Native-backed processing, memory layout and dependency behavior matter more than the source-language label in isolation. [A-PYPROJECT] [W-PYDANTIC]

### There is a real footprint concern, but no valid Python/TS multiplier

The single-container guide reports approximately **5–6 GiB for the complete AutoGPT appliance**, before additional workload/local-model headroom. That image contains frontend/backend, PostgreSQL, three Valkey instances, RabbitMQ, nginx and FalkorDB. Its backend also includes Node, Chromium and ffmpeg. This is maintainer-reported appliance evidence, not our measurement and not Python RSS. The same guide explicitly states no measured concurrent-run ceiling. [A-APPLIANCE] [A-DOCKER]

There is also a concrete integration-loading cost: a comment on `freeze_startup_heap()` reports roughly two million tracked objects after block registry loading and historical GC pauses; the code already collects/freezes the startup heap. This is evidence of an identified cost **and a mitigation**, not a measurement of remaining pauses at that magnitude. [A-GC]

Our full deployment must count PostgreSQL, NATS, applicable Dapr pairs/workflow/realtime roles, native custody and actual CLI/browser/sandbox workloads too. A small TS controller is not the complete fleet. The selected role map forbids a sidecar/database pool per agent, but it does not make fixed service costs disappear. [O-PROFILES] [O-BACKEND]

An analytical accounting model is:

`total memory = fixed services + worker/import heaps + active operation/context state + agent/browser/sandbox processes + caches/buffers`.

The ratio between the products remains unknown. Neither a bare interpreter comparison nor the whole AutoGPT image versus one Node process would answer the user's question.

### Local execution deserves credit on both sides

AutoGPT can boot without provider credentials and supports a self-hosted chat path through a user-controlled OpenAI-compatible endpoint, including local model servers. Its Claude Agent SDK/extended-thinking path falls back to the baseline path in that configuration; this is not complete feature parity. The graph and conversational paths use different local-model settings. Our target requires a native Fully Local baseline without an Agent Teams cloud account; optional remote inference retains network requirements. Docker self-hosting and native local packaging are different delivery shapes. Neither is proof of a disconnected, feature-complete release. [A-APPLIANCE] [A-LOCAL] [O-LOCAL]

## AI dependencies: what is actually interesting

Versions below come from the pinned backend Poetry lock; "available in TS" refers to an official supported interface, not guaranteed parity with every locked Python API. An SDK for a service and a local algorithm implementation are explicitly distinguished. [A-LOCKFILE]

| Library / pinned version | Observed AutoGPT use | Python-specific value and possible relevance |
| --- | --- | --- |
| Graphiti 0.30.2 + FalkorDB 1.7.1 | Embedded graph construction/retrieval, scoped clients, embedder/reranker and episodic/temporal memory. | Most interesting Python algorithmic dependency in the inspected stack. A TS client or REST/MCP wrapper is not the same as porting its implementation. A separate service behind the existing memory owner is a candidate only. [A-GRAPHITI] [W-GRAPHITI] |
| Mem0 1.0.8 | Blocks instantiate hosted `MemoryClient`; add/search/get/delete and scoped filters. | This path is an API client, not evidence of an embedded OSS engine. Official Mem0 also offers a distinct OSS TS surface; operation parity needs checking. [A-MEM0] [W-MEM0] |
| Claude Agent SDK 0.2.161 | Copilot SDK path with CLI sessions, permissions, hooks and tools. | Official Python and TS SDKs exist. Private transport-internal imports in some adapter code are a maintenance risk, not a Python moat. [A-CLAUDE] [A-CLAUDE-PRIVATE] [W-CLAUDE] |
| E2B 2.49.1 / code interpreter 2.10.0 | Sandbox code, desktop/files and related tools. | JS/TS SDKs control the same kind of sandbox service; this does not establish offline/self-host parity. [A-E2B] [W-E2B] |
| Stagehand 3.23.0 | Browser Observe/Act/Extract-style blocks and Browserbase integration. | A TS interface exists; currently published v4 docs do not prove exact parity with this locked Python v3. [A-STAGEHAND] [W-STAGEHAND] |
| Langfuse 3.14.1 | Managed prompt retrieval; the inspected client explicitly disables tracing. Its source assigns conversation tracing elsewhere. | Python and JS/TS observability SDKs exist as library capabilities, but those capabilities must not be attributed to this AutoGPT prompt client. [A-LANGFUSE] [W-LANGFUSE] |
| Firecrawl 4.42.0, Exa 2.21.0, Tavily 0.8.2 | Web crawl/search/extract blocks instantiate the respective clients. | Official Node/JS/TS APIs exist. Study contract/credential/error handling without adding Python for ordinary HTTP clients. [A-FIRECRAWL] [A-EXA] [A-TAVILY] [W-FIRECRAWL] [W-EXA] [W-TAVILY] |
| rank-bm25 0.2.2 | Capability discovery and hybrid-search reranking. | The useful idea is cheap permission-aware retrieval; BM25 does not require Python or a separate vector service. [A-CAPABILITIES] |
| pandas 2.3.3, pyarrow 23.0.1, document/media libraries | pandas/PyArrow-backed Parquet and spreadsheet parsing, pypdfium2 PDF previews, MoviePy video processing. | Python's specialist ecosystem can justify an isolated capability worker when a concrete missing feature appears. Native work must not be treated as Python bytecode. [A-SPREADSHEET] [A-FILE-PARSER] [A-PDF] [A-VIDEO] [W-NUMPY] |
| gravitasml 0.1.4 | XML-like text tokenization/parsing. | Not a deep-learning framework; the package name is not evidence of an AI moat. [A-XML] |

The inspected backend lock contains no packages named `torch`, `transformers`, `sentence-transformers`, `langchain` or `llama-index`. This is a narrow dependency observation, not a claim about every external sandbox, service or Classic component. AutoGPT should not receive credit for those libraries merely because it uses Python.

Graphiti merits a focused future comparison of temporal facts, provenance, contradictions, forget/export semantics and retrieval quality against the already selected memory direction, including Hindsight where applicable. This report does not replace that direction. The upstream reference REST/MCP servers are not sufficient production authentication/authorization by themselves. Additional storage, model extraction/reranking calls and operational responsibility must be included in any service estimate. [W-GRAPHITI]

### Three integration options, all still research

Higher reliability/confidence is better; higher complexity means harder engineering/operations. These are scoped planning judgments, not performance probabilities. Production LOC are rough hand-maintained **TypeScript** estimates for the stated adapter only; exclude generated clients, tests, infrastructure, data migration and unrelated product work. None is authorized for implementation by this report.

| Option | Reliability / confidence / complexity, /10 | Scoped production TS LOC | Decision boundary |
| --- | --- | --- | --- |
| Use an existing TS SDK for one ordinary service capability | 8 / 8 / 3 | 150–400 for one bounded adapter and mapping | Prefer when the required capability is already exposed; no second language runtime is needed. Estimate confidence 4/10 until the owning port is fixed. |
| Keep TS orchestration; call one Python capability service through an owned port | 7 / 6 / 6 | 250–700 for TS contract/client adapter only | Candidate for Graphiti or specialist compute. Python service, auth/isolation, storage, deployment and qualification are additional and not estimated here; a small HTTP wrapper is not the full solution. Estimate confidence 3/10. |
| Reimplement a substantial Python framework such as graphiti-core in TS | 4 / 7 / 9 | Not responsibly estimable before algorithm/parity scope | Highest maintenance and semantic-drift risk among these scoped options. No present justification identified; revisit only for a concrete deployment constraint and a parity oracle. Simple algorithms such as BM25 do not inherit this estimate. No blanket rewrite is proposed. |

For the service option, the Python component owns only its named capability. Platform keeps commercial/tenant authority; Orchestrator keeps business coordination; Runtime keeps technical execution/custody. Use existing transport/adapters with bounded concurrency, deadlines, cancellation, operation identity and uncertainty. Do not give a memory/compute worker another scheduler or global grant ledger.

## Implications and limits

### Ideas to retain, mapped to existing owners

| Idea and evidence | Existing owner / lesson | Smallest useful future question | Status |
| --- | --- | --- | --- |
| Schema/provider descriptor plus common contract samples, AG-07 | Feature-owned integration port and Extension Foundation boundary; MR-03/MR-04, GP-09 | Can one descriptor remove repeated UI/validation/auth descriptions without moving business policy into a block base? | Candidate; no adoption |
| Permission-aware, exact-name-first capability search, AG-08 | Product Host/tool discovery and authority port | Does a fixed tool-selection corpus improve while inaccessible tools remain absent? | Candidate; no new search service selected |
| MCP no-blind-retry policy, AG-04 | Runtime/effect adapter; MR-13/MR-14, GP-07/GP-08 | Does a lost tool response remain uncertain without a repeated external effect? | Reinforces an existing requirement |
| Immutable skill content plus user-preserving update, AG-08 | Existing skill/catalog consumer; artifact identity under ADR-0095/0096 | Can updates preserve edits, expose conflicts and reject path/size violations? | Candidate; no automatic-update decision |
| Forced interleaving tests, AG-02/03/06 | Owning concurrency/transport conformance suite | Can a stale worker or stale channel be forced deterministically rather than relying on timing luck? | Evidence for existing invariants |
| Load coverage and latency decomposition, AG-06 | Existing C0–C3/role qualification owners | Are semantic work, covered journeys and provider costs equal before comparing builds? | Evidence design; no new mandatory gate |
| Human-priority slot during delegated work, AG-04 | Business priority owner plus Runtime capacity port | Can control/user progress be protected without confusing business priority with technical reservation? | Candidate; retains owner split |
| Graphiti temporal/provenance memory | Existing memory adapter owner | Does a concrete retrieval/forget scenario outperform the current chosen direction after cost and operations? | Comparative spike only; no replacement |

### Anti-patterns to avoid

1. Treating lease acquisition/renewal as complete fencing while stale work can still write or cause effects.
2. Duplicating transport lifecycle semantics until two implementations disagree about ACK ownership.
3. Treating a DB state update plus a broker publish as one atomic operation without an explicit uncertainty/recovery protocol.
4. Calling an approximate queued-work safeguard a hard resource/budget reservation.
5. Loading all extensions into global registries and mutating methods implicitly when explicit composition would expose dependencies.
6. Mixing execution, credentials, commercial charging, moderation and API persistence into a broad manager because it is convenient initially.
7. Equating manifests/effect annotations/content hashes with actual permission grants, isolation or publisher authenticity.
8. Claiming Python performance, TypeScript performance or enterprise capacity from a language label, worker default or uncalibrated HTTP benchmark.

Our own corresponding risks are over-fragmented packages, excessive DTO/ACL ceremony, many deployment components and unowned overlap between domain/workflow/capacity engines. The accepted role map and shared technical libraries help only when they reduce those costs in actual features. A correctly implemented complex system still costs more to operate than a smaller one. Do not add another framework, scheduler, generic plugin manager or feature flag as a result of this research.

### What would settle the remaining scale/memory question

A fair future campaign needs the same useful workload, model-latency distribution, external CLI/browser/sandbox mix, payload/output retention, quotas and failure scenarios. Measure admitted active executions separately from queued, idle, recovering and unknown states; aggregate concurrency separately from per-Run concurrency; p95/p99 queue, first-token, completion and cancellation latency; correctness/duplicate effects; CPU, cgroup memory/PSS, connections, cleanup debt and cost per completed job. Hold operator limits and deployment accounting constant.

Use simulated providers for deterministic control-plane pressure and a separately calibrated real-provider campaign. Include hot tenants, slow consumers, broker/DB interruption, lost ACK, owner loss and quota shrink. These are proposed experimental inputs, not a benchmark conducted here and not a newly accepted release policy. C0–C3 remains the owner of runtime capacity delivery; ordinary S1–S5 is not retroactively blocked on fleet qualification. [R-CAPACITY] [O-TESTING]

### Publication and validation boundary

This change adds one competitor dossier, navigation, source/probe evidence and independent review. It changes no product plan, ADR, dependency pin or implementation. AutoGPT's platform and Classic have different licenses; the retained experiment dynamically reads upstream source and does not vendor its implementation. The useful output is the observed pattern/invariant and its evidence, not wholesale code transplantation. [A-LICENSE]

Validation results are recorded in [the review record](../../evidence/reviews/2026-11-06/autogpt-review.md): exact Docs Protocol creation, catalog check, source/hash and navigation checks, narrow score arithmetic, and the isolated renewal probe. No AutoGPT application suite, common fleet benchmark or end-to-end product deployment is claimed.

## Sources

Every repository link below pins the inspected revision. External official documentation was accessed on 2026-11-06 and is a rolling source unless its URL names a version. The [machine source manifest](../../data/autogpt-2026-11-06-sources.json) records exact code/document hashes without copying upstream implementation.

[A-APP]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/app.py
[A-LIBS-PACKAGE]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/autogpt_libs/pyproject.toml
[A-KEYSMITH]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/autogpt_libs/autogpt_libs/api_key/keysmith.py
[A-KEYSMITH-CONSUMER]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/data/auth/api_key.py
[A-CI]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/.github/workflows/platform-backend-ci.yml
[A-MANAGER]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/executor/manager.py
[A-COPILOT-MANAGER]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/executor/manager.py
[A-PROCESSOR]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/executor/processor.py
[A-LOCK]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/executor/cluster_lock.py
[A-EXECUTION-DATA]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/data/execution.py
[A-DB]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/data/db_manager.py
[A-ACCESSORS]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/data/db_accessors.py
[A-SERVICE]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/util/service.py
[A-ACTIVE]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/active_turns.py
[A-COPILOT-DB]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/db.py
[A-QUEUE]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/turn_queue.py
[A-PUBLISH]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/executor/utils.py
[A-GRAPH-PUBLISH]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/executor/utils.py
[A-SCHEMA]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/schema.prisma
[A-TENANCY]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/data/tenancy.py
[A-TENANCY-TESTS]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/data/tenancy_test.py
[A-TESTS]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/AGENTS.md
[A-CANCEL-TEST]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/executor/cancel_fanout_e2e_test.py
[A-BILLING-TEST]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/executor/manager_redispatch_billing_test.py
[A-BILLING-E2E]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/executor/billing_e2e/agent_run_billing_test.py
[A-CREDITS-AUTHZ]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/api/features/v1_credits_authz_test.py
[A-FRONTEND-TESTING]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/frontend/TESTING.md
[A-LOAD]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/load-tests/README.md
[A-BLOCKS]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/__init__.py
[A-BLOCK-BASE]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/_base.py
[A-BLOCK-TESTS]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/test/test_block.py
[A-SDK]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/sdk/builder.py
[A-REGISTRY]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/sdk/registry.py
[A-MCP]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/mcp/client.py
[A-SKILLS]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/tools/skills.py
[A-SKILL-PACKAGE]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/data/skill_package.py
[A-CAPABILITIES]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/capabilities/index.py
[A-EFFECTS]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/gate/effects.py
[A-PYPROJECT]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/pyproject.toml
[A-LOCKFILE]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/poetry.lock
[A-DOCKER]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/Dockerfile
[A-APPLIANCE]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/docs/platform/single-container.md
[A-LOCAL]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/docs/platform/copilot-local-llm.md
[A-GC]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/util/process.py
[A-GRAPHITI]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/graphiti/client.py
[A-MEM0]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/mem0.py
[A-CLAUDE]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/sdk/service.py
[A-CLAUDE-PRIVATE]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/sdk/cli_prelaunch.py
[A-E2B]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/code_executor.py
[A-STAGEHAND]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/stagehand/blocks.py
[A-LANGFUSE]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/util/langfuse_prompts.py
[A-FIRECRAWL]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/firecrawl/search.py
[A-EXA]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/exa/websets_polling.py
[A-TAVILY]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/tavily/search.py
[A-SPREADSHEET]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/spreadsheet.py
[A-FILE-PARSER]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/util/file_content_parser.py
[A-PDF]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/api/features/workspace/preview_render.py
[A-VIDEO]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/video/concat.py
[A-XML]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/xml_parser.py
[A-LICENSE]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/README.md#license
[R-PLAN]: https://github.com/agent-teams-ai/agent-runtime/blob/ab0387c02fe75ed0c9bb456caaad9a6d2723795b/docs/architecture/agent-runtime-architecture-program-plan.md
[R-S2]: https://github.com/agent-teams-ai/agent-runtime/blob/ab0387c02fe75ed0c9bb456caaad9a6d2723795b/docs/architecture/agent-runtime-architecture-program-s2-operations-storage.md
[R-CAPACITY]: https://github.com/agent-teams-ai/agent-runtime/blob/ab0387c02fe75ed0c9bb456caaad9a6d2723795b/docs/architecture/capacity-admission-delivery-plan.md
[O-DEPENDENCIES]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/architecture/dependency-rules.md
[O-BACKEND]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/decisions/0114-canonical-backend-stack-and-distributed-role-adoption.md
[O-LOCAL]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/decisions/0115-canonical-fully-local-v1-adoption.md
[O-WORKFLOW-OPEN]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/open-decisions/OD-035-local-durable-workflow-engine.md
[O-EXT-OPEN]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/open-decisions/OD-043-extension-lifecycle-catalog-and-hot-update.md
[O-PROFILES]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/architecture/deployment-profiles.md
[O-TESTING]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/architecture/testing-strategy.md
[O-EXT-SAFETY]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/decisions/0095-extension-safety-and-ownership-invariants.md
[O-EXT-DISTRIBUTION]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/decisions/0096-shared-extension-foundation-and-oci-distribution.md
[P-CONTEXT]: https://github.com/agent-teams-ai/agent-teams-platform/blob/7f6eb3746c07dc01751c29a8dbc62e50b5f7ad6d/docs/domain/context-map.md
[P-BOUNDARY]: https://github.com/agent-teams-ai/agent-teams-platform/blob/7f6eb3746c07dc01751c29a8dbc62e50b5f7ad6d/docs/architecture/platform-orchestrator-boundary.md
[W-RABBIT]: https://www.rabbitmq.com/docs/confirms#delivery-identifiers-delivery-tags
[W-ASYNCIO]: https://docs.python.org/3.13/library/asyncio.html
[W-PYTHON-THREADS]: https://docs.python.org/3.13/c-api/init.html#thread-state-and-the-global-interpreter-lock
[W-FREE-THREADING]: https://docs.python.org/3.13/howto/free-threading-python.html
[W-NODE]: https://nodejs.org/api/worker_threads.html
[W-NODE-LOOP]: https://nodejs.org/learn/asynchronous-work/dont-block-the-event-loop
[W-NUMPY]: https://numpy.org/doc/stable/reference/thread_safety.html
[W-PYDANTIC]: https://docs.pydantic.dev/latest/why/
[W-GRAPHITI]: https://github.com/getzep/graphiti
[W-MEM0]: https://docs.mem0.ai/open-source/configuration
[W-CLAUDE]: https://code.claude.com/docs/en/agent-sdk/overview
[W-E2B]: https://docs.e2b.dev/
[W-STAGEHAND]: https://docs.stagehand.dev/v4/first-steps/introduction
[W-LANGFUSE]: https://langfuse.com/docs/observability/sdk/overview
[W-FIRECRAWL]: https://docs.firecrawl.dev/sdks/node
[W-EXA]: https://docs.exa.ai/sdks/typescript-sdk-specification
[W-TAVILY]: https://docs.tavily.com/sdk/javascript/quick-start
