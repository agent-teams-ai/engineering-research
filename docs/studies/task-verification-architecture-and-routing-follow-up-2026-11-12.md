---
id: research.studies.task-verification-architecture-and-routing-follow-up-2026-11-12
type: study
status: active
owner: research/maintainers
summary: Follow-up architecture research, bounded local probes, existing model-routing reuse and the agreed planning scope.
reviewed_at: 2026-11-12
---

# Task Verification Architecture and Routing Follow-up — 2026-11-12

## Scope and status

**Recorded 2026-11-12 (Europe/Kiev). Research supplement, with executed local probes and inspected source/CI evidence.** This document carries the subsequent architecture and OCR/Gateway investigation into the repository. It supplements [the five-options study](task-verification-five-practical-options-2026-11-11.md); that study's original observation date, scores, method and TV-O1–TV-O5 identities remain unchanged. An `active` study is maintained research, not an accepted product architecture or production qualification.

The owner-provided collaboration agreement is recorded separately from technical findings: a dedicated public experimental Task Verification repository is agreed; **Milestone 1 remains only a bounded Stage A/B experiment plan, approximately 4–6 focused hours**. Stable SDK publication, production integration and support commitments are outside that agreement. This update does not establish that the dedicated repository has been created or that any integration has been implemented.

Hassan's original Phase 0 report and its retained partial import remain unchanged. New findings below are this follow-up's analysis, not additions attributed to his report. The preserved import is 57,524 bytes with SHA-256 `e5ca71d6e57bcf34103e0b80f28550553c365b43a357da05ab2019725ff5ddfd`; the unknown continuation is not reconstructed.

### Reading route and authority

| Read | Purpose | Authority/status at observation |
| --- | --- | --- |
| [Product and architecture vision][vision] | Goal, portable kernel, ReviewRouter first consumer and external adapters | Research/product direction in independent draft PR #5 |
| [Five practical options](task-verification-five-practical-options-2026-11-11.md) | Alternatives, conditional recommendation and scoped estimates | Research in draft PR #6; no measured semantic ranking |
| This supplement | New local evidence and concrete OCR/Gateway integration findings | Dated research and recommendations |
| [Evaluation proposal][evaluation] | Broader qualification framework | Background; the latest planning milestone controls immediate scope |
| [ADR-0072][adr72] and [ADR-0027][adr27] | Work completion authority and replaceable orchestration boundary | Accepted Orchestrator decisions; not proof of implemented production behavior |

PR #5 and PR #6 are independent drafts based on `main`. Links into PR #5 therefore use its inspected immutable commit, rather than nonexistent relative paths in this branch.

The [retained evidence bundle](../../evidence/experiments/task-verification-2026-11-12/README.md) contains the original local probe source subset, raw results and source identities. It is frozen research evidence, with its execution/typecheck limits explicitly recorded; it is not a maintained verifier package or a new production test gate.

## Evidence and counterevidence

### 1. Architectural conclusion

**Retain a small in-process verification feature with replaceable reviewer and evidence adapters.** Preserve the complete criterion inventory before invoking a reviewer, validate the returned coverage against that inventory, and leave acceptance policy with the consumer. TV-O1, existing machine evidence plus a criteria reviewer, remains the preferred hypothesis. TV-O2 is a useful simpler comparison; TV-O3 may win if a combined invocation meets the actual contract and ordinary-review parity at lower cost. TV-O4/TV-O5 need a measured failure that justifies their extra probes or critics.

Three outcomes have different owners:

| Question | Owner | Relevant facts |
| --- | --- | --- |
| What ran and completed? | Execution/evidence adapter | Captured input, source identity, request/attempt, technical outcome, completeness, raw output and usage |
| What is established for each criterion? | Criterion evaluator plus deterministic result admission | `satisfied`, `violated`, `inconclusive`, evidence references and complete expected IDs |
| May this work be accepted now? | Consumer policy; Work Coordination for Orchestrator | Current basis, required gates, permissions, overrides and atomic final decision |

Successful model transport, empty review findings and complete file coverage answer different questions from requirement satisfaction. A valid passing test establishes only the behavior that its approved oracle/mapping actually covers. A demonstrated required-check failure remains visible when another criterion lacks evidence; the report must retain both violation and incompleteness.

