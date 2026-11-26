---
id: research.studies.identity-providers
type: study
status: active
owner: research/maintainers
summary: Reusable identity-provider comparisons separated from the Orchestrator IAM adoption decision.
---

# Identity providers: shared identity, tenant lifecycle and authorization evidence

## Source provenance

This is a reusable evidence extract from the [Orchestrator identity-provider study][original],
preserved at Orchestrator commit `981dd836ca3d35b764561bdc11dc2e0544d83416`.
The source review was recorded **2026-10-21**, reconciled into research on **2026-10-22**
from PR #86 head `8483949960cb783fe70090e2e7fbf526a043d362`, and carries an integration
note dated 2026-10-28. Extraction does not make this a new November audit.
Upstream statements below retain that review's exact baselines and qualifications.
No provider deployment, benchmark, security audit or new upstream verification was run
for that historical extract. The separately dated November follow-up below has
its own source and review scope.

| Reviewed component | Dated upstream baseline | Scope |
| --- | --- | --- |
| Keycloak | [`26.8.1`][kc-release], published 2026-10-13 | Identity, organizations, administration and provisioning |
| ZITADEL | [`v4.19.5`][zit-release], commit `a618740b578627b7b9acbbb111a6948882d6f5dc`, published 2026-10-15 | Stable v4 identity and project-grant model |
| OpenFGA | [`v1.22.0`][fga-release], published 2026-10-06 | Relationship authorization storage, not identity lifecycle |

These are research baselines, not current-version claims or adopted dependency pins.
The source's provisional provider preference, exact consumer contracts, scores and estimates
remain [owner-local][original]. [OD-012][od012] owns provider selection and qualification;
this shared extract neither accepts a provider nor transfers product authority to IAM.

## Comparative evidence

| Concern | Keycloak 26.8.1 | ZITADEL v4.19.5 | Reusable implication |
| --- | --- | --- | --- |
| Shared human identity | Documents multiple organization memberships; `UNMANAGED` membership removal preserves the realm account, while `MANAGED` membership can carry account-deletion consequences. [Source][kc-members] | External project roles permit A/B access without copying an account, but the user has one owning organization. [Roles][zit-external], [B2B ownership][zit-b2b] | Cross-organization access and independent customer offboarding are separate capabilities. |
| Existing membership migration | New organization-IdP links default to `UNMANAGED` in 26.8; existing links migrate as `MANAGED`. [Source][kc-268] | User/owning-organization deactivation affects authentication beyond one external role assignment. [Source][zit-auth] | Inspect inherited relationships and identity ownership rather than infer lifecycle from a current default. |
| Required organization SSO | Existing local credentials can affect identity-first routing. [Source][kc-login] | The reviewed Login V2 organization-bound request rejects a session whose user owner differs from the requested organization. [Source][zit-auth-request] | An organization claim or IdP hint does not prove target-organization authentication provenance. |
| Delegated administration | Organization-member deletion requires organization and user-management authority; global user deletion also uses user management. [Member endpoint][kc-member-api], [user endpoint][kc-user-api] | Project Grants delegate a bounded role subset; permission roles separate grant mutation from user mutation. [Grants][zit-grants], [permissions][zit-permissions] | Native delegated administration can save product work if the ownership model fits; broad IAM administration is not automatically a tenant-safe product admin API. |
| SCIM support | 26.8 documents supported Users and Groups; realm User deletion removes the realm account, and organization groups are excluded from the reviewed SCIM path. [Release][kc-268], [deletion][kc-scim-delete], [groups][kc-scim-groups] | Tagged SCIM API is Preview and User-only; `active` maps to user state and deletion calls `RemoveUserV2`. [Guide][zit-scim], [API][zit-scim-api], [handler][zit-scim-handler] | Protocol availability does not establish membership-only offboarding for shared identity. |
| TypeScript clients | Official TypeScript admin client. [Source][kc-client] | Typed Protobuf client and Node transport. [Source][zit-client] | SDKs reduce protocol work while product identity bindings and authorization policy remain consumer-owned. |

The original study's neutral-owner proposal for shared ZITADEL users is an **inference**
about product fit, not evidence that every SSO/provisioning path works under that model.
Likewise, choosing `UNMANAGED` membership is not a complete Keycloak security integration:
administrative permissions, linking, recovery roots and revocation still need explicit policy.

## Cross-system consistency

