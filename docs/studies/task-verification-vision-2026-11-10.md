---
id: research.studies.task-verification-vision-2026-11-10
type: study
status: active
owner: research/maintainers
summary: Proposed product-neutral Task Verification library and ownership boundaries for initial ReviewRouter adoption and later Orchestrator consumption.
reviewed_at: 2026-11-10
---

# Task Verification: Product and Architecture Vision — 2026-11-10

## Scope and status

**Recorded 2026-11-10 (Europe/Chisinau).** This is the owner's agreed **research/product direction**, not an adopted Orchestrator ADR, a stable SDK contract, an implemented feature, a published package, or permission for a production rollout. Product-specific authority, policies and admission remain in their respective repositories.

**Goal:** check whether a particular immutable deliverable meets versioned, explicitly supplied acceptance criteria; identify what is missing or unverifiable; return specific, actionable feedback for correction. Start with software changes for measurable evidence, but keep the verification kernel independent of GitHub and source code. Do not build specification/PRD generation in this first scope.

**First real consumer:** ReviewRouter's optional pull-request acceptance-criteria check, using the existing managed Open Code Review (OCR) capabilities. **Second intended consumer:** Agent Teams Orchestrator through its existing CompletionEvaluation boundary. The first consumer validates the contract; a reusable kernel must not import a ReviewRouter business model simply because it is tested there.

This vision complements the [source and competitor audit from 2026-11-09](evidence-based-feedback-and-rework-2026-11-09.md), the [PR experience and freshness proposal](reviewrouter-task-verification-ux-2026-11-10.md), and the [qualification and delivery plan](task-verification-evaluation-plan-2026-11-10.md). Those documents intentionally separate conclusions from unexecuted experiments.

## Evidence and counterevidence

### The fundamental distinction

| Concern | Question | Intended owner |
| --- | --- | --- |
| Code review | Are there defects introduced/aggravated by this change? | ReviewRouter/OCR reviewer; findings are scoped and advisory |
| Task verification | Are all specified required outcomes met by this candidate, with sufficient current evidence? | Proposed product-neutral verification capability |
| Correction/execution | Who is allowed to request or perform another attempt? | Product-owned application/process and runtime authorization |
| Terminal Work completion | Can the product mark Work completed? | Orchestrator Work Coordination alone, per ADR-0072 |

A clean diff review is **not** evidence that omitted requirements are implemented. The current [managed OCR review policy][rr-ocr-policy] asks for issues caused or worsened by the changed paths. A required endpoint absent from the diff can be missed without the code-reviewer being wrong. A task check needs repository-wide or artifact-appropriate investigation **only where its criteria call for it**, with observed coverage and limits.

The existing [ReviewRouter managed runner][rr-ocr-run] has valuable execution correctness: pinned base/head and binary identities, managed process lifecycle, real model attribution, outcome parsing, incomplete-coverage reporting, and no success from readable JSON alone. Its normalized findings and [revision evidence][rr-evidence] are **reuse candidates**, not already a product-neutral API. The historical investigation runtime differs from the default OCR path; do not attribute its critic/replay capabilities to ordinary OCR without qualification. An exact integration mode must be reviewed rather than assumed.

