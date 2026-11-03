---
id: research.lessons.patterns
type: lesson
status: active
owner: research/maintainers
summary: Reusable mechanisms and failure shapes mapped to evidence and existing semantic owners.
---

# Pattern evidence map: retain existing identities and add provenance

## Scope and provenance

This map reuses the existing **MR-01–MR-24** and **GP-01–GP-10** identities from the
[Agent Runtime antipattern register][register] at Runtime commit
`4bdc93a43b58469f60ca10c0dca512824650c8ac`.
That register identifies its own 2026-10-27 review baseline and separates historical defects,
documented limits, inspected source and engineering inference. Its planned checks were not
declared executed. Existing K/SR records retain their own historical details and owners.

Paperclip references below mean the numbered findings in the [shared Paperclip dossier](../competitors/paperclip.md),
grounded at Paperclip `61e8d5c7eb097664958e00c30ccd88bb51359043`.
They add evidence to an existing lesson where the meaning matches; they do not create
duplicate pattern IDs, assert an Agent Teams defect or add an automatic qualification gate.

## Existing patterns with additional supporting evidence

| Existing identity | Preserved lesson | Additional Paperclip evidence and limit |
| --- | --- | --- |
| **MR-13, MR-14; GP-07, GP-08** | Stable effect identity and uncertainty must survive replay; retry configuration alone does not close an effect/journal crash window | Finding 5: the Rust runner persists a pending command before effects and returns retained/indeterminate outcomes rather than blindly dispatching again. [Source][journal] This is positive counterevidence against claiming safe retry is unique to Agent Teams. |
| **MR-15** | Cancellation acknowledgement and callback/process exit are distinct from physical containment/release | Finding 5: process-group exit explicitly does not establish escaped-descendant cleanup; higher-level lifetime fencing remains necessary. [Source][cleanup] Cooperative Resources completion in the composition study supports the same distinction. |
| **MR-17** | Durable atomic claim/fence precedes effects; delivery or a lease alone is not execution authority | Findings 2 and 4: Paperclip admission records deliberately require composed capacity/claim semantics, and deployment notifications are hints while durable claims remain authority. [Admission][admission], [notifications][notifications] The internal composition status is not a broken public feature. |
| **MR-24** | Cache/live delivery still needs the trusted caller's authorization | Finding 6: live delivery authorizes before sending and bounds/resynchronizes slow consumers. [Source][delivery] Bounded buffers are positive evidence, not a claim that an authorization bypass was found. |
| **MR-03, MR-04; GP-09** | Choose real ownership/dependency boundaries; do not create a graph node or manager for every helper | Finding 8: Paperclip has explicit domain/application/adapters and boundary checks alongside large coordinators. [Source][modules] File length prompts review but does not itself prove bad boundaries. |
| **MR-11, MR-12** | Observation must not silently redefine execution outcome or control semantics | Findings 5 and 6 reinforce a related resource concern: protect control progress while output/view traffic saturates. This adds a proposed workload case; it does not claim Paperclip exhibits the historical execution-mode defect from the MR record. |

## Findings that should remain report-specific until a distinct reusable rule is justified

- **Finding 1:** company-wide accounting serialization is a concrete write topology.
  Existing one-owner guidance does not imply one shared mutable row or supply an accounting algorithm.
  Retain the pinned contention/counterevidence and OD-024 decision link rather than mint a duplicate rule.
- **Findings 2 and 3:** current-queue materialization and one native cursor's historical aggregate are
  targeted cost hypotheses. They need the named query/workload measurements, not a generic “SQL does not scale” entry.
- **Finding 7:** first-write-wins Kubernetes resources expose desired/observed configuration drift.
  Keep this concrete lifecycle example linked to the installation owner; do not relabel it as
  a tenant-isolation vulnerability or force a universal reconciliation framework.

The IAM extract likewise supplies lifecycle/revocation evidence without creating new domain IDs.
The persistence extract supplies adapter/transaction lessons while its old SQLite comparison
remains historical. Current PostgreSQL adoption and all product decisions stay owner-local.

## Use and limits

Link the existing MR/GP identity and exact source when reviewing that boundary.
Preserve affected/fixed status, counterevidence and the smallest relevant owner case.
An upstream fix is not proof that every deployment has it; a planned case is not an executed test.
This map is engineering memory, not a competitor defect leaderboard or a new compliance checklist.

[register]: ../studies/agent-runtime-antipattern-register.md
[journal]: https://github.com/paperclipai/paperclip/blob/61e8d5c7eb097664958e00c30ccd88bb51359043/packages/paperclip-runner/runner/crates/runner-core/src/durable/runner.rs#L1877-L1938
[cleanup]: https://github.com/paperclipai/paperclip/blob/61e8d5c7eb097664958e00c30ccd88bb51359043/packages/paperclip-runner/runner/crates/runner-core/src/process_supervisor.rs#L1222-L1238
[admission]: https://github.com/paperclipai/paperclip/blob/61e8d5c7eb097664958e00c30ccd88bb51359043/server/src/modules/execution-admission/adapters/postgres.ts#L72-L108
[notifications]: https://github.com/paperclipai/paperclip/blob/61e8d5c7eb097664958e00c30ccd88bb51359043/server/src/services/deployment-notifications.ts#L10-L98
[delivery]: https://github.com/paperclipai/paperclip/blob/61e8d5c7eb097664958e00c30ccd88bb51359043/server/src/realtime/live-event-delivery.ts#L4-L175
[modules]: https://github.com/paperclipai/paperclip/blob/61e8d5c7eb097664958e00c30ccd88bb51359043/server/src/modules/README.md#L3-L31

## Recipient and rejecting-case map

| Existing lesson / source finding | Recipient | Smallest concrete rejecting case |
| --- | --- | --- |
| MR-13/14, GP-07/08; Paperclip finding 5 | Runtime operation/native boundary; Orchestrator continuation | Lose the effect result after dispatch; the next owner must preserve the original identity and expose uncertainty rather than blindly replay |
| MR-15/17; Paperclip findings 2/4/5 | Runtime capacity and physical custody | A stale lease or escaped descendant must not permit a successor to reuse capacity/effect authority prematurely |
| MR-24; Paperclip finding 6 | Owning product query/view edge | Revoke authority while a slow subscriber retains buffered detail; prevent unauthorized replay and expose resynchronization |
| MR-03/04, GP-09; Paperclip finding 8 | Feature/library composition owner | A real external consumer cannot import its port without unrelated host/provider internals; fix the actual dependency closure |
| Paperclip finding 1 | Orchestrator OD-024 and usage owners | Two grants compete for the last hard allowance while receipts/settlements continue; preserve the hard invariant without serializing unrelated evidence |
| Paperclip findings 2/3 | Runtime C0–C3 and canonical append owner | An eligible item behind blocked work or a longer retained history makes per-grant/per-event work grow without a declared bound |
| Paperclip finding 7 | Platform installation owner | A stale reconciler reports success after desired policy changes; expose desired/accepted/observed revision and reject stale expansion |

These cases refine existing owner acceptance only where adopted there. No row is a newly demonstrated defect in Agent Teams. See the [decision cards](preimplementation-decisions.md) for alternatives and scope.
