---
id: research.studies.evidence-feedback-rework-2026-11-09
type: study
status: active
owner: research/maintainers
summary: Dated source audit of review, evidence freshness and rework patterns, mapped to existing Orchestrator authority with gateway selection left open.
reviewed_at: 2026-11-09
---

# Evidence-Based Feedback and Rework 2026-11-09

## Scope and status

**Observation date: 2026-11-09. Recommendation: continue with Hassan's proposed read-only contract audit, then decide together whether one isolated experiment is necessary.** The useful outcome is a map of existing authority, actual implementation, unresolved policy and a small number of failure cases. It is not a new orchestration framework or permission to start retained product implementation.

The first question is whether a specified implementation meets its versioned acceptance criteria, how review and machine evidence stay attached to that implementation, and how a bounded correction loop preserves Work ownership. Product specification generation is a separate capability. Start with supplied criteria; do not add a PRD generator to this investigation.

This study incorporates Hassan's supplied **Evidence-based Feedback & Rework** proposal and its additions covering Paperclip, Ruflo, Orca, Impeccable and Haystack. The received file is **partial**: it ends inside section 18 with `severit` and `... (осталось: 16 кб)`. Its available 57,524 bytes are [preserved unchanged][hassan-input], with SHA-256 `e5ca71d6e57bcf34103e0b80f28550553c365b43a357da05ab2019725ff5ddfd`. Unknown continuation was not reviewed. This assessment is a separate interpretation, not an edit or approval of Hassan's original proposal.

Evidence classes used below are **source inspected**, **test source inspected**, **documented claim**, and **engineering recommendation**. Upstream tests and paid-model evaluations were not executed for this study; reading a test is not observing it pass. No complete autonomous loop or deployment is qualified here. The older [Paperclip dossier](../competitors/paperclip.md) retains its 2026-11-03 snapshot; this study does not silently refresh it or alter its findings.

The canonical Orchestrator baseline is main at `a34587b313e656eeb43d755b4a4f08c40dff2116`. The [collaboration brief][collaboration-brief] is separately pinned to draft PR #102 head `7e2c3eccbac63b5738e39a31bfa53332412de0f8`; that branch is not described as merged architecture. Accepted product decisions remain with their repositories.

## Evidence and counterevidence

### Which references help which question

These are scoped suitability judgments, not a whole-product ranking or a claim that the projects provide interchangeable components.

| Reference | Useful mechanism supported by inspected code | Limit relevant to this investigation |
| --- | --- | --- |
| Paperclip | Enforced review stages; exact-result human quality approvals; stale-scope rejection by a task watchdog | Ordinary agent review, human quality approval and watchdog liveness have different guarantees |
| ReviewRouter and managed Open Code Review | Existing reviewer invocation, structured results, revision checks, partial-run handling and evidence acceptance | PR-oriented code needs a consumer boundary; code findings do not establish all product acceptance criteria |
| Kodus | Requirement-versus-implementation analysis and paired correct/incomplete evaluation cases | Nonblocking partial/manual outcomes and source retrieval cannot automatically become fail-closed Work completion |
| Ruflo | Real hook smoke tests, regression witnesses and explicit signing modes | Default marker/hash verification permits drift; self-attestation is not independent producer authentication |
| Orca | Git worktree mechanics, structured feedback batches and race-aware acknowledgment | A worktree is not a security sandbox; the emitted feedback text does not carry the available revision identity |
| Impeccable | Specialized deterministic UI/design checks | No findings can mean incomplete coverage; style rules do not prove general requirements |
| Haystack | Separate deterministic and model evaluators; explicit failed-item handling | Evaluation infrastructure does not own candidate freshness, rework authority or Task completion |
| Gerrit | Patch-set-bound approvals, controlled copying and separately enforced submit requirements | Enforces the configured admission policy; approval is not semantic proof of correctness |
| PR-Agent | Conservative retention of old findings after incomplete review | Disappearance from a complete review is still a heuristic, not proof that a defect was fixed |