OpenFGA's [tuple storage contract][fga-storage] defines its own transaction boundary.
It does not atomically commit an IAM change or a consumer business transaction.
The reviewed ZITADEL event store queues executions transactionally, but its worker can
cancel failed or expired executions; asynchronous targets are not proof of complete
downstream delivery. [Enqueue][zit-enqueue], [worker][zit-worker], [target execution][zit-targets].

Reusable engineering consequences from those facts are:

- Give projection commands stable identities and source revisions; reconcile gaps and retries.
- Distinguish JWT validation, expiry, introspection and relationship checks: they prove different facts.
- Decide stale-data behavior per consuming capability rather than apply one global cache TTL.
- Keep membership removal, authorization revocation and runtime-effect cutoff as separate evidence.
- Do not report that a running external effect stopped merely because a webhook was received.

These are comparison lessons. Exact freshness windows, failure policy and cutoff contracts
belong to each consuming product's accepted decisions; the shared study creates no new gate.

## Reusable modeling lessons

One person can have independent memberships in A and B while retaining stable identity.
Removing A should be modeled separately from destroying that person's account or recovery root.
An IAM organization, project, group or grant is an external representation; naming similarity
does not make it the authority for a product Team, Task, Tenant or deployment.

OAuth client, service account, human subject, acting principal, persistent agent and ephemeral
execution identity also have different lifecycles. The reviewed ZITADEL [token exchange][zit-exchange]
records an actor and requires impersonation permission; that is not proof of bounded,
task-specific AI delegation.

Provider-neutral technical adapters can be reused across products while membership policy,
commercial entitlements and operation preconditions stay with their existing owners.
Neither native Console workflows nor custom admin UI should be presumed cheaper without
comparing the actual safe workflow and measured implementation/operational effort.

## Limits and retained owner questions

The dated review does not establish mandatory target-organization SSO under every existing
session, linking or reauthentication path. It does not qualify customer-scoped SCIM,
cross-tenant administration, HA, backup/restore, last-administrator recovery or deployment cost.
Its backend LOC envelopes and /10 fit scores were low-confidence planning judgments;
they are intentionally not promoted into shared measured facts here.

Thousands of accounts are not evidence of thousands of concurrently active agents.
A relevant workload would specify authentication/renewal rates, relationship checks/writes,
revocation fan-out, saturation, tail latency and recovery. No such campaign was run in this study.
The reviewed ZITADEL core and Login application have separate [AGPLv3][zit-license] and
[MIT][zit-login-license] license files; exact distribution choices remain an adoption concern.
Current provider versions and behavior require a fresh source review before a new selection.

## Primary references retained from the dated review

