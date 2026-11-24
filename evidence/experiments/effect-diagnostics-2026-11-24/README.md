# Native Effect diagnostics qualification — 2026-11-24

**Result:** 15 compiler scenarios pass on Linux x64 with the pinned cohort below. The native Effect checker rejects the intended violations; an independent stock TypeScript checker supplies the ordinary typing controls. The harness is itself strictly typechecked before scenarios. This is retained foundation research, with zero application/runtime implementation and no activated EF consumer.

The [current study](../../../docs/studies/effect-diagnostics-and-foundation-qualification-2026-11-24.md) owns interpretation, critique, next decisions and scope. The earlier broad Effect architecture research remains separately dated.

## Reproduce

Use Linux x64, Node 24.22.1 or a compatible 24.x patch, and pnpm 11.25.0. From the repository root:

```sh
PNPM_MAX_WORKERS=1 pnpm --dir evidence/experiments/effect-diagnostics-2026-11-24 install --frozen-lockfile --ignore-scripts --network-concurrency=1 --child-concurrency=1
pnpm check:effect-experiment
```

`check:effect-experiment` uses the nested package's `check`: the official `npm audit signatures --json --include-attestations` verifies installed registry signatures and available provenance first, then the TypeScript harness checks exact executable identities, versions, paired standard libraries and its own strict project before running cases. No setup/patch command, legacy JS Effect plugin or incompatible JS launcher is installed or executed. HTTP examples are compiled only; they send no requests.

The bounded importer setting matters in resource-limited environments. Three earlier installation attempts ended with status 137 before any compiler ran. Kernel OOM evidence was unavailable, so they are recorded as terminated installs rather than proven OOM. `/tmp` was RAM-backed; moving only our archives/store to disk and then limiting pnpm's separate importer/hash worker pool with `PNPM_MAX_WORKERS=1` allowed the frozen installation to complete. Network/build concurrency alone had not bounded that worker pool. The same limit is retained in CI; no supply-chain policy or fixture was weakened.

