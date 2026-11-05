---
id: research.methodology.evaluation
type: methodology
status: active
owner: research/maintainers
summary: Common criteria, evidence, comparison masks and rules for defensible technical scores.
---

# Shared technical evaluation: methodology and initial research universe

Initial maintained research method, 2026-11-03; assembled 2026-11-04. This method is not an accepted product architecture decision. Preserve the owning document protocol and cross-repository source identities.

## Recommendation

Maintain one small, versioned evidence register and derive two explicitly different views: **current implementation** and **prospective behavior assuming the selected plans are correctly implemented**. Use 30 common criteria in six dimensions, publish criterion scores out of 10 alongside evidence confidence and coverage, and keep deployment qualification separate. A useful conditional architecture comparison can exist before a common performance campaign; it must not imply measured throughput or production readiness. Every ranked comparison uses one fixed board-wide criterion mask, cohort, assessment basis and weighting policy.

Start with the existing Paperclip source review and Agent Teams evidence, then add a bounded, unscored watchlist. “Top competitors” means the most relevant systems to inspect for the declared product scenario, not the projects with the most stars. Preserve the existing runtime catalog of 52 systems as a source index; it is not a 52-product ranking or 52 completed audits.

The existing `Paperclip 7.6 / Agent Teams target 8.3` comparison is a historical, prospective expert judgment under its original rubric. Do not transplant those totals into this rubric or describe them as measured current implementation performance. Likewise preserve the earlier runtime robustness parity around 8.5 as a scoped assessment: Rust/native custody, receipts, truthful unknown outcomes, and backpressure are established Paperclip strengths, not unique Agent Teams advantages. A new criterion mapping may retain the underlying evidence without copying the old number.

## Evidence anchors already available

| Source | What it establishes | What it does not establish |
| --- | --- | --- |
| Runtime main `4bdc93a43b58469f60ca10c0dca512824650c8ac`, `docs/spikes/agent-runtime-industry-architecture-research.md` | A dated catalog of 52 projects, protocols and infrastructure components; targeted primary-source lessons; explicit breadth/depth distinction | 52 installed products, a common benchmark, or a market-share ranking |
| Same commit, `docs/architecture/agent-runtime-modular-research.md` and framework/library/durability appendices | Whole-harness/model/sandbox distinctions, independent library contracts, top-three choices, existing research limitations | Completion of the v3 S1–S5 program or fleet capacity qualification |
| Same commit, `docs/spikes/agent-runtime-antipattern-register.md` | MR-01…24 and GP-01…10 map historical cases, documented tradeoffs and engineering inferences to rejecting cases | That corrected upstream bugs still exist or that corresponding bugs exist in our implementation |
| Runtime `docs/spikes/stage-k-capacity-fairness-results.md` | Scoped PostgreSQL capacity-contract experiments; 32 claims / eight slots; finite fairness assumptions; fences, receipts and overload behavior | A running agent, provider, multi-host allocator, or thousands-active-agent benchmark; the experiment explicitly started none |
| Orchestrator snapshot `981dd836ca3d35b764561bdc11dc2e0544d83416`, `docs/architecture/deployment-profiles.md` | Three V1 target profiles, definition of running execution, independent roles, profile qualification blocks | Qualified SaaS, self-hosted or Fully Local deployments; those profiles are marked target/blocked |
| Paperclip checkout `61e8d5c7eb097664958e00c30ccd88bb51359043`, the retained pinned source checkout | Source review of the exact retained checkout and selected native/runner paths | A full system audit, deployed commercial edition inspection, or a common capacity campaign |

Retain these source SHAs and the reviewed Agent Teams repository SHAs in every final claim record. Local source paths are discovery pointers; immutable repository links are the reviewable evidence identities. A related shared pattern corpus also exists in Extension Foundation draft PR #55 at `70f03d3d9e134780f27268339a6729a7305a2363`, `docs/research/plugin-system-research-reference.md`; it remains unmerged and is not accepted authority. Reuse those PR-01…18 records where relevant rather than creating parallel lessons. Its historical OSS comparison is explicitly superseded/non-operative.

## Subject identity and comparable scope

