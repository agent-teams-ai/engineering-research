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
| Runtime v3 | [Local research applicability](https://github.com/agent-teams-ai/agent-runtime/blob/4f5811c9d41dcf4201992be689385df6e73b492d/docs/spikes/shared-research-integration-plan.md) | [#248](https://github.com/agent-teams-ai/agent-runtime/pull/248) |
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

## Current hosted verification

Observed at **2026-11-04T19:06:08Z**. Runtime PR248 now has head [`4f5811c9`](https://github.com/agent-teams-ai/agent-runtime/commit/4f5811c9d41dcf4201992be689385df6e73b492d), with the previous research head and current main `4e12b68b751d0b6fbb1e629235f789d01aa910b2` as its two parents. All eight research-document blobs are identical to the previous head; the current PR delta remains eight documentation/instruction files, 180 additions and no deletions. The original three coherent research commits and their authorship remain intact.

The actual [trusted identity execution](https://github.com/agent-teams-ai/agent-runtime/actions/runs/41891065189/job/126788278382) succeeded. Both base and head now use the reviewed alias-aware implementation at `77a0f46cbfc7688cbabbe12ee819e50ba6f64234`; their caller and retained platform-contract digest agree. This resolves the `iliya` / `Илия` publication mismatch in place. A canonical replacement branch or PR is no longer required.

| Runtime check | Exact-head observation |
| --- | --- |
| Trusted author identity | [Success](https://github.com/agent-teams-ai/agent-runtime/actions/runs/41891065189) |
| Documentation Protocol | [Success](https://github.com/agent-teams-ai/agent-runtime/actions/runs/41891065619) |
| Node Default and Compatibility | [Success](https://github.com/agent-teams-ai/agent-runtime/actions/runs/41891064757) |
| Required `check` aggregate | [Success](https://github.com/agent-teams-ai/agent-runtime/actions/runs/41891065119/job/126792598039) |
| Required `postgres-durability` | [Success](https://github.com/agent-teams-ai/agent-runtime/actions/runs/41891065119/job/126788273355) |
| Required `runtime-macos` | Not yet emitted; [General CI](https://github.com/agent-teams-ai/agent-runtime/actions/runs/41891065119) still has unfinished `macos-15` package jobs |

The [active Runtime protection rule](https://github.com/agent-teams-ai/agent-runtime/rules/19979781) requires `runtime-macos` in addition to the other successful contexts. The macOS matrix has begun executing and has no observed failure, but queued/in-progress work is not success. This remaining scheduling wait prevents an all-required-checks-complete claim. No runner label, gate, required context or workflow was changed by this documentation delivery.

Orchestrator and Platform retain their verified draft heads and successful hosted workflows, including trusted author identity. The preceding central publication head `53c635d2e0a92810d389199da597d6c128adedaf` passed [Research Documentation](https://github.com/agent-teams-ai/engineering-research/actions/runs/41744860709). A subsequent publication update must pass its own central documentation check; its actual result belongs in the live PR description. [The validation record](../../data/validation-summary.json) separates current observations from the original executed checks and historical failures.

## Runtime hosted identity blocker and prepared handoff

**Historical record; identity blocker resolved.** The heading is retained so existing links remain valid. At the earlier head `715425189f7f9ea5308e34f0e74787bdd16f7f65`, the [trusted job](https://github.com/agent-teams-ai/agent-runtime/actions/runs/41741968756/job/126285436973) rejected the approved name alias because its retained implementation accepted only the canonical spelling. Two reviewers identified the base/head caller dependency, and repository inspection identified the retained CI trust contract. A head-only caller edit or blind hash replacement would not have been a complete adoption.

The [handoff manifest](../../evidence/publication/runtime-canonical-republish/manifest.json) and its three patches are unchanged historical evidence:

1. [Integration plan and navigation](../../evidence/publication/runtime-canonical-republish/01-integration-plan.patch).
2. [Independent-review clarifications](../../evidence/publication/runtime-canonical-republish/02-review-clarifications.patch).
3. [Published central routes and retained source notices](../../evidence/publication/runtime-canonical-republish/03-central-routes.patch).

At preparation time, applying these patches to an isolated index based on `4bdc93a43b58469f60ca10c0dca512824650c8ac` reproduced every original published tree, ending at `20e0404d2e30f98a8303fbb6ff049278a96fd9bc`. No replacement commits or PR were created. The manifest's original prerequisites and apply instructions describe that superseded contingency; **do not execute them as the current delivery plan**. The verified in-place adoption above removed that requirement without rewriting research history.

The earlier empty-successor-workflow/concurrency wait is also historical. The current General CI run has executed the non-macOS lanes successfully and is waiting for the remaining macOS matrix work. Both dated observations remain in the validation record. Neither scheduling state is a finding about Runtime v3 architecture or a change to the research scores.