### Paperclip: distinguish three mechanisms

At `0e3fdebea8257bdff11573081c76b306f12db230`, [execution policy][paperclip-policy] enforces configured reviewer/approver stages in application code. An executor cannot simply close a task around those stages; decisions require the eligible participant and decision context. The [decision schema][paperclip-decisions] retains stage, actor, outcome, body and run, but does not give every ordinary agent review an immutable artifact digest and criteria revision. These are meaningful procedural guarantees, not proof that all requirements were met.

The current implementation also has `maxReviewRounds`, defaulting to three. It escalates to a responsible human, but the [policy tests][paperclip-policy-tests] explicitly continue returning work to the executor when no responsible human exists, even beyond that count. The same tests cover intentional skipping of a review stage whose only reviewer is the executor. For a mandatory independent review, the proposed Orchestrator behavior should instead stop automatic progress when no eligible reviewer or escalation target exists. A configured round count must have a defined exhaustion outcome; it should not depend on a human already being assigned. These are proposed policy cases for OD-027, not new accepted states.

The strongest exact-evidence reference is the separate, opt-in [required quality review][paperclip-quality]. It binds the required-deliverables definition hash (version plus sorted deliverables, not an arbitrary full product specification) to an exact output document revision or an attachment identity and SHA-256. It rejects a plan/custom target as a substitute, prevents an agent from weakening an established requirement, and recognizes canonical human approval rather than file presence or agent narrative. Its completion check is integrated into the [issue mutation path][paperclip-issues] under task and target locking. [Negative and database tests][paperclip-quality-tests] cover changed requirements, stale documents, removed attachments, incomplete approval and completion races. The test source conditionally skips database cases when embedded PostgreSQL cannot start; these tests were not run here.

That is real counterevidence against the broad claim that Paperclip has no artifact-bound review. Its scope is specifically **human review of registered output documents and attachments**. It is not a ready-made general agent verifier for any source snapshot or all Orchestrator completion gates.

The [watchdog][paperclip-watchdog] and [scope checks][paperclip-watchdog-scope] address stalled coordination, duplicate wakeups and stale mutation authority. Their material fingerprint deliberately excludes comment, document and work-product freshness; [scheduler tests][paperclip-watchdog-tests] preserve the fingerprint after such evidence changes. This is appropriate for liveness deduplication. It must not be reused as `candidateDigest`, proof of unchanged code, or authority to accept Work.

### ReviewRouter and Open Code Review: reuse a mechanism behind the product boundary

The existing Action's [OCR invocation adapter][rr-ocr-adapter] and [managed-run handling][rr-ocr-run] are a stronger starting point than writing another reviewer from scratch. They retain invocation/source identity, validate structured outcomes, and distinguish complete, partial and failed execution. The [managed build][rr-ocr-build] pins upstream OCR `8eb83340a487b1150af00701b94f01af97e4b4d6` plus local patches for managed release `1.13.1-rr.6`; inspecting current upstream main is not enough to describe this binary family. Adapter result acceptance can still contain an explicitly partial result; it does not mean Task acceptance. This audit does not measure token savings or establish a deployed configuration.

The server has [current-revision checks][rr-current-revision], [evidence acceptance][rr-evidence-acceptance] and [reuse eligibility][rr-reuse]. These provide concrete patterns for rejecting stale or incomplete evidence. However, the current adapters and feature packages include PR/execution vocabulary and product persistence. They are extraction candidates, not an already independent reviewer SDK. The [capability description][rr-capabilities] also distinguishes the default OCR path from the older investigation runtime; do not attribute every legacy critic/reuse capability to OCR.

**Proposed reusable boundary:** an immutable review input and scope, a consumer-provided read-only source/evidence interface, a selected reviewer execution capability, and a typed result containing coverage, findings, provenance and execution completeness. Keep PR publication, account authorization, task policy and the final completion decision with their owners. Application ports belong to their consumer; the outer composition chooses an adapter. Extract proven shared mechanism only after mapping the actual second consumer, preserving Clean Architecture, SOLID, DDD and DRY through ownership rather than a universal shared Task model.