The independently captured inventory, candidate identity, evidence applicability and result-admission rules are the most important early contracts. The new module does not acquire Work completion authority. [ADR-0072][adr72] already specifies the relevant completion epoch, basis revision, candidate digest and evaluation binding.

### 2. Competitor mechanisms worth reusing

This table compares mechanisms for the same verification problem. It does not rank entire products or infer measured LLM quality from source design.

| System and inspected evidence | Useful mechanism | Boundary/counterevidence |
| --- | --- | --- |
| Kodus [judge][kodus-judge] and [policy][kodus-policy], source and exact pure-policy execution | Requirement-level assessment; bounded repository investigation and source-reference checks in the inspected business-validation implementation | A valid citation is not semantic proof. Its advisory pass policy accepts `partial` and `check_manually`; the whole service also has other checks |
| Open Code Review [manifest][ocr-manifest] and [result model][ocr-model], source inspection | Pinned execution inputs and file-oriented review/coverage | Review comments and file completion do not provide an independently captured per-criterion result ledger. Upstream and ReviewRouter's managed build are distinct artifacts |
| [CodeRabbit][coderabbit], official documentation | Separates check result, reporting surface and enforcement | In the documented platform reporting mode, inconclusive can become `action_required`; native Walkthrough behavior differs. Closed internals were not audited |
| [PR-Agent][pr-agent], source inspection | Structured review output and ticket context | Ticket-level textual compliance fields do not themselves preserve an independent required criterion-ID inventory |
| [Harbor/Rewardkit][rewardkit], source/documentation inspection | Programmatic and model-based criteria, explicit results and aggregation policies, separate verifier | Reward and reward validity are experiment outputs; they do not grant product completion authority |
| [Inspect AI][inspect], source/documentation inspection | Solver/scorer separation, raw logs and rescoring retained outputs | Accuracy can exclude errored/unscored samples; expose the denominator and all attempts alongside an aggregate |
| [SWE-bench][swebench], source inspection | Fixed inputs, independent expected tests and execution/grading evidence | Benchmark handling of skipped/empty sets is not a universal product acceptance policy |
| [Gerrit][gerrit], official documentation | Reviewer assessment, submit requirements and visible override are separate | Useful authority model; it does not solve LLM semantic assessment |

Kodus is the closest semantic-review reference here; Inspect/Harbor are useful experimental-harness references; Gerrit and the accepted Orchestrator ADR clarify acceptance ownership. This is a fit judgment, not an accuracy benchmark. The earlier Qodo custom-compliance URL redirected to v1 documentation with a sunset notice and was excluded as evidence for a current v2 contract. The [source inventory](../../evidence/experiments/task-verification-2026-11-12/snapshot/sources.json) records these observations and limits.

### 3. What actually ran without model calls

The self-contained spike ran under **Node 24.22.1**, using native TypeScript stripping and no npm dependencies. The only application network activity was localhost HTTP. A separate verification reran it in a disposable copy and checked that the original source/results were unchanged.

| Unit of evidence | Observed result | Scope |
| --- | --- | --- |
| Local architecture spike | **44 named checks passed, 0 failed** | Criterion inventory, applicability, claims, failure/incompleteness and in-memory publication protocol |
| One schedule check inside those 44 | **60 sequential event orders** | Cancellation, removal/re-addition and delayed delivery; not 60 additional independent tests or concurrent database transactions |
| Digest-only comparison within that model | **30 stale-delivery opportunities** | Illustrative weakness of that comparison rule, not an observed production defect rate |
| Synthetic behavior fixtures used by the spike | **4 candidates × 3 requests = 12 localhost HTTP requests** | Actual behavior of the self-authored toy implementations |
| Two separately executed upstream pure functions | **14 assertions passed: 7 Kodus + 7 ReviewRouter** | Exact source blobs; additional to the 44 local checks, not full upstream suites |
| Experimental model calls | **0** | No semantic quality, live-provider or real OCR E2E measurement |

**Counting clarification:** the original HTML report's introductory sentence was ambiguous about the 14 upstream assertions. The retained JSON and runner show that they are separate from the 44 checks. This document records the corrected count; it does not relabel the total as 58 E2E tests.

#### Exact pure-function observations