A row identifies a **product or component + edition + version/commit + configuration + deployment + scenario + review date**. Never combine open-source library code, a proprietary enterprise control plane, and a roadmap into an imaginary best edition. A commercial capability supported only by official documentation is `vendor-documented`; its source was not inspected. Hosted implementation that cannot be inspected can still earn behavior evidence from a reproducible external test, with its access limitation stated.

Use three comparison cohorts:

1. **Product systems:** organization/work coordination plus agent execution and operations. Agent Teams and Paperclip are the starting comparison. LangSmith Deployment, CrewAI AMP, OpenHands product editions and Dify are candidate adjacent systems; exact product promises differ and need admission review.
2. **Runtime and framework components:** OpenHands SDK, Microsoft Agent Framework, LangGraph library, Mastra, PydanticAI, AI SDK HarnessAgent, OpenAI Agents SDK and Google ADK. Compare the relevant common criteria and explicit component scenarios, never award a component a full SaaS-platform score.
3. **Reference infrastructure:** Temporal, Restate, Dapr, NATS, Ray, storage, sandbox and telemetry systems. They supply mechanisms or lessons. They are not full Agent Teams competitors and do not enter the product leaderboard.

For each actual comparison, freeze its applicability mask, mandatory criteria, subject editions and deployment scope before examining scores. For a component cohort, use the relevant component mask; do not silently borrow a commercial control plane to fill library gaps. Product feature absence is not `not applicable` if that feature is required by the selected product scenario. Unsupported required behavior is an evidenced incompatibility; genuinely unreviewed behavior is unknown. State the exact gap without converting “not found” into “does not exist.”

## Common criteria: 30 in six dimensions

Each row gets one primary scoring home. A receipt may support several separate claims, but the same quality benefit must not be counted repeatedly. Within each dimension the five criteria have equal weight. Architecture terms such as Clean Architecture, SOLID, DRY and DDD are assessed through observable consequences, not vocabulary, language, class counts, package counts or diagram style. Criterion IDs are namespaced by this evaluation method: `criterion:C1` is not the runtime capacity delivery phase C1, and `criterion:S1` is not the ordinary delivery slice S1. Repository integration may prefix these short IDs to remove any ambiguity.

