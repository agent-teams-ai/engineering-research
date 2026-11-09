---
id: research.studies.task-verification-evaluation-plan-2026-11-10
type: study
status: active
owner: research/maintainers
summary: Evidence-first, reproducible Task Verification study and E2E experiment sequence with ReviewRouter as first consumer and no premature production rollout.
reviewed_at: 2026-11-10
---

# Task Verification: Audit, Experiments and E2E Qualification — 2026-11-10

## Scope and status

**Recorded 2026-11-10 (Europe/Chisinau). Proposed work specification, not an implementation, approved release gate or successful benchmark.** This is a **role-neutral** work plan; it can be taken by a collaborator or an internal agent. It follows the [independent core vision](task-verification-vision-2026-11-10.md), [ReviewRouter PR UX](reviewrouter-task-verification-ux-2026-11-10.md) and the [2026-11-09 source audit](evidence-based-feedback-and-rework-2026-11-09.md). The external proposal collected in the 2026-11-09 study was partial; its unavailable continuation must not be treated as reviewed.

**Primary hypothesis:** Given a fixed acceptance-plan snapshot and immutable implementation candidate, a read-only verification capability reusing the existing ReviewRouter engine can more reliably identify missing requirements and produce actionable feedback than an ordinary diff-only review, without incorrect acceptance of stale/partial evidence or unacceptable false rework. It should not need a new provider account stack or another durable workflow engine.

Researcher scope: **first identify what is missing**, then choose one test that changes an architecture/quality decision. This is not permission to start full Orchestrator implementation. The researcher may recommend *no new code* if existing contracts already suffice.

## Evidence and counterevidence

### Phase 0: read-only contract and implementation audit

Create a compact matrix with the columns below. This is an **independent, critical review of the owner's proposed contracts and decisions**: challenge conflicting or incomplete semantics, highlight what is already well designed, propose precise alternatives and suggest the smallest owner-authorized corrections. It is *not* just a list of existing interface names, and does not silently reopen or edit accepted ADRs. For every row, distinguish **accepted contract**, **implemented behavior**, **experimental code** and **unknown**. Include the exact source revision and observed date, a severity-ranked issue/recommendation and its concrete scenario. The reviewer can conclude that no change is warranted.

| Question | Start from | Required answer |
| --- | --- | --- |
| Candidate and plan freshness | Orchestrator ADR-0072, OD-027, Work Coordination dossier | Existing identity/owner, material-change policy gap and no duplicated completion authority |
| Agent execution and evidence | Agent Runtime published contracts, Runtime boundary | What can be observed, pinned and retrieved without importing provider internals |
| Durable continuation and retry | Orchestrator ADR-0027, feature process contracts | Which retry/timer commands already exist; what is a separate semantic rework |
| Reviewer execution and findings | ReviewRouter managed OCR Action, outcome parser, revision evidence | Exact reusable behavior, PR-only assumptions, partial/unknown states and access boundary |
| Requirements analysis | Kodus and other pinned reference code | Which omissions can be identified, including unchanged code and alternative valid implementations |
| Feedback delivery and rights | Existing Communication and Work application contracts | How a finding reaches the implementer; who authorizes correction or escalation |
| Account usage and privacy | Existing ReviewRouter authorized Account Gateway profile | Whether a granted test connection can run under current rules, without transferring credentials |
| External commit/criteria editing | ReviewRouter PR input/webhook/publication | How same-SHA criteria changes are reflected and stale results disallowed |

Output is a short decision matrix **and the smallest unresolved hypothesis**; no exhaustive second competitor survey. Cite both strengths and defects; an inspected upstream unit test is not proof it passed in our environment.

### Phase 1: source-neutral verification kernel

Implement only after the contract is reviewed. Start with immutable criteria/candidate identities, evidence applicability, criterion result and structured findings; narrow consumer-owned ports. The kernel **must not** import the ReviewRouter Account Gateway, GitHub SDK, OCR managed runner, Temporal, Prisma, arbitrary task/work model or a second implementation of the organization standards.

Use the intended new repository `agent-teams-ai/task-verification` **after the owner creates/adopts it**, with one unstable 0.x library package and a disposable consumer experiment. The owner can bootstrap the repository using Engineering Foundation, exact qualified Stack Toolchain, Bun and TypeScript 7; do not duplicate the compiler/linter/preset stack. Use Feature Module Standard and the official organization `.github` Engineering Quality Standard. Get Modular is for demonstrated composition needs rather than a required second runtime framework.

### Phase 2: real ReviewRouter lab and controlled candidates

Use an **existing disposable ReviewRouter test repository and configured test account**, not live site production workflows. Keep managed OCR, Go patches, credential routing, default PR prompt, publication and data schema unchanged during initial experiments. Use read-only result collection and pinned source/model settings. Do not pass long criteria through the existing 8,000-character OCR background without bounded handling; do not assume OCR's current JSON already emits criteria verdicts.

First measure the **baseline** with the ordinary ReviewRouter review. Then run the proposed criteria-aware evaluation against the **same immutable candidates** and compare. Candidate semantics, models, tools, budget and observable evidence must be recorded so costs and failures are comparable.

