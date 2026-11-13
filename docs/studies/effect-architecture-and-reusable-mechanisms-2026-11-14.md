---
id: research.studies.effect-architecture-2026-11-14
type: study
status: active
owner: research/maintainers
summary: Critical source research on modular frontend and backend architecture, Effect, existing Foundation mechanisms and bounded reuse proposals.
---

# Effect Architecture and Reusable Mechanisms 2026-11-14

## Scope and status

This study is a dated investigation of reusable architecture mechanisms for large modular TypeScript applications, including frontend, backend and agent-assisted development. The research date is 2026-11-14 in the requester's timezone; source observations began on 2026-11-13 UTC. It is research, not an adopted product architecture or a claim that an application has passed a capacity test.

The user assigned npm publication to a separate agent. This work covers evidence, critical comparison and owner-specific proposals. It does not authorize publication, production migration, a new runtime inside Engineering Foundation, or replacement of the adopted backend stack.

The principal question is which existing mechanisms remove work or prevent failures without introducing competing owners. Effect is assessed both as a frontend/backend execution model and as an ecosystem whose individual integrations require separate qualification. Source scale, resource-graph scale and concurrent production workload are treated independently.

## Research plan and evidence rules

1. Inspect pinned T3 Code and OpenCode source for composition, state, transactions, reconnect, bounded queues and process lifetime. Record useful mechanisms together with counterexamples.
2. Inspect Effect and substantial ecosystem consumers, including LiveStore and Alchemy. Separate released artifacts, current source, API stability, inspected tests and tests actually executed.
3. Inspect large-codebase enforcement in VS Code, Backstage and the existing Nx/toolchain ecosystem. Compare those mechanisms with the Foundation's current capabilities before proposing additions.
4. Reconcile findings with the organization's accepted stack and existing research. Assign each proposal to Foundation tooling, an opt-in architecture profile, Get Modular composition, a separate runtime library, or the application.
5. Challenge the synthesis in at least two review rounds: first for factual evidence and counterexamples, then for ownership, duplication and qualification requirements. Record unresolved limits rather than turning them into implementation claims.
6. Run this repository's documentation checks, publish a reviewable research PR, and distinguish its validation from future consumer qualification.

Evidence classes used in the completed study will be **source**, **documentation**, **inspected test**, **executed check**, **inference**, and **unknown**. Reading an upstream test establishes what its assertions cover; it does not establish a successful run here. Package presence in a catalog does not establish consumer adoption. A failed search does not establish absence. Popularity and line count are discovery signals, not quality or throughput evidence.

## Evidence and counterevidence

### Existing owner constraints

- Engineering Foundation provides reusable development and architecture-validation capabilities. Consumers retain product policy, accepted decisions and qualification. Its core is architecture-neutral; Feature Module Standard is an opt-in profile. Source-boundary extraction, public API checks and dependency declaration checks already exist and must be examined before introducing another checker.
- Get Modular owns composition. Application state, durable workflows, process custody and transport protocols have their own owners. Native Effect integration does not move these responsibilities into GM.
- The accepted backend stack assigns public HTTP/RPC to Fastify/Connect, process-boundary schemas to Protobuf/Buf, durable messaging to the official NATS JetStream SDK, database adapters to Postgres/node-postgres/Drizzle, durable workflows to Temporal, and realtime delivery to Centrifugo. Effect can participate inside these boundaries without replacing them.
- The TypeScript compiler/parser floor is 7.0.2, including embedded tool engines. A compatible top-level TypeScript dependency is insufficient evidence about another tool's embedded compiler. The released read-only stack-toolchain path rejects project references; a graph-build experiment would be a separate consumer decision.
- Shared extraction may be justified by concrete expected multi-repository reuse. It still requires a real consumer, disposable projects, parity evidence and conformance for adopters; repeated syntax alone does not establish a shared semantic contract.

These constraints are pinned in the source ledger below. They guide the comparison and are not new decisions made by this study.

### Initial observations under synthesis

The parallel investigations have identified useful evidence about transaction/outbox boundaries in T3 Code, volatile subscriber semantics and cleanup coordination in OpenCode, per-export stability and transaction fixtures in Effect, store identity in LiveStore, reconciliation failure retention in Alchemy, and complete source classification in VS Code. Each observation still needs the explicit tradeoff, owner and rejecting proof recorded in the final synthesis.

Current evidence already rules out treating every Effect package as equally stable, interpreting an in-memory restart test as durable recovery, or treating a concurrency limit as a bound on waiting requests and bytes. None of these observations is evidence of a defect in a user repository without a corresponding consumer check.

## Implications and limits

The intended output is a prioritized research recommendation with ready-made alternatives and bounded qualification proposals. It is not an implementation backlog automatically assigned to every repository. Existing Get Modular E2E acceptance remains a separate evidence set; future application integration tests must not be presented as unfinished library acceptance.

This initial commit preserves the scope, method and existing authority before the detailed source synthesis is completed. Runtime tests, source changes to applications and production capacity tests are outside this documentation change. The final study will record the exact checks executed for the research PR and will retain unknowns about deployment versions, workload and consumer adoption.

## Sources

- [Engineering Foundation ownership, e38d844](https://github.com/agent-teams-ai/engineering-foundation/blob/e38d8444f74cceef37c366f4e28ed1918b214d4a/docs/architecture/ownership.md).
- [Engineering Foundation executable capabilities, e38d844](https://github.com/agent-teams-ai/engineering-foundation/blob/e38d8444f74cceef37c366f4e28ed1918b214d4a/docs/architecture/executable-capabilities.md).
- [Accepted backend stack, 0b44c64](https://github.com/agent-teams-ai/.github/blob/0b44c64c824f536bd1b085341e7669bcc64ef124/docs/backend-stack.md).
- [Development tools and supported adoption profiles, 0b44c64](https://github.com/agent-teams-ai/.github/blob/0b44c64c824f536bd1b085341e7669bcc64ef124/docs/development-tools.md).
- [Engineering quality standard, 0b44c64](https://github.com/agent-teams-ai/.github/blob/0b44c64c824f536bd1b085341e7669bcc64ef124/docs/engineering-quality-standard.md).
- [Existing composition and scale evidence](composition-and-scale-evidence.md).
- [Existing architecture follow-through and owner boundaries](architecture-follow-through-from-autogpt-and-memory.md).
- [Existing modularity and extension contracts](../technologies/modularity-and-extension-contracts.md).
- [Existing pattern and failure lessons](../lessons/patterns-and-failure-lessons.md).
