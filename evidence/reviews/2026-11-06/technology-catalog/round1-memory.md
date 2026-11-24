# Catalog cross-review, round 1 — memory/AutoGPT architecture

Date: 2026-11-06. Read-only review of the consolidated research repository. Reviewer authored the memory SDK study, so its consistency check is not represented as independent criticism of that same study. This round independently cross-reviewed the technology catalogue, architecture follow-through and appended lesson map against the audited ReviewRouter/AutoGPT mechanisms and relevant Get Modular source.

## Disposition

**No high-severity factual, adoption or ownership blocker found. One material estimate-presentation correction (F1) is required.** Root accepted that correction and reports adding it after this reviewed snapshot; the next bounded round should verify its final text. The original reviewed hashes below are retained rather than relabelled as the corrected state.

The SDK reuse recommendation remains supported. Existing content is not treated as greenfield; native preview is not called already-qualified; the selected ADR-034 Gateway path is explicit; product durable delivery is correctly distinguished from the portable client's weaker public uncertainty contract. Get Modular is not imposed on every helper, and no extra memory engine, scheduler, authority service or ordinary-v3 capacity program is selected.

## Material findings

### F1 — P2: micro-LOC estimates need separate sizing confidence

- **Location:** `docs/studies/architecture-follow-through-from-autogpt-and-memory.md`, reviewed lines 90–99.
- **Evidence:** the micro-options table gives 80–200 / 40–120 / 40–100 production-line ranges and 8/9 recommendation-confidence cells, but did not independently state confidence in those size ranges. `docs/technologies/README.md:44` explicitly requires independent estimate confidence, and the full SDK study already labels its ranges 3/10. Recommendation confidence cannot serve as evidence that an unimplemented adapter will fall inside a narrow code range.
- **Action:** add a nearby sentence marking these ranges unvalidated, with sizing confidence 3/10 until the exact public surface, consumer seam and release profile are fixed; retain the separate recommendation/confidence/complexity interpretation and the non-additive ranges.
- **Status:** accepted by root during review. Root reports inserting the sentence before the table. Final corrected bytes not re-reviewed in this round.

No further material source mismatch was established. In particular, the smaller architecture micro-options explicitly exclude the broader SDK hardening/migration scope and unchanged moved source; they are not presented as competing total estimates for the SDK study's A/B/C options.

## Source checks and accepted conclusions

### AutoGPT patterns and anti-patterns

- Reopened `blocks/mcp/client.py:267–285`: `tools/call` receives one ordinary transport attempt. The catalogue correctly scopes this to that helper, allows separate explicit protocol interactions, and does not claim a tool can never be repeated anywhere.
- Reopened `data/skill_package.py:1–121`: the shared canonical hash includes path/hash/executable data; the three-way text merge retains the user's side of conflicting hunks and reports a conflict. The catalogue credits reuse while keeping content identity separate from publisher trust and obsolete user edits.
- Reopened `copilot/graphiti/client.py:86–128`: opaque expert namespace derivation explicitly leaves access to server authorization. The MR-24 addition transfers that identity-versus-authority distinction without claiming the hash itself enforces access.
- Reopened `copilot/graphiti/client.py:189–252`: the factory is intentionally free of caching/I/O with a supplied connected driver; default reranking can perform one model call per candidate. The architecture study correctly includes those costs and does not make an operational benchmark claim.
- Lease-refresh lesson retains the prior isolated-fake-Redis experiment boundary and acquisition/release counterevidence. It does not claim overlapping production executions were reproduced or infer a universal absence of fencing.
- Block schemas/provider metadata are presented as trusted integration authoring patterns, not hostile-code isolation. No proposal imports AutoGPT's global registry or broad execution manager into Agent Teams.

### ReviewRouter SDK and current profile

- The catalogue correctly distinguishes private `context-memory` 0.1.0 from the much larger product memory feature and from current native deployment.
- ADR-034/Gateway extraction is not confused with the available native preview implementation. Native `LLM_PROVIDER=none`, disabled observations and disabled automatic consolidation describe the selected startup profile, not the entire upstream Hindsight feature set.
- Proposed wording D3 now says **reusable adapter requiring independent profile qualification**, which is accurate. It neither asserts that arbitrary instances are qualified nor marks the retained native adapter defective because another product path is selected.
- D2 correctly says deadline/unavailable can follow remote submission and operation absence is not proof of non-execution. It preserves original identity and existing owner reconciliation. The text explicitly retains ReviewRouter's unknown-before-I/O counterevidence and does not report a duplicate-write incident.
- Native acceptance/completion, application publication and verified cleanup remain distinct. Static capability descriptors are not used as qualification or permission evidence.
- Shared contracts and optional provider adapters do not transplant GitHub/workspace actor policy, paid-account selection or a Prisma/outbox owner into every consumer. No Agent Teams memory-domain adoption is invented from ReviewRouter's selection.