| ID | Criterion and concrete evaluation question | Boundary that prevents duplicate credit |
| --- | --- | --- |
| E1 | **Durable progress and recovery:** Does an acknowledged run retain recoverable state across process/host loss, with explicit resume/replay/reset semantics and supported state versions? | Measures progress truth; effect deduplication belongs to E2 and operating backup procedures to D5. |
| E2 | **Command and side-effect correctness:** Do duplicate, reordered and lost-ACK commands preserve intent, semantic fingerprints, deduplication horizons and truthful ambiguous-effect outcomes? | A queue's at-least-once claim alone earns no exactly-once credit. |
| E3 | **Execution ownership and custody:** Can only the current owner execute/publish; do generation fences, lease loss, cleanup, reclaim and quarantine prevent stale successors? | Technical execution ownership; policy decisions and user permissions are S1/S5. |
| E4 | **Lifecycle and coordination semantics:** Are cancellation, pause, interrupt, termination, output drain, fan-out/join and partial failure distinct and race-safe? | Score correct state transitions here; control-path latency under saturation is C2/C5. |
| E5 | **Evidence and result integrity:** Are result identity, provenance, ordering, gaps, reader cursors and redaction preserved through reconnect/export/reload, with unknown outcomes explicit? | Scores canonical evidence integrity; dashboards and diagnosis are D4. |
| C1 | **Sustained active-execution capacity:** What concurrent active-agent envelope meets declared latency, correctness and resource bounds on the pinned workload? | Only direct active-execution evidence; idle identities, queues and model-only claims do not count. |
| C2 | **Admission and overload behavior:** Are accepted backlog, work in progress and waiter counts bounded, with explicit rejection and protected cancellation/recovery progress? | Capacity admission and overload, not policy permissions or user cost accounting. |
| C3 | **Tenant fairness and quota allocation:** Do eligible tenants/teams make progress under skew, bursts and quota changes; are starvation assumptions and isolation budgets explicit? | Resource scheduling fairness only; data disclosure isolation is S2. |
| C4 | **Scaling and failure containment:** Can the system scale the pressured role independently while containing a hot tenant, CPU-heavy task, worker crash or database limit? | Judge observed placement/coupling consequences, not number of services or libraries. |
| C5 | **Streaming and resource efficiency:** Are buffers, fan-out, output retention and slow readers bounded; what CPU, memory, connection and storage cost accompanies the declared envelope? | Efficiency and flow control; stream semantic correctness is E5. |
| S1 | **Identity and authorization coverage:** Are human, service and agent principals bound to trusted tenant/context on every read, command, cache, direct API and remote continuation path? | Authorization enforcement coverage only; approval UX is S5. |
| S2 | **Tenant and organization isolation:** Can one tenant observe/control another tenant's state through queries, subscriptions, jobs, indexes, storage, caches or shared workers? | Data/control isolation; scheduler fairness is C3 and process sandbox containment is S3. |
| S3 | **Execution and egress confinement:** Does the selected threat model constrain filesystem, subprocesses, network, tool capabilities and hostile extensions at the actual enforcement boundary? | Imports, container labels or a sandbox brand alone are not isolation evidence. |
| S4 | **Credential and sensitive-data custody:** Are secrets scoped, rotated/revoked, transported and retained safely across provider, plugin, broker, log and export paths? | Secret minimization and custody; general schema-safe output transformation is E5. |
| S5 | **Human governance and attributable decisions:** Can authorized people approve, constrain, revoke and audit consequential actions with explicit scope and stale-approval behavior? | Records policy intent and decision attribution; E3/E4 test runtime execution of those decisions. |
| D1 | **Managed SaaS operability:** Does the evaluated SaaS edition provide the promised availability, tenant onboarding, capacity controls and operator recovery under a declared service envelope? | No credit for a self-hosted image or a cloud roadmap. SLA text is a promise, not observed availability. |
| D2 | **Self-hosted autonomy:** Can customers install, operate, upgrade and recover the promised server profile without undeclared vendor accounts, private services or custody dependencies? | Self-hosted server operation; embedded/local behavior is D3. |
| D3 | **Fully Local baseline:** Can baseline orchestration start, restart and retain local authority/state without required vendor cloud access, with explicit local model/provider choices? | Local orchestration is separate from optional remote inference and from enterprise throughput. |
| D4 | **Operational visibility and diagnosis:** Can operators reconstruct a failure, inspect queue/capacity pressure and correlate a user operation with execution without observation changing canonical decisions? | Diagnosis and operator usability; integrity of the underlying receipt is E5. |
| D5 | **Upgrade, recovery and maintenance:** Are migrations, roll-forward/rollback limits, backup/restore, retention and compatibility windows executable and operator-owned? | Operations procedures; public SDK caller/implementer contracts belong to M5. |
| M1 | **Enforced responsibility and dependency boundaries:** Do source/build/runtime checks keep domain/application decisions independent of providers, persistence and host composition, with one invariant owner? | Functional substitution is M2; package count and DDD terminology earn no points. |
| M2 | **Useful reusable modules and substitutability:** Can a real external consumer install/use a library and implement its required port without private monorepo paths or mandatory unrelated host/provider dependencies? | Reuse and substitution; integration coverage is P3/P4. |
| M3 | **Domain model proportionality:** Do aggregates, contexts and transaction boundaries protect real invariants with explicit language/ownership where needed, without generic CRUD domains or artificial layers? | Scores the fit of ownership to behavior; do not reward more contexts. |
| M4 | **Change cost and boilerplate:** For fixed representative changes, how much handwritten production code, cross-module knowledge, ceremony and repeated mapping are required? | LOC is a cost observation within a named task, not a quality proxy across languages or whole products. |
| M5 | **Public contract and extension evolution:** Are caller, implementer, wire, capability and persisted-state contracts versioned independently with compatibility checks and a usable migration route? | Public extension evolution; fleet deployment rollback is D5. |
| P1 | **Useful collaborative work:** Can a reproducible multi-agent task with dependencies, interruption and verification finish correctly with intelligible ownership and human handoff? | Outcome on a fixed task; throughput is C1 and permission policy is S1/S5. |
| P2 | **Multi-user and multi-organization workflow:** Can concurrent users manage teams, roles, tasks and organization boundaries without losing updates, accountability or usable coordination? | Collaboration behavior; hostile isolation correctness is S2. |
| P3 | **Model and whole-harness portability:** Can the selected real model and harness alternatives be integrated with truthful capability/continuation differences and repeatable outcome semantics? | Interoperability on declared fixtures, not raw vendor count; reusable library architecture is M2. |
| P4 | **Tools, artifacts and workspace interoperability:** Can supported tools/protocols and owned/borrowed workspaces exchange durable artifacts with explicit compatibility and lifecycle boundaries? | Integration completeness; secret confinement is S3/S4 and physical custody safety is E3. |
| P5 | **Usage, cost and budget control:** Are usage attribution, reservations, reconciliation, budget boundaries and corrections accurate enough for the promised user/org model? | Commercial consumption accounting, not runtime slot quotas or fairness. |

