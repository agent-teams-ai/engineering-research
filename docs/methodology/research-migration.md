---
id: research.methodology.migration
type: methodology
status: active
owner: research/maintainers
summary: Provenance-preserving transfer, owner-local decisions and delivery dependencies.
---

# Research Migration

Status: **central draft PR #1 open; corpus and reciprocal links being published**. The source inventory contains 73 source-document records (72 Markdown and one YAML) at exact repository commits. This delivery prepares five Runtime reports as provenance-preserving imports, three reusable Orchestrator extracts, and an index of existing Extension Foundation plugin research. Other material remains with its semantic or evidence owner.

The machine-readable [migration inventory](../../data/source-inventory.json) records the original repository/path/commit, original stable ID where present, original SHA-256 and size, disposition, central destination and actual transfer status. The [source inventory guide](source-inventory.md) explains its scope. It is not a manifest of files already removed from source repositories.

## Prepared imports and intentional non-moves

| Source family | Central treatment | Source repository treatment |
| --- | --- | --- |
| Runtime industry, framework, library, durability, antipattern reports | Five maintained import documents under `docs/studies/`, each with original-date/source notice; exact original bytes retained under `evidence/imports/agent-runtime/` | Original bodies remain unchanged during draft publication; their IDs, used anchors and owner references are preserved |
| Runtime modular architecture synthesis, experiments, review and October archive | Immutable source discovery and owner links | Remain Runtime-owned; no plan, gate, qualification or historical review is transferred |
| Orchestrator identity-provider, composition/scale and persistence-tooling research | Three focused shared-evidence extracts, preserving historical dates and version pins | Product recommendations, acceptance scenarios, ADR reconciliation and exact adopted pins stay local |
| Other Orchestrator research | Source-inventory discovery | Remains local where it owns a domain decision, migration, experiment, or release gate |
| Platform boundary and ten review documents | Owner links from the Agent Teams dossier and local integration proposal | Remain Platform-owned; accepted authority and qualification are not centralized |
| Extension Foundation PR55 and older qualification research | Pinned [plugin research index](../studies/plugin-system-research-index.md) with unmerged/historical status | Original draft source and immutable experiment artifacts remain in place; this is indexing, not ownership transfer |

Imports retain the original report body and lesson IDs, with explicit historical Runtime-applicability labeling. They do not turn old product recommendations into neutral cross-product policy. Relative source links are rewritten to their original immutable repository locations; imported sibling research can link centrally only when the original anchor remains valid. Raw originals allow the transformation to be audited byte-for-byte.

## Why the old reports remain intact in the product PRs

The central GitHub repository exists and [draft PR #1](https://github.com/agent-teams-ai/engineering-research/pull/1) is open. The product draft PRs retain historical source bodies and add owner-local applicability. Imports and extracts remain marked prepared until their actual publication is verified; reciprocal routes will name an immutable central commit. Draft publication is separate from merging or accepting a product decision.

Published draft PRs:

- [Runtime #248](https://github.com/agent-teams-ai/agent-runtime/pull/248): ordinary/capacity applicability and preservation of the five source reports.
- [Orchestrator #94](https://github.com/agent-teams-ai/agent-teams-orchestrator/pull/94): owner-specific usage, coordination, authority and view follow-through.
- [Platform #59](https://github.com/agent-teams-ai/agent-teams-platform/pull/59): deployment convergence, commercial mapping and authorized view follow-through.

## Concrete publication sequence

1. Create the empty `agent-teams-ai/engineering-research` repository with the organization's intended visibility. Keep repository classification `pending_classification`; complete managed documentation admission through its existing route rather than declaring an exemption.
2. Publish a minimal baseline branch containing the repository identity and authoring setup, then open a draft PR for the research body. Do not represent a locally prepared archive as an existing GitHub PR.
3. Publish coherent commits immediately in this order: authoring/index setup; scoring/source methodology; preserved existing research and provenance; Paperclip/Agent Teams comparison; lessons/decision cards and review resolutions. These are proposed commit boundaries, not commits already created.
4. Verify the central commit's files, IDs, anchors and imported hashes. Update the product PRs with real immutable central evidence links plus a maintained discovery route. Record the actual central commit in this ledger.
5. Mark the local source bodies as historical/current-route pointers only through reviewed owner changes that preserve every original heading anchor and relation ID by default. Shortening requires an explicit verified inbound-reference inventory and retained redirects/anchors; do not assume no external reader uses an old section. Do not delete an evidence archive or accepted decision to make the repository look centralized.
6. Review and run the owning documentation checks; keep PRs draft until the actual required review is complete. No merge is included in this task.

Each commit is a reviewable unit and is pushed as soon as created. The prepared central content has not accumulated local commits that could be mistaken for pushed work. Product commits are published in their respective draft branches.

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

Migration is complete only when the central remote/draft PR exists, the intended content is published, reciprocal product routes resolve to verified files, provenance is intact, and the changed owners' checks pass. Repository creation is complete. Publication and reciprocal-route verification are in progress; the completion evidence is recorded in [publication status](../../data/publication-status.json) and [validation summary](../../data/validation-summary.json).
