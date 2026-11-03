---
id: research.methodology.review
type: methodology
status: active
owner: research/maintainers
summary: Independent critiques, resolutions, remaining uncertainty and verification scope.
---

# Research Review Record

Two independent critics reviewed the three technical decision cards and methodology choices against the same user vision: thousands of active executions, all three deployment profiles, useful reusable libraries, minimal boilerplate, explicit owner authority, and honest target/current evidence. The author then reconciled both reviews against accepted product decisions. A later independent pass reviewed the three actual product proposals.

This is a review record, not a claim of consensus produced by averaging scores. Accepted owner decisions resolve scope conflicts. Critical questions and counterevidence remain visible in the [Paperclip dossier](../competitors/paperclip.md), [method](evaluation-methodology.md) and [decision cards](../lessons/preimplementation-decisions.md).

## Material corrections made

| Concern raised | Resolution |
| --- | --- |
| Budget alternatives reopened an accepted product choice | Preserve ADR-0045's soft and hard modes; compare three implementation strategies within OD-024 |
| Independent pools could each spend a shared allowance | Retain one initial atomic owner; conditional finite shares or a common atomic quota transaction conserve shared limits |
| Cursor options mixed ordering semantics with deployment/batching choices | All preserve the same canonical order/ACK; gap staging is conditional on a real producer contract and bounded continuation |
| Per-agent current backlog confused with retained history | Queue finding explicitly concerns current queued rows; historical counting is a separate native event path |
| Paperclip strengths were at risk of being overlooked | Preserve native journaling/uncertainty, physical custody, reserved control, bounded authorized delivery and scoped component load evidence |
| Completed target could be mixed with observed implementation in a leaderboard | Separate evidence and conditional-fitness views; one global mask for any ranked board; unknowns remain unknown |
| LOC estimates had unsupported precision | Product implementation deltas remain unestimated pending an owner seam inventory; this documentation adds zero production LOC |
| New research could be read as a new gate or revoked qualification | Reconcile with existing owners; no automatic adoption, qualification change or retrospective fleet gate |
| Migration could break old IDs/anchors or imply fresh revalidation | Keep original source bodies and hashes, preserve dated imports, and wait for real central publication before reciprocal links |
| Platform sequence/credential wording was broader than accepted scope | Limit sequence to the entitlement/deployment slice; scope credential custody to Platform/Orchestrator while preserving customer/Runtime boundaries |
| Final broad scores exceeded the reviewed evidence | Whole-product lifecycle, unsettled production fairness and broad domain-model cells remain unknown where only narrower mechanisms were inspected; preserve positive scoped prose and recalculate coverage |
| Matrix cited only the earlier load artifact | Include both the earlier invalid load campaign and the later qualified component evidence, preserving their distinct scopes |

## Retained independent reviews and resolutions

- [Critic A](../../evidence/reviews/2026-11-04/critic-a.md)
- [Critic B](../../evidence/reviews/2026-11-04/critic-b.md)
- [Paperclip author resolutions](../../evidence/reviews/2026-11-04/paperclip-review-resolutions.md)
- [Method author resolutions](../../evidence/reviews/2026-11-04/methodology-review-resolutions.md)
- [Product final review A](../../evidence/reviews/2026-11-04/product-final-review-a.md)
- [Central final review A](../../evidence/reviews/2026-11-04/central-final-review-a.md)
- [Central final review B](../../evidence/reviews/2026-11-04/central-final-review-b.md)

The [review manifest](../../data/review-provenance.json) identifies the preserved original texts. Some original reviews reference their working filenames or local scratch context; those references describe the historical review packet, not a maintained local navigation route. Their source dates were not rewritten to the assembly date.

## Executed verification and limits

Product documentation gates passed on clean checkouts of the published draft branches: Runtime 112-document catalog and five frozen-governance tests; Orchestrator 239-document catalog, 41 passed documentation tests plus one Windows-only skip, four skill tests and the existing lint/model/impact chain; Platform 41-document catalog, Markdown/domain/deployment checks and seven qualification tests. Platform's final scope clarifications were checked again. These are documentation checks, not product execution qualification.

The initial Orchestrator Vale extraction required the standard environment-only `TAR_OPTIONS=--no-same-owner`; the pinned/checksummed tool then ran and the final complete gate passed under the ordinary environment. No checker, pin or accepted gate was weakened. Earlier authoring-workspace transaction evidence was retained; independent clean-source validation does not claim that old recovery state was repaired.

Central catalog, navigation, source/provenance and arithmetic checks are recorded in the final [validation record](../../data/validation-summary.json) when executed. No competitor tests, active-worker fleet campaign, adversarial tenant assessment, LOC change exercise or provider benchmark was executed by this research. Source-inspected tests and author-reported component campaigns retain their explicit evidence class.

## Remaining limits

The central repository and [draft PR #1](https://github.com/agent-teams-ai/engineering-research/pull/1) exist. The corpus is published at `12c40892e805944719d6fbec14d2c26874803b2c`; reciprocal routes and their checks are recorded in the [migration ledger](research-migration.md). Full-product evidence remains partial, no complete TOP ranking is claimed, and scheduled triage has been enabled through an existing assistant task without any claim of an executed future review. These publication and evidence gaps remain explicit rather than being converted into technical scores or product defects.