M4 should use two or three stable change exercises: add one harness adapter; add one business use case with a persistence change; implement one public store adapter from an external package. Record manual production and test/fixture LOC separately, touched boundaries, dependency additions and reviewer effort. Keep generated/vendor code and unrelated prerequisites out of the estimate. Do not build all exercises merely to fill the first board; first record known source evidence and the missing observation.

## Rubric and evidence

### Quality anchors

| Score | Meaning within the declared criterion and scenario |
| --- | --- |
| 0 | Reproducibly absent/incompatible or fails the mandatory promise; concrete negative evidence identifies the scope. Never use zero for missing research. |
| 3 | Partial/fragile behavior; substantial manual workarounds or routine failure cases violate the intended scenario. |
| 5 | Useful standard-path behavior within a bounded scope; important edge cases, restrictions or operational costs remain. |
| 7 | Strong behavior across the required ordinary and failure paths, with manageable explicit restrictions. |
| 9 | Meets demanding scenario requirements with robust behavior under representative contention, recovery and sustained operation, and no material known gap within that scope. |
| 10 | Exceeds the demanding requirements with demonstrated margin and unusually complete operational behavior for the exact scope. It does not mean universal correctness. |

Use anchor values by default. An intervening integer requires a written reason. Do not enter subjective tenths for individual cells. Optional `[lower, upper]` bounds are the reviewer's plausible quality range, not a statistical confidence interval. Arithmetic totals may show one decimal because of averaging, with the rounding rule published; small decimal differences are not evidence of a real lead. A criterion-specific acceptance statement explains how the global anchors apply, including the required failures and resource envelope.

Source/code evidence can support an advisory architecture assessment without a common benchmark. A design-only claim belongs to the prospective view or an explicitly conditional architecture comparison, never to the observed implementation view. In a conditional view the same anchors mean expected behavior if the selected design is implemented correctly; evidence confidence describes uncertainty in that forecast. Documentation completeness is evidence quality, not product quality credit. A passing narrow unit test cannot establish a product deployment. Keep `DESIGNED`, `IMPLEMENTED` and `QUALIFIED` in their existing owner vocabulary.

### Evidence status and confidence, separately from quality

Every criterion stores `status = scored | unknown | not-applicable`, source pointers, rationale, limitations, last review and next review. Unknown has `score: null`. An N/A entry has an applicability rationale approved for the cohort before scores are inspected.

Evidence kinds are not a universal quality ladder: `design`, `official-documentation`, `pinned-source`, `maintainer-test-artifact`, `reviewer-reproduced-test`, `deployment-observation`. Each supports different claims. A deterministic source invariant can be high-confidence without a SaaS soak; a marketing statement cannot verify tenant isolation. Record at least:

- **High:** the evidence directly supports the exact claim/version/configuration and scope; relevant negative cases and counterevidence were checked. An empirical claim needs a retained reproducible artifact or appropriately scoped observed deployment evidence.
- **Medium:** meaningful source/test/documentation evidence supports the claim, but a material path, edition or deployed configuration has not been verified.
- **Low:** incomplete or indirect evidence, rolling docs, one unreplicated observation, or unresolved contradictions. Do not hide this by multiplying the quality score by confidence.