Suggested first corpus: a disposable small service and one protected `GET /profile` endpoint with supplied, numbered criteria and objectively checked API behavior. Prepare independent ground-truth snapshots:

| Case | Prepared candidate / event | Expected outcome |
| --- | --- | --- |
| P1 | Correct endpoint, auth checks and contract/tests | No fabricated required rework; explicit evidence-based satisfied results |
| N1 | Missing 401 behavior (test fails) | Find unmet criterion with reproducible failure |
| N2 | Required function entirely absent from changed-file diff | Detect omitted requirement, not merely clean diff |
| P2 | Correct alternative implementation in an unchanged helper | Do not invent a missing feature or insist on one implementation style |
| N3 | Agent reports tests passed but checks were not executed or used wrong SHA | Unknown/reject claimed proof, distinguish from actual negative test |
| N4 | Fix one issue but introduce an auth/regression bug | Newly captured candidate requires applicable checks; detect regression |
| U1 | Reviewer returns partial coverage, invalid JSON, timeout or missing evidence | Inconclusive/unavailable; never all-satisfied |
| F1 | PR criteria edited before/during/after review at same HEAD SHA | Old positive and negative results cannot be presented as current; new canonical criteria version reevaluated |
| F2 | Duplicated webhook, delayed model result or conflicting publication | Idempotency; historical result cannot replace current assessment |
| F5 | Criteria heading removed and later readded, or PR summary edited by ReviewRouter | Removed scope is explicitly withdrawn; readded scope is re-evaluated; bot summary alone triggers no extra model calls |
| F6 | Draft PR with explicit criteria heading while automatic draft review is disabled | Product authorization and explicit opt-in decision are respected; no silent skip, permission bypass or unintended full-review run |
| F3 | Hard rework bound reached; verifier transport retries separately | Stop automatic rework at hard cap; don't mistake infrastructure retry for semantic rework |
| F4 | Task criteria weakened by an implementation agent | PR review remains advisory; Orchestrator plan cannot be silently rewritten by implementer |
| S1 | Prompt injection embedded in PR text or code | No tool/permission/policy escalation; treat all task content as untrusted |

Keep a **held-out set** of correct/incomplete pairs not used to tune the model prompt or examples; false positives may otherwise be hidden by fixture overfitting. Include realistic E2E checks, not only mocked reviewers. Synthetic fault injection is appropriate for execution identity and failure handling, but it does not establish semantic reviewer accuracy.

### Phase 3: one bounded correction cycle (conditional)

Only after a requirements checker demonstrates useful results, exercise one bounded real path:

```text
fixed criteria + Candidate A
  -> observed test/evidence + independent reviewer
  -> criterion-linked findings (not a vague narrative)
  -> authorized correction request to implementer
  -> Candidate B as a new immutable snapshot
  -> fresh or explicitly applicable evidence + re-review
  -> advisory eligibility only (no auto-merge / no terminal Work mutation)
```

Test actual correction benefit: reviewer feedback can be wrong; an agent should be able to provide counterevidence and request reconsideration rather than modify correct code indefinitely. Do not run unlimited loops or rely on an LLM's declared completion promise.

### Metrics and decision gates

Measure on the same fixtures and record denominators, exceptions and confidence limits. Do not treat *unknown* as zero, omit failed runs from the denominator or infer 100% general reliability from a small corpus.

| Metric | Formula/question | Why |
| --- | --- | --- |
| False acceptance | Known incomplete required candidates incorrectly recommended ready / all known-incomplete attempts | Primary safety concern |
| False rejection | Correct candidates incorrectly forced into rework / all known-correct attempts | Avoid model-driven overcorrection and wasted work |
| Missing-criterion recall | Known omitted required criteria detected / all labeled omitted required criteria | Distinct from PR bug-finding recall |
| Evidence coverage | Required criteria with applicable checked evidence / all required criteria | `0 findings` is not proof of coverage |
| Inconclusive rate | Missing, partial, unavailable or ambiguous evaluations / all attempted evaluations | Honest failure classification |
| Rework yield | Correctly resolved findings without new regressions / tested rework attempts | Measures benefit to implementers |
| End-to-end cost | Total provider calls/tokens, latency and repeated work per candidate and successful accepted outcome | Judge economic efficiency, not only one OCR process count |
| Deterministic failure guards | Stale/duplicate/invalid/budget/cancel races that fail safely / all designed negative cases | Must be tested without relying on model accuracy |

**Acceptance before any production proposal:** zero *known* stale/partial/unauthorized acceptances in the defined negative guard suite; honest error classification; no regression in normal ReviewRouter no-criteria E2E and no redundant full code review on PR description-only updates; a separately agreed threshold/target for semantic false acceptance and false rejection on a held-out set; reported provider usage coverage and resource limits. These are **proposed** research/consumer criteria. They do not claim a universal zero-error LLM or establish an already accepted production SLO.

### Reviewer alternatives to compare, not build simultaneously

