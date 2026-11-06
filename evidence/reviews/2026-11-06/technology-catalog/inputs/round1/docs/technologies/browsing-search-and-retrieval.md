---
id: research.technologies.retrieval
type: technology
status: active
owner: research/maintainers
summary: Browser and search integrations, lexical capability discovery and their fit, cost, authority and deployment limits.
---

# Browsing Search and Retrieval

Reviewed **2026-11-06**. Web acquisition, external search and internal capability discovery solve different problems. A service SDK does not provide the service's index or infrastructure locally. Fit/confidence scores below are scoped judgments, not measured coverage, performance or adoption decisions. Retrieved pages and generated answers remain evidence to evaluate; they do not become product instructions or authority.

Browser automation has its primary [Stagehand record](agent-execution-and-sandboxes.md#stagehand) in execution capabilities.

## Firecrawl

**Implementation and clients.** Hosted API plus self-hostable crawling/extraction stack. Its current API manifest is TS/Node with a native Rust workspace dependency; Python is a client language. Official Node APIs expose search, scrape/crawl and current interaction operations. AutoGPT pins Python client **4.42.0** and instantiates it in blocks. [API manifest][fc-manifest] [Node SDK][fc-sdk] [Pinned block][ag-firecrawl] [Lock][ag-lock]

**Scenario: bounded web acquisition; fit 7/10, confidence 8/10.** Good fit includes turning approved URLs into structured evidence with explicit crawl limits. Poor fit includes granting effectful browser/agent endpoints the same policy as read-only acquisition, or assuming cloud/self-host feature parity.

**Deployment evidence.** The official self-host guide pins server **v2.11.162**, independently of the Python client version. Its tutorial disables API authentication and omits production durability/availability controls. Core APIs are self-hostable; Cloud Agent/Browser/Interact and managed capabilities are not all included in the default OSS stack. Self-hosting still contacts target sites and may use optional proxy/model services. Root source licensing is AGPLv3, distinct from individual client packages. [Self-hosting][fc-host] [Operating-model comparison][fc-compare] [License][fc-license]

**Risks and next research.** Assess private-network/SSRF exposure, redirects, crawl budgets, content provenance, prompt injection and cancellation. A small fixed public/fixture corpus should cover large pages, hostile instructions and denied destinations. Verify only the selected endpoint/deployment subset; use the supported TS interface unless a concrete gap justifies another runtime.

## Exa

**Implementation and clients.** Hosted search/content/research service with official Python and JS/TS SDKs. The service engine's implementation language is not established by client language. Current SDK documentation exposes search, page contents, source links and freshness options. AutoGPT's Websets integration uses `AsyncExa`; its Python client is pinned to **2.21.0**. [Official SDK][exa-sdk] [Pinned Websets block][ag-exa] [Lock][ag-lock]

**Scenario: optional external web research; fit 7/10, confidence 8/10.** Good fit is discovering relevant public sources when an authorized remote provider is acceptable. Poor fit includes mandatory disconnected operation, unauthorized private queries, or a guarantee of exhaustive/current coverage.

**Local distinction.** Running the SDK locally does not supply a local search index. A self-hostable complete engine was not established from the inspected official SDK documentation; this is not a claim that every enterprise deployment arrangement is impossible.

**Risks and next research.** Query privacy, source coverage/freshness, returned evidence quality and asynchronous job costs need separate evaluation. Citations point to sources but do not prove every generated claim. Compare a small labelled query corpus containing expected authoritative sources, using fixed payload and result budgets. Evaluate persistent Websets jobs separately only if that capability is actually required.

## Tavily

**Implementation and clients.** Hosted search/extract/crawl APIs with Python and JS/TS clients. Official `@tavily/core` is asynchronous and documents the service interface; no managed-engine language follows from the SDK. AutoGPT instantiates `AsyncTavilyClient` and pins Python package **0.8.2**. [JS/TS interface][tavily-sdk] [Pinned search block][ag-tavily] [Lock][ag-lock]

**Scenario: optional external research provider; fit 7/10, confidence 8/10.** Good fit could be a measured coverage or extraction advantage for the product's queries. Poor fit includes a mandatory offline baseline or treating a provider-generated answer as verified fact without inspecting sources.

**Local distinction and risks.** The local client calls a remote service; the inspected SDK documentation does not establish a self-hosted index. Query egress, rate limits, crawl bounds and evidence quality remain part of the adapter's contract. Adding both Exa and Tavily by default would increase operational surface without yet demonstrating complementary value.

**Bounded next research:** use the same source-labelled query corpus and budget as Exa, separating search quality from extraction/crawl behavior. Record which failures differ before proposing multiple providers or routing policy. No provider selection follows from this catalogue.

## BM25 and permission-aware capability discovery

**Implementation and clients.** BM25 is an algorithm, not a hosted service. AutoGPT uses the Python **`rank-bm25 0.2.2`** package, which expects tokenized input and leaves preprocessing to the caller. Its capability index adds exact identity/name lookup, permission/context filtering, service preference and bounded fallbacks. [Package responsibilities][bm25-package] [Pinned capability index][ag-capabilities] [Lock][ag-lock]

**Scenario: finding tools in the existing discovery path; fit 9/10, confidence 9/10 for the pattern.** Good fit is a bounded capability catalogue where inexpensive deterministic ranking reduces prompt size and improves selection. This does not justify adding Python solely for BM25. A suitable TS implementation or an already justified search backend can be evaluated against the same scoring contract.

**Poor fit and risks.** Lexical matching alone may miss multilingual paraphrases or semantic equivalents. Tokenization, adversarial descriptions, stale indexes and corpus size matter. Permission filtering must prevent inaccessible capabilities from reaching the model; ranking cannot supply authorization. A small in-memory catalogue design should not be assumed suitable for an unbounded document corpus.

**Bounded next research:** label exact names, ambiguous descriptions, Russian/English paraphrases and forbidden capabilities. Compare selection precision, misses and prompt size with the current baseline. A simple algorithm implementation does not inherit the cost/risk of porting a substantial Python framework such as Graphiti.

[fc-manifest]: https://github.com/firecrawl/firecrawl/blob/main/apps/api/package.json
[fc-sdk]: https://docs.firecrawl.dev/sdks/node
[ag-firecrawl]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/firecrawl/search.py
[ag-lock]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/poetry.lock
[fc-host]: https://docs.firecrawl.dev/contributing/self-host
[fc-compare]: https://docs.firecrawl.dev/contributing/open-source-or-cloud
[fc-license]: https://github.com/firecrawl/firecrawl/blob/main/LICENSE
[exa-sdk]: https://exa.ai/docs/sdks/quickstart
[ag-exa]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/exa/websets_polling.py
[tavily-sdk]: https://docs.tavily.com/sdk/javascript/quick-start
[ag-tavily]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/tavily/search.py
[bm25-package]: https://github.com/dorianbrown/rank_bm25
[ag-capabilities]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/capabilities/index.py
