# Foundation-first Effect diagnostics: governance and plan review

Review date: 2026-11-24 UTC. Reviewer role: independent architecture/governance reviewer. Review mode: read-only inspection of GitHub source and open PR metadata. This is an intermediate review for the implementing agent, not an adopted policy or qualification receipt. No tests, applications, repository mutations, PR comments or status changes were performed by this reviewer.

## Verdict

Proceed with the user-authorized, isolated **research qualification experiment** for ready-made Effect diagnostics. A mature application is not a prerequisite for this experiment. Its concrete output should establish which exact supported compiler/tool/runtime cohort actually diagnoses selected mistakes and preserves exit/failure semantics in disposable fixtures.

Keep the implementation in Engineering Research as a retained experiment for this step; do not yet admit a reusable Foundation capability, activate a consumer gate, replace Stack Toolchain, create a semantic linter, or alter Get Modular. Existing Foundation-first ecosystem, quality-growth and research-structure drafts belong to another workstream. The scope below can proceed independently of their merge.

The original assignment considered an EF-hosted spike. The parent's subsequent steering selects a research-first disposable probe with EF adoption deferred to the observed compatibility outcome; this review follows that narrower scope.

The important precision is that **research evidence, qualified shared mechanism, publication and consumer activation are different claims**. An experiment can pass now and still leave an EF integration proposal pending.

## Inspected authorities and adjacent work

Exact source pins observed during this review:

| Owner / status | Revision or PR | Relevance |
| --- | --- | --- |
| Organization accepted main | [03c8f102681569f525f44577a705bc4e5900e492](https://github.com/agent-teams-ai/.github/commit/03c8f102681569f525f44577a705bc4e5900e492), 2026-11-24 | Shared standard and development-tool ownership; no implicit adoption from a link |
| Foundation accepted main | [c4b0576f4ca935446d44bf97db92aafc99d8fcd5](https://github.com/agent-teams-ai/engineering-foundation/commit/c4b0576f4ca935446d44bf97db92aafc99d8fcd5), 2026-11-24 | Dev-only boundary, ADR-0061, neutral capabilities, toolchain ownership |
| Research accepted main | [4ad091c10d591cacb6af55b09ed67a935cd7fcad](https://github.com/agent-teams-ai/engineering-research/commit/4ad091c10d591cacb6af55b09ed67a935cd7fcad), 2026-11-24 | Current research workflow and recently added enterprise-execution study |
| Organization draft | [PR 417](https://github.com/agent-teams-ai/.github/pull/417), head `5899711eecd144b189790d53f85a94ce162be91e` | Foundation-first whole-system vision, ownership/consumer map, sequencing |
| Foundation draft | [PR 474](https://github.com/agent-teams-ai/engineering-foundation/pull/474), head `0d5423808b6297f4a7b4328f530a918366ea66c9` | Proposed tooling scalability and evidence reuse review |
| Research draft | [PR 21](https://github.com/agent-teams-ai/engineering-research/pull/21), head `a2ac29c9d3e2a9c79f4e6472602d7bd140e164c9` | Evidence-to-decision structure and foundation-first navigation |
| Our historical research draft | [PR 9](https://github.com/agent-teams-ai/engineering-research/pull/9), head `32672acf2f56e8ead603b31c71636eb5fa353664` | Effect architecture study dated 2026-11-14; source observations and original review 2026-11-13 |

PR state is a point-in-time observation, not a reservation or authorization claim. The root should re-read heads before rebasing, merging or publishing evidence. Main has moved substantially since PR 9's recorded base `495986d9012aafd94bf9b2a22a57db90001e868b`.

### Concrete non-duplication boundary

Do not edit these active-work files merely to repeat the user's direction:

- Organization PR 417: `AGENTS.md`, `README.md`, `docs/architecture/README.md`, new `docs/architecture/ecosystem-vision.md`, and its route in `docs/engineering-quality-standard.md`.
- Foundation PR 474: `AGENTS.md` and the proposed Foundation-first growth section of `docs/development/quality-gates.md`.
- Research PR 21: `docs/README.md` and `docs/methodology/research-maintenance.md`.
- Get Modular / Live Module Updates work owned by another agent: no new loader, module registry, lifecycle kernel or update orchestrator.
- Foundation [PR 468](https://github.com/agent-teams-ai/engineering-foundation/pull/468), opt-in Landmines test-integrity work, is adjacent lint work, not an invitation to extend that branch or bundle unrelated rules into this probe.

The ecosystem draft already calls for planned consumers, materially different disposable consumer scenarios, separate publication/adoption claims, and independent owners. Refer to it as **draft owner-direction navigation**, not as a merged immutable standard.

## Ownership and placement

| Material / behavior | Appropriate owner now | Boundary to preserve |
| --- | --- | --- |
| Source inspection, version support comparison, applicability, counterexamples, rejected options | Engineering Research study | Evidence does not enact a product or Foundation decision |
| Exact disposable inputs, harness, command outputs, hashes, environment, test expectations, reproduction recipe | Research `evidence/experiments/effect-diagnostics-2026-11-24/` | Dev-only retained experiment; no installable general tool or runtime dependency |
| Exact technical checker selection, upstream diagnostic binaries, supported compiler/backend versions and failover semantics | Existing Stack Toolchain owner, if later integration is justified | Reuse upstream Effect implementation; do not duplicate its semantic analyzer |
| Generic capability orchestration, deterministic evidence/report normalization, neutral configured source coverage | Engineering Foundation, if a later owner-approved component is needed | Architecture-neutral core; granular explicit opt-in; no runtime import |
| Meaning of the consumer's stable API, allowed unstable exports, source scope, severity policy and activation | The adopting consumer | A tool must not infer public-domain policy from dependency presence |
| Architecture-specific rule meaning | Owner of the applicable standard and its opt-in package | Do not put one standard's vocabulary or layout in Foundation core |
| Composition and resource lowering | Get Modular and existing Effect resource contracts | No new runtime lifecycle from a diagnostics experiment |
| FE state, stream recovery, durable work, authority, physical custody | Existing app/SDK/Runtime owners | No second broker, supervisor, workflow engine or application manager |

Sources: [EF ownership](https://github.com/agent-teams-ai/engineering-foundation/blob/c4b0576f4ca935446d44bf97db92aafc99d8fcd5/docs/architecture/ownership.md), [capability neutrality/lifecycle](https://github.com/agent-teams-ai/engineering-foundation/blob/c4b0576f4ca935446d44bf97db92aafc99d8fcd5/docs/architecture/executable-capabilities.md#architecture-neutrality), [Stack Toolchain README](https://github.com/agent-teams-ai/engineering-foundation/blob/c4b0576f4ca935446d44bf97db92aafc99d8fcd5/packages/stack-toolchain/README.md), [development tools catalog](https://github.com/agent-teams-ai/.github/blob/03c8f102681569f525f44577a705bc4e5900e492/docs/development-tools.md).

A technology-specific diagnostic is not automatically an architecture-specific standard. The smallest later integration might be an opt-in technical command/profile in Stack Toolchain; a new EF capability/package is not predetermined. Architecture policy and technical execution must be evaluated separately.

## Staged evidence without changing existing admission rules

The following is a review vocabulary for this task, not a new universal lifecycle standard.

| Stage | Evidence that can legitimately be produced | What remains unproven |
| --- | --- | --- |
| Source assessment | Exact upstream release/commit, support matrix, rules and defaults read | Executed behavior, compatibility in our cohort |
| Disposable fixture qualification — current step | Pinned actual engine, positive and rejecting cases, exact diagnostic identities/use sites, statuses, isolation and bounded run observations | General reusable integration, supported platform fleet, production consumer activation |
| Shared-tool integration qualification — possible next step | Existing owner contract, exact technical seam, conformance/parity, installed package tests, documented support envelope and required owner review | Publication and adoption where not yet performed |
| Artifact/release qualification | Required package, provenance, supported environment and release checks at the exact revision | Any application's adoption or deployment behavior |
| Consumer activation / application integration | Explicit consumer policy and active command, exact installed artifact, realistic use cases and rejecting controls | Other consumers, other platforms or larger capacity not exercised |

[ADR-0061](https://github.com/agent-teams-ai/engineering-foundation/blob/c4b0576f4ca935446d44bf97db92aafc99d8fcd5/docs/decisions/0061-library-first-foundation-boundary-evolution.md) already removed the former **two-existing-consumer gate**: expected repeated need justifies designing reusable tooling in Foundation from the start. It nevertheless literally retains same-delivery disposable projects **and at least one real consumer**, parity/conformance in adopters, and deletion of superseded implementations for shared-component admission/adoption.

Do not rewrite that historical text as “a real consumer is required only after publication.” The current experiment does not declare shared-component admission and therefore does not need to misinterpret the clause. The user's explicit Foundation-first direction authorizes this independent proof. If a later reusable-component admission needs different sequencing, resolve that scoped difference through the owner decision/successor path already described in the ecosystem draft, without silently editing accepted ADR bytes or the other agent's work.

A “planned consumer” is a specific contract and intended seam, not evidence that code was installed or used. A fixture need not implement a whole app, but should exercise a materially distinct consumer risk. Two directories with the same one-line example are weak evidence of portability.

## Round 1 findings and required corrections to the plan

These are **plan risks / acceptance constraints**, not claimed defects in an implementation not yet reviewed.

### R1 — High: maintained TypeScript requires an actual strict check

Research main's [package.json](https://github.com/agent-teams-ai/engineering-research/blob/4ad091c10d591cacb6af55b09ed67a935cd7fcad/package.json) currently runs documentation checks only and has no TypeScript compiler project. If this task adds a maintained TypeScript harness/tests, successful execution or Docs Protocol cannot prove strict typing.

Use an exact supported TypeScript >=7.0.2 project for every new maintained TS helper and wire the real check through its owning required route. Keep the experiment isolated rather than creating a broad root application workspace. The simplest acceptable alternative may be only explicit fixture/configuration files plus documented invocations, with no custom maintained runner if one is unnecessary.

Intentionally rejecting semantic fixtures have their own expected-result contract; they must not be excluded indiscriminately as “untyped.” State which inputs are ordinary strict-positive fixtures, which intentionally diagnose errors, and how each outcome is evaluated. Do not choose another language simply to evade the TS requirement.

Source: [organization language/strict coverage rule](https://github.com/agent-teams-ai/.github/blob/03c8f102681569f525f44577a705bc4e5900e492/docs/engineering-quality-standard.md#typescript-for-javascript-runtimes).

### R2 — High: do not qualify a different checker by accident

Record actual runtime, platform, package versions, executable path and selected engine/build, not only a top-level package version or command alias. Pin all installed inputs and the lockfile; use a disposable project. A tool that silently selects another native backend, patches the surrounding project, or falls back to stock TypeScript can invalidate the claim.

An Effect diagnostic failure must remain a failure. Stock TypeScript passing the same source establishes an independent baseline, not successful Effect diagnostics. Do not add automatic fallback that turns a known semantic finding into success. Inspect before/after relevant project files or otherwise demonstrate the no-unrequested-mutation boundary.

The historical study already warns that the Nov13 EF cohort and the upstream supported native builds differ. Revalidate the specific versions needed for Nov24's experiment; retain the old table as dated evidence rather than silently labeling it current.

Sources: [historical diagnostics proposal](https://github.com/agent-teams-ai/engineering-research/blob/32672acf2f56e8ead603b31c71636eb5fa353664/docs/studies/effect-architecture-and-reusable-mechanisms-2026-11-14.md#ready-made-tooling-the-typescript-7-diagnostic-opportunity), [current checker fallback contract](https://github.com/agent-teams-ai/engineering-foundation/blob/c4b0576f4ca935446d44bf97db92aafc99d8fcd5/packages/stack-toolchain/README.md#type-checking-and-fallback).

### R3 — Medium: test use sites and policy precision, not mere imports

The retained proposal's minimum discriminating cases remain useful:

1. A stable allowed API succeeds under the chosen strict/compiler configuration.
2. Actual use of an unstable export rejects at intended blocking severity.
3. Alias-mediated use still rejects.
4. A stable exported signature leaking the unstable type rejects where the upstream rule promises it.
5. An exact allowed module/export use succeeds.
6. A sibling export outside that allowlist still rejects.
7. Misconfiguration or unavailable/unsupported engine is reported as qualification failure or unsupported scope, never a clean pass.

A bare unused unstable import is not the right independent negative oracle if upstream diagnoses later use sites. Check semantic rule IDs and relevant source locations, not only prose rendering or any nonzero exit. Explicitly distinguish compiler errors, configuration errors and expected Effect diagnostics. Do not derive expected findings from the same implementation output.

### R4 — Medium: fixture success is not Foundation activation or scale proof

Keep output wording scoped to the measured cohort and scenarios. An installed diagnostic package is not an activated gate; an editor plugin entry is not a CI command. A small fixture's timing is a baseline observation, not a million-line scalability result. Dedicated semantic checking may repeat compiler work, so report cold/warm or repeated-command observations only with the executed conditions and no unsupported extrapolation.

This step should be allowed to conclude “upstream diagnostics work, existing native cohort needs a separate integration,” “rule behavior is incomplete,” or “not worth adopting yet.” Negative results are deliverables.

### R5 — Medium: preserved history needs a new dated checkpoint

PR 9 contains strong source-backed historical research, but the review and tooling tables are Nov13 observations and its recommended real-consumer inventory preceded the latest direction. Reconcile/rebase PR 9 independently, keep its source pins and earlier review evidence intact, and add a clearly dated Nov24 follow-through or link to a new active study.

Do not change a historical “not executed” observation into “executed” because today's experiment runs. The new result gets its own identity, fixture hashes and scope. Nor should PR9's obsolete base or old CI be represented as qualification of the rebased current head.

### R6 — Low/medium: avoid an accidental permanent research tool

A retained harness is acceptable; a reusable runner with profiles, discovery, caching, plugin hooks or general suppression policy needs an owner. Stop before that expansion. The probe should leave a clear promotion question for Stack Toolchain / EF rather than becoming a second toolchain hidden in Research.

A good outcome could require **zero new runtime code** and only a small configuration/fixture wrapper around upstream tools. Prefer that if it establishes the desired falsifiable result.

## Canonical storage and documentation workflow

The accepted Research map says scoped studies belong in `docs/studies`, raw experiments at their existing evidence paths, and one maintained entrypoint should contain objective, current checkpoint, next actions, authority, acceptance and stop conditions.

Recommended minimal layout:

- One current study/handoff under `docs/studies`, created through Docs Protocol if new; it owns the Nov24 objective, decisions, evidence interpretation and next spikes.
- A direct link from `docs/studies/README.md`, plus a concise cross-link from the reconciled historical Effect study.
- `evidence/experiments/effect-diagnostics-2026-11-24/` for README/reproduction, exact fixture inputs, minimal harness if necessary, lock/configuration, source/environment manifest and retained results.
- Relevant critique rounds and resolutions under an existing `evidence/reviews/...` route or within the experiment's bounded evidence set, linked from the active study; avoid appending whole chats to the active plan.

There is an inspected precedent: [AutoGPT source experiment](https://github.com/agent-teams-ai/engineering-research/blob/4ad091c10d591cacb6af55b09ed67a935cd7fcad/evidence/experiments/autogpt-2026-11-06/README.md), which separates exact inputs, executed observation and unproven deployment behavior. Its Python harness does not exempt new TypeScript code from the current standard.

[Research authoring skill](https://github.com/agent-teams-ai/engineering-research/blob/4ad091c10d591cacb6af55b09ed67a935cd7fcad/.agents/skills/docs-authoring/SKILL.md) requires reading `docs.config.yaml` and authorities, discovering existing material, previewing the new-document Plan, applying its exact digest, adding the returned direct index link, refreshing context and running checks. The [profile](https://github.com/agent-teams-ai/engineering-research/blob/4ad091c10d591cacb6af55b09ed67a935cd7fcad/.docs-protocol/document-authoring.yaml) has a registered `study` type, owner `research/maintainers`, initial status `active`, placement in `docs/studies` and manual index `docs/studies/README.md`. An active study's document status does not mean its technology recommendation is accepted.

The catalog currently covers `docs`, not raw `evidence`. That is deliberate placement, not proof that an evidence script is typechecked or that its assertions ran. Check those separately. Do not modify the authoring engine or metadata schema for this one experiment.

## Smallest delivery and review sequence

1. Reconcile current PR9 against current Research main, preserving historical evidence; resolve only overlapping links/indices and factual freshness labeling. The existing newly merged enterprise-execution study is separate work, not missing content to duplicate.
2. Prepare the narrowly scoped diagnostic plan and review its version/engine, mutation, negative-oracle and strict-typing risks before execution.
3. Run the disposable experiment, persist exact outputs and before/after identities. Include positive, rejecting and unsupported/configuration cases; avoid installing or upgrading anything in product repos.
4. Independent critique round 2 reviews the **actual files/results**, exact head/source identity and claims. Resolve counterexamples; use a focused delta review only where changes affect the conclusion.
5. Root performs required authoring, focused code and merge gates for the actual changed surface, records current-head review and verifies the merged result. This review is not execution or CI evidence.
6. Record one owner-linked disposition: compatible ready-made path merits a scoped integration proposal; supported but mismatched cohort needs a compatibility spike; missing/noisy semantic protection needs upstream feedback or deferral; disproportionate cost means remain opt-in/deferred.

For future implementation, a technical adapter belongs with the existing tool owner. An EF capability should be proposed only if distinct reusable orchestration/reporting policy is demonstrated. It must remain opt-in and need no production Effect import merely because the tooling checks Effect code.

## Next spikes ordered by decisions they could change

1. **Exact diagnostic compatibility — now.** Does the ready-made checker catch the promised misuse under a permitted, explicitly identified toolchain without mutation or semantic downgrade? This can directly decide whether an adapter is worthwhile.
2. **Authoritative tool-owner integration — conditional.** Can the existing Stack Toolchain execution/fallback/report contract incorporate the qualified path with no competing authority? Test narrow failure semantics and supported platform envelope before designing a new capability.
3. **Representative planned-consumer ergonomics — conditional.** Exercise at least two materially distinct intended boundaries, such as a public library surface and application-owned adapter, with explicit scope/allowlists. They remain fixtures until a real owner activates them.
4. **Incremental/cold cost — conditional.** Use actual representative source/type graphs and existing measurement mechanisms; measure extra compiler work, reject soundness loss, and coordinate with PR474's growth investigation. No new cache or global analyzer from speculation.
5. **Application correctness follow-through — later owner work.** State/cursor consistency, cancellation, durable intent, SSR/request isolation and physical custody need their existing consumer owners. They are valuable next integration questions, not preconditions for the diagnostic experiment or excuses to build a research runtime.

## Critical decisions to record explicitly

- Chosen exact upstream package, compiler/backend, Effect version, runtime/platform and source identity.
- Experiment-only status and which supported cohort is actually exercised.
- Independent fixture expectations, rule severity, exact allowlist and denied sibling behavior.
- Handling of known diagnostics, unsupported engine, cancellation/time limits and incomplete output.
- Whether the probe changes any surrounding files or relies on unrecorded global state.
- New maintained source ownership and effective strict coverage.
- What the result justifies, what it does not justify, and the owning next action.
- Whether any real consumer has adopted anything: presently **none by this task**.

This is sufficient to advance the foundation without inventing a universal platform or changing other owners' accepted contracts.

