---
id: research.studies.memory-sdk
type: study
status: active
owner: research/maintainers
summary: Pinned assessment of the existing memory package, generalization gaps, composition boundaries and bounded extraction alternatives.
---

# Review Router Memory SDK Extraction

## Finding and assessment boundary

**Evolve the existing `context-memory` package before choosing a rewrite.** ReviewRouter already contains a small mechanism library, useful provider contracts, a production consumer and an ordinary external-consumer fixture. Its remaining generalization problems are concrete enough to address within that boundary. The evidence does not justify creating a second permanent implementation of the same concern. The package is also not yet a generally released, multi-provider memory SDK: it is private, supports one concrete engine and relies on its caller for authorization and durable coordination. [Package metadata][rr-package] · [Library purpose and limits][rr-readme]

This assessment inspects `777genius/review-router-ai` at **`9a416dfb876d78253612e87aa89561d48bf35633`**, observed on **2026-11-06**. Implementation claims are source-inspected; tests and workflows were read, not executed. Historical qualification results are attributed to their recorded scope. No dependencies, native services, paid models or product changes were introduced by this research.

The recommendation is a research direction, not an adoption decision. Extracting a library means giving a reusable contract, implementation and release lifecycle one owner. It does not necessarily mean creating a separate repository. Conversely, moving files into another repository would not make ReviewRouter-specific authority or lifecycle policy portable.

## What already exists

| Boundary | Current responsibility | Reuse implication |
|---|---|---|
| `context-memory` | Native memory mechanisms: source preview, current-source read/list, exact replacement, operation observation and recall evidence. | The primary extraction candidate. It has no ReviewRouter, Prisma, Account Gateway or Get Modular dependency. |
| `@reviewrouter/features-memory` | Product scopes, actors, approvals, source applicability, revisions, quotas, durable commands, publication and cleanup acceptance. | Learn from its invariants; keep these decisions with each consuming product. |
| Conversation/API host | Checked discussion context, captured review account/model/policy and inference admission. | Keep model-account authority and source validation outside a general SDK. |
| Hindsight deployment and maintenance | Concrete native runtime, storage profile, provenance inventory and physical-cleanup qualification. | A client package cannot replace deployment or deletion evidence. |

These are implemented boundaries. The product Hindsight adapter constructs `HindsightMemoryStore` and delegates source reading, exact writes and operation observation. It then applies product-specific identity, approval, body, topic and timestamp checks. Additional native lifecycle operations remain in that adapter. This is useful partial reuse; the SDK need not absorb every provider operation. [Production consumer][rr-provider] · [Provider/application ownership decision][rr-adr31]

Counting physical lines, including comments and blanks, the five files under `packages/context-memory/src` contain **755 lines**. The product memory feature contains **8,645 production TypeScript lines across 45 files**, excluding its **12 test files with 6,278 lines**. These counts exclude API, worker, native-maintenance and deployment code. They describe the inspected source sets, not effort or quality. The 755-line mechanism is the extraction starting point; importing the entire feature would bring workspace/repository identities, permissions and delivery ownership into another product. [Portable source][rr-source] · [Product feature source][rr-feature-source]

### Current profile differs from the earlier extraction decision

ADR-031 assigns approved content, facts, indexing and memory-engine behavior to the provider, while Router owns authority, applicability and durable commands. **ADR-034 is a scoped successor for conversational extraction.** Hindsight remains the current-content provider, using exact chunks, local embeddings and local reranking. Ordinary native startup requires `LLM_PROVIDER=none` and disables observations and automatic consolidation. Conversational selection instead uses the captured primary review account through `@agent-teams/account-gateway/llm`. [ADR-031][rr-adr31] · [ADR-034][rr-adr34] · [Bootstrap configuration][rr-bootstrap]

The current API composition selects `createConversationMemoryPreview` with captured policy and Gateway clients, or returns unsupported when the required context is absent. It does not select the native preview adapter for this path. The native preview remains available in the library and an optional product composition export. Its presence does not prove it is the active extraction mechanism. [Current host selection][rr-conversation-composition]

