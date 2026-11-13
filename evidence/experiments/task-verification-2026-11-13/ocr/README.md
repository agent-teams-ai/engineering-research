# Managed OCR compatibility probes — 2026-11-13

This is frozen, one-off research evidence for the Task Verification architecture audit. It is not product code, a maintained test suite, a semantic model benchmark, a typecheck, or a production release gate.

## Execution scope

The published Linux/amd64 managed OCR binary `1.13.1-rr.6` was downloaded and its full SHA-256 verified before execution: `9dd5f115747d24100f0767133a3288d268f3bc399675f5b826e7a867d101ee5c`, 80,513,363 bytes. The binary reported the matching version. Its pinned build uses upstream OCR `8eb83340a487b1150af00701b94f01af97e4b4d6` and the 12 managed patches in ReviewRouter `7a079c382d8e98b426ee90a6b3764be2a21b4c49`.

There were **10 managed review invocations, one separate binary version check, and 14 HTTP requests to a synthetic loopback provider; zero real provider/model calls**. Two unchanged TypeScript source modules were additionally executed on Node `v24.22.1` with experimental type transformation; **9 assertions passed**. No TypeScript compiler/typecheck ran.

Each binary run used a new private HOME, a synthetic Git repository with no remote, explicit managed configuration, telemetry disabled, an environment allowlist, and a synthetic local capability. The child was bounded to 20 seconds, requests were capped at six, and bodies at 2 MiB. No cap or child timeout fired. The fake server bound only 127.0.0.1 and all observed requests used that endpoint. **No network namespace, syscall/egress audit, Account Gateway service, native Sub2API, real ReviewRouter backend or complete Action invocation adapter was exercised.**

## Executed cases and observed results

| Lane / case | Managed review invocations | Fake HTTP requests | Observation |
| --- | ---: | ---: | --- |
| primary / baseline | 1 | 1 | Normal task_done, native complete, zero comments and no criterion ledger. |
| primary / ledger_text | 1 | 1 | Completed assistant output_text contained a criterion ledger; task_done completed the run. The ledger was absent from native result JSON. |
| primary / tool_turn | 1 | 2 | file_read accessed an unchanged repository file. The next model request included the original tool call and function_call_output, without previous_response_id. |
| primary / legacy_rule | 1 | 1 | A marker in legacy rules[{id,content}] was absent from the model request; the same marker in the baseline exact-path rule was present. Background criteria were present in both. |
| primary / partial_stream | 1 | 1 | Truncated terminal SSE caused exit 1 and incomplete main/provider_error; no second request occurred. |
| primary / cancel_stream | 1 | 1 | Caller SIGTERM during the held response caused exit 1 and cancelled/incomplete main; the HTTP connection closed, with no retry. |
| primary / background_8001 | 1 | 0 | 8,001 ASCII characters caused the native hard-limit rejection before any model request. |
| follow-up-original / ledger_task_done | 1 | 1 | Extra criteria in task_done arguments disappeared from native JSON. Provider response model was actual-stub-model; native llm.model remained requested stub-model. |
| follow-up-original / ledger_code_comment | 1 | 3 | Added criterion_id/status/evidence fields were absent from the preserved native comment. The first fake filter answer was incorrectly task_done, causing an explicitly partial filter outcome. This is retained as a fixture failure, not a happy-path pass. |
| follow-up-corrected / ledger_code_comment | 1 | 3 | Fresh run supplied the correct approve_all_comments filter tool. Full native completion and valid filter were observed; the comment still lacked the added criterion fields. |

The low-effort comment case used three model HTTP exchanges (report comment, terminate main, filter). One OCR invocation is therefore not inherently one model request. These counts are properties of scripted fixtures, not estimates of real model cost.

## What the evidence changes

1. A prompt requesting a criterion ledger does not make the inspected native output contract carry one. Assistant text, extra task_done arguments, and extra code_comment fields are all insufficient in these specific probes. A combined review option needs a versioned output/tool/collector contract; this result does not prove that OCR can never be extended.
2. The native completion record measures group/round/phase completion. It does not assert requirement satisfaction. The empty-findings baseline completes without a criterion inventory or any criterion verdict.
3. Equal diff inputs do not mean equal available information. The managed binary can inspect unchanged repository files using embedded tools. A prompt-only comparison must equalize relevant context/tool permissions or be labelled a whole-profile comparison.
4. A typed criterion result should not be smuggled into ordinary findings: the exact parser ignores extra criterion fields, and normalization treats JSON in comment content as a finding message. A comment on an unassigned unchanged file is skipped by normalizer policy. Criterion evidence may still cite such context through a separate criterion contract.
5. Model routing is reusable, but the protocol adapter remains necessary. Observed OCR requests use POST /responses, one Bearer credential, stream=true, store=false, default service tier, UUID prompt_cache_key and reasoning.encrypted_content. They omit max_output_tokens and a Gateway request ID; the planned adapter/native admission must supply their own request identity and output cap. The observed Accept header was application/json despite streaming: the Gateway SDK route supplies its required text/event-stream Accept header. This is a source-based compatibility mapping, not Gateway runtime E2E.