For numeric confidence displays use the same ordinal bands: low = 3/10, medium = 6/10, high = 9/10. These values are labels for the stated evidence depth, not measured probabilities or an extra quality multiplier.

Also store review depth: `watchlist`, `documentation`, `targeted-source`, `scoped-reproduction`, `deployment-qualified`. Whole-project confidence cannot be inferred from one deeply audited path. Source authorship and reproduction independence are separate flags; multiple summaries of the same upstream claim are one evidence origin.

Coverage is `weight of scored applicable criteria / weight of all applicable criteria`, shown overall and per dimension. Confidence distribution is shown separately, for example “70% high / 20% medium / 10% low among scored weight.” Neither becomes a hidden score multiplier. Unknown and N/A counts remain visible. If a criterion contains a mixture of supported and unknown subpaths, state that limitation; do not silently average it into a complete high-confidence claim.

## Scenarios and weighting

Freeze scenarios and criterion applicability before scoring. The following profile IDs deliberately avoid the existing runtime S1–S5 and capacity C0–C3 identifiers.

| Profile | Purpose and required shape | Principal qualification claims |
| --- | --- | --- |
| `local-v1` | One local user with a small real team, durable local authority, restart/reconnect and baseline operation without vendor cloud dependence. Local capacity follows a declared device budget. | D3 plus E1–E5 and relevant S3/S4; do not require enterprise concurrency on a laptop. |
| `selfhost-team` | Concurrent users and organizations on customer-operated infrastructure; declared identity, storage, upgrade and recovery dependencies. | D2, S1/S2/S5, E1–E5 and operational envelope. |
| `saas-fleet` | Multiple independent tenants/users, skewed workloads and many simultaneous active agents across Runs, including concentrated load within one tenant. | C1–C5, S1/S2 and E1–E5, managed operations. |
| `component-embed` | A named runtime/framework/library embedded by an external consumer, with one selected local/server host and public caller/implementer boundaries. | E, relevant S/C, M and selected P criteria; full SaaS criteria are outside this cohort. |
| `product-v1` | The whole product promise across Managed SaaS, standalone self-hosted and Fully Local, with the required multi-user/multi-organization server behavior. | All 30 criteria are applicable; D1/D2/D3 cannot be marked N/A merely because an evaluated product lacks a required profile. |

The **prespecified default**, a preference convention rather than an objectively neutral truth, is equal dimensions (1/6 each), equal criteria within each dimension. Criterion selection and grouping are also explicit judgments. For a narrower comparison, publish the selected criterion mask and normalize weights once for the entire board, not once per row. This limits advantages caused by inventing many nearly identical criteria for our strongest area. Do not change weights or masks after seeing the result.

Profile reports primarily use requirement gates and dimension vectors. Optional scenario-specific weights must be user/owner-approved from workload importance before scores, published next to the equal-weight reference, and versioned. Show whether conclusions change when dimension weights vary by ±25% relative and are renormalized; if they do, report “preference-sensitive.” A local-only mask excludes D1/D2 for every row and cannot be advertised as whole-product V1 fitness; `product-v1` includes all three deployment criteria. Non-compensable failures, such as a known tenant escape under a hostile multi-tenant promise, are explicit scenario failures; a high maintainability score cannot compensate.

### Advisory board versus qualification board

The **current implementation view** can immediately display scored, source-backed cells, dimension summaries and gaps. It remains useful even when C1 is unknown. A dimension summary includes its coverage and only compares the same applicable criteria; missing cells are not zero. A bounded architecture-only view of M1–M5 may carry its own advisory summary without a fleet benchmark.

The proposed 80% scored-weight / 60% per-dimension thresholds are provisional prompts for considering a partial advisory summary. They do not automatically admit, rank, qualify or release a product. They may be simplified or discarded after the first two reviews. If a covered-scope mean is displayed, name its exact scored denominator and unknown weight; different denominators cannot share an ordinal ranking. Optional whole-mask uncertainty bounds may assign unknown weight the full mathematical 0–10 range solely to show what remains unresolved; unknown cells retain `score: null` and are never entered as zero. These are sensitivity bounds, not statistical intervals or complete quality estimates.

