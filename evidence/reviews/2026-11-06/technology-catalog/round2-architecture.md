# Catalogue round 2: bounded architecture confirmation

Reviewer: agent_teams_plan. Date: 2026-11-06. Read-only confirmation of the four requested corrections. No new broad research, tests or product/repository edits. Source-manifest/review-record assembly remains outside this bounded review.

## Verdict

**No blocker and no remaining correction within this round's scope.** All four changes are present, agree with the inspected source and preserve the research-only status. Round 1's recommendation and its explicitly bounded unknowns remain valid. No original AutoGPT score change is warranted by these wording fixes.

## Current inspected artifacts

Base directory: `/workspace/scratch/9779522cc445/autogpt-comparison/repos/engineering-research`.

| Path | SHA-256 |
| --- | --- |
| `docs/studies/review-router-memory-sdk-extraction.md` | `3bba56b6c67fc388991327e71770a667caa8ebfecafe9b7f31de693d7dea4db3` |
| `docs/technologies/memory-and-knowledge.md` | `2e49a6fe6bd76605556d42b7573325ba36d6b9cb1972c417dca7f3e64cfdb997` |
| `docs/studies/architecture-follow-through-from-autogpt-and-memory.md` | `23061cc88e9324c5dded4320f3793d4be7ddc13ee4c6f8a30661d397bab09b4a` |
| `docs/technologies/agent-execution-and-sandboxes.md` | `69424dae06e71ad97685338c48cd42016d6d2f1c4866e4db2fc548626ec93203` |

## Correction-by-correction result

| Requested correction | Result | Evidence and limit |
| --- | --- | --- |
| Micro-LOC sizing confidence | **Pass** | Architecture follow-through explicitly gives code-sizing confidence **3/10**, separate from recommendation confidence, and says overlapping ranges must not be summed. Its 80–200 packaging scope remains narrower than SDK option B's 350–800 production / 400–900 tests. SDK study also states 3/10 sizing confidence. No number is promoted to a delivery commitment. |
| E2B selected OS matrix | **Pass** | Execution category now says “required native-local baseline and its selected OS matrix.” Orchestrator ADR-0115 lines 174–184 requires an explicit supported matrix and installed evidence for every *advertised* tuple; it does not automatically select all desktop operating systems. The text also keeps Linux self-operated E2B distinct from Docker-free native Windows/macOS parity. No Runtime v3 platform expansion follows. |
| Narrow memory capabilities | **Pass** | Memory category first baseline paragraph now says **narrow capability contracts**, with Hindsight transport mappings, and distinguishes the pinned TS client from an engine-version claim. This describes the actual source without promising demonstrated multi-provider parity. `SelectedStatement.nativeType` still contains `world | experience`, reinforcing why the narrower wording is appropriate. |
| Configuration check versus atomic stability | **Pass** | SDK exact-storage paragraph now explicitly separates configuration GET and retain POST, says atomic configuration stability was not established, and makes qualified-profile preservation/concurrent-change fencing a deployment question. It explicitly says no wrong-mode write was demonstrated. This is supported by the source's separate awaited `getBankConfig()` and `retainMemories()` calls; it neither asserts a product vulnerability nor prescribes a new global lock or ledger. |

## Narrow source checks

- ReviewRouter `9a416dfb876d78253612e87aa89561d48bf35633`, `packages/context-memory/src/hindsight/memory-store.ts` lines 201–255: separate configuration lookup, `hasHindsightExactChunksStrategy()` check and retain request with caller operation/document identity and strategy name. The request source does not show one atomic native config-and-write operation.
- Same commit, `packages/features/memory/src/tests/context-memory-store.test.ts`: inspected fixtures distinguish GET/configuration and POST/retain and reject unsupported strategies before retain. No concurrent strategy-change experiment was run or claimed.
- Same commit, `packages/context-memory/src/contracts.ts` lines 1–31: caller-owned scope and explicit result variants, including the first-engine statement taxonomy. Narrow capabilities are established; universal semantic parity is not.
- Orchestrator `5a8496ce711909e381c5bc817fff5500be9a1761`, `docs/decisions/0115-canonical-fully-local-v1-adoption.md` lines 174–184: explicit supported matrix and evidence per advertised Windows/macOS/Linux tuple.

The configuration-stability sentence should remain an evidence limit: a checked strategy is valuable counterevidence against blind configuration trust, but separate requests alone cannot prove the full lifetime guarantee. The current corrected paragraph states exactly that. No additional wording is requested.
