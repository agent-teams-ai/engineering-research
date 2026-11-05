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
No provider deployment, benchmark, security audit or new upstream verification was run.

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