[original]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/research/identity-provider-comparison-2026-10-21.md
[od012]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/open-decisions/OD-012-identity-authorization-tenant-isolation.md
[kc-release]: https://github.com/keycloak/keycloak/releases/tag/26.8.1
[zit-release]: https://github.com/zitadel/zitadel/releases/tag/v4.19.5
[fga-release]: https://github.com/openfga/openfga/releases/tag/v1.22.0
[kc-members]: https://github.com/keycloak/keycloak/blob/26.8.1/docs/documentation/server_admin/topics/organizations/managing-members.adoc
[kc-268]: https://www.keycloak.org/2026/10/keycloak-2680-released
[kc-login]: https://github.com/keycloak/keycloak/blob/26.8.1/docs/documentation/server_admin/topics/organizations/authenticating-members.adoc
[kc-member-api]: https://github.com/keycloak/keycloak/blob/26.8.1/services/src/main/java/org/keycloak/organization/admin/resource/OrganizationMemberResource.java
[kc-user-api]: https://github.com/keycloak/keycloak/blob/26.8.1/services/src/main/java/org/keycloak/services/resources/admin/UserResource.java
[kc-scim-delete]: https://github.com/keycloak/keycloak/blob/26.8.1/scim/model/src/main/java/org/keycloak/scim/model/user/UserResourceTypeProvider.java
[kc-scim-groups]: https://github.com/keycloak/keycloak/blob/26.8.1/scim/model/src/main/java/org/keycloak/scim/model/group/GroupCoreModelSchema.java
[kc-client]: https://github.com/keycloak/keycloak/blob/26.8.1/js/libs/keycloak-admin-client/README.md
[zit-external]: https://github.com/zitadel/zitadel/blob/v4.19.5/apps/docs/content/concepts/features/external-user-grant.mdx
[zit-b2b]: https://github.com/zitadel/zitadel/blob/v4.19.5/apps/docs/content/guides/solution-scenarios/b2b.mdx
[zit-auth]: https://github.com/zitadel/zitadel/blob/v4.19.5/internal/command/user_auth.go
[zit-auth-request]: https://github.com/zitadel/zitadel/blob/v4.19.5/internal/command/auth_request.go
[zit-grants]: https://github.com/zitadel/zitadel/blob/v4.19.5/apps/docs/content/concepts/structure/granted_projects.mdx
[zit-permissions]: https://github.com/zitadel/zitadel/blob/v4.19.5/cmd/defaults.yaml
[zit-scim]: https://github.com/zitadel/zitadel/blob/v4.19.5/apps/docs/content/guides/manage/user/scim2.mdx
[zit-scim-api]: https://github.com/zitadel/zitadel/blob/v4.19.5/apps/docs/content/apis/scim2.mdx
[zit-scim-handler]: https://github.com/zitadel/zitadel/blob/v4.19.5/internal/api/scim/resources/user.go
[zit-client]: https://github.com/zitadel/zitadel/blob/v4.19.5/packages/zitadel-client/README.md
[zit-enqueue]: https://github.com/zitadel/zitadel/blob/v4.19.5/internal/eventstore/v3/push.go
[zit-worker]: https://github.com/zitadel/zitadel/blob/v4.19.5/internal/execution/worker.go
[zit-targets]: https://github.com/zitadel/zitadel/blob/v4.19.5/internal/execution/execution.go
[zit-exchange]: https://github.com/zitadel/zitadel/blob/v4.19.5/apps/docs/content/guides/integrate/token-exchange.mdx
[fga-storage]: https://github.com/openfga/openfga/blob/v1.22.0/pkg/storage/storage.go
[zit-license]: https://github.com/zitadel/zitadel/blob/v4.19.5/LICENSE
[zit-login-license]: https://github.com/zitadel/zitadel/blob/v4.19.5/apps/login/LICENSE

## IAM follow-up and Identity plan review — 2026-11-26

### Checkpoint and preserved history

The owner asked to record the recommended answers from the 28 October IAM review,
including the alternatives, and to compare them with the expanded Identity and
Review Router plans. The original [18-question report](../../evidence/imports/iam/iam-open-decisions-review-2026-10-28.md)
is preserved byte-for-byte, including its then-unaccepted status, low-confidence
estimates, sources and statement that the requested model was unavailable in that
earlier round. Its SHA-256 is
`17b419739e86f0dfd286914d070be85d3152160e1c312966b703642f3f791c65`
(90,525 UTF-8 bytes). The accompanying [historical status patch](../../evidence/imports/iam/platform-agent-principal-status.patch)
is evidence of the earlier unpublished correction, not an instruction to apply
it blindly to a later checkout.

The owner's 26 November endorsement selects the recommended **design directions
with their stated scope and growth conditions**. It does not retroactively change
the October report, accept every alternative, approve implementation, qualify a
provider, choose numerical SLOs or resolve the newly identified trust-policy
questions below. Product records retain their decision authority. In particular,
Keycloak plus OpenFGA is the preferred stack direction; exact provider admission
and OD-012's remaining contracts are still open.

### Recommended answers endorsed by the owner

Numbers are the stable question numbers in the archived report. This table is a
selection/history index, not a second product policy or a complete IAM schema.

