---
id: research.studies.task-verification-five-options-2026-11-11
type: study
status: active
owner: research/maintainers
summary: Detailed source-backed comparison of five Task Verification strategies, including claim-level evidence, counterexamples, confidence, practical costs, unresolved questions and falsifiable selection criteria.
reviewed_at: 2026-11-11
---

# Task Verification: Five Practical Implementation Options — 2026-11-11

## Scope and status

**Critical audit recorded 2026-11-13:** [Native OCR execution, comparator semantics and corrected experiment design](task-verification-critical-architecture-and-evidence-audit-2026-11-13.md) adds a zero-model comparison, demonstrates criterion-output loss in the tested managed OCR path, and tightens uncertainty/coverage rules. The original scores remain historical judgments; a prompt-only TV-O3 implementation is not qualified by them.

**Follow-up recorded 2026-11-12:** [Architecture, local probes and OCR/Gateway routing](task-verification-architecture-and-routing-follow-up-2026-11-12.md) adds executed model-free evidence, source-pinned integration findings and the latest bounded Stage A/B planning context. This study's original date, method, scores and TV-O1–TV-O5 identities remain the historical 2026-11-11 assessment.

**Observation and expansion date: 2026-11-11. Research only.** This study supports the owner's Task Verification choice and the collaborator's bounded Phase 0 architecture audit. It does not approve a package, integration, provider change, new Task state machine, production rollout, license, or amendment to an accepted ADR. An `active` study is maintained research, not an accepted product decision. The [2026-11-09 combined study](evidence-based-feedback-and-rework-2026-11-09.md) remains a separate historical source audit. The [vision and Phase 0 proposal in draft PR #5][proposal] is unmerged research/product direction.

**Reading routes:** read sections 1–3 for the choice; 4–8 for each alternative; 9–12 for sources, trust and ownership; 13–17 for cost, uncertainties and experiments; 18–20 for critical review, delivery and provenance. The reference catalog identifies exact files and limits rather than asking readers to trust project marketing.

The question is **how to check completeness against explicit acceptance criteria and return useful corrections**, not how to generate a PRD, build an agent platform or implement Work Coordination. We compare five implementation profiles under the same first software-task scenario. They are neither five mutually exclusive frameworks nor an exhaustive ranking of the industry. Several profiles share a core; implementing all five is not recommended.

Hassan's report separates agent claims, system observations, machine verification, reviewer findings and human decisions, and preserves Work Coordination's completion authority. The supplied copy is partial: 57,524 bytes, SHA-256 `e5ca71d6e57bcf34103e0b80f28550553c365b43a357da05ab2019725ff5ddfd`, ending inside section 18. Its provenance is retained in the earlier study. Unknown continuation is not reconstructed. The additional conclusions here are our analysis, not claims attributed to Hassan.

**Method:** source inspection, selected upstream test-source inspection, primary documentation, and examination of an author-reported adversarial reproduction. No upstream test suite, paid-model benchmark, production execution, performance measurement or deployment was run for this study. Critical perspectives below were applied by the **same author**, not independent agents. Requested `6.1sol xhigh` execution/model selection was unavailable; it is not claimed. Documentation CI, when successful, proves only its own catalog/schema checks.

## Evidence and counterevidence

### 1. Executive choice and what would change it

**Preferred hypothesis: Option 1, existing machine evidence plus one dedicated criteria reviewer.** Reuse ReviewRouter execution and existing authorized CI results, validate their applicability, and report each criterion explicitly. Use Option 2 as the simpler semantic-only experiment. Consider Option 3 only when the exact managed OCR output contract can support both jobs without weakening ordinary review. Add executable probes or an additional critic only after a measured failure justifies them.

This is a recommendation about **fit to the current products**, not demonstrated superiority in model accuracy. The strongest counterargument is that a simpler Option 2 may perform just as well when CI evidence is sparse, untrustworthy or expensive to map. Another is that the existing managed OCR may already do enough with a narrow supported input/output extension. Both deserve a fair comparison.

| Condition found in Phase 0 or evaluation | Consequence for the recommendation |
| --- | --- |
| Existing CI yields trustworthy, version-bound behavioral facts at low integration cost | Option 1 becomes more attractive; do not rebuild a runner |
| Few criteria have meaningful machine checks; most evidence is model interpretation | Start with Option 2 rather than pretending a green CI badge creates confidence |
| Combined OCR mode gives equivalent coverage/quality at lower cost, with ordinary-review parity | Option 3 can become the preferred implementation; do not retain two calls for architectural aesthetics |
| The expensive semantic reviewer adds no useful detection beyond existing checks | Remove that stage for those criterion types |
| Most false findings result from missing unchanged-file context | Add bounded repository investigation before adding another whole reviewer |
| High-impact findings remain disputed but admit a concrete behavioral counterexample | Evaluate Option 4 selectively |
| Independent critic materially reduces errors on held-out tasks and justifies cost | Evaluate Option 5 selectively, with explicit abstention and stop rules |
| None of the candidates meets the agreed error/cost tolerance | Keep the result advisory/inconclusive; do not automate acceptance or force a winner |

### 2. Shared scope and terminology

All profiles receive an immutable candidate, a complete versioned criterion set, a bounded inspection scope and a consumer-owned policy. The first proposed consumer is an advisory ReviewRouter check triggered automatically by `## ReviewRouter: Acceptance Criteria` in the authored PR body. Markdown and GitHub are input adapters. No additional Dashboard toggle or external Markdown-file source is assumed in the initial scope.

The reusable core **does not execute shell commands, own credentials, edit code, merge PRs, or complete Work**. Existing authorized CI or an isolated runner executes tests. ReviewRouter supplies the reviewer/model execution route, including an eligible subscription-backed connection where qualified. A subscription is neither free nor unlimited compute. Future gateway selection is not a prerequisite or a decision made by this study.

Three different questions must remain separate:

| Question | What answers it | What does not answer it |
| --- | --- | --- |
| Authenticity and freshness | Admitted producer, observed execution, exact artifact/check identity, current applicability | A hash of a fabricated report; an agent's confident claim |
| Sufficiency | A criterion-specific argument using adequate checks, source inspection and/or authorized judgment | A genuine but irrelevant passing test; a valid line citation alone |
| Authority | The product's completion policy and authorized final transition | A reviewer recommendation, CI status or runtime terminal message |

The same failure envelope applies to all options: omitted requirements outside the diff, implementation in unchanged helpers, plausible but misleading evidence, same-HEAD criteria edits, incomplete reviewer output, duplicates, delayed results, and a correction that causes a regression. The **original expected criterion inventory** defines coverage, not whichever subset the model returns.

`Satisfied`, `violated` and `inconclusive` describe criterion assessments. `Partial`, `unavailable`, `stale`, `cancelled` or `invalid` can describe execution/applicability. Do not flatten these dimensions into one boolean. A criterion may have a demonstrated violation even when another criterion is unverified; the combined report should preserve both facts without claiming complete verification.

### 3. Comparable ratings and their limits

Rubric **TV-options-v1** is retained from this study's initial publication. The expanded explanations do not manufacture new measured accuracy or silently rescore the alternatives.

- **Reliability /10:** expected structural defensibility of the described profile for the shared scenario, conditional on correct implementation. It includes evidence semantics, coverage, uncertainty and complexity-induced risks. It is not observed availability, model accuracy or a probability of success.
- **Confidence /10:** confidence in the scoped architectural recommendation based on inspected evidence. It is not an LLM's self-reported confidence. Roughly one-point granularity is appropriate.
- **Complexity /10:** implementation, integration, negative-test and maintenance burden; higher is harder.
- **LOC:** new handwritten runtime/integration code and executable tests/fixtures. Not a quota, delivery promise or count of the whole upstream project. Excludes generated artifacts, lockfiles, blank lines and vendor code.

| ID / profile | Reliability | Confidence | Complexity | Runtime/integration LOC | Tests/fixtures LOC | Total LOC |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| TV-O1. Existing machine evidence + dedicated criteria reviewer | 8 | 8 | 6 | 2,300–3,900 | 2,400–4,000 | 4,700–7,900 |
| TV-O2. Dedicated criterion-by-criterion repository reviewer | 7 | 8 | 5 | 1,700–2,900 | 1,600–3,000 | 3,300–5,900 |
| TV-O3. One combined review invocation with criteria output | 5 | 6 | 4 | about 1,400–2,400 | 1,400–2,500 | about 2,800–4,900 |
| TV-O4. Hybrid plus executable counterexample/reproduction probes | 8 | 6 | 9 | 4,500–7,700 | 4,900–8,000 | 9,400–15,700 |
| TV-O5. Hybrid plus independent critic/adjudication | 7 | 6 | 8 | 3,900–6,500 | 4,100–6,700 | 8,000–13,200 |

Profiles are ordered by present fit, not reliability alone. O4 may give the strongest evidence for a particular API behavior while remaining the least practical first delivery. O5 does not earn a higher score merely by calling more models. Actual semantic accuracy is **unknown for all five**.

| Profile | Why the confidence is not lower | Why it is not 9–10 / what remains uncertain |
| --- | --- | --- |
| O1 | Existing execution/evidence mechanisms and a clear owner boundary support the construction | Criterion-to-check sufficiency and real export interface are not qualified; additional structure may not improve model judgments |
| O2 | Kodus provides concrete code, bounds and rejecting test cases for the core semantic question | Citation validation is not proof of behavior; repository retrieval and model omission rates remain unmeasured |
| O3 | Least new orchestration if both output collections already work | That prerequisite is unproven for the managed binary; code-review/criteria attention interference may erase savings |
| O4 | Differential tests and reproduction are implemented in real research tools | Gold-reference dependence, probe validity and sandbox maintenance are large live-product gaps |
| O5 | Concrete quorum/abstention code exists; disagreement can be exposed | Error independence and useful diversity are unproven; false rework and cost can increase |

A useful distinction is **confidence in an observed line of code** versus **confidence in product benefit**. The former can be high while the latter remains medium. Scores cannot substitute for source reading, held-out evaluation, operational qualification or a second human review.

### 4. TV-O1 — Evidence-first hybrid

**Flow:** snapshot candidate and criteria → validate existing evidence → apply mandatory machine-check policy → ask one bounded reviewer about semantic gaps → check complete per-criterion coverage and contradictions → return advisory findings.

The policy does not let an LLM override a failed applicable mandatory integration test. An environment failure is inconclusive, not automatic code rework. A passing test only supports the behavior it actually exercised. A semantic reviewer can reveal an untested counterexample even when selected tests passed.

**Reuse:** existing ReviewRouter runner/normalization, authorized CI run retrieval, immutable source identities, typed errors and current publication mechanisms where their contracts fit. **New work:** criterion normalization, evidence-to-criterion mapping, strict complete-result validation, applicability decisions and an advisory report. No new database, scheduler or CI service is inherently required.

**Source support:** managed result admission and its tests [S01–S03], requirement investigation in Kodus [S04–S07], gate separation in Gerrit [S16], and the existing Orchestrator completion authority [S17]. These support separate pieces; no donor provides the entire proposed integration out of the box.

**Advantages:** uses objective facts where available; understandable criterion report; missing evidence and actual violations have different consequences; relatively small reusable kernel; fits existing Work authority; can later consume non-code artifacts.

**Weaknesses:** a criterion-to-check mapping can be wrong; a green build is weak evidence of feature completeness; agent-written tests can mirror the implementation bug; coverage may remain incomplete. The mapping requires real product policy, not a generic average score. Reading an authenticated CI report is insufficient when the candidate can change the test definition or manipulate collection.

**Concrete failure to test:** AC-2 requires denying access to another user's profile, but the imported test only checks that a user can read their own profile. Both CI and reviewer say “pass.” The evidence is authentic but insufficient. The fixture must expect this criterion to remain unproven or identify the missing negative case, rather than count test existence as coverage.

**Cheap-first is not positive-wins:** Inspect's cascade stops at the first sufficiently positive scalar result [S08]. A negative approximate text match may legitimately fall through to a semantic grader. A real failed mandatory authorization test must not be treated like that approximate scorer. Evidence kind and authority determine whether a result is decisive; no numeric average can erase a failed gate.

**Practical first slice:** import one existing check family with a verifiable producer and structured results; one semantic reviewer assesses the remaining criteria. Do not auto-discover every CI job or infer a universal acceptance plan. Select a single small code task and report explicit limitations.

**Falsification:** if O2 achieves equivalent false-acceptance/false-rework outcomes on the same tasks at materially lower integration cost, O1's extra machinery is not justified for that initial task population. If CI provenance cannot be established without a new infrastructure project, postpone that adapter rather than lower trust.

### 5. TV-O2 — Dedicated requirements reviewer with targeted investigation

**Flow:** give a read-only reviewer the complete numbered criteria and pinned candidate → require one assessment per criterion → retrieve relevant repository context beyond the diff → attach observed citations → preserve uncertainty or investigate a bounded disputed question.

Kodus's `createGapCheck` [S04] provides a concrete second-look mechanism. It targets `missing`, `partial` and `check_manually` verdicts; bounds steps to ten, listed paths to sixty, read windows to four hundred lines, and output tokens to eight hundred. These are inspected implementation choices, **not proposed defaults**. Its scripted tests reject unread files, unseen ranges, blank lines and missing explanations [S06].

**Advantages:** directly addresses entirely absent functionality; recognizes behavior in unchanged helpers; does not require new execution infrastructure; produces criterion-linked feedback; easier initial experiment when trusted machine evidence is unavailable.

**Weaknesses:** valid citations establish what was read, not what the program does; static inspection cannot establish every runtime property. Search is incomplete and may be expensive. A reviewer can confuse a similar function with the required behavior or reject a correct alternative implementation.

**Critical donor findings:**

1. `listFiles(...).catch(() => [])` collapses retrieval errors into an empty search result; `readFile(...).catch(() => undefined)` collapses failures into absence [S04]. This is a specific unsafe inference risk for a strict verifier, not proof of a deployed incident. Preserve unavailable/forbidden/unreadable separately from a successful search with no match.
2. Kodus's `taskPasses` permits `PARTIAL`, `CHECK MANUALLY`, accepted findings and `part_of` work under its advisory PR semantics [S05]. That may be appropriate for its product. It is not sufficient for mandatory whole-task acceptance.
3. The `RepositoryReader` method signature does not itself carry the revision. A reader may safely capture it internally, but the adapter must prove that binding; the comment “PR head” alone is not the guarantee [S04].
4. The inspected second-look transitions mainly repair negative/uncertain verdicts. Rechecking only negatives cannot detect a confidently wrong positive verdict. Selected high-risk positives need an independent sampling/risk rule if this profile is extended.

**Evaluation lesson:** Kodus documents 29 paired cases of correct/incomplete implementations [S07]. This is a useful starting corpus design, not evidence of production-wide accuracy. Preserve correct alternatives and unchanged-helper cases; do not tune exclusively on omissions.

**Concrete failure to test:** the retrieval API times out while looking for authorization middleware. The report must not say “middleware does not exist; implement it.” It should identify missing inspection evidence and its cause. Another fixture should place the correct implementation in an unchanged helper and reject a demand to duplicate it.

**Falsification:** if most positive conclusions require runtime facts that this profile cannot obtain, it should remain advisory or become O1. If targeted investigation adds latency without changing wrong decisions, remove it for that class of task.

### 6. TV-O3 — One combined code-review and criteria invocation

**Flow:** one approved reviewer invocation receives candidate, code-review scope and a full criteria snapshot, then returns **separate** code findings and criterion assessments. The consuming adapter validates the exact criterion inventory. One process may still make multiple model requests.

**Advantages:** potentially avoids repeated repository context, provider setup and retrieval; could be the simplest practical implementation; reuses existing authorization and execution. If equivalent quality is demonstrated, choose this over ceremonial separation into two model calls.

**Weaknesses:** ordinary defect review and completeness review can compete for context and attention. Diff-oriented search can miss a required feature that never appears in the diff. Changing one shared prompt complicates regression attribution. A clean comment collection is not a criterion report. Both savings and accuracy are unmeasured.

**Specific current constraint:** the managed adapter [S01] builds rules around issues introduced or aggravated by changed paths. It also limits ordinary background to 8,000 characters and truncates oversized text. Adding criteria as ordinary background can drop an entire required item. The complete criterion inventory must remain authoritative outside model context; oversized input must reject, split under an explicit coverage plan or remain partial, never silently pass.

The helper's intended rules also are not proof of what the exact managed native binary receives. Verify the materialized rules, managed binary version, invocation envelope and parsed output. The schema must support the extra collection; current upstream documentation or a provider's structured-output feature does not prove this managed path does so.

**Nonregression requirement:** a PR without the dedicated section must retain its ordinary code review, permissions, selected model and publication behavior. A change to the description's criteria must not force a full ordinary review when its evidence remains applicable. A bot-generated summary edit must not recursively spend tokens.

**Concrete failure to test:** append a required criterion beyond the current background limit. A naive implementation returns all visible criteria as passed. The acceptance test should compare returned IDs with the independent full input set and reject the incomplete report.

**Falsification:** if this requires invasive Go patch/schema/credential-bridge changes, its low-cost estimate is invalid. Prefer a dedicated experimental invocation/adapter rather than weakening managed outcome admission. Conversely, if a qualified extension already exists and paired evaluation is equivalent, O3 can replace O1/O2's separate call topology.

### 7. TV-O4 — Executable witnesses and counterexample-driven probes

**Flow:** O1 identifies a disputed/high-impact criterion → propose one bounded behavior probe → an authorized external runner executes it on fixed snapshots → validate the expected behavior and failure reason → add scoped evidence → recheck after correction.

The core never executes arbitrary commands. Model-generated tests are untrusted artifacts. The consumer authorizes their execution and owns sandboxing, dependencies, secrets, timeouts and cleanup. A proposed test cannot redefine the acceptance criteria to make itself correct.

**Source support:** SWT-Bench compares pre/post outcomes and checks that a generated test exposes behavior without introducing unrelated failures [S12]. Agentless combines reproduction and regression results while selecting a patch [S11]. Both have practical code, but they solve narrower research problems than general product acceptance.

**Important counterevidence:** Agentless marks candidates with the minimum observed regression count as preferred even if the minimum is nonzero. If no candidate passes reproduction, selection can fall back to regression-only candidates [S11]. That is defensible best-effort search for a submission, not proof a task is complete. Our verifier needs an honest unresolved/failed disposition rather than “best available therefore accepted.”

SWT-Bench has a known reference fix available in its benchmark setting. A new real task often has none. Passing on an implementer's new patch and failing on old code does not independently validate an invented expected behavior. A two-model loop can agree on the same incorrect test oracle.

**Advantages:** concrete reproducible counterexamples make feedback actionable; can disprove false reviewer objections; validated probes can become regression tests; strongest on access control, deterministic calculations, API contracts and state changes.

**Weaknesses:** probe validity, sandbox upkeep, dependency setup, flakes and clean-state repetition add substantial work. UI suitability and architecture requirements may not admit a decisive small test. Setup errors must not be mislabeled as implementation violations. Probe-generated assertions can overfit the visible patch.

**Concrete failure to test:** a probe reports an access-control failure, but the server never started because a dependency was unavailable. The correct outcome is an invalid/unavailable probe, not a demand to rewrite authorization. A second fixture uses a correct implementation with a different internal function name; a probe that merely searches for the expected name must be rejected as an inadequate oracle.

**Falsification:** if semantic false findings are rarely reproducible or external execution dominates cost, the profile should remain a selective human-assisted investigation rather than a universal step. No new runner service belongs in the current estimate.

### 8. TV-O5 — Independent critic, panel or adjudication

**Flow:** O1 creates a structured assessment → a separate evaluation context assesses the same candidate and criteria → compare disagreements → bounded reconciliation or explicit uncertainty/human escalation. An initial blind assessment can reduce anchoring; it does not establish statistical independence.

**Source support:** Inspect tests malformed/missing grader output and denominator/tie behavior [S09–S10]. ReviewRouter's finding lifecycle [S18] deduplicates reviewer identities and retains unresolved findings when evidence is insufficient. Its finding-resolution quorum is not automatically a whole-task completion policy.

**Advantages:** exposes disagreement; can catch unsupported reasoning; allows specialized scrutiny of a high-impact criterion; may reuse existing review execution instead of another platform.

**Weaknesses:** different accounts can use the same model/context and share the same errors. A critic shown only the first verdict may never notice an omitted criterion. Confidence-triggered escalation misses confident errors. More reviews can increase both useful detections and false rework. A conversational final arbiter may invent certainty.

**Mechanical rule:** do not remove a missing or unparseable required reviewer from the denominator and silently lower the quorum. Do not let model votes override an applicable mandatory failing test. Keep individual assessments and abstentions; record why a finding is accepted, contested or still unknown.

**Concrete failure to test:** a configured three-member panel returns `satisfied`, `violated`, and invalid output. Reordering the two valid responses must not decide the result. Another fixture gives every reviewer the same wrong requirement interpretation; agreement must not be presented as independently proven truth.

**Falsification:** if the panel does not reduce held-out errors at a useful cost, do not deploy it. Prefer a targeted additional question for a proven failure class. Retain a hard stop even if no human reviewer is available; no debate-until-agreement loop.

### 9. Source-level facts, limitations and confidence ledger

The claim IDs below are local research anchors, not accepted product requirements or defect tickets. **High confidence in a source observation does not mean high confidence in the resulting AI accuracy.** Every claim names its consequence and its strongest limitation.

| Claim | Observed fact and source | Evidence / confidence | Implication and limit |
| --- | --- | --- | --- |
| TV5-C01 | Managed ReviewRouter rejects failed process, unknown effect, missing actual-model attribution and contradictory coverage [S02] | Source inspected; high for these guards | Reuse admission mechanics. It verifies a reviewer execution, not every criterion |
| TV5-C02 | OCR background has an 8,000-character limit; its policy is diff-oriented [S01] | Source inspected; high | Never silently truncate requirements. Actual criterion-mode support remains unknown |
| TV5-C03 | Kodus validates citations against lines actually shown by tools [S04, S06] | Source and scripted tests inspected; high | Protects provenance. Scripted model moves are not semantic-accuracy evidence |
| TV5-C04 | Kodus turns some retrieval exceptions into empty/absent results [S04] | Source inspected; high for implementation, unknown incident frequency | Distinguish retrieval failure from absence. No claim of an observed production incident |
| TV5-C05 | Kodus allows partial/manual or part-of results without necessarily failing a PR [S05] | Source inspected; high | Deliberate advisory policy; inappropriate as our default mandatory completion rule |
| TV5-C06 | Inspect cascade continues after a nonsettling negative and stops at a sufficiently positive scalar result [S08] | Source inspected; high | Useful cheap-first idea, wrong direct policy for a mandatory failed test |
| TV5-C07 | Inspect panel tests cover failure-induced denominator/tie changes [S09–S10] | Test source inspected; high for intended behavior | Preserve abstention semantics. Tests were not executed here |
| TV5-C08 | Agentless may select best available regression candidates after reproduction fails [S11] | Source reread in this expansion; high | Patch ranking and acceptance are different decisions |
| TV5-C09 | SWT-Bench compares pre/post test outcomes against benchmark reference conditions [S12] | Selected source reread; high for flow, medium for transferability | Differential probing is useful; live tasks may lack a gold oracle |
| TV5-C10 | SWE-bench checks nonzero suite evidence and parses test exit code from a textual marker [S13] | Source reread; high | Protects some false-success cases but the output channel must be trusted |
| TV5-C11 | SWE-bench issue #667 reports spoofed earlier markers defeating expected grading [S14] | Reporter reproduction plus source concern; not independently reproduced | Require a trusted execution observer; do not generalize to every benchmark version |
| TV5-C12 | SWE-bench's benchmark policy admits XFAIL and treats skipped maintenance differently from repair [S13] | Source inspected; high | Copy no pass policy without matching product semantics |
| TV5-C13 | Gerrit separates submit requirements from review labels and supports testing policy [S16] | Primary documentation inspected; high | Good authority model; not semantic proof or a drop-in Task verifier |
| TV5-C14 | ADR-0072 places final Work authority and atomic candidate checks in Work Coordination [S17] | Accepted source contract; high | New kernel emits facts/advice. Accepted architecture is not completed implementation |
| TV5-C15 | Anthropic recommends calibrated combinations of code/model/human grading and warns about flawed graders [S20] | Primary engineering guidance; medium for transfer | Supports method, not the measured superiority of our combination |
| TV5-C16 | Promptfoo documents deterministic and model-based assertions [S21–S22] | Primary docs inspected; medium until integration test | Possible eval-only reuse. No runtime adoption or compatibility qualification |
| TV5-C17 | A patch-correctness study reports plausible passing patches with behavioral differences and confirmed errors [S23] | Researcher-reported empirical study; not reproduced | Tests are incomplete evidence. Behavioral difference from a gold patch is not automatically wrong |

**Production-readiness boundary:** current source, inspected tests, passing CI, published artifact, observed use on a real PR, deployed production behavior and reliability on our workload are different evidence levels. None implies all later levels. This study does not award a donor project's popularity, star count or marketing claim a higher technical score. Whole-product deployment claims from earlier research are not silently requalified here.

### 10. A result is not a proof: the evidence trust boundary

There are three distinct evidence layers:

1. **Untrusted claims/content:** agent narrative, source text, test stdout and model-written JSON. These can be useful inspection material, but are not execution authority.
2. **Observed facts through admitted adapters:** actual process completion, selected check definition, candidate identity, runner identity and captured artifacts. Their validity depends on the producer boundary and tamper resistance.
3. **Interpretation:** a test or reviewer result is mapped to a criterion under the current policy. This is where sufficiency and contradictions must be assessed.

A hash protects identity only when compared against an independently trusted identity. Signing an implementer's invented result does not make it correct. Likewise, a real runner's exit zero is insufficient if the implementer replaced the tests with a script that prints success. Do not solve every local test with a new signature infrastructure; use the existing authorized CI/account boundaries, and add cryptographic attestation only for a demonstrated cross-trust need.

A useful **conceptual evidence envelope**, not an approved schema, includes:

| Field/responsibility | Reason | Important qualification |
| --- | --- | --- |
| Candidate content/tree identity | Prevent old or foreign implementation evidence being reused silently | Git PR head, synthetic merge commit and dirty workspace are not interchangeable |
| Check definition/version and invocation | Know what was actually requested | Merely naming `npm test` does not identify its mutable script/assertions |
| Runner/producer authorization and run reference | Know who observed execution and under what admitted scope | Metadata supplied solely by the model is not a trusted producer |
| Environment/configuration/tool versions | Identify changes material to behavior | Capture relevant details, not every incidental environment variable or secrets |
| Actual outcome and case inventory | Distinguish no tests, skipped cases, failed checks and infrastructure failure | Exit code belongs to trusted process observation; stdout can be forged |
| Artifact references/digests and access status | Make the supporting result retrievable and tied to the run | An inaccessible artifact cannot silently remain sufficient evidence |
| Criterion mapping and policy/criteria revision | Explain why this fact supports this criterion now | Raw test evidence may predate a new criteria revision; a new assessment must establish applicability |
| Completeness, diagnostics and reviewer identity | Preserve limits and enable audit/debugging | A successful model request need not mean the criterion was assessed correctly |

The **core's missing-evidence response is a description, not permission to execute**. It may return “criterion AC-2 lacks an applicable access-control check.” A consumer can decide whether to request an existing runner, investigate manually or stop. Arbitrary commands embedded in requirements must not become executable instructions.

### 11. Concrete failure and recovery matrix

These are proposed test cases, not executed results. They apply to every profile where the stated capability exists.

| Case | Setup | Required observation/result | Why a naive design fails |
| --- | --- | --- | --- |
| TV5-F01 | Entire required endpoint absent from diff | Explicit unmet/inconclusive criterion with grounded reason | Ordinary code review sees no faulty implementation to comment on |
| TV5-F02 | Correct functionality lives in an unchanged helper | Do not demand duplicate implementation | Diff-only scope is mistaken for repository-wide absence |
| TV5-F03 | Candidate prints `tests passed`; runner did not execute suite | Reject claim as execution proof | Prose is mistaken for an observation |
| TV5-F04 | Suite reports zero tests or only skipped required cases | Visible missing coverage, not success | Empty collections pass vacuous all-match checks |
| TV5-F05 | Same HEAD, criteria changed during/after review | Old assessment historical; current criteria reconciled | Commit-bound success is treated as task-current |
| TV5-F06 | Reviewer returns duplicate IDs and omits another ID | Invalid/incomplete assessment | Count of rows is mistaken for full set coverage |
| TV5-F07 | Retrieval fails while looking for implementation | `unavailable`/`inconclusive`, not “missing feature” | Exceptions collapse into not-found |
| TV5-F08 | Fix to B breaks previously passed A | New candidate requires current applicable evidence for A and B | Earlier positive check survives changed implementation without justification |
| TV5-F09 | CI ran synthetic merge tree, reviewer inspected raw head | Keep identities and compatibility explicit | Both are casually labeled “this PR” |
| TV5-F10 | Candidate weakens its own tests/expected outcomes | Trusted check definition remains separate or change is explicitly reviewed | Implementer controls both answer and oracle |
| TV5-F11 | Two different attempts publish out of order | New current projection cannot be overwritten by stale attempt | Arrival order becomes authority |
| TV5-F12 | Same event/result delivered twice | One semantic assessment/rework request, deduplicated effects | Retries spend twice or start duplicate correction loops |
| TV5-F13 | Reviewer unavailable, invalid JSON or cancelled mid-run | Honest execution failure; no success and no invented implementation defect | Missing result becomes empty findings |
| TV5-F14 | Required panel member does not answer | Preserve configured membership/abstention rules | Smaller denominator manufactures consensus |
| TV5-F15 | Prompt injection in task/code/log asks to disable a gate | No authority or tool-policy escalation | Natural-language evidence becomes trusted instructions |
| TV5-F16 | Author removes/readds criteria, bot rewrites its summary | Withdraw stale optional result; re-evaluate relevant criteria only; no loop on bot text | No-heading and old success coexist; bot triggers itself |
| TV5-F17 | Agent offers valid counterevidence to an incorrect finding | Explicit contested/overturned result with reasons | System forces needless changes until reviewer agrees |
| TV5-F18 | Correction or infrastructure retry budget exhausted | Defined stop/unknown/escalation; not success | Unlimited loop or retry count mistaken for completion |
| TV5-F19 | Evidence artifact expired, was revoked or belongs to another scope | Access/applicability failure remains visible | Historical link or digest is treated as current authorization |
| TV5-F20 | Acceptance criterion is ambiguous or contradictory | Request clarification/record conflict | Verifier silently invents an easier private specification |

Human override is an authorized consumer decision, not a fabricated positive test. Likewise, “not applicable” requires explicit policy, not a convenient model default. Future Work Coordination invariants remain owned by ADR-0072; this table is not a new terminal-state model.

### 12. Fit to the existing architecture and safe reuse

| Component | Existing or proposed responsibility | Do not move into it |
| --- | --- | --- |
| ReviewRouter/OCR | Actual review execution, selected accounts/models, source analysis, normalized findings and publication | Global task completion or a shared Orchestrator Task aggregate |
| Existing CI/isolated runner | Authorized test execution, sandboxing, real process facts and artifacts | New task acceptance authority just because the job succeeded |
| Proposed Task Verification library | Criteria/candidate/evidence interpretation, complete assessment contract and actionable advisory findings | Shell execution, credentials, provider lifecycle, universal workflow DSL or its own durable Task state |
| Work Coordination | Versioned completion plan, applicable typed facts and terminal transaction | Raw provider protocol or arbitrary LLM instructions as business rules |
| Temporal/process adapter | Scheduling, durable delivery, retries and reconciliation under owner-defined policy | Deciding business completion from workflow status alone |
| Evaluation harness | Frozen datasets, comparable runs, metric aggregation and failure inspection | Production Task authority or a stable public SDK commitment |

ReviewRouter is a useful first **real consumer**, not a justification for making the library PR-shaped. `Candidate` can reference code or another immutable artifact; only the first adapters need Git-specific behavior. A generic engine with many abstract node types, storage backends and plugin managers would be premature.

Retained code should follow the organization's Clean Architecture, SOLID, DDD and DRY practices. Existing Foundation/Stack Toolchain own development policy and tooling versions; Get Modular belongs at real composition boundaries. These tools do not require inventing empty domain layers or a dynamic Host for one function. A separate repository remains subject to the Phase 0 critique; the owner is also open to a smaller isolated prototype with an explicit later migration risk.

**Practical deployment restriction:** preserve the working ReviewRouter site and ordinary OCR contract during initial experiments. No product code, account settings, migrations or permissions are changed by this research. Isolated test PRs and a bounded approved connection are enough to investigate the first question. If the required structured result export does not exist, audit a small adapter; do not scrape bot prose as a durable API.

### 13. Cost model, LOC assumptions and hidden work

The canonical table counts the **same first useful isolated integration**, not merely a pure function and not a new enterprise platform. Baseline is counted once per alternative:

| Shared work | Runtime/integration LOC | Tests/fixtures LOC | Scope assumption |
| --- | ---: | ---: | --- |
| Input/candidate identity, result validation, coverage and evidence references | 400–700 | 400–700 | Existing schema libraries, no own parser engine |
| PR criteria extraction, freshness/deduplication and advisory publication adapter | 400–700 | 350–650 | Reuse existing product auth and event plumbing |
| Narrow ports, approved execution/result mapping, package composition | 300–500 | 250–450 | No new database, model transport or account pool |
| **Shared subtotal** | **1,100–1,900** | **1,000–1,800** | No independent service |

| Addition beyond shared subtotal | Runtime LOC | Tests/fixtures LOC |
| --- | ---: | ---: |
| O3 combined reviewer profile/normalization | 250–500 | 400–700 |
| O2 criterion assessment and bounded read-only investigation | 600–1,000 | 600–1,200 |
| O1 CI evidence mapping plus criteria-review policy | 1,200–2,000 | 1,400–2,200 |
| O4 additional to complete O1: probe proposal/validation/result handling | 2,200–3,800 | 2,500–4,000 |
| O5 additional to complete O1: critic/reconciliation/quorum/exhaustion | 1,600–2,600 | 1,700–2,700 |

O3's exact arithmetic is approximately 1,350–2,400 runtime and 2,750–4,900 total; the main table rounds these to about 1,400 and 2,800. O4 and O5 **include O1**. Totals are alternatives, not quantities to sum. These ranges have roughly 40–50% planning uncertainty, not a statistical confidence interval. Lines can fall if suitable contracts already exist or rise if safe extraction is larger than expected.

**Contingencies:** if ReviewRouter lacks a safe machine-readable result boundary, allow approximately 1,000–3,000 additional runtime LOC plus applicable tests for a separately reviewed export/integration change; this is a broad allowance, not a claim that an endpoint is missing. A new sandbox/runner service, Go output-protocol redesign or production Orchestrator integration falls outside the estimates and can change the ranking entirely.

**Work not represented well by LOC:** independently labeling examples, reviewing ambiguous requirements, maintaining trustworthy check definitions, native/container qualification, CI setup, observability, security review, licensing analysis before copying code, and later support. Existing machine evidence can be cheap to reuse but expensive to make sufficient. Automatic generation of a universal acceptance suite is not included. Phase 0 requires **zero production LOC**.

For actual resource comparison, record model requests and input/output/cache tokens, runner attempts, retrieval volume, wall time, known monetary cost, unknown-cost coverage, failed attempts and downstream correction work. One OCR process is not one inference call. Subscription limits can cause waiting even when marginal billing is low.

An **illustrative planning equation**, not a measurement: selective extra review costs approximately `C_base + p * C_extra`, where `p` is the escalation fraction. A permanent extra reviewer approaches `C_base + C_extra`. The relevant benefit is avoided false acceptance and avoided wrong rework, not extra findings alone. No numerical `p`, savings factor or break-even claim has been measured here.

### 14. Unknowns, confidence and the smallest resolving action

| Unknown | Current confidence | Why unresolved | Least useful next evidence / decision it could change |
| --- | --- | --- | --- |
| Safe external structured-result interface from ReviewRouter | Medium/unknown availability | Internal typed results are not automatically a public authorized API | Read-only port/export audit; can alter every integration estimate |
| Native criterion-output support in the exact managed OCR build | Low until checked | File findings and free-text background are not criterion verdicts | Inspect schema/materialized invocation and one disposable fixture; determines O3 feasibility |
| Adequate CI-to-criterion mapping for representative tasks | Medium architectural, unmeasured semantic | Passing tests may not cover the requested behavior | Two independent labels plus small check-evidence inventory; determines O1 benefit |
| False acceptance/false rework rates | Unknown | No live model comparison | Fixed held-out correct/incomplete cases at comparable budgets |
| Correct unchanged-helper recognition | Unknown model performance | Code exists for investigation but scripted tests do not show reasoning success | Paired case with functionality outside diff and a similar wrong helper |
| Benefit of extra critic versus same-reviewer targeted retrieval | Unknown | Error diversity and anchoring depend on model/context | Matched-cost targeted ablation; can reject O5 |
| Validity of generated probes without gold fix | Low-to-medium by requirement type | Test and patch can share one mistake | Independently specified behavior, known-positive/negative controls; decides selective O4 scope |
| Direct reuse or extraction of current ReviewRouter components | Medium | Some internal packages have PR/persistence coupling | Dependency/owner map, no production copying during audit |
| Runtime and toolchain compatibility of an eval framework | Unknown until qualification | Documentation support does not prove approved TS/Bun/Node tuple | Small consumer setup after owner approval; can favor existing scripts |
| Reuse of old evidence after criteria edits | High principle, open precise policy | Assessment invalidation differs from rerunning raw checks | Explicit applicability examples and consumer-owned contract review |
| Production-readiness of the combined mechanism | Unknown | Source review is not rollout evidence | Later integration, adversarial and operational E2E, not required in Phase 0 |

Do not convert an unknown cell to zero or to a competitor weakness. Do not eliminate a legitimate alternative because its source search returned no results. The present shortlist is deliberately scoped; it is not a claim that all relevant industry systems were exhaustively reviewed.

### 15. Existing tools versus creating another evaluation framework

A reusable production verification contract and an **evaluation harness for comparing it** are different concerns. The first may justify a small owned package; the second often can reuse existing scripts or tools.

Promptfoo documents deterministic assertions and model-graded rubrics [S21–S22]. It is a candidate for running comparable inputs/outputs and custom assertions, not automatically a dependency of the verification core. Its current support for a feature is documentation evidence only until the selected package/runtime and adapter are tested. Inspect is another reference for scoring semantics and panels; adopting Python infrastructure is optional, not required to learn those rules.

Before adopting any harness, compare: can it accept captured ReviewRouter results without replacing provider auth; keep hidden labels away from the reviewer; preserve failed/unknown runs and actual usage; pin dataset/prompt/model versions; and run under the existing tooling? If a few repository-owned scripts suffice, do not add a platform. Conversely, do not build reports, dashboards or generic experiment storage that a qualified tool already supplies.

Formal methods, static analyzers and property-based tests can strengthen precisely modeled invariants, but no single one is assumed to prove arbitrary natural-language product completeness. Human review is a legitimate typed escalation in any profile, but also needs scope, candidate binding and clear authority. Neither is a replacement for deciding what a criterion actually means.

### 16. Evaluation design before retained implementation

**Proposed, not executed.** Phase 0 may recommend this protocol or a smaller alternative. It does not authorize running models, building the library or modifying production.

1. Freeze the question and scope: “Does requirements-aware verification reduce known omissions and wrong rework relative to unchanged code review?” Separate this from code-defect precision and runtime recovery.
2. Prepare independently labeled cases. Include correct implementations, omissions, defects, misleading evidence, valid alternatives and insufficient-evidence cases. Two reviewers should resolve ambiguous labels or keep them explicitly ambiguous; do not let the tested model set its own gold label.
3. Start economically: six small tasks with several variants can reveal gross problems, but cannot establish production error rates. Keep the holdout split by task/repository family, not nearly identical patches across train and test. Preserve the full original required-criterion set.
4. Freeze source snapshots, criteria, check versions, available tools, model routes, prompts, limits and expected output schemas. Record the exact tested tree; distinguish raw PR head from merged test candidate. Do not leak gold fixes or previous trial history through the workspace.
5. Compare unchanged ReviewRouter, dedicated criteria review (O2), and evidence-first review (O1). Add combined O3 only if actually supported. Same-information comparisons isolate mechanism value; same-cost comparisons isolate practical value. These are different experiments and both should be labeled.
6. Keep all attempted runs. Separate implementation violations, model mistakes, invalid output, unavailable evidence and infrastructure failures. Repeat stochastic cases when affordable; report every trial, not the most favorable response. Preserve cancellation, budget exhaustion and retry costs.
7. Inspect disagreements, not just aggregate scores. Classify missing context, incorrect criterion interpretation, bad test oracle, wrong evidence mapping and publication/freshness failures. The error class decides whether O2 retrieval, O4 probing or O5 criticism is a useful addition.
8. Only after useful assessment quality is demonstrated, test one authorized A→B correction cycle with both a true fix and a fix that introduces a regression. There is no automatic merge or terminal Work mutation in that experiment.

| Metric | Denominator / interpretation | Misleading substitute to avoid |
| --- | --- | --- |
| False acceptance | Known-incomplete attempts incorrectly recommended ready / all known-incomplete attempts | Reporting only “accuracy” over mostly correct examples |
| False rework | Known-correct attempts given unjustified corrective findings / all known-correct attempts | Treating abstention as the same thing as a false defect |
| Missing-criterion recall | Labeled omitted required criteria identified / all labeled omitted required criteria | Count of comments or reviewed files |
| Criterion coverage | Applicable evidence/assessment for required criteria / complete original criterion set | Averaging only returned criteria |
| Inconclusive/error rate | All incomplete, unavailable or invalid runs / all attempts, with reason categories | Dropping failed runs from reported reliability |
| Correction yield | Validated fixes without introduced regression / attempted correction cycles | Number of additional commits or reviewer rounds |
| Cost and latency | Total attempts, calls, tokens, runtime and known/unknown cost per task and useful outcome | Cost of only the successful final model call |
| Mechanical guard performance | Designed stale/duplicate/unauthorized/invalid cases correctly rejected or reconciled / all relevant cases | Generalizing synthetic guard success into semantic accuracy |

Choose acceptable error/cost tolerances **before looking at the held-out results**. Small-sample zero failures is a useful signal, not a guarantee. Illustratively, under an idealized independent fixed-distribution Bernoulli model, zero failures in `n` trials has a one-sided 95% upper failure bound `1 - 0.05^(1/n)`. At `n = 18` this is about 15.3%, not zero. Related variants and shared infrastructure violate independence, making this calculation inappropriate as a production claim; task-level grouping and broader follow-up are needed. This is a mathematical caution, not an observed experiment.

Anthropic's guidance supports mixed graders, independent calibration, balanced tasks and inspection of grading failures [S20]. It does not validate this particular library. The empirical patch-correctness paper [S23] likewise motivates stronger checks: its reported behavioral divergence from a reference patch is not automatically an error, and its dataset/model-specific rates must not become our expected rates.

### 17. Freshness, reuse and avoiding unnecessary model work

Changing the candidate or criteria makes the **old assessment** inapplicable. It does not necessarily require rerunning every raw check. Evidence for the same immutable artifact, same admitted check definition and materially identical environment may be reused only through a **new explicit applicability assessment** under current criteria/policy. Never relabel an old verdict with a new hash.

In the PR adapter, capture authored criteria outside the bot-generated summary. Handle edit/removal/readdition and re-read source identity before publishing a current result. A duplicate webhook does not authorize duplicate model work. Bot summary-only edits should not alter the canonical criterion set. Removed optional criteria withdraw current applicability; they are not automatically approved.

GitHub commit-scoped checks do not by themselves atomically protect an editable PR body. A webhook-triggered reevaluation still has a merge-time race. Initial Task Verification therefore stays advisory as proposed in PR #5. Future required enforcement needs a separate consumer decision. Likewise, an implementer-authored PR description is not a substitute for an independently authorized Orchestrator completion plan.

The consumer owns rework budgets. Separate transport retries from semantic correction rounds, and keep a hard exhaustion outcome even when no human is assigned. A framework's liveness watchdog fingerprint must not be reused as artifact identity merely because both are called hashes.

### 18. Critical perspectives and explicit rejections

These are **same-author analytical passes**, not independent agents, hidden experiments or requested-model runs.

| Perspective | Strongest objection | Adjustment / question left open |
| --- | --- | --- |
| Architecture / DDD / DRY | A generic verification framework could duplicate Work, CI and reviewer orchestration | Keep assessment portable, completion consumer-owned, execution outside core; separate repo remains challengeable |
| Adversarial evidence | Authentic-looking results may be forged, stale, from another tree or based on weakened tests | Preserve producer authority, expected inventory, candidate/check identity and uncertainty; no trust from hashes alone |
| Semantic skeptic | More structure and more reviewers may not reduce actual mistakes | Test correct alternatives and missing features; permit simpler O2/O3 to win |
| Operations / cost | Mandatory search, probes and committees create latency and failures | Begin with one bounded reviewer and existing checks; add by observed failure class |
| Industry-comparison skeptic | A known framework's tests and stars might be mistaken for deployed readiness | Grade scoped mechanisms, not brands; distinguish source, reported execution and direct observation |
| Research reproducibility | Different option numbering and estimates can look like precision without a stable scope | Retain canonical IDs, expose draft mapping, pin sources and state estimate assumptions |

Rejected shortcuts include: copying Inspect's positive-settling cascade as mandatory CI acceptance; copying Agentless's best-available-patch fallback as completion; inheriting Kodus's advisory partial-pass rules for required Work; treating a worktree as a security sandbox; assuming three accounts are independent reviewers; using a signed marker as proof of semantic completeness; and forcing a model to propose fixes even on correct code.

The strongest remaining challenge to the recommendation is not a missing framework. It is **whether evidence mapping and coverage improve the actual errors enough to justify their implementation cost**. That is the central comparison to run after the audit.

## Implications and limits

### 19. How to use this study in Phase 0

Ask for one bounded critique: which existing contracts already provide the needed guarantees, which gaps are real, whether the separate reusable-library boundary is justified, and which single experiment can change the choice. Existing accepted ADRs are not silently rewritten. Research may conclude that the existing reviewer is sufficient for an advisory mode or that a smaller prototype should precede retained code.

The owner prefers architecture that can grow without unnecessary rewriting, but also accepts an explicitly understood refactoring/migration risk if the collaborator argues for a simpler first experiment. Clean boundaries and minimal scope are compatible; a stable SDK, plugin marketplace or generalized proof system is not required.

Recommended practical sequence remains: read-only architecture review → joint decision → agreed minimal contracts/evaluation method → isolated consumer experiment → evidence-based choice. No deadlines, financial promises, IP assignment, production tasks or account infrastructure are introduced by this research.

### 20. Revision, provenance and publication notes

This expansion updates the existing study in **research PR #6**, whose initial version is commit `df223a6e38ef33ce41a04c3db1ae937bc8fae5da`. It preserves its five profile identities, baseline estimates and source limitations, and adds the claim ledger, decision falsifiers, uncertainty register, cost breakdown and evaluation detail. It is not a second competing product plan and does not merge PR #5 by reference.

An earlier downloadable conversation draft, `task-verification-options-2026-11-11.md`, had 32,237 bytes and SHA-256 `b0b6074be805a7289171dddc52defdecddf082436bbfc6dfbdf4bac82c536eda`. Its five **families** were grouped differently. Do not compare option numbers or LOC without translating scope:

| Earlier draft family | Relation to canonical profiles here | Why counts/estimates are not directly interchangeable |
| --- | --- | --- |
| Evidence matrix + evaluator | Closest to O1 | Current estimate explicitly budgets product integration and CI evidence mapping |
| Matrix + selective investigation | O1 extended with O2-style retrieval, not standalone O2 | The earlier family already included machine evidence |
| Executable acceptance plan | Existing-check part of O1 | O4 additionally proposes, validates and executes new counterexample probes, a larger scope |
| One criteria-review pass | O2 without broader investigation; O3 only if combined with ordinary review | One specialized call and one combined native output mode are different contracts |
| Reviewer panel | Closest to O5 | Current range includes hybrid evidence handling and adjudication, not only extra calls |

The preserved old Git commit and recorded attachment hash make the estimate evolution inspectable. The larger ranges are **not measurements of code growth** or a claim the original estimate was empirically disproved; they are different scoped planning assumptions. Use the canonical table in this file for current discussion.

The evidence expansion re-read the pinned Agentless reranker, SWT-Bench grading segment, SWE-bench grading segment and Inspect cascade; it also retrieved current primary Gerrit, Promptfoo and Anthropic documentation and the patch-correctness abstract. Earlier source/test inspections remain explicitly identified in the catalog rather than falsely claiming every upstream project was re-audited. No model trial or upstream test suite was executed.

**Documentation tooling:** this is an edit of an existing registered study, not a new-document creation. The repository's pinned metadata/catalog and direct Studies index remain in use. The current container lacks the supported Node 24/26 and pinned Docs Protocol installation and cannot resolve GitHub/npm, so local CLI/catalog execution was unavailable. GitHub connector writes and the existing hosted Docs Protocol workflow are used; report the actual final-head CI result separately. No tooling dependency, workflow, protection or validation rule is weakened. A documentation pass does not establish product E2E.

## Sources

### Source catalog and exact inspection boundaries

All code references below are fixed revisions. Official documentation links are mutable pages retrieved on 2026-11-11; their existence is not source or deployment qualification. Source/test-inspected means read, **not run**. Donor licensing and permitted use must be checked before copying code; none is adopted here.

| ID | Source and inspected mechanism | Evidence class and freshness limit |
| --- | --- | --- |
| S01 | [ReviewRouter managed OCR invocation adapter][rr-ocr] | Pinned Action source `6988fe0...`; policy/background contract, no live invocation |
| S02 | [ReviewRouter managed result admission][rr-run] | Pinned Action source; process/model/coverage guards, not requirement coverage |
| S03 | [Managed runner regression tests][rr-run-tests] | Test source inspected in prior comparison; not executed here |
| S04 | [Kodus gap-check][kodus-gap] | Pinned `2092395...`; actual retrieval/citation/transition code |
| S05 | [Kodus check policy][kodus-policy] | Same pin; advisory pass semantics, not a defect claim about its intended scope |
| S06 | [Kodus gap-check tests][kodus-tests] | Scripted agent moves; mechanism tests, not measured model reasoning |
| S07 | [Kodus paired requirement eval method][kodus-evals] | Pinned `b759339...`; author-created 29-case methodology, not run |
| S08 | [Inspect cascade implementation][inspect-cascade] | Pinned `67873ea...`, blob `39e6aaece7201f7cf55be583bafff2adab754117`; reread in expansion |
| S09 | [Inspect cascade tests][inspect-cascade-tests] | Earlier inspected test source; positive-settling intent, not our gate policy |
| S10 | [Inspect model grader tests][inspect-panel] | Earlier inspected panel/abstention tests; no independent reliability measurement |
| S11 | [Agentless reranker][agentless] | Pinned `5ce5888...`, blob `5f1cab553fab0cc369027bd77f404e51bce373a3`; full source reread |
| S12 | [SWT-Bench grading][swt-grading] | Pinned `be12d4c...`, blob `c86b4c203b422c3f16f12bf369ff6fbdb9a50103`; selected grading source reread |
| S13 | [SWE-bench grading][swe-grading] | Pinned `02e7a74...`, blob `39174d64aef5c3cc211b27124af5966349d1aa8c`; parser/guard source reread |
| S14 | [SWE-bench issue #667][swe-issue] | Reporter reproduction cited in initial PR #6; not independently reproduced or a claim about all later versions |
| S15 | [SWE-bench evaluation guide][swe-guide] | Supporting primary methodology; benchmark conventions differ from product acceptance |
| S16 | [Gerrit submit requirements][gerrit] | Official documentation reread; policy separation and testability, not AI semantic accuracy |
| S17 | [Orchestrator ADR-0072][adr72] | Accepted architecture at `a34587b...`; does not prove implementation readiness |
| S18 | [ReviewRouter finding lifecycle][rr-quorum] | Earlier pinned source inspection; finding-resolution policy cannot be generalized into Work acceptance |
| S19 | [Prior combined source study](evidence-based-feedback-and-rework-2026-11-09.md) | Historical Paperclip/Ruflo/Orca/OpenHands/Haystack etc.; not all requalified here |
| S20 | [Anthropic agent evaluation guidance][anthropic-evals] | Primary engineering article retrieved on expansion date; methodological support only |
| S21 | [Promptfoo deterministic assertions][promptfoo-deterministic] | Primary docs retrieved; candidate evaluation tooling, not installed or qualified |
| S22 | [Promptfoo model-graded assertions][promptfoo-model] | Primary docs retrieved; rubric availability is not calibrated accuracy |
| S23 | [Are Solved Issues in SWE-bench Really Solved Correctly?][patch-study] | arXiv v2, 2025-09-09; abstract/method/results reported by authors, not reproduced |
| S24 | [PR #5 architecture/Phase 0 proposal][proposal] | Separate draft; not merged implementation approval |

The earlier combined study is also the retained reference for Paperclip's exact-artifact human approval, Orca feedback/worktrees, Ruflo smoke checks and manifests, and Haystack/Pydantic evaluator patterns. These are complementary responsibilities, not competing implementations of every part of Task Verification. ReviewBench measures PR defect detection rather than all task requirements; its role as an optional code-review baseline does not replace our criterion-completeness corpus.

### Limits on an industry claim

We inspected a selected set of practical mechanisms and contrasted their actual semantics. We did **not** exhaust the industry, inspect closed-source internals, establish the strongest achievable AI accuracy, independently reproduce every cited issue, or certify a production deployment. The honest conclusion is a source-backed shortlist tailored to our existing infrastructure, with explicit ways to disprove it. A later audit should expand sources only when a concrete unresolved question could change the decision, not to inflate a project list.

[proposal]: https://github.com/agent-teams-ai/engineering-research/pull/5
[adr72]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0072-atomic-work-completion-evaluation.md
[rr-ocr]: https://github.com/777genius/review-router/blob/6988fe0f6eb07c04ee16f2542cf24ecf7689f6cd/src/review-orchestration/infrastructure/ocr-review-invocation-adapter.ts
[rr-run]: https://github.com/777genius/review-router/blob/6988fe0f6eb07c04ee16f2542cf24ecf7689f6cd/src/review-orchestration/infrastructure/ocr-review-managed-run.ts
[rr-run-tests]: https://github.com/777genius/review-router/blob/6988fe0f6eb07c04ee16f2542cf24ecf7689f6cd/__tests__/unit/review-orchestration/ocr-review-managed-run.test.ts
[rr-quorum]: https://github.com/777genius/review-router/blob/6988fe0f6eb07c04ee16f2542cf24ecf7689f6cd/src/analysis/thread-lifecycle.ts
[kodus-gap]: https://github.com/kodustech/kodus-ai/blob/2092395a6fa0eb393951b0198f1ce574ebad9184/libs/agents/business-validation/judge/gap-check.ts
[kodus-policy]: https://github.com/kodustech/kodus-ai/blob/2092395a6fa0eb393951b0198f1ce574ebad9184/libs/agents/business-validation/check-policy.ts
[kodus-tests]: https://github.com/kodustech/kodus-ai/blob/2092395a6fa0eb393951b0198f1ce574ebad9184/libs/agents/business-validation/judge/gap-check.spec.ts
[kodus-evals]: https://github.com/kodustech/kodus-ai/blob/b759339a7435bd8c6064ff349cd7a65c1c5a033c/evals/business-logic-requirements/README.md
[inspect-cascade]: https://github.com/UKGovernmentBEIS/inspect_ai/blob/67873ea965f2d5acd46b2327ea17aecff30026c1/src/inspect_ai/scorer/_cascade.py
[inspect-cascade-tests]: https://github.com/UKGovernmentBEIS/inspect_ai/blob/67873ea965f2d5acd46b2327ea17aecff30026c1/tests/scorer/test_cascade.py
[inspect-panel]: https://github.com/UKGovernmentBEIS/inspect_ai/blob/67873ea965f2d5acd46b2327ea17aecff30026c1/tests/scorer/test_model_graded.py
[agentless]: https://github.com/OpenAutoCoder/Agentless/blob/5ce5888b9f149beaace393957a55ea8ee46c9f71/agentless/repair/rerank.py
[swt-grading]: https://github.com/logic-star-ai/swt-bench/blob/be12d4c8e7a5315a6bd60b0cad72736e96a4af3e/src/grading.py
[swe-grading]: https://github.com/SWE-bench/SWE-bench/blob/02e7a74ffd0b707aab73d203fe87bdc7c76afc8e/swebench/harness/grading.py
[swe-issue]: https://github.com/SWE-bench/SWE-bench/issues/667
[swe-guide]: https://www.swebench.com/SWE-bench/guides/evaluation/
[gerrit]: https://gerrit-review.googlesource.com/Documentation/config-submit-requirements.html
[anthropic-evals]: https://www.anthropic.com/research/demystifying-evals-for-ai-agents
[promptfoo-deterministic]: https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/
[promptfoo-model]: https://www.promptfoo.dev/docs/configuration/expected-outputs/model-graded/
[patch-study]: https://arxiv.org/abs/2503.15223v2
