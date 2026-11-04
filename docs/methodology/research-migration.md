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

## Runtime hosted identity blocker and prepared handoff

The research corpus and reciprocal documentation routes are published. **Overall end-to-end delivery is not yet fully green:** Runtime PR248's trusted identity check rejects its three plugin-authored commits, and its general CI was still pending at the last recorded observation. This is a delivery-interface/consumer-policy mismatch, not a finding about Runtime v3 architecture or Paperclip's technical merits.

The [failed trusted job](https://github.com/agent-teams-ai/agent-runtime/actions/runs/41741968756/job/126285436973) reports `Owner source commits require exact raw author AND committer name/email`. Runtime's [retained caller](https://github.com/agent-teams-ai/agent-runtime/blob/715425189f7f9ea5308e34f0e74787bdd16f7f65/.github/workflows/commit-author-identity.yml) selects the [canonical-only implementation](https://github.com/agent-teams-ai/.github/blob/6d843f3a2c3f616aa2f4b902a866b1ff1a18f9c6/.github/workflows/commit-author-identity-check.yml). It requires raw author and committer name `iliya`. All three commits have the same real owner account and exact owner email, but the connected GitHub plugin emits the centrally approved name alias `Илия`. The exposed publication operations do not provide author/committer overrides. An authenticated native Git/CLI route is not available in this session; credentials are not requested in chat or stored in this repository.

Changing only the research-head caller cannot repair the base-owned `pull_request_target` execution. A later alias-aware adoption must update both base and research-head callers: otherwise the accepted verifier rejects the older head target as differing from the current reviewed implementation. Moreover, the caller is protected by [the platform contract](https://github.com/agent-teams-ai/agent-runtime/blob/715425189f7f9ea5308e34f0e74787bdd16f7f65/scripts/ci/platform-contract.json) and [the retained-contract conformance checks](https://github.com/agent-teams-ai/agent-runtime/blob/715425189f7f9ea5308e34f0e74787bdd16f7f65/scripts/ci/conformance.ts#L305-L331). A one-line caller replacement, or blindly refreshing its hash, is not a complete validated adoption. That is a separate owned CI trust-contract transition.

The smaller documentation-only handoff preserves the current verifier and all original research history. The [handoff manifest](../../evidence/publication/runtime-canonical-republish/manifest.json) records three exact patches:

1. [Integration plan and navigation](../../evidence/publication/runtime-canonical-republish/01-integration-plan.patch).
2. [Independent-review clarifications](../../evidence/publication/runtime-canonical-republish/02-review-clarifications.patch).
3. [Published central routes and retained source notices](../../evidence/publication/runtime-canonical-republish/03-central-routes.patch).

Each patch was applied in order to a disposable Git index based on independently observed main `4bdc93a43b58469f60ca10c0dca512824650c8ac`. Every resulting Git tree exactly matched the corresponding already-published source commit, ending at tree `20e0404d2e30f98a8303fbb6ff049278a96fd9bc`. This verifies the handoff bytes; it does not claim a canonical commit, push, replacement PR or successful hosted check was created.

With an authenticated native Git route, recheck current main, apply the patches on a fresh branch, create each new owner commit with both raw author and committer `iliya <iliyazelenkog@gmail.com>`, and push each commit immediately. Open the replacement as a draft, retain PR248 and its branch as provenance until the replacement is verified, and update the central delivery links only after the new actual PR/head exists. If main has moved, reconcile and validate instead of restoring whole old files. This route changes eight documentation/instruction files and **zero production or workflow lines**. The existing local documentation checks and byte-equivalence proof do not replace the replacement head's actual required hosted checks.

The old Runtime general workflow's final `always()` aggregate was observed waiting for its configured runner after its docs lane was cancelled by the successor head. The successor workflow had no jobs yet. This explains a separate scheduling wait; it is not a failed new-head documentation test and does not make the identity mismatch transient. The exact dated states are in [validation](../../data/validation-summary.json). No manual success status, protection change, CI relaxation, research merge or history rewrite was performed.