- Kodus `taskPasses`: `met` passes and `missing` fails in the basic cases; `partial`, `check_manually` and an empty list pass. The inspected `part_of` and `accepted` contexts also change the missing-case decision. All seven expected cases passed. This is a deliberate advisory policy, not a demonstrated defect of the complete product.
- ReviewRouter `boundOcrBackgroundText`: all seven checks passed against the **8,000-character** bound. Required text in a discarded suffix disappears, and different suffix requirements can produce the same bounded input. Unicode-pair handling was preserved. This is a risk for a proposed criteria profile; it does not prove a current production criteria-check incident.

The reproduction helper checks exact Git blob hashes before extracting the two reviewed pure functions: Kodus `39b714cade08bf667a1451a42637048da73488be`; ReviewRouter `68f70ee15fe902e96742570cae10585e153c5ab0`. Full upstream source is not redistributed in the bundle. See the [reproduction instructions and receipts](../../evidence/experiments/task-verification-2026-11-12/README.md).

#### HTTP examples and their interpretation

| Synthetic candidate | Missing token must return 401 | Active token must return the profile | Revoked token must return 401 |
| --- | --- | --- | --- |
| P1, correct inline implementation | Satisfies | Satisfies | Satisfies |
| P2, correct unchanged helper | Satisfies | Satisfies | Satisfies |
| N1, missing-token defect in changed route | Violates, as expected | Satisfies | Satisfies |
| N2, revoked-token defect in unchanged helper | Satisfies | Satisfies | Violates, as expected |

P2/N2 have the same route diff but different unchanged helpers **and different baseline snapshots**. They constructively demonstrate the need for relevant unchanged context; they are not a controlled same-base model experiment or Hassan-approved benchmark candidates. Targeted reading of the helper is enough for this example; it does not justify scanning an entire repository on every review. The behavioral oracle runs outside the candidate child process.

The spike's `assess` function reconciles reported claims; it does not establish their truth. Its receipt Map models an already authenticated adapter, and its synchronous publication fence models a protocol. Neither implements a trust service, database CAS/outbox, worker recovery or hostile-code sandbox. The narrow criterion parser is a fixture grammar, not a production PR Markdown parser. No TypeScript compiler/typecheck, native OCR execution or load qualification was performed by these local probes.

### 4. OCR output qualification remains a real prerequisite

The inspected upstream OCR commit is `6386895e7cfac419bd7a9cf4795e8b824a6e3ced`; ReviewRouter's [build recipe][ocr-build] selects its own upstream revision and managed patches. These sources must not be treated as interchangeable. The inspected [result model][ocr-model] primarily describes review comments, not a criterion-completion ledger.

A different prompt or background text does not by itself establish a supported criteria-result schema. Qualify the exact binary, prepared input, available context/tools, output contract, limits and completion behavior. Preserve the complete criterion inventory before any bounded prompt transformation. If all required criteria cannot be admitted, return an explicit limitation or use an explicitly defined partition; do not silently drop them and later claim full coverage.

Both ordinary review and criteria review may share materialization, model routing, limits, diagnostics and cancellation. They retain distinct output semantics. No separate call per criterion or new service is implied by this distinction.

### 5. Existing Account Gateway route and the right integration level

The inspected ReviewRouter path is **managed OCR → local HTTP bridge → Action transport → ReviewRouter backend relay → Account Gateway/native Sub2API**. The relevant seams are the [Action runtime][rr-runtime], [Action transport][rr-transport], [managed OCR configuration][rr-managed] and [backend relay][rr-relay]. Gateway's TypeScript control plane owns execution authorization; the native Go engine handles inference. Control and inference origins can be separate.

The managed configuration accepts a bare `http://127.0.0.1:<port>` URL, without `/v1` or `/responses` suffix. The [managed endpoint patch][rr-patch] requires its explicit local credential and disables SDK model retries. Reusing **this managed build** therefore retains a local bridge; this is not a claim that every upstream OCR entry point has the same restriction.