### Composition and scope

- Reopened Get Modular `common-assembly.md:77–110`: static helpers versus independently selected capabilities and one outer composition authority are represented accurately. Current upstream 0.7.1 is explicitly distinguished from consumer pins; no implicit upgrade follows.
- Reopened `packages/resources/README.md:1–25`: pure/borrow-only modules require no resource scope, and callback completion is not proof of physical release. The catalogue and MR-15 addition correctly preserve these limits.
- Reopened `common-assembly.md:613–638`: exact revisions, including additive type changes, support the catalogue's coordination-cost observation.
- The Get Modular host entry remains a separate conditional spike, not a mandatory wrapper around the existing fixed SDK. The Orchestrator memory paragraph is optional navigation and explicitly not a prerequisite for ordinary v3.
- Agent Context is not relabelled as memory owner; future Memory and unmaterialized Platform contexts remain explicitly future. C0–C3 is not counted as ordinary S1–S5.

### Catalogue classifications and scores

- Entries distinguish clients from engines, local processes from offline models, optional remote modes from mandatory local baselines, and current upstream versions from pinned AutoGPT or ReviewRouter versions.
- Good-fit/poor-fit scenarios are concrete; hosted-service limitations are not global blacklists. Research candidates are not presented as adopted dependencies.
- Scores are integer ordinal scenario judgments, with no cross-category average or percentage-performance inference. Source-inspection confidence is not represented as measured capacity.
- BM25 is a bounded discovery pattern, not justification for adding Python or a universal graph/search platform. Graphiti/Mem0 remain alternative capability research alongside the existing ReviewRouter direction.
- Rolling external version/licensing claims were read as catalogue content but were not all independently re-fetched by this reviewer. The external-ecosystem reviewer reports verifying those primary sources and preserving current-versus-pinned distinctions; final source manifest remains the root's responsibility.

## Reviewed document hashes

These identify the round-1 snapshot, including the architecture estimate text before F1 was corrected.

| Inspected path | SHA256 |
|---|---|
| `docs/technologies/README.md` | `5beacbf4adb396452ba6d1b7be842bff5c78194ff5547d7e9a53db429ed366b3` |
| `docs/technologies/agent-execution-and-sandboxes.md` | `9c35220c6a957684691026ff709430be37270bdf9c21e4fc9211754355c5c62f` |
| `docs/technologies/browsing-search-and-retrieval.md` | `447226748fbb1b5545f58403724971728e9abc858c574ebb34396a7449cc1c9f` |
| `docs/technologies/data-and-document-processing.md` | `bc0f54f76c741ae21a6afcac559ba8f23f33dbb9c5ecfde842608e2f217a8b84` |
| `docs/technologies/memory-and-knowledge.md` | `beaba63417a0a82aebb494a342fc09e34f6d8d0c49a772e3314c793e12f8987f` |
| `docs/technologies/modularity-and-extension-contracts.md` | `a6430b9b82fe6b0b0e47c60b91d2706ffee3c8de18b3d6717e4ba934697f02d3` |
| `docs/technologies/observability-and-prompts.md` | `c99b7b27353d3802be74e5e9a0431b85b217fedc81460d847081d84a989e59d3` |
| `docs/studies/architecture-follow-through-from-autogpt-and-memory.md` | `9e09a7bf7ec5ecb711891a15fbb3e2aef48d8cf9a978316eaf1d07acedbfb6b2` |
| `docs/studies/review-router-memory-sdk-extraction.md` — author consistency check | `a636eb964779f756cf593f4e03a3c7a301895deca3d029c940df56165cf5fe76` |
| `docs/lessons/patterns-and-failure-lessons.md` — appended section reviewed | `e76e690bd8ba856d98be9915613ce8c0f15a5bd570b458d56c66a9da4c199d4c` |

## Remaining unknowns and review limit

No code-size estimate is measured; no current-head packed SDK/native/full-product suite was run here; semantic memory quality, deployment resource use and an alternative engine's exact conformance remain unknown. Publication/licensing/package identity for the private library remains a future owner decision. Missing assembly-time manifest/review targets were intentionally excluded as root-managed work in progress. This round made no repository edits and does not substitute for final Docs Protocol/catalog/link/source-manifest validation.
