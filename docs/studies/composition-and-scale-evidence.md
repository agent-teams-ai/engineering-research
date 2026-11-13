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
