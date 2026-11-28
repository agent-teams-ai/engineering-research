# Agent Navigation

This repository owns shared evidence and research methods. Product repositories
own accepted decisions, domain models, implementation plans and qualification.
Start with [the documentation map](docs/README.md); load the relevant dossier
and its linked owner record instead of reading the whole corpus.

For long-lived architecture or omission audits, use the
[decade-scale follow-through](docs/studies/decade-scale-architecture-follow-through-2026-11-28.md#agent-start-here).
It distinguishes existing coverage from missing first acceptance evidence and
routes each applicable question to its current owner; it is not a new product
authority or a task list for unrelated work.

<!-- agent-teams-docs:route/v1 begin -->
Use [.agents/skills/docs-authoring/SKILL.md](.agents/skills/docs-authoring/SKILL.md) for documentation.
<!-- agent-teams-docs:route/v1 end -->

Before planning, editing or reviewing, follow the organization
[Engineering Quality Standard](https://github.com/agent-teams-ai/.github/blob/main/docs/engineering-quality-standard.md),
including its [language rules](https://github.com/agent-teams-ai/.github/blob/main/docs/engineering-quality-standard.md#typescript-for-javascript-runtimes).
Do not copy those rules into a second maintained policy.

## Research discipline

- Pin the subject, edition, commit, configuration, scenario and observation date.
- Separate inspected source, documented claims, inspected tests, executed tests,
  historical resolved defects, inference and unknowns.
- Preserve strengths, counterevidence and deliberate tradeoffs. Popularity is
  outside the technical rubric; a missing search result is not proof of absence.
- Evaluate our current implementation and documented target separately. Assume
  selected target plans are correctly implemented only in that declared view.
- Scores are ordinal engineering judgments. Unknown is not zero. A ranked board
  uses one common criterion mask, scenario and evidence interpretation.
- Keep ordinary Runtime v3 S1-S5 separate from capacity delivery C0-C3. Active
  execution, queued work, controller fixtures and idle identities are different.
- Reuse existing finding IDs and owner contracts. Shared research does not adopt
  an ADR, reopen an accepted choice, add a release gate, or revoke qualification.
- Preserve immutable origin/evidence bytes and old links during migration. New
  source claims require revalidation; moving a document does not refresh it.
- Commit coherent documentation changes and publish each commit immediately when
  the remote is available. Keep work in draft PRs until the requested review ends.

## Documentation organization

Keep active collaboration entrypoints short and decision-oriented: current checkpoint, next actions, acceptance/stop criteria and pinned evidence. Preserve historical plans and raw artifacts at their owning immutable sources; do not append every conversation to the active plan. Use the [documentation map](docs/README.md#where-to-put-new-material) to choose the existing primary collection, link related material instead of copying it, and update its index. This is navigation guidance, not a new product policy.

### Agent-ready handoffs

For an agent taking over a collaboration, use its maintained working entrypoint, then the owning repository's instructions and pinned evidence. The entrypoint must distinguish: objective and non-goals; current checkpoint versus historical results; owner/authority and permitted work; exact identities and relevant source routes; ordered next actions with success/stop conditions; unresolved questions and the next durable update. Check the live owner state before resuming; do not replay completed work or silently widen scope. Keep decisions and material findings in versioned documents and send links in chat.

For [Task Verification](docs/studies/task-verification-handoff-2026-11-22.md#agent-start-here), the research/implementation agent may read the working handoff and evaluator material; a blinded model reviewer receives only its frozen permitted input. Do not forward the research handoff, oracle, known defect list or prior reviewer results as blind-review context. Preserve the distinction between a model claim, a reproduced observation and an owner decision. This is a reading/maintenance rule, not authorization to dispatch paid inference or change product policy.

## Workflow

Use the exact installed Docs Protocol (`pnpm docs:info`, `docs:find`, `docs:new`,
`docs:context`, `docs:check`). Preview and inspect a new-document Plan before
applying its exact digest. Add the reported direct index link. Run `pnpm check`
after prose and navigation changes; perform focused link, provenance and score
arithmetic checks for the changed risk. Do not create a second documentation
engine, portal or scoring service for this repository.

## Admission status

This is documentation-only work with development-only authoring tooling and no
shipped application runtime. Portable Docs Protocol setup is distinct from the
organization's [repository admission](https://github.com/agent-teams-ai/.github/blob/main/docs/repository-admission.md).
Central classification and managed documentation admission remain pending; no
N/A exemption, managed cohort qualification or remote protection is claimed.
