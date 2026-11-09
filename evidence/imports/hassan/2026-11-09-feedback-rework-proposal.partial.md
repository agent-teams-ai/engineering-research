# Evidence-based Feedback & Rework

## Focused technical research proposal for Agent Teams Orchestrator

**Prepared:** 2026-11-09\
**Status:** Expanded desk research and architecture proposal (addendum 2026-11-09); not an approved implementation design and no spike has been executed.\
**Scope owner:** To be agreed with the Orchestrator project owner.\
**Proposed contributor:** Hassan Behtooei

---

## 1. Executive summary

The Orchestrator should not accept an agent's completion claim as proof that a task is complete. It should evaluate a submitted candidate against an explicit, versioned completion plan using evidence whose provenance and relationship to the exact candidate revision can be checked.

The proposed loop is:

1. Work Coordination provides a task and a versioned completion plan.
2. An implementer produces a candidate and a self-report.
3. The system identifies the exact candidate revision and gathers or verifies evidence (repository state, diffs, real command executions, test results, artifacts, and execution records).
4. An independent reviewer evaluates the candidate against the acceptance criteria and evidence.
5. The review produces structured findings and one of a small set of advisory outcomes.
6. If correction is required, a bounded rework attempt is created against the findings.
7. The new candidate is checked again; evidence tied to an older candidate is not reused as current proof.
8. Only Work Coordination validates the completion plan and commits Task completion.

**Updated main recommendation:** Combine Paperclip-like runtime-enforced review gates, Ruflo-like lifecycle-triggered verification and regression witnesses, Orca-like isolated worktrees and line-anchored feedback, OpenHands-like evidence-aware review, Impeccable-like deterministic/qualitative quality separation, Haystack/Pydantic-like evaluator measurement, and SWE-bench-like isolated execution. Do not adopt any of these frameworks wholesale, build a standalone “review engine”, or add a second task state machine. Reuse the project's accepted owners and contracts. Treat review findings as advisory input and typed evidence as immutable, revision-bound records. Keep Work Coordination as the only authority that completes a product Task. Use the already-selected Temporal stack for durable orchestration when this capability is admitted; do not add LangGraphJS solely to implement this loop.

The first research deliverable should be a concise contract/state-transition proposal plus a small set of executable acceptance scenarios. A source/contract review is sufficient initially; an isolated spike should happen only after the owner agrees on the hypothesis, scope, candidate versions, expected observations, and stopping condition.

## 2. Alignment with the project's own brief

The 2026-11-08 Orchestrator Collaboration and Research Brief explicitly defines this as Hassan's research topic: model the implementation/report/review/next-phase loop, including missing criteria, stale evidence, correction, and bounded rework, while Work Coordination retains task-completion authority.

The same brief also establishes that:

- the current stage is discussion and focused research, not main Orchestrator implementation;
- the owner is completing the plugin/extension groundwork and preparing the detailed implementation phases;
- the current request to Hassan is research and architectural feedback, not immediate product integration;
- a spike must be isolated/disposable and must answer one agreed question;
- a spike is not permission to create a parallel Task engine, production package, or automatic production integration;
- the final research report should state the question, canonical references, exact versions, test cases, reproduction commands where applicable, actual results, limitations, rejected options, open questions, and recommendation.

Relevant project references:

- [Orchestrator Collaboration and Research Brief](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/mvp/orchestrator-research-plan/docs/research/orchestrator-mvp-research-and-collaboration-2026-11-08.md "Orchestrator Collaboration and Research Brief")
- In that brief, see “Research topics to choose from now”, “What an isolated spike should deliver”, “Feedback, checkpoints, and task continuity”, “Collaboration and implementation sequence”, and “Future acceptance reference for implementation phases”.

The project's future acceptance reference already says that an incomplete result receives findings, is corrected, and meets criteria against the exact candidate/artifact revision; later contributions invalidate stale evidence; and rework budgets and limits apply. It also says that review findings are advisory inputs or typed evidence bound to an immutable candidate/artifact revision, while Work Coordination validates the applicable completion plan and commits completion.

This proposal elaborates those rules; it does not replace or amend the canonical architecture or any ADR.

## 3. Research question and non-goals

### Primary question

How can Orchestrator decide whether a submitted task candidate satisfies its versioned acceptance criteria using verifiable, provenance-aware evidence, and how can it request and verify bounded corrections without transferring Task-completion authority to an agent, reviewer, workflow graph, or runtime?

### Questions to answer

1. What minimum information must an implementation report contain?
2. Which evidence is agent-reported, system-observed, machine-verified, reviewer-generated, or human-approved?
3. How is evidence tied to one exact candidate/artifact revision?
4. What changes invalidate evidence and review results?
5. How are review findings structured so that an implementer can act on them?
6. How does a review outcome map to clarification, rework, blocked, human decision, or completion eligibility?
7. How are repeated rework attempts bounded by count, time, and/or cost?
8. What are the correct owners for state, durable waits, execution, and final completion?

### Explicit non-goals

- Implementing the production review/rework feature now.
- Building a universal workflow editor or generic policy engine.
- Replacing Work Coordination, Run Orchestration, Agent Runtime, Temporal, PostgreSQL, or JetStream.
- Creating a second Task/Run domain model or a parallel production execution engine.
- Requiring every task to use code-specific evidence; this is a general orchestration product. The first fixture may use a software task because it is easy to verify objectively.
- Automatically merging code, publishing artifacts, or approving high-impact actions based only on an LLM reviewer.
- Selecting a new agent framework or adding LangGraphJS without a separate demonstrated need.

