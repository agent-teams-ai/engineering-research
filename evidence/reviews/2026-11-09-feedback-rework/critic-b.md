# Independent Critic B — Evidence-Based Feedback and Rework

**Review date:** 2026-11-09 UTC.  
**Reviewer:** independent architecture/contract critic B.  
**Reviewed input:** `docs/studies/evidence-based-feedback-and-rework-2026-11-09.md`.  
**Exact input SHA-256:** `4fb83ae82afeb384c973300d7442111b0383a8e81210ad83bbe4646c16acef67`.  
**Disposition:** one narrowly scoped substantive clarification requested before publication; otherwise the inspected architecture and research boundaries are sound. This is a documentation critique, not implementation admission, deployment qualification or a substitute for the repository checks.

## Review scope and authority

Read the complete 231-line study at the hash above, repository `AGENTS.md`, the local Docs Protocol authoring skill/configuration, documentation map and research review record. Read the organization's Engineering Quality Standard through the authorized GitHub connector (inspected file blob `9d4fc54d99249077bf6887be35a59ace1d5547bd`). The study's scope is source-based research for Hassan's read-only contract audit, not product implementation or a broad new competitor survey.

Compared the relevant Orchestrator contracts at canonical main `a34587b313e656eeb43d755b4a4f08c40dff2116`. A local Git comparison confirmed that ADR-0072, ADR-0066, ADR-0027, OD-027, the Runtime boundary and Work Coordination dossier are unchanged between that main and the collaboration branch `7e2c3eccbac63b5738e39a31bfa53332412de0f8` inspected earlier. The study correctly distinguishes those two references.

Separately inspected the pinned ReviewRouter Action managed invocation, run acceptance, outcome parser and build helper, and the pinned server capabilities and ADR-030. The other donor implementations are outside this critic's independent source audit; their technical claims require the source reviewers' separate evidence rather than this critique being treated as blanket corroboration.

## Findings

### B1 — Medium: distinguish a hard rework bound from soft budget policy

**Location:** the proposed-case table, R7, at input line 145; related discussion of review-round exhaustion around line 46.

The current row says `R7: exhausted budget` and then `Stop automatic continuation even with no assigned human`. For a configured hard review/rework limit this is a useful proposed behavior, but the generic budget wording can also be read as replacing the accepted soft-limit behavior. [ADR-0045](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0045-three-usage-bounded-contexts.md) explicitly separates alerts/soft limits from hard quotas and assigns budget definitions, reservations and consumption decisions to Consumption Governance. Run Orchestration consumes those decisions; neither a reviewer nor a local rework loop becomes a second resource-budget owner.

**Small correction:** name this case `R7: exhausted configured hard rework bound`. Say that automatic rework stops at that configured bound even without an assigned human, with explicit unresolved/escalation behavior and no invented terminal Work outcome. Preserve soft budget warnings and hard quota decisions under their existing Consumption Governance authority. A warning threshold alone must not silently become a stop policy. This needs a wording correction and one existing-owner reference, not a new budget subsystem or added research workstream.

### B2 — Low: name exactly what is created atomically

**Location:** `Align with the accepted completion contract`, input line 104.

`Work and its evaluation reference are established atomically` is imprecise because Work generally already exists when completion is requested. [ADR-0072](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0072-atomic-work-completion-evaluation.md) requires the new `CompletionEvaluation` and `WorkItem.activeCompletionEvaluationRef` to be persisted in the same context-scoped Unit of Work. The finalization transaction then checks and changes both existing aggregates.

**Small correction:** replace that clause with `The new CompletionEvaluation and WorkItem.activeCompletionEvaluationRef are persisted atomically in the same context-scoped Unit of Work`. The surrounding account of finalization is correct. No redesign is needed.

### B3 — Low: qualify Runtime permissions as technical permissions

**Location:** the owner table, `Execution, permissions and session custody`, input line 116.

The [Runtime boundary](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/architecture/runtime-boundary.md) distinguishes technical runtime permission/enforcement from product authorization and approval policy. The rest of the study respects this distinction, but the unqualified table label is broader than the accepted owner.

**Small correction:** `Execution, technical runtime permissions and session custody`. Product authorization, eligible approvers and completion authority stay with their existing Orchestrator owners.

## Verified alignment and counterevidence

- **Completion authority:** the study uses `completionEpoch`, `completionBasisRevision`, `candidateDigest` and the pinned plan rather than invalidating evidence for every Task metadata edit. It preserves Work Coordination final authority and a scoped reviewer fact; `CompletionEvaluation` does not become a new external review ledger.
- **Domain and process split:** Temporal coordinates feature-owned application use cases, with no SDK types or workflow history promoted to Task authority. Agent Runtime remains the execution/custody owner. Raw evidence, artifacts and business state are not collapsed into one aggregate or shared database model.
- **Admission versus target:** the study expressly limits the currently admitted Work feature to Task creation/metadata under ADR-0103. Accepted completion invariants are not described as implemented review/completion or as permission to begin retained functionality.
- **Clean Architecture, SOLID, DDD and DRY:** the proposed reusable review boundary is consumer-owned, separates PR publication and account policy, and preserves adapter failure/partial semantics. It does not introduce a universal shared Task domain, another orchestration engine or speculative package hierarchy. Mapping the second real consumer before extraction is compatible with the organization's deliberate library-first direction.
- **ReviewRouter reuse:** the code supports model-free preparation, managed execution, revision/outcome validation and explicit partial results. The study correctly calls these extraction candidates rather than an existing standalone SDK. It does not attribute the earlier investigation runtime's independent critics and dependency-attested replay to the default OCR path, nor claim measured token savings.
- **Sub2API:** the owner direction leaves future Orchestrator/extracted-reviewer selection open. It explicitly preserves the existing ReviewRouter decision and accepted AR interactive contract. No credential, deployment, dependency or gateway mutation is implied. The ADR reference is not used as proof of live qualification.
- **Hassan's scope:** first investigate supplied acceptance criteria, evidence applicability, bounded rework and existing contracts. PRD generation remains separate. The next step is a read-only audit; an isolated spike remains conditional on an actual unresolved question. His part-time availability is not turned into an arbitrary deadline.
- **Partial-input honesty:** independently recomputed the preserved attachment's SHA-256 as `e5ca71d6e57bcf34103e0b80f28550553c365b43a357da05ab2019725ff5ddfd`, size 57,524 bytes, and inspected the truncated ending. The study accurately discloses that the continuation was unavailable and does not claim to have reviewed it.
- **Evidence honesty:** source inspection, inspected test code, recommendation and unexecuted experiments remain distinct. No production-ready autonomous loop, comparative reviewer accuracy or competitor benchmark is asserted by this review.

## Verification and limits

`pnpm docs:info` succeeded in this research checkout and reported the portable Docs Protocol authority. This critic did not run the full documentation gate, execute competitor tests, invoke paid models, alter the study or make product/source changes. The author remains responsible for the actual check results and publication. Only this original critique file was added under raw evidence, outside the governed `docs` collection.

The requested correction is deliberately narrow. After the author resolves B1 and the two wording clarifications, no additional architecture gate, broad survey, prototype or new permission request follows from this critique.
