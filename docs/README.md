---
id: docs.index
type: index
status: active
owner: "research/maintainers"
summary: Navigate shared technical research, evidence, decisions to evaluate, and product-owner follow-through.
---

# Research Documentation

This map routes readers and agents by task. The repository separates shared source evidence from product-owned decisions and implementation acceptance. Start with one dossier and follow its evidence; do not load the entire historical corpus for a narrow question.

| Collection | Contents and first useful route |
| --- | --- |
| [Technology and Library Catalog](technologies/README.md) | Cross-language candidates by capability, fit, risks, evidence and next research; memory SDK extraction and architecture follow-through |
| [Competitors](competitors/README.md) | [AutoGPT vs Agent Teams](competitors/autogpt-vs-agent-teams-architecture-and-python-ecosystem.md), [Paperclip](competitors/paperclip.md), [Waku Agent](competitors/waku-agent-2026-11-23.md), [Agent Teams](competitors/agent-teams.md), the [30-criterion matrix](competitors/technical-comparison.md), and an unscored [watchlist](competitors/competitor-watchlist.md) |
| [Methodology](methodology/README.md) | Criteria, evidence interpretation, comparable boards, freshness, migration, source identities, independent review |
| [Lessons](lessons/README.md) | Existing pattern identities, source-specific failure lessons, concrete decisions inside current owner plans |
| [Studies](studies/README.md) | Task verification and review, Runtime architecture and durability, coordination, identity, persistence and cross-product research; grouped by topic |

## Active work and reusable findings

| Need | Start here |
| --- | --- |
| Task Verification collaboration | [Current handoff](studies/task-verification-handoff-2026-11-22.md#agent-start-here) — agent reading route, active checkpoint, permitted next steps and decision criteria; raw attempts remain in the experiment repository. |
| Typed LLM outputs and evidence-testing libraries | [Technology record](technologies/observability-and-prompts.md#structured-output-and-evidence-testing--2026-11-23) — reuse candidates, not adoption. |
| Architecture or competitor investigation | [Dossiers](competitors/README.md) and [topic-grouped studies](studies/README.md). |
| A concrete product change | [Owner-linked preimplementation priorities](lessons/preimplementation-decisions.md); the owning repository retains implementation authority. |

## Research selection and decision follow-through

Use the [Foundation-first ecosystem vision](https://github.com/agent-teams-ai/.github/blob/bb7b1c00f18a8c532681f286afa51dda954469b4/docs/architecture/ecosystem-vision.md) as the product-owner
context for selecting research, not as evidence that a proposed technology
works. Existing collections stay canonical; use the
[claim classification and review route](methodology/research-maintenance.md#foundation-first-evidence-to-decision-route)
to separate source evidence, reusable patterns, antipatterns, candidates and
owner decisions. Do not create another copy of the corpus or treat a finding
as an implementation mandate.

## Where to put new material

Keep one maintained entrypoint for each active collaboration or decision; put the next action and its evidence links first. Preserve dated checkpoints and superseded research through immutable references rather than copying old instructions into every handoff. Put reusable library assessments in the technology catalog, competitor dossiers in Competitors, scoped studies in Studies, and shared method or failure lessons in their existing collections. Link across collections instead of maintaining duplicate assessments. Product repositories retain their experiment artifacts, implementation plans and decisions. Use the registered Docs Protocol routes for new documents; prefer editing an existing canonical record to creating another page for a conversation.

A handoff must be usable without the original chat: retain the active objective, exact authority and scope, source/evidence identity, remaining ordered work, decision and stop criteria, and the required next written update. For evaluations, separate preparation/adjudication access from the actual reviewer-visible inputs. Historical detail belongs at immutable source links; current work must not require reconstructing intent from archived conversations.

## Agent reading routes

- **Compare a competitor:** read its dossier → [method](methodology/evaluation-methodology.md) → the exact source claim → [comparison](competitors/technical-comparison.md). Keep its edition, commit, scenario and evidence basis fixed.
- **Plan a product feature:** read [preimplementation decisions](lessons/preimplementation-decisions.md) → the owning repository's accepted decision and current open decision → the relevant shared finding. Research cannot supply missing adoption authority.
- **Add a source or refresh a score:** read [maintenance](methodology/research-maintenance.md) → [source inventory](methodology/source-inventory.md) → [authoring workflow](../.agents/skills/docs-authoring/SKILL.md). Retain counterevidence and previous assessment identity.
- **Move existing research:** read [migration](methodology/research-migration.md). Preserve original bytes, review dates, stable lesson IDs, used anchors and product-local policy.
- **Check what is proven:** read the claim's source class and [review record](methodology/research-review-record.md). A source-inspected test is not a test executed by this review; a target architecture is not a deployed capacity result.

## Delivery boundary

The initial central corpus was published in [PR #1](https://github.com/agent-teams-ai/engineering-research/pull/1) and merged to `main` on **2026-11-05**; its [source-pinned evidence snapshot](https://github.com/agent-teams-ai/engineering-research/tree/12c40892e805944719d6fbec14d2c26874803b2c) remains unchanged. The product integration PRs were still open drafts at the 2026-11-11 triage:  [Runtime #248](https://github.com/agent-teams-ai/agent-runtime/pull/248), [Orchestrator #94](https://github.com/agent-teams-ai/agent-teams-orchestrator/pull/94), and [Platform #59](https://github.com/agent-teams-ai/agent-teams-platform/pull/59). Historical source bodies are retained. The [migration ledger](methodology/research-migration.md) records the immutable central snapshot, reciprocal product routes and their verification.