The dedicated [workflow](../../../.github/workflows/effect-diagnostics.yml) runs the same command on pull requests and every main push, alongside the existing Docs Protocol route. [Hosted run 45480774145](https://github.com/agent-teams-ai/engineering-research/actions/runs/45480774145) passed on implementation commit `509dad156704b8ef4aa98d6f36de85f7fe61b8e9`; all eight observed checks on that commit succeeded. This is execution evidence, without a claim of GitHub branch-protection enforcement. `pnpm check` continues to own documentation; the explicit experiment command and workflow own this Linux qualification.

## Exact execution cohort

| Input | Version / identity |
| --- | --- |
| Effect native compiler package | `@effect/tsgo-linux-x64@0.73.4` |
| Executable | `lib/tsc`, SHA-256 `18b0b3fdac7d76b8c9b97e64c185ce8d92f2e13ab2307ae18a27fb11a62c045c` |
| Reported Effect compiler | `Version 7.0.2+effect-tsgo.0.73.4` |
| Independent stock compiler | `@typescript/typescript-linux-x64@7.0.2`, `lib/tsc`, SHA-256 `4f2de678286401759b3fb4475bafe35b8f32b4b3a07d92642bbf37eadc9b34a4` |
| Reported stock compiler | `Version 7.0.2` |
| Both TypeScript source identities | `2bd066d87f5bafd315be9f40889d0a60b9e58e0b` |
| Standard libraries | 108 declarations, identical names and SHA-256 hashes in both native packages |
| Compiled Effect declarations | `effect@4.1.5` |
| Harness ambient declarations | `@types/node@24.19.2`; locked `undici-types@7.24.6` |
| Local execution | Node 24.22.3, Linux x64, compiler processes `GOMAXPROCS=2` |
| Lock authority | This directory's `pnpm-lock.yaml`; exact direct pins and transitive integrity |

The platform packages are deliberately direct dependencies. This avoids installing the incompatible Effect wrapper or selecting an executable by a mutable tag/global PATH. Keep each native executable beside its shipped `lib*.d.ts`. Other OS/CPU packages and their executable hashes are unqualified by this experiment.

The [measured Effect platform tarball](provenance/native-package-footprint.json) is 130,041,154 bytes compressed and 333,854,566 bytes unpacked; the selected compiler is 27,021,472 bytes. Unpacked size means the sum of regular-file bytes, not allocated disk space or process memory. It also contains other supported upstream tool variants. The future integration must account for that footprint and compiler work instead of assuming a small wrapper is a small dependency. Published package bytes were not repackaged.

## What actually passed

Every negative row below returned **1** in the retained local run, with the exact expected primary code, fixture line and category. The harness accepts only the upstream compiler's diagnostic statuses 1/2 together with those exact findings; arbitrary nonzero status is insufficient.

| Scenario | Native Effect result | Stock TypeScript control |
| --- | --- | --- |
| Stable Effect value | 0, no diagnostics | 0 |
| Ordinary type error | 1, TS2322 | 1, TS2322 |
| Bare unused unstable import | 0, no unstable-use finding | 0 |
| Actual unstable export use | 1, TS377136 | 0 |
| Renamed import and local alias | 1, three TS377136 use-site findings | 0 |
| Stable public interface exposing `HttpClient` | 1, TS377137 | 0 |
| Owned structural port | 0 | 0 |
| Allow exactly `HttpClient#get` | Get aliases/namespace pass; `post` alone rejects with TS377136 | 0 |
| File-scoped replacing allowance | Adapter allows post/denies get; outside allows get/denies post; two expected findings | 0 |
| Default Effect warning | 1, warning TS377136 | 0 |
| Explicitly nonblocking warning | 0, warning TS377136 retained | 0 |
| Error under the same warning policy | 1, error TS377136 | 0 |
| Leak rule left at its default off | 0 despite the same leak | 0 |
| Plugin absent | 0 despite unstable use | 0 |
| Plugin explicitly disabled | 0 despite unstable use | 0 |

These controls establish actual enforcement and its absence. `--showConfig` in this cohort does **not** print the Effect plugin options even when rules work. It supplies effective strict/noEmit/noCheck/skipLibCheck and root-file evidence; behavior canaries supply rule activation, severity and allowlist evidence.

Primary TS377137 is the leak rejection. Related-information TS377138 exists in the upstream diagnostic model but was not separately printed by this plain formatter; this receipt does not claim two leak violations.

The [local receipt](results/local-2026-11-24.json) contains 48 process observations: two versions, the strict harness check, and effective config/stock/native checks for each scenario. It includes exact arguments, exit/signal, raw output, elapsed observations, 108 library hashes and the complete input manifest, with unchanged bytes verified before and after execution. It passed after the reviewer-requested output-classification fix. Its elapsed process total was approximately 32.7 seconds; this is a single bounded run, not a scalability benchmark.

The separately retained [hosted receipt](results/github-actions-45480774145.json) was extracted from the actual successful job log. It ran Node 24.22.1 and reports the same 15 outcomes with all 32 input and 108 library hashes matching the local corpus. The [hosted signature report](provenance/github-actions-signatures-45480774145.json) matches the audit digest bound by that receipt. The [delivery record](results/ci-delivery-509dad1.json) names the exact source tree, run/job and eight successful checks, including JavaScript/TypeScript CodeQL analysis; it does not retarget that historical evidence to later commits.

## Test-oracle and failure boundary

`cases.json` is the independently authored expectation set. All ten TS fixture files are accounted for by effective case roots. The intentional negative fixture files belong to these strict compiler scenarios; they are not unchecked application code. `qualify.ts` belongs to `tsconfig.harness.json` and receives a stock strict check before scenario execution. It is the only maintained TS helper.

The runner uses direct child-process arguments, a 60-second per-process bound and a 2 MiB output cap. Spawn errors, timeout, signal, incomplete capture, mismatched binary, unexpected status or findings fail. There is no diagnostic-to-stock fallback. Stock runs are separate controls whose success cannot erase an Effect failure.

The fixed formatter contract is deliberately narrow: each nonempty stdout line must be a primary diagnostic in the observed plain format, and stderr must be empty. Multiline or unfamiliar output requires a reviewed corpus/parser change. Two synthetic oracle checks prove that an otherwise correct TS2322 followed by a crash on stdout or stderr is rejected. These are harness failure controls, not additional compiler scenarios or claims of inducing an actual upstream crash.

Checked source/config/lock/harness bytes are hashed before and after execution. Generated reports are written only under `results/`; tracked input mutation fails. Review-only metadata and retained receipts are not regenerated by normal checking.

## Artifact evidence and limits

The `provenance/` directory retains inert archive inspection, registry-signature verification and the official installed-package verifier output. The official verifier exited 0 with empty `invalid` and `missing` arrays and verified provenance bundles for the Effect native package, Effect and `undici-types`. Stock TypeScript registry bytes/signatures were verified independently; its publishers advertise no Sigstore attestation for this exact release, so none is claimed.

The normal `@effect/tsgo@0.73.4` JS launcher eagerly initializes bundled TypeScript **5.9.3**. It was inspected as inert bytes and rejected; running `effect-tsgo tsc@7.0.2` would still initialize that older parent parser. Its static preflight remains evidence of the incompatibility, not execution approval. This experiment uses only the separate shipped native package.

This receipt qualifies selected diagnostics, not all Effect rules, editor/LSP integration, hidden dependency edges, remote branch protection, runtime cancellation, transactions, production performance or million-line repositories. API-stability tags are upstream metadata; they complement public exports and architectural boundary checks. A future tool-owner integration must qualify unsupported engines, invalid consumer configuration, process management and platform packaging at its actual seam.

## How a planned consumer could use the result

An explicit consumer pilot can install the same native-only cohort and call its `lib/tsc -p <owned-config> --noEmit --pretty false`. The actual supported platform, reviewed package integrity, rule severity, checked sources and narrow exceptions remain that consumer's declared choices. For example, an owned technical adapter can allow one HTTP export while its public application/SDK surface rejects unstable type leakage. The fixture configurations demonstrate this separation without requiring a complete application.

The production adoption question belongs first to Stack Toolchain's existing technical execution owner. Compare a compatible upstream launcher release with a small opt-in integration there. Reuse its process/failure semantics; do not copy this experimental runner into each project, replace existing typecheck fallback silently, or create a parallel AST analyzer. Promotion and release are separate decisions from this demonstrated experiment.
