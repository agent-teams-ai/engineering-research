# PR inventory and merge boundary — 2026-11-24

Read-only audit by `gate_audit`; observations 19:37–19:47 UTC through the connected GitHub plugin. No tests, reruns, branch changes, merges, approvals, or policy changes were performed. This is a dated inventory, not permission to merge a subsequently changed head. The coordinating agent owns all writes.

## Decision

Finish **our Research #9** against current Research main and obtain a focused review of its reconciled tree. No other open PR discovered here is a necessary prerequisite for an isolated `@effect/tsgo` diagnostics experiment. Coordinate with the existing Foundation-first and release owners; do not merge their work merely because all PRs share the same GitHub owner account.

## Current source coordinates

| Repository | Observed main SHA | Protection |
| --- | --- | --- |
| engineering-research | `4f093db6d4b35f3fccc374afe4cc620496b757a9` | `protected=false`; rulesets list empty |
| engineering-foundation | `c4b0576f4ca935446d44bf97db92aafc99d8fcd5` | Protected; ordinary PR + squash; no bypass |
| get-modular | `850bac5fd02fa5697846cc8958ac447d5c2ee7bb` | Protected; ordinary PR + squash; no bypass |
| .github | `03c8f102681569f525f44577a705bc4e5900e492` | Protected; ordinary PR + squash; no bypass |

The initial Research main observation was `4ad091c10d591cacb6af55b09ed67a935cd7fcad`. It moved during this audit: another owner merged #21 and a follow-up produced `4f093db6`. PR API `base.sha` fields were sometimes older than the separately read actual main; they must not be substituted for a fresh branch read.

## Our deliverable

