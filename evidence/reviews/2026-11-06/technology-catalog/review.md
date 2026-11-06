# Technology catalogue and memory SDK review record

Observation date: **2026-11-06**. Research publication only; this is not a GitHub maintainer approval, product adoption, public SDK release or deployed-system qualification.

## Scope and independent criticism

The publication adds one technology index, six category documents and two studies. The studies evaluate the existing ReviewRouter memory SDK and narrowly proposed architecture-document clarifications. The existing AutoGPT comparison remains unchanged, including its conditional target comparison and separate ordinary-v3/C0–C3 scenarios.

Three parallel source auditors covered ReviewRouter, current ecosystem capabilities, and Agent Teams/Get Modular ownership. The root independently inspected the important contracts, write/error/claim path, ADR-034, current upstream capabilities and source identity. During criticism each auditor reviewed work outside their own draft; the memory auditor explicitly labels its own SDK check as author consistency, while the architecture and ecosystem auditors independently challenged that study. Parallel reading is not multiple independent runtime experiments.

## Two bounded review rounds

Raw notes are preserved byte-for-byte. Round 2 verifies the material corrections and their immediate context; it is not described as another full-system audit.

| Reviewer scope | Round 1 | Accepted correction or retained counterevidence | Round 2 |
| --- | --- | --- | --- |
| Architecture and ownership | [Review](round1-architecture.md) | A/B/C rationale and scoped LOC withstand criticism; retain unnamed-consumer and native-profile unknowns. Add an explicit limit for configuration GET versus mutation POST. | [No remaining blocker](round2-architecture.md) |
| Memory/AutoGPT mechanisms | [Review](round1-memory.md) | Separate micro-LOC sizing confidence from recommendation confidence. Product protections, ADR-034 and existing owners remain explicit. | [Correction confirmed](round2-memory.md) |
| Ecosystem and integration scope | [Review](round1-ecosystem.md) | Compare native-local fit to the selected/advertised OS matrix rather than invent all-desktop coverage; independently label LOC uncertainty. | [Both findings closed](round2-ecosystem.md) |

Root also narrowed the memory category from provider-neutral to narrow capability contracts: only one engine is implemented. The SDK study now says its configuration GET and retain POST do not establish atomic profile stability; it does not claim a demonstrated wrong-mode write or prescribe a new lock. The architecture/ecosystem second rounds verified these final changes. Native preview is described as requiring profile qualification, not as universally qualified.

No numerical AutoGPT score change was warranted. The unchanged dossier SHA-256 remains `ed2f24533c83f942ff3c564353aeaf351912b1c6cc0e5c49523b805700223907`. The SDK options are separate research and do not add ReviewRouter as a fourth implemented product to that comparison.

## Source and verification evidence

- Six relevant repository heads are pinned in the studies and manifest. Every one of the **69 pinned file** records matches its local bytes, Git object, SHA-256 and byte size. Two additional entries are pinned source-tree pointers. **46 rolling official upstream references** are separately dated; they are not represented as immutable releases or deployment qualification.
- Independent physical-line recount matches the SDK study: five portable source files / **755 lines**; product feature **45 production files / 8,645 lines**, excluding **12 test files / 6,278 lines**. Counts include comments/blanks and exclude host, deployment and native-maintenance code. They are not effort measurements.
- Reference definitions, changed local links/anchors and source-path existence were checked. The source inventory records current-source evidence separately from historical migration records.
- Docs Protocol **0.6.2**, Node **24.22.1** and pnpm **11.25.0** were retained. `docs:context` returned all **36 documents** without truncation. `pnpm check` passed with a complete catalogue and valid adoption.
- The requested category folder was registered with one `technology` artifact type, its existing research-body template and direct technology index; the metadata type enum was extended accordingly. No existing validation requirement, tool version or ownership policy was removed or weakened. The original AutoGPT review's unchanged-tooling statement refers to its earlier 27-document publication, not this later addition.
- New documents were created through reviewed previews and exact Plan digests, with direct index navigation. Ordinary prose edits occurred after transaction recovery completed. Final authoring inspection returned idle.

## Authoring recovery boundary

Some creates reported publication but left a PUBLISHED journal and orphan temporary. The exact destination identity and original Plan postimage were verified, full state and independent original bytes were preserved, and the orphan was quarantined. The same installed official recovery finalizer then completed successfully. A recovery attempt also reported an active-operation lock; launching the same installed CLI directly completed recovery. No canonical journal or operation barrier was manually deleted, no successful postimage was fabricated, and no policy/validator was bypassed. Temporary recovery files are excluded from the publication.