| Question | Selected direction and limit | Product owner |
| --- | --- | --- |
| 01 | Product authority owns membership and rich grant lifecycle in its PostgreSQL; Keycloak authenticates and OpenFGA projects the needed relations. One writer per fact; no shared business database. | Platform / standalone authority; Orchestrator OD-012 |
| 02 | Independent common account first; corporate authentication and recovery must be scoped before enterprise SSO is admitted. Target remains independent A/B memberships with no A-controlled root opening B. Enforceability of social-root custody remains the November P0/P2 question below. | Identity plus each product authority |
| 03 | Personal Fully Local uses one owner and protected Desktop/CLI enrollment; collaboration uses the server self-hosted profile. No allow-all or hosted-service prerequisite. | Orchestrator OD-012 / OD-040 |
| 04 | Versioned fixed roles, explicit bounded permissions and a separate grantable set first; custom-role growth is deferred. | Product Access and Authority |
| 05 | Editing an Agent version, activating it and binding execution authority are distinct permissions. | Orchestrator Agent / Access owners |
| 06 | Finite human delegation; authorized administrators issue autonomous organization grants. Bounded self-service templates are a later growth path. | Product authority / Run Orchestration |
| 07 | Authoritative sensitive decisions, declared bounded freshness for eligible lower-risk reads, and fail-closed uncertainty. No numerical freshness target selected here. | Each consuming feature / OD-012 / OD-031 |
| 08 | Owning operations atomically reserve or consume single-use approvals and budgets; an FGA eligibility check does not reserve capacity. | Owning effect / budget context |
| 09 | Narrowed access closes affected disclosure and starts clean authorized context; use isolated contexts for particularly sensitive work. No promise that a model or human forgets data already disclosed. | Agent context / information owners |
| 10 | Exact-action approval bound to arguments and scope, followed by execution-time revalidation; begin with one concrete dangerous operation. MFA and assignment remain distinct. | Orchestrator OD-032 / owning feature |
| 11 | Redacted support diagnostics and authority-reducing emergency behavior by default; customer-authorized temporary support access only when needed. Recovery is a separate operation. | Each product's administration owner |
| 12 | Product-owned BFF and server-held tokens; protected cookies and exact Target binding. | Each product session owner |
| 13 | Verified workload identity plus audience-bound product invocation context at real service boundaries. Dapr/mTLS is not a product grant; rare sensitive calls may resolve an opaque context reference. | Service / consuming feature owners |
| 14 | Personal and organization connection ownership are distinct; connect/configure/use remain separate capabilities. Start with one provider. | External integration owner, OD-034 |
| 15 | Shared FGA store for the first measured authority/environment envelope, with explicit scope and limits; routing port permits later measured separation. No speculative fleet manager. | Product authority |
| 16 | Restore closed, establish authority continuity, and rebuild/reconcile projections before reopening. Unprovable continuity needs explicit new-target/recovery treatment. | Authority / deployment owners |
| 17 | Offboard-to-rehire creates a new membership period with baseline roles only; sensitive grants require fresh decisions. Temporary suspension is a different transition. | Product Access and Authority / provisioning adapter; Identity supplies principal lifecycle |
| 18 | Bounded personal-queue queries with current authorization before disclosure, counts and pagination; deduplicate the same Task across membership paths. | Orchestrator Work / query owner |

The archive retains all three alternatives, confidence/reliability/complexity
scores and scoped production TS estimates for every question. Those estimates are
dated, overlap and are not additive. Selecting a direction does not make that
old code estimate a commitment or transfer product ownership to this repository.

### Independent review of the new plans

Three separate critics were actually run on **gpt-6.1-sol, xhigh** in this round:
account security, product/authority boundaries, and Review Router migration.
They then cross-checked each other's concrete counterexamples. The coordinator
re-read the owning text and primary sources. These are assistant-agent source
reviews, not human approval or executed exploit/provider qualification.

| Source | Exact reviewed revision |
| --- | --- |
| Identity PR #1 | `ae61c972c8e4b40062c36dcc13c8075a5e1b002e` |
| Review Router PR #1010 | `5c6b78776244d22c30a6d02aa05a0fa8c7d52959` |
| Orchestrator main | `3dccf2c53bf11f3939a19734a58f5e64d96673d0` |
| Platform main | `76fc9734f6128b78c7a8b1bc858859fb1cbe835a` |
| Review Router source | `f20a75edbc7eff11be4f2423fb2e723f6e484223` |

The Orchestrator difference from Identity's `b622026a` baseline was one AGENTS
navigation edit, not an IAM semantic change. Review Router #1007 subsequently
advanced from `1a80c51e` to `2bb8a08da0f1ec6915750fcf3db01036dca0defd`;
the inspected one-commit, seven-path delta did not change auth, SCM custody or
SQL/schema paths. Neither observation adopts that unmerged PR.

**Preserved boundaries:** Keycloak handles login/factors; Identity handles stable
global account lifecycle; products retain local principals, memberships, grants,
SCM credentials, sessions and business data. Platform consumes Orchestrator
API/SDK; standalone and Fully Local have no unconditional hosted Identity
dependency. Mandatory meaningful Get Modular composition, independent public
contracts and actual Dapr/Protobuf process boundaries remain compatible.
OpenFGA need not be installed in the account-lifecycle service or in a simple
consumer merely because it is selected for Orchestrator resource authorization.