[Research #9](https://github.com/agent-teams-ai/engineering-research/pull/9), `docs(research): critically evaluate Effect architecture and reusable mechanisms`:

- Open, Draft; head `32672acf2f56e8ead603b31c71636eb5fa353664` before the coordinating agent's new reconciliation. GitHub reports `mergeable=false`, `mergeable_state=dirty`, `rebaseable=false`.
- Compared with actual main `4f093db6`: diverged, 3 commits ahead and 14 behind; common ancestor `495986d9012aafd94bf9b2a22a57db90001e868b`.
- Four source changes: the new 603-line dated Effect study, its studies index link, and two-line dated pointers in the composition study and lessons map. Retain historical observations and their original provenance.
- Exact old head has 4/4 successful check-runs: Portable Docs Protocol [43525392285](https://github.com/agent-teams-ai/engineering-research/actions/runs/43525392285), CodeQL/Analyze checks [43525386718](https://github.com/agent-teams-ai/engineering-research/actions/runs/43525386718). All completed November 13. These do not qualify the new reconciliation.
- No formal GitHub reviews, issue comments, inline comments, or review threads were returned. The PR body retains the independent local review receipts and original study SHA-256 `99fcc362e0d8c579b5d77779dc8651f71fc463ed802213a3566f5567536ed567`.
- The legacy combined-status endpoint reports `pending` with `total_count=0`: this is an empty legacy-status collection, not an actual pending check.

Recommended completion: reconcile the existing branch with current main; preserve all newer navigation; confirm the study hash; run current `pnpm check`; review the actual four-file final delta; publish and verify exact head/tree and owner source commits; finish ordinary PR admission and verify the resulting main commit. A new independent study of all unchanged historical URLs is unnecessary for this mechanical reconciliation.

## Parallel work: observe, do not take over

| PR | Exact observed head | State and material evidence | Scope disposition |
| --- | --- | --- | --- |
| [Research #21](https://github.com/agent-teams-ai/engineering-research/pull/21) | `a2ac29c9d3e2a9c79f4e6472602d7bd140e164c9` | Merged at 19:40:12 UTC, merge commit `3eb4c4fd81d3ed5737db4c433b29394a00f53631` | Foundation-first research routes are now in main. Its two changed paths are `docs/README.md` and `docs/methodology/research-maintenance.md`; preserve them. |
| [Central #417](https://github.com/agent-teams-ai/.github/pull/417) | `5899711eecd144b189790d53f85a94ce162be91e` | Open Draft; mergeable but blocked. Required `runtime-admission-source-successor-v2` status is **failure**, [45470686472](https://github.com/agent-teams-ai/.github/actions/runs/45470686472). Other four Protect-main contexts and identity are successful. | Another ecosystem owner. Central ecosystem vision and its 5 documentation routes are the existing owner; do not create a competing global roadmap. |
| [Foundation #474](https://github.com/agent-teams-ai/engineering-foundation/pull/474) | `0d5423808b6297f4a7b4328f530a918366ea66c9` | Open Draft, mergeable, behind current main. 4 successful feedback/identity checks and 1 skipped Analyze check; complete required full CI/CodeQL not present. No review submissions or threads. | Another ecosystem owner. Adds only `AGENTS.md` routing and 43 lines to `docs/development/quality-gates.md`; coordinate any Effect-specific plan with this existing tooling-scale plan. |
| [Foundation #472](https://github.com/agent-teams-ai/engineering-foundation/pull/472) | `45cf92b5f51ef747515a87983340c679b38e3d13` | Open Ready, mergeable but blocked. Head advanced during audit from `0eb9db5...`. Full [45472743566](https://github.com/agent-teams-ai/engineering-foundation/actions/runs/45472743566) is in progress; owning Release [45471933320](https://github.com/agent-teams-ai/engineering-foundation/actions/runs/45471933320) publishes pending required statuses. Source-review PASS is now recorded in body. | Separate release owner. Generates FMS 0.4.1 and Stack 0.3.1; version intent/source review do not establish registry publication or provenance. |
| [Get Modular #251](https://github.com/agent-teams-ai/get-modular/pull/251) | `cc3b759e75076ee473461a5ad10de802f0d0b7e6` | Open Ready, mergeable but blocked. Required Linux and Windows aggregates pass; macOS remains incomplete in [45467563302](https://github.com/agent-teams-ai/get-modular/actions/runs/45467563302). Latest identity status passes; no review threads. | Another GM/Live Module Updates owner. Do not merge, rerun or modify. |

Central #417 checks were fully paginated: 104 returned, 104 unique IDs, 72 success / 23 failure / 4 skipped / 4 cancelled / 1 in progress. These are all head-bound check-runs, including separate workflows/attempts; this count is not a single canonical matrix. Its additional `docs-quality-source-successor-v2/v3` statuses also fail. Their causes were not diagnosed in this inventory, and none is relabelled green.

Foundation #472's interim CodeQL check was `neutral` with “1 configuration not found”; its Analyze check had succeeded while owning release statuses were still pending. Neither observation establishes complete release qualification. Re-read the completed exact-head evidence rather than applying old-head results.

## Other open contributions and supersession

- [Foundation #468](https://github.com/agent-teams-ai/engineering-foundation/pull/468), head `49c6b6666087cbbe135f00726f0473176b285006`: Draft, optional Landmines syntax rules; not an Effect diagnostics dependency. Current head has feedback/identity success, skipped Analyze, no complete native/full CI. One unresolved bot thread merely praises the Changeset; its mechanical resolution requirement does not justify inventing a code defect. Body records unresolved bootstrap/release qualification and separate real-consumer opt-in qualification.
- [Foundation #469](https://github.com/agent-teams-ai/engineering-foundation/pull/469), head `401a0d72e47c25a9b4159c78cdbf93ac524cf7a6`: open Ready, mergeable but behind; compared with `c4b0576`, 10 ahead / 4 behind. Required `macos-qualification` and `full-ci` **failed** in [45204305302](https://github.com/agent-teams-ai/engineering-foundation/actions/runs/45204305302); two unresolved minor review threads. It is not established as superseded merely because main moved, and it is not a prerequisite for the bounded new pilot.
- [GM #249](https://github.com/agent-teams-ai/get-modular/pull/249), head `0250c1983ea9f0192c08ae31a4855547ac446d67`: all seven security changes are explicitly consolidated into #251; closure belongs after #251 delivery. Do not merge both blindly.
- [GM #210](https://github.com/agent-teams-ai/get-modular/pull/210), head `8249c674ad53458b31d6ad06803ceb76e29ff4c7`, and [#213](https://github.com/agent-teams-ai/get-modular/pull/213), head `24cf56ad4363168aaff3ab0bbfb648b2514c5f03`: explicit **partial** supersession by #251. Remaining peer identity/README/CMS material is not adopted wholesale.
- [GM #222](https://github.com/agent-teams-ai/get-modular/pull/222), head `85d3716bcc620c1f5fc053bd519b4f03d4625404`: remains a dated research proposal; #251 preserves immutable routes, not its whole branch.
- Initial complete open-PR collections also included Research #5/#6/#16, Foundation #458 and Central #412. Their Task Verification, Waku, dependency-updater or older decision-matrix scopes do not authorize unrelated merging here.

## Existing implementation and tooling are not awaiting these old PRs

Fresh PR reads confirm GM [#231](https://github.com/agent-teams-ai/get-modular/pull/231), [#236](https://github.com/agent-teams-ai/get-modular/pull/236) and [#240](https://github.com/agent-teams-ai/get-modular/pull/240) remain merged; #240's merge commit is `28500bb686d1b91428bd5d7a9e1d26ce3d4ac839`. Later Effect release/install documentation [#246](https://github.com/agent-teams-ai/get-modular/pull/246) and [#247](https://github.com/agent-teams-ai/get-modular/pull/247), communication recipes [#242](https://github.com/agent-teams-ai/get-modular/pull/242), and sessions/recovery [#248](https://github.com/agent-teams-ai/get-modular/pull/248) are also merged. Do not repeat the old November 13 “unreleased candidate” status as current.

Foundation compiler-free ESLint source [#470](https://github.com/agent-teams-ai/engineering-foundation/pull/470) merged as `9f7f091121da4486301d1cb7444373d9fa67cfac`; provenance forward patch [#471](https://github.com/agent-teams-ai/engineering-foundation/pull/471) merged as `3e859413fcdcbf8a159fd4bad89a8b35b1ce83d5`; visitor-key cohort fix [#473](https://github.com/agent-teams-ai/engineering-foundation/pull/473) merged as current main `c4b0576`. New artifact qualification remains the #472 release owner's responsibility.

A scoped PR search for the exact `@effect/tsgo` term in Foundation and GM returned zero results. The complete open collections contain no separately identified Effect diagnostics PR. This search is a discovery observation, not a proof that no source anywhere mentions native diagnostics.

## Actual merge/write rules

All three protected repositories require strict current-base status checks, PR review-thread resolution, linear history and squash merges; required approval count is zero, but independent technical review still applies under repository instructions. Their active rulesets have no bypass actors and `current_user_can_bypass=never`. The connected account's admin/push permissions do not authorize direct main writes.

| Repository | Effective required contexts on main |
| --- | --- |
| Foundation | `CodeQL`, `analyze`, `check`, `macos-qualification`, `windows-check`, `full-ci`, `commit-author-identity` |
| GM | `check (ubuntu-24.04)`, `check (macos-15)`, `check (windows-2025)`, `commit-author-identity` |
| Central | `check`, `trusted-admission-authority-evolution-v1`, `trusted-admission-evidence`, `trusted-validation`, `runtime-admission-source-successor-v2`, `commit-author-identity` |

Evidence: [Foundation Protect main](https://github.com/agent-teams-ai/engineering-foundation/rules/19979782) + [identity](https://github.com/agent-teams-ai/engineering-foundation/rules/24372286); [GM Protect main](https://github.com/agent-teams-ai/get-modular/rules/21807869) + [identity](https://github.com/agent-teams-ai/get-modular/rules/24363211); [Central Protect main](https://github.com/agent-teams-ai/.github/rules/19979783) + [identity](https://github.com/agent-teams-ai/.github/rules/24363205). All additional Central rulesets were inspected: they protect explicitly named governance source branches or the retained identity tag, not main.

Research has no remote protected-main rule in this observation. Its [AGENTS](https://github.com/agent-teams-ai/engineering-research/blob/4ad091c10d591cacb6af55b09ed67a935cd7fcad/AGENTS.md) nevertheless routes to the canonical quality standard, requires `pnpm check` after prose/navigation changes, and keeps requested review work in Draft until that review ends. User-authorized direct main writes are technically possible there after applicable review; completing existing #9 remains the concrete, reviewable route.

[Central governance's plugin route](https://github.com/agent-teams-ai/.github/blob/03c8f102681569f525f44577a705bc4e5900e492/GOVERNANCE.md#github-plugin-merge-route) explicitly permits owner PR squash through the connected GitHub plugin when `gh` is unavailable. Before merging: freshly read authenticated owner, open non-draft owner PR, exact head and actual base, complete paginated commit identity, successful required contexts and unresolved findings. Use full `expected_head_sha`, explicit Conventional Commit title and full body. Afterward independently inspect merged PR, final raw attribution/message, resulting main and CI. No login request or protection change is required.

Foundation additionally requires its complete explicitly requested final-head/base native full matrix and an independent exact-head review record; successful feedback is not that matrix. Preserve exact runtime/compiler/package pins and current release ownership when trying Effect diagnostics.

## Minimal sequence

1. Reconcile/review/check/publish our Research #9, then merge its exact current head through the ordinary owner route and verify final main.
2. Ground the new Effect diagnostics plan in current Foundation tooling and the already merged Research navigation. Link the existing central #417/Foundation #474 owners; do not duplicate or silently adopt their pending proposals.
3. Run the bounded Foundation-owned diagnostics experiment under its actual compatibility constraints; record observations, exclusions and adoption decision separately from historical research.
4. Only if a demonstrated prerequisite requires another owner's release or source fix, coordinate that exact dependency and wait for its own final qualification. Do not expand the merge scope to Landmines, old research branches, the active GM consolidation, or package release work without a concrete dependency.

This inventory predates publication of the coordinating agent's new PR9 reconciliation; its subsequent head/tree/checks require a separate receipt.
