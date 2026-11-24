# Round 2 bounded confirmation: Python, libraries and integration scope

**Result: no remaining blocking factual or scope issue in the reviewed material.**

Reviewed the current Python/memory section, dependency table, integration options, owner-boundary paragraph and the changed source-reference definitions in `docs/competitors/autogpt-vs-agent-teams-architecture-and-python-ecosystem.md`. This is confirmation of the requested fixes, not a new broad audit, benchmark or runtime validation.

## Confirmed fixes

| Round 1 item | Current disposition |
| --- | --- |
| Langfuse observed behavior | Correctly limited to managed prompt retrieval. Disabled tracing in the inspected client is explicit; general SDK observability features are not attributed to it. |
| Claude SDK private imports | Direct pinned reference to `copilot/sdk/cli_prelaunch.py` now accompanies the broader SDK evidence. |
| Firecrawl / Exa / Tavily actual use | Table now states that blocks instantiate clients and links the corresponding implementation files, not only dependency declarations. |
| Data / PDF / media use | Direct file-parser, PDF-preview and video-block references are present. The table describes concrete usage rather than inferring a general ML ecosystem moat. |
| Node event-loop behavior | Official blocking guide is cited alongside the worker-threads API. |
| Appliance reference | The pinned URL correctly points to repository-root `docs/platform/single-container.md`. |
| Generic TS porting score | Now scoped to reimplementing a substantial framework such as `graphiti-core`. BM25 is explicitly excluded from that estimate. The text gives no present justification and a bounded future reconsideration condition, without adopting a rewrite policy. |

## Remaining assessment

The memory section still clearly separates maintainer-reported whole-appliance memory from interpreter RSS and from measurements performed by this research. It includes the known GC mitigation, recognizes the target's own service/process costs and gives no unsupported Python/TS memory multiplier. GIL/free-threading and asynchronous-I/O claims remain appropriately scoped.

The library table still distinguishes an official TS service interface from an equivalent local algorithm implementation. Graphiti is a candidate for further comparison, hosted Mem0 usage is not relabeled as an embedded engine, and Stagehand's locked Python v3 is not assumed equivalent to current v4 documentation. No new library adoption has been introduced.

The two numerical code ranges remain explicitly low-confidence, incremental handwritten **TS adapter** estimates. They are not total capability-integration estimates; the exclusions for Python implementation, security/isolation, storage, deployment, tests and qualification are visible. The qualitative scores are engineering judgments rather than benchmark or availability claims. The substantial-framework row no longer generalizes a difficult framework port to every Python algorithm.

The owner-boundary paragraph keeps a hypothetical Python component responsible only for its named capability. It retains commercial/tenant authority in Platform, business coordination in Orchestrator and technical execution/custody in Runtime. It requires the existing bounded adapter/transport semantics and explicitly avoids creating another scheduler or global grant ledger. I found no new authority or adoption decision in this paragraph.

No further change is required for this review's scope. Preserve these qualifications in the final user-facing explanation, especially when summarizing the memory number, TS parity and adapter LOC.