## 4. Terminology and evidence trust model

Keep the following categories distinct. They must not be flattened into a single free-form “agent report”.

| **Category**         | **Meaning**                                                   | **Example**                                               | **Default trust**                                        |
| -------------------- | ------------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------- |
| Agent claim          | What the implementer says it did                              | “All tests passed”                                        | Unverified assertion                                     |
| System observation   | What the Orchestrator/runtime/source-control adapter observed | candidate commit/tree digest, changed paths, agent run ID | Trusted only within the adapter's documented scope       |
| Machine verification | Reproducible result from a controlled verifier                | command, exit code, test report, screenshot, API response | Strong for the exact tested candidate and environment    |
| Reviewer finding     | A structured conclusion about criteria and supplied evidence  | “Anonymous requests are not rejected”                     | Advisory; must cite evidence                             |
| Human decision       | Explicit decision by an authorized human                      | approve, reject, clarify, waive                           | Authoritative only within the human's granted permission |

An agent's narrative is useful context but must never promote itself into verified evidence. A successful test command is evidence only if the system can establish which candidate, command, environment, and output it belongs to. An LLM review is not a substitute for executing deterministic checks.

For software work, useful evidence can include:

- repository ID, base revision, candidate revision, commit SHA and/or tree/patch digest;
- exact changed-file manifest and diff reference;
- commands run, working directory, exit code, start/end times, runner/container image digest, toolchain and dependency-lock versions;
- test names, counts, failures, structured test report and bounded logs;
- real end-to-end interaction output (e.g. request/response), screenshot or recording for UI work;
- static-analysis, type-check, security-scan and build outputs where applicable;
- links to artifacts and the agent execution/trace, subject to access-control and retention policy.

For non-code tasks, the evidence adapter should provide equivalent artifacts and provenance for the relevant domain rather than forcing Git concepts into every workflow.

## 5. Candidate identity and evidence freshness

This is the core invariant: **every review result and every piece of completion evidence must identify the exact candidate and the acceptance-plan revision it evaluates.**

A candidate should be immutable once submitted for review. It can be identified by a project-owned `candidateId` plus a fingerprint containing (as appropriate):

- Task ID and Task revision;
- completion-plan / acceptance-criteria revision;
- base revision;
- candidate source revision (Git commit SHA when available);
- working-tree/tree/patch digest, because a commit SHA alone does not represent uncommitted or untracked workspace changes;
- artifact digests for generated binaries, documents, or other outputs;
- relevant test/evaluation configuration and environment identity.

Do not assume a commit SHA alone proves which test suite or runtime configuration was used. Evidence needs its own provenance and scope.

### Evidence invalidation rules (proposed)

Mark evidence as stale/invalidated, not deleted, when any dependency relevant to that evidence changes:

- candidate content or artifact digest changes;
- acceptance criteria or completion-plan revision changes;
- the test command, evaluator, test data, environment image, dependency lock, or configuration changes in a way that affects the result;
- the evidence source is revoked, corrupted, or cannot be retrieved;
- a review is rerun against a different candidate.

Keep historical results for auditability, but never count them toward the current candidate's completion proof. At minimum, any new candidate revision requires a new review decision for that revision. The system may later optimize by rerunning only affected checks, but it must not silently carry forward an old “pass” as a pass for a new candidate.

This follows the project's explicit exact-revision and stale-evidence acceptance rule, and mirrors OpenHands' review guidance that CI evidence from an earlier PR head is not proof for the current head.

## 6. Proposed conceptual records (not a committed schema)

The following is a discussion model only. The owner must map each field to the existing contexts and contracts before implementation. Do not create a universal aggregate merely because these concepts are listed together.

### CompletionPlanRevision

- `taskId`, `taskRevision`, `planRevision`;
- acceptance criteria with stable criterion IDs and clear observable outcomes;
- required evidence types/checks per criterion;
- required/optional status and any authorized waiver path;
- review policy (reviewer role, human escalation policy);
- maximum rework attempts and elapsed-time/cost budget (policy defaults remain open).

The plan should be immutable per revision. A material change creates a new revision and an explicit migration/re-evaluation decision.

### ImplementationAttempt / Candidate

- attempt ID, assigned executor, attempt number;
- Task and plan revisions;
- base and candidate revision/fingerprint;
- artifact manifest;
- implementation report and declared limitations;
- run/trace references and lifecycle timestamps.

### EvidenceRecord

- evidence ID and type;
- producer/source identity (agent, runner, CI, user, provider);
- `candidateId` and candidate fingerprint;
- plan revision and criterion IDs covered;
- command/check/evaluator identity and version;
- environment fingerprint where relevant;
- outcome, exit code, timestamps, payload/artifact URI and digest;
- provenance/verification state (e.g. asserted, observed, verified, stale, revoked);
- retention and sensitivity classification.

### ReviewDecision and Finding

- review ID, candidate ID/fingerprint, plan revision;
- reviewer identity/role and reviewer model/prompt/skill version where relevant;
- decision: `accepted`, `rework_required`, `blocked`, or `needs_human_decision`;
- finding IDs, criterion IDs, severity, affected path/line/artifact reference, concrete failure, evidence references, and actionable correction;
- unresolved questions and confidence/uncertainty metadata where useful.

A finding must describe a concrete unmet criterion or demonstrated failure. Style preferences and speculative improvements should not create mandatory rework.

### ReworkRequest

