# Task Verification critical audit — retained evidence, 2026-11-13

Read the [dated architecture audit](../../../docs/studies/task-verification-critical-architecture-and-evidence-audit-2026-11-13.md) for the findings, counterevidence, source links and planning implications. This directory retains the bounded experiments underlying that audit. It adds no maintained product implementation or CI test gate.

## Evidence units and execution scope

| Evidence | Count | What ran |
| --- | ---: | --- |
| Managed OCR review | 10 invocations | Exact published `1.13.1-rr.6` Linux/amd64 binary on a synthetic Git repository |
| Binary version check | 1 process | The same binary's version output |
| Synthetic provider traffic | 14 POSTs | Scripted loopback Responses streams; no real provider/model calls |
| Final exact-source parser/normalizer probe | 9 assertions | Two byte-verified ReviewRouter modules under Node 24.22.1 transform-types |
| Kodus refutation probe | 2 scenarios | Byte-verified source-extracted transformations with an explicitly supplied synthetic verdict |

These units must not be summed into a count of end-to-end or semantic-quality tests. Native review completion, parser acceptance, criterion satisfaction and product acceptance are different claims. No Account Gateway/Sub2API/backend runtime, production configuration, complete competitor service, concurrency/load qualification or actual model evaluation ran.

## Frozen OCR sub-bundle

[ocr/README.md](ocr/README.md) provides the per-case table, exact asset identity, source pins, reproduction commands and limitations. [ocr/summary.json](ocr/summary.json) records all 10 review outcomes and their request counts. [ocr/parser-results.json](ocr/parser-results.json) records the final nine assertions.

The OCR bundle was copied byte-for-byte after its experiments completed. Its original [manifest](ocr/manifest.json) SHA-256 is `0c61a45a73ed497f501e89624ee4aa91d675e3ac5b1098b4f19346237f00da8a`. It contains 75 files totaling 254,413 bytes before that manifest. The binary itself and full upstream TypeScript source files are not redistributed. Full request bodies are omitted; bounded projections and their original identities are retained. Do not imply the omitted scratch files are durable attachments.

Recorded unsuccessful attempts are part of the evidence: the unavailable Go compiler entry, the unsupported initial Node strip-only parser attempt, whitespace correction before the final exact-source rerun, and the first malformed fake filtering response. The corrected filtering fixture is a separate fresh run; the earlier partial outcome is still present. Deliberate truncated-stream, cancellation and background-limit rejections are expected probe outcomes, not successes of a semantic verifier.

The child used isolated configuration, an environment allowlist, telemetry disabled and an explicit loopback capability. No egress namespace/syscall audit ran; this is not independently proved network isolation. No actual provider credentials were used by the experiment. Boundaries and exact observed requests are described in the OCR sub-bundle.

## Frozen Kodus source transformations

[kodus/reproduce.mjs](kodus/reproduce.mjs) and [kodus/receipt.json](kodus/receipt.json) are copied without modification from the completed one-off experiment. The runner checks both Git blob identities before extracting the return expressions and optional-verification gate from `kodustech/kodus-ai@f74afbb486bc5434c1190aeb8433d59f6f7847d2`:

- `libs/agents/business-validation/judge/intent-judge.ts`: `a8bab7bd6caf3ae5f557bf9f06d960c2db9291ee`.
- `libs/agents/business-validation/judge/business-rules-verifier.ts`: `4fb145c590b47fe549a2622b7e92b460f74d250a`.

Obtain those exact upstream files through an authorized source-reading path into a disposable source root. From a disposable copy of the retained script, run:

```sh
node reproduce.mjs /absolute/path/to/kodus-source-root /absolute/path/to/new-receipt.json
```

The runner has no network or model call. Its requirement expression removes only TypeScript `as const`; the legacy function body and gate are evaluated unchanged. This is not compilation/typechecking or a full service test.

The probe supplies `keep:false` with no positive evidence and observes promotion to `met`/`compliant`. The verifier contract permits retraction of unsupported claims, but also instructs retention when uncertain. The supplied synthetic rationale is not evidence that a live compliant model would emit that verdict. The relevant architectural finding is that the transformations cannot distinguish satisfaction-based refutation from retraction without positive support. Mixed-task omission, publication behavior and other comparator policies in the audit are source inspection, not additional executed scenarios.

## Format and provenance boundary

The bounded groups `ocr/harness/*.mjs`, `ocr/runtime/**`, `ocr/*.json`, `ocr/*.md`, `ocr/*.manifest`, and `kodus/*` are frozen one-off research artifacts. The manifest enumerates the actual retained files. Preserve their exact names and bytes under the organization's frozen-fixture/versioned-evidence boundary rule: their purpose is to identify and reproduce these specific completed experiments, not to become maintained ordinary JavaScript tooling. No TypeScript strict-check claim is made. Future maintained implementation must use its owning repository's required language, compiler and qualification profile.

[manifest.json](manifest.json) records every retained file's SHA-256 and byte count, excluding itself, and the immutable historical evidence identities. Documentation navigation and wrapper explanations may be maintained separately. The 12 November bundle and Hassan's original Phase 0 import remain unchanged; do not rewrite their counts or scope using these later results.
