# Agent Navigation

This repository owns shared evidence and research methods. Product repositories
own accepted decisions, domain models, implementation plans and qualification.
Start with [the documentation map](docs/README.md); load the relevant dossier
and its linked owner record instead of reading the whole corpus.

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