Existing corrections are real and are not new findings: immutable account and
attachment generations; no generation upgrade through status refresh; original
evidence expiry; never-bound legacy migration; terminal cleanup participants,
receipts and product fences; actual factor provenance; monotonic first-factor
bootstrap restrictions; and controlled competing Keycloak mutation channels.

| Review ID | Disposition and counterexample | Minimal owner action |
| --- | --- | --- |
| IAM-N26-01 | Security-critical **open profile decision**, confidence 8/10. A public social account initially treated as personal can later come under company-controlled recovery; correct B membership checks do not stop A from authenticating as the same person. Existing D3 already acknowledges the risk, but no ongoing custody/proof mechanism is qualified. | Identity D3/P0/P2 specifies unknown/changing custody, independent or scoped proof, and a falsifying A-to-B continuation test. Preserve direct GitHub/GitLab login. Do not claim a runtime vulnerability or silently impose MFA on every ordinary login. |
| IAM-N26-02 | **Contract clarification**, confidence 8/10. First consumer attachment must not commit after closure captured a manifest that omitted it. A generic account transaction may intend this, but the exact interleaving was not named. | Serialize first attach/reattach and closure through the existing account lifecycle gate. Attach wins: included in manifest. Closure wins: no new attachment or usable active response. Test both orders and a delayed callback. |
| IAM-N26-03 | **P2 wording/test correction**, confidence 8/10. Review Router permits a new central-only user without native proof, yet universally promises webhook/first-login convergence. A later GitHub webhook can create an uncorrelated native owner; no-auto-merge correctly yields a conflict. | Promise convergence for the same proven native identity only. Preserve the deliberate new-account path and add the deferred-proof collision case; do not invent email correlation or an account-merging system. |
| IAM-N26-04 | **Open session-scope contract**, confidence 8/10 that the bound needs specifying. Missed native Keycloak single-session/client logout is invisible to an unchanged account epoch and attachment generation; workload account-status refresh does not prove the particular SSO session still exists. | Identity D8 and consumer R0 inventory exposed session controls. Select canonical product revocation, a qualified provider-session check, or an explicitly finite best-effort horizon. Do not label the account freshness candidate as the native-session bound. |

These are two precise consistency fixes and two remaining admission choices.
They do not justify replacing the approved service architecture. Related root
removal/credential recovery must be assigned an explicit session-invalidation
scope in the same operation inventory; the open-ended prior wording is not
evidence of a separate confirmed defect.

### Fresh primary evidence and limits

[GitLab enterprise-user documentation](https://docs.gitlab.com/user/enterprise_user/)
describes automatic claiming of eligible accounts after domain verification,
including existing accounts. The [enterprise-user API](https://docs.gitlab.com/api/group_enterprise_users/)
documents primary-email administration and disabling 2FA. The inference is that
enrollment-time classification alone cannot prove continuing independent custody;
these sources do not demonstrate an end-to-end takeover of our unimplemented
Keycloak profile. Ordinary provider ID/email output is not itself such proof.

[Keycloak administration](https://www.keycloak.org/docs/latest/server_admin/)
distinguishes native session/application termination and client notification,
and warns that session sign-out does not itself invalidate outstanding access
tokens. Our account/attachment status is a different fact. The actual deployed
version, enabled channels and resulting enforcement remain P2/P4 qualification.

Review Router [CI 45834320649](https://github.com/777genius/review-router-ai/actions/runs/45834320649)
was successful for the **reviewed old head**: two jobs executed successfully and
ten were skipped by Draft policy. That was not an executed auth/DB/E2E campaign.
Identity had no configured workflow at that snapshot. Subsequent documentation
heads require their own evidence; earlier hashes and CI results remain historical.

### Owning continuation

- [Identity planning PR #1](https://github.com/agent-teams-ai/identity/pull/1):
  account/proof/session choices and precise closure contract.
- [Review Router planning PR #1010](https://github.com/777genius/review-router-ai/pull/1010):
  actual local migration, callback and SCM boundaries.
- [Orchestrator OD-012](https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/main/docs/open-decisions/OD-012-identity-authorization-tenant-isolation.md):
  selected product directions, local authority and graph qualification.
- [Platform boundary](https://github.com/agent-teams-ai/agent-teams-platform/blob/main/docs/architecture/platform-orchestrator-boundary.md):
  hosted product authority and independent Orchestrator relationship.

These PR/main links are navigation to current owner state; the exact snapshots
above remain the evidence for this review. Research cannot close their decisions,
accept an ADR or authorize implementation. The current assignment remains
Markdown documentation and review.