- rework ID, source candidate and review IDs;
- target finding IDs and exact expected corrections;
- assigned executor and attempt number;
- remaining attempt/time/cost budget;
- idempotency/correlation key and timestamps;
- resulting candidate ID when submitted.

These records may belong to different owning contexts. The design must preserve those boundaries.

## 7. Proposed lifecycle and state transitions

The following is a conceptual flow, not a proposal to add these exact enum values to the product without owner review.

```
flowchart TD
    A[Task and versioned completion plan] --> B{Criteria complete enough?}
    B -- No --> C[Clarification / blocked]
    B -- Yes --> D[Implementation attempt]
    D --> E[Candidate submitted + agent report]
    E --> F[Capture candidate fingerprint and evidence]
    F --> G[Run required machine checks]
    G --> H[Independent review against criteria and evidence]
    H --> I{Review outcome}
    I -- Accepted --> J[Completion eligibility evidence]
    J --> K[Work Coordination validates plan and commits Task completion]
    I -- Rework required --> L{Budget and attempts remain?}
    L -- Yes --> M[Create bounded ReworkRequest]
    M --> D
    L -- No --> N[Escalate / blocked / human decision]
    I -- Blocked --> C
    I -- Needs human decision --> O[Authorized human decision]
    O --> H

```

### Decision meanings

- **Accepted:** the reviewed candidate satisfies all required criteria and evidence checks. This makes the candidate eligible for Work Coordination's completion validation; it does not itself complete the Task.
- **Rework required:** one or more actionable, evidence-backed findings remain and a bounded correction attempt is allowed.
- **Blocked / clarification required:** criteria are missing or ambiguous, required evidence cannot be obtained, the runner/environment is unavailable, or an external outcome is unknown. Do not send an implementer into blind rework when the desired behavior is undefined.
- **Needs human decision:** the issue cannot safely be resolved by the configured reviewer or automated verifier, or a policy explicitly requires human approval.

### Rework limits

Use configurable policy rather than an unbounded loop. The policy should be able to cap:

- number of rework cycles;
- elapsed wall-clock time;
- model/provider spend or execution budget;
- reviewer retries (distinct from implementer rework attempts);
- maximum age of evidence and human-response deadline.

When a limit is exhausted, stop automatic rework and surface the reason plus current evidence to an authorized human. A failed verifier retry caused by infrastructure failure should not automatically consume an implementer rework attempt.

The exact default limits are an open product-policy question. A spike can use deliberately small test values to prove the mechanism, but must not turn those values into production policy.

## 8. Independence, authority, and permissions

Recommended responsibility split:

- **Implementer:** writes the candidate and submits a report; cannot mark its own evidence as verified or commit Task completion.
- **Evidence collector/verifier:** obtains source-control facts and runs approved commands in a controlled environment; its capabilities are narrow and auditable.
- **Reviewer:** read-only access to the candidate, plan, prior review context and evidence; returns structured findings; cannot modify the candidate or complete the Task.
- **Work Coordination:** owns Task lifecycle, validates the applicable completion plan and is the sole component that commits Task completion.
- **Temporal / workflow process:** owns durable waiting, retries, timers and process continuation as already allocated in the architecture; it is not the canonical Task database or completion authority.
- **Human:** resolves explicitly escalated ambiguity or high-impact decisions according to authorization policy.

“Independent review” should at minimum mean a separate review invocation/context with read-only candidate access and no write/completion permission. Using a different model/provider may improve diversity in some cases, but should be optional and justified by measured review quality and cost; model diversity alone does not prove independence.

The reviewer must treat task text, PR descriptions, logs, code comments and agent-provided artifacts as untrusted data, not as instructions. It should verify claims against the current candidate and repository policy. OpenHands' review prompt explicitly applies this untrusted-input principle to embedded PR text and focuses findings on the current diff/head.

## 9. Architectural fit with the existing Orchestrator direction

The proposal should follow the owner boundaries already in the brief:

- **Work Coordination / PostgreSQL:** Task identity, revisions, completion plan, assignments, lifecycle and completion transition.
- **Feature-owned application process / Temporal adapter:** durable waits, scheduling, retries and execution progress; no global workflow should become owner of every domain.
- **JetStream adapters:** integration events with durable consumption, deduplication and acknowledgement after the relevant application commit.
- **Agent Runtime:** execution custody and technical lifecycle; Orchestrator's Runtime ACL translates intents and observations.
- **Communication / Context / Run:** incoming feedback, message history/cursors, context manifests and decisions to wake, pause, resume or replace execution remain with their documented owners.

The review/rework capability should call owner-approved application ports and consume typed evidence. It should not read another context's PostgreSQL tables directly or create a second task lifecycle.

### Temporal vs. LangGraphJS

Temporal is already the selected durable orchestration baseline in the project's brief. It can express a durable control loop, wait for review/human input, schedule retries and resume after process failure. Workflow code must be deterministic; external effects belong in Activities.

LangGraphJS offers useful graph-local execution and human-interrupt/checkpoint patterns. However, its checkpoint state should not become the Orchestrator's Task authority. The LangGraph documentation also warns that interrupted nodes/subgraphs can be re-executed from the beginning on resume, so code before an interrupt must be safe against repeated execution. The project brief already treats a shared LangGraphJS adapter as a separate research question for Task handoff, not an assumed component of this topic.

**Recommendation:** do not add LangGraphJS to the first Evidence/Rework slice. Revisit only if the team identifies a concrete graph-local state capability that Temporal plus the existing owned progress records cannot satisfy.

## 10. Open-source references and what to learn from them

