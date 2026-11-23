---
id: research.competitors.waku-agent-source-audit-2026-11-23
type: research
status: active
owner: research/maintainers
summary: Pinned source review of Waku Agent, scoped Agent Teams architecture comparison, reusable mechanisms and rejected shortcuts.
---

# Waku Agent vs Agent Teams — source audit, 2026-11-23

## Scope, evidence and decision boundary

**Purpose.** Compare Waku Agent's implemented local assistant and separately licensed hosted deployment against the **current, partially implemented** Agent Runtime / Orchestrator / Platform and their **conditional selected architecture**. Answer two different questions: what exists today, and which design better serves the Agent Teams goal (teams of people and AI agents, several deployment profiles, and eventually thousands of *simultaneously active* executions).

**Observed revision, 2026-11-23:**

| Subject | Exact main SHA | Scope |
| --- | --- | --- |
| [Waku Agent](https://github.com/ShenSeanChen/waku-agent/tree/edc3bc55723a787fc1376f53fddbeaf58aa5883b) | edc3bc55723a787fc1376f53fddbeaf58aa5883b | local agent loop, graph, memory, always-on, tests, hosted source |
| [Agent Runtime](https://github.com/agent-teams-ai/agent-runtime/tree/0ce60d7474159396132752a625c914ffa87c5049) | 0ce60d7474159396132752a625c914ffa87c5049 | actual bounded feature code plus accepted architecture, readiness and separate capacity plan |
| [Orchestrator](https://github.com/agent-teams-ai/agent-teams-orchestrator/tree/c6ce98cd1a8ac1dd27ec877c018e5aa7cd5adff7) | c6ce98cd1a8ac1dd27ec877c018e5aa7cd5adff7 | small implemented feature slices, accepted domain/eventing/deployment plans |
| [Platform](https://github.com/agent-teams-ai/agent-teams-platform/tree/3bbc11ee08cf7c896ed4228a3fd3e6eb5ac5d745) | 3bbc11ee08cf7c896ed4228a3fd3e6eb5ac5d745 | implemented project-scope admission slice and selected/proposed platform ownership |

**Evidence classes.** Inspected source and selected committed test cases; author-documented status and limitations; architecture targets explicitly marked conditional; engineering inferences marked as risks. We **did not execute** Waku tests, Agent Teams tests, live provider calls, security probes, Kubernetes/VM deployment, or a comparative active-fleet benchmark. The Waku [status document][w-status] was last updated on 2026-11-20, earlier than the reviewed main SHA; treat its counts and untested-connector list as author-reported at that date, not independently current verified outcomes. No uninspected feature is scored zero and no absence is inferred from a missing search result.

**Product asymmetry.** Waku is a compact personal agent with some hosted tenant mechanisms and an experimental delegated coding subprocess. Agent Teams deliberately separates technical agent custody (Runtime), team/task/approval orchestration (Orchestrator) and customer/managed-installation authority (Platform). Waku explicitly does not present its local core as a completed multi-agent platform. A score for Agent Teams product-fit is not a judgment that Waku has failed its own single-user goal.

## Evidence-backed strengths worth retaining

| Finding | Evidence | Strength, context and boundary |
| --- | --- | --- |
| **W1 — bounded, observable loop** | [Agent loop][w-loop], [node factories][w-nodes] | Clear iteration cap, tools-off terminal reply, single observation callback, and scoped tool registry make control flow explainable and cheap to test. Runtime correctly does not copy a second full provider agent loop; its provider-neutral contracts delegate that to harnesses. |
| **W2 — deterministic optional graph** | [Graph engine][w-graph], [design][w-graph-design] | Plain-code routers, explicit fan-out/fan-in, collision detection and hard step/visit bounds. A graph node can wrap one *existing* agent turn rather than inventing a second agent kind. It is synchronous per wave, non-checkpointed and not an appropriate replacement for distributed Orchestrator workflows. |
| **W3 — task-relevant memory** | [retrieval gate][w-retrieval], [research-first digest][w-brain], [consolidation][w-consolidation] | Narrow retrieval decision, prefetch of prior research reports, digest instead of full re-read, and suppression of copied-back memories/transient operational state. The extra model call and fallback-to-retrieve are resource/privacy tradeoffs, not automatic wins. |
| **W4 — minimal local durability** | [inbox][w-events], [runs][w-runs], [outbox][w-outbox], [dispatcher][w-dispatcher] | Source-specific deduplication, claim/recover, durable pending messages and retries; receiver-aware GitHub comment markers. These are practical small-system mechanisms, not evidence of exactly-once side effects or fleet capacity. |
| **W5 — humane waiting/approval UX** | [approvals][w-approvals], [worker][w-worker] | Exact stored action/hash, owner response as an event, expiry/reminder, and one visible waiting queue. Valuable for Orchestrator's human decision experience; do not move approval authority into Runtime, a chat channel, or a notification adapter. |
| **W6 — pragmatic hosted isolation effort** | [tenant network and IDs][w-tenant], [route policy][w-policy], [deployment][w-hosted] | Explicit tenant container networking, gateway/secret separation, quotas, refusal cases and operational scripts; a real positive design effort. The documented topology starts on a single VM and is not a measured thousands-active-agent result. |
| **W7 — observable eval discipline** | [eval method][w-evals], [inbox tests][w-event-tests], [outbox tests][w-outbox-tests] | Deterministic contract checks with fake clock/transport are separate from subjective model-as-judge and observable per-turn receipts. Tests inspected, **not rerun**. Waku reports 4,739 offline passing cases as of its status date, while admitting important live-provider/Windows gaps. |

## Specific risks and anti-patterns to avoid

These are scoped source observations or *hypotheses requiring reproduction*, not blanket accusations of current exploitable vulnerabilities. Explicit counterevidence is included.

| ID | Evidence / type | Mechanism and failure to prevent in our owners |
| --- | --- | --- |
| **W-R1: prompt as privacy boundary** | [Worker shared-place note][w-shared]; inspected source; author reports a past Slack disclosure | The worker records that a shared Slack channel once received private memories and adds a **prompt instruction** to avoid repeating them, while candidly acknowledging this is not a wall. Hosted team homes and distinct memory keys are positive mitigating work. **Orchestrator/Platform:** authorize memory retrieval and output projection by trusted tenant, person, team, recipient and current grant; do not accept a prompt-only isolation claim. |
| **W-R2: ordinal replay keys for effectful calls** | [Run matching][w-runs], [next_key][w-outbox-key]; conditional inference | A reused run is found by first event ID, and send keys are run ID plus invocation ordinal. A replayed model may reorder or alter calls: the same ordinal need not identify the same semantic effect. The unique key does prevent duplicate *rows* and Waku documents possible duplicate *remote chat delivery* across an ACK crash. **Runtime/Orchestrator:** retain canonical request fingerprint, durable effect identity, unknown acceptance, reconciliation and long-lived tombstones; do not claim exactly once from a unique row alone. Reproduce differing replay batches before calling this an upstream defect. |
| **W-R3: concurrency and queue growth without fleet bounds** | [graph executor][w-graph], [due list][w-outbox], [one-home worker][w-worker]; source limit | Per-wave thread pool size grows with ready nodes; due outgoing rows are selected as one whole result; one OS-locked worker runs one home. These choices are reasonable in a personal assistant, but are not a fleet admission/fairness/slow-consumer solution. **Runtime C0–C3:** explicit budgets, bounded claims/pages, cancellation reserve and a real active-execution campaign; keep delivery distinct from resource admission. |
| **W-R4: connector metadata is not authority** | [Approval mode][w-approvals]; scoped policy risk | A user-installed connector may have read-only hints or a coarse stored connector-wide allow override. Waku separately asks for unknown writes and its hosted proxy denies particular writes, useful counterevidence. **Orchestrator/Runtime:** treating provider-declared metadata or chat labels as grants is unsafe; bind tool/side-effect policy to a trusted actor, target and revocable decision, and revalidate at dispatch. |
| **W-R5: a memory optimization that fails open** | [retrieval gate][w-retrieval]; inspected source | If parsing/model fails, retrieval is intentionally enabled for personal-assistant availability. It can be a reasonable optimization fallback **only after** an independent trusted scope filter. **Orchestrator product-memory owner:** authorization must fail closed; gate effectiveness and extra model latency require measurement, and storing/consolidating shared conversations needs explicit consent and retention. |
| **W-R6: tests mistaken for live qualification** | [Waku status][w-status], [evals][w-evals]; author-declared gaps | Offline SQLite/fake provider tests cover valuable mechanics, but Waku reports no Windows CI, no model-provider smoke gate and several not-yet-live Slack/hosted paths. **All three owners:** track exact source/binary/provider/OS/profile E2E, and never promote fake tests, queued/skipped jobs, or a clean architecture doc to deployed proof. |
| **W-R7: misleading blanket code-reuse assumption** | [Hosted license][w-hosted]; inspected license notice | Waku's core is described as MIT, but the hosted tree states **Elastic License 2.0**, and its design assets have other terms. Record architecture patterns as inspiration; copying hosted files into a third-party managed offering needs separate legal review. |

Our own main risks are different. **AT-R1 — architecture/document gravity:** Runtime has substantial real narrow code and tests, while Orchestrator and Platform still have much smaller implemented feature footprints than their target plans. A new context, service, ADR or protocol is not progress without a user-visible, end-to-end owner slice. **AT-R2 — a second owner or workflow engine:** never move product Task/Run/approval decisions into Runtime or recreate orchestration in Platform; selected Temporal/NATS/Host composition already has named owners. **AT-R3 — premature universal abstractions:** no homemade memory framework, generic event manager, or second graph scheduler merely because Waku's small mechanism is attractive. **AT-R4 — capacity by proxy:** thousands of provisioned agents, sleeping containers, queued work and Stage K simulated admission are not thousands of actively running agents. [Runtime readiness][ar-readiness], [capacity][ar-capacity], [Orchestrator profiles][or-profiles], [Platform boundary][pl-boundary].

## Bounded scorecard: quality, not a popularity ranking

Uses a **fixed, explicitly selected 13-criterion subset** of the shared [30-criterion method](../methodology/evaluation-methodology.md), anchors primarily 3/5/7/9 and **no aggregate score**. Cells show tentative expert judgments out of 10, **not measurements**. Waku = inspected **current code**, AT-current = limited **actual source path** where enough evidence exists, AT-target = **selected design assuming correct implementation**, *not current delivery*. These three assessment bases cannot be ranked as a whole-product leaderboard. The exact end-to-end production profile and cross-project benchmark are missing. Score confidence: Waku medium for inspected behavior (low for deployment/security reach), AT-current medium for the named narrow paths, AT-target low/medium for plan fit; confidence is **not** a multiplier. Dash means unscored/insufficient comparable evidence, not zero.

| Criterion | Waku current | AT current scoped | AT conditional target | Why |
| --- | ---: | ---: | ---: | --- |
| E1 Durable recovery | **7** | — | **9** | Waku requeues claimed events; AT target specifies durable generations, reconciled operations and recovery. No whole-run AT production E2E in this review. |
| E2 Correct side effects | **5** | **7*** | **9** | Waku row dedupe but ordinal effect identity and remote ACK gaps; AR/Platform have scoped receipt/digest code, target preserves uncertainty. |
| E3 Execution custody | **3** | **7*** | **9** | Waku one-home process lock is not cross-host fencing; AR has narrower custody evidence and detailed separate-generation authority. |
| E4 Lifecycle coordination | **5** | — | **9** | Waku bounded graph with local tool turns; AT target separates Run/work coordination from technical cancellation/recovery. |
| C2 Overload and admission | **3** | — | **7** | Local serial worker/batch; AT capacity is planned and Stage K did not run real workers. |
| C4 Independent scale/failure containment | **3** | — | **7** | Waku's local home/initial hosted VM vs AT coarse service roles; no target fleet proof. |
| S2 Tenant isolation | **5** | — | **9** | Waku container/network design is serious, shared-memory incident highlights limits; AT target scopes principals/tenants but is not qualified end-to-end. |
| S5 Human governance | **5** | — | **7** | Waku one-owner ask/yes; AT target multi-person attributable, revocable decisions; policies still need actual delivery. |
| D3 Fully Local baseline | **7** | — | **7** | Waku operational local state and loop; AT native local components selected but qualification open. |
| D4 Operational observability | **7** | — | **7** | Waku source-level trace/receipt/turn eval; AT target richer correlation but not a deployed operator product. |
| M1 Enforced responsibility boundaries | **7** | **7*** | **9** | Waku clear module seams but broad single product; AT narrow bounded-context feature code and explicit contract ownership. |
| P1 Collaborative work | **3** | — | **9** | Not Waku's stated core mission; team/human/AI coordination is AT's intentional product domain, still largely prospective. |
| P3 Harness portability | **5** | **7*** | **9** | Waku supports providers/delegated pi but admits provider compatibility gaps; AR provider-neutral real integrations are partial. |

*The AT-current 7s are **only** for directly inspected, narrow Runtime/Platform paths; they are not whole-product ratings. Change-cost M4 is deliberately **unscored** because no same-task LOC/time measurements exist. Waku's small source files earn credit for clarity, not an invented measured productivity advantage.*

### Architecture and vision verdict

**For the user-selected Agent Teams scope, the Agent Teams *target architecture* is substantially better matched.** Its separation of physical execution, technical authority, work/approval policy, tenancy and managed installation addresses failure modes Waku purposely leaves outside its local single-agent design. This is a **design-fit conclusion, not a claim that Agent Teams' current delivered product beats Waku today**.

**For immediate assistant usability and a teachable change surface, Waku currently leads.** It demonstrates an understandable loop, actual memory workflows, waiting UI and deterministic offline tests. Agent Teams pays an architectural complexity cost and needs to convert accepted contracts into narrowly scoped, tested user journeys faster. Neither codebase has demonstrated the identical thousands-active-execution deployment scenario here.

## Transferable ideas and ownership: adopt the lesson, not a second subsystem

| Priority and finding | Existing owner | Smallest option / acceptance and non-goal |
| --- | --- | --- |
| **P1 — single visible waiting ledger** (W5) | Orchestrator existing human decision/inbox/query owner; UI owned by its consuming app | Project pending decisions, timer-driven actions, failed outbound notifications and cancellations into one *read-only user view*, sourced from canonical owners. Proof: pause/restart/revoke and identical recipient-scoped state. **Not:** another queue, approval service or Platform Run authority. Reconcile with existing Attention Inbox work before opening implementation. |
| **P1 — deterministic and judged evaluations remain separate** (W7) | Runtime harness/qualification, Orchestrator workflow owner | Reuse E2E fixtures with fake time/provider for negative cases, then run real selected provider/profile smoke for release qualification. LLM judge is advisory for answer quality, never a substitute for security/recovery E2E. **Not:** a second scoring engine in research. |
| **P2 — scoped retrieval and prior-report digest** (W3) | Orchestrator/product-memory consumer with existing memory provider and policy ports | Spike fixed workload: direct authorized retrieval vs additional model gate; track latency/cost, retrieval precision, per-principal visibility and no duplicate retained facts. Stop if net loss; keep Hindsight/selected backend in its owner. **Not:** new Runtime memory aggregate or another global store. |
| **P2 — deterministic router semantics for simple workflows** (W2) | Orchestrator application/workflow owner | Prefer plain typed router functions in an existing workflow/Temporal activity for fixed small triage; test branch, fan-in, cancellation, replay. **Not:** porting Waku's graph engine or adding a competing durability/scheduler authority. |
| **P2 — trace graph + run receipts** (W1/W7) | Runtime observations, Orchestrator projection consumer | Correlate task/request, operation, execution generation, node span, provider and cost from existing authoritative events; mark unavailable/partial rather than invent outcomes. **Not:** replaying observability events as business commands. |
| **P3 — local simplicity without architectural forks** (W4/W6) | Runtime composition + Orchestrator Fully Local profile | Use existing profile's single-machine deployment to make installation and investigation legible; keep the selected native PostgreSQL, JetStream and Temporal decisions and the owner ports. **Not:** switch the distributed product to Waku's single SQLite home. |

## Rejection cases and optional small experiments

1. **Cross-scope recall.** A shared-channel message asks for a private memory after membership/grant revocation. Every retrieval, cache, streamed fragment and output/export must obey current trusted scope; prompt instructions alone must not carry policy.
2. **Lost ACK / changed replay.** Crash after remote tool or message accept but before receipt, then change the model's next tool sequence. Preserve semantic effect identity and truthful unknown; do not silently turn another action into the same ordinal key.
3. **Hot tenant + control.** One tenant floods ready nodes/outbox while another tenant cancels. Demonstrate bounded admission, backlog, protected control progress and no unauthorized cross-worker reuse.
4. **Approval revoked while parked.** Change approver membership, target or authorization revision between request and yes. Check current authority before dispatch and never re-prompt the model to revise an approved payload implicitly.
5. **Live harness proof.** Pinned model/protocol/OS actually submits a tool call, restarts and produces a truthful receipt; a fake tool/clock test is important but not that proof.

Proposed *investigation* cost, **not committed implementation estimate**: authorized retrieval gate/digest A/B 100–220 lines of isolated fixture and harness work, complexity **4/10**; workflow router contract comparison 80–180 lines, **3/10**; shared-memory/replay/approval negative E2E extensions 180–360 lines across existing owner tests, **6/10**. Avoid building new production modules unless an owner confirms an uncovered gap and a failing case.

## Product and review follow-through

- **Runtime:** existing execution/capacity/observability owners, [authority model][ar-execution], [readiness][ar-readiness], [capacity][ar-capacity]. Ordinary S1–S5 and capacity C0–C3 remain distinct. No capacity qualification is created by this dossier.
- **Orchestrator:** existing eventing, coordination, approvals and [profiles][or-profiles], [eventing][or-events]; evaluate memory, waiting and deterministic routing without inventing another Run engine or adopting Waku's one-home worker.
- **Platform:** managed authority, secret and tenant policy [boundary][pl-boundary], [deployment reconciliation][pl-install]; no duplicate orchestration or hosted Waku copy.
- **Shared lessons:** reuse the existing MR/GP antipattern identities in [patterns and failure lessons](../lessons/patterns-and-failure-lessons.md). This document is an evidence dossier, **not** an ADR, product plan, implementation approval or release gate.
- **Freshness:** recheck upstream before implementing any proposed pattern, on a relevant Waku upstream change, or by 2026-12-23. Re-run real tests before upgrading an inspected-test claim to executed evidence. Do not silently merge later source state into the frozen 2026-11-23 table.

## Pinned primary sources

[w-status]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/docs/status.md
[w-loop]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/waku/loop/agent.py#L101-L227
[w-graph]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/waku/graph/engine.py#L49-L214
[w-graph-design]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/docs/agent-graphs-design.md
[w-nodes]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/waku/graph/nodes.py
[w-retrieval]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/waku/memory/retrieval_gate.py#L36-L56
[w-brain]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/waku/memory/brain.py
[w-consolidation]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/waku/memory/consolidation.py
[w-events]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/waku/alwayson/events.py#L39-L92
[w-runs]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/waku/alwayson/runs.py#L70-L99
[w-outbox]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/waku/alwayson/outbox.py#L135-L198
[w-outbox-key]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/waku/alwayson/outbox.py#L184-L199
[w-dispatcher]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/waku/alwayson/dispatcher.py
[w-worker]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/waku/alwayson/worker.py
[w-shared]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/waku/alwayson/worker.py#L315-L334
[w-approvals]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/waku/alwayson/approvals.py#L203-L272
[w-hosted]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/hosted/README.md#L1-L75
[w-tenant]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/hosted/core/tenant.py#L23-L123
[w-policy]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/hosted/core/policy.py
[w-evals]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/docs/evals.md
[w-event-tests]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/evals/deterministic/test_event_inbox.py
[w-outbox-tests]: https://github.com/ShenSeanChen/waku-agent/blob/edc3bc55723a787fc1376f53fddbeaf58aa5883b/evals/deterministic/test_outbox.py
[ar-execution]: https://github.com/agent-teams-ai/agent-runtime/blob/0ce60d7474159396132752a625c914ffa87c5049/docs/architecture/execution-generation-model.md
[ar-readiness]: https://github.com/agent-teams-ai/agent-runtime/blob/0ce60d7474159396132752a625c914ffa87c5049/docs/architecture/readiness.md
[ar-capacity]: https://github.com/agent-teams-ai/agent-runtime/blob/0ce60d7474159396132752a625c914ffa87c5049/docs/architecture/capacity-admission-delivery-plan.md
[or-events]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/c6ce98cd1a8ac1dd27ec877c018e5aa7cd5adff7/docs/architecture/eventing-and-reliability.md
[or-profiles]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/c6ce98cd1a8ac1dd27ec877c018e5aa7cd5adff7/docs/architecture/deployment-profiles.md
[pl-boundary]: https://github.com/agent-teams-ai/agent-teams-platform/blob/3bbc11ee08cf7c896ed4228a3fd3e6eb5ac5d745/docs/architecture/platform-orchestrator-boundary.md
[pl-install]: https://github.com/agent-teams-ai/agent-teams-platform/blob/3bbc11ee08cf7c896ed4228a3fd3e6eb5ac5d745/docs/architecture/managed-installation-control.md
