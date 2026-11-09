---
id: research.studies.reviewrouter-task-verification-ux-2026-11-10
type: study
status: active
owner: research/maintainers
summary: Proposed automatic PR-description opt-in to requirement verification, including edit-time freshness, GitHub check limitations and a nonregressing rollout boundary.
reviewed_at: 2026-11-10
---

# ReviewRouter Task Verification: PR UX and Freshness — 2026-11-10

## Scope and status

**Recorded 2026-11-10 (Europe/Chisinau). Proposed consumer behavior, not yet built or rolled out.** This document specifies the **first use case** for the independent [Task Verification kernel](task-verification-vision-2026-11-10.md); the [validation plan](task-verification-evaluation-plan-2026-11-10.md) decides which claims must be demonstrated before production adoption.

**Product direction:** normal PRs keep their current ReviewRouter code review. An author adds the exact dedicated Markdown heading `## ReviewRouter: Acceptance Criteria` to the **human-authored** PR description, and an additional advisory Task Verification run is automatically requested. No dashboard switch, bot comment command, extra file or new hosted service is needed for initial adoption. A Markdown-file source and mandatory merge gating are **deferred**, not silently supported.

## Evidence and counterevidence

### First-user workflow

Example (actual authored PR Markdown, not a new app configuration language):

```md
## ReviewRouter: Acceptance Criteria

- [ ] AC-1: Unauthenticated GET /profile returns HTTP 401.
- [ ] AC-2: An authenticated user may read only their own profile.
- [ ] AC-3: Integration tests and the API contract cover the new behavior.
```

- The heading is an **explicit per-PR opt-in**. Ordinary generic `## Acceptance Criteria` and natural-language mentions are not triggers.
- Parse Markdown structurally: ignore fenced code, quoted demonstration text and the generated ReviewRouter summary block. A duplicated exact heading, empty/invalid section or unsupported structure produces a visible *invalid criteria* outcome rather than a silent clean review. Keep a bounded criterion count and input size; choose numbers after reviewing current transport budgets.
- Treat each checkbox label/text as a requested criterion. The author's `[x]` is **not** a verified pass. Explicit IDs such as `AC-1` aid stable feedback; the first parser should decide whether to require them before establishing a public accepted format. Prefer stable IDs for corrected/reordered criteria instead of ambiguous ordinal-only identity.
- Render per-criterion **satisfied / violated / inconclusive**, evidence references and a coverage summary; distinguish missing implementation from unavailable verification. A gap outside the changed diff belongs in the criterion report, not a fabricated GitHub inline location.
- Preserve ordinary ReviewRouter findings and check behavior separately. A Task Verification success does not override code review failure or another required CI check.

### Existing PR description ownership

The [Action updater][rr-pr-body] and [server publication contract][rr-publish] use `<!-- review-router-summary:start -->` and `<!-- review-router-summary:end -->` for generated text. They preserve author material outside those markers. Extract criteria **only from the authored area**. The generated Summary, walkthrough and test-file listing are not authoritative requirements. The verification integration must not rewrite the acceptance section when publishing its own result.

The current OCR policy only reports material issues in changed paths, so a clean code review **cannot** close missing requirements. The independent verifier should receive an explicit criteria snapshot and appropriately scoped evidence; it may use the existing OCR mechanism, but cannot claim current native OCR already returns a criterion-by-criterion typed verdict. Before making an adapter, inspect whether a supported read-only structured result path exists; do not parse bot prose as the authoritative interface.

### Mutable PR body is a real concurrency boundary

The minimum identity for ReviewRouter's PR use case is:

```text
repository identity + PR identity + reviewed HEAD SHA
+ acceptanceCriteriaDigest + verificationPolicyRevision
```

Additional artifact/check provenance binds actual evidence, tool version and model/invocation identity. Compute the criteria digest from the **bounded, explicitly extracted authored criteria** with a pinned canonicalization version. A change to the criteria, including a checkbox edit, must at least cause a freshness recheck; a normalized no-op may be treated identically only under an explicitly versioned canonicalization policy. Do not hash the automatically rewritten summary.

| GitHub/input event | Intended behavior |
| --- | --- |
| Opened/reopened PR or changed head | Evaluate current head and current authored criteria; no section means ordinary review only |
| `pull_request.edited` changing authored criteria with same head | Create/reconcile verification for the new criteria identity; prior result is historical/stale |
| Body edit while a run is in progress | Re-read criteria and head **before any positive publication**; stale run cannot publish as current; schedule/reconcile newest identity |
| Body edit after an apparently successful run | Revalidate; new digest must require fresh evidence even if the Git SHA is unchanged |
| Duplicate webhook and multiple concurrent runs | Deduplicate by logical verification identity and command key; old result cannot replace newer projection |
| Invalid/ambiguous criteria section | Publish clear input/error/unknown state; never turn it into no findings = pass |
| Section removed | No *new* optional verification invocation; mark previous criteria assessment obsolete and avoid showing it as current |
| External runner or GitHub API temporarily unavailable | Preserve unavailable/inconclusive; do not mark criteria satisfied |
| Reviewer partial coverage | Preserve observations and missing checks, no positive overall criterion recommendation for unverified mandatory gates |

Support the actual `edited` webhook and correct event-type configuration. A scheduled or manual fallback can reconcile missed webhook delivery later **if needed**, but webhook delivery alone cannot protect the final merge transaction.

**Important GitHub limitation:** check conclusions are associated with a commit SHA. Editing a PR body does **not** create a new commit; an older successful required check may remain visible for that SHA. Triggering `edited`, updating a comment and publishing a newer check are useful, but insufficient by themselves to guarantee that nobody merges between edit and reevaluation. Therefore the initial feature is **advisory and nonrequired**. Future mandatory merge gating requires separate owner-approved enforcement/merge-time latest-criteria authorization, not a misleading claim that a webhook eliminates the race. Disabling by deleting the criteria heading must not bypass a future repo policy requiring verification.

For Orchestrator, the PR body is **not** a trusted authorization source: an implementation agent could reduce criteria to match its incomplete work. Product acceptance plans must be approved and versioned by their owning authority; PR descriptions remain a convenient declared reviewer input.

### Reviewer and model execution

- Reuse the existing permitted ReviewRouter connection: managed OCR through the product's Account Gateway, which is backed by Sub2API in the existing reviewed path. A user can connect an eligible account using the supported product workflow; do not create a second account pool, transfer tokens manually, or imply all models/modes are equally qualified.
- No extra **agent infrastructure** is required, but a specialized requirements check may spend **additional model tokens**. Distinguish one runner process from the number of provider requests inside it. Measure usage and coverage rather than claiming free inference.
- Start with baseline ordinary review + a separate, **disposable** requirements evaluation using the same approved engine where possible. Only consider combined single-invocation OCR after measuring correctness and proving unchanged ordinary review behavior. No managed Go patch, output contract, production prompt, Gateway, billing or database change in the first experiment.
- Read untrusted repository code and task descriptions with least privilege. Do not execute untrusted PR code in a privileged checkout, expose provider tokens to forked candidates or allow prompt injection to override the verification policy.

### Recommended user-facing result

Title: **ReviewRouter / Task Verification** (separate from ordinary code review). Show criterion status, evidence link/range/actual runtime fact, requested versus executed checks, missing/inconclusive reasons and the candidate/criteria revision. Show *Needs changes* only for demonstrated actionable violations; use *Could not verify* for uncertainty. Neither a green review summary nor absence of inline comments is a complete task-verification report.

At first, publication can be a nonblocking summary/check from the **isolated test repository** only; production integration, check naming, exact publication permissions and status lifecycle need their own reviewed consumer PR. Existing review publication, generated PR summary and the production site must continue to function. No customer volume is asserted; avoiding site regressions still matters.

## Implications and limits

**Initial UX acceptance:**

1. No acceptance heading: exact existing review flow, output, cost profile and publication behavior (compare baseline E2E).
2. Valid acceptance heading: additional explicit advisory result; no extra manual toggle or Markdown file.
3. Every criteria edit (including during an in-flight review) triggers new identity/freshness handling; no stale positive claim.
4. Missing criteria/partial execution/unknown model result cannot be reported as all criteria satisfied.
5. The author-owned section survives ReviewRouter summary updates and does not inherit their generated text.
6. Criterion gaps outside the diff remain reportable even without an inline review annotation.
7. Existing webhook, GitHub App and workflow security scopes are inspected and qualified before expanding event permission or production mutation paths.

**Not in v1:** external referenced acceptance Markdown, automatic PR merge, mandatory branch-protection checks, authoring a PRD, modifying code, unrestricted extra repository tools, new OAuth/Gateway infrastructure, a generic workflow engine, self-service billing or cross-product completion state.

## Sources

**Source inspected 2026-11-10; recommendations not executed.** Pin semantic claims to inspected code and the [2026-11-09 combined audit](evidence-based-feedback-and-rework-2026-11-09.md). GitHub webhook and check semantics require consumer E2E/merge-race qualification, not inference from this report.

- [Current Action PR description updater][rr-pr-body]; [generated-block ownership contract][rr-publish].
- [OCR review scope and bounded background][rr-ocr]; [server review capability limits][rr-capabilities].
- [GitHub webhook actions/events](https://docs.github.com/en/webhooks/webhook-events-and-payloads#pull_request); [GitHub status checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).
- [ReviewRouter evidence freshness][rr-current-revision].

[rr-pr-body]: https://github.com/777genius/review-router/blob/7bf73a7f92d42b662bda2647740e0fefaf5015d3/src/github/pr-description.ts
[rr-publish]: https://github.com/777genius/review-router-ai/blob/f376d781cc9ea72110c69c09d57619f054428149/packages/features/review-publishing/src/v2/domain/review-pr-description.ts
[rr-ocr]: https://github.com/777genius/review-router/blob/7bf73a7f92d42b662bda2647740e0fefaf5015d3/src/review-orchestration/infrastructure/ocr-review-invocation-adapter.ts
[rr-capabilities]: https://github.com/777genius/review-router-ai/blob/f376d781cc9ea72110c69c09d57619f054428149/docs/capabilities.md
[rr-current-revision]: https://github.com/777genius/review-router-ai/blob/f376d781cc9ea72110c69c09d57619f054428149/packages/features/review-executions/src/application/use-cases/check-current-review-execution-revision.ts