| Experimental caller | Existing interface to consider | Remaining adapter responsibility |
| --- | --- | --- |
| Full OCR tool loop with multiple model turns | Server-only SDK entry `@agent-teams/account-gateway/http`: run access, request, status and close | Map one OCR invocation/attempt to one bounded execution; manage local bridge/process and stable request IDs |
| Separate single-call criteria reviewer | Experimental SDK entry `@agent-teams/account-gateway/llm`: `createLlmClient(...).generate(...)` | Supply authorized policy/input and validate decoded criterion output; measure whether one call is sufficient |
| Direct Sub2API comparison | Explicit standalone adapter using our pinned fork | Name the selected ingress and the Gateway guarantees that this route does or does not exercise |

`/http` and `/llm` are SDK package entry points, not HTTP routes. The [SDK README][gateway-sdk] defines `/llm` as **one bounded model call**, followed by closing its execution. It is not a multi-request OCR session API. Its consumer decoding/schema validation does not prove that every provider enforces JSON Schema. The lower-level execution client supplies the mechanism for the recommended OCR session composition; a finished public `OcrSessionClient` is not claimed.

The native Gateway listener already implements standard `POST /v1/responses`, and `POST /v1/messages` for the supported Claude OAuth Messages profile, alongside the SDK execution route. These standard routes use an **execution-scoped capability**; authority is recovered server-side. On the standard routes, caller `x-gateway-admission` is rejected. `X-Gateway-Request-Id` is optional there, but saving a stable ID before dispatch is the recommended runner behavior. This listener is distinct from ordinary Sub2API API-key access and is not a promise of every OpenAI-compatible endpoint. [Native public handler][native-public].

The inspected Responses path requires streaming, `store=false`, an admitted model and the default service tier. It rejects `previous_response_id`; conversation and tool history must be supplied explicitly in subsequent requests. Output-token limits are inserted or bounded against admission. These are concrete compatibility checks for the actual OCR payload. [Native wire validation][native-wire].

#### Why our fork matters

The organization repository is [agent-teams-ai/sub2api][fork], forked from Wei-Shaw/sub2api. Relevant implemented native integration includes:

- OpenRouter replay handling for reasoning text, provider format fields and assistant output carrying empty `logprobs`, with a specific regression test;
- function namespace/tool identity round-trip and rejecting cases;
- terminal stream delivery coordinated with durable settlement, plus cancellation/physical-closure behavior and unknown-effect preservation.

These observations are supported by the [Responses regression tests][native-responses-tests], [public transport][native-public] and [lifetime tests][native-lifetime]. The tests were inspected for this integration follow-up; they were not rerun locally here. Many of these protections belong specifically to the native Gateway mode. Running the same fork through its ordinary ingress does not automatically exercise them.

#### Minimal proposed runner composition

1. Resolve an authorized experiment profile/account set in the existing consumer boundary. An approved ReviewRouter test route may be reused through its normal permissions; a standalone consumer needs its own configured authorization.
2. Open one bounded execution for the OCR invocation/attempt and retain its original intent and execution identity.
3. Start the managed OCR local bridge. Give the child the local capability, while the trusted adapter owns Gateway access.
4. Assign and retain a stable request ID before each model dispatch; use the same execution for the allowed tool-loop requests.
5. Preserve protocol bytes and separately observe terminal/model facts. The `/http` client does not parse SSE or independently establish the actual response model; requested-model usage metadata cannot substitute for that observation.
6. Propagate cancellation to held streams. After an ambiguous loss, read back the original identity and preserve any unresolved effect. A timeout or readback 404 does not prove no model effect. Do not automatically replay an ambiguously dispatched inference under either the original or a new request/account identity.
7. Close with the existing stable operation/readback contract and preserve unresolved cleanup facts.

This is a recommendation for a future thin experimental adapter. It does not authorize a new account pool, copy ReviewRouter OIDC/publication models into the kernel, or require a new Gateway deployment as a prerequisite to writing Milestone 1's plan. Same-operation recovery for control operations remains distinct from inference replay.

### 6. Source, CI and deployment are different evidence

The following exact source identities were observed during the 2026-11-12 investigation:

| Component | Inspected source | Related qualification identity |
| --- | --- | --- |
| ReviewRouter Action | `7a079c382d8e98b426ee90a6b3764be2a21b4c49` | Source reference for the managed OCR integration |
| ReviewRouter App | `8d697434ad220dfd3e580b190e311726aa8366ed` | Source reference for relay and deployment records |
| Account Gateway main | `784f3550fe3b0d831a64b222445b520638cf22ac` | Same Git tree as checked PR head `539418d5935a9e336d480b128a1cdb93c1daa6e1` |
| Sub2API fork main | `38674a127356bf24a8ff62ccd55a7d792886c168` | Same Git tree as Gateway workflow native pin `a19cbcbedda8eccbe82bb24224052a1e9eaab309` |

