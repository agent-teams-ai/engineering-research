---
id: research.studies.effect-diagnostics-foundation-2026-11-24
type: study
status: active
owner: research/maintainers
summary: Qualify ready-made Effect diagnostics in disposable foundation-first fixtures; retain exact toolchain evidence, critique and owner-specific next decisions.
---

# Effect Diagnostics and Foundation Qualification 2026-11-24

## Agent start here

**Objective:** qualify ready-made Effect diagnostics before the planned applications exist, preserve the architectural conclusions, and identify the next decisions that can change foundation design. The owner clarified on 2026-11-24 that this is **foundation first**: planned consumers and disposable conformance projects are useful now; a mature Effect application is not a prerequisite for research or this experiment.

**Current checkpoint:** source and published-artifact preflight, two independent plan-critique rounds, and reconciliation of the historical research are complete. Execution is the next step; no fixture result is claimed yet. The [historical Effect architecture study](effect-architecture-and-reusable-mechanisms-2026-11-14.md) was preserved byte-for-byte and delivered through [PR 9](https://github.com/agent-teams-ai/engineering-research/pull/9), merge `db9f67d199961b744d0f204253e5d306a06e0fd6`. Its Nov13/14 observations remain dated evidence.

**Next durable update:** retain the exact fixture package, independent expectations, compiler identities and outputs under `evidence/experiments/effect-diagnostics-2026-11-24/`; replace this checkpoint with the observed results and the narrow disposition they justify. Preserve failed or unsupported observations as such.

This study owns research evidence and the current handoff. It does not enact an EF capability, change Stack Toolchain defaults, migrate GM, publish npm packages, adopt an application runtime or certify production scale. Package publication and current GM/Live Module Updates work belong to parallel owners. No real application is claimed to have adopted this experiment.

## Foundation-first interpretation and ownership

The accepted [research maintenance route](../methodology/research-maintenance.md#foundation-first-evidence-to-decision-route) and [open decision docket](../lessons/preimplementation-decisions.md#foundation-first-decision-docket-2026-11-24) own the common evidence-to-decision structure. Link this scoped result into those owners rather than creating a second ecosystem roadmap.

| Responsibility | Owner and useful evidence now | Later claim requiring separate evidence |
| --- | --- | --- |
| Effect semantic diagnostics | Upstream Effect checker; this research tests its exact shipped behavior | A qualified supported tool integration |
| Compiler discovery, execution and failure classification | Existing Stack Toolchain owner | An explicit opt-in command/profile and supported platform cohort |
| Reusable development conformance | Engineering Foundation, with architecture-neutral core and explicit standard-specific packages | Admission of a shared capability and adopter parity |
| Allowed unstable APIs, stable public surface and checked source inventory | Each intended consumer's explicit policy | Actual activation in an SDK or application |
| Composition and resource lifetime | GM and native Effect contracts | No new lifecycle owner follows from this experiment |
| Business invariants, transactions, authorization and recovery | Application/SDK/Runtime owners | Contract tests and deployment evidence at their real boundary |

EF [ADR-0061](https://github.com/agent-teams-ai/engineering-foundation/blob/c4b0576f4ca935446d44bf97db92aafc99d8fcd5/docs/decisions/0061-library-first-foundation-boundary-evolution.md) already permits library-first design from a concrete expected repeated need instead of waiting for a second existing consumer. Its shared-component admission still names same-delivery consumer/parity evidence. This retained experiment makes no admission claim and does not rewrite that ADR. If later admission sequencing conflicts with the new owner direction, propose a scoped successor through the existing owner; do not invent current adoption.

Planned consumers should name materially different boundaries: a public SDK surface, a backend adapter and a frontend/request boundary. These are requirements and disposable test scenarios until an owner actually installs and activates a package. Millions of lines, many modules and many agents motivate measurement; their mention is not a measured capacity result.

## The concrete opportunity and the discovered incompatibility

`@effect/tsgo` adds Effect-specific semantic diagnostics to a native TypeScript checker. This is useful typing feedback and enforcement of selected source contracts. It is not a new application type system, a native Effect runtime, application AOT compilation or proof of Clean Architecture.

The current published release inspected is **0.73.4**, source [`aa2db44499067a798028cff9d3b1b9ca1e156f57`](https://github.com/Effect-TS/tsgo/tree/aa2db44499067a798028cff9d3b1b9ca1e156f57). Its [upstream matrix](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/_packages/tsgo/upstream.json) explicitly includes TypeScript 7.0.2. The inspected EF [catalog](https://github.com/agent-teams-ai/engineering-foundation/blob/c4b0576f4ca935446d44bf97db92aafc99d8fcd5/pnpm-workspace.yaml) still has tsrs `0.18.0-ts7.1.0-dev.20260929`, Oxlint `1.83.0` and companion `7.0.2001`, outside this Effect tool's supported cohort. Therefore this experiment does not patch or replace EF's existing checkers.

### Published JavaScript launcher: rejected for our compiler floor

Static inspection of the registry-authenticated `@effect/tsgo@0.73.4` tarball found an eagerly initialized **TypeScript 5.9.3** inside `dist/effect-tsgo.cjs`. The bundle contains the compiler version and a top-level `require_typescript()` before CLI routing. Source explains why: [CLI](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/_packages/tsgo/src/cli/index.ts) imports setup, which [imports TypeScript](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/_packages/tsgo/src/cli/setup/changes.ts).

The normal `effect-tsgo tsc@7.0.2`, `diagnostics`, `setup`, `patch` and even help entrypoints must therefore remain unexecuted under our >=7.0.2 compiler/parser rule. Selecting a newer child compiler does not fix its parent's initialized parser. Do not patch published bytes or hide the dependency to produce a green result.

### Shipped native compiler: selected bounded experiment

The same release ships `@effect/tsgo-linux-x64@0.73.4/lib/tsc` with paired libraries. Its inspected archive has no JavaScript, dependencies, lifecycle scripts or links. The selected static Go executable is TypeScript 7.0.2 according to its embedded build information and `lib/upstream.json`; upstream TypeScript source is `2bd066d87f5bafd315be9f40889d0a60b9e58e0b`.

Pin the platform package and actual executable SHA-256 `18b0b3fdac7d76b8c9b97e64c185ce8d92f2e13ab2307ae18a27fb11a62c045c`. Keep adjacent libraries together. Direct execution uses upstream's compiler without its incompatible JS launcher. This is an exact-release integration detail to qualify, not a promise that internal package layout never changes.

Registry archive integrity and ECDSA signatures were verified. Decoded SLSA payloads bind both wrapper/native archive digests to the release source and [upstream release run](https://github.com/Effect-TS/tsgo/actions/runs/45076223843). Payload matching alone is not full Sigstore verification; record the official installed-package verifier's result separately before execution. No compiler was run during this preflight.

## Planned qualification contract

Use one disposable Linux x64 package, exact pins and lockfile, scripts-disabled installation, an explicit strict TS project for the small harness, and the real check route in CI. Keep Docs Protocol intact. No HTTP request or application effect is executed: the HTTP examples are compiled only against the shipped `effect@4.1.5` declarations.

| Scenario | Independent expected result |
| --- | --- |
| Strict ordinary TypeScript positive | Success with no diagnostics |
| Ordinary TypeScript type error | TS2322 and a real nonzero compiler status |
| Bare unused unstable import | No unstable-use finding; it is a control, not the negative case |
| Actual unstable export use, renamed import and local alias | TS377136 at actual use sites when enforcement is enabled |
| Stable exported signature leaking an unstable type | Primary TS377137 at the stable surface; TS377138 is related information, not a second independent violation |
| Stable structural port | Success without leaking the external unstable type |
| Exact export allowance | The named export and its aliases pass; an adjacent export remains rejected |
| File-scoped allowance | Allowed adapter file passes while a neighboring disallowed file still rejects; override replacement semantics are explicit |
| Default warning policy | Ordinary native tsc returns nonzero for an Effect warning by default |
| Explicit nonblocking warning policy | Set `ignoreEffectWarningsInTscExitCode: true`; preserve `ignoreEffectErrorsInTscExitCode: false`; warning can pass while an error still rejects |
| Missing/disabled policy control | Ordinary typing can pass an Effect-specific violation; that is a demonstrated absence of enforcement, not a qualified gate |

Use ordinary native tsc mode. The [dedicated diagnostics collector](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/etsdiagnostics/diagnostics.go) filters out ordinary TypeScript errors and can report success for files without plugin configuration. It cannot replace strict typecheck. Its internal JSON protocol is not needed by this pilot.

The [exit hook](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/etsexecutehooks/init.go) and [default options](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/etscore/options.go) distinguish tsc warning/error policies. The configuration name `@effect/language-service` selects native rules; it does not require installing or executing the old JS language-service plugin.

Record exact arguments, binary/version, package/source hashes, checked inventory, raw bounded output, exit/signal and elapsed time. Missing executable, mismatched hash/version, timeout, signal, incomplete output or unexpected diagnostics fail qualification. A stock compiler baseline is allowed only after its own >=7.0.2 closure preflight; it must never rescue an Effect diagnostic failure. Expected answers are independently written, not generated from the observed output.

## Critique and decision record

The [retained reviews](../../evidence/reviews/effect-foundation-2026-11-24/) preserve the two plan rounds, artifact/design preflight, PR inventory and exact-head reconciliation review. PR states in those reports are observations at their stated times; the current checkpoint above and live repository state take precedence for continuation.

1. **Architecture/ownership critique:** proceed with research-only qualification; require effective strict coverage of every maintained helper, preserve dated evidence and separate fixture results from admission or consumer activation.
2. **Artifact/mode critique:** reject the eager 5.9.3 wrapper; use only the pinned native artifact after preflight; correct the false assumption that native tsc warnings normally exit zero; distinguish primary leak diagnostics, file-level scope and infrastructure failures.
3. **After execution:** independently review actual code, expectations, retained outputs and claims. Resolve concrete counterexamples; rerun only affected checks plus required final gates.

| Option | Incremental production/integration LOC | Test/fixture/config LOC | Complexity /10 | Scoped reliability /10 | Confidence /10 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Selected native-only retained experiment | 0 product; about 150–250 harness/check wiring | about 100–180 | 4 | 8 | 8 before execution |
| Later Stack Toolchain opt-in integration | about 120–220 beyond the experiment | about 120–200 | 5 | 8 | 6 before platform qualification |
| Wait for a compatible upstream JS launcher | about 20–60 eventual integration | same discriminating corpus | 2 | 8 | 7; upstream timing unknown |
| Implement our own Effect analyzer | Outside this bounded task | A large independent corpus | 9 | 4 initially | 2 |

These are ordinal engineering judgments, not availability statistics. LOC are estimates, separate from documentation, proof metadata and platform/release work. Reassess if implementation exceeds the small-experiment budget instead of growing a second toolchain in Research.

## Where to think and test next

The previous broad study remains the source-backed comparison of T3 Code, OpenCode, LiveStore, Alchemy, Centrifugo and large-codebase tooling. The next work should test the decisions those observations can change, with one implementation owner for each concern.

| Priority / question | Smallest useful spike and rejecting evidence | Owner and stopping condition |
| --- | --- | --- |
| 1. Can native diagnostics protect our source contracts? | This exact compiler/Effect cohort; positive, negative and policy-precision cases | Research now; stop on an unverified engine, wrong diagnostics or prohibited parser |
| 2. Where should a qualified diagnostic command live? | Compare upstream launcher fix with narrow Stack Toolchain execution using its existing process/failure owner | Stack owner; no new EF capability unless distinct reusable orchestration is demonstrated |
| 3. Does the policy fit planned SDK/backend/frontend boundaries? | Public SDK unstable leak, backend adapter allowance and strict adjacent application boundary; materially different disposable consumers | Consumer contract owners; do not require a complete application and do not call fixtures activated consumers |
| 4. What breaks at large module/type graphs? | Bounded 100/1,000/10,000-module source cohorts; cold/warm compiler time, memory, output determinism and diagnostic completeness; measured growth curves | Existing GM and EF scale owners; coordinate their current work, no duplicate graph engine or speculative cache |
| 5. Are public boundaries actually closed? | Package exports plus installed declarations, aliases/deep imports, generated source inventory, stable type leaks | Existing FMS/Foundation capabilities first; a diagnostic tag rule alone is insufficient |
| 6. Are resource and state guarantees substitutable? | Abort accepted versus settled; request/SSR isolation; stale callbacks; state/cursor commit together; failed release/recovery behavior | Existing runtime/SDK owners; keep native resource, stream and transaction owners explicit |
| 7. Can external effects recover honestly? | Intent/receipt/outbox replay, ambiguous completion and idempotency at a disposable provider boundary | Existing durable-work owner; no exactly-once claim from Effect retry/Scope alone |

For each material design decision, compare the accepted current option, the proposed alternative and the strongest realistic counteroption; state its guarantee, failure boundary, evolution cost, source evidence and reversal criterion. Use two independent critical reviews for disputed conclusions. Archive their findings and resolutions; do not turn repeated summaries into evidence.

## Architectural conclusions to retain

- **SOLID:** narrow consumer-owned ports and substitutable failure/lifetime semantics matter more than classes or generic managers. Scope, cancellation and cleanup must have a named owner.
- **Clean Architecture:** domain policy stays inward; transport/provider/compiler details stay at their owning technical boundary. Native Effect ports can be appropriate for explicitly Effect-owned infrastructure; that does not force unstable technical types into stable domain/SDK contracts.
- **DRY:** reuse one implementation of the same mechanism and one source of policy. Do not unify different business meanings merely because their code looks alike. Independent negative test oracles are intentional duplication of expectations.
- **Deterministic agent work:** canonical entrypoints, exact contracts and source inventories, bounded permissions, structured evidence and rejecting gates. A model review is useful criticism, not a deterministic approval authority.
- **Backend and frontend:** Effect is usable on both. It can own backend services, concurrency and resources as well as frontend asynchronous work. HTTP, persistence, authorization, durable execution and UI state still need their appropriate selected owners and stability profiles. No frontend-only restriction follows from this tooling experiment.
- **Foundation readiness:** explicit contracts, prototypes, measured qualification and documented limits can progress before applications. Completion of one diagnostic spike does not establish the readiness of every runtime, product or future scale target.

## Sources and freshness

This is a 2026-11-24 follow-through, not a refreshed date for the historical study. Current source observations are pinned above. The [organization quality standard](https://github.com/agent-teams-ai/.github/blob/03c8f102681569f525f44577a705bc4e5900e492/docs/engineering-quality-standard.md), [Foundation ownership](https://github.com/agent-teams-ai/engineering-foundation/blob/c4b0576f4ca935446d44bf97db92aafc99d8fcd5/docs/architecture/ownership.md) and [Stack Toolchain guide](https://github.com/agent-teams-ai/engineering-foundation/blob/c4b0576f4ca935446d44bf97db92aafc99d8fcd5/packages/stack-toolchain/README.md) define the inspected owner boundaries. Re-read current owners before integration; a source link does not adopt a new pin.

The fixture candidates are backed by shipped [Effect 4.1.5 HTTP declarations](https://github.com/Effect-TS/effect/blob/e3aca1f1484e623cee09b7f3fa18d6ff5d66c0e8/packages/effect/src/http/HttpClient.ts), the [unstable-use rule](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/docs/rules/unstable-api-usage.md), [API leak implementation](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/internal/rules/api_stability_leak.go), and [upstream allowlist fixtures](https://github.com/Effect-TS/tsgo/blob/aa2db44499067a798028cff9d3b1b9ca1e156f57/testdata/tests/effect-v4/stabilityApiUsageAllowed.ts). Inspected upstream tests are not our executed tests.
