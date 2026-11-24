---
id: research.technologies.memory
type: technology
status: active
owner: research/maintainers
summary: Memory engines, client libraries and portable contracts, separated by actual deployment profile and source-backed fit.
---

# Memory and Knowledge

Reviewed **2026-11-06**. These entries distinguish an engine, its clients, its deployment and the product policy around it. Fit/confidence scores are judgments about the stated scenario, not benchmark results, adoption decisions or probabilities of successful delivery. Upstream rolling documentation describes available capabilities; it does not qualify a particular Agent Teams deployment.

## Existing baseline: ReviewRouter's narrow `context-memory` library

ReviewRouter already contains a private, unpublished TypeScript package, `context-memory` **0.1.0**, with provider-neutral contracts and Hindsight transport mappings. Its capabilities include source-preview, current source read/list, exact statement replacement, operation observation and recall evidence. Reflect and complete physical forget are explicitly unavailable; the application retains its qualified cleanup owner. The package pins the Hindsight **TS client** release 1.1.0, which is not a general engine-version claim. [Package README][rr-readme] [Manifest][rr-package]

ADR-034 keeps Hindsight as the current-content provider using exact chunks, local embeddings and local reranking. The selected native profile sets `LLM_PROVIDER=none` and disables observations and automatic consolidation. Conversational extraction instead implements the product's existing `MemorySourcePreviewPort` through Account Gateway, using the captured account/model/policy. Source authority, confirmation, deletion and qualification remain product responsibilities. The ADR distinguishes implementation from production activation. [ADR-034][rr-adr] [Bootstrap][rr-bootstrap]

**Assessment: fit 8/10, confidence 8/10** for investigating reuse of this bounded library. It is evidence of an existing separation between mechanism and policy, not evidence that Agent Teams has adopted the same contract. A useful next study is an ordinary external consumer exercising the existing capabilities and explicit unsupported outcomes. Publishing the private package, enabling its historical native-preview path or moving product policy into it would each require a separately scoped decision.

The detailed [SDK extraction study](../studies/review-router-memory-sdk-extraction.md) documents existing strengths, uncertainty semantics, Get Modular use and alternative costs.

## Hindsight

**Implementation and interfaces.** Python memory engine/service with TS/JS, Python and other API clients. The Node `hindsight-all` package launches and supervises a separate local daemon over HTTP; it does not implement the algorithms inside Node. Current upstream manifests declare **1.2.0**, independently of ReviewRouter's selected profile. [Node launcher][h-node] [Upstream manifest][h-manifest]

**Scenario: feature-owned persistent memory; fit 8/10, confidence 8/10.** Preserve the existing RR direction while evaluating only a demonstrated reuse requirement. Full upstream reflection/consolidation capabilities must not be presented as active RR behavior.

**Good fit:** retained content and retrieval behind an application-owned scope/source contract. **Poor fit:** handing source approval, customer identity or paid-inference selection to engine defaults. Upstream supports bare-metal installation, but embedded PostgreSQL is documented for development rather than production; Intel Mac local-ML packaging has additional limits. A local npm launcher does not establish a complete offline bundle. [Installation][h-install]

**Risks and next research.** The simple built-in API-key tenant extension shares one schema; bank identifiers alone cannot establish user authorization. Optional regex memory defense affects future retains and is disabled by default. [Tenant extensions][h-extensions] [Memory defense][h-defense] Exercise write/read/delete, cross-scope rejection, uncertain writes and restart/cleanup against the selected profile. Evaluate richer reasoning separately, with the existing account and source policy intact.

## Graphiti

**Implementation and interfaces.** Python temporal graph construction/retrieval framework. Its graph database, LLM and embedder are separate dependencies. A Zep TS service client or Graphiti REST/MCP wrapper is not a TS implementation of `graphiti-core`. AutoGPT pins **0.30.2** and constructs scoped clients with an embedder/reranker. [Upstream framework][g-upstream] [Pinned AutoGPT integration][ag-graphiti]

**Scenario: a demonstrated temporal-fact or provenance gap; fit 7/10, confidence 8/10.** This is alternative/capability research alongside the selected Hindsight direction, not a replacement proposal.

**Good fit:** answering questions about changing facts and their source episodes. **Poor fit:** adding a graph solely because it appears more sophisticated, or assuming model-derived relations can grant authority. Local OpenAI-compatible model endpoints are supported, but structured-output reliability depends on the model. The reference REST/MCP servers intentionally omit production authentication and authorization. [Upstream requirements and reference-server limits][g-upstream]