## Legacy rule branch: bounded attribution

Current production-t0-review-runner source chooses buildOcrControlledRuleText for reviewSkills.kind === legacy, and the exact-path buildOcrSkillsControlledRuleText for captured Skills. The legacy builder emits rules with id/content. OcrReviewInvocationAdapter.prepare preserves that rule text when there is no memory snapshot. When memory exists, appendOcrReviewMemory translates legacy content into a native catch-all path/rule before appending memory. Captured Skills already use native exact-path rule entries.

The runtime fixture reproduced the legacy serialized shape directly against the exact binary. It did not execute the full production runner or inspect a live deployment. The supported finding is an **input-contract mismatch matching the legacy/no-memory source branch**, not a measured production incident or claim that every rule path is affected.

## Exact-source parser assertions

parser-results.json lists all nine assertions, including:

- native complete has no criterion ledger;
- top-level and per-group criterion additions leave the parsed result unchanged;
- a pure criterion JSON object is rejected for missing native manifest;
- criterion properties on a native comment are stripped;
- ledger JSON text remains a finding rather than a typed result;
- unassigned unchanged-file findings are skipped;
- 16,385-character finding content fails explicitly against the 16,384-character bound;
- the second tool turn preserves both the tool call and its output.

Exact source blobs after byte verification:

- ocr-review-outcome-contract.ts: `5ba2ba5ddfe52c93b0dc7d7514b1e0a3d7047698`.
- ocr-review-normalization.ts: `43bcfa54ee3dedd50a18e2d8e8f9aaf5cd5a0a42`.

The initial source-file copy gained one trailing newline per file. This was removed after hash comparison, without changing code, and the nine parser assertions were rerun against exact original blobs. The binary-run classification had used the whitespace-only copies; final parser results use exact bytes.

## Failed attempts and limits

The environment's /usr/bin/go returned “Go: Unknown option: version”; no Go source build was attempted. Published binary verification avoided any substitute build. The first parser attempt with Node strip-only mode failed before assertions because the normalizer contains a TypeScript parameter property; experimental transform-types then executed the unchanged source successfully. Both setup failures and the malformed fake-filter fixture are retained.

The probes do not measure semantic correctness, hallucination/false-positive rates, multi-file grouping, context compression, MCP tools, large-result output enforcement, production usage accuracy, SQL/native closure, Gateway retry/recovery, provider quotas, or deployment capacity. The 16 MiB native result limit and 512 KiB normalized observation limit were inspected in source, not stress-tested here. Core input/output behavior was exercised on synthetic examples only.

## Reproduction

Use a **fresh directory** on Linux/amd64 with Node 24.22.1 and Git. The original harness calls Git at /usr/local/bin/git; supply that known executable or document a path adaptation. Copy the four harness/*.mjs files into the fresh directory. Download the binary from the exact URL in source-inputs.json and the two TypeScript modules from the listed repository/commit paths. Do not commit the binary or full upstream source copies.

Verify binary SHA-256 and both Git blob hashes before running. The original commands were:

```sh
node --experimental-strip-types runtime-probe.mjs
node --experimental-strip-types extra-runtime-probe.mjs
node --experimental-strip-types approved-comment-probe.mjs
node --experimental-transform-types parser-probe.mjs
```

The scripts deliberately reject a reused synthetic repository. Do not rerun them in the evidence folder or reuse the original outputs as new run receipts. The baseline script is required before parser-probe.mjs because the latter uses its native result and two-turn captures.

Full original request bodies remain in the task scratch directory and can be reproduced by the harness. This curated bundle retains their SHA-256 identities, bounded wire projections, output/native JSON, synthetic provider responses and relevant marker observations. It omits the 80 MiB binary, Git object directories, private HOME files and full upstream modules. Source identities are in source-inputs.json; all retained file hashes are in manifest.json.

