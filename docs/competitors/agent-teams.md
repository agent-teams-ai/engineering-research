---
id: research.competitors.agent-teams
type: research
status: active
owner: research/maintainers
summary: Separate current evidence, conditional target design and unresolved product-owner decisions.
---

# Agent Teams

Assessment baseline: 2026-11-03 source snapshots. Repository assembly: 2026-11-04. This dossier evaluates the selected architecture under the user's explicit assumption that it is correctly implemented. It separately identifies current evidence and choices that the plans have not yet made. It does not substitute an optimistic architecture for deployment qualification.

## Targeted owner-plan follow-up — 2026-11-11

**Do not refresh the 2026-11-03 subject snapshot below.** A scoped GitHub source comparison checked the following later owners, without treating a selected plan, accepted decision, PR or isolated component test as deployed production behavior.

| Owner | Original reviewed source → current observed source | Effect on the selected target |
| --- | --- | --- |
| **Runtime v3** | [`4bdc93a`](https://github.com/agent-teams-ai/agent-runtime/tree/4bdc93a43b58469f60ca10c0dca512824650c8ac) → [`f990acc`](https://github.com/agent-teams-ai/agent-runtime/tree/f990acc26e1b8071ae22d0b87a2ddd3672be8e2e) (`main`, 2026-11-06). Direct blob checks found [ordinary S1–S5 program](https://github.com/agent-teams-ai/agent-runtime/blob/f990acc26e1b8071ae22d0b87a2ddd3672be8e2e/docs/architecture/agent-runtime-architecture-program-plan.md) and the separate [C0–C3 capacity plan](https://github.com/agent-teams-ai/agent-runtime/blob/f990acc26e1b8071ae22d0b87a2ddd3672be8e2e/docs/architecture/capacity-admission-delivery-plan.md) byte-identical to those at `4bdc93a`. [Research integration PR #248](https://github.com/agent-teams-ai/agent-runtime/pull/248) remains open and unmerged at `4f5811c9`. | No new Runtime selection or capacity qualification was found in these owner-plan files. Stage K still describes a modeled PostgreSQL experiment with **no real workers started**. |
| **Orchestrator** | [`981dd83`](https://github.com/agent-teams-ai/agent-teams-orchestrator/tree/981dd836ca3d35b764561bdc11dc2e0544d83416) → [`a34587b`](https://github.com/agent-teams-ai/agent-teams-orchestrator/tree/a34587b313e656eeb43d755b4a4f08c40dff2116) (`main`, 2026-11-06). The [added accepted ADR-0116](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0116-native-temporal-for-fully-local-durable-workflows.md) records the owner's **2026-10-23 approval** of full native Temporal Server plus PostgreSQL behind engine-independent ports for Fully Local V1, resolving only OD-035's engine selection; the [profile](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/architecture/deployment-profiles.md) still marks Fully Local **target / qualification blocked**. [Research integration PR #94](https://github.com/agent-teams-ai/agent-teams-orchestrator/pull/94) remains open at `310bf70d`. | **New owner decision recorded, not a new proven deployed capability.** The ADR credits its separately reported Linux/macOS/Windows native component exercises and retains OS packaging, upgrade/restore and active-capacity obligations. It does not merge ordinary Runtime S1–S5 and capacity C0–C3 or authorize a second business Run engine. |
| **Platform** | [`7f6eb37`](https://github.com/agent-teams-ai/agent-teams-platform/tree/7f6eb3746c07dc01751c29a8dbc62e50b5f7ad6d) → same `main` commit as inspected. [Research integration PR #59](https://github.com/agent-teams-ai/agent-teams-platform/pull/59) remains open at `ff664eae`. | No changed Platform-main architecture selection or released profile qualification established by this bounded check. |

**Score consequence:** No reassessment of this dossier's whole-product target, no new production capability, and no thousands-active-agent result is claimed. The later native-Temporal selection can inform owner-local deployment acceptance and prospective evidence coverage, but not upgrade the existing D3 or C1 scores without the common rubric, actual profile and corresponding qualification. The Paperclip [accounting correction](paperclip.md#targeted-source-change-triage--2026-11-11) likewise removes an obsolete competitive claim rather than proving our planned hard quotas are already implemented.

## Subject and user requirements

The subject is the combined Runtime v3, Orchestrator, and Platform product architecture. The intended workload includes thousands of simultaneously active agents across tenants and concurrent Runs; SaaS, standalone self-hosted, and Fully Local V1; and reusable libraries with narrow responsibilities and little avoidable boilerplate. Popularity and programming-language preference are outside the assessment.

| Repository | Exact reviewed baseline | Meaning |
| --- | --- | --- |
| Runtime | [4bdc93a](https://github.com/agent-teams-ai/agent-runtime/tree/4bdc93a43b58469f60ca10c0dca512824650c8ac) | v3 ordinary execution program S1–S5, distinct capacity delivery C0–C3, reusable runtime/library design |
| Orchestrator | [981dd83](https://github.com/agent-teams-ai/agent-teams-orchestrator/tree/981dd836ca3d35b764561bdc11dc2e0544d83416) | Product domains, accepted backend roles, product coordination, consumption and identity decisions |
| Platform | [7f6eb37](https://github.com/agent-teams-ai/agent-teams-platform/tree/7f6eb3746c07dc01751c29a8dbc62e50b5f7ad6d) | Commercial/product authority, deployment management, shared backend and local profiles |

Read the [ordinary program](https://github.com/agent-teams-ai/agent-runtime/blob/4bdc93a43b58469f60ca10c0dca512824650c8ac/docs/architecture/agent-runtime-architecture-program-plan.md), [capacity delivery](https://github.com/agent-teams-ai/agent-runtime/blob/4bdc93a43b58469f60ca10c0dca512824650c8ac/docs/architecture/capacity-admission-delivery-plan.md), [Orchestrator profiles](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/architecture/deployment-profiles.md), and [Platform profile decision](https://github.com/agent-teams-ai/agent-teams-platform/blob/7f6eb3746c07dc01751c29a8dbc62e50b5f7ad6d/docs/decisions/0010-fully-local-v1-and-shared-backend-profiles.md). A large fleet can comprise many independent Runs, including several belonging to one tenant/team. Thousands of participants inside one Run is a different promise and is not silently added to this baseline.

## Credible architectural advantages, conditionally

| Selected direction | Why it can outperform the reviewed Paperclip shape | Evidence and remaining limit |
| --- | --- | --- |
| Explicit domain/application/adapter dependencies and owner-local state | Makes ownership and dependency violations visible before a broad service coordinator absorbs unrelated work | [Dependency rules](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/architecture/dependency-rules.md); Paperclip already has enforced feature modules, so boundaries are not our exclusive invention |
| Standalone caller/implementer library surfaces | Can keep a store adapter or harness consumer independent from unrelated runtime/host dependencies | [Modular research](https://github.com/agent-teams-ai/agent-runtime/blob/4bdc93a43b58469f60ca10c0dca512824650c8ac/docs/architecture/agent-runtime-modular-research.md); real packed-consumer compatibility still needs the owning qualification |
| Bounded pending work, claim batches, persisted fairness and quota scopes | Addresses backlog-sensitive scans, one noisy tenant, resource-vector fit and cross-pool over-admission directly | [C0–C3](https://github.com/agent-teams-ai/agent-runtime/blob/4bdc93a43b58469f60ca10c0dca512824650c8ac/docs/architecture/capacity-admission-delivery-plan.md); no measured fleet ceiling follows from a plan |
| Explicit ordinary execution, capacity, custody and product-continuation boundaries | Prevents a completed task or expired lease from being misread as physical cleanup or fresh successor authority | [Ordinary program](https://github.com/agent-teams-ai/agent-runtime/blob/4bdc93a43b58469f60ca10c0dca512824650c8ac/docs/architecture/agent-runtime-architecture-program-plan.md); Paperclip's native fences and uncertain-outcome handling already set a high bar |
| Usage evidence separate from hard consumption authority | Can avoid putting every receipt behind a tenant-wide accounting lock while retaining the actual hard-reservation invariant | [ADR-0045](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/decisions/0045-three-usage-bounded-contexts.md); OD-024 still owns detailed aggregate, period, estimate and correction semantics |
| Explicit SaaS, self-hosted and Fully Local compositions | Makes deployment ownership and cloud independence an accepted design obligation | [ADR-0114](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/decisions/0114-canonical-backend-stack-and-distributed-role-adoption.md), [ADR-0115](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/decisions/0115-canonical-fully-local-v1-adoption.md); process count and distributed components create real operational cost |

These are expected behavioral advantages, not scores for documentation volume. They remain conditional on correctly implementing the selected constraints and resolving the listed open decisions. The [technical matrix](technical-comparison.md) records confidence and unknowns instead of converting this table into a universal winner.

## What should not be added

Preserve the accepted role map and materialize selected roles with their first owning features. Do not introduce one microservice per bounded context, one distributed control sidecar per agent, a duplicate Runtime capacity scheduler in Orchestrator, or a second physical-custody manager in TypeScript. Orchestrator retains its accepted business scheduling and coordination responsibilities. Local deployment can use a simpler supported composition only where the accepted profile permits it; a small workload does not authorize collapsing required process boundaries. The [canonical backend decision](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/decisions/0114-canonical-backend-stack-and-distributed-role-adoption.md) remains authoritative.

Do not build a universal product domain or generic policy framework to share a small mechanism. Reuse narrow libraries where real consumers share semantics. A broker transports messages; it does not settle admission fairness, hard quota ownership, physical reclaim or authorization. These remain explicit owner contracts in [capacity delivery](https://github.com/agent-teams-ai/agent-runtime/blob/4bdc93a43b58469f60ca10c0dca512824650c8ac/docs/architecture/capacity-admission-delivery-plan.md) and [eventing](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/architecture/eventing-and-reliability.md).

## Existing evidence and its boundary

[Stage K](https://github.com/agent-teams-ai/agent-runtime/blob/4bdc93a43b58469f60ca10c0dca512824650c8ac/docs/spikes/stage-k-capacity-fairness-results.md) provides scoped model/PostgreSQL evidence about claims, fairness, replay and reclaim. It explicitly did not start real workers/agents. It must not fill the measured active-capacity cell. Ordinary runtime profile evidence remains valid within its own declared scope; this research creates no retroactive fleet gate.

The current assessment did not execute a common product benchmark, adversarial tenant assessment, install/upgrade campaign, or equivalent-change LOC exercise. The future target is therefore assessed separately from observed implementation. Product documentation checks used to prepare these PRs validate documentation, not production behavior.

## Decisions still owned by product repositories

| Owner record | Why it matters before the affected implementation |
| --- | --- |
| [OD-004 runtime capabilities](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/open-decisions/OD-004-runtime-capability-ports.md) | Freeze the exact published capability and outcome contract at the real integration seam; verify its current owner status before implementation |
| [OD-006](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/open-decisions/OD-006-initial-aggregate-boundaries.md) | Concrete aggregate/transaction boundaries cannot be inferred from an excellent strategic context map |
| [OD-012](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/open-decisions/OD-012-identity-authorization-tenant-isolation.md) | Identity, authority, tenant isolation and revocation must be coherent across the selected profiles |
| [OD-024](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/open-decisions/OD-024-usage-accounting-boundaries-and-exact-quantities.md) | Detailed hard/soft consumption quantities, estimates, periods, corrections and concurrency |
| [OD-032](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/open-decisions/OD-032-last-mile-side-effect-safety.md) | Last-mile effect authority, cancellation and stale work must agree with runtime truth |
| [Runtime #245](https://github.com/agent-teams-ai/agent-runtime/issues/245) and [#246](https://github.com/agent-teams-ai/agent-runtime/issues/246) | Owner decisions about SQL ownership and shared backend/profile alignment remain tracked locally; central research does not close them |

The first row is navigational, not a new decision. Verify exact current owner status before implementation; the pinned baseline is historical. The central [decision cards](../lessons/preimplementation-decisions.md) supply alternatives inside these owners and the existing C0–C3 program. They do not ask the user to reselect already accepted soft/hard budgets or PostgreSQL.

## Practical verdict

The selected architecture has credible potential to improve bounded scheduling, reusable boundaries and explicit deployment ownership. Paperclip remains a strong reference for native execution correctness and already implemented integration breadth. The material risk on our side is implementation/composition cost and unresolved owner contracts. A useful next step is a small real vertical slice with the actual selected role/process/store boundaries, followed by the owning failure and capacity campaign—not another general framework.

The dossier proposes no additional release gate, package, provider or accepted ADR. Follow-through is reviewable in [Runtime #248](https://github.com/agent-teams-ai/agent-runtime/pull/248), [Orchestrator #94](https://github.com/agent-teams-ai/agent-teams-orchestrator/pull/94), and [Platform #59](https://github.com/agent-teams-ai/agent-teams-platform/pull/59); the central publication dependency remains open.

## Published owner follow-through

The source-pinned assessment above keeps its original subject revisions. Proposed local application of the shared findings is now published in the [Runtime v3, Orchestrator and Platform integration documents](../methodology/research-migration.md#product-applicability-routes). Those draft documents route work to existing owner decisions and acceptance plans; their publication does not change a score, accept a contract or establish fleet capacity.