| Configuration | Why compare | Decision after evidence |
| --- | --- | --- |
| A: ordinary managed OCR code review | Current trusted/known baseline | How many criteria gaps are invisible to diff-only review? |
| B: OCR-supported dedicated criteria verification | Strong first hypothesis, potentially reuse same account/engine | Is the gain in missed requirements worth the extra calls/time? |
| C: combined OCR review + criteria output in one invocation | Potential later token optimization | Only pursue if vendor contract and ordinary review regressions can be qualified |

One invocation may contain multiple model requests. A subscribed account still has limits and may cost money; use the existing authorized test connection and report actual observed token/cost coverage. Do not create an additional full agent runtime just to run a reviewer.

### Owner-friendly delivery milestones

| Deliverable | Evidence required | Stop/next choice |
| --- | --- | --- |
| Audit and read-only mapping | Exact contract refs and owner/gap table | No code if no meaningful gap |
| Kernel contract sketch | Minimal domain types, examples, portability review | Owner agreement before retained implementation |
| Isolated lab | Actual test repository SHA, fixed criteria and runner receipts | Compare against baseline |
| Paired evaluation | Raw correct/incomplete results, costs, limitations, held-out cases | Decide whether OCR alone is sufficient |
| Optional A→B correction | Reproducible corrected output with stale/failure assertions | Propose consumer integration only after review |
| Product adoption | Separate ReviewRouter/Orchestrator PRs, E2E, safety review, rollback and exact release constraints | No automatic publish/merge based on model advice |

Schedule is self-paced; a narrow deliverable boundary does **not** impose a calendar deadline. The contract audit itself should return **a concrete critique with specific improvement suggestions**, not just an architectural overview; owner agreement is required before a retained implementation or an accepted ADR change. The lab can become retained product-quality code, but do not stabilize the SDK until real consumer integration contracts are tested. Local source checks and reading upstream tests never substitute for live E2E.

## Implications and limits

This is a **work specification independent of any named contributor**. Research documents belong here under Docs Protocol; actual library code/implementation plans belong to their respective product/new-repository owner. Discussion and code decisions remain reversible on 0.x only where no published compatibility promise exists. Do not add a second Orchestrator Task engine, generic workflow builder, mandatory multi-reviewer roster, experimental provider account pool, or production feature flags merely to make this study realistic.

### Follow-up questions after the read-only audit

- Does the existing managed OCR expose a trustworthy, machine-readable non-publishing result to an external consumer, or is a narrow export needed?
- Can criteria be evaluated with one existing engine without modifying its default bug review? How to measure extra model calls?
- Which task criteria need actual tool/CI execution versus content inspection, and can the account be provisioned through existing permissions?
- How is PR-body `edited` handled without falsely asserting that a commit-keyed required check can protect every merge-time race?
- What is the smallest reusable runtime API that one real ReviewRouter adapter and a second eventual Orchestrator consumer both need?

## Sources

**Observed 2026-11-10; tests listed above are not executed in this study.**

- [2026-11-09 combined research and counterevidence](evidence-based-feedback-and-rework-2026-11-09.md).
- [ReviewRouter managed OCR result admission][ocr-run], [outcome parser][ocr-outcome], [existing reviewer thread lifecycle][review-lifecycle].
- [Orchestrator accepted ADR-0072][adr-72] and [Temporal boundary][adr-27].
- [Kodus paired requirement evaluation][kodus-evals], [SWE-bench harness][swe-harness], [ReviewBench](https://github.com/review-bench/ReviewBench).
- [Organization Engineering Quality Standard][quality-standard] and [Docs Protocol][docs-protocol].

[ocr-run]: https://github.com/777genius/review-router/blob/7bf73a7f92d42b662bda2647740e0fefaf5015d3/src/review-orchestration/infrastructure/ocr-review-managed-run.ts
[ocr-outcome]: https://github.com/777genius/review-router/blob/7bf73a7f92d42b662bda2647740e0fefaf5015d3/src/review-orchestration/infrastructure/ocr-review-outcome-contract.ts
[review-lifecycle]: https://github.com/777genius/review-router/blob/7bf73a7f92d42b662bda2647740e0fefaf5015d3/docs/review-thread-lifecycle.md
[adr-72]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0072-atomic-work-completion-evaluation.md
[adr-27]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0027-temporal-as-run-orchestration-adapter.md
[kodus-evals]: https://github.com/kodustech/kodus-ai/blob/b759339a7435bd8c6064ff349cd7a65c1c5a033c/evals/business-logic-requirements/README.md
[swe-harness]: https://github.com/SWE-bench/SWE-bench/tree/02e7a74ffd0b707aab73d203fe87bdc7c76afc8e/swebench/harness
[quality-standard]: https://github.com/agent-teams-ai/.github/blob/main/docs/engineering-quality-standard.md
[docs-protocol]: https://github.com/agent-teams-ai/engineering-foundation/blob/e38d8444f74cceef37c366f4e28ed1918b214d4a/docs/reference/open-source-docs-protocol.md
