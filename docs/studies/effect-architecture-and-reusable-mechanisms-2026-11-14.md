---
id: research.studies.effect-architecture-2026-11-14
type: study
status: active
owner: research/maintainers
summary: Critical source research on modular frontend and backend architecture, Effect, existing Foundation mechanisms and bounded reuse proposals.
reviewed_at: 2026-11-14
---

# Effect Architecture and Reusable Mechanisms 2026-11-14

## Scope and recommendation

**Effect is suitable for both frontend and backend application execution. The strongest opportunity here is to reuse its native resource, error and concurrency mechanisms while preserving the existing owners of composition, transport, persistence, durable execution and architecture policy.** The useful findings from large projects are precise failure and ownership contracts, together with checks that make those contracts visible to developers and agents.

This study answers the request for critical, parallel research into T3 Code, OpenCode and other substantial projects. It covers frontend/backend integration, reusable libraries, Engineering Foundation, large-codebase organization, deterministic agent workflows, SOLID, Clean Architecture and DRY. Research date: 2026-11-14 in the requester's timezone; source observations began on 2026-11-13 UTC.

This is **research and a reviewable proposal**, not an accepted product ADR, a production migration or a capacity certification. The user assigned npm publication to another agent. No publication or runtime implementation is part of this change. Proposed consumer qualification below does not reopen the completed Get Modular library E2E work by implication.

The practical priorities are:

1. Map the existing Foundation and consumer checks before adding anything. Several mechanisms that the upstream examples suggest already exist.
2. Qualify ready-made Effect diagnostics against the exact TypeScript 7 toolchain instead of writing another semantic linter.
3. For one real frontend/backend use case, verify request cancellation, state identity, bounded delivery and durable intent using the adopted stack.
4. Extract a small reusable mechanism only where a concrete shared contract and its owner are established. Do not create a universal runtime or repository framework from this research.

The existing [GM practices guide][gm-practices] remains the owner of its public good/bad usage rules. This study adds cross-project evidence and application-level proposals; it does not duplicate or silently replace that guide.

## Method, provenance and confidence

Three parallel investigations examined T3 Code/OpenCode; Effect/LiveStore/Alchemy; and large-codebase enforcement. A fourth focused comparison examined whether the already selected Centrifugo SDK supplies the recovery mechanism that a T3-inspired client would otherwise reimplement. The synthesis is challenged in two review rounds and checked through this repository's documentation pipeline.

Evidence labels in this study mean:

- **Source:** an implementation at a pinned revision was inspected.
- **Inspected test:** an upstream fixture and its assertions were read. This is not a successful test execution here.
- **Documentation:** an official statement, with its date/version where available.
- **Inference:** our recommendation or consequence derived from the evidence.
- **Executed check:** a command actually run for this documentation delivery.
- **Unknown:** a property not established by this investigation.

Package presence in a catalog does not establish consumer activation. Reading current main does not establish the contents of a published artifact. Popularity, line count and a passing small fixture do not establish production capacity. A missing search result does not establish an absent capability.

### Pinned source inventory

| Reference | Inspected revision or version | Evidence scope and limitation |
| --- | --- | --- |
| T3 Code | 5f95653f25ae0f5655145fa83d94d618c2951432; workspace Effect 4.1.3 | Source and test fixtures; binary release provenance and production SLO not checked |
| OpenCode | 83960f8a56b2f2b8ad0b751f23baaf9d0eb65ad9; dev branch; workspace Effect 4.1.0 | Current implementation and documented limitations; not a claim about every published client |
| Effect | 289a53f7b1fc40049219c6e69022db2fb859c356; release 4.1.4 | Released source and individual stability tags; upstream suites not executed |
| LiveStore | 54e5a23a29e2c48a8abeff2253fb314767c4243a; latest release observed 0.5.0 | Current source plus project maturity statement: still beta |
| Alchemy | 39de206fc21604cd051e1827d0723a16bddd58d2 | Current source is newer than observed release v2.0.0-beta.87; fixes must not be attributed to that release |
| Effect native diagnostics | 416fdf299111341e156fc94330cd481470494ac6; @effect/tsgo 0.69.0 | Supported upstream builds and rule fixtures; our installed cohort not qualified |
| VS Code | 1f075c5608e3d2309110539b30eefd71f375ffa0 | Architecture rules and agent instructions; not an Effect adoption example |
| Backstage | 1c7591200a140f026e128dda3dea420f55d9fc10 | Extension contracts, initializer and agent instructions; not an Effect adoption example |
| Nx | 2b305ee85b8db033e4ab998f31282cbff66ac2a8, resolved from tag 23.3.0 | Matches the Foundation catalog version for source comparison; installed archive behavior remains separate |
| RushStack | c2acd010079c6c08e63ba25d0b136ed2c1b16ccd | API Extractor runner/model distinction and cache input model |
| Centrifugo server / JS SDK | server 6.10.3 at 4b6d86e23452a6fa1bd424ffe4526862efae85b8; SDK 5.8.0 at 163dcbab9d5e23f41d1142e4631bcbabc2e2f62f | Released source, recovery API and callback semantics; actual consumer deployment pins not established |
| Engineering Foundation | e38d8444f74cceef37c366f4e28ed1918b214d4a | Current source contracts; release and consumer activation are distinguished below |
| Organization standards | 0b44c64c824f536bd1b085341e7669bcc64ef124 | Accepted backend roles, toolchain and extraction constraints |
| Get Modular | 6c91ff1c3c8ce7088db215af9705f7ee3a9db103 | Existing native Effect practices and ownership contract |
| Engineering Research baseline | 495986d9012aafd94bf9b2a22a57db90001e868b | Existing evidence and lesson identities retained |

Version evidence: [T3 manifest][t3-versions], [OpenCode manifest][oc-versions], [Effect manifest][effect-version], [LiveStore release/changelog][livestore-changelog], [Alchemy release][alchemy-release], [native diagnostic support][effect-tsgo-upstream]. The later Effect main revision f18320b2b84f77a197037fdccaf41808d8c82d4b was observed but is not substituted for release 4.1.4.

## Existing authority and placement

The accepted [backend stack][backend-stack], [Foundation ownership][ef-ownership], [tooling contracts][development-tools] and [GM practices][gm-practices] constrain the recommendation.

The backend reference applies through each consumer's adopted profile. It is not automatic activation of every component in every repository, browser, desktop process or worktree. Local-only workflow choices remain separate. References below to retaining Temporal/JetStream/Centrifugo mean retaining their roles where that profile is adopted.

| Responsibility | Owner and expected placement |
| --- | --- |
| Pure domain rules and identities | Feature or bounded context; no GM registration or database/transport DTO dependency |
| Replaceable subject-specific ports | Consumer-owned neutral contract; explicitly Effect-native technical ports are an intentional separate choice |
| Static module selection and composition | GM at the existing outer composition boundary |
| In-process operations, resources, typed errors and fibers | Native Effect where adopted; application/request/task owners define lifetime |
| HTTP/RPC and process-boundary schema | Fastify/Connect and Protobuf/Buf under the accepted profile |
| Database state and transaction policy | Application-owned Postgres/node-postgres/Drizzle adapters |
| Durable messaging and durable workflow progress | Existing JetStream delivery and Temporal workflow owners respectively |
| Realtime delivery | Existing Centrifugo; application owns authoritative state and authorization |
| Native process custody | Existing Agent Runtime/physical custody owner and node-or-bun mechanism |
| Architecture facts and generic development checks | Engineering Foundation |
| Feature/layer vocabulary and architecture policy | Opt-in FMS profile and adopting product |
| Universal technical tools and compiler orchestration | Stack-toolchain plus the consumer's build/CI owner |
| Accepted product decisions and qualification | Product repository, not this research document |

Effect at a transport or Activity boundary need not own that transport or durable engine. EF's development gate runner schedules development checks; it is not an application job orchestrator. A shared runtime package, if justified, is separate from EF. A package can contain a native Effect adapter without forcing every consumer or pure domain function to depend on Effect.

The [extraction invariant][ef-ownership] does **not** require waiting for two production implementations. Concrete expected multi-repository reuse can justify a library from the start. Admission still requires an explicit shared contract, disposable consumers, at least one real consumer, parity evidence and conformance in each adopter. Similar syntax alone is insufficient. Avoid mandatory second-copy rules that contradict this existing policy.

## Effect on backend and frontend

### Backend fit and its actual boundaries

Effect supplies typed error/environment composition, resource acquisition/release, structured concurrency, cancellation, streams and tracing. Its repository also contains platform implementations and HTTP/RPC/SQL/workflow integrations. That breadth supports full backend use; it does not mean every integration is stable or every deployment is qualified. [Core APIs][effect-core], [ManagedRuntime][effect-runtime], [platform packages][effect-platform].

For the accepted stack, a request adapter can decode and authenticate through Connect/Fastify, invoke an application operation through an owned runtime/request scope, and map its typed result, failure and cancellation back to the transport. Pure business rules remain ordinary values/functions. A neutral reusable port stays Effect-free throughout its parameters and callbacks; an explicitly native technical port can expose Effect or Stream honestly. A generic Task alias does not erase framework coupling. These distinctions already appear in [GM practices][gm-practices].

A fiber is cooperative execution, not an operating-system thread. CPU-heavy synchronous work may still require workers/processes or a measured native implementation. A Scope finalizer does not compensate an external write. A Promise adapter must forward the actual AbortSignal or use the SDK's real cancellation mechanism; interruption of the waiter alone does not prove the remote operation stopped. Each promise belongs to its real boundary, not to a broad “Effect handles everything” claim.

The existing wire schema remains authoritative at actual service boundaries. Using Effect Schema for additional domain invariants or other inputs can be useful; hand-maintaining two definitions of the same Protobuf wire fields creates drift. Local function calls do not need to become RPC simply because a schema generator exists.

### Stability is per API, not a whole-ecosystem label

The official [Effect 4 correction][effect-stability] explains that missing stability tags were repaired after 4.0. Stable package branding cannot be projected onto every export; unstable and experimental APIs may change in minor or patch releases. The older beta-era advice to inspect only an unstable import directory is obsolete.

At the inspected 4.1.4 release, core Effect, Layer, Schema and ManagedRuntime have stable module tags. The inspected HTTP API, RPC, SQL, Workflow/Cluster and Atom React modules are unstable. Individual exports and the exact tested dependency cohort still require inspection. [Layer][effect-layer], [HTTP][effect-http], [RPC][effect-rpc], [SQL][effect-sql], [Workflow][effect-workflow], [Atom bindings][atom-hooks].

**Recommendation:** keep stable native primitives where they solve the problem; choose unstable integrations explicitly at the owning adapter. Do not leak an unqualified unstable integration through a supposedly stable reusable contract. Effect-native HTTP/RPC/SQL can be reasonable for a new isolated service, but replacing the accepted stack is a separate successor decision with compatibility and operations costs.

### Frontend state should have explicit owners

A useful default for an existing React application is: React owns rendering; the router owns navigation/loading; the chosen Query client owns server cache/invalidation; UI-local state has its declared owner; Effect executes an operation. This is an architectural recommendation, not a claim that every user application currently uses these libraries.

An Effect-centric application can instead select Atom for its reactive async state. It should not automatically mirror the same authoritative server data in both Atom and Query. XState is useful for an explicit interaction protocol; its persisted snapshot is not a transactional external-effect journal. Simple component state does not require a state-machine framework. [Query cancellation][query-cancellation], [XState persistence][xstate-persistence].

Cancellation needs end-to-end qualification: Query's signal must reach the Effect runner and then the network/SDK. Current Query documentation distinguishes ordinary queries from Suspense query hooks, which do not support cancellation. @effect/atom-react 4.1.4 declares React >=19 and <20; its bindings are unstable. A React 18 consumer cannot treat it as a compatible drop-in. [Atom manifest][atom-manifest].

For personalized SSR, own the registry/runtime per request and use the server framework's actual completion/abort lifecycle. Atom has a module-default registry; its provider creates one registry rather than reconfiguring it on every option change. Inspected fixtures show effects running during SSR by default and withServerSnapshot avoiding that execution. These facts motivate request-isolation and hydration tests; they do not establish a deployed tenant leak. [Registry][atom-registry], [SSR fixtures][atom-tests].

## Application patterns from T3 Code and OpenCode

The observations below are local to this study. They support existing [MR/GP lessons](../lessons/patterns-and-failure-lessons.md), rather than creating competing global finding IDs.

### 1. Persist intent and receipt separately from external completion

**Source:** T3 commits a command receipt with accepted status and resultSequence, events, projections and outbox entries in one transaction, then signals/publishes after commit. A duplicate command ID reads the receipt and currently retained events, not necessarily the original full response after event pruning. A race fixture covers conflicting concurrent use across threads on in-memory SQLite; it does not establish semantic equality of arbitrary same-ID payloads. Recovery distinguishes process-bound work from replay-safe work. [Commit path][t3-commit], [recovery][t3-recovery], [race fixture][t3-receipt-test].

**Transfer:** a UI should distinguish accepted intent, running work, durable result and cleanup completion. Persist identity and a meaningful receipt before dispatch. Use the existing application database and JetStream/Temporal owners rather than importing T3's SQL worker as a second broker.

**Counterevidence and cost:** an outbox does not make an external effect exactly once. A crash after provider success but before local completion still requires provider idempotency, reconciliation or an explicit uncertain outcome. T3 prunes older events; its projections are not rebuilt from an unlimited historical event log. Calling this full historical event sourcing would overstate the design. Serial commit/publication lanes also have a throughput cost. [Retention][t3-overview].

**Simpler alternative:** ordinary CRUD may need only a transaction and unique operation key. Add an outbox when durable intent must survive a crash across an external boundary. Existing lessons MR-13/14 and GP-07/08 already cover identity and uncertainty.

**Rejecting proof:** kill after commit but before publish, and after remote success but before acknowledgement; redeliver the original identity and inspect both durable/local and remote state. Include conflicting payload/owner reuse. A mocked retry count is not that proof.

### 2. State the delivery contract and bound every relevant queue dimension

**Source:** T3's opted-in RPC live budget retains at most 1,000 items and 8 MiB of serialized payload by default. In-flight values remain charged until the next RPC pull after ACK. Reconnect replay has its own count, raw-payload and encoded-byte limits with snapshot fallback. The source also leaves internal-worker subscriptions unbounded; these RPC limits must not be described as a bound on the entire event system. [Budget][t3-budget], [EventSink subscriptions][t3-commit], [replay][t3-replay].

OpenCode isolates slow subscribers by failing their individual queues. Its /api/event contract is explicitly volatile: events missed during disconnection are not replayed. Count limits are not byte or whole-heap limits, and disconnecting a consumer is not producer backpressure. [Event contract][oc-event-contract], [server feed][oc-event-feed].

**Transfer:** each stream needs named delivery/order semantics, item and byte budgets, a maximum single-item size, subscriber limits, overflow behavior, recovery policy and an owner. Progress notifications may coalesce if authoritative state remains available. Reliable business transitions need a stronger contract.

**Counterevidence and cost:** serialized payload accounting excludes object overhead, serializer allocations and transport buffers. Snapshot fallback can itself overload a server. Product-specific values such as 1,000 or 8 MiB are reference parameters, not recommended universal defaults.

**Ready alternative:** reuse Centrifugo recovery and the application's snapshot path before writing another replay service. JetStream remains the durable integration-delivery owner. A channel offset is a delivery position, not automatically a business version or authorization grant.

**Rejecting proof:** stall one subscriber, send one oversized item, saturate many small items, delay ACK, reconnect outside retention and verify bounded cleanup plus healthy-peer progress. Measure actual retained memory separately from the declared payload budget.

### 3. Separate connection, subscription, cache and data/cursor lifetime

**Source:** T3's shared client-runtime has narrow subpaths and platform-provided services. Its connection supervisor, domain state and retained resume cache have separate lifetimes. An old scope cannot overwrite a successor's cache; persisted data and cursor move together. Buffered stream values carry producer-session identity so a late old value is not attributed to a new connection. [Runtime layout][t3-client-layout], [connection design][t3-connection], [cache ownership][t3-cache], [race fixtures][t3-cache-tests], [session stamping][t3-session-stamp].

**Transfer:** a headless client package can share operations and connection/state semantics between web, desktop and mobile while each owns its UI and platform adapters. Keys must include the meaningful environment/entity/owner identity. Transport health, data freshness and command outcome are separate UI states.

**Counterevidence and cost:** reference counting and TTL are memory policy; hidden mounted routes can retain resources. A shared client package can become another broad coordinator. Automatic reconnect must not silently replay effectful mutations. A query cache with correct keys, versions and AbortSignal is often enough for a simpler application.

**Rejecting proof:** cancel between data application and cursor persistence; let an old scope finalize after a successor; deliver an old-session buffered value; switch principal/environment while a request remains in flight. The later state must remain associated with its owner. This belongs to the client application, not GM or EF runtime.

### 4. Distinguish interrupt accepted, owner settled and idle

**Source:** OpenCode's per-key coordinator distinguishes wake, join, interruption and settlement. It closes a lost-wakeup window at drain completion; cancellation of one joiner does not cancel the shared owner's execution. Interruption acknowledgement can precede finalizers; awaitIdle tracks actual ownership and successors. [Coordinator][oc-coordinator], [fixtures][oc-coordinator-tests].

**Transfer:** this protocol is useful for session/document/workspace mutation where one local owner serializes changes. Close admission before draining during shutdown. A new request during cleanup needs a defined policy.

**Counterevidence and cost:** a process-local Map is not a distributed lock or durable workflow. The number of keys still needs global/tenant admission and fairness. awaitIdle can remain pending while new work keeps arriving. A Semaphore is simpler for a short local critical section; Temporal already owns durable orchestration.

**Rejecting proof:** use explicit barriers for wake during settlement, cancelled joiner, slow finalizer and successor start. Check that two mutators of the same owned resource do not overlap. Existing MR-15 covers the distinction between acknowledgement and physical release.

### 5. Worktree identity and native process ownership need separate mechanisms

**Source:** OpenCode has fresh location instance graphs with explicit shared services, scoped retain/shutdown and worktree-strategy ownership. Lexical path normalization is not filesystem authority or hostile-code isolation. Its reload path uses unbounded concurrency, and worktree creation spans filesystem, database registration and setup processes. A Scope does not make that sequence atomic. [Instances][oc-instance], [worktree operations][oc-worktree].

The Rust daemon supplies generation fencing, one-use handoff tickets and deadlines. Its own README also records incomplete process-tree cleanup and a Linux PTY writer that can block shutdown indefinitely. A watchdog exit is not evidence that every thread and descendant was joined. [Ownership][oc-process-owner], [documented limits][oc-process-limits].

**Transfer:** use explicit provisioning states and idempotent reconciliation for multi-step workspace setup; keep admission and actual custody with the existing host/runtime owner. Reuse node-or-bun and current Agent Runtime mechanisms. Do not add a new supervisor to EF or GM.

**Rejecting proof:** fail between filesystem allocation, durable registration and setup; retry with the same identity. For actual process ownership, inspect descendants, handles and output drain; test stale handoff and delayed disconnect. A lexical path or matching PID alone does not establish the requested isolation.

### 6. Pure transitions help agents; the interpreter still needs an honest budget

**Source:** OpenCode separates request-queue transitions from fetch/timer/AbortController interpretation. This supports reproducible traces and a disposed state. However, its 4 in-flight/2 slow limits govern the headers phase. The waiting array is unbounded, priority starvation is logged rather than prevented, and body streaming continues outside that slot. The event endpoint bypasses this queue; disposed handling is not universal. [State machine][oc-queue], [interpreter][oc-queue-interpreter], [fixtures][oc-queue-tests].

**Transfer:** explicit state/event/effect transitions make reconnect, provisioning and long-running UI behavior easier to review and test. An interpreter performs I/O; the model's pure test does not prove the real I/O abort.

**Improvement when needed:** define max pending, queued deadlines, stale-read coalescing, fairness and a separate long-stream budget. Keep policy in the application. Do not assume a concurrency setting bounds requests waiting to start or data still being consumed.

**Rejecting proof:** arrival, queueing, cancellation, late completion and disposal in controlled orders; check that obsolete work cannot mutate successor state. Use a state-machine library only when the protocol warrants it.

### 7. Schema, authorization and public import closure are different checks

**Source:** OpenCode builds five workspace client entrypoints in browser/Bun ESM modes and checks their transitive bundle inputs for forbidden server/core dependencies. That oracle does not replace a source/type graph or installed-archive consumer test. T3 has an exhaustive method-to-scope authorization map with payload-sensitive checks. Neither a typed schema nor an authenticated connection makes every method authorized. [Import fixtures][oc-import-tests], [authorization][t3-auth].

**Transfer:** retain one wire-contract owner, separate business authorization, and qualify the dependency closure of every advertised client entrypoint. Domain entities, database rows, provider DTOs and wire messages need not be one shared universal type. A boundary mapping can preserve independent change rather than violate DRY.

**Counterevidence:** exhaustive maps prove coverage, not correctness of tenant filtering or revocation. A broad contracts package can amplify change fan-out. T3's very large Orchestrator interface/file is a useful review signal for responsibility and interface segregation; file length alone does not prove a defect. [Orchestrator][t3-orchestrator].

**Rejecting proof:** one new method without policy, revoked access with cached/buffered data, a server import through a re-export, and an installed client using every promised public subpath. Keep Buf/Connect as the accepted wire owner.

## Additional Effect ecosystem findings

### Transaction context and retry deserve more attention than ORM uniformity

Effect SqlClient carries transaction context in the active fiber, handles acquisition/body interruptibility, nested savepoints, commit/rollback failures and afterCommit callbacks. Inspected fixtures include interruption while waiting for a connection and detached use of an ended transaction. Real Postgres integration tests use a container and inspect database effects, rather than only mock interfaces. [Implementation][effect-sql], [unit fixtures][effect-sql-tests], [Postgres fixtures][effect-pg-tests].

One commit-serialization retry fixture executes the transaction body twice but afterCommit once. That is a useful oracle for an adapter; it does not make arbitrary external writes inside the body safe to repeat. afterCommit is not a durable outbox because a process can fail before the callback.

**Recommendation:** retain Postgres/Drizzle ownership and borrow these failure cases. A fresh nested runtime must not silently lose the caller's transaction/context. Evaluate unstable Effect SQL only if a concrete adapter decision justifies the migration. Qualify cancellation while queued, stale transaction use, commit failure, rollback failure and uncertain external success.

### Durable workflow syntax is not durable storage

Effect Workflow/Cluster can provide native typed orchestration, but layerMemory is not a production durability guarantee. Some inspected Cluster restart/handover fixtures use shared in-memory message storage. They verify ordering/state behavior, not recovery after a killed process against real storage. [Workflow][effect-workflow], [Cluster fixtures][effect-cluster-tests].

Temporal remains the accepted durable owner. Effect can run inside Activities and ordinary worker services. Arbitrary Effect platform code is not automatically safe inside Temporal's deterministic Workflow sandbox. Activity retries still require idempotent effects. [Workflow restrictions][temporal-workflows], [Activities][temporal-activities].

Restate and Inngest are credible alternatives for a new separately decided boundary; their durable steps still need stable identity and care around uncertain external effects. BullMQ fits queue workers where its storage/operations contract is appropriate. None is a reason to add a second owner alongside JetStream/Temporal for the same job. [Restate steps][restate-steps], [Inngest primitives][inngest-steps], [BullMQ idempotency][bullmq-idempotency].

### LiveStore: borrow scope/cache lessons; require a local-first need before adoption

LiveStore's registry distinguishes borrowed scope/context from an owned ManagedRuntime. A live entry is keyed by storeId; its first configuration wins. The React resource hook includes actual scope identity, and fixtures cover StrictMode, rapid key changes and same-key replacement scopes. A skipped maximum-TTL fixture is not a delivered guarantee. [Registry][livestore-registry], [registry tests][livestore-registry-tests], [resource hook tests][livestore-react-tests].

**Useful transfer:** owner-aware cache identity, explicit borrowed/owned lifetime, deterministic remount tests and recovery markers written only after completed materialization.

**Cost and alternative:** adopting LiveStore also adopts local persistence, event evolution, replay/rematerialization and synchronization policy. Its observed 0.5.0 release is still beta according to the project. For server-authoritative applications, existing Postgres plus a query cache and Centrifugo may be a smaller solution. Effect usage in both systems does not remove that tradeoff. [Project maturity][livestore-changelog].

### Alchemy: native Layer sharing and retained failure state are useful; policies are local

Alchemy's ProviderLayer preserves native MemoMap/Scope and sharing of the same actual Layer reference. Its fatal acquisition policy and dynamic resource registry are infrastructure-engine choices, not universal application conventions. Equivalent freshly created Layer objects do not automatically share identity. [ProviderLayer][alchemy-layer].

Delete fixtures retain failed rows, allow independent deletes and preserve upstream resources when dependent deletion fails. These are explicit reconciliation rules. The observed main commit fixes forwarding Stripe idempotency keys; it is newer than beta.87, despite that release's GitHub prerelease flag being false. [Delete fixtures][alchemy-destroy], [idempotency correction][alchemy-fix], [release][alchemy-release].

**Transfer:** persist unfinished reconciliation and verify that an idempotency key reaches the actual provider request. Reuse native Layers instead of implementing another memoizer. Do not propagate fatal-error policy to expected domain failures or move provisioning reconciliation into GM/EF. Provisioning adoption belongs to its infrastructure owner, with provider coverage and beta maturity assessed separately.

## Large-codebase architecture and deterministic agents

### Full source coverage and allowed directions are separate guarantees

VS Code's layering rule skips files outside recognized layers; its separate import-pattern rule can reject an unclassified filename. This is a useful two-part guarantee: known edges follow policy, and every governed file actually belongs to the policy's scope. [Layer rule][vscode-layer], [coverage rule][vscode-imports].

For a feature-oriented application, owner, architectural role, platform and production/test status are independent dimensions. A browser adapter and server adapter may belong to the same feature; a neighboring feature's private model remains private. Vertical feature ownership avoids making every change touch global horizontal layer directories.

**Existing coverage:** Foundation already has dependency declarations, source-boundary checks, deterministic diagnostics and negative fixtures. Do not propose these as missing features. Qualify the actual consumer profile with unknown directories, overlapping classification, aliases, re-exports, type imports, runtime imports and platform boundaries.

**Important contract distinction:** the full architecture.source-dependencies capability and the public observeSourceGraph adapter are not identical resolution contracts. The public graph classifies bare package specifiers and tsconfig aliases as external rather than resolved local edges; consumers own their additional resolution. A full-capability alias fixture is not proof that every FMS consumer path resolves the same alias. [Public graph contract][ef-observe-graph]. Resolve this at the existing adapter/consumer boundary rather than adding a second parser.

At this pin, the FMS on-disk adapter omits external observations from its kernel input. Parse failures, unresolved literal references and computed runtime references fail the runner, but a bare alias classified as external does not itself become a forbidden internal edge. The README explicitly documents this limit. A consumer that permits aliases into private features must prove that its complementary dependency gate resolves/rejects that edge, or provide a qualified resolution at the existing boundary. This is a documented adapter limit, not evidence that every consumer is vulnerable or that EF has no alias support. [FMS adapter][fms-disk], [runner][fms-runner], [documented scope][fms-readme], [graph fixture][ef-graph-tests].

A syntactic runtime edge is also not proof that the referenced code executes at module initialization. Keep source/type/load/activation graphs distinct; an architectural cycle diagnostic is not automatically a demonstrated JavaScript initialization failure or Effect finalizer deadlock.

### Public API checks need declarations, installed packages and behavioral evidence

Package exports define supported entrypoints, while TypeScript paths can bypass package lookup and mask installed-consumer failures. Declaration compatibility, runtime export resolution and behavioral substitutability answer related but distinct questions. [TypeScript lookup][typescript-paths], [Node exports][node-exports].

API Extractor's runner and model must not be conflated. The inspected runner 7.60.1 embeds TypeScript 6.0.3; its model package has no compiler dependency. The compiler-folder flag changes system typings rather than the runner's compiler engine. Recommending that runner in a TypeScript >=7.0.2 check path would violate the current policy. [Runner manifest][rush-runner], [model manifest][rush-model], [invocation contract][api-extractor-invoking].

**Recommendation:** qualify existing API/publint/packed-consumer checks before adding a tool. Test forgotten public types, a missing subpath target, an undeclared dependency and an incompatible supported consumer. Generated contracts need one authoritative input and a deterministic generator/version, not separately maintained mirrors. Knip-style liveness is useful for a declared closed/private scope; it cannot authorize deleting a published API merely because no local import uses it. [Knip configuration][knip-config].

### Narrow extension contracts are reusable; another plugin runtime is optional

Backstage separates extension-point contracts from implementation plugins and specifies behavior with independently installed contract libraries. Its initializer rejects foreign-owner access, duplicate identities and cycles, and removes partial registrations after failure. The same implementation contains a narrow private-type import exception, so it should not be called an exception-free Clean Architecture template. [Module contracts][backstage-modules], [initializer][backstage-init].

**Transfer:** a concrete extension use case can benefit from small owner-defined contracts, explicit identity/version compatibility and registration rollback. A TypeScript generic reference does not validate arbitrary runtime input. Qualify duplicate installed copies where supported, incompatible versions and partial registration.

A feature registry stays with its feature/application. GM does not need Backstage's loader or global service runtime. Where independently developed extensions are not required, ordinary composition is simpler. Existing extension adoption decisions remain with their owner; this study does not activate a public plugin ecosystem.

### Affected selection, cache correctness and producer trust require separate proof

Pinned Nx 23.3.0 includes both project and task affected-selection code. Its lockfile classifier has conservative fallbacks and fingerprints integrity/hash as well as version. A separate root-package path can warn about missing dependency nodes and return only the found set. This limits what can be inferred from a generic “Nx affected” claim. [Lock classifier][nx-lock], [package classifier][nx-packages].

**Recommendation:** the consumer owns complete classification, including removed edges, renamed/deleted files, lock integrity, patches, compiler/parser/config changes and unknown paths. If classification is uncertain, broaden the qualified checks or fail explicitly. ci-input-proof remains a pure leaf comparison; it cannot prove that the consumer declared every input or ran every required task.

A cache must separately establish complete semantic inputs, complete restored outputs and an accepted producer/artifact identity. Source/config/tool/generator changes can matter without ordinary imports. A green cached log is not all three proofs. Rush's declared environment-input assumptions and Nx's hasher illustrate the required explicit model. [Nx inputs][nx-inputs], [Rush cache configuration][rush-cache].

**Rejecting proof:** compare selective verification with a hand-specified full fixture where the omitted downstream task would fail. Restore into an empty directory and compare inventory/content. Change a patch or relevant environment input without changing semver. Reject the wrong source digest or producer at the owning evidence boundary. Do not add a Foundation-specific cache service.

### Deterministic agent behavior starts with canonical policy and machine contracts

VS Code and Backstage forward agent entrypoints to canonical instructions. Backstage's supplementary Copilot checklist nevertheless states a broader changeset rule than detailed AGENTS exceptions. A thin adapter can still drift if it duplicates normative content. [VS Code instructions][vscode-agents], [Backstage AGENTS][backstage-agents], [additional checklist][backstage-copilot].

Use existing Docs Protocol and owner-local policy. Stable rule IDs, semantic subjects, source/target identity, normalized paths, remediation and coverage status make diagnostics actionable to an agent. Foundation already defines canonical JSON, ordering and failure outcomes; these are existing mechanisms, not proposed inventions. [Foundation capability/report contract][ef-capabilities].

There are four different determinism questions:

| Question | Required mechanism | What it does not prove |
| --- | --- | --- |
| Where may this change go? | Canonical owner/profile, import/public API rules and source coverage | Correct business design |
| Can the result be reproduced? | Pinned inputs/tools/config/generator plus complete receipts | An unchanged runtime environment |
| Can an interrupted operation recover coherently? | Explicit identity, state transitions, durable owner and replay policy | Exactly-once external effects |
| Can an agent act safely within the task? | Bounded tools, exact preconditions, rejecting checks and accountable review | Deterministic model reasoning or infallible semantic judgment |

The existing Intent → Plan → Apply → Receipt path should reject stale preconditions where its contract promises that behavior. A read-only documentation cache stays derivative. A diagram, prompt instruction or parseable JSON field does not independently prove architecture compliance.

## Ready-made tooling: the TypeScript 7 diagnostic opportunity

The legacy @effect/language-service 0.87.5 directs TypeScript 7 users to @effect/tsgo. The observed @effect/tsgo 0.69.0 supports a patched TypeScript 7.0.2 compiler and particular native engines. It can run shipped patched binaries without modifying node_modules; adding an editor plugin entry alone does not make stock CI execute these rules. [Legacy restriction][effect-legacy-tool], [native tool README][effect-tsgo], [exact support matrix][effect-tsgo-upstream].

| Tool dimension | Current Foundation catalog at e38d844 | Inspected @effect/tsgo support |
| --- | --- | --- |
| TypeScript | 7.0.2 | Explicit patched 7.0.2 build |
| tsrs | 0.18.0-ts7.1.0-dev.20260929 | 0.25.0-ts7.1.0-beta |
| Oxlint | 1.83.0 | 1.91.0–1.93.0 |
| Typed companion | 7.0.2001 | Named 7.0.2005–7.0.2007 builds |

The exact current EF native backend is therefore **not established as a drop-in compatible target**. Bare native-tool selection can fall back to a supported version; automation must name and verify the actual build rather than silently change the compiler. Packaged tsrs/Oxlint also have Linux-musl limitations. Dedicated diagnostics typecheck again, so large-codebase cost needs measurement. [Foundation catalog][ef-manifest], [tool behavior][effect-tsgo].

unstableApiUsage defaults to a warning; apiStabilityLeak is v4-only and off by default. Exact module/export allowlists and surface fixtures exist; the upstream v4 fixture cohort is 4.1.2, while this study's runtime cohort is 4.1.4. These details make a small qualification valuable. [Leak rule][effect-leak-rule], [usage rule][effect-usage-rule], [surface fixture][effect-surface-test].

**Proposed admission:** one locked supported compiler path must fail on an unapproved unstable import and a stable public signature leaking an unstable type; pass the intended exact allowlist; still reject a sibling export; and return the intended nonzero CI status. The existing fallback policy stops on diagnostics and must retain that property. A stock fallback that lacks Effect diagnostics cannot substitute for this gate. No unreviewed compiler/native-tool upgrade or second competing editor server follows.

**Owner:** the technical toolchain adapter chooses the authoritative checker; Foundation may orchestrate and normalize its evidence after qualification. EF's import graph does not semantically prove one state owner, SSR safety, correct runner placement or Effect stability on its own. Runtime assertions remain with the consumer.

## Existing capability map and specific follow-through

These statuses refer to inspected source contracts. “Present” is not proof of released availability or activation in every consumer.

| Mechanism | Current evidence | Appropriate next action |
| --- | --- | --- |
| Source boundaries, dependency declarations, full governed-file classification | Existing Foundation capability and negative fixtures | Inspect each consumer's activated profile and alias-resolution path; add only demonstrated missing cases |
| Public graph consumed by FMS | Existing public adapter, with external-specifier limitations | Qualify the FMS/node/consumer contract; do not infer full resolver behavior from a different capability |
| Public API, package exports, installed consumer | Existing Foundation/API and GM acceptance paths | Declare supported surfaces and run the owner gate; no new TS6 runner |
| Protobuf/JSON-schema evolution | Existing deterministic qualification/evidence contracts | Reuse Buf/schema owners and provenance boundaries |
| Machine-readable documentation and agent context | Existing Docs Protocol and report contracts | Qualify inheritance, drift and stale-plan behavior at their existing owners |
| Executable specifications | Existing evidence-connectivity validation | Do not represent a connectivity check as execution or a green result of the linked property/mutation test |
| Generic source-coverage v5 work | Source/documentation identifies a next-major boundary | Do not advertise this as automatically available in the currently adopted release |
| Findings baseline | Source-implemented command, not released/declarable capability at this snapshot | Keep exact status; do not add it to a consumer root capability config |
| Effect semantic diagnostics | Upstream tool available; current-cohort integration unqualified | Small pinned negative-fixture pilot |
| Stream state/cursor consistency and request isolation | Application-specific contracts, not inferred from source graph | One representative real consumer scenario |
| Complete affected selection and cache provenance | Consumer owner plus existing leaf/tools | Compare with full verification on controlled mutations |
| Runtime admission, durable recovery and physical custody | Existing application/Runtime/Temporal/JetStream owners | Failure-injection cases at those boundaries, not a new EF runtime |

Sources: [capability statuses][ef-capabilities], [ownership][ef-ownership], [development tools][development-tools], [GM practices][gm-practices]. Source-only status is deliberate; a repository-wide activation audit is not claimed.

## SOLID, Clean Architecture and DRY as observable contracts

| Principle | Concrete design and evidence | Superficial substitute |
| --- | --- | --- |
| Single responsibility | Coherent semantic owner and reason to change; separate composition, execution, transport and policy | One package/class per helper or a giant “services” facade |
| Open/closed | Add an implementation at a declared extension/composition boundary | A mutable global registry reachable by every feature |
| Liskov substitution | Supported adapters preserve failure, cancellation, ordering, scope and idempotency contracts | Matching TypeScript signatures with different operational promises |
| Interface segregation | A use case depends only on its narrow capabilities and error contract | A universal repository/provider interface with many unsupported methods |
| Dependency inversion | Consumer-owned neutral ports; explicitly native technical ports only by adopted policy; implementations wired outside | Folder names or DI while domain code imports drivers and registries |
| Clean Architecture | Allowed source/type/runtime dependencies plus verified installed public boundaries | Reproducing a fixed number of layers everywhere |
| DRY | One owner for policy/schema/knowledge; reuse proven mechanism | Merging unrelated domain models because their fields currently look similar |

These are proposed assessment criteria, not a certification that every repository satisfies them. Native Effect in an intentionally coupled technical interface can be a reasonable choice; preserving neutral business/reusable contracts is a different promise. Artificial wrappers around every native primitive add a second API and can hide cancellation/errors without providing actual independence.

### Good and bad usage for application authors

This table supplements the [existing GM good/bad guide][gm-practices] with cross-project cases.

| Prefer | Avoid | Why |
| --- | --- | --- |
| Native operations retain the caller's context and honest E/R | A fresh runPromise/runtime in every service method | Transaction, tracing and lifetime ownership can be lost |
| One selected provider authority at the GM boundary | A second global Context/registry for undeclared neighboring services | Hidden dependency selection defeats the closed contract |
| Shared resources have one owner; request work has its own admitted lifetime | Rebuilding a pool for every request or disposing borrowed services | Ownership and sharing are separate questions |
| Forward cancellation to the real SDK and observe cleanup | Reporting physical completion when only the waiter stopped | MR-15; cooperative interruption is a limited promise |
| Data and resume cursor move together under owner/generation checks | Persist cursor before the represented state or accept stale finalizers | Recovery can otherwise skip or overwrite state |
| Declare stream delivery, count/byte/pending policy and resnapshot | Assume Queue or concurrency alone bounds the whole pipeline | Queued, delivered and consumed states differ |
| Reconcile durable intent with stable external idempotency | Blindly retry arbitrary external writes | MR-13/14; response loss leaves uncertainty |
| One authoritative state owner per semantic kind | Mirror server data across multiple caches without ownership | Invalidation and retry rules become contradictory |
| Use existing graph and contract gates, with negative fixtures | Another checker/DSL because a popular repo uses one | DRY applies to normative policy and mechanisms |
| Extract a concrete shared contract with real-consumer evidence | Wait for an arbitrary second copy, or create a universal manager early | Both conflict with purpose-driven extraction |

## Ready solution, small adapter or deferred architecture decision

| Need | First option | When a different solution is justified |
| --- | --- | --- |
| Scoped resources, typed async failures and cancellation | Native Effect primitives | Ordinary Promise/AbortController may be enough for a small neutral utility |
| Existing backend request boundary | Fastify/Connect adapter invoking owned operations | Effect HTTP/RPC only for an isolated service or explicit successor decision |
| Domain/wire validation | Existing Buf/Protobuf authority; Effect Schema for its separate invariant/input role | Generate/check mappings where a second representation is required |
| Durable commands and workflows | Existing Postgres intent/idempotency, JetStream and Temporal | Restate/Inngest/Effect Workflow comparison only at a separately owned boundary |
| Reconnect/recovery | Existing Centrifugo SDK plus application snapshot/version logic | A small headless client contract for repeated web/mobile/desktop needs; no second broker |
| Server cache and ordinary frontend fetching | Existing Query owner with real signal forwarding | Atom for an intentionally Effect-centric state graph |
| Complex interaction protocol | Pure transitions; XState if its model is useful | Do not use a framework for trivial component state |
| Offline/local-first data | LiveStore only if those product requirements exist | Existing server-authoritative stack avoids a second sync model |
| Infrastructure reconciliation | Existing provisioning owner/tooling | Evaluate Alchemy provider coverage and beta maturity for a real need |
| Dependency boundaries | Existing Foundation/Oxc and opt-in FMS | Temporary differential oracle on tiny fixtures, not another production parser |
| API contract and dead-code checks | Existing API/publint/Knip/installed-consumer gates | New compiler-backed runner only if it satisfies the TypeScript floor |
| Semantic Effect mistakes | Qualify @effect/tsgo's supported path | Do not write a duplicate EF semantic linter |
| Large build/change graph | Current toolchain and measured task graph | Separate graph-build/project-reference pilot only after an observed bottleneck |

This is a fit assessment, not a blanket dependency installation list. License/edition, actual published artifact, supported runtimes and the consumer's version cohort remain part of any adoption decision. The Centrifugo-specific edition and release comparison is recorded separately below.

## Scale: what needs to be measured

Millions of lines do not imply millions of live services, and thousands of agent executions do not require a new composition graph for every helper. The existing [composition/scale study](composition-and-scale-evidence.md) retains dated historical bounds; this research does not silently update those measurements.

| Scale axis | Representative workload | Required evidence |
| --- | --- | --- |
| Source/type graph | Cold/warm checks; leaf implementation change; shared public-type change; compiler/config change | Checked-file coverage, peak RSS, critical path, type/declaration fan-out and editor behavior |
| Composition/resources | Chains, broad graphs, repeated diamonds, failed/interrupted construction | Identity/sharing, acquisition counts, release order and bounded graph/fixture limits |
| Runtime traffic | Real payload sizes, slow clients, tenant skew, burst admission and reconnect storm | Latency distribution, queue age/count/bytes, memory plateau, cleanup progress and saturation behavior |
| Durable work | Worker kill, network ambiguity, redelivery, waiting-work version change | Persistent identity, checkpoint/reconciliation, duplicate handling and owner fencing |
| Agent-assisted change | New feature, public-contract change, moved file and stale plan | Correct owner selection, rejecting diagnostics, complete selected checks and reviewable receipts |

TypeScript project references can create useful declaration/build boundaries, but released stack-toolchain's read-only check rejects them. Any graph-build pilot is a separate build-owner proposal and must retain complete semantic checking. Stale declarations, skipped downstream tasks or noCheck cannot count as faster equivalent verification. [Project references][typescript-references], [current tool contract][development-tools].

Use repeated measurements on the same representative environment and preserve failure bounds. No universal wall-clock promise or synthetic architecture-quality score is justified by these source reads.

## Prioritized bounded proposals

These are **future options**, not implementation performed by this PR. Estimates count handwritten TypeScript, fixtures and configuration; exclude generated/vendor code and assume existing interfaces can be reused. Confidence is a judgment about fit, not measured reliability. Reliability leverage describes the failure class addressed. Re-estimate after inspecting the named consumer.

| Priority / proposal | Owner and approximate size | Complexity / reliability leverage / confidence | Acceptance and stopping condition |
| --- | --- | --- | --- |
| P0: activation/coverage inventory for one real consumer | Consumer + EF/FMS; 0–150 TS LOC, 150–350 fixture/config/doc LOC | Low; high for silent boundary omissions; high | Record active commands/profiles and existing negative fixtures. Stop if already proven; implement only a confirmed missing case. |
| P1: exact TypeScript 7 Effect diagnostic pilot | Toolchain owner; 50–150 adapter/config LOC, 150–350 fixture LOC | Low–medium; high for recurring semantic mistakes; medium | Pin supported compiler; test diagnostic exit status, exact allowlist and incompatible fallback. Reject silent engine substitution or disproportionate duplicate-check cost. |
| P1: one FE/BE state and cancellation slice | Application; 100–300 adapter LOC, 250–600 fixture LOC | Medium; high for stale state and resource leaks; medium | Existing transport/Centrifugo/Query or Atom owner; real abort, two identities, stale generation, reconnect/resnapshot. Extract only the repeated contract. |
| P2: one durable intent/outbox boundary | Application persistence/delivery owner; 100–300 integration LOC, 300–700 failure-fixture LOC | Medium–high; high for duplicate/uncertain effects; medium | Real database and worker restart; existing JetStream/Temporal; external idempotency check. Stop if equivalent path already exists. |
| P2: representative source/change-graph measurement | Consumer build owner; 50–150 harness LOC, 100–250 fixture/config LOC | Medium; medium for performance, high for coverage; medium | Cold/warm and shared-type cases with complete coverage. Propose references/build changes only after measured benefit. |

No mandatory new package follows from a pilot. A small shared client lifecycle or keyed-execution contract may be worth extracting if its semantics repeat. It must preserve owner-specific policy, disposal and idempotency rather than becoming a generic Manager. An expected shared need can justify library-first work under the existing extraction invariant.

## Centrifugo: reuse the SDK and preserve the application guarantees

### Released recovery support already exists

The inspected released pair is server 6.10.3 and JavaScript SDK 5.8.0. The getState callback was introduced in SDK 5.6.0; the SDK's API declares server >=6.8.0 as its feature prerequisite. These are feature/release facts, not confirmation of a particular application's installed versions. A consumer should qualify its exact supported pair and namespace history/recovery settings. [Server release][cf-server-release], [SDK release][cf-sdk-release], [API contract][cf-types].

The SDK loads application state when it has no saved position, attempts recovery first on ordinary reconnect, and reloads state after an unrecoverable-position response. This supplies a ready reconnect/recovery owner. An Effect adapter can own client/subscription lifetime and its Promise boundary without adding another transport retry loop. getState works with ordinary history/recovery; it does not require the PostgreSQL broker. [Subscription implementation][cf-subscription], [getState fixtures][cf-tests].

### Position-first closes a gap but can create overlap

The documented order captures stream position before reading application state. Our inference is that the captured position is only a lower bound unless the snapshot has an exact consistent watermark. Consider position 10, then event 11 increments a counter, then the snapshot already includes that increment. Replaying event 11 and accepting every offset greater than 10 increments it again. Filtering only against the captured lower bound does not deduplicate this overlap. [Official explanation][cf-state-blog].

Use versioned/idempotent domain updates, represented event identities, or an exact agreed snapshot watermark. A transport epoch/offset is distinct from an entity's business revision. A lagging snapshot replica can also return state older than the captured prefix. A database transaction does not make a separate Redis/history API read atomic; a precise watermark requires the relevant state and publication boundary to share the required consistency guarantees. These are derived application conditions, not a demonstrated SDK defect.

### The application still owns authorization, stale callbacks and committed state

The SDK checks whether a subscribe flow became stale after getState finishes. It cannot undo a callback's earlier UI/cache mutation. getState runs before subscription-token acquisition and has no AbortSignal parameter. The application's snapshot endpoint must authorize principal/tenant/channel independently; the application must cancel or invalidate old loads before applying them. Persistent authorization denial also needs a stopping policy rather than indefinite temporary-error retry. [Implementation][cf-subscription].

The SDK advances publication position after synchronous event delivery; it does not await an asynchronous application reducer or persistence Promise. A callback that only enqueues work has not yet committed that state. Prefer a synchronous versioned reducer where practical. Otherwise own a bounded apply queue and invalidate/resnapshot on failure instead of pretending that SDK position proves application completion. Persist snapshot and its corresponding application checkpoint consistently. This is where T3's owner/generation and data/cursor patterns remain useful without another broker.

### PostgreSQL transactional publishing is a separate option

The PostgreSQL stream broker supports transactional publishing in OSS, but current documentation marks it experimental and requires PostgreSQL 16+. OSS broker selection is global; per-namespace selection, replica reads and broker fan-out are PRO features. Independent node polling increases database read load. Direct SQL publishing has retention defaults separate from API-applied namespace settings. These costs make broker migration a separate infrastructure decision; it is not a prerequisite for SDK reuse. [Engine contract][cf-engines], [transactional SQL][cf-sql].

### Minimal consumer proof

Qualify snapshot overlap and stale business versions; expired history/changed epoch; ordinary reconnect without snapshot; recovery failure with reload; tenant switch; a cancelled snapshot that returns late; asynchronous apply failure; and disposal during catch-up. Namespace publication-count limits do not bound decoded heap or application queues. Snapshot admission and history duration must avoid a recovery loop when snapshots are slower than the recovery window. [Namespace options][cf-namespace], [recovery fixtures][cf-tests].

The recommendation is official SDK reuse plus application guards. JetStream remains durable integration delivery and Temporal remains durable workflow progress in consumers that adopt those roles.

## Review record and delivery evidence

The initial commit recorded the scope, plan and existing authorities before detailed synthesis. The research follows two critique rounds: the first challenges source observations and architectural transfer; the second reviews this integrated document and its claims. This section records results when each round completes; uncompleted review is not represented as a pass.

Round 1 has already produced substantive narrowing incorporated above:

- T3's retained RPC budget does not cover unbounded internal-worker subscriptions.
- OpenCode's request budget governs the headers phase and has an event-path bypass.
- Foundation's full capability and public graph adapter have different alias-resolution contracts.
- The current EF tsrs/Oxlint cohort differs from @effect/tsgo's supported builds; TypeScript 7.0.2 support alone is not drop-in qualification.
- Source graph facts do not semantically establish state ownership, SSR correctness or Effect diagnostic enforcement.
- Expected multi-repository reuse does not require waiting for two real implementations.
- Native compiler/project-reference experiments must remain outside the released read-only checker contract.

Executed so far: repository-pinned Docs Protocol preview/apply and pnpm check, with complete catalog/adoption validation for 38 documents on the initial plan commit. Detailed final-check and PR receipts will be added after synthesis review. Upstream suites, production traffic, application migration, runtime implementation and npm publication were not executed for this study.

## Relationship to existing lessons and remaining unknowns

This study strengthens MR-13/14 and GP-07/08 (effect identity/uncertainty), MR-15 (acknowledgement versus release), MR-17 (ownership/fencing before effects), MR-24 (authorization at cached/live delivery), and MR-03/04 with GP-09 (real composition boundaries). Those identities remain in the [existing lesson map](../lessons/patterns-and-failure-lessons.md). No new global taxonomy is needed.

Unknowns include actual consumer activation and pinned deployment versions; workload and payload distributions; provider-side cancellation/idempotency; full process custody across target operating systems; compiler/bundle costs on representative applications; and correctness of product domain boundaries. These require owner-local evidence. The research provides specific choices and rejecting cases without turning unknowns into claims of defects or guarantees.

## Primary sources

### Existing owners and current contracts

[ef-ownership]: https://github.com/agent-teams-ai/engineering-foundation/blob/e38d8444f74cceef37c366f4e28ed1918b214d4a/docs/architecture/ownership.md
[ef-capabilities]: https://github.com/agent-teams-ai/engineering-foundation/blob/e38d8444f74cceef37c366f4e28ed1918b214d4a/docs/architecture/executable-capabilities.md
[ef-manifest]: https://github.com/agent-teams-ai/engineering-foundation/blob/e38d8444f74cceef37c366f4e28ed1918b214d4a/pnpm-workspace.yaml
[ef-observe-graph]: https://github.com/agent-teams-ai/engineering-foundation/blob/e38d8444f74cceef37c366f4e28ed1918b214d4a/packages/engineering-foundation/src/capabilities/source-dependencies/application/use-cases/observe-source-graph.ts
[ef-graph-tests]: https://github.com/agent-teams-ai/engineering-foundation/blob/e38d8444f74cceef37c366f4e28ed1918b214d4a/tests/source-graph.test.mjs
[fms-disk]: https://github.com/agent-teams-ai/engineering-foundation/blob/e38d8444f74cceef37c366f4e28ed1918b214d4a/packages/feature-module-standard/src/features/node-runner/composition/check-feature-module-on-disk.ts
[fms-runner]: https://github.com/agent-teams-ai/engineering-foundation/blob/e38d8444f74cceef37c366f4e28ed1918b214d4a/packages/feature-module-standard/src/features/node-runner/application/run-feature-module-check.ts
[fms-readme]: https://github.com/agent-teams-ai/engineering-foundation/blob/e38d8444f74cceef37c366f4e28ed1918b214d4a/packages/feature-module-standard/README.md
[backend-stack]: https://github.com/agent-teams-ai/.github/blob/0b44c64c824f536bd1b085341e7669bcc64ef124/docs/backend-stack.md
[development-tools]: https://github.com/agent-teams-ai/.github/blob/0b44c64c824f536bd1b085341e7669bcc64ef124/docs/development-tools.md
[gm-practices]: https://github.com/agent-teams-ai/get-modular/blob/6c91ff1c3c8ce7088db215af9705f7ee3a9db103/packages/effect/docs/practices.md

### T3 Code and OpenCode

[t3-versions]: https://github.com/pingdotgg/t3code/blob/5f95653f25ae0f5655145fa83d94d618c2951432/pnpm-workspace.yaml
[t3-commit]: https://github.com/pingdotgg/t3code/blob/5f95653f25ae0f5655145fa83d94d618c2951432/apps/server/src/orchestration-v2/EventSink.ts
[t3-recovery]: https://github.com/pingdotgg/t3code/blob/5f95653f25ae0f5655145fa83d94d618c2951432/apps/server/src/orchestration-v2/EffectOutbox.ts
[t3-receipt-test]: https://github.com/pingdotgg/t3code/blob/5f95653f25ae0f5655145fa83d94d618c2951432/apps/server/src/orchestration-v2/Orchestrator.receipt-race.test.ts
[t3-overview]: https://github.com/pingdotgg/t3code/blob/5f95653f25ae0f5655145fa83d94d618c2951432/docs/internals/overview.md
[t3-budget]: https://github.com/pingdotgg/t3code/blob/5f95653f25ae0f5655145fa83d94d618c2951432/apps/server/src/orchestration-v2/LiveStreamBudget.ts
[t3-replay]: https://github.com/pingdotgg/t3code/blob/5f95653f25ae0f5655145fa83d94d618c2951432/apps/server/src/orchestration-v2/ThreadStream.ts
[t3-client-layout]: https://github.com/pingdotgg/t3code/blob/5f95653f25ae0f5655145fa83d94d618c2951432/packages/client-runtime/README.md
[t3-connection]: https://github.com/pingdotgg/t3code/blob/5f95653f25ae0f5655145fa83d94d618c2951432/docs/internals/connection-runtime.md
[t3-cache]: https://github.com/pingdotgg/t3code/blob/5f95653f25ae0f5655145fa83d94d618c2951432/packages/client-runtime/src/state/threads.ts
[t3-cache-tests]: https://github.com/pingdotgg/t3code/blob/5f95653f25ae0f5655145fa83d94d618c2951432/packages/client-runtime/src/state/threads-sync.test.ts
[t3-session-stamp]: https://github.com/pingdotgg/t3code/blob/5f95653f25ae0f5655145fa83d94d618c2951432/packages/client-runtime/src/rpc/client.ts
[t3-auth]: https://github.com/pingdotgg/t3code/blob/5f95653f25ae0f5655145fa83d94d618c2951432/apps/server/src/auth/RpcAuthorization.ts
[t3-orchestrator]: https://github.com/pingdotgg/t3code/blob/5f95653f25ae0f5655145fa83d94d618c2951432/apps/server/src/orchestration-v2/Orchestrator.ts
[oc-versions]: https://github.com/anomalyco/opencode/blob/83960f8a56b2f2b8ad0b751f23baaf9d0eb65ad9/package.json
[oc-event-contract]: https://github.com/anomalyco/opencode/blob/83960f8a56b2f2b8ad0b751f23baaf9d0eb65ad9/packages/protocol/src/groups/event.ts
[oc-event-feed]: https://github.com/anomalyco/opencode/blob/83960f8a56b2f2b8ad0b751f23baaf9d0eb65ad9/packages/server/src/event-feed.ts
[oc-coordinator]: https://github.com/anomalyco/opencode/blob/83960f8a56b2f2b8ad0b751f23baaf9d0eb65ad9/packages/core/src/session/run-coordinator.ts
[oc-coordinator-tests]: https://github.com/anomalyco/opencode/blob/83960f8a56b2f2b8ad0b751f23baaf9d0eb65ad9/packages/core/test/session-run-coordinator.test.ts
[oc-instance]: https://github.com/anomalyco/opencode/blob/83960f8a56b2f2b8ad0b751f23baaf9d0eb65ad9/packages/core/src/instance.ts
[oc-worktree]: https://github.com/anomalyco/opencode/blob/83960f8a56b2f2b8ad0b751f23baaf9d0eb65ad9/packages/core/src/worktree.ts
[oc-process-owner]: https://github.com/anomalyco/opencode/blob/83960f8a56b2f2b8ad0b751f23baaf9d0eb65ad9/packages/process-daemon/src/ownership.rs
[oc-process-limits]: https://github.com/anomalyco/opencode/blob/83960f8a56b2f2b8ad0b751f23baaf9d0eb65ad9/packages/process-daemon/README.md
[oc-queue]: https://github.com/anomalyco/opencode/blob/83960f8a56b2f2b8ad0b751f23baaf9d0eb65ad9/packages/app/src/runtime/server/request-queue-machine.ts
[oc-queue-interpreter]: https://github.com/anomalyco/opencode/blob/83960f8a56b2f2b8ad0b751f23baaf9d0eb65ad9/packages/app/src/runtime/server/request-queue.ts
[oc-queue-tests]: https://github.com/anomalyco/opencode/blob/83960f8a56b2f2b8ad0b751f23baaf9d0eb65ad9/packages/app/src/runtime/server/request-queue-machine.test.ts
[oc-import-tests]: https://github.com/anomalyco/opencode/blob/83960f8a56b2f2b8ad0b751f23baaf9d0eb65ad9/packages/client/test/import-boundaries.test.ts

### Effect, frontend and durable execution

