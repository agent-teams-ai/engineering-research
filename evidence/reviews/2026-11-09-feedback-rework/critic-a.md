# Feedback and rework study — independent review A

- Review date: 2026-11-09 UTC.
- Reviewer role: independent source/semantics critic A.
- Input: `docs/studies/evidence-based-feedback-and-rework-2026-11-09.md`.
- Exact reviewed input SHA-256: `4fb83ae82afeb384c973300d7442111b0383a8e81210ad83bbe4646c16acef67`.
- Disposition: **PASS for the stated research/advisory scope. No blocking findings.** Two optional wording refinements follow.

This review read the complete draft and the repository AGENTS, installed docs-authoring instructions, protocol profile and organization Engineering Quality Standard. It independently inspected the cited Paperclip and Kodus source/test surfaces at the draft's pinned revisions, the canonical Orchestrator ADR-0072, OD-027 and Work Coordination dossier, and the available Hassan R1–R10 table. It verified the retained attachment's SHA-256. Other donor sections were reviewed for argument, scope and evidence-class consistency, not independently re-audited line by line. No upstream tests, model evaluations, production deployment or publication were executed or verified by this review. No maintained document was edited.

## Optional refinements

### A1 — Low: name the narrow content of Paperclip's requirement hash

Location: Paperclip exact-quality-review paragraph, input line 48.

The statement that the implementation binds a current requirement hash is correct. More precisely, `qualityReviewRequirementHash()` hashes the requirement version and sorted deliverables. The inspected fixture's deliverables have keys and labels. It does not independently hash an arbitrary product specification or a universal acceptance-criteria document.

Optional clarification: call it a "hash of the required-deliverable definition" rather than leaving "requirement hash" unqualified. This would make it harder for a reader to infer complete specification-version binding. Existing surrounding text already limits the mechanism to human review of registered output documents and attachments, so this is not blocking.

Source: [required-quality-review.ts](https://github.com/paperclipai/paperclip/blob/0e3fdebea8257bdff11573081c76b306f12db230/server/src/services/required-quality-review.ts), `qualityReviewRequirementHash`, `bindQualityReview` and `readRequiredQualityReview`.

### A2 — Low: keep the Kodus summary row as precise as its body

Location: comparison table, input line 34, and heading "with advisory semantics".

The detailed Kodus section correctly explains that ordinary unaccepted MISSING requirements can block a closes PR. The summary's "Advisory decisions" and the heading can nevertheless be read as describing the entire reviewer as advisory.

Optional replacement for the table limit: "Nonblocking PARTIAL/manual outcomes and source retrieval cannot automatically become fail-closed Work completion." An alternative heading is "useful requirement checks, with a different pass policy". The existing body explicitly prevents the overbroad interpretation, so this is not blocking.

Source: [check-policy.ts](https://github.com/kodustech/kodus-ai/blob/b759339a7435bd8c6064ff349cd7a65c1c5a033c/libs/agents/business-validation/check-policy.ts) and its neighboring `check-policy.spec.ts`.

## Source-sensitive checks that passed

- Paperclip's three mechanisms remain separate: ordinary agent stage decisions, exact-result human quality approval and stopped-tree watchdogs. The draft preserves the positive counterevidence that artifact-bound approvals do exist and does not generalize it to all agent review decisions.
- The default three-round review limit, continuation when no responsible/creator human exists, and intentional self-review-stage skipping are present in source and tests. The proposed stricter exhaustion behavior is labeled a proposal, not an already accepted product state.
- Required quality review checks exact current document revisions or attachment identity/hash; accepted requirements cannot be weakened by an agent. Source and tests cover stale/removed results, per-item verdicts and task-lock ordering. The draft does not convert inspected tests into observed passes.
- Watchdog mutation scope is revalidated, while comment/document/work-product changes deliberately leave the material fingerprint unchanged. The draft correctly rejects reuse of that liveness fingerprint as the immutable candidate digest.
- Kodus has 29 authored evaluation cases and actual positive/negative controls. Its gap check constrains state changes and validates that cited nonblank lines were shown by its read tool. The draft correctly distinguishes citation provenance from semantic correctness.
- Kodus PARTIAL and CHECK MANUALLY outcomes do not block; a part_of change can pass with missing requirements. The detailed explanation also preserves the positive blocking behavior for ordinary MISSING/closes checks. Its eval harness uses the real product stage with substituted service/code-host inputs and in-memory run records, as the study states.
- ADR-0072 retains sole terminal Work authority, immutable candidate/plan identities, owner-local atomic establishment and finalization, and a separate evaluation only when asynchronous gates require it. The draft does not grant completion power to Temporal, a reviewer, Runtime or a watchdog.
- The canonical Work Coordination dossier's accepted implementation scope is indeed limited to Task creation and metadata editing under ADR-0103. Completion/review implementation remains excluded; OD-027 remains open. The study distinguishes accepted invariants from implemented capabilities and unresolved policy.
- R1–R10 references correspond to the received proposal. Their refinements retain the author's original case identities and do not invent an executed test catalogue or new release gate.

## Scope and production-proof assessment

The document does not claim that deterministic state transitions make semantic model judgments deterministic or correct. Reviewer pass, complete reviewer execution, evidence acceptance and final Work completion remain distinct. Empty findings, exit zero, narrative, signatures and policy admission are not promoted into universal completion evidence.

The recommendation is bounded: read-only contract/implementation mapping first; at most one jointly selected disposable fixture if a result could change a decision. It avoids another workflow framework, a PRD generator, unowned shared Task models, speculative release gates and immediate retained implementation. Reuse is placed behind consumer-owned contracts with product authority preserved.

The Sub2API paragraph records the owner's current direction without revoking ReviewRouter's separate accepted gateway decision or claiming equivalence among alternative providers. It makes no provisioning or deployment claim.

The attachment is explicitly incomplete and its retained hash matches the draft. The source pins, observation date and distinction between canonical main and the unmerged collaboration branch are explicit. The study does not infer production maturity from stars, source availability, test presence or a deployment-shaped harness. These limits are appropriate for the evidence actually inspected.

This review permits publication of the study within its stated scope; it does not adopt an architecture, authorize retained implementation, qualify a complete autonomous loop, or certify upstream tests or live production behavior. The original reviewed input hash above remains the scope of this review even if optional wording changes are subsequently applied.