A successful bug review answers its defined review question. It does not establish that every required endpoint, user journey, migration or operational condition exists. A free-text requirements background can help a reviewer, but an explicit criterion-to-evidence mapping is still needed. Valid citations and a model confidence value do not turn that judgment into a deterministic proof.

### Kodus: useful requirement checks, with a different pass policy

[Business-logic gap checking][kodus-gap] and its [paired evaluation set][kodus-evals] directly address missed requirements. There are 29 cases, including positive/negative pairs of correct implementations and deliberately incomplete variants. The gap-check takes a second look at repository code and accepts revised conclusions only with nonempty file/line evidence actually returned by its read tool. That validates citation provenance, not semantic correctness. Such pairs are more informative for this question than a bug-finding leaderboard alone: a verifier should reject a missing requirement without incorrectly rejecting an equivalent valid implementation.

Its [check policy][kodus-policy] deliberately permits nonblocking `PARTIAL` and `CHECK MANUALLY` outcomes; a `part_of` change can also pass with missing requirements. Conversely, an unaccepted `MISSING` requirement in a `closes` change normally blocks the PR check. Therefore the mechanism is not purely advisory, but its passing policy still differs from an unsatisfied mandatory Work gate. Preserve incomplete and unavailable as explicit outcomes and let the owning completion plan decide their consequences. The [evaluation harness][kodus-harness] invokes the real product stage with substituted code-host/task-service inputs and run records. These are authored fixtures and inspected implementation, not independently measured accuracy or proof of an autonomous accepted/rework loop in production.

### Ruflo: regression behavior, exact bytes and authenticity are separate

The [hook smoke harness][ruflo-hooks] invokes actual configured hook commands with synthetic input and checks exit/argument/permission behavior, including malformed input. That is a useful boundary test, stronger than merely checking that a code marker exists.

The [witness verifier][ruflo-verify] is different: when file bytes change but its marker remains, it reports `drift`, which succeeds by default. `--strict` rejects drift; the inspected [V3 CI invocation][ruflo-ci] does not pass that flag. Consequently, a default passing witness does not establish exact reviewed bytes or continued behavior of a fix.

Default signing derives a seed from the public commit and explicitly identifies itself as self-attestation. It cannot independently authenticate an authorized producer. The implementation also supports an external key with a caller-pinned public key and fail-closed verification; [authentication tests][ruflo-auth-tests] cover wrong or missing keys. Preserve that positive alternative and record the actual trust mode. A signature authenticates bytes under the selected trust assumptions; it does not establish that a claimed test really ran or that a requirement is satisfied.

Retain hook behavior tests and append-only regression evidence as ideas. Do not import Ruflo's orchestration framework or promote marker/signature success into Work acceptance.

### Orca: good delivery and workspace patterns, narrower than acceptance

[Worktree creation][orca-worktree] has [real-Git test source][orca-worktree-tests] for checkout/upstream behavior. Its [documented shared directories][orca-worktree-docs] also permit links to dependencies and caches. Checkout isolation and process/container isolation therefore remain different capabilities with different owners.

The [feedback formatter][orca-feedback] emits one escaped batch of file/line/range comments. The [comment types][orca-types] do contain optional diff identity, but that identity is not serialized by this formatter. Our proposed handoff should include the immutable candidate/artifact reference through a typed envelope, not rely only on a prompt mentioning a path.

The [delivery state implementation][orca-state] compares the captured comment snapshot before clearing delivered notes; editing a sent note clears its sent state. [Tests][orca-state-tests] preserve a note edited during pending delivery. This is a useful concrete race-handling pattern: acknowledge what was actually delivered and retain newer edits. It does not establish comprehensive automatic line-remapping correctness or a backend completion protocol.

### Impeccable and Haystack: preserve coverage and unknowns

