# Task Verification — retained model-free research evidence

Observation date: **2026-11-12**. Read the [architecture and routing supplement](../../../docs/studies/task-verification-architecture-and-routing-follow-up-2026-11-12.md) for the interpretation and source-qualified recommendations.

## Provenance and scope

`snapshot/` is an exact subset of the source and raw results from the original local research archive, retained without edits. [manifest.json](manifest.json) records every retained file's SHA-256 and size, the original archive digest and the two upstream Git blob identities. Generated HTTP fixture directories are omitted because the runner reconstructs them. The original HTML report is omitted because the new study carries the maintained explanation and corrects its ambiguous introductory count.

These files are **frozen research evidence**, under the organization's retained-evidence boundary-format rule. They are not new maintained application/test tooling, a stable verifier implementation, or an added CI gate. They ran with Node **24.22.1** using native TypeScript stripping; no compiler/typecheck evidence is claimed. Future maintained implementation must follow its own TypeScript/compiler and qualification rules.

No full upstream code is redistributed. The reproduction helper reads caller-supplied source files from the exact revisions in [sources.json](snapshot/sources.json), verifies the Git blob hashes and then evaluates only the reviewed pure functions. It performs no downloads or model calls.

## Recorded results

- [Local spike result](snapshot/results/spikes.json): **44 named checks passed, 0 failed**. One check explores **60 sequential schedules**, with **30 illustrative stale-delivery opportunities** under a digest-only comparison. The HTTP observations comprise **12 localhost requests** across four synthetic candidates.
- [Kodus policy result](snapshot/results/kodus-policy-probe.json): **7/7** expected pure-policy cases.
- [ReviewRouter background result](snapshot/results/rr-background-probe.json): **7/7** expected exact-function cases.
- [Independent disposable-copy rerun](review-rerun.json): repeated the same checks while preserving the original source/results.
- Experimental model calls: **0**.

The **14 upstream assertions are additional to the 44 named checks**. Sequential schedules, HTTP requests and named checks are different units; do not sum them into an E2E count.

P2/N2 deliberately have identical route diffs but different unchanged helpers and baseline snapshots. They illustrate context dependence, not controlled reviewer quality. Fixture expectations are self-authored and source-reviewed, not an independently accepted benchmark. The parent-process HTTP oracle is separate from the candidate child; this is not a hostile-code sandbox.

## Reproduce in a disposable copy

Copy `snapshot/` to a temporary working directory before running. The runner writes `results/` and generated `fixture-data/`; keep the retained originals unchanged.

```sh
node run.ts
```

The only network traffic in this command is to synthetic `127.0.0.1` servers. No provider SDK, API credential or dependency installation is required.

For the optional exact upstream probes, obtain the two pinned source files through an authorized source-reading path, then run from the copied directory:

```sh
node reproduce-upstream-probes.ts /absolute/kodus-check-policy.ts /absolute/rr-invocation-adapter.ts
```

The helper uses Node's experimental `stripTypeScriptTypes` API. It fails on mismatched blob identities. Successful execution does not constitute TypeScript typechecking or execution of either upstream application's full test suite.

## Limits that accompany every result

The spike reconciles reported claims and models an already trusted evidence adapter. Its Map and synchronous publication fence do not implement cryptographic provenance, database transactions/outbox or crash recovery. Its parser accepts a narrow fixture grammar. No actual OCR binary, full competitor service, real LLM evaluation, production deployment, throughput/load test or prompt-injection robustness test was run.