This distinction prevents two misleading conclusions: the SDK does not need Account Gateway to be portable, and the full upstream Hindsight feature set is not automatically active in ReviewRouter’s selected profile. Mechanism/model qualification and production activation also remain separate from source implementation. This assessment does not change Agent Teams’ own memory decisions. [ADR-034 evidence boundary][rr-adr34]

## Useful contracts and patterns

The library separates capabilities instead of requiring every consumer to implement a universal memory service:

| Contract | Useful promise | Caller-owned responsibility |
|---|---|---|
| `SourcePreviewPort` | One selected source revision, separate read-only context, and explicit complete/unsupported/incomplete results. | Source identity, permission, semantic acceptance and publication. |
| `CurrentSourceReader` | Current body/metadata/tags and paginated source references. | Authorization, applicability and any stronger snapshot contract. |
| `ExactStatementWriter` | Caller-provided operation identity and exact source replacement, returning submitted. | Durable intent, revision/CAS, reconciliation and publication. |
| `MemoryOperationReader` | Native operation state, including unknown, and child-operation information. | Deciding whether effects have settled and what completion authorizes. |
| `MemoryRecallReader` | Retrieved evidence with source/fact identities and a completeness indicator. | Eligibility, provenance acceptance and semantic usefulness. |

All accept an absolute deadline and optional cancellation. `MemoryScope` is a caller-owned string, keeping product identity out of the mechanism. That string and a `bankForScope` callback are not authorization by themselves. ReviewRouter’s own mapping binds namespace, provider generation and its canonical scope key. [Portable contracts][rr-contracts] · [Product scope mapping][rr-scope]

**Exact storage is checked before writing.** The Hindsight writer fetches the addressed bank configuration and verifies that the named strategy resolves to `retain_extraction_mode: chunks`. It rejects an absent, semantic or malformed strategy before retain, rather than assuming a configured name guarantees exact persistence. The request carries explicit operation/document identities, timestamp and replace mode; the library does not provision banks. Rejecting tests check that only the configuration GET occurs for unsupported strategies. [Writer implementation][rr-store] · [Store contract tests][rr-store-tests]

**Submission, completion and publication remain separate.** Portable writes return submitted. The product observer requires completed native work, a suitable operation type, completed children and verified current content before returning published. Database settlement separately protects revision and revocation state. A successful request or parent-operation status therefore cannot silently authorize a new product truth. [Product observation and readback][rr-observe] · [Durable settlement][rr-settle]

**Preview distinguishes abstention from failure.** Missing qualification, malformed results, overflow or deadline failure do not become a successful empty selection. The adapter checks mission binding and strict-preview evidence, limits response streaming to 64 KiB and requires a single returned chunk matching the selected source. It performs one request. These are useful transport/result guarantees; they do not prove that a real model grounds every statement or resists contextual instructions. The qualification object is trusted deployment input, not proof created by the client. [Preview adapter][rr-preview] · [Preview tests][rr-preview-tests]

**Unsupported capabilities are honest.** The current descriptors mark reflect and physical forget unavailable. They are static support descriptions, not instance availability, authorization or successful qualification. A preview support bit does not override the adapter’s rejection of an unqualified deployment. [Capability descriptors][rr-capabilities]

## Gaps to resolve before a general public contract

### 1. Write uncertainty needs an explicit portable meaning

The most consequential gap is the distinction between a request that definitely was not submitted and a write whose outcome is unknown. The common result helper maps network errors to `unavailable` and deadline/abort conditions to `deadline`. The writer uses that helper both for read-only configuration and for effectful retain. Only a mismatched accepted response receives `unknown_write`. An external caller therefore cannot infer retry safety from the error code alone: a timeout after retain may follow an already accepted write. The writer interface does not document this phase distinction. [Transport/result mapping][rr-store] · [Writer contract][rr-contracts]

