---
id: research.methodology.sources
type: methodology
status: active
owner: research/maintainers
summary: Pinned repository sources and the original research-document inventory.
---

# Source Inventory

The initial inventory covers **73 source documents: 72 Markdown and one YAML**. It records discovery and migration disposition, not 73 completed competitor audits. Original review dates stay in each study. Exact source hashes identify bytes; they do not prove the correctness or execution of a reported experiment.

The complete [machine inventory](../../data/source-inventory.json) retains repository, path, source commit/URL, stable ID where present, SHA-256, byte size, classification, actual central target and publication status. The [five-import provenance manifest](../../data/import-provenance.json) maps unchanged raw originals to maintained central documents. [Publication status](../../data/publication-status.json) records the central and product draft publications separately from merge and managed admission.

## Pinned repository sources

| Repository | Revision | Inventory records |
| --- | --- | ---: |
| agent-teams-ai/agent-runtime | [4bdc93a](https://github.com/agent-teams-ai/agent-runtime/tree/4bdc93a43b58469f60ca10c0dca512824650c8ac) | 28 |
| agent-teams-ai/agent-teams-orchestrator | [981dd83](https://github.com/agent-teams-ai/agent-teams-orchestrator/tree/981dd836ca3d35b764561bdc11dc2e0544d83416) | 16 |
| agent-teams-ai/agent-teams-platform | [7f6eb37](https://github.com/agent-teams-ai/agent-teams-platform/tree/7f6eb3746c07dc01751c29a8dbc62e50b5f7ad6d) | 11 |
| agent-teams-ai/extension-foundation | [39c72bf](https://github.com/agent-teams-ai/extension-foundation/tree/39c72bf3061dd6cf4aa4bd3c92f0c9b3f88a0bde), [70f03d3](https://github.com/agent-teams-ai/extension-foundation/tree/70f03d3d9e134780f27268339a6729a7305a2363) | 18 |

Paperclip assessment source: [`61e8d5c7eb097664958e00c30ccd88bb51359043`](https://github.com/paperclipai/paperclip/tree/61e8d5c7eb097664958e00c30ccd88bb51359043). This is an additional inspected code/evidence corpus, not one of the 73 migrated-discovery records. Engineering Foundation workflow source: [99b7dac2](https://github.com/agent-teams-ai/engineering-foundation/blob/99b7dac2fd3c3b2b1b024a8a640f6e13ec79dbef/docs/reference/open-source-docs-protocol.md). The published Docs Protocol coordinate was independently checked as `0.6.2`; source-manifest versions were not treated as release proof.

## Disposition totals

| Disposition | Count | Meaning |
| --- | ---: | --- |
| Draft-published whole evidence imports | 5 | Runtime reports with exact raw originals and transformed maintained copies; source bodies retained |
| Draft-published shared extracts | 3 | Orchestrator reusable evidence; decisions/pins/gates retained locally |
| Owner-local links | 27 | Product-specific plans, models, reviews or qualification |
| Immutable historical links | 23 | Dated archives and original evidence remain at source |
| Unmerged draft-evidence links | 15 | Extension Foundation PR55 at its exact head, not main |

## Audit and maintenance rules

The [migration workflow](research-migration.md) defines completion and reciprocal links. The [maintenance workflow](research-maintenance.md) defines freshness and source corrections. A new source scan does not silently change a historical hash, a version pin or a qualified result. Use ordinary links for cross-repository evidence; `related` metadata names only IDs in this local catalog.

The five unchanged original Markdown files live outside `docs/`, under `evidence/imports/agent-runtime/`. Their former frontmatter is deliberately retained as historical bytes and is not a second active catalog. Use maintained `docs/studies/` records for navigation and updates; use raw snapshots to verify provenance.
