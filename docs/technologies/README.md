---
id: docs.technologies
type: index
status: active
owner: research/maintainers
summary: Scenario-based cross-language technology findings, fit, risks, evidence and bounded further research.
---

# Technology and Library Catalog

## Purpose and status

This is the common research entrypoint for reusable libraries, engines, services and open-source patterns across Agent Teams products. It records what may fit, what does not fit a named scenario, and what still needs investigation. **An active catalogue document is not an adopted technology or a production qualification.** Product decisions and existing dependency pins remain with their owners.

Initial assessment: **2026-11-06**, following the [AutoGPT comparison](../competitors/autogpt-vs-agent-teams-architecture-and-python-ecosystem.md) and [ReviewRouter memory SDK audit](../studies/review-router-memory-sdk-extraction.md). The [architecture follow-through study](../studies/architecture-follow-through-from-autogpt-and-memory.md) separates already-covered requirements from small proposed clarifications. The [source inventory](../methodology/source-inventory.md) records the pinned and rolling evidence boundaries.

## Categories

| Maintained category | Candidates and questions |
| --- | --- |
| [Memory and Knowledge](memory-and-knowledge.md) | Existing `context-memory`; Hindsight, Graphiti, FalkorDB and Mem0; current facts versus derived knowledge, provenance and deletion. |
| [Agent Execution and Sandboxes](agent-execution-and-sandboxes.md) | Claude Agent SDK, E2B and Stagehand; agent/process/browser boundaries and cancellation. |
| [Browsing Search and Retrieval](browsing-search-and-retrieval.md) | Firecrawl, Exa, Tavily and permission-aware BM25 discovery; bounded browsing and evidence acquisition. |
| [Observability and Prompts](observability-and-prompts.md) | OpenTelemetry and Langfuse; trace interoperability, prompt/evaluation tooling and data exposure. |
| [Data and Document Processing](data-and-document-processing.md) | pandas/openpyxl, Arrow, DuckDB, PDFium and MoviePy/FFmpeg; native compute, data interchange and worker isolation. |
| [Modularity and Extension Contracts](modularity-and-extension-contracts.md) | Get Modular, AutoGPT blocks/skills and external protocol boundaries; useful composition versus unnecessary framework layers. |

The category file is authoritative for a candidate's current assessment. This index deliberately does not maintain a duplicate score table. If a technology crosses categories, give it one primary record and link to it from the other category.

## How to read an entry

Each candidate is evaluated for a **named role**, not as a universal replacement. A high score for an optional remote capability says nothing about its suitability as a mandatory disconnected dependency. Different categories are not a common leaderboard and their scores should not be averaged.

| Classification | Meaning |
| --- | --- |
| Strong scoped candidate | A concrete fit with an identifiable owner and bounded integration; still requires the named missing evidence before selection. |
| Conditional candidate | Useful if a stated requirement, deployment mode or capability gap actually exists. |
| Further research / low current priority | Interesting, but evidence or differentiation is insufficient to justify adoption work now. |
| Unsuitable for the named scenario | State the exact mismatch, such as a hosted-only path for disconnected use or a telemetry store for durable business authority. Do not turn that into a global blacklist. |
| Existing use | Describe the actual product, version and configuration separately from any proposed reuse elsewhere. Existing use is evidence, not automatic organization-wide adoption. |

**Fit /10** is an ordinal engineering assessment of utility in the named scenario. **Confidence /10** is confidence in that assessment, based on inspected evidence. These are not uptime, probability of success, speed or security certifications. Roughly 8–9 is a strong scoped fit; 6–7 is conditional; 4–5 means lower priority or substantial overlap. Unknown remains unknown rather than zero. Follow the existing [evaluation methodology](../methodology/evaluation-methodology.md) for any comparative ranking with a common scenario and criterion mask.

Where alternatives include cost, use separate **expected reliability**, **recommendation confidence** and **complexity** scores. Higher complexity means harder implementation/maintenance. Count new or materially rewritten production code separately from tests, unchanged moved code, generated SDKs and native/deployment work. State estimate confidence independently; wrapper LOC never represents the full cost of operating a service.

## Language and operating model matter separately

Record the engine's implementation language, the available clients and the actual deployment shape: pure library, in-process native binding, local child process, self-operated server, managed BYOC or hosted service. A TS client can control a Python engine. An npm launcher can start a separate Python daemon. A Python API may mostly call a C++ engine. Neither client language nor package installation proves equivalent algorithm capabilities, local operation or lower RAM use.

The initial catalogue therefore favors supported TS clients for ordinary service calls, retains specialist Python/native capabilities where they solve a demonstrated problem, and avoids rewriting engines merely for language uniformity. Self-hosting and offline operation require separate examination of models, databases, browser/binary assets and outbound calls. No cross-language or whole-system benchmark was run for this catalogue.

## What belongs in every maintained record

1. Name, kind, official repository/documentation and observation date; exact version/commit or an explicit rolling-documentation qualifier.
2. Named consumer scenario and relevant owner; implementation language, client language and deployment constraints.
3. Evidence class: inspected source, upstream documentation, inspected tests, executed experiment or attributed historical result. Keep vendor claims distinct from measured results.
4. Fit and confidence with a short reason; existing adoption and proposed reuse separately.
5. Good fit, poor fit and counterevidence; authority, data, operational, migration, licensing and semantic risks that actually matter for this role.
6. One bounded next investigation and the missing evidence it would resolve. If no current need justifies a spike, say so.
7. Links to accepted owner decisions when applicable; research itself does not select an engine, upgrade a package or add a release gate.

## Initial research priorities

First, evaluate reuse of the **existing small memory SDK** through a concrete external consumer, with explicit write uncertainty and provider boundaries. The alternative ranges and exclusions live in the [SDK study](../studies/review-router-memory-sdk-extraction.md).

Next, study a technology only where there is a concrete capability question: BM25 for a bounded capability catalogue; Graphiti for a temporal/provenance gap; DuckDB versus pandas for the same tabular workload; Stagehand for a needed browser behavior; one search provider against a labelled query corpus; or OpenTelemetry for one cross-process operation. None of these requires importing all available provider stacks.

Keep a full memory-platform rewrite, universal plugin loader and additional control-plane scheduler outside this work. The [follow-through study](../studies/architecture-follow-through-from-autogpt-and-memory.md) explains why the current owners already cover most attractive AutoGPT patterns.

## Maintenance

Add a record to its category when new evidence is available; create another registered category only when the scope warrants it. Refresh the date and exact source when a version-sensitive claim changes. Preserve older qualification/version statements rather than rewriting history with current upstream docs. Promote a research candidate only through the owning product's normal decision and qualification process. See [research maintenance](../methodology/research-maintenance.md).

[Documentation map](../README.md)