Impeccable's [registry][impeccable-registry] contains 62 built-in deterministic rules. The important limit is in its [coverage tests][impeccable-coverage]: a source-only JSX/TSX-style scan can omit DOM-dependent checks while JSON output is `[]` and the exit code is zero. Therefore retain requested, executed and skipped checks with reasons and input scope. An empty finding list is not a complete positive result. Design checks are an optional specialized adapter; they do not prove all software requirements.

Haystack's [exact-match evaluator][haystack-exact] and [LLM evaluator][haystack-llm] are distinct implementations. The model evaluator can raise an error or retain `None` for a failed item. Preserve that distinction when measuring reviewer quality: failed evaluations cannot silently disappear from the denominator or become successful abstentions. This is useful evaluator design, not a reason to add a Python evaluation framework or give it Task authority.

### Established review systems: facts and admission remain separate

Gerrit's [approval copying][gerrit-copy] binds an approval to a patch set and transfers it only through the selected copy policy; otherwise it becomes outdated. Do not simplify this to all changes invalidating every approval. The separate [submit path][gerrit-submit] rejects requirements with `ERROR`, `UNSATISFIED` or `TIMEOUT` and distinguishes explicit override/forced outcomes. This is a concrete precedent for revision-aware approval plus an authoritative transition gate. It enforces the configured policy, not the semantic truth of a review; this audit does not establish deployment of the inspected commit.

PR-Agent's [review preparation][pragent-reviewer] permits automatic resolution of old findings only under completeness conditions. Its [finding reconciliation][pragent-findings] additionally requires known, different reviewed HEADs. Incremental, failed, excluded/partial or otherwise incomplete review preserves the old finding instead of interpreting silence as a fix. Even with these conditions, resolution remains a conservative review heuristic. An acceptance criterion requiring proof of a correction needs its own evidence, not only the absence of another complaint.

## Implications and limits

### Align with the accepted completion contract

[ADR-0072][adr72] already assigns the terminal decision to Work Coordination and defines one `CompletionEvaluation` for an immutable candidate when asynchronous gates are needed. The new evaluation and `WorkItem.activeCompletionEvaluationRef` are persisted atomically in the same context-scoped Unit of Work; finalization checks both aggregates in one transaction and records `WorkResolutionRecord` plus outbox. Review findings, runtime success and process-manager progress cannot directly finish Work.

Hassan's conceptual records are useful research vocabulary, but should map into those existing responsibilities before anyone defines production tables or packages. In particular:

| Concern | Existing contract or owner | Refinement for the audit |
| --- | --- | --- |
| What is being accepted | `completionEpoch`, `completionBasisRevision`, `candidateDigest`, artifact revision/digest, `CompletionPlanRevision` | Do not invalidate review for every generic Task revision. Metadata edits and completion-relevant changes differ; reopening changes the epoch |
| Evaluation readiness and finalization | Work Coordination and `CompletionEvaluation` | No second review ledger owns the final decision; an individual reviewer pass is one scoped fact |
| Evidence storage and provenance | Existing observation, artifact and other semantic owners; Work consumes narrow typed facts | Do not place all raw logs, runtime sessions and artifact payloads inside Work |
| Reviewer assignment and taxonomy | Existing or future owning policies; [OD-027][od27] remains open | Do not silently accept a new Review Management context or freeze final enum names |
| Timers, retry delivery and reconciliation | Feature-owned process manager; [Temporal adapter boundary][adr27] | Temporal history is execution progress, not authoritative Task state; retries call idempotent application use cases |
| Execution, technical runtime permissions and session custody | [Agent Runtime boundary][runtime-boundary] | Runtime executes and supplies evidence; it does not decide business review or Work completion |
| Feedback delivery | Existing communication/inbox and task-feedback contracts | Bind rework to the candidate and a delivery snapshot; duplicated/late delivery must not create an unbounded new attempt |
| Workspace lifecycle and isolation | Workspace Registry/adapters, Policy and Risk, Agent Runtime | Immutable materialization, authority to read it and execution containment are separate guarantees |