The **documented target view** assesses expected product behavior and tradeoffs assuming the selected plans are implemented correctly. It does not score how polished, long or specific the documents are. Keep unresolved choices as explicit branches or unknowns: do not invent IAM, provider, quota, aggregate or deployment semantics to complete a score. Confidence expresses how well sources support the forecast. It has no measured-capacity credit and no implementation rank. C1 remains unknown: an intended active-agent number is a scenario requirement, not a quality observation. Link target claims to implementation evidence or open gaps; ADR acceptance never auto-promotes a target into executed evidence.

The **deployment qualification view** records pass/fail/unknown for the advertised exact profile. A claim of superiority at thousands of simultaneously active agents requires a common, retained campaign. It is a separate eligibility gate for a capacity ranking, not a condition that prevents publishing a useful source-backed architecture review.

An ordinal board requires **one identical global criterion mask, mandatory set, weights, scenario and assessment basis across every row**, with fixed edition/configuration identities. Every criterion in that ranked mask must be scored for every row; unresolved mandatory branches or incomparable behavior prevent rank. A narrower complete mask can support a named architecture comparison even while full-product evidence remains unknown. The narrowing must be declared before scoring and must not be advertised as a whole-fleet result. Pairwise notes with different masks remain separate comparisons and cannot be combined into a global order. Overlapping quality ranges or preference-sensitive ordering support an unresolved result or tie.

### Practical first comparison

Publish a 30-row **initial evidence and prospective-fitness matrix** with separate columns: Paperclip current source assessment and Agent Teams prospective behavior under selected plans. Record Agent Teams current implementation evidence separately in its dossier; it does not inherit the target scores. Each cell shows a score/range or unknown, confidence and the claim link. The shared `product-v1` applicability mask contains all 30 criteria. The matrix has no mixed-state ordinal total. This makes the substantive evidence useful immediately, preserves our gaps and does not penalize unfinished code in the requested conditional comparison.

For a directly comparable advisory summary, publish a separately named **conditional architecture comparison**: assume each subject's selected documented architecture is correctly implemented and compare expected behavior using the same scenario and anchors. Paperclip uses the architecture actually represented by the pinned source; unselected roadmap improvements are excluded. Agent Teams uses the selected plans and retains open decisions. A suitable initial narrow mask is M1–M5, or a broader preregistered set where both sides have sufficient claim coverage. Both rows have the same conditional basis; current source evidence affects confidence rather than silently changing the question. No benchmark is required to compare static dependency boundaries, useful module reuse, modeling proportionality or contract evolution. Capacity C1 and live operational qualification remain outside any architecture-only conclusion.

The historical 7.6/8.3 totals stay attached to their original assessment and assumptions; neither the new matrix nor the conditional comparison inherits them. The initial artifact is an assessment plus an unscored watchlist, not a completed TOP competitor ranking.

## What “thousands active” requires

Reuse the Orchestrator definition: running execution is current admitted execution evidenced by Agent Runtime's Published Language. Stored agent definitions, idle sessions, registered workers, queued work and open browser connections are separate counters. A process kept alive without useful admitted work does not establish the target. Record active agent participants, active Runs, per-Run shape and unique execution identities; do not split a semantic Run to manufacture a throughput number.

A campaign must name a load target in the thousands, duration, exact hardware, limits, deployment topology, provider quotas, payload/output distribution, token/tool mix, model latency, read/write/control rates, stored-state size and tenant skew. The final owner decides exact load and SLO numbers before the run. An initial design could test plateaus such as 1,000 and 3,000 active participants, but those are proposed experiment inputs, not approved release capacity.

Retain time series for active, queued, paused, recovering and unknown states separately; end-to-end latency percentiles; task correctness; duplicate effects; data loss; cancellation/revocation propagation; oldest eligible tenant wait; per-role CPU/memory/connections; bounded backlog/buffers; and cost per completed workload. Count in-flight provider work according to the declared active definition and report provider-wait time separately so a large number of blocked calls does not conceal weak useful throughput.

Use two clearly named layers: deterministic simulated-provider control-plane campaigns and calibrated real runtime/provider campaigns. Synthetic contracts reveal ownership and fairness bugs without establishing real agent throughput. For full qualification include process loss, stale owner, partition/reconnect, slow consumer, hot tenant, quota shrink, provider throttling, durable-store restart and recovery; keep comparison semantics and budgets equivalent. Record one-tenant concentration as well as many-tenant distribution. Per-Run maximum and aggregate concurrent Runs are different promises.

Agent Runtime v3 S1–S5 remains the bounded ordinary delivery program. C0–C3 remains the capacity delivery owner. Fleet evidence does not become a retroactive prerequisite for pure S1/S2 libraries. Stage K contributes scoped fairness/correctness evidence only; it cannot fill C1 with a thousands-agent score.

## Research universe

The maintained [watchlist](../competitors/competitor-watchlist.md) separates products, frameworks and infrastructure and records incomplete audit status.

## Patterns, antipatterns and action ownership

Do not create a second competing memory store. Link each shared finding to the existing MR/K/GP/SR record where one exists, plus the affected criterion, exact source status, transferable invariant, current owner and rejecting case. The shared record adds cross-product applicability and review freshness; owning repository decisions remain authoritative.

Useful initial mappings include MAF provider extraction and Pydantic slim → M1/M2; OpenHands state/harness/environment split → M1/E1; LangGraph checkpoint-conformance → E1/M5; whole-harness separation in AI SDK → P3/M2; Temporal/Restate external-effect limits → E2; Dapr actor concurrency and Ray logical resources → C2/C4; OpenClaw's declared trust model → S2; historical Mastra concurrent resume repair → E3. These are focused source lessons, not whole-product scores. Reuse existing exact immutable sources and historical status from the runtime register.

Prioritize actions by **requirement impact × exposure × decision urgency**, stated qualitatively. Avoid numerical ROI invented from unsupported probabilities. The first action batch should be:

1. **P0 / qualification truth:** pin subjects and correct any target/current or active/idle conflation; preserve existing open gates OD-004, OD-006, OD-012, OD-024 and runtime #245/#246 with their owning status. Do not mark them resolved because this research exists.
2. **P0 / own missing guarantees:** convert the material open runtime capability, aggregate/ownership, identity/tenant and side-effect questions into owner-specific rejecting cases and evidence needs. Their implementation belongs to existing slices/decisions.
3. **P1 / fair comparison:** map the Paperclip and own evidence to the 30 cells with scoped confidence and negative evidence; include an explicit strength and counterexample against each claimed competitive advantage.
4. **P1 / capacity uncertainty:** agree C0–C3 campaign inputs and instrumentation; keep Stage K as a correctness/fairness precursor. Independently test role-level pressure and protected control progress when its owning feature exists.
5. **P2 / next information:** review one direct/adjacent product at a time, selected by the decision it can change. Start with LangSmith Deployment or CrewAI AMP after Paperclip mapping, not with a 52-project scoring sprint.

Each opportunity record is concrete: source finding → our gap/hypothesis → owner/issue → smallest evidence or implementation step → acceptance/rejection condition → effort range → status. Mark its effect as **already required**, **proposed future acceptance**, or **new evidence of a defect**; a proposal names the activation/profile boundary and existing owner. This research does not revoke existing scoped qualification or introduce a new gate by itself; only the owning accepted change can alter future acceptance. Reconcile overlaps before adding requirements. “Use Rust”, “add more microservices”, “adopt DDD everywhere”, “build a generic AgentManager”, “make all effects exactly once” and “increase package count” are not actionable findings.

## Freshness and review

Use the [maintenance workflow](research-maintenance.md) for dated review queues, corrections, independent critics and update publication.

## Two real methodology choices, each with top three options

Scores below are ordinal planning judgments for this evaluation workflow only, not product ratings or probabilities. Confidence and expected reliability are better at 10; implementation/maintenance complexity is worse at 10. Confidence in the recommendation is distinct from confidence in its size estimate. **Every option delivers this documentation change with 0 new production TypeScript LOC.** The conditional future ranges describe only optional manually written repository tooling after existing mechanisms are inventoried; they are low-confidence, unvalidated hypotheses (sizing confidence 3/10), not delivery estimates or prerequisites. They exclude docs, tests/fixtures, generated/vendor code, benchmark infrastructure and Agent Teams product work. Record reused code, new code and unresolved/excluded work separately if an automation proposal is later pursued; review/test/qualification/operations effort remains separate and is not quantified here.

### Choice A: how to summarize multiple criteria

| Option | Confidence / reliability / complexity, all /10 | Current production TS LOC; conditional optional tooling | Tradeoff and rejecting evidence |
| --- | --- | --- | --- |
| A1. Vectors and same-mask equal-weight advisory summaries — recommended | 9 / 8 / 2 | **0**; optional 60–140 only if existing checks cannot validate/derive the agreed summary | Easy to inspect; no single globally optimal product. Reject an aggregate when unknown coverage or plausible weights make it misleading; keep vectors. |
| A2. Prespecified scenario weights with sensitivity report | 8 / 8 / 4 | **0**; optional 100–220 for summary/sensitivity tooling | Better matches different usage priorities but adds policy and governance. Adopt when real priorities change an actual decision, and publish the default reference weights. |
| A3. Manual pairwise dominance, no composite total | 8 / 9 / 2 | **0**; optional 180–350 only for a later demanded dominance/outranking algorithm | Small manual comparisons can be simpler than totals; incomparability is a useful result. An automated outranking engine is a separate, more complex proposal, not part of this option. |

### Choice B: how to keep evidence current

| Option | Confidence / reliability / complexity, all /10 | Current production TS LOC; conditional optional tooling | Tradeoff and rejecting evidence |
| --- | --- | --- | --- |
| B1. Git-reviewed records and dated manual refresh queue — recommended | 9 / 8 / 2 | **0**; optional 100–200 for missing structural checks only | Minimal mechanism, clear ownership. Escalate only if measured missed updates or reviewer effort makes manual triage unreliable. |
| B2. Existing release/diff notifications plus human claim and score review | 8 / 8 / 4 | **0** using existing notifications/CI; optional 250–500 only if a demonstrated gap requires a custom collector | Reduces missed releases; false positives and stale notifications still require human triage. No automatic score mutation. Adopt once a real refresh backlog justifies it. |
| B3. On-demand agent-assisted extraction and candidate scoring in citation-preserving drafts; human approval | 7 / 7 / 4 | **0** using the current assistant and reviewed files/PRs; optional 150–350 for later draft-record integration | Useful when drafting is the bottleneck. Candidate scores are proposals: a reviewer verifies sources, counterevidence, scope and scores before publication. A blind sample's correction rate can confirm or reject its usefulness. |

A1+B1 is the smallest useful start, with B3 already available as an on-demand drafting aid. All three refresh options preserve human authority over source claims, scores and publication; fully autonomous publishing is outside this task, not the third comparison option. The method itself creates no scheduler or new product service. The separately enabled existing-assistant weekly triage task is recorded in [maintenance](research-maintenance.md); it prepares source-linked drafts and does not merge or accept scores. Scores and source changes remain ordinary reviewed repository changes.

## Minimal data shape and validation scope

The companion [evaluation-record schema](../../data/evaluation-record.schema.json) is a compact draft schema for one versioned subject assessment. It deliberately does not define a plugin platform, graph database, scraper, scheduler or scoring engine. The schema supports the initial unknown watchlist and partial advisory reviews without manufacturing zeroes.

The first records can be checked through existing tooling and review, with no new checker. If a real validation gap later justifies a dependency-free check, its scope is unique IDs, known criterion/scenario/method versions, valid integer scores, null unknowns, N/A reasons, source/claim links, evidence dates, fixed scope/edition identity, per-cell rationale and declared applicability. A summary may calculate coverage and freshness. A ranked board must compare identical comparison-scope objects and complete global masks; differing pairwise masks never generate a global order. It must refuse a current implementation score based solely on design claims or a mixed-basis ordinal board, refuse a benchmark/qualification claim without a campaign artifact, and never infer ranking or freshness from a live HEAD link. Semantic truth still requires review.

Start with one methodology file, one shared criteria data file if needed, one registry and one evidence record per actual subject review. Reuse the existing issue/ADR/research links for lessons and actions. Add automation only after a real maintenance problem appears.