Gateway's compared tree is `608b577e2da608b09d77ca2cf19661a82543185c`; Sub2API's is `307e63d6a5632b7d4cfffd74f83ce357c13b80ec`. Different squash/history commit IDs therefore did not imply different code in these comparisons. Keep the **tested pair** when reproducing qualification: Gateway `539418d5935a9e336d480b128a1cdb93c1daa6e1` plus native `a19cbcbedda8eccbe82bb24224052a1e9eaab309`.

The checked PR head has successful [native-client qualification][gateway-client-ci] and [full-stack qualification][gateway-fullstack-ci]; the [workflow][gateway-workflow] records the native pin. These are **inspected existing CI receipts**, not tests launched by this research. They qualify their controlled-provider/client/topology scopes. The [qualification reference][gateway-qualification] does not establish arbitrary live-provider throughput, multi-replica native ownership or horizontal deployment safety. Permanent durable facts and bounded retention/capacity remain relevant operational limits.

ReviewRouter's [deployment record][rr-deployment] separately describes installed Gateway #104 and a successful Codex canary. This contradicts a blanket claim that Gateway is merely planned. It does not establish deployment of the newer inspected source pair or qualification of Task Verification. No production connection, model call or deployment was performed in this follow-up.

For existing Gateway/RR ownership, [contract 53][contract53] identifies its normative role; [plan 54][plan54] is a second-consumer proposal, not an adopted Task Verification requirement. Historical handoff files must not override the current inspected interfaces or be copied as a current limits table. Reuse of SDK/service code does not itself grant another consumer access to ReviewRouter accounts or service credentials.

## Implications and limits

### 7. Identity, trust and freshness

Keep artifact identity, assessment identity and present authority to apply an assessment distinct. Repository identity and exact source snapshot bind the artifact. Criterion/profile/policy/evidence revisions bind an assessment. The consumer's current generation/attempt or equivalent fence determines whether a late result may still be applied.

Editing criteria at the same HEAD invalidates the old assessment. Existing machine evidence may remain reusable if its code, test definitions, environment and parameters still match; its sufficiency for the new criterion set needs fresh assessment. Removing and restoring identical text must not resurrect an already cancelled attempt. The local sequential spike illustrates these requirements; production atomicity still belongs to the consuming system.

A content digest binds bytes, not a trusted producer. [SLSA verification guidance][slsa] is useful for distinguishing artifact identity from trusted builder/provenance. A small experiment needs an explicit admitted-origin/receipt contract, not a new supply-chain platform. Likewise, a test that returns the caller's own profile cannot establish rejection of another user's profile. Mapping evidence to criteria requires an explicit oracle/policy or a clearly labeled semantic judgment.

### 8. Practical placement and scale

| Placement | Present recommendation | When to reconsider |
| --- | --- | --- |
| Additional reviewer prompt | Useful exploratory baseline with external inventory and output admission | The exact engine/profile supports the full required result contract |
| In-process feature plus adapters | Preferred first retained harness/library shape | Qualify real consumers before stabilizing its API |
| Separate verification service | Deferred | Independent release/SLA/security boundary or measured operational need justifies network/auth/state costs |
| Multiple critics or executable probes | Selective later extension | A measured error class is reduced enough to justify cost, failure modes and maintenance |

This placement table does not renumber TV-O1–TV-O5 or change their existing ordinal scores/LOC estimates. There is no new empirical reliability score. The runtime-heavy resources are model calls and execution/sandboxes; deterministic criterion reconciliation is comparatively small. The same application contract can be called by a local CLI or an existing worker. Use separate bounds for model requests, runner processes, concurrency, tenant allowance and cleanup. A queue or Temporal adapter remains a consumer choice under [ADR-0027][adr27].

Keep compact manifests and immutable references to large outputs; distinguish execution retry, reassessment and code correction budgets. No thousand-agent capacity claim follows from the local spike or the inspected controlled-provider Gateway load fixture.

