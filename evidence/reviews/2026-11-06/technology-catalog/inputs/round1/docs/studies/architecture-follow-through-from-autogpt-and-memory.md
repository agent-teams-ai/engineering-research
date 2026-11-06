---
id: research.studies.architecture-follow-through
type: study
status: active
owner: research/maintainers
summary: Critical owner-specific documentation proposals, existing coverage and rejected architecture expansion after the AutoGPT and memory SDK audits.
---

# Architecture Follow Through from AutoGPT and Memory

## Finding and decision boundary

The evidence supports a small clarification of existing boundaries, not another architectural subsystem. AutoGPT supplies useful examples of schema-based integration authoring, explicit uncertainty, content identity, scoped memory clients and difficult cleanup. The selected Agent Teams plans already assign owners for most corresponding risks. Extracting a memory SDK should preserve those owners while making its independent-consumer contract easier to understand.

This is research recorded on 2026-11-06. Proposed wording below is ready to adapt, but has not been applied to product documents or accepted as an ADR. Runtime means the **architecture PROGRAM v3** at `ab0387c`, including ordinary S1–S5; C0–C3 remains a separate capacity follow-up. Orchestrator is pinned at `5a8496c`, Platform at `7f6eb37`, Get Modular at `5fb8347`, ReviewRouter at `9a416df` and AutoGPT at `9cb76f9`. Links preserve the complete commit identities.

The practical recommendation is to retain the existing memory mechanism library, document three seams, and scope any extraction separately. No result here selects Graphiti, changes the existing Hindsight direction, accepts a public plugin API, upgrades Get Modular, adds a rollout flag or creates another scheduler, authorization service or memory engine.

## Boundaries that already answer the architectural questions

| Owner | Existing responsibility | Consequence for a memory SDK |
| --- | --- | --- |
| Runtime ordinary operations, Agent Execution, Provider Access, Runtime Security and Host | Durable execution identity, claim/dispatch, technical admission, credential custody, physical lifecycle and cleanup | A memory transport library cannot acquire execution authority through construction or decide product recovery policy. Unknown effects retain their existing owner. [Runtime owner table][runtime-owners] |
| Orchestrator Agent Context | Purpose-relative selection, provenance, immutable manifests and materialization evidence | It consumes disclosed source facts; it does not become the Memory, authorization or Run-activation owner. Generalized memory/RAG is outside its admitted initial slice. [ADR-0073][agent-context] |
| Future Orchestrator Memory capability | Scope, retention, provenance, forgetting, permissions and consistency require an explicit model | A reusable SDK is not acceptance of that supporting subdomain. The current prohibition on a global mutable memory store still applies. [Memory boundary][memory-boundary] |
| Platform | Product-owned commercial/tenant decisions and consumer-owned adapters to external contracts | It must not duplicate Orchestrator/Runtime authorities or access their databases. A strategically named context is not a materialized feature. [External ownership][platform-owners], [materialization scope][platform-scope] |
| ReviewRouter Memory feature | Approval, source applicability, revision, quotas, durable delivery, admission and cleanup verification | These remain product responsibilities when native transport mappings move to a reusable package. Current knowledge is not reconstructed from product metadata. [Feature contract][rr-feature] |
| Native memory provider | The selected profile's current content, indexing and retrieval mechanisms | An SDK exposes the provider's actual guarantees and unavailable capabilities; it does not emulate missing semantics with prompts. [SDK contract][rr-sdk] |

These are substantive existing constraints. Runtime already forbids automatic mutation retry after uncertain claim/effect outcomes and distinguishes cancellation, drain and cleanup. Its storage lifetime contract explicitly prevents a borrowing Host from closing the embedder's storage. Orchestrator already rechecks disclosure authority and excludes sensitive prompts from normal events and telemetry. Repeating these requirements in a new generic MemoryManager would obscure ownership rather than improve it. [Runtime invariants][runtime-owners], [storage lifetime][runtime-storage], [context disclosure][context-disclosure]

The Platform boundary also supports deliberate library-first design for a concrete shared mechanism, validated by a disposable consumer and at least one real consumer. It does not require first duplicating the mechanism in two production systems. Conversely, expected reuse does not make commercial policy, approval rules or owner-local transactions portable. [Reuse rule][platform-reuse]