Reviewed creation Plan digests:

| Document | Plan SHA-256 |
| --- | --- |
| Technology index | `a2096dd7b53a26f4aedf7486ce30a830c9f3e13c7e5b7d5b1e1922dfbaa06d14` |
| Memory category | `1894d5dfe7ded165eae09318bbf3d85a745fa1019a3f2635da374aa0d5ac410c` |
| Execution category | `fee5da493f2036881b0a441653a22a49220f6cedbd80872b9ec4752e39c9354a` |
| Retrieval category | `5e0a5f6b4e09553c6b64eb32597dddfd30d0c83c1a80190d160a7ad46a460b42` |
| Observability category | `545129bc7ddd48610207f50761e1076a3489ecfd0ffdb921371f3f99c5a8dfa5` |
| Data category | `04e41e9ea5982593cd2334def6b8dbc4abeec4e988926f5651c1e8c37bcfa5a0` |
| Modularity category | `71991bff4619d8e7815a3f3fc4891a0b7b5a21204a0eb3f10e870aba261e62e1` |
| Memory SDK study | `487f7b28a81ec37207de1cd080f7ef4147310a9c7c540ccfcd82759481c686bf` |
| Architecture follow-through | `572f0e60ac735335fb95ecdc331098b9830b4fff02f120d0511ca70343e7f127` |

## Final maintained artifact identities

These hashes identify the final synthesis after accepted corrections. Earlier raw reviews retain their original inspected hashes; their differing hashes are intentional review history.

| Artifact | SHA-256 |
| --- | --- |
| `docs/technologies/README.md` | `5beacbf4adb396452ba6d1b7be842bff5c78194ff5547d7e9a53db429ed366b3` |
| `docs/technologies/agent-execution-and-sandboxes.md` | `69424dae06e71ad97685338c48cd42016d6d2f1c4866e4db2fc548626ec93203` |
| `docs/technologies/browsing-search-and-retrieval.md` | `447226748fbb1b5545f58403724971728e9abc858c574ebb34396a7449cc1c9f` |
| `docs/technologies/data-and-document-processing.md` | `bc0f54f76c741ae21a6afcac559ba8f23f33dbb9c5ecfde842608e2f217a8b84` |
| `docs/technologies/memory-and-knowledge.md` | `2e49a6fe6bd76605556d42b7573325ba36d6b9cb1972c417dca7f3e64cfdb997` |
| `docs/technologies/modularity-and-extension-contracts.md` | `a6430b9b82fe6b0b0e47c60b91d2706ffee3c8de18b3d6717e4ba934697f02d3` |
| `docs/technologies/observability-and-prompts.md` | `c99b7b27353d3802be74e5e9a0431b85b217fedc81460d847081d84a989e59d3` |
| `docs/studies/review-router-memory-sdk-extraction.md` | `3bba56b6c67fc388991327e71770a667caa8ebfecafe9b7f31de693d7dea4db3` |
| `docs/studies/architecture-follow-through-from-autogpt-and-memory.md` | `23061cc88e9324c5dded4320f3793d4be7ddc13ee4c6f8a30661d397bab09b4a` |
| `docs/lessons/patterns-and-failure-lessons.md` | `e76e690bd8ba856d98be9915613ce8c0f15a5bd570b458d56c66a9da4c199d4c` |
| `data/technology-catalog-2026-11-06-sources.json` | `9ec74edcd90066b0d34a0e580a3d465f5d99d84b304bc16135b302b6e0b03a69` |

## Limits and publication

No current-head ReviewRouter application/native suite, live model-quality run, capacity/RAM benchmark or third-party deployment was executed for this catalogue. Existing native and installed-consumer results are attributed historical evidence. No source-language performance multiplier is claimed. A future engine/adapter still needs its selected profile's identity-retention, deletion, operational and semantic evidence.

Code estimates concern the named narrow mechanisms and an already owned consumer seam. Unchanged moved code, generated clients, release infrastructure, native operation, product authority and persisted/in-flight migration are excluded; confidence in sizing is explicitly **3/10**. Confidence in a recommendation does not turn those ranges into a delivery commitment.

Publication extends the existing draft research PR on `research/autogpt-comparison-2026-11-06`, preserving its AutoGPT evidence. Research-only publication changes no product source, accepted architecture decision, dependency pin or main-branch merge. The delivery message reports the verified remote commit and workflow result after publication.
