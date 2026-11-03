# Engineering Research

Shared technical research for Agent Teams: competitor assessments, reusable engineering evidence, failure lessons, and the reasoning behind proposed improvements. Product repositories retain their accepted decisions, contracts, implementation plans, and qualification evidence.

**Delivery status:** the initial corpus is being published in [central draft PR #1](https://github.com/agent-teams-ai/engineering-research/pull/1). Product integration drafts are [Runtime #248](https://github.com/agent-teams-ai/agent-runtime/pull/248), [Orchestrator #94](https://github.com/agent-teams-ai/agent-teams-orchestrator/pull/94), and [Platform #59](https://github.com/agent-teams-ai/agent-teams-platform/pull/59). These changes are reviewable drafts; the research corpus is not yet merged into the default branch.

## Start with the question

| Question | Read |
| --- | --- |
| Where is everything? | [Documentation map](docs/README.md) |
| What does Paperclip actually do well and where might it become expensive? | [Paperclip source dossier](docs/competitors/paperclip.md) |
| How does our selected v3 architecture compare? | [Agent Teams dossier](docs/competitors/agent-teams.md) and [technical matrix](docs/competitors/technical-comparison.md) |
| What should we settle before implementing the affected feature? | [Preimplementation decisions](docs/lessons/preimplementation-decisions.md) |
| Which existing lessons can we reuse? | [Patterns and failure lessons](docs/lessons/patterns-and-failure-lessons.md) and [dated studies](docs/studies/README.md) |
| How do scores, evidence, updates, and corrections work? | [Evaluation method](docs/methodology/evaluation-methodology.md) and [maintenance](docs/methodology/research-maintenance.md) |
| What was imported, what remains local, and what is still pending? | [Migration ledger](docs/methodology/research-migration.md) and [source inventory](docs/methodology/source-inventory.md) |
| Which competitor should we research next? | [Research watchlist](docs/competitors/competitor-watchlist.md) |

The first comparison contains 30 criteria in six dimensions, explicit unknowns, and a separate conditional architecture view. It is an initial assessment, not a qualified fleet leaderboard. Historical scores remain attached to their original rubric. GitHub stars, audience size, funding, and brand preference do not affect technical scores.

## Ownership

| Owner | Maintained responsibility |
| --- | --- |
| This repository | Reusable facts, pinned sources, comparison methods, common lessons, review records, research freshness |
| Agent Runtime | Ordinary v3 S1–S5, separate C0–C3 capacity delivery, technical execution truth, physical custody, runtime qualification |
| Orchestrator | Product coordination, domain decisions, consumption policy, identity and authorization integration, accepted backend roles |
| Platform | Commercial access, product authority, deployment intent/acceptance/convergence, cross-product installation boundaries |
| Engineering Foundation | Docs Protocol and organization tooling/admission contracts |

A shared finding can propose a product change. Only the existing owner process can accept that change. This repository has no ADR type and cannot qualify a product profile. An `active` research document is maintained evidence, not an adopted implementation.

## Work with the documents

Use Node 24.22.1 and the pinned pnpm 11.25.0 from `package.json`. Install the exact lockfile, then use the published Docs Protocol dependency:

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm docs:info -- --json
pnpm docs:find -- --text "Paperclip" --json
pnpm docs:context -- --json
pnpm check
```

Read [AGENTS.md](AGENTS.md) and the repository [authoring workflow](.agents/skills/docs-authoring/SKILL.md) before changing the catalog. New documents use reviewed `docs:new` preview/apply plans; existing documents are ordinary reviewed edits. Every document has a stable ID, owner, status, summary, and direct index route. Evidence identity and local links receive focused checks in addition to the catalog check.

This initial delivery uses Markdown, JSON records, and existing Docs Protocol tooling. It adds no application, portal, crawler, scheduler service, or custom scoring engine. Background refresh has not been activated; the [maintenance queue](docs/methodology/research-maintenance.md) defines the next reviews and publication boundary.

## Repository admission and publication

The repository is documentation-only and starts **pending_classification**. Portable Docs Protocol is configured at the published coordinate `@agent-teams/docs-protocol@0.6.2`; managed organization admission is separately pending. This does not claim a docs-only exemption, production Foundation admission, branch protections, or a published release.

The [migration record](docs/methodology/research-migration.md) gives the concrete publication sequence. Source snapshots and hashes are preserved. The central draft is open; each coherent commit is pushed immediately, followed by verified central commit links in the product drafts. Keep all PRs draft until their actual review and checks are complete.
