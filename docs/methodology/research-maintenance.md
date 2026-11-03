---
id: research.methodology.maintenance
type: methodology
status: active
owner: research/maintainers
summary: Maintain source identities, refresh stale claims and review changes without automatic product adoption.
---

# Research Maintenance

This workflow keeps shared research useful without creating another platform. Research records, source inventories, dated review queues and ordinary draft PRs are the maintained mechanism. Product owners retain accepted decisions and release qualification. The [evaluation method](evaluation-methodology.md) defines score semantics; this document owns the maintenance procedure.

## Record and update contract

Every maintained assessment identifies its subject, edition, exact commit/version, deployment/configuration scope, review date, scenario, method version and evidence depth. Each material claim distinguishes source fact, inspected upstream test, author-reported evidence, independently executed reproduction, inference and unknown. Retain the strongest relevant counterevidence and the source of any deliberate limitation.

An update is a change to claims, not a replacement of all old text with a new date. Start from the last pinned source, inspect the relevant diff, and decide which claims changed. A rolling documentation page can support watchlist relevance; it cannot silently refresh an immutable source audit. If a reported defect is fixed, retain the historical lesson and remove it from the current-defect view only with the fix/release scope recorded.

| Step | Output | Owner |
| --- | --- | --- |
| Detect a relevant change or due review | Small triage entry: subject, changed source, affected claim IDs, decision it could change | Research maintainer |
| Inspect and pin | Exact before/after identities, edition/profile scope, source class, counterevidence | Subject reviewer |
| Draft the consequence | Claim update, score/range/confidence change if justified, affected lessons and product links | Research author |
| Challenge material conclusions | Independent check of rival strengths, our gaps, alternative explanations and scope | Reviewer other than author |
| Publish the reviewed record | Coherent commit pushed immediately; draft PR while review is incomplete | Publication owner |
| Notify the existing product route | Link the evidence in the affected owner issue/PR when that action is authorized; no silent ADR adoption | Product owner |

Separate factual corrections from score-policy changes. A source correction can be immediate; changing criterion applicability, weights or thresholds updates the versioned method before recalculating a board. Do not choose a new weighting after seeing which competitor wins.

## Initial review queue

These dates are a maintenance proposal, not an active background schedule. The initial review anchor is 2026-11-03. The prepared repository was assembled on 2026-11-04. A historical imported study keeps its original review date even when this queue requests a new review.

| Scope | Next review / trigger | Concrete action |
| --- | --- | --- |
| Paperclip lock, queue, native cursor and deployment findings | 2026-12-03, or an earlier relevant implementation/release | Inspect diffs at the named files; test whether the current mechanism or only a proposal changed |
| Agent Teams selected plans and open-owner links | Relevant owner decision/merged PR; routine check by 2026-12-03 | Reconcile OD-004/006/012/024/032 and Runtime #245/#246 without interpreting central research as closure |
| Paperclip and Agent Teams full subject scope | 2027-02-01 or material architecture/edition change | Refresh the whole declared scope and identify untouched unknown cells |
| Imported identity/provider and framework claims | Before their next adoption decision; first triage by 2026-12-03 | Refresh exact provider/library versions and security/edition claims that affect that decision |
| Extension Foundation PR55 research | PR merge, replacement or closure | Preserve the original draft pin and add the actual resulting identity; do not assume main already contains it |
| Next competitor | After a question justifies expansion | Start one named LangSmith Deployment or CrewAI AMP edition; keep library and product rows separate |

The baseline cadence is weekly triage and claim-specific review windows, not weekly rescoring of every project. Security/edition changes, major releases, changed licensing/deployment restrictions and contradictory evidence can trigger immediate targeted review. Stable unchanged semantics can retain their historical source with an explicit no-change review.

## Automation boundary

The central repository is available and its initial draft is open. Background triage has not yet been activated. After corpus publication and reciprocal routes are verified, one scheduled weekly triage may inspect relevant upstream changes and prepare a source-linked draft PR. It must preserve edition/commit identities, report uncertainty, leave scores unchanged without reviewed evidence, and never merge, adopt product policy or post messages to other people without the applicable authorization.

Use existing GitHub notifications, the available research assistant and ordinary repository files before adding a custom collector. Add maintained tooling only after missed updates or measured reviewer effort expose a real gap. There is no custom scraper, scoring engine or always-running service in this repository.

## Corrections and retractions

Keep an append-only correction note with the original claim/assessment, reason, exact replacement evidence, affected scores and affected product recommendations. Update the live view and retain the superseded record. `Not inspected`, `not reproduced`, `fixed in source`, `released`, and `deployed` are separate states.

Unknown cells stay `null`/unknown rather than zero. A missing source, inaccessible hosted edition or expired review window cannot be converted into a proven product defect. A strong targeted source invariant does not require a fleet benchmark; a numerical active-capacity claim requires the matching campaign.

## Smallest sufficient checks

For each change, run Docs Protocol and inspect the changed risk: exact source path and commit, local link/anchor resolution, direct index reachability, provenance hash for migrated evidence, criterion mask/coverage/arithmetic for score updates. No test is added merely to mirror prose. Product changes use their own documented gates.

For a disputed technical recommendation, request two independent critics with the same user vision and owner source packet. Record the concrete disagreement and resolution. Do not count multiple summaries of the same upstream claim as independent evidence, and do not manufacture agreement by averaging incompatible scopes.

## Repeatable update prompt

> Review the named subject at its previous pinned identity and the candidate new identity. Preserve SaaS, self-hosted and Fully Local scope; ordinary Runtime S1–S5 and separate C0–C3; thousands of active executions rather than idle identities; minimal boilerplate and owner-local decisions. Identify changed claims, strengths, counterevidence and unknowns. Propose only source-supported score changes under the existing method and one fixed board mask. Update the relevant records and indexes in a draft PR, push each coherent commit immediately, and leave adoption/qualification with the existing product owner.