**This is not a demonstrated duplicate-write defect in ReviewRouter.** Its database claim records unknown and first dispatch before provider I/O; recovery chooses observation rather than resetting work to submission. Failure recording keeps the command unknown. The provider permits resend only inside an explicitly qualified operation-identity retention window, which defaults to zero. The SDK itself performs no automatic retry. [Claim before I/O][rr-claim] · [Failure recording][rr-record-failure] · [Observation/resubmit rules][rr-observe] · [Provider configuration][rr-config]

The PostgreSQL authority test deliberately simulates exit after claim and before native submission. A second store recovers through observation, leaves submit uncalled, and retains unresolved authority; later envelope expiry becomes fenced operator debt. That is inspected evidence of the product’s protection, not a test executed for this report. [Crash/recovery test][rr-crash-test]

For external evolution, preserve caller-supplied operation identity and make effect possibility explicit in results or documented error semantics. A phase field or a not-submitted/submitted/unknown result union is a possible design, not a selected API. The SDK should not acquire its own durable ledger. A useful rejecting case is acceptance followed by a lost response: the caller reconciles the same operation rather than treating the timeout as permission for an unrelated retry.

### 2. Provider-neutral entrypoints should not require provider internals

The root index reexports both Hindsight implementations, and the package declares the Hindsight SDK as its sole runtime dependency. `MemoryEngineError` is defined inside the provider implementation. Type-only imports can erase runtime loading, so not every TS consumer necessarily loads Hindsight; ordinary runtime root imports still traverse the concrete export graph. [Root exports][rr-index] · [Dependencies][rr-package] · [Error definition][rr-store]

A neutral contract/error entrypoint and explicit provider subpath or package would improve substitution. This can remain one repository and one release owner. It does not require a discovery registry, dynamic loader or new plugin framework.

### 3. Some semantics still reflect the first engine and consumer

`SelectedStatement.nativeType` uses Hindsight’s `world | experience` vocabulary. The contextual preview task refers to a selected maintainer, project scope and checked discussion. Four-statement and 1,000-character bounds are useful for the current workload, but another consumer should not inherit the product’s extraction policy accidentally. No second engine currently demonstrates that this taxonomy is the right universal model. [Statement contract][rr-contracts] · [Preview policy and limits][rr-preview]

Separate genuine transport limits from consumer task policy. Preserve bounded input/results, truthful unsupported outcomes and source/context separation. Generalization does not mean accepting unlimited text or letting arbitrary prompts grant authority. ReviewRouter already has a narrower product preview port returning statement bodies without native classifications; that is a useful anti-corruption boundary. [Product preview port][rr-product-preview]

### 4. Packaging and qualification need their own ownership

The private 0.1.0 package exports compiled JavaScript and shipped TS source, but its build extends the monorepo configuration and its tests live in the product feature. The source-level example imports through a relative source path. Externalization should establish independent build/test ownership, declarations and exports, runtime support, installation instructions, package/license identity and release/migration responsibilities. These are bounded delivery tasks, not reasons to discard the existing implementation. [Package metadata][rr-package] · [Build configuration][rr-build] · [Source example][rr-example]

There is stronger counterevidence than the relative-path example alone: a separate ordinary consumer uses the bare package import and synthetic transport to exercise exact write, operation observation, read, list and recall. The implementation record reports actual packing, isolated installation and source-hash-matched consumer execution. That historical record is neither registry publication nor a current-head run by this audit, and synthetic transport does not qualify a native engine. [Ordinary consumer fixture][rr-consumer] · [Recorded qualification scope][rr-history]

Only Hindsight is implemented. Another engine must demonstrate each promised capability: exact replacement, operation identity, evidence completeness and lifecycle semantics are not interchangeable merely because both systems call themselves memory. Reflect and physical deletion should remain unsupported until their actual guarantees are supplied. Small public-boundary validation inconsistencies, such as recall’s range-only limit check versus the list reader’s safe-integer validation, are also appropriate regression targets during extraction. [Store implementation][rr-store]

## Get Modular belongs to composition