### 9. What the bounded Stage A/B plan should decide

The previously discussed envelope was **24 Stage A invocations** (four candidates, two profiles, three repetitions), then a conditional **12 Stage B invocations plus three drift controls**, totaling 39 if all stages proceed. Those are proposed experiment counts, not executed model calls. Capability-qualification calls are separate. The new synthetic HTTP examples in this supplement are not a silent replacement for agreed benchmark candidates.

Within the existing planning milestone, specify:

1. **The exact OCR capability qualification:** binary/build, complete criterion admission, context/tool availability, structured per-criterion output, partial/failure behavior, no-publication path, usage and cancellation.
2. **A fair comparison:** comparable snapshots and information, predefined expected outcomes, independent repetitions, anonymous fixture IDs and no shared memory. If tool access differs, measure a whole profile rather than attributing its benefit only to the prompt.
3. **Separate measures:** ordinary defect detection, false positives/negatives, justified satisfaction, inconclusive rate, criterion coverage, repeatability and cost. Ordinary-review silence cannot count as satisfaction.
4. **A small model-free transport check:** fake provider responses for full-history tool turns, stable IDs, early EOF/partial output, cancellation and ambiguous dispatch. This is proposed new integration qualification; the existing 44/14 checks did not exercise Gateway or an OCR binary.
5. **A Stage B decision rule:** evidence must improve correctness or resolve uncertainty on the predefined oracle. A changed answer alone is not an improvement.

The plan should name any missing approved connection or adapter as a dependency. It does not require implementing the Gateway, a verifier service, a production SDK or all experimental profiles in 4–6 hours. Hassan's original Phase 0 report remains historical; subsequent decisions belong in separate dated records.

### 10. Remaining unknowns and publication limits

Unmeasured questions remain: the criteria reviewer's semantic advantage over ordinary review; how much change the exact managed OCR needs for a reliable criterion-output contract; whether evidence reduces errors or creates anchoring; whether a combined call is more economical; robustness to untrusted instructions; and production throughput/recovery of a future integration.

Three independent follow-up reviews checked evidence accounting, repository/architecture boundaries and Gateway protocol claims. The evidence reviewer also reran the bounded probes in a disposable copy. These reviews do not supply an independent LLM quality benchmark. This update leaves product code, accepted ADRs, original imports, provider configuration and licensing unchanged.

The new document was created through the installed Docs Protocol 0.6.2 preview/apply flow, using plan digest `sha256:02c75b26cccae2be0ac3b7c028f2dceadb15396218e3fd639bc771e87c41ab78`. Its direct study-index route is maintained. Documentation validation and CI outcomes are recorded in the PR for the corresponding commit; they do not qualify product E2E.

## Sources

All code links below use the inspected commit. Official documentation links are observations dated 2026-11-12 and can change independently. Local source/result hashes and upstream blob IDs are retained in the [evidence manifest](../../evidence/experiments/task-verification-2026-11-12/manifest.json).

