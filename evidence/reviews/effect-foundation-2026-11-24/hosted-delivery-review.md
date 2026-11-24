# Hosted Effect qualification delivery review

- Reviewer: independent agent `/root/hosted_delivery_review`.
- Observation: 2026-11-24, completed at 20:44 UTC.
- Scope: final documentation and retained CI evidence; read-only source/log review. No compiler, fixture, package-install or documentation test was rerun by this reviewer.
- Reviewed implementation: `509dad156704b8ef4aa98d6f36de85f7fe61b8e9`, tree `30d44671b8ecdcc5ad692ead10687e5a94d9895b`.
- Disposition: **PASS within the declared Linux x64 research scope. No unresolved blocking findings.**

## Independently verified evidence

1. Live GitHub metadata binds [run 45480774145, attempt 1](https://github.com/agent-teams-ai/engineering-research/actions/runs/45480774145) and [job 138752988453](https://github.com/agent-teams-ai/engineering-research/actions/runs/45480774145/job/138752988453) to the exact reviewed implementation commit. Both completed successfully. The live commit check inventory contains eight completed successful checks: native qualification, Docs Protocol, the initial actions/python CodeQL checks, and the subsequent actions/python/JavaScript-TypeScript analysis plus upload. Eight check runs are not eight distinct diagnostic suites.
2. The hosted receipt and official npm signature report were independently extracted from the actual job log. Both retained files equal those extracted bytes exactly. The audit has empty `invalid` and `missing` arrays; its SHA-256 equals the hosted receipt's `signatureReportSha256`. The verified provenance entries include the Effect native package, Effect and `undici-types`; this does not manufacture a stock-TypeScript provenance attestation.
3. All 32 input hashes and 108 standard-library hashes equal the reviewed local receipt. All 48 process observations match local executable paths, arguments, status, signal and stdout/stderr; elapsed times were excluded from this comparison. The 15 scenario outcomes agree with the independently authored case expectations, including ordinary TS2322, actual unstable use, aliases, public leakage, narrow allowances, warning/error exit behavior and absent/disabled-rule controls. Node versions are correctly distinguished: hosted 24.22.1 and local 24.22.3.
4. The harness and workflow are unchanged from the published implementation. Their SHA-256 hashes remain `a42654d31f3217b4acc3fcb2d8cec778a0c8fea679ef2187bb60613d6ab4c3b5` and `ad7d7fb8a5cc3f50bb98d64416161624a2aea595b1cf3947b99b7c10c9215ade` respectively. Live raw Git commit metadata records author and committer Илия, `iliyazelenkog@gmail.com`.
5. The final package-footprint addition closes the durable-source gap for unpacked size. Independent inspection of the retained archive reproduced SHA-256 `c991e3c31c7bf38aadb3ac30221fc048d9ff18e152aa5d527289269b73d29741`, 130,041,154 compressed bytes, 588 regular files totaling 333,854,566 bytes, and the selected compiler's 27,021,472 bytes. The documentation correctly distinguishes that file-byte sum from allocated filesystem space and process memory.

## Reviewed final document/evidence identities

Paths below are relative to the repository root; experiment paths abbreviate `evidence/experiments/effect-diagnostics-2026-11-24/` as `experiment/`.

| Path | SHA-256 |
| --- | --- |
| `docs/studies/effect-diagnostics-and-foundation-qualification-2026-11-24.md` | `b00d2ab0dbb4ff8a3deaf692677a1c3ee9cfc5d6c29712e71c1d697f5c30d77b` |
| `experiment/README.md` | `4ece680c6c1e590ce1f09406ed6dee343739f1453be9115e10a3ae590fb912e2` |
| `experiment/results/github-actions-45480774145.json` | `c78d0d1d6acaaad02365524b3d79cf47f40c035dfae7a962af856441edccd946` |
| `experiment/provenance/github-actions-signatures-45480774145.json` | `1f67514aa1affbbced882d39de55ce230a35c2940091b78684f471568748e247` |
| `experiment/results/ci-delivery-509dad1.json` | `27c8f92622fa02f14f2e644f204b8c0fcdbbafd3c51b91fa3905b7b26962a194` |
| `experiment/provenance/native-package-footprint.json` | `acf7b6a0bd6be7a1955bac9c6537a21aac389cdbc714037591678169f8da19eb` |

## Claim boundaries and delivery handoff

The final text preserves foundation-first research without claiming a finished application, EF admission, shared-default compiler migration, package publication, additional supported platforms or remote branch-protection enforcement. It treats 15 small compiler cases as bounded qualification, not a production-scale or million-line benchmark. Planned consumer/tool-owner integration remains an explicit next decision.

This review verifies hosted CI for implementation `509dad156704b8ef4aa98d6f36de85f7fe61b8e9`. It does **not** claim that the later documentation/evidence commit has already been published or passed CI. The delivery owner must publish these reviewed bytes and verify that final head's ordinary checks separately; historical evidence must retain its original commit identity.