The portable library deliberately has no Get Modular dependency. The product runtime genuinely uses `@get-modular/core` and `@get-modular/assembly` 0.7.0: it declares a required provider slot with exact compatibility, builds provider/runtime factories, compiles a composition and runs assembly. This is implemented wiring, not a planned directory structure. [Product dependencies][rr-feature-package] · [Runtime composition][rr-composition]

The current root is not a public plugin host. Its inputs are Prisma, environment and workspace settings; a private factory selects Hindsight or disabled. Application contracts permit an owning composition to implement another adapter, but there is no public third-party registration API here. Tests verify construction without native/database I/O and separate request-scoped access contexts. Architecture mutation fixtures reject provider SDK imports into core layers and Get Modular imports into application code. [Composition API and tests][rr-composition-tests] · [Boundary rejection fixtures][rr-boundaries]

Keep that distinction during reuse: an Agent Teams host may use its adopted module composition, while an ordinary SDK consumer can inject plain interfaces. Making DI mandatory for every caller would reduce the portability that this library already has.

## Evidence strength and remaining uncertainty

| Evidence inspected | What it supports | What it does not establish |
|---|---|---|
| Portable store/preview tests | Exact mapping, malformed-result rejection, complete-empty distinction and unsupported profile behavior. | Live native ID retention or actual-model semantic quality. |
| Ordinary packed-consumer fixture and historical record | A credible standalone consumption path beyond Router vocabulary. | Registry availability or a fresh qualification of this SHA. |
| Product PostgreSQL tests | Durable claim, revision, delivery, admission and cleanup-authority behavior in real DB scenarios. | That the portable client alone provides those protections. |
| Required-suite/no-skip CI checks | Explicit coverage enforcement in the workflow. | Passing current-head execution without current run artifacts. |
| Separate native qualification workflow | Pinned source/SDK provenance, native API/workers/PG and cleanup qualification procedure. | Every deployment being qualified, or this audit running that procedure. |

The product has substantially broader verification than a small HTTP wrapper. Its test suite should inform and supply appropriate SDK tests, while product-specific authority tests retain their owner. A source snapshot and these inspected workflows do not prove measured memory quality, fleet capacity or production activation. [Portable tests][rr-store-tests] · [Preview tests][rr-preview-tests] · [Database CI enforcement][rr-db-ci] · [Native qualification workflow][rr-native-ci]

## Options and incremental cost

The common scope below is the existing mechanisms with Hindsight plus one additional consumer through an already owned host seam. It excludes a new memory business context, authorization engine, durable ledger, native deployment, physical-forget subsystem and second engine. **This research itself makes zero production changes.**

Ratings are ordinal engineering judgments. Higher reliability and recommendation confidence are better; higher complexity means more burden. Reliability describes achievable behavior within the stated scope, not availability. Code ranges are unvalidated planning estimates with **sizing confidence 3/10**, not delivery commitments.

| Option | Reliability / confidence / complexity, /10 | Incremental production TypeScript | Separate new/reworked tests and fixtures | Assessment |
|---|---|---|---|---|
| A. Consume the current private package through a thin host adapter | **7 / 9 / 3** | **150–350 lines**, retaining the existing 755-line library | **250–600 lines** | Fastest bounded reuse proof. The host must explicitly handle uncertain writes; private packaging and first-provider semantics remain. |
| B. Evolve/extract the existing package under one owner, then consume it | **8 / 9 / 5** | **350–800 new or materially rewritten lines**, including second-consumer mapping; reuse/move the existing baseline | **400–900 lines** | Strongest research direction: improve uncertainty, entrypoints and profile semantics while retaining real consumer and native-mapping experience. |
| C. Rebuild an equivalent narrow SDK and migrate Router | **8 / 6 / 7** | **1,000–1,800 lines**, including native mapping and second-consumer integration | **600–1,200 lines** | Can achieve equivalent correctness, but duplicates discovery and migration work without an identified capability requiring a rewrite. |

Option C does not receive an automatically lower reliability ceiling: a correctly implemented replacement can be equally reliable. Its supported disadvantages are weaker confidence and higher engineering burden. Option A is useful for a spike but leaves external callers dependent on rules that current Router supplies outside the package. Option B addresses those gaps within the existing concern’s ownership.