## Classify the change before drafting it

| Candidate | Classification | Target or next owner |
| --- | --- | --- |
| Redefine Agent Context as a memory owner | **Reject** | ADR-0073 already excludes that ownership; no change to its accepted decision |
| Locate reusable memory mechanisms within the future memory boundary | **Precise clarification** | Orchestrator `docs/architecture/extension-points.md`, Memory section |
| Explain SDK mutation errors that can follow remote submission | **Precise clarification** | ReviewRouter `packages/context-memory/README.md` and the `ExactStatementWriter` documentation in `src/contracts.ts` |
| Distinguish reusable Hindsight preview from the selected product preview | **Precise clarification** | The SDK README, linked to existing ADR-034; no retroactive ADR edit |
| Add durable intent, uncertainty and borrowed-resource rules | **Already covered; no architectural edit** | Existing Runtime v3 and owning product contracts; retain concrete counterexamples with relevant adapter tests |
| Add one Host-side Get Modular entry for a genuinely replaceable provider | **Separate bounded packaging spike** | The consuming Host's composition adapter and adopted profile |
| Add a graph node per method, global registry, hot swap or dynamic plugin kernel | **Reject / outside scope** | No demonstrated SDK need; public SPI/lifecycle choices remain deferred |
| Compare Graphiti with the selected Hindsight profile | **Separate research** | Memory technology study, with retrieval, provenance, forgetting, inference cost and operational criteria |
| Add Platform memory/IAM entities or expand ordinary v3 with C0–C3 | **Outside scope** | Their own accepted slice/decision owners; no speculative implementation estimate |

The memory extraction and product adoption are different decisions. A useful package can be prepared for reuse without turning every current product into a consumer or accepting every capability that an upstream library offers.

## Three proposed narrow wordings

### 1. Locate the SDK without selecting a new memory domain

**Target:** Orchestrator `docs/architecture/extension-points.md`, after the existing Memory paragraph. Keep the accepted ADR-0073 and current Agent Context admission unchanged.

> A reusable Memory SDK may supply bounded provider capability contracts and native transport mappings. It is not the semantic Memory owner. A future Memory design must state separately which component owns current content and derived knowledge, and which owns approval, source applicability, revision, retention, erasure and publication. Agent Context consumes authorized, versioned contributions through published contracts. The SDK does not grant access, activate a Run, schedule extraction or expand the admitted Agent Context slice.

**Why this helps:** the existing paragraph identifies the future subdomain but does not explain how a reusable technical package relates to it. ReviewRouter provides a concrete example: a native content provider and a product approval/delivery owner can coexist without duplicating current content. The proposed text preserves that distinction without requiring every product to use ReviewRouter's exact approval model. [Existing paragraph][memory-boundary], [ReviewRouter split][rr-feature]

**Cost and downside:** this adds navigation, not a new guarantee. If no Orchestrator memory integration is selected, keeping the paragraph in this research is sufficient; it should not become a prerequisite for ordinary Runtime v3. Concrete retention policies and erasure/backup behavior remain with OD-029 and relevant data owners. No new package, retention duration or shared cleanup service follows from the wording. [OD-029][retention]

### 2. Explain uncertainty at the independent SDK boundary

**Targets:** `packages/context-memory/README.md`, next to exact replacement and operation observation; a short reference in `packages/context-memory/src/contracts.ts` beside `ExactStatementWriter`.

> `submitted` confirms native acceptance of the supplied operation identity; it does not confirm application publication. A `deadline` or `unavailable` error may occur after the retain request began and is not evidence that the write did not happen. Preserve the original operation identity and reconcile through the consumer's existing delivery owner and the provider's qualified observation protocol. Do not resubmit or allocate a new operation identity solely because the request failed or an operation lookup returned no record. The SDK does not own retry scheduling, revision CAS or durable recovery.

**Why this is concrete:** `HindsightMemoryStore.result()` checks the deadline after awaiting a response and maps transport failures to `deadline` or `unavailable`. `replaceSource()` uses that helper around `retainMemories`; the separate `unknown_write` code covers malformed or mismatched acceptance. Thus `unknown_write` is not the only error compatible with a potentially submitted write. This is a risk of consumer interpretation, not evidence that ReviewRouter currently duplicates writes. Its feature contract already marks claims unknown before provider I/O and permits resubmission only within a qualified native identity-retention profile. [Error mapping][rr-errors], [replacement][rr-write], [delivery owner][rr-feature]

**Optional later contract work:** explore explicit `not_submitted`, `submitted` and `unknown` outcomes. `not_submitted` must require proof that mutation was not dispatched; it cannot be inferred from a timeout, missing record or expired lease. Such a change affects public callers and implementers, so it is a separate compatibility decision. The immediate documentation clarification is smaller and does not add a retry engine.

The existing separation between native completion and product publication also remains important. The product provider port requires qualified body/topic/time readback for publication and separate trusted evidence for cleanup. Do not replace those contracts with one SDK boolean named success. [Provider outcome contract][rr-outcomes]

### 3. Distinguish the available preview adapter from the selected profile

**Target:** `packages/context-memory/README.md`, before the Hindsight preview example. Link the accepted-for-implementation successor; do not rewrite historical decisions.

> `HindsightSourcePreview` is a reusable adapter requiring independent profile qualification, not the selected extraction mechanism for every consumer. ReviewRouter's selected product profile is defined by ADR-034: it implements the product preview port through Account Gateway with the captured review account, while Hindsight remains the current-content provider. Extraction, content storage and physical cleanup have distinct capability and qualification boundaries. This library does not select accounts or grant paid inference authority.

ADR-034 retains exact-chunk statement storage, local embeddings/reranking and a selected Hindsight profile with native LLM, observations and automatic consolidation disabled. Conversational selection uses the product-owned preview port and captured account/model/policy tuple. Recommending native preview merely because the SDK contains an example would overlook this explicit successor. [ADR-034][rr-selected-preview]

This wording does not remove the reusable native adapter or declare it defective. It explains availability versus product selection, and implementation versus production qualification. A source pin or configuration boolean still cannot substitute for the exact profile evidence required by the adapter. [SDK preview conditions][rr-sdk]

## Reuse options and bounded costs

A coherent SDK can stay ordinary TypeScript: narrow capability contracts, mechanism factories and provider adapters. A consumer with independently selected implementations uses its adopted Get Modular composition boundary. Fixed helpers remain static imports; declarations and implementation selection stay outside domain/application code. A second production graph or direct fallback would violate the existing standard. [Get Modular consumer standard][gm-standard]

Resources is useful when a module actually acquires something disposable. Pure and borrow-only modules require no scope, and cooperative cleanup completion does not prove native jobs stopped or remote content was erased. The Host continues to own shutdown policy; a borrowed transport cannot be closed by the SDK. [Resources contract][gm-resources]

The following estimates are deliberately narrower than a complete extraction proposal. Reliability describes expected robustness of the stated approach, not an observed SLA; confidence describes support from inspected evidence; complexity increases with difficulty. LOC counts new or substantially changed handwritten TypeScript, excluding copied existing source, generated clients, infrastructure, data migration, native engine changes and product qualification. Overlapping ranges **must not be summed**.

| Bounded option | Reliability / confidence / complexity, /10 | Production LOC | Test LOC |
| --- | --- | --- | --- |
| Three documentation clarifications | 8 / 9 / 1 | 0 | 0 new code tests |
| Package/entry cleanup and one installed disposable consumer, preserving existing SDK behavior | 8 / 8 / 3 | 80–200 | 150–300 |
| One selected-provider Host-side Get Modular entry | 8 / 8 / 3 | 40–120 | 80–180 |
| Explicit submission-outcome refinement | 8 / 9 / 3 | 40–100 | 80–180 |

The packaging range excludes moving the existing 755 physical source lines and excludes a broader SDK hardening/migration option. It is not a competing total estimate for that option. If the public promise includes a provider-independent install, inspect its actual dependency closure: a subpath alone does not remove the native client from the package's required dependencies. No credible total can be assigned to an unspecified Platform memory service or a new general memory engine.

## Research that could change the decision

A Graphiti comparison is worthwhile only against named useful scenarios: changed or contradictory facts, provenance completeness, authorized scope changes, exact statements versus derived observations, forget/export outcomes, and quality per retrieval cost. AutoGPT's client separates a pure construction function from connected driver creation, but its Graphiti configuration can use model-based reranking per candidate. Count those calls and its storage/cleanup responsibilities against the selected Hindsight profile. A TypeScript transport adapter does not make the Python engine's operational costs disappear. [Graphiti factory and reranker][graphiti-factory]

For extraction, the decisive tests are smaller: a real installed consumer cannot accidentally import product infrastructure; transport loss preserves operation identity; native completion cannot publish unverified content; borrowed resources are not closed; and scope mapping cannot replace authorization. Include selected Gateway preview behavior in the product integration check. Use controlled failure/interleaving cases where those seams change, not a new organization-wide test matrix.

AutoGPT's lease-renewal finding and MCP transport retry policy strengthen existing lessons about authority and ambiguous effects. They do not justify copying its Redis topology, merging independent workflows into one engine, or importing C0–C3 work into S1–S5. The useful output is a sharper contract and a bounded counterexample at the current owner. [AutoGPT dossier](../competitors/autogpt-vs-agent-teams-architecture-and-python-ecosystem.md), [MCP retry boundary][mcp-retry], [ordinary v3 scope][runtime-scope]

[runtime-owners]: https://github.com/agent-teams-ai/agent-runtime/blob/ab0387c02fe75ed0c9bb456caaad9a6d2723795b/docs/architecture/agent-runtime-architecture-program-plan.md#L206-L251
[runtime-scope]: https://github.com/agent-teams-ai/agent-runtime/blob/ab0387c02fe75ed0c9bb456caaad9a6d2723795b/docs/architecture/agent-runtime-architecture-program-plan.md#L110-L115
[runtime-storage]: https://github.com/agent-teams-ai/agent-runtime/blob/ab0387c02fe75ed0c9bb456caaad9a6d2723795b/docs/architecture/agent-runtime-architecture-program-s2-operations-storage.md#L383-L405
[agent-context]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/decisions/0073-separate-agent-context-bounded-context.md#L33-L81
[context-disclosure]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/domain/contexts/agent-context/README.md#L218-L237
[memory-boundary]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/architecture/extension-points.md#L232-L239
[retention]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/open-decisions/OD-029-data-retention-and-erasure-policy.md#L19-L36
[platform-owners]: https://github.com/agent-teams-ai/agent-teams-platform/blob/7f6eb3746c07dc01751c29a8dbc62e50b5f7ad6d/docs/domain/context-map.md#L83-L98
[platform-scope]: https://github.com/agent-teams-ai/agent-teams-platform/blob/7f6eb3746c07dc01751c29a8dbc62e50b5f7ad6d/docs/domain/contexts/README.md#L13-L21
[platform-reuse]: https://github.com/agent-teams-ai/agent-teams-platform/blob/7f6eb3746c07dc01751c29a8dbc62e50b5f7ad6d/docs/architecture/platform-orchestrator-boundary.md#L75-L98
[rr-sdk]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/context-memory/README.md#L1-L69
[rr-feature]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/README.md#L1-L114
[rr-errors]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/context-memory/src/hindsight/memory-store.ts#L83-L117
[rr-write]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/context-memory/src/hindsight/memory-store.ts#L201-L257
[rr-outcomes]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/src/application/ports/memory-knowledge-provider-port.ts#L64-L80
[rr-selected-preview]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/ai-docs/decisions/034-selected-account-memory-inference.md#L3-L43
[gm-standard]: https://github.com/agent-teams-ai/get-modular/blob/5fb83478dd7b95216be92c4d3077eddf2774eef8/docs/architecture/common-assembly.md#L77-L110
[gm-resources]: https://github.com/agent-teams-ai/get-modular/blob/5fb83478dd7b95216be92c4d3077eddf2774eef8/packages/resources/README.md#L1-L25
[graphiti-factory]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/graphiti/client.py#L190-L242
[mcp-retry]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/mcp/client.py#L266-L282