These projects are references for bounded mechanisms, not drop-in replacements for Orchestrator. The stack and ownership model differ.

| **Project / source**                                                                                                                                                                                                                 | **Useful pattern**                                                                                                                                                               | **What not to assume**                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [OpenHands PR Review Plugin](https://github.com/OpenHands/extensions/tree/main/plugins/pr-review "OpenHands PR Review Plugin") and [workflow docs](https://docs.openhands.dev/openhands/usage/use-cases/code-review "workflow docs") | PR diff + repository context, structured inline findings, severity, current-head review, optional evidence requirement, review traces and feedback collection                    | A PR-review agent is not a generic Task completion authority or durable business workflow                                              |
| [OpenHands review prompt](https://github.com/OpenHands/extensions/blob/main/plugins/pr-review/scripts/prompt.py "OpenHands review prompt")                                                                                           | Requires end-to-end proof for substantive PRs; screenshots/video for UI; real commands and outputs for backend/API; unit tests alone are not enough; labels PR text as untrusted | A PR description's evidence section is not itself a verified evidence store; the verifier still needs provenance and candidate binding |
| [OpenHands custom review guide](https://github.com/OpenHands/software-agent-sdk/blob/main/.agents/skills/custom-codereview-guide.md "OpenHands custom review guide")                                                                 | Concrete finding standard: affected path, concrete failure, evidence; examine acceptance criteria and CI for the current PR head; avoid speculative/style-only findings          | Do not copy its GitHub-specific APPROVE/COMMENT semantics as Orchestrator domain states                                                |
| [OpenHands PR review evaluation workflow](https://github.com/OpenHands/extensions/blob/main/plugins/pr-review/workflows/pr-review-evaluation.yml "OpenHands PR review evaluation workflow")                                          | Preserves trace artifacts and evaluates review effectiveness after PR closure; useful idea for reviewer-quality feedback loops                                                   | Reaction/trace evaluation is not proof that a Task's deliverable meets acceptance criteria                                             |
| [SWE-bench harness](https://github.com/SWE-bench/SWE-bench "SWE-bench harness") and [harness documentation](https://www.swebench.com/SWE-bench/reference/harness/ "harness documentation")                                           | Docker-isolated environment; apply patch, run tests, grade and report in a reproducible sequence                                                                                 | Benchmark harness is much larger and more specialized than a first product slice; do not adopt it wholesale                            |
| [Pydantic AI Evals](https://github.com/pydantic/pydantic-ai/blob/main/docs/evals.md "Pydantic AI Evals")                                                                                                                             | Dataset/case/evaluator model; evaluates final output and tool-call trajectory; supports span-based/agentic evaluation                                                            | It is Python-specific and evaluates AI systems; it is not an Orchestrator state owner or evidence ledger                               |
| [OpenAI agent evals / trace grading](https://developers.openai.com/api/docs/guides/agent-evals "OpenAI agent evals / trace grading")                                                                                                 | Trace-based grading during debugging, then datasets and repeated eval runs to measure regressions                                                                                | Vendor evaluation APIs should not be required for core product completion decisions                                                    |
| [LangGraphJS Human-in-the-loop](https://github.com/langchain-ai/langgraphjs/blob/main/docs/docs/agents/human-in-the-loop.md "LangGraphJS Human-in-the-loop")                                                                         | Pause, present approve/edit/reject, persist and resume after human input                                                                                                         | Interrupt/checkpoint state is not Work Coordination state; re-execution semantics and side effects need care                           |
| [Temporal documentation](https://docs.temporal.io/ "Temporal documentation")                                                                                                                                                         | Durable workflow execution, timers, signals/updates and activity retry boundaries                                                                                                | Temporal visibility is not the product Task database                                                                                   |
| [OpenTelemetry GenAI semantic conventions](https://github.com/open-telemetry/semantic-conventions/tree/main/docs/gen-ai "OpenTelemetry GenAI semantic conventions")                                                                  | Correlate agent/workflow/tool spans and operational traces                                                                                                                       | Telemetry is not authoritative evidence; conventions are marked development and captured inputs/outputs need privacy controls          |
| [reviewdog](https://github.com/reviewdog/reviewdog "reviewdog")                                                                                                                                                                      | Normalize diagnostics from linters/static analysis and surface them in code review                                                                                               | It is a diagnostics presentation/integration tool, not an LLM reviewer or rework state machine                                         |

### Shortlist to inspect first

1. OpenHands `plugins/pr-review/scripts/prompt.py`: evidence requirement, prompt-injection boundary, current revision and review context.
2. OpenHands `plugins/pr-review/scripts/agent_script.py`: orchestration of review, collection of context and submission of comments.
3. OpenHands `plugins/pr-review/workflows/pr-review-evaluation.yml` and its `evaluate_review.py`: post-review evaluation of usefulness/effectiveness.
4. SWE-bench `swebench/harness`: isolation, patch application, test execution, grading and reproducible reports.
5. Pydantic Evals docs: dataset/case/evaluator design for regression scenarios.

Do not copy entire frameworks into the Orchestrator. Extract patterns and map them to existing contracts.

## 11. Proposed bounded research exercise

### Hypothesis

A candidate-bound evidence bundle plus an independent, read-only reviewer can identify incomplete work and produce actionable findings, while bounded rework and Work Coordination ownership prevent stale evidence or a reviewer from falsely completing the Task.

### Minimal scenario

Use one disposable repository and one simple task, e.g.:

> Implement a protected `GET /profile` endpoint. An authenticated user receives their profile; an unauthenticated request receives HTTP 401. Add the required integration coverage and update the API contract/documentation.

This scenario is illustrative. The owner should approve the exact fixture and source repository before any code is written.

### Candidate sequence

- Candidate A: implementer submits code and a report claiming success.
- Evidence collector captures exact source snapshot/digests and runs specified build/test/API checks in a pinned disposable environment.
- Reviewer receives the versioned criteria, current diff, evidence manifest, command output and repository guidance in a read-only context.
- Reviewer returns structured findings. The fixture intentionally contains one unmet criterion.
- Work Coordination (or a pure test harness representing its existing contract, not a new production Task model) authorizes one bounded rework attempt.
- Implementer produces Candidate B. Evidence is collected again; the reviewer evaluates B, not A.
- Demonstrate that an accepted review only produces completion-eligibility evidence; the Task completion command/transition remains owned by Work Coordination.

### Required test cases

| **ID** | **Scenario**                                                                       | **Expected result**                                                                                                          |
| ------ | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| R1     | All acceptance criteria and required checks pass for candidate A                   | Reviewer may return accepted for A; completion eligibility is emitted for A only                                             |
| R2     | Implementer claims tests passed, but harness did not run them or reports failure   | Claim does not count as verified evidence; do not accept                                                                     |
| R3     | Required acceptance criterion is missing or ambiguous                              | Clarification/blocked; do not invent a criterion or start blind rework                                                       |
| R4     | Candidate changes after review                                                     | Prior review/evidence is stale for the new candidate; re-review/reverification is required                                   |
| R5     | Test output comes from a different commit/tree digest                              | Reject as evidence for the submitted candidate                                                                               |
| R6     | Reviewer identifies a concrete unmet criterion                                     | Rework request points to criterion, finding and source evidence; no vague/open-ended request                                 |
| R7     | Rework attempt/time/cost budget is exhausted                                       | Stop automatic loop and escalate; never loop indefinitely                                                                    |
| R8     | Duplicate review result or late result from a superseded attempt arrives           | Idempotently ignore/reconcile; must not complete the wrong candidate or Task                                                 |
| R9     | Automated check is flaky or environment unavailable                                | Mark inconclusive/blocked or retry verifier under its own policy; do not consume an implementer rework attempt automatically |
| R10    | Reviewer returns “accepted” but Work Coordination completion plan is not satisfied | Task remains incomplete                                                                                                      |

### Proposed stopping condition

Stop when the fixture demonstrates R1–R10 or identifies a concrete contract gap that prevents one or more cases from being represented. Do not expand into multi-team routing, workflow authoring, production UI, provider-specific runtime integration, or generalized agent evaluations.

### Deliverables

1. A short architecture note with the lifecycle, owners, records, trust boundaries and open decisions.
2. A state-transition table including invalid transitions and stale-revision behavior.
3. An evidence matrix mapping each criterion to required evidence type, producer, verifier and freshness key.
4. Reproducible tests/commands and raw outputs if an agreed spike is run.
5. A recommendation: reuse existing mechanisms, implement a narrow product-owned capability, or defer a decision.

## 12. Acceptance checklist for the research result

The research is complete when the owner can answer yes/no, with evidence, to these questions:

- [ ] Is the primary question and non-goal boundary agreed?
- [ ] Is each candidate and acceptance-plan revision uniquely identified?
- [ ] Is agent narrative clearly separated from observed/verified evidence?
- [ ] Does each evidence item identify its source, candidate, criteria, command/check and environment as applicable?
- [ ] Is stale evidence retained for history but excluded from current completion eligibility?
- [ ] Are review findings actionable and tied to criteria and evidence references?
- [ ] Are missing criteria distinguished from implementation defects?
- [ ] Are rework attempts and budgets bounded, with a human escalation path?
- [ ] Is the reviewer read-only and unable to complete the Task?
- [ ] Does Work Coordination remain the only Task-completion authority?
- [ ] Are Temporal and JetStream used only at their already accepted boundaries?
- [ ] Are security/privacy risks, prompt injection, untrusted reports, secrets and artifact retention considered?
- [ ] Are exact versions, test fixtures, commands, results and limitations recorded for any spike?

## 13. Security and reliability considerations

- Treat the candidate, PR body, issue text, code comments, build logs, tool output and agent-generated reports as untrusted input to the reviewer. These inputs may contain prompt injection.
- Reviewers should be read-only. Separate review from privileged execution and avoid exposing provider credentials to untrusted candidate code.
- Run candidate code in an isolated least-privilege environment with bounded CPU, memory, time, network and filesystem access.
- Store evidence references/digests rather than duplicating secrets or unrestricted logs. Redact credentials, tokens and sensitive user data before persistence or trace export.
- Pin workflow/plugin actions and dependency/tool versions in production automation; do not rely on mutable `main` for security-sensitive execution.
- Keep review output advisory. Do not let an LLM, Temporal workflow, provider process exit code, or event delivery acknowledgement complete a product Task.
- Handle duplicate events, retries, stale revisions, cancellation, late results and unknown external outcomes explicitly.

## 14. Open decisions to discuss with the project owner

1. What is the minimum candidate fingerprint for non-Git and Git-backed tasks?
2. Which evidence types are mandatory for the first software-task fixture, and which are policy-configurable?
3. Is the first reviewer an agent role, a human, or a reviewer adapter that can support both?
4. Which findings block acceptance and which are advisory?
5. What should happen when acceptance criteria are incomplete: require clarification before execution, or permit an explicit authorized waiver?
6. What are the initial rework-count, time and cost budgets? These must remain policy values, not hard-coded domain assumptions.
7. How should a changed candidate trigger selective verification while guaranteeing that no stale pass is reused?
8. Which existing application contract owns the acceptance plan and the command that commits Task completion?
9. What is the smallest existing repository/runner fixture the owner is comfortable using?
10. Is an isolated spike actually needed after source and contract review, or can the decision be made without code?

## 15. Suggested message to the project owner before any spike

> I reviewed the collaboration brief and the relevant open-source references. I propose keeping the first investigation focused on one software-task scenario and answering this question: how do we bind verified evidence and review findings to an immutable candidate and completion-plan revision, invalidate them when that candidate changes, and run a bounded rework loop while Work Coordination remains the only Task-completion authority?
>
> I suggest first producing the evidence matrix, conceptual records, state-transition table, and failure scenarios from source/contract research. If that leaves a material uncertainty, we can agree on one disposable fixture (one repository, one task, one intentional failure, one rework attempt) and its exact stopping condition before implementing it. I will not change the production Orchestrator or create a parallel Task engine as part of this research.
>
> The initial references I found most useful are OpenHands PR Review (especially its `require-evidence` option and current-head review rules), SWE-bench's Docker evaluation harness, and Pydantic Evals' dataset/trajectory evaluation model. Temporal remains aligned with the selected durable orchestration baseline; I do not currently recommend adding LangGraphJS to this loop.
>
> Does this scope match what you intended? Are there existing contracts or repositories you would like me to treat as authoritative for the candidate, evidence, and completion boundaries before I prepare the final research note or run a spike?

## 16. Research limitations

This is a desk-research proposal based on the public Orchestrator collaboration brief and current public documentation/source files linked above. No local clone of the Orchestrator or donor repositories was built, no code was executed, no benchmark was run, and no integration compatibility was verified. The report therefore makes architectural recommendations, not claims of experimentally proven performance or reliability. Exact versions and reproduction commands must be recorded if an isolated spike is subsequently approved.

---

## 17. Addendum: review of five additional repositories (2026-11-09)

This addendum extends the original desk research. It does not change the Orchestrator's canonical architecture or authorize implementation. The five repositories contribute different parts of the problem: interactive diff feedback, lifecycle hooks and regression verification, enforced review governance, deterministic quality rules, and evaluator/trace infrastructure.

### 17.1 Orca — worktree isolation and line-anchored feedback

Repository: [stablyai/orca](https://github.com/stablyai/orca "stablyai/orca")

Relevant sources:

- [Worktrees](https://github.com/stablyai/orca/blob/main/docs/site/content/docs/model/worktrees.mdx "Worktrees")
- [Annotate AI Diff](https://github.com/stablyai/orca/blob/main/docs/site/content/docs/review/annotate-ai-diff.mdx "Annotate AI Diff")
- [First session / parallel worktrees](https://github.com/stablyai/orca/blob/main/docs/site/content/docs/first-session.mdx "First session / parallel worktrees")

Observed approach:

- Each task/feature gets its own Git worktree, branch, checkout and agent terminals. The worktree lifecycle is create → work → review diff → ship → archive/delete.
- Reviewers can attach comments to exact lines in an AI-generated diff.
- Orca tracks comments across edits so they follow the line when the diff shifts.
- The user can send all line-anchored comments as one batch to an agent for revision.
- Orca's README also describes sending failing checks and PR review comments back to an agent.

What Orchestrator should learn:

- Preserve the relationship between a finding and a source location (path, diff hunk, line/range, and candidate revision).
- Keep feedback structured and batchable rather than sending an unstructured transcript to the implementer.
- Isolate candidates/workspaces to prevent parallel workers from corrupting each other's working state.
- Make the review UI navigable from a finding to its evidence and affected artifact.

Limitations for this research:

- The documented Annotate AI Diff loop is primarily reviewer/user-driven feedback. It is not evidence that a server-side verifier has independently executed acceptance checks.
- Line tracking across edits is useful for navigation, but it does not replace candidate identity. A comment following a moved line must still be tied to the reviewed candidate/revision and re-evaluated after a new candidate is submitted.
- Orca's documentation should be treated as a UX/worktree reference, not as a drop-in backend review workflow.

### 17.2 Ruflo — lifecycle hooks, behavioral regression guards, and cryptographic witnesses

Repository: [ruvnet/ruflo](https://github.com/ruvnet/ruflo "ruvnet/ruflo")

Relevant sources:

- [Verification System](https://github.com/ruvnet/ruflo/blob/main/verification/README.md "Verification System")
- [CI workflow](https://github.com/ruvnet/ruflo/blob/main/.github/workflows/v3-ci.yml "CI workflow")
- [Verification & Quality Assurance skill](https://github.com/ruvnet/ruflo/blob/main/.claude/skills/verification-quality/SKILL.md "Verification & Quality Assurance skill")
- [Hooks and Workers wiki](https://github.com/ruvnet/ruflo/wiki/Hooks-and-Workers "Hooks and Workers wiki")

Observed approach:

1. Lifecycle hooks expose points such as `pre-task`, `post-task`, `pre-edit`, `post-edit`, `pre-command`, and `post-command`. This gives the harness opportunities to collect context before work and record outcomes after actions.
2. The current Verification System README describes three regression-protection layers:
   - behavioral smoke tests that exercise user-visible failure modes;
   - a cryptographically signed witness manifest for documented fixes;
   - temporal JSONL history used to identify when a regression appeared.
3. Witness entries record a Git commit, file, SHA-256 and distinctive marker. CI checks that the marker is still present in the cited output/build and verifies the manifest signature.
4. CI also runs targeted smoke jobs for issues such as install behavior, hook command execution, MCP protocol compatibility, memory import behavior and tool-description rules.
5. The README explains why this exists: several regressions passed unit tests but still failed in real installation/use paths.

What Orchestrator should learn:

- Evidence gathering should be triggered by explicit lifecycle events, not left to the implementer's final prose.
- Use multiple verification layers: unit/integration tests, real user-path smoke tests, artifact-integrity checks, and historical regression tracking.
- Preserve a machine-readable, append-only verification history with candidate/commit identifiers.
- Test the environment users actually execute (including install, process/CLI boundaries and platform-specific behavior), not only internal functions.

Important limitations and caution:

- A witness marker proves that a distinctive string or fix marker exists in a particular file/build; it does not prove that the behavior is correct. It must supplement, not replace, behavioral tests.
- The signature and marker system proves integrity/attestation under its signing assumptions; any reuse must separately review key provenance, signing authority, rotation and threat model.
- Ruflo's `verification-quality` skill describes broad truth scoring and rollback capabilities, but the repository's verification README is the stronger description of the concrete shipped regression stack. Do not assume every capability in the skill prose is equally implemented or production-ready.
- `post-task` is a trigger to begin verification, not an approval outcome. Never turn an agent's own success flag into verified completion.

### 17.3 Paperclip — runtime-enforced review policy and task watchdog

Repository: [paperclipai/paperclip](https://github.com/paperclipai/paperclip "paperclipai/paperclip")

Relevant sources:

- [Execution Policy: Review & Approval Workflows](https://github.com/paperclipai/paperclip/blob/master/docs/guides/execution-policy.md "Execution Policy: Review & Approval Workflows")
- [Task Watchdog](https://github.com/paperclipai/paperclip/blob/master/doc/TASK-WATCHDOG.md "Task Watchdog")
- [Heartbeat Protocol](https://github.com/paperclipai/paperclip/blob/master/docs/guides/agent-developer/heartbeat-protocol.md "Heartbeat Protocol")
- [Core Concepts](https://github.com/paperclipai/paperclip/blob/master/docs/start/core-concepts.md "Core Concepts")

Observed approach:

- An issue may have an `executionPolicy` with ordered `review` and/or `approval` stages. The runtime intercepts an executor's attempt to move work to `done`, changes it to `in_review`, and assigns the next eligible reviewer/approver.
- Review decisions are durable records with issue/stage, actor, outcome, required explanatory body, creating run ID and timestamp.
- When a reviewer requests changes, the runtime returns the issue to `in_progress`, restores the original executor, records `changes_requested`, and routes the resubmitted work back through the same review stage.
- Every issue-bound agent run must leave a comment; the runtime retries once if it does not and records whether the requirement was satisfied or exhausted.
- The optional task watchdog examines a stopped issue subtree. It treats stopped leaves as claims to be checked against comments, documents, work products, screenshots, tests, blockers and review state.
- The watchdog computes a SHA-256 fingerprint of stopped-leaf identifiers/statuses/blockers/pending interactions and watchdog configuration. A matching fingerprint suppresses duplicate review; a new fingerprint may trigger a new review task. The review task/wake is idempotent for the watchdog and fingerprint.
- Server-side scope checks restrict watchdog mutations to the watched subtree and prevent it from impersonating formal approvals or bypassing execution-policy stages.

What Orchestrator should learn:

- Review/approval must be enforced by the runtime or owning application contract, not by a prompt convention.
- Model review and formal approval should be distinct stages with separate actor roles and permissions.
- Persist the decision, actor, run ID, reason and timestamp for audit.
- On `changes_requested`, return work to the original executor and preserve the same review gate.
- Use state fingerprints and idempotency keys to prevent repeated watchdog/review dispatch for an unchanged state.
- A watchdog should only restore a legitimate continuation path or explain a valid blocked/waiting state; it must not grant itself governance authority.

Important limitation to investigate before borrowing:

- The documented `IssueExecutionDecision` is keyed to an issue/stage/run and decision, but the documented shape does not itself show a Git commit/tree digest or immutable candidate ID. Orchestrator's research should add candidate and completion-plan revision binding rather than assuming the Paperclip decision record fully solves evidence freshness.
- The documented changes-requested loop continues until approval. Orchestrator must add explicit attempt/time/cost bounds and escalation, since an unbounded review loop is not acceptable as a default.
- The watchdog verifies stopped task trees and thread evidence; it is not a replacement for a deterministic build/test harness or code-specific candidate verifier.

### 17.4 Impeccable — scoped critique, severity and deterministic quality rules

Repository: [pbakaus/impeccable](https://github.com/pbakaus/impeccable "pbakaus/impeccable")

Relevant source: [README](https://github.com/pbakaus/impeccable "README")

Observed approach:

- Commands such as `critique` and `audit` provide a defined review vocabulary and a focused target (e.g. a component or page, rather than an entire application).
- `critique` scores a design against usability heuristics and ranks suggested fixes.
- `audit` reports accessibility, performance, theming and responsive issues, using P0 (blocking) through P3 (polish) severity levels.
- It also describes 62 deterministic rules that detect recurring UI quality problems without an LLM or API key.
- Project context is captured in files such as `PRODUCT.md` and `DESIGN.md`, so repeated reviews use stable product/design constraints.

What Orchestrator should learn:

- Review scope should be explicit and narrow enough for reliable assessment.
- Use severity categories to distinguish blocking defects from polish suggestions.
- Keep deterministic checks separate from model-based critique. Deterministic rules are repeatable; LLM critique can cover context-dependent or qualitative issues.
- Persist review criteria/context in version-controlled artifacts where appropriate, so reviewers do not silently invent standards on each run.

Limitations:

- Impeccable focuses on frontend/design quality, not generic backend correctness, task governance or evidence provenance.
- A scored critique is not proof that an acceptance criterion is met. The first product slice should use objective checks where possible and use qualitative critique only for criteria that genuinely require judgment.

### 17.5 Haystack — evaluation datasets, component/end-to-end evaluation and tracing

Repository: [deepset-ai/haystack](https://github.com/deepset-ai/haystack "deepset-ai/haystack")

Relevant sources:

- [Evaluation guide](https://docs.haystack.deepset.ai/docs/3.3/evaluation "Evaluation guide")
- [Evaluator components](https://docs.haystack.deepset.ai/docs/evaluators "Evaluator components")
- [Production usage: evaluation, tracing and logging](https://docs.haystack.deepset.ai/docs/production-usage "Production usage: evaluation, tracing and logging")

Observed approach:

- Evaluates both individual pipeline components and complete end-to-end pipelines.
- Supports statistical evaluators that need ground-truth labels and model-based evaluators that can work without labels.
- Includes evaluators for exact match, context relevance, faithfulness, semantic similarity and retrieval metrics such as recall/MRR/MAP/NDCG.
- Supports tracing through pipeline components, including integrations with OpenTelemetry and several tracing/observability providers.

What Orchestrator should learn:

- Build a repeatable evaluation dataset of known tasks, candidates, evidence bundles and expected reviewer findings.
- Evaluate the reviewer itself, not only the implementer's output: finding precision, missed critical findings, false positives, severity calibration, and decision consistency.
- Separate component-level tests (evidence collector, criteria matcher, reviewer) from end-to-end tests of the entire review/rework loop.
- Use traces to explain which evidence and tool results influenced an evaluation, with privacy-conscious capture and redaction.

Limitations:

- Haystack is an LLM pipeline/orchestration and evaluation framework, not a code review/rework governance system.
- Its evaluators can grade generated outputs, but cannot independently prove that a Git candidate compiles, that tests truly ran on that candidate, or that a product Task is authorized to complete.
- Do not add Haystack as an Orchestrator dependency solely for this feature. Its evaluator design and methodology can be reused conceptually; language/runtime integration needs a separate decision.

---

## 18. Cross-project comparison and updated source ranking

| **Repository**      | **Strongest contribution**                                                                     | **Evidence strength**                                                   | **Review/rework governance**                            | **Main gap for Orchestrator**                                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Paperclip           | Runtime-enforced review and approval stages; watchdog and idempotent stopped-state fingerprint | Thread/artifact/test references; watchdog fingerprint                   | Strong                                                  | Documented decision shape does not show immutable candidate/plan revision binding; loop needs explicit bounds             |
| Ruflo               | Lifecycle hooks; real CI smoke guards; signed witness manifest; regression history             | Strong for specific marker/build integrity and exercised smoke paths    | Partial; not a complete task completion authority model | Marker existence is not semantic correctness; review policy and candidate-specific acceptance gate are not its main model |
| Orca                | Isolated Git worktrees; exact-line diff comments; batched feedback to agents                   | Strong navigation to actual diff lines, but comments are human feedback | Primarily interactive                                   | Does not establish automated evidence verification or formal completion gate                                              |
| OpenHands PR Review | Evidence-aware code review, current-head context, structured findings                          | Strong review-oriented candidate/CI context                             | PR workflow                                             | PR-specific, not generic product Task authority                                                                           |
| SWE-bench           | Reproducible Docker patch/test/grade harness                                                   | Strong for benchmarked candidate behavior                               | None                                                    | Benchmark harness, not general orchestration governance                                                                   |
| Impeccable          | Scoped critique, severity levels, deterministic UI quality rules                               | Deterministic for defined UI rules; qualitative for critique            | None                                                    | Frontend-specific and not candidate/task governance                                                                       |
| Haystack            | Evaluators, datasets, component/end-to-end evaluation, tracing                                 | Useful for evaluator quality and pipeline behavior                      | None                                                    | Does not prove code behavior or own Task lifecycle                                                                        |
| Pydantic AI Evals   | Test-case and trajectory evaluation for agent systems                                          | Useful for agent behavior regression tests                              | None                                                    | Python evaluation tooling, not product Task owner                                                                         |

### Updated study priority

1. **Paperclip** — first inspect execution policy and task watchdog, because it provides the strongest concrete reference for system-enforced review gates, authority separation, idempotency and stopped-task recovery.
2. **Ruflo** — inspect `verification/README.md`, witness scripts and CI jobs, because it contributes specific regression-proof mechanisms and real cross-platform smoke testing.
3. **OpenHands + Orca** — compare evidence-aware reviewer prompts/findings with exact-diff, line-anchored human feedback. Together they inform the reviewer interface and finding schema.
4. **SWE-bench** — use as a reference for reproducible candidate execution and grading in an isolated environment.
5. **Haystack + Pydantic AI Evals** — use for measuring reviewer quality and regression behavior over a fixed evaluation dataset.
6. **Impeccable** — use for scoped quality criteria, severit

... (осталось: 16 кб)