# Catalogue cross-review, round 2 — bounded confirmation

Review date: 2026-11-06. Reviewer: `/root/python_ecosystem`.

## Disposition

**Pass for the four specified changes. EC-1 and EC-2 are closed in the inspected bytes. No false claim or new material scope issue was introduced by the two additional narrowings.** This is confirmation of documentation corrections, not runtime/native qualification or approval of a product architecture.

The review compared full-file diffs against the immutable round 1 snapshots, then inspected each changed paragraph and its surrounding context. The four changes below were the only differences in these four files. Current-byte snapshots and `manifest.json` are preserved in `notes/catalog-review-round2-inputs/`. No publication or product repository files were modified by this reviewer.

| Item | Inspected location | Disposition and evidence |
| --- | --- | --- |
| EC-1: selected OS matrix | `docs/technologies/agent-execution-and-sandboxes.md:27–29` | **Closed.** E2B is now assessed against “the required native-local baseline and its selected OS matrix.” The distinction between self-operated Linux Embed and unverified Docker-free native Windows/macOS parity remains. This matches the previously inspected Orchestrator ADR-0115 advertised-tuple rule and Runtime PROGRAM v3's narrower execution profiles; it no longer invents a commitment to all desktop OSes. |
| EC-2: independent LOC sizing confidence | `docs/studies/architecture-follow-through-from-autogpt-and-memory.md:90–99` | **Closed.** The text explicitly assigns code-sizing confidence **3/10** until the public surface, consumer seam and release profile are fixed, independently of recommendation confidence. Existing production/test separation, exclusions and prohibition on adding overlapping ranges remain. No measured effort or delivery commitment is implied. |
| Provider-neutral wording narrowed | `docs/technologies/memory-and-knowledge.md:15–19` | **Accepted.** “Narrow capability contracts” describes the current package more precisely than blanket provider neutrality. Hindsight-specific transport mappings, the client 1.1.0 pin, unavailable capabilities and product-owned policy remain explicit. The change is consistent with the SDK study's first-engine taxonomy and generalization gaps; it does not claim a second implemented provider or remove an actual capability. |
| Exact-storage precheck is not an atomic guarantee | `docs/studies/review-router-memory-sdk-extraction.md:52–58` | **Accepted.** The paragraph now states that configuration GET and retain POST are separate requests and that this inspection does not prove configuration stability between them. This matches the already read `HindsightMemoryStore.replaceSource()` sequence (`memory-store.ts:212–250`). It keeps the real precheck and tests credited, leaves exact-profile preservation/concurrent-change handling with deployment qualification, and explicitly avoids claiming a demonstrated wrong-mode write. It neither invents atomic fencing in the SDK nor declares an unobserved failure. |

## Current file hashes

Paths are relative to the research repository and to the round 2 snapshot directory. Full snapshot prefix: `/workspace/scratch/9779522cc445/autogpt-comparison/notes/catalog-review-round2-inputs/`.

| File | SHA256 |
| --- | --- |
| `docs/technologies/agent-execution-and-sandboxes.md` | `69424dae06e71ad97685338c48cd42016d6d2f1c4866e4db2fc548626ec93203` |
| `docs/studies/architecture-follow-through-from-autogpt-and-memory.md` | `23061cc88e9324c5dded4320f3793d4be7ddc13ee4c6f8a30661d397bab09b4a` |
| `docs/technologies/memory-and-knowledge.md` | `2e49a6fe6bd76605556d42b7573325ba36d6b9cb1972c417dca7f3e64cfdb997` |
| `docs/studies/review-router-memory-sdk-extraction.md` | `3bba56b6c67fc388991327e71770a667caa8ebfecafe9b7f31de693d7dea4db3` |

## Unchanged limits

The original round 1 note and its original input hashes remain intact. No broad library scan, new source-version claim, service execution, SDK build or benchmark was performed. The earlier remaining unknowns still apply, including actual profile stability under administrative changes, current-head qualification, second-consumer scope, native deletion/recovery guarantees and the low confidence of unvalidated LOC estimates. This confirmation applies to the listed file bytes; later edits require their own relevant review.

Round 1 note: `notes/catalog-review-round1-ecosystem.md`, SHA256 `387b1d21574a7d6f2bf293725c8cfd0648a21550376806aa503fe13fd4276cef`.