**Risks and next research.** Count graph-store operations, extraction/reranking calls, tenant mapping and deletion semantics. Compare a small shared corpus of changed facts, conflicting sources and delete/re-ingest races against the actual Hindsight/product profile. Score traceability and retained artifacts as well as answers. A wrapper's line count cannot represent this entire integration.

## FalkorDB

**Implementation and interfaces.** A graph database, not the memory extraction algorithm. Current upstream `main` describes a Rust Redis module using native GraphBLAS; official Python, TS, Rust and other clients exist. AutoGPT's locked **`falkordb 1.7.1` is the Python client**, not its server release. Do not transfer current-main implementation claims to an unverified database image. [Engine and clients][f-engine] [AutoGPT lock][ag-lock]

**Scenario: storage for a justified graph workload; fit 6/10, confidence 8/10.** Good fit depends on actual graph queries and operational ownership; poor fit includes replacing authoritative product persistence or adding it just for lexical discovery.

**Deployment and risks.** Server self-hosting and separate Lite launchers exist. TS Lite advertises bundled Linux x64/macOS arm64 binaries, with Windows using WSL2 or a remote server. The server is SSPLv1; an MIT client/wrapper does not determine the engine's distribution terms. [Lite platform matrix][f-lite] [Server source/license][f-engine] Additional risks include native packaging, backup/restore, graph deletion, index memory and driver/server compatibility.

**Next research:** within a specific graph scenario, select one engine/driver pair and test the required queries, export/delete and restore behavior. Qualify the required OS matrix before claiming native-local parity.

## Mem0 OSS

**Implementation and interfaces.** Locally operated Python and TS memory implementations, including the TS `mem0ai/oss` entry point, plus a self-hosted server option. This is more than a hosted API client. Python/TS defaults and provider coverage differ; external inference may still be configured. Current **v3** documentation says the old OSS external-graph integration was removed, while Platform Graph Memory remains. [OSS overview][m-oss] [Configuration][m-config] [Current platform comparison][m-comparison]

**Scenario: a bounded alternative memory adapter; fit 6/10, confidence 7/10.** Good fit requires a concrete simpler or missing capability relative to the existing direction. Poor fit includes expecting identical hosted/OSS or Python/TS semantics from matching method names, or assuming old graph examples remain supported.

**Risks and next research.** Persistence defaults, filter semantics, history, extraction and provider parity require explicit checks. User/agent/run identifiers must be derived from authenticated product scope. Compare only the required add/search/update/delete/filter/history subset on pinned packages and a fixed backend, including restart persistence and forbidden cross-scope access. No replacement is selected.

## Mem0 Platform

**Implementation and interfaces.** Hosted memory service exposed through Python/JS clients and REST. The engine's implementation language is not established by SDK language. AutoGPT's `blocks/mem0.py` instantiates hosted `MemoryClient`; its locked package **1.0.8** does not establish an embedded OSS deployment. [Managed platform][m-platform] [Pinned AutoGPT block][ag-mem0]

**Scenario: an explicitly managed external-memory mode; fit 5/10, confidence 8/10.** Good fit could arise when managed operation is a product requirement. Poor fit includes a mandatory disconnected baseline or replacing Hindsight simply to reduce adapter code.

**Risks and next research.** Query/content egress, retention, deletion/export, project scope, billing and ambiguous asynchronous outcomes remain integration concerns. A service identifier is not application authorization. Only if a managed-memory requirement appears, verify the exact chosen API's scope, deletion and retry behavior. Compare operating models, including service responsibility, rather than hosted API convenience against an unoperated OSS library.

[rr-readme]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/context-memory/README.md
[rr-package]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/context-memory/package.json
[rr-adr]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/ai-docs/decisions/034-selected-account-memory-inference.md
[rr-bootstrap]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/deploy/hindsight/bootstrap.ts
[h-node]: https://hindsight.vectorize.io/sdks/hindsight-all-npm
[h-manifest]: https://github.com/vectorize-io/hindsight/blob/main/hindsight-api/pyproject.toml
[h-install]: https://hindsight.vectorize.io/developer/installation
[h-extensions]: https://hindsight.vectorize.io/developer/extensions
[h-defense]: https://hindsight.vectorize.io/developer/memory-defense
[g-upstream]: https://github.com/getzep/graphiti
[ag-graphiti]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/graphiti/client.py
[f-engine]: https://github.com/FalkorDB/FalkorDB
[f-lite]: https://github.com/FalkorDB/falkordblite-ts
[ag-lock]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/poetry.lock
[m-oss]: https://docs.mem0.ai/open-source/overview
[m-config]: https://docs.mem0.ai/open-source/configuration
[m-comparison]: https://docs.mem0.ai/platform/platform-vs-oss
[m-platform]: https://docs.mem0.ai/platform/overview
[ag-mem0]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/mem0.py
