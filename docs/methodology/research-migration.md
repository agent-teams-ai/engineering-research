---
id: research.methodology.migration
type: methodology
status: active
owner: research/maintainers
summary: Provenance-preserving transfer, owner-local decisions and delivery dependencies.
---

# Research Migration

Status: **central corpus and reciprocal product routes published and verified in draft PRs**. The source inventory contains 73 source-document records (72 Markdown and one YAML) at exact repository commits. This delivery publishes five Runtime reports as provenance-preserving imports, three reusable Orchestrator extracts, and an index of existing Extension Foundation plugin research. Other material remains with its semantic or evidence owner.

The machine-readable [migration inventory](../../data/source-inventory.json) records the original repository/path/commit, original stable ID where present, original SHA-256 and size, disposition, central destination and actual transfer status. The [source inventory guide](source-inventory.md) explains its scope. It is not a manifest of files already removed from source repositories.

## Published imports and intentional non-moves

| Source family | Central treatment | Source repository treatment |
| --- | --- | --- |
| Runtime industry, framework, library, durability, antipattern reports | Five maintained import documents under `docs/studies/`, each with original-date/source notice; exact original bytes retained under `evidence/imports/agent-runtime/` | Original bodies remain unchanged during draft publication; their IDs, all original heading anchors and owner references are preserved |
| Runtime modular architecture synthesis, experiments, review and October archive | Immutable source discovery and owner links | Remain Runtime-owned; no plan, gate, qualification or historical review is transferred |
| Orchestrator identity-provider, composition/scale and persistence-tooling research | Three focused shared-evidence extracts, preserving historical dates and version pins | Product recommendations, acceptance scenarios, ADR reconciliation and exact adopted pins stay local |
| Other Orchestrator research | Source-inventory discovery | Remains local where it owns a domain decision, migration, experiment, or release gate |
| Platform boundary and ten review documents | Owner links from the Agent Teams dossier and local integration proposal | Remain Platform-owned; accepted authority and qualification are not centralized |
| Extension Foundation PR55 and older qualification research | Pinned [plugin research index](../studies/plugin-system-research-index.md) with unmerged/historical status | Original draft source and immutable experiment artifacts remain in place; this is indexing, not ownership transfer |

Imports retain the original report body and lesson IDs, with explicit historical Runtime-applicability labeling. They do not turn old product recommendations into neutral cross-product policy. Relative source links are rewritten to their original immutable repository locations; imported sibling research can link centrally only when the original anchor remains valid. Raw originals allow the transformation to be audited byte-for-byte.

## Why the old reports remain intact in the product PRs