Production ranges exclude generated SDKs, unchanged moved source, manifests/docs, CI/release/signing, infrastructure, native/privacy qualification and persisted-data or in-flight-command migration. Test ranges exclude unchanged tests, live-model campaigns, native deployment and complete product regression. These additional costs remain unestimated. If the second consumer lacks an authority/delivery owner, the table is not an estimate of its whole memory feature. A deliberate SDK replacement should retire its predecessor, not leave permanent parallel variants.

## Smallest useful next research step

Validate the second consumer against the existing capability contracts, starting with truthful write uncertainty and built-package consumption. Preserve source identities, absolute deadlines, incomplete evidence and operation observation. Keep scopes, permissions, confirmation policy, paid-account selection and durable commands with their current product owners.

A later Graphiti or other-engine evaluation should answer a concrete missing-capability or retrieval-quality question and disclose unsupported semantics. It should not silently replace the selected Hindsight direction or force a universal abstraction over incompatible guarantees. The present evidence supports **one evolving library with explicit adapters and real consumers**, without a new scheduler, grant ledger, plugin platform or semantic memory engine inside the SDK.

[rr-package]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/context-memory/package.json
[rr-readme]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/context-memory/README.md
[rr-source]: https://github.com/777genius/review-router-ai/tree/9a416dfb876d78253612e87aa89561d48bf35633/packages/context-memory/src
[rr-feature-source]: https://github.com/777genius/review-router-ai/tree/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/src
[rr-feature-package]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/package.json
[rr-contracts]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/context-memory/src/contracts.ts
[rr-index]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/context-memory/src/index.ts
[rr-capabilities]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/context-memory/src/capabilities.ts
[rr-store]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/context-memory/src/hindsight/memory-store.ts
[rr-preview]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/context-memory/src/hindsight/source-preview.ts
[rr-provider]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/src/infrastructure/hindsight/hindsight-memory-provider.ts
[rr-observe]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/src/infrastructure/hindsight/hindsight-memory-provider.ts#L579-L666
[rr-scope]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/src/infrastructure/hindsight/hindsight-scope.ts
[rr-claim]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/src/infrastructure/prisma/prisma-memory-knowledge-store.ts#L792-L837
[rr-settle]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/src/infrastructure/prisma/prisma-memory-knowledge-store.ts#L840-L929
[rr-record-failure]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/src/infrastructure/prisma/prisma-memory-knowledge-store.ts#L932-L950
[rr-config]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/src/infrastructure/config/memory-provider-config.ts
[rr-adr31]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/ai-docs/decisions/031-complete-memory-provider.md
[rr-adr34]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/ai-docs/decisions/034-selected-account-memory-inference.md
[rr-bootstrap]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/deploy/hindsight/bootstrap.ts
[rr-conversation-composition]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/apps/api/src/action-conversation-composition.ts#L796-L828
[rr-product-preview]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/src/application/ports/memory-source-preview-port.ts
[rr-composition]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/src/composition/memory-knowledge-runtime.ts
[rr-composition-tests]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/src/composition/memory-knowledge-runtime.test.ts
[rr-boundaries]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/scripts/memory-foundation/qualify-boundaries.ts
[rr-build]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/context-memory/tsconfig.build.json
[rr-example]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/context-memory/examples/external-consumer/index.ts
[rr-consumer]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/scripts/memory-e2e/context-memory-consumer.mjs
[rr-history]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/ai-docs/plans/2026-10-28-conversational-memory-implementation.md#L205-L217
[rr-store-tests]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/src/tests/context-memory-store.test.ts
[rr-preview-tests]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/src/tests/context-memory-preview.test.ts
[rr-crash-test]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/src/tests/memory-knowledge.pg.test.ts#L1848-L1931
[rr-db-ci]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/.github/workflows/memory-projections.yml#L225-L259
[rr-native-ci]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/.github/workflows/hindsight-memory-qualification.yml