The [Kodus requirements gap check][kodus-gap] provides a second-pass example that looks for an allegedly missing implementation in unchanged code and verifies that cited lines were actually retrieved. That confirms citation provenance, **not** semantic truth. Its deliberately nonblocking partial/manual policy cannot become our mandatory completion rule. [Paperclip's required quality review][paperclip-quality] demonstrates exact-document/attachment-bound human approval, while its watchdog fingerprint is for **liveness deduplication**, not artifact integrity. [Gerrit approvals][gerrit-approval] demonstrate version-aware transfer policy, not perfect reviewer judgment. Reference these mechanisms critically; do not copy their frameworks.

### Minimal conceptual contracts (not public TypeScript declarations)

| Concept | Required meaning | Does not own |
| --- | --- | --- |
| Acceptance criteria snapshot | Stable criterion identities, required/optional designation, source owner, canonical text and criteria revision/digest | PRD generation, permissions to alter an authoritative task |
| Candidate | Exact immutable artifact identity/digest and scope being assessed; for code, exact source snapshot rather than a mutable branch name | Runtime custody or workspace provisioning |
| Verification request | Candidate + criteria snapshot + evaluation policy/reviewer profile identity + bounded requested checks | Provider credentials, product Task lifecycle |
| Evidence | Producer/observer, check identity, tested candidate, scope, environment/config where applicable, result, digest and availability | An unconditional claim of semantic correctness |
| Criterion assessment | Criterion ID; satisfied, violated or inconclusive; evidence references; reasons/findings; coverage and reviewer provenance | Product-wide approval or final Work transition |
| Feedback | Deduplicable, actionable problems bound to criterion and candidate; optional source locations | Authority to execute an arbitrary fix or merge |
| Verification outcome | Completeness, requested/executed/skipped checks, missing evidence, version identity, advisory disposition | Task completion or policy waiver |

An explicit **not applicable** outcome may only be accepted where the owning criteria/policy allows it. The absence of a result, `exit 0`, an agent's narrative, a zero-findings review, a model confidence number, or a signature alone must not establish satisfaction.

### Safety invariants

1. Snapshot candidate and the applicable criteria **before** running verification. Capture a fixed commit/tree or immutable artifact; avoid reading a moving checkout during different checks.
2. Pin the verification policy and evidence applicability. An unchanged artifact with changed criteria is a **new verification identity**. A materially changed artifact supersedes prior candidate facts. Display-only Work metadata need not invalidate ADR-0072's completion basis.
3. Separate *violation* from *inconclusive*, *partial*, *unavailable*, *stale*, and *revoked*. Infrastructure failure is not proof of implementation failure and must not automatically consume a semantic correction attempt.
4. All blocking criteria must have applicable evidence before a positive recommendation. A partial check cannot become a pass because its findings list is empty.
5. Keep review findings historical; rechecking one item requires an explicit result. Silence during a later partial review does not close a previous finding.
6. Keep the reviewer read-only against the inspected candidate. Treat task text, PR bodies, code, logs and model output as untrusted data. Runtime permissions, product authorization and human approval are separate.
7. Bind late, duplicated and out-of-order results to their original candidate/check identity and prevent them from mutating a newer candidate.
8. Stop automatic correction at a **configured hard** bound, even if no human reviewer is assigned. Soft consumption warnings stay with Consumption Governance; no new budget owner is created.

### Ownership and future consumers

| Layer | Responsibility | Deliberate dependency boundary |
| --- | --- | --- |
| Portable kernel | Criteria/evidence models, applicability decisions, result normalization, criterion coverage and advisory feedback | No GitHub, OpenCodeReview, provider SDK, Prisma, Temporal, Sub2API or application Task model |
| Consumer application | Select criteria and authorization; request evaluation; decide how to interpret/act on advisory results | Calls narrow application ports; keeps product-owned policies |
| ReviewRouter integration | PR body parsing, HEAD/criteria freshness, reviewer invocation, permissions, checks/comments, existing model/account connection | Adapts OCR output; does not become global completion authority |
| Orchestrator integration | Consume typed verification facts under the current Work/CompletionPlanRevision and CompletionEvaluation contract | No separate terminal state machine, reviewer-owned Task completion, or duplicated Temporal workflows |
| Execution adapters | Evidence collection, exact artifact materialization, test commands, selected reviewer and credentials | Technical custody and effects remain with the designated owning runtime/service |

[ADR-0072][adr-72] already owns the final Work transition. It specifies `completionEpoch`, `completionBasisRevision`, `candidateDigest`, the artifact revision/digest and `CompletionPlanRevision`; asynchronous evidence uses one immutable `CompletionEvaluation` atomically linked to Work. The new library emits **typed facts/advice**; it never commits Work. [ADR-0027][adr-27] keeps Temporal behind product-owned process ports. [OD-027][od-27] leaves workflow taxonomy, invalidation policy, review rounds and waiver semantics open. Research must map into those owners, not invent settled decisions.

### Repository and toolchain direction

Proposed **new repository**: `agent-teams-ai/task-verification`. It has **not** been created. Start with one private-to-experiment/public-API-unstable 0.x library package (no independent backend, queue, database, admin UI, universal framework or stable SDK claim). A first ReviewRouter consumer/experiment remains an *outer integration*, which may later move to the consumer repository once actual use justifies extraction. Do not create sibling production packages merely for naming layers.

Suggested layout: `packages/task-verification/src/features/verification/{domain,application,adapters}`; a curated `src/index.ts`; tests; `experiments/reviewrouter`; documentation and CI. Adjust paths to the selected **exact** Feature Module Standard profile rather than treating the sketch as a new standard. Favor one coherent feature with narrow ports over per-function interfaces or a parallel review ledger.

- **Bun:** selected repository package manager and development workflow, subject to its pinned/runtime-qualified version; **TypeScript >=7.0.2** for maintained source/tests, ordinary `.ts` in an ESM package.
- **Stack Toolchain:** use one **exact published, qualified** version for compiler, lint and formatter; do not duplicate versions or technical presets. Its CLI runs under supported Node 24/26; Bun is a checker fallback, not the CLI host. Observe [Stack Toolchain adoption guidance][stack-guidance] rather than inferring installed availability from a source manifest.
- **Engineering Foundation:** development-only quality, conformance, security and workflow checks, not a dependency of product runtime. Follow the [organization quality standard][quality-standard] and repository's pinned profile.
- **Get Modular:** use its portable composition when there are actual interchangeable implementations/consumer wiring requirements. A single static adapter does not justify a dynamic Host, lifecycle manager or mandatory composition ceremony.
- **Docs Protocol:** pinned package, normal Markdown/YAML authority, dated records, direct category index and CI; do not copy or mutate historical 2026-11-09 evidence.
- **Licensing/ownership:** select the new repository's license and contribution policy with its owner before retained external contributions; this research creates no IP assignment or commercial promise.

## Implications and limits

**Sequence:** (1) read-only audit of accepted and implemented contracts; (2) minimal product-neutral contract; (3) disposable real ReviewRouter consumer; (4) measured requirement coverage and false-accept/false-reject outcomes; (5) bounded correction/reverification experiment; (6) explicit owner review before production integration or publishing a stable SDK. Do not require the researcher to implement the Orchestrator, the PRD generator, a new account pool or another review engine.

ReviewRouter already offers subscription-backed reviewer connections through its Account Gateway (with Sub2API infrastructure behind the existing product path). A qualified existing test connection can be reused through ordinary product permissions; no direct credential sharing, bespoke account infrastructure, or assumption of zero API/subscription cost is required. **The new kernel has no gateway dependency.** Any future gateway selection is a separate consumer-owner decision, not part of this research.

The kernel can become retained production code **if its contracts, semantics, measured quality and two-consumer fitness hold up**. This possibility does not make an unrun lab a production-ready service. The public API remains 0.x, intentionally changeable, until its consumers are qualified.

### Questions reserved for real owner/consumer review

- Which criteria sources can be authoritative when the implementer also edits the PR description?
- Which criteria need machine evidence, human authorization or model judgment, and who may waive an unmet gate?
- What evidence freshness changes are semantically material versus display-only?
- Is an OCR-based verification invocation sufficient, or does a specialized second pass meaningfully improve missed-requirement detection?
- What is the smallest read-only result integration actually available from the existing ReviewRouter; is an additional export endpoint necessary?
- Does a second real consumer justify extraction of a common OCR adapter, or should it remain ReviewRouter-owned?

## Sources

**Observed/reconciled 2026-11-10.** These links describe pinned source snapshots or accepted owner docs; they do not certify an experiment or production deployment.

- [Combined evidence-based feedback/rework study, observed 2026-11-09](evidence-based-feedback-and-rework-2026-11-09.md); original external source pins and counterevidence are retained there.
- [ReviewRouter managed OCR adapter][rr-ocr-policy], [managed run/outcome acceptance][rr-ocr-run], and [review evidence model][rr-evidence].
- [Orchestrator ADR-0072][adr-72], [Temporal ADR-0027][adr-27], and [open OD-027][od-27].
- [Engineering Quality Standard][quality-standard], [Stack Toolchain adoption][stack-guidance], [Get Modular consumer guide][get-modular].

[rr-ocr-policy]: https://github.com/777genius/review-router/blob/7bf73a7f92d42b662bda2647740e0fefaf5015d3/src/review-orchestration/infrastructure/ocr-review-invocation-adapter.ts
[rr-ocr-run]: https://github.com/777genius/review-router/blob/7bf73a7f92d42b662bda2647740e0fefaf5015d3/src/review-orchestration/infrastructure/ocr-review-managed-run.ts
[rr-evidence]: https://github.com/777genius/review-router-ai/blob/f376d781cc9ea72110c69c09d57619f054428149/packages/features/review-evidence/src/domain/review-observation.ts
[kodus-gap]: https://github.com/kodustech/kodus-ai/blob/b759339a7435bd8c6064ff349cd7a65c1c5a033c/libs/agents/business-validation/judge/gap-check.ts
[paperclip-quality]: https://github.com/paperclipai/paperclip/blob/0e3fdebea8257bdff11573081c76b306f12db230/server/src/services/required-quality-review.ts
[gerrit-approval]: https://github.com/GerritCodeReview/gerrit/blob/7e5dd8c6195558a78fbdbf2be22653f0d3fa4311/java/com/google/gerrit/server/approval/ApprovalCopier.java
[adr-72]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0072-atomic-work-completion-evaluation.md
[adr-27]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0027-temporal-as-run-orchestration-adapter.md
[od-27]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/open-decisions/OD-027-configurable-work-lifecycle.md
[quality-standard]: https://github.com/agent-teams-ai/.github/blob/main/docs/engineering-quality-standard.md
[stack-guidance]: https://github.com/agent-teams-ai/engineering-foundation/blob/e38d8444f74cceef37c366f4e28ed1918b214d4a/docs/development/toolchain-adoption.md
[get-modular]: https://github.com/agent-teams-ai/get-modular/blob/5fb83478dd7b95216be92c4d3077eddf2774eef8/docs/guides/consumer-quickstart.md