Keep candidate identity separate from evidence provenance. One immutable candidate can be checked in several environments. Environment, command, evaluator/model version, test inputs and policy belong to the check's provenance and applicability. A newly required environment may require another check without changing the source artifact. Hashing a mutable working tree does not freeze what two concurrent readers actually inspect: first capture the immutable snapshot, then run readers against it.

Likewise distinguish unavailable storage, corrupt evidence and revoked evidence. They require different waiting, retry or rejection behavior. Technical errors and flaky verification do not automatically consume an implementer's semantic rework attempt. A remaining budget is not permission to perform an action; a review pass does not authorize merge, publish or another external effect.

The [Work Coordination dossier][work-dossier] admits only the narrow Task creation/metadata slice under ADR-0103. Its accepted status does not admit completion/review implementation. Accepted completion invariants, currently implemented functionality and unresolved policy must be reported separately. This research does not start implementation, weaken the full retained architecture, reopen the selected PostgreSQL/Temporal/JetStream responsibilities, or add a second workflow engine.

### Proposed next deliverable for Hassan

Produce one concise read-only audit with these columns: **requirement; accepted owner/contract; actual implemented behavior; unresolved gap; smallest discriminating fixture; recommendation**. Start from ADR-0072, ADR-0066, ADR-0027, the Runtime boundary and OD-027, then map each proposed donor mechanism to a specific gap. Read relevant Runtime published contracts without making private/provider internals the integration contract.

The audit should answer four questions:

1. Which parts of the proposed loop are already specified, and which are implemented?
2. Which ReviewRouter mechanisms can actually be reused without importing PR/account/task authority?
3. Which remaining questions are policy choices, and which require running code to resolve?
4. Does one narrowly scoped experiment change a decision enough to justify it?

Use Hassan's R1–R10 as initial case references rather than creating a competing test catalogue. Refine them with the following distinctions; these are proposed checks, not an executed suite or new release gates.

| Existing case | Essential refinement |
| --- | --- |
| R1 / R10: positive review | Reviewer pass applies only to its scope. Another unmet mandatory gate keeps Work incomplete |
| R2: claimed success | Agent narrative, exit zero and zero findings do not substitute for the required execution and coverage evidence |
| R3: missing criteria | Ask for clarification or use an explicitly authorized policy path; the reviewer cannot invent requirements or silently waive them |
| R4 / R5: changed or mismatched candidate | Preserve metadata-only applicability; reject materially changed criteria/artifacts and old epochs after reopen; capture the snapshot before checking |
| R6: actionable correction | Reference criterion, finding, evidence and candidate; preserve an edited feedback item when an older delivery is acknowledged |
| R7: exhausted configured hard rework bound | Stop automatic rework at that bound even with no assigned human. Keep retries and semantic rework distinct; do not invent a terminal Work outcome |
| R8: duplicate/late result | Reuse stable command identity, reconcile response loss and preserve historical evidence without applying it to another candidate |
| R9: verifier failure | Preserve unavailable, failed, partial and inconclusive outcomes; no silent success or automatic blame on the implementer |
| R8 / R10: race at finalization | Compare cancellation, stale completion, changed requirements and concurrent finalization using the accepted owner transaction |

Soft budget alerts and hard quota decisions retain their existing Consumption Governance owner under [ADR-0045][adr45]. A warning threshold alone does not stop work; the review loop cannot create a second owner for monetary or resource limits.

If a gap remains after the audit, jointly choose **one disposable fixture** with fixed criteria, an immutable candidate A containing an intentional omission, a corrected candidate B, and an existing-contract test harness. Agreement on the hypothesis, evidence and stopping condition comes before the spike. A scope checkpoint is useful; there is no need to impose a calendar deadline on voluntary part-time research. It can conclude with a justified no-spike recommendation.