[vision]: https://github.com/agent-teams-ai/engineering-research/blob/70c680af8b66369a2975a9db21ae081a94f62a5c/docs/studies/task-verification-vision-2026-11-10.md
[evaluation]: https://github.com/agent-teams-ai/engineering-research/blob/70c680af8b66369a2975a9db21ae081a94f62a5c/docs/studies/task-verification-evaluation-plan-2026-11-10.md
[adr72]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0072-atomic-work-completion-evaluation.md
[adr27]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0027-temporal-as-run-orchestration-adapter.md
[kodus-policy]: https://github.com/kodustech/kodus-ai/blob/f74afbb486bc5434c1190aeb8433d59f6f7847d2/libs/agents/business-validation/check-policy.ts
[kodus-judge]: https://github.com/kodustech/kodus-ai/blob/f74afbb486bc5434c1190aeb8433d59f6f7847d2/libs/agents/business-validation/judge/gap-check.ts
[ocr-model]: https://github.com/alibaba/open-code-review/blob/6386895e7cfac419bd7a9cf4795e8b824a6e3ced/internal/model/review.go
[ocr-manifest]: https://github.com/alibaba/open-code-review/blob/6386895e7cfac419bd7a9cf4795e8b824a6e3ced/internal/session/manifest.go
[ocr-build]: https://github.com/777genius/review-router/blob/7a079c382d8e98b426ee90a6b3764be2a21b4c49/tools/ocr/build.sh
[coderabbit]: https://docs.coderabbit.ai/pr-reviews/pre-merge-checks#github-check-runs
[pr-agent]: https://github.com/The-PR-Agent/pr-agent/blob/b226dc5633e8c6cf083384f4628fff5cfc0a91d2/pr_agent/algo/output_models.py
[rewardkit]: https://docs.harborframework.com/rewardkit/quick-start
[inspect]: https://inspect.aisi.org.uk/scoring-policy.html
[swebench]: https://github.com/SWE-bench/SWE-bench/blob/02e7a74ffd0b707aab73d203fe87bdc7c76afc8e/swebench/harness/grading.py
[gerrit]: https://gerrit-review.googlesource.com/Documentation/config-submit-requirements.html
[slsa]: https://slsa.dev/spec/v1.2/verifying-artifacts
[rr-runtime]: https://github.com/777genius/review-router/blob/7a079c382d8e98b426ee90a6b3764be2a21b4c49/src/codex-oauth/account-gateway-runtime.ts
[rr-transport]: https://github.com/777genius/review-router/blob/7a079c382d8e98b426ee90a6b3764be2a21b4c49/src/review-orchestration/infrastructure/account-gateway-model-transport.ts
[rr-managed]: https://github.com/777genius/review-router/blob/7a079c382d8e98b426ee90a6b3764be2a21b4c49/src/review-orchestration/infrastructure/ocr-review-managed-run.ts
[rr-patch]: https://github.com/777genius/review-router/blob/7a079c382d8e98b426ee90a6b3764be2a21b4c49/tools/ocr/patches/0003-add-internal-llm-managed-endpoint.patch
[rr-relay]: https://github.com/777genius/review-router-ai/blob/8d697434ad220dfd3e580b190e311726aa8366ed/apps/api/src/review-run-gateway-relay.ts
[gateway-sdk]: https://github.com/agent-teams-ai/account-gateway/blob/784f3550fe3b0d831a64b222445b520638cf22ac/packages/account-gateway/README.md
[fork]: https://github.com/agent-teams-ai/sub2api
[native-public]: https://github.com/agent-teams-ai/sub2api/blob/a19cbcbedda8eccbe82bb24224052a1e9eaab309/backend/internal/gatewaytransport/public.go
[native-wire]: https://github.com/agent-teams-ai/sub2api/blob/a19cbcbedda8eccbe82bb24224052a1e9eaab309/backend/internal/gatewaytransport/wire.go
[native-responses-tests]: https://github.com/agent-teams-ai/sub2api/blob/a19cbcbedda8eccbe82bb24224052a1e9eaab309/backend/internal/service/native_gateway_provider_responses_test.go
[native-lifetime]: https://github.com/agent-teams-ai/sub2api/blob/a19cbcbedda8eccbe82bb24224052a1e9eaab309/backend/internal/service/native_gateway_lifetime_test.go
[gateway-client-ci]: https://github.com/agent-teams-ai/account-gateway/actions/runs/43011587978
[gateway-fullstack-ci]: https://github.com/agent-teams-ai/account-gateway/actions/runs/43011587806
[gateway-workflow]: https://github.com/agent-teams-ai/account-gateway/blob/784f3550fe3b0d831a64b222445b520638cf22ac/.github/workflows/native-client-qualification.yaml
[gateway-qualification]: https://github.com/agent-teams-ai/account-gateway/blob/784f3550fe3b0d831a64b222445b520638cf22ac/docs/reference/scalable-native-inference-implementation-and-qualification.md
[rr-deployment]: https://github.com/777genius/review-router-ai/blob/8d697434ad220dfd3e580b190e311726aa8366ed/ai-docs/deployments/2026-11-10-usage-reconciliation-and-gateway-budget.md
[contract53]: https://github.com/777genius/review-router-ai/blob/8d697434ad220dfd3e580b190e311726aa8366ed/ai-docs/architecture/53-account-gateway-implementation-contract.md
[plan54]: https://github.com/777genius/review-router-ai/blob/8d697434ad220dfd3e580b190e311726aa8366ed/ai-docs/architecture/54-account-gateway-second-consumer-and-quota-plan.md
