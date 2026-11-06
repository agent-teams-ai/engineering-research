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
| [Competitors](competitors/README.md) | [AutoGPT vs Agent Teams](competitors/autogpt-vs-agent-teams-architecture-and-python-ecosystem.md), [Paperclip](competitors/paperclip.md), [Agent Teams](competitors/agent-teams.md), the [30-criterion matrix](competitors/technical-comparison.md), and an unscored [watchlist](competitors/competitor-watchlist.md) |
| [Methodology](methodology/README.md) | Criteria, evidence interpretation, comparable boards, freshness, migration, source identities, independent review |
| [Lessons](lessons/README.md) | Existing pattern identities, source-specific failure lessons, concrete decisions inside current owner plans |
| [Studies](studies/README.md) | Five dated Runtime studies, three reusable Orchestrator extracts, the pinned plugin-research index, historical comparison |

## Agent reading routes

- **Compare a competitor:** read its dossier → [method](methodology/evaluation-methodology.md) → the exact source claim → [comparison](competitors/technical-comparison.md). Keep its edition, commit, scenario and evidence basis fixed.
- **Plan a product feature:** read [preimplementation decisions](lessons/preimplementation-decisions.md) → the owning repository's accepted decision and current open decision → the relevant shared finding. Research cannot supply missing adoption authority.
- **Add a source or refresh a score:** read [maintenance](methodology/research-maintenance.md) → [source inventory](methodology/source-inventory.md) → [authoring workflow](../.agents/skills/docs-authoring/SKILL.md). Retain counterevidence and previous assessment identity.
- **Move existing research:** read [migration](methodology/research-migration.md). Preserve original bytes, review dates, stable lesson IDs, used anchors and product-local policy.
- **Check what is proven:** read the claim's source class and [review record](methodology/research-review-record.md). A source-inspected test is not a test executed by this review; a target architecture is not a deployed capacity result.

## Delivery boundary

The central corpus is published in [draft PR #1](https://github.com/agent-teams-ai/engineering-research/pull/1). Product draft PRs are [Runtime #248](https://github.com/agent-teams-ai/agent-runtime/pull/248), [Orchestrator #94](https://github.com/agent-teams-ai/agent-teams-orchestrator/pull/94), and [Platform #59](https://github.com/agent-teams-ai/agent-teams-platform/pull/59). Historical source bodies are retained. The [migration ledger](methodology/research-migration.md) records the immutable central snapshot, reciprocal product routes and their verification.