The central corpus is published in [draft PR #1](https://github.com/agent-teams-ai/engineering-research/pull/1), with the complete initial evidence snapshot at [`12c40892`](https://github.com/agent-teams-ai/engineering-research/tree/12c40892e805944719d6fbec14d2c26874803b2c). All 62 intended files in that snapshot were checked against the independently read GitHub tree and matched their local Git blob hashes; no extra files or truncated tree were observed. Later draft commits update publication and validation records without changing the assessed upstream identities.

The five imports are recorded as `published-central-import-draft`, the three extracts as `published-shared-extract-draft`, and source-only discovery as `indexed-owner-source` or its historical/draft equivalent. Product notices add an immutable central evidence link and a maintained draft discovery route while preserving every original historical body byte, heading anchor, relation ID and date. The original complete files remain byte-identical in the raw central snapshots. This retention avoids breaking existing readers; it is not a second independently maintained research authority.

Product recommendations, accepted decisions and qualification remain local. Draft publication is separate from merging or accepting a product decision.

Published draft PRs:

- [Runtime #248](https://github.com/agent-teams-ai/agent-runtime/pull/248): ordinary/capacity applicability and preservation of the five source reports.
- [Orchestrator #94](https://github.com/agent-teams-ai/agent-teams-orchestrator/pull/94): owner-specific usage, coordination, authority and view follow-through.
- [Platform #59](https://github.com/agent-teams-ai/agent-teams-platform/pull/59): deployment convergence, commercial mapping and authorized view follow-through.

## Product applicability routes

These pinned owner documents describe proposed local follow-through. They are not accepted ADRs or qualification records.

| Owner | Published document | Draft review |
| --- | --- | --- |
| Runtime v3 | [Local research applicability](https://github.com/agent-teams-ai/agent-runtime/blob/715425189f7f9ea5308e34f0e74787bdd16f7f65/docs/spikes/shared-research-integration-plan.md) | [#248](https://github.com/agent-teams-ai/agent-runtime/pull/248) |
| Orchestrator | [Local research applicability](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/310bf70db7814370ef93e17e59de2380f93a4c4c/docs/research/shared-research-integration-plan.md) | [#94](https://github.com/agent-teams-ai/agent-teams-orchestrator/pull/94) |
| Platform | [Local research applicability](https://github.com/agent-teams-ai/agent-teams-platform/blob/ff664eae6d53b77977b0ef57eb3556b2ba606f82/docs/architecture/shared-research-integration-plan.md) | [#59](https://github.com/agent-teams-ai/agent-teams-platform/pull/59) |

## Published delivery sequence

| Published unit | Immutable revision / review route |
| --- | --- |
| Empty repository initialized with identity README | [`e4446513`](https://github.com/agent-teams-ai/engineering-research/commit/e44465139c2b9c32fc3c3fb73f3890fe3877ad4b) |
| Portable catalog, templates and agent navigation; central draft opened immediately | [`362ec56a`](https://github.com/agent-teams-ai/engineering-research/commit/362ec56a09f6a4ac92041a202fb22977508b93e1), [PR #1](https://github.com/agent-teams-ai/engineering-research/pull/1) |
| Scoring, source inventory, maintenance and native documentation CI | [`4d1a4db3`](https://github.com/agent-teams-ai/engineering-research/commit/4d1a4db3c9c144b7df15d83028dedfcb79b82c69) |
| Five full imports, three extracts, existing-study discovery and exact raw originals | [`22f38b31`](https://github.com/agent-teams-ai/engineering-research/commit/22f38b31d934046ce5d64cbf0cf2bd8354eb76cc) |
| Paperclip/Agent Teams assessment, owner decision cards and independent review | [`12c40892`](https://github.com/agent-teams-ai/engineering-research/commit/12c40892e805944719d6fbec14d2c26874803b2c) |
| Reciprocal source notices and owner-local applicability | Product draft heads in [publication status](../../data/publication-status.json) |
| Catalog, provenance, link and hosted checks | [Validation summary](../../data/validation-summary.json) |

Each coherent commit was pushed immediately after creation. The central and product PRs remain drafts as requested; no merge is part of this delivery. The default branch contains only the initial bootstrap until the central draft is reviewed and merged. Immutable evidence URLs already resolve; the draft branch is explicitly a discovery route, not an adopted default-branch document.

Before any later source shortening, inventory inbound references and retain all used anchors and relation IDs. Do not delete an evidence archive or accepted decision to make the repository look centralized. A later reviewed merge should update maintained discovery links to the default branch while leaving pinned evidence URLs intact.

Repository classification stays `pending_classification`; managed documentation admission and remote required-check protection remain separate organization-owned onboarding work. Native portable Docs Protocol success does not supply those outcomes or a documentation-only exemption.

## Transformation invariants

- The original byte hash and immutable Git URL survive every maintained rewrite.
- Original research dates and upstream pins do not change on import; the import date is separate.
- Stable K/MR/GP/PR lesson identifiers remain intact. A new central document ID has an explicit origin ID mapping.
- Owner-local decisions retain their accepted/proposed status. `active` shared research is not adoption.
- Historical fixed defects remain historical. A draft PR remains a draft source until its actual disposition is observed.
- Local links never accidentally retarget `../architecture` or owner evidence into this repository.
- Main-branch navigation may aid discovery, but an assessment cites the exact source identity used.
- Derived prose, raw imported bytes, reviewed source tests and newly executed checks remain distinguishable.

## Completion definition

Draft migration is complete only when the central draft exists, its intended content is published, reciprocal product routes resolve to verified files, provenance is intact, and changed documentation gates pass. Corpus publication, reciprocal routes, retained-body proofs and all three local documentation gates have passed. The initial central hosted check passed; exact product and central hosted observations are recorded in [publication status](../../data/publication-status.json) and [validation summary](../../data/validation-summary.json). Merge, managed admission and product qualification are separate outcomes.