[effect-version]: https://github.com/Effect-TS/effect/blob/289a53f7b1fc40049219c6e69022db2fb859c356/packages/effect/package.json
[effect-stability]: https://effect.website/blog/effect-4-first-week
[effect-core]: https://github.com/Effect-TS/effect/blob/289a53f7b1fc40049219c6e69022db2fb859c356/packages/effect/src/Effect.ts
[effect-layer]: https://github.com/Effect-TS/effect/blob/289a53f7b1fc40049219c6e69022db2fb859c356/packages/effect/src/Layer.ts
[effect-runtime]: https://github.com/Effect-TS/effect/blob/289a53f7b1fc40049219c6e69022db2fb859c356/packages/effect/src/ManagedRuntime.ts
[effect-platform]: https://github.com/Effect-TS/effect/tree/289a53f7b1fc40049219c6e69022db2fb859c356/packages/platform
[effect-http]: https://github.com/Effect-TS/effect/blob/289a53f7b1fc40049219c6e69022db2fb859c356/packages/effect/src/http-api/HttpApi.ts
[effect-rpc]: https://github.com/Effect-TS/effect/blob/289a53f7b1fc40049219c6e69022db2fb859c356/packages/effect/src/rpc/Rpc.ts
[effect-sql]: https://github.com/Effect-TS/effect/blob/289a53f7b1fc40049219c6e69022db2fb859c356/packages/effect/src/sql/SqlClient.ts
[effect-sql-tests]: https://github.com/Effect-TS/effect/blob/289a53f7b1fc40049219c6e69022db2fb859c356/packages/effect/test/sql/SqlClient.test.ts
[effect-pg-tests]: https://github.com/Effect-TS/effect/blob/289a53f7b1fc40049219c6e69022db2fb859c356/packages/sql/pg/test/Client.integration.test.ts
[effect-workflow]: https://github.com/Effect-TS/effect/blob/289a53f7b1fc40049219c6e69022db2fb859c356/packages/effect/src/workflow/WorkflowEngine.ts
[effect-cluster-tests]: https://github.com/Effect-TS/effect/blob/289a53f7b1fc40049219c6e69022db2fb859c356/packages/effect/test/cluster/ClusterWorkflowEngine.test.ts
[atom-manifest]: https://github.com/Effect-TS/effect/blob/289a53f7b1fc40049219c6e69022db2fb859c356/packages/atom/react/package.json
[atom-hooks]: https://github.com/Effect-TS/effect/blob/289a53f7b1fc40049219c6e69022db2fb859c356/packages/atom/react/src/Hooks.ts
[atom-registry]: https://github.com/Effect-TS/effect/blob/289a53f7b1fc40049219c6e69022db2fb859c356/packages/atom/react/src/RegistryContext.ts
[atom-tests]: https://github.com/Effect-TS/effect/blob/289a53f7b1fc40049219c6e69022db2fb859c356/packages/atom/react/test/index.test.tsx
[query-cancellation]: https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation
[xstate-persistence]: https://stately.ai/docs/persistence
[temporal-workflows]: https://docs.temporal.io/develop/typescript/workflows/basics
[temporal-activities]: https://docs.temporal.io/develop/typescript/activities/basics
[restate-steps]: https://docs.restate.dev/develop/ts/durable-steps
[inngest-steps]: https://www.inngest.com/docs/durable-execution/primitives
[bullmq-idempotency]: https://docs.bullmq.io/patterns/idempotent-jobs

### LiveStore, Alchemy and native compiler diagnostics

[livestore-changelog]: https://docs.livestore.dev/changelog/
[livestore-registry]: https://github.com/livestorejs/livestore/blob/54e5a23a29e2c48a8abeff2253fb314767c4243a/packages/@livestore/livestore/src/store/StoreRegistry.ts
[livestore-registry-tests]: https://github.com/livestorejs/livestore/blob/54e5a23a29e2c48a8abeff2253fb314767c4243a/packages/@livestore/livestore/src/store/StoreRegistry.test.ts
[livestore-react-tests]: https://github.com/livestorejs/livestore/blob/54e5a23a29e2c48a8abeff2253fb314767c4243a/packages/@livestore/react/src/useRcResource.test.tsx
[alchemy-layer]: https://github.com/alchemy-run/alchemy/blob/39de206fc21604cd051e1827d0723a16bddd58d2/packages/alchemy/src/Local/ProviderLayer.ts
[alchemy-destroy]: https://github.com/alchemy-run/alchemy/blob/39de206fc21604cd051e1827d0723a16bddd58d2/packages/alchemy/test/destroy-robustness.test.ts
[alchemy-fix]: https://github.com/alchemy-run/alchemy/commit/39de206fc21604cd051e1827d0723a16bddd58d2
[alchemy-release]: https://github.com/alchemy-run/alchemy/releases/tag/v2.0.0-beta.87
[effect-legacy-tool]: https://github.com/Effect-TS/language-service/blob/cb91d700a10e86de46d57b94261d4dcc9c92fc20/README.md
[effect-tsgo]: https://github.com/Effect-TS/tsgo/blob/416fdf299111341e156fc94330cd481470494ac6/README.md
[effect-tsgo-upstream]: https://github.com/Effect-TS/tsgo/blob/416fdf299111341e156fc94330cd481470494ac6/_packages/tsgo/upstream.json
[effect-leak-rule]: https://github.com/Effect-TS/tsgo/blob/416fdf299111341e156fc94330cd481470494ac6/docs/rules/api-stability-leak.md
[effect-usage-rule]: https://github.com/Effect-TS/tsgo/blob/416fdf299111341e156fc94330cd481470494ac6/docs/rules/unstable-api-usage.md
[effect-surface-test]: https://github.com/Effect-TS/tsgo/blob/416fdf299111341e156fc94330cd481470494ac6/testdata/tests/effect-v4/apiStabilityLeakBoundaries.ts

### Source boundaries, packages, verification and agents

[vscode-layer]: https://github.com/microsoft/vscode/blob/1f075c5608e3d2309110539b30eefd71f375ffa0/.eslint-plugin-local/code-layering.ts
[vscode-imports]: https://github.com/microsoft/vscode/blob/1f075c5608e3d2309110539b30eefd71f375ffa0/.eslint-plugin-local/code-import-patterns.ts
[vscode-agents]: https://github.com/microsoft/vscode/blob/1f075c5608e3d2309110539b30eefd71f375ffa0/AGENTS.md
[backstage-modules]: https://backstage.io/docs/backend-system/architecture/modules/
[backstage-init]: https://github.com/backstage/backstage/blob/1c7591200a140f026e128dda3dea420f55d9fc10/packages/backend-app-api/src/wiring/BackendInitializer.ts
[backstage-agents]: https://github.com/backstage/backstage/blob/1c7591200a140f026e128dda3dea420f55d9fc10/AGENTS.md
[backstage-copilot]: https://github.com/backstage/backstage/blob/1c7591200a140f026e128dda3dea420f55d9fc10/.github/copilot-instructions.md
[nx-lock]: https://github.com/nrwl/nx/blob/2b305ee85b8db033e4ab998f31282cbff66ac2a8/packages/nx/src/plugins/js/project-graph/affected/lock-file-changes.ts
[nx-packages]: https://github.com/nrwl/nx/blob/2b305ee85b8db033e4ab998f31282cbff66ac2a8/packages/nx/src/plugins/js/project-graph/affected/npm-packages.ts
[nx-inputs]: https://github.com/nrwl/nx/blob/2b305ee85b8db033e4ab998f31282cbff66ac2a8/packages/nx/src/hasher/task-hasher.ts
[rush-runner]: https://github.com/microsoft/rushstack/blob/c2acd010079c6c08e63ba25d0b136ed2c1b16ccd/apps/api-extractor/package.json
[rush-model]: https://github.com/microsoft/rushstack/blob/c2acd010079c6c08e63ba25d0b136ed2c1b16ccd/libraries/api-extractor-model/package.json
[rush-cache]: https://github.com/microsoft/rushstack/blob/c2acd010079c6c08e63ba25d0b136ed2c1b16ccd/libraries/rush-lib/src/api/RushProjectConfiguration.ts
[api-extractor-invoking]: https://api-extractor.com/pages/setup/invoking/
[typescript-paths]: https://www.typescriptlang.org/docs/handbook/modules/reference#paths-should-not-point-to-monorepo-packages-or-node_modules-packages
[typescript-references]: https://www.typescriptlang.org/docs/handbook/project-references
[node-exports]: https://nodejs.org/api/packages.html#package-entry-points
[knip-config]: https://knip.dev/reference/configuration

### Centrifugo released SDK and broker distinction

[cf-server-release]: https://github.com/centrifugal/centrifugo/releases/tag/v6.10.3
[cf-sdk-release]: https://github.com/centrifugal/centrifuge-js/releases/tag/5.8.0
[cf-types]: https://github.com/centrifugal/centrifuge-js/blob/163dcbab9d5e23f41d1142e4631bcbabc2e2f62f/src/types.ts
[cf-subscription]: https://github.com/centrifugal/centrifuge-js/blob/163dcbab9d5e23f41d1142e4631bcbabc2e2f62f/src/subscription.ts
[cf-tests]: https://github.com/centrifugal/centrifuge-js/blob/163dcbab9d5e23f41d1142e4631bcbabc2e2f62f/src/getstate.test.ts
[cf-state-blog]: https://github.com/centrifugal/centrifugal.dev/blob/69da71466274f741bfe924bbf4a62a9124ec5776/blog/2026-07-27-app-owned-state-stream-subscriptions.md
[cf-engines]: https://github.com/centrifugal/centrifugal.dev/blob/69da71466274f741bfe924bbf4a62a9124ec5776/docs/server/engines.md
[cf-sql]: https://github.com/centrifugal/centrifugo/blob/4b6d86e23452a6fa1bd424ffe4526862efae85b8/internal/pgstreambroker/internal/sql/schema.sql
[cf-namespace]: https://github.com/centrifugal/centrifugo/blob/4b6d86e23452a6fa1bd424ffe4526862efae85b8/internal/configtypes/namespace.go