For reviewer quality, use paired correct/incomplete implementations, unchanged baseline defects and alternative valid implementations. Measure false acceptance, false rejection, incomplete/unknown results, coverage, cost and unnecessary rework separately. Generic bug-review precision/recall and SWE-bench task solving measure related but different questions. Deterministic orchestration can enforce identities and transitions; it cannot guarantee that a model's semantic judgment is true.

### Gateway choice: explicit owner decision still required

**Owner direction recorded 2026-11-09: do not adopt Sub2API automatically for future Orchestrator or extracted-reviewer integration. Alternatives exist; obtain a separate product-owner decision before choosing the implementation.**

The comparison may include the existing Account Gateway/Sub2API route, Get-Tok or another compatible gateway, and direct provider adapters where they satisfy the required scenario. This is a candidate list, not a claim that their capabilities, account semantics or permissions are equivalent. Compare the actual required API/runtime protocol, supported credentials, cancellation/streaming, quota and failure semantics, provenance, isolation and operational ownership. The reviewer contract should depend on the needed capability, not expose a particular account pool or gateway SDK to the domain.

ReviewRouter's [existing gateway decision][rr-gateway] is a reference for that product. It is neither revoked by this research nor automatically adopted by another consumer. Current deployments, credentials and the accepted Agent Runtime interactive-session contract remain outside this documentation change. No gateway, provider, model or dependency is selected or provisioned here.

### What this study establishes

There are practical implementations of several hard parts: source-bound human approval, stale evidence rejection, bounded or escalated review, race-safe feedback delivery and explicit partial evaluation. The useful synthesis is to adapt those mechanisms to the existing owners, rather than combine entire frameworks. Actual production reliability of the complete proposed Agent Teams loop remains unestablished. The next evidence should close a named gap, not add another broad survey by default.

## Sources

All source links below are immutable commit references observed on **2026-11-09**. The attached proposal is an immutable local input with its separate completeness limit. Current navigation links and the older shared dossier do not change these observation dates.

Independent critiques, their resolutions and documentation validation are recorded in the [dated review record][review-record].

| Subject | Inspected revision / status |
| --- | --- |
| Orchestrator canonical main | `a34587b313e656eeb43d755b4a4f08c40dff2116` |
| Orchestrator collaboration brief | `7e2c3eccbac63b5738e39a31bfa53332412de0f8`, draft PR #102 |
| Paperclip | `0e3fdebea8257bdff11573081c76b306f12db230` |
| ReviewRouter server | `91f8d14dac2bcf1b91b7241a924ced7501408379` |
| ReviewRouter Action | `7bf73a7f92d42b662bda2647740e0fefaf5015d3` |
| Kodus | `b759339a7435bd8c6064ff349cd7a65c1c5a033c` |
| Ruflo | `f6fe4199f7663cf31446d4c8d7f15b376a996655` |
| Orca | `b491746314da49c34260d73c906db33e9c30a60a` |
| Impeccable | `73221de69e4bb2940d464e241ef3c9f216f9d721` |
| Haystack | `6fad0440ca0cb93656f4c1e82cee1cad232267f9` |
| Gerrit | `7e5dd8c6195558a78fbdbf2be22653f0d3fa4311` |
| PR-Agent | `7cd2a669cd4f3229f98c702e9319c3387aef5a88` |

