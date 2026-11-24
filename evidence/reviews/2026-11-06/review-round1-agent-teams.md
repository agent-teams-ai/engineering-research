# Round 1 independent synthesis review — Agent Teams plan scope

Reviewed file: `docs/competitors/autogpt-vs-agent-teams-architecture-and-python-ecosystem.md` in the local engineering-research checkout, 2026-11-06. Read-only review; no product or dossier edits performed.

## Disposition

**No blocking technical scope error found.** The report correctly honors the user's implemented-plan hypothesis without inventing unspecified capabilities. Lowering SOLID/DDD/extension-safety from 9 to 8 for unresolved contracts is defensible; this is not an implementation-readiness penalty. No score change is required from this review.

The report now correctly separates ordinary Runtime v3 S1–S5 from C0–C3 and gives 7/7 versus 7/8 as explicitly different scaling scenarios. The equal-weight M1–M5 arithmetic is correct: `(6+7+6+7+7)/5 = 6.6`; `(9+9+8+6+8)/5 = 8.0`. These cells exclude measured capacity, testing history and marketplace size, so neither ordinary-v3 nor plugin scope is silently inflated.

## Suggested small changes before publication

### R1-M1 — Name the exact fixed change used for qualitative M4 scoring

Location: M1–M5 summary / M4 explanation, currently around lines 96–107.

The report honestly says no equivalent-change LOC or reviewer effort was measured. However, the existing method defines M4 relative to fixed representative changes. “Ordinary integrations” is still broad: a new supported-auth HTTP action, a new whole-harness adapter and a new credential lifecycle have very different costs. This need not block a qualitative target comparison or trigger implementation exercises.

**Suggested addition:** “For this source-based M4 forecast, the representative change is one external-service capability behind an existing integration port, using an already supported authentication type and without a new domain, permission model or deployment role. Whole-harness, store and schema-changing use cases remain unmeasured.” If the score is meant to cover those broader changes too, identify them as unresolved rather than implying observed total change cost.

Keep the current numbers if this is the intended narrow task; label the score as a qualitative inference. The overall table already states this broadly, so one sentence should be sufficient.

### R1-M2 — Add direct links for the two open decisions central to the scope limitation

Location: lines 65, 87–88 and Sources.

Current citations lead to accepted ADRs and boundary documents, which do retain the unresolved status. For reproducibility, add direct source entries for:

- `docs/open-decisions/OD-035-local-durable-workflow-engine.md` at Orchestrator `5a8496ce711909e381c5bc817fff5500be9a1761`, particularly lines 21–30: local workflow implementation is open and V1 does not choose Temporal/OpenWorkflow/DBOS/in-memory.
- `docs/open-decisions/OD-043-extension-lifecycle-catalog-and-hot-update.md` at the same SHA, especially lines 18–54: catalog, isolation tiers, drain/state migration/rollback, offline artifact behavior and stable public SPI conformance remain open.

This is a citation-strengthening suggestion, not a request to add new blockers, update product ADRs or change the research verdict.

## Scope verification that passed

- Runtime `ab0387c02fe75ed0c9bb456caaad9a6d2723795b` is correctly pinned and described as architecture program **v3**, not the old implementation.
- S1–S5 does include durable operations/claim/unknown-outcome semantics. Ordinary v3 is not accidentally treated as a mere structural refactor.
- Public plugin loader, dynamic contributions/hot swap and scheduler are not credited as v3 features.
- Selected Extension Foundation/OCI/ORAS/Cosign direction is separated from incomplete public plugin semantics. The safety/completeness split is appropriate.
- Keycloak/OpenFGA is not presented as an accepted fully specified integration. Platform tactical/ACL gaps remain visible.
- Current canonical backend/Local adoption is used; older SQLite/future-local statements do not override accepted owner scope.
- TDD chronology is Unknown, while verification design receives its own score. DDD is not silently substituted for the user's TDD.
- No universal thousands-active/RAM result is inferred from TS, Rust, Dapr or documents. S1–S5 does not acquire a fleet benchmark prerequisite.
- The role-map statement prohibiting a per-agent Orchestrator process, sidecar or SQL pool is directly supported by deployment-profiles.md lines 122–126.
- Our operational complexity and ordinary-integration ceremony receive lower scores. The conclusion is not a whole-product or capacity leaderboard.
- The Python service option preserves owner boundaries and remains research-only; it does not automatically add a mandatory Runtime v3 feature or replace the selected memory direction.

## Remaining review limits

This reviewer focused on Agent Teams scope, authority and scoring fairness. AutoGPT lock/ACK defect reproduction and exact Python dependency claims remain the other independent reviewers' responsibility. No application tests or fleet benchmarks were executed for this review, and a lack of such measurements is not treated as failure of the requested hypothetical architecture comparison.
