---
id: research.studies.comparison-baseline
type: study
status: active
owner: research/maintainers
summary: Historical prospective scores from the preceding comparison under its original five-group rubric.
---

# Initial Paperclip Comparison

This records the earlier prospective expert comparison from the research session under its **original five-group rubric**. It is historical, not the current 30-criterion method, an observed fleet result or a completed competitor leaderboard. Agent Teams means the combined selected Runtime v3/Orchestrator/Platform target assumed correctly implemented; Paperclip means the reviewed design/implementation at `61e8d5c7eb097664958e00c30ccd88bb51359043`. Popularity contributed no weight.

| Original group | Weight | Paperclip | Agent Teams target |
| --- | ---: | ---: | ---: |
| Architecture and modular structure | 25% | 7.0 | 8.5 |
| Fleet scaling potential | 30% | 7.5 | 8.5 |
| Recovery and execution correctness | 25% | 8.5 | 8.5 |
| Multi-tenant/product separation | 10% | 7.5 | 8.5 |
| Operational simplicity | 10% | 7.5 | 6.0 |
| Weighted arithmetic result | 100% | 7.625 → **7.6/10** | 8.250 → **8.3/10** |

Rounding in this historical table uses decimal round-half-up to one place. The differences express an initial architectural judgment, not measured performance or statistical significance. The own target's operational complexity is a real cost; native correctness is an important Paperclip strength.

## How to use this record now

The [new technical matrix](../competitors/technical-comparison.md) exposes individual claims, source limitations, unknowns and separate conditional architecture lenses. Do not carry 7.6/8.3 forward as its aggregate, backfill its unknowns to reproduce these totals, or average overlapping Clean/SOLID/modularity lenses together.

Material unknowns include exact product identity/tenant coverage, unresolved aggregate/consumption semantics and a comparable active-worker capacity campaign. Correct implementation of selected plans does not choose an unresolved branch. Therefore the current stricter matrix remains unranked. The [Paperclip dossier](../competitors/paperclip.md) and [Agent Teams dossier](../competitors/agent-teams.md) provide the source-backed strengths and tradeoffs behind the prospective discussion.

This archive preserves the earlier answer and its arithmetic transparently. It is not a new score endorsement or a product readiness decision.