[hassan-input]: ../../evidence/imports/hassan/2026-11-09-feedback-rework-proposal.partial.md
[review-record]: ../../evidence/reviews/2026-11-09-feedback-rework/README.md
[collaboration-brief]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/7e2c3eccbac63b5738e39a31bfa53332412de0f8/docs/research/orchestrator-mvp-research-and-collaboration-2026-11-08.md
[adr72]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0072-atomic-work-completion-evaluation.md
[adr27]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0027-temporal-as-run-orchestration-adapter.md
[adr45]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0045-three-usage-bounded-contexts.md
[od27]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/open-decisions/OD-027-configurable-work-lifecycle.md
[runtime-boundary]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/architecture/runtime-boundary.md
[work-dossier]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/domain/contexts/work-coordination/README.md
[paperclip-policy]: https://github.com/paperclipai/paperclip/blob/0e3fdebea8257bdff11573081c76b306f12db230/server/src/services/issue-execution-policy.ts
[paperclip-policy-tests]: https://github.com/paperclipai/paperclip/blob/0e3fdebea8257bdff11573081c76b306f12db230/server/src/__tests__/issue-execution-policy.test.ts
[paperclip-decisions]: https://github.com/paperclipai/paperclip/blob/0e3fdebea8257bdff11573081c76b306f12db230/packages/db/src/schema/issue_execution_decisions.ts
[paperclip-quality]: https://github.com/paperclipai/paperclip/blob/0e3fdebea8257bdff11573081c76b306f12db230/server/src/services/required-quality-review.ts
[paperclip-issues]: https://github.com/paperclipai/paperclip/blob/0e3fdebea8257bdff11573081c76b306f12db230/server/src/services/issues.ts
[paperclip-quality-tests]: https://github.com/paperclipai/paperclip/blob/0e3fdebea8257bdff11573081c76b306f12db230/server/src/__tests__/required-quality-review.test.ts
[paperclip-watchdog]: https://github.com/paperclipai/paperclip/blob/0e3fdebea8257bdff11573081c76b306f12db230/server/src/services/task-watchdogs.ts
[paperclip-watchdog-scope]: https://github.com/paperclipai/paperclip/blob/0e3fdebea8257bdff11573081c76b306f12db230/server/src/services/task-watchdog-scope.ts
[paperclip-watchdog-tests]: https://github.com/paperclipai/paperclip/blob/0e3fdebea8257bdff11573081c76b306f12db230/server/src/__tests__/task-watchdogs-scheduler.test.ts
[rr-ocr-adapter]: https://github.com/777genius/review-router/blob/7bf73a7f92d42b662bda2647740e0fefaf5015d3/src/review-orchestration/infrastructure/ocr-review-invocation-adapter.ts
[rr-ocr-run]: https://github.com/777genius/review-router/blob/7bf73a7f92d42b662bda2647740e0fefaf5015d3/src/review-orchestration/infrastructure/ocr-review-managed-run.ts
[rr-ocr-build]: https://github.com/777genius/review-router/blob/7bf73a7f92d42b662bda2647740e0fefaf5015d3/tools/ocr/build.sh
[rr-current-revision]: https://github.com/777genius/review-router-ai/blob/91f8d14dac2bcf1b91b7241a924ced7501408379/packages/features/review-executions/src/application/use-cases/check-current-review-execution-revision.ts
[rr-evidence-acceptance]: https://github.com/777genius/review-router-ai/blob/91f8d14dac2bcf1b91b7241a924ced7501408379/packages/features/review-evidence/src/application/use-cases/accept-review-observation.ts
[rr-reuse]: https://github.com/777genius/review-router-ai/blob/91f8d14dac2bcf1b91b7241a924ced7501408379/packages/features/review-evidence/src/domain/review-reuse-eligibility.ts
[rr-capabilities]: https://github.com/777genius/review-router-ai/blob/91f8d14dac2bcf1b91b7241a924ced7501408379/docs/capabilities.md
[rr-gateway]: https://github.com/777genius/review-router-ai/blob/91f8d14dac2bcf1b91b7241a924ced7501408379/ai-docs/decisions/030-reusable-account-gateway-and-ownership.md
[kodus-gap]: https://github.com/kodustech/kodus-ai/blob/b759339a7435bd8c6064ff349cd7a65c1c5a033c/libs/agents/business-validation/judge/gap-check.ts
[kodus-evals]: https://github.com/kodustech/kodus-ai/blob/b759339a7435bd8c6064ff349cd7a65c1c5a033c/evals/business-logic-requirements/README.md
[kodus-policy]: https://github.com/kodustech/kodus-ai/blob/b759339a7435bd8c6064ff349cd7a65c1c5a033c/libs/agents/business-validation/check-policy.ts
[kodus-harness]: https://github.com/kodustech/kodus-ai/blob/b759339a7435bd8c6064ff349cd7a65c1c5a033c/evals/business-logic/production-stage.js
[ruflo-hooks]: https://github.com/ruvnet/ruflo/blob/f6fe4199f7663cf31446d4c8d7f15b376a996655/plugins/ruflo-core/scripts/test-hooks.mjs
[ruflo-verify]: https://github.com/ruvnet/ruflo/blob/f6fe4199f7663cf31446d4c8d7f15b376a996655/plugins/ruflo-core/scripts/witness/verify.mjs
[ruflo-ci]: https://github.com/ruvnet/ruflo/blob/f6fe4199f7663cf31446d4c8d7f15b376a996655/.github/workflows/v3-ci.yml
[ruflo-auth-tests]: https://github.com/ruvnet/ruflo/blob/f6fe4199f7663cf31446d4c8d7f15b376a996655/plugins/ruflo-core/scripts/witness/__tests__/witness-auth.test.mjs
[orca-worktree]: https://github.com/stablyai/orca/blob/b491746314da49c34260d73c906db33e9c30a60a/src/main/git/worktrees/creation/worktree-add.ts
[orca-worktree-tests]: https://github.com/stablyai/orca/blob/b491746314da49c34260d73c906db33e9c30a60a/src/main/git/worktrees/creation/worktree-add-remote-branch-upstream-real-git.test.ts
[orca-worktree-docs]: https://github.com/stablyai/orca/blob/b491746314da49c34260d73c906db33e9c30a60a/docs/site/content/docs/model/worktrees.mdx
[orca-feedback]: https://github.com/stablyai/orca/blob/b491746314da49c34260d73c906db33e9c30a60a/src/shared/diff-comments-format.ts
[orca-types]: https://github.com/stablyai/orca/blob/b491746314da49c34260d73c906db33e9c30a60a/src/shared/diff-comment-types.ts
[orca-state]: https://github.com/stablyai/orca/blob/b491746314da49c34260d73c906db33e9c30a60a/src/renderer/src/store/slices/diff-comments/create-diff-comments-slice.ts
[orca-state-tests]: https://github.com/stablyai/orca/blob/b491746314da49c34260d73c906db33e9c30a60a/src/renderer/src/store/slices/diff-comments/diffComments.test.ts
[impeccable-registry]: https://github.com/pbakaus/impeccable/blob/73221de69e4bb2940d464e241ef3c9f216f9d721/crates/foundation/src/registry.rs
[impeccable-coverage]: https://github.com/pbakaus/impeccable/blob/73221de69e4bb2940d464e241ef3c9f216f9d721/crates/detect/tests/regex_only_note.rs
[haystack-exact]: https://github.com/deepset-ai/haystack/blob/6fad0440ca0cb93656f4c1e82cee1cad232267f9/haystack/components/evaluators/answer_exact_match.py
[haystack-llm]: https://github.com/deepset-ai/haystack/blob/6fad0440ca0cb93656f4c1e82cee1cad232267f9/haystack/components/evaluators/llm_evaluator.py
[gerrit-copy]: https://github.com/GerritCodeReview/gerrit/blob/7e5dd8c6195558a78fbdbf2be22653f0d3fa4311/java/com/google/gerrit/server/approval/ApprovalCopier.java
[gerrit-submit]: https://github.com/GerritCodeReview/gerrit/blob/7e5dd8c6195558a78fbdbf2be22653f0d3fa4311/java/com/google/gerrit/server/submit/MergeOp.java
[pragent-reviewer]: https://github.com/The-PR-Agent/pr-agent/blob/7cd2a669cd4f3229f98c702e9319c3387aef5a88/pr_agent/tools/pr_reviewer.py
[pragent-findings]: https://github.com/The-PR-Agent/pr-agent/blob/7cd2a669cd4f3229f98c702e9319c3387aef5a88/pr_agent/algo/review_finding_state.py
