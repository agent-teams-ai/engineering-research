# Catalogue cross-review, round 1 — ecosystem and integration scope

Review date: 2026-11-06. Reviewer: `/root/python_ecosystem`.

## Scope and verdict

One bounded review of the consolidated memory SDK study, architecture follow-through, technology index and five ecosystem category documents. This pass challenges the A/B/C reuse estimates, the difference between a client and a separately operated engine, current-versus-pinned versions, qualification claims and the suitability assessments requested by the user. It does not add candidates, execute services or modify the research/product repositories. The pending source-inventory and review-record assembly links are deliberately outside the findings.

**Verdict: two medium corrections; no high-severity factual blocker identified in the reviewed scope.** The substantive SDK reuse recommendation is supported as a research direction, and the source/qualification distinctions are unusually explicit. Correct the blanket desktop-OS requirement and disclose the separate uncertainty of the architecture micro-estimates before treating this pass as closed. No change to the selected product architecture, engines or package versions follows from this review.

The review used immutable scratch copies in `notes/catalog-review-round1-inputs/`. The manifest and hashes below identify exactly the content inspected; later root edits are not implicitly approved by these hashes.

## Findings

### EC-1 — Medium: the E2B comparison invents an all-desktop-OS requirement

**Location:** `docs/technologies/agent-execution-and-sandboxes.md:27`.

**Claim challenged:** E2B is a poor fit for implementing the “mandatory native-local baseline across all desktop OSes.”

**Evidence:** the pinned Orchestrator ADR-0115 requires an explicit supported OS/architecture matrix and qualification of *every advertised* Windows/macOS/Linux tuple; it does not select every tuple. Runtime PROGRAM v3 explicitly preserves a narrower executed boundary: ordinary process adapters admit Darwin/non-root, authentication additionally requires arm64, and the separate newly selected native integration uses a Linux+Docker profile. It adds no Windows lane. Read directly in:

- `agent-teams-orchestrator/docs/decisions/0115-canonical-fully-local-v1-adoption.md:174–184`, at `5a8496c`.
- `agent-runtime/docs/architecture/agent-runtime-architecture-program-plan.md:265–297`, at `ab0387c`.

**Why it matters:** a technology should not be penalized against an invented acceptance matrix. This can distort the local-versus-remote fit judgment and imply planned platform commitments beyond the source. E2B's Linux/Compose operating-model limitations remain relevant even without that overstatement.

**Action:** replace the phrase with “the required native-local baseline and its selected OS matrix,” or equally precise wording. Retain the next paragraph's distinction between self-operated Linux Embed, hosted/BYOC operation and unproven Docker-free native Windows/macOS parity. No E2B score change is required solely by this wording correction: the entry already scores a bounded optional provider scenario.

### EC-2 — Medium: architecture micro-LOC ranges omit independent sizing confidence

**Location:** `docs/studies/architecture-follow-through-from-autogpt-and-memory.md:90–99`, compared with `docs/technologies/README.md:44` and `docs/studies/review-router-memory-sdk-extraction.md:118`.

**Evidence:** the architecture table labels reliability/recommendation confidence/complexity and assigns confidence values of 8–9. Its adjacent prose gives useful exclusions and prohibits summing overlapping estimates, but does not disclose a separate confidence in the LOC bounds. The index explicitly requires separate estimate confidence. The larger SDK A/B/C table correctly states unvalidated estimates with sizing confidence **3/10**.

**Why it matters:** recommendation confidence is not confidence that a package split, installed-consumer harness, public error-contract change and consumer mappings fit a particular amount of code. The adjacent high confidence figures could be misread as planning certainty. The scopes are not specified sufficiently to support a strong quantitative sizing claim.

**Action:** add a short statement that the micro-ranges are unvalidated planning estimates with low independent sizing confidence, e.g. **3/10**, and are not delivery commitments. Keep the exclusions and overlap warning. Alternatively remove the micro-LOC numbers. This does not require a larger architecture or more qualification work before publishing the research; it requires truthful labelling of the estimate already presented.

## Challenges that the current text withstands

### Options A/B/C: the price of reuse is not being mistaken for a complete memory product

The common scope at SDK-study line 116 requires an existing owning host seam and includes only the current Hindsight mechanisms plus one additional consumer. It excludes a new business context, authorization engine, durable ledger, native deployment, physical-forget subsystem and second engine. Lines 128–134 explicitly exclude infrastructure, live/native/privacy qualification, persisted/in-flight migration and complete product regression, and leave those costs unestimated. Consequently, the ranges cannot honestly be presented as the cost of delivering a new Platform memory feature; the study already says so.

- **A, 150–350 new production lines:** retaining the 755-line package is explicit. The host must handle uncertain writes; the package does not silently gain Router's durable protections. This is a bounded reuse spike, not a public SDK release or a complete recovery system.
- **B, 350–800 new or rewritten lines:** reuses/moves the baseline and adds stated generalization work plus consumer mapping. It is the supported research direction because existing behavior and the real consumer provide evidence. A separate repository is optional, so the proposal does not confuse repository extraction with conceptual portability.
- **C, 1,000–1,800 production lines:** includes replacement mapping and second-consumer integration. A correctly implemented rewrite is allowed the same reliability ceiling as B; lower recommendation confidence and greater burden, rather than an intrinsic rewrite-quality penalty, are the evidence-supported differences. The excluded migration and qualification costs mean this remains a narrow code estimate, not a migration schedule.

The scores remain ordinal judgments and the ranges remain low-confidence estimates. There is no observed throughput, reliability or delivery-time experiment behind the numeric differences. The study does not claim otherwise. The architecture packaging estimate is a narrower slice than B and already warns that the two are neither competing totals nor additive components.

### Uncertain writes: a real portability hazard, with current-product counterevidence

The directly inspected `HindsightMemoryStore.result()` checks the deadline after awaiting a response and maps network failures to `deadline`/`unavailable` (`memory-store.ts:92–118`). `replaceSource()` uses the helper first for configuration and later for effectful retain (`201–250`). Thus the same error code can arise before or after attempted mutation. The proposed clarification correctly warns external callers that a timeout does not prove absence of a write.

The study does not extrapolate this into an observed Router duplicate-write defect. It attributes Router's existing claim-before-I/O and observation/reconciliation rules, notes that its resubmission profile defaults to zero, and distinguishes inspected tests from executed tests. The optional result-union change remains a compatibility decision rather than a new retry engine.

### Portable contracts do not erase the provider dependency or product policy

The actual package manifest declares a required Hindsight TS client tarball at release 1.1.0, a private 0.1.0 package, compiled JS exports and shipped source. The documents explicitly recognize that a neutral subpath alone does not remove that required dependency. They do not claim that an npm client is a native memory engine, that `bankForScope` grants authorization, that `submitted` permits publication or that SDK cleanup proves physical erasure.

The provider vocabulary and task-policy leakage are identified rather than hidden: `world | experience`, selected maintainer/project/discussion context and result bounds are not evidence of a validated universal memory model. Agent Context remains a consumer of authorized contributions, and a future Memory capability is not treated as an accepted current slice.

### Hindsight selection and qualification are not rewritten by upstream capability claims

The SDK study and memory category consistently distinguish:

1. ReviewRouter's private client package and Hindsight TS client 1.1.0 pin.
2. ADR-034's current-content exact-chunk profile, local embeddings/reranking, native `LLM_PROVIDER=none` and disabled observations/consolidation.
3. Account Gateway's captured-account conversational extraction.
4. The available but independently qualified native-preview adapter.
5. Upstream Hindsight current-main 1.2.0 manifests and richer engine features.

No document automatically selects Hindsight's full native reasoning, declares that Agent Teams adopted Router's contract, or treats source implementation as production activation.

### Language, operating model and version distinctions are maintained

The catalogue keeps the materially different cases separate: Graphiti's Python algorithm versus a TS service client; FalkorDB's database and Python-client version; actual TS/Python Mem0 OSS implementations versus AutoGPT's hosted `MemoryClient`; a Claude Code binary-controlled agent loop versus a model SDK; local/self-operated E2B versus its hosted API; Python dataframe/media APIs over native computation; and a Go OpenTelemetry collector versus a durable telemetry backend.

No Python RSS ratio or language-only scaling ceiling is introduced. Native libraries and local launchers are not called automatically offline. Browser/network effects and source authority remain with the consuming owners. The good-fit and poor-fit statements are conditional on a named workload, rather than treating every vendor as an adoption recommendation.

The sensitive version distinctions are explicit: AutoGPT Graphiti 0.30.2/FalkorDB Python client 1.7.1; AutoGPT Mem0 1.0.8 versus current Mem0 v3 docs; AutoGPT Stagehand 3.23.0 versus current v4; AutoGPT Langfuse SDK 3.14.1 versus current server v4/Python SDK v5/JS SDK v6; Firecrawl Python client 4.42.0 versus self-host guide server v2.11.162. Current-main implementation details are not transferred to an unverified AutoGPT image. All category pages carry the 2026-11-06 observation date and identify current/rolling documentation where relevant.

## Remaining unknowns and review limits

- No current-head Router build/test suite, installed-package exercise, live Hindsight qualification, service lifecycle or model-quality campaign was executed for this pass. Historical results retain only their attributed scope.
- No specific new Agent Teams memory consumer and admission scope has been selected. Estimates assume an already owned authority/delivery seam; the cost of creating that feature remains unknown.
- A portable public error taxonomy, neutral dependency closure, packaging/release ownership and second-provider semantic parity remain design questions. No suggested union/subpath is selected by this review.
- Actual remote identity retention, lost-response recovery, deletion/backup guarantees and production activation require the selected native profile's evidence. Library source cannot supply it.
- Rolling upstream version facts were checked against the prior primary-source audit and their catalogue qualifiers, not requalified with new deployments in this bounded pass. Root must retain the already gathered observation/source inventory; a rolling URL is not an immutable vendor release artifact.
- Fit/confidence scores are structured judgments. Retrieval quality, memory footprint, throughput, concurrent capacity, failure rates and whole-service operating cost remain unmeasured.
- The final advertised native OS/architecture matrix remains an owning-product decision, not something inferred from a client language or a reusable native helper.

## Inspected inputs and SHA256

The first eight paths are relative to `engineering-research` and copied under the immutable review-input directory before reading. Full path prefix: `/workspace/scratch/9779522cc445/autogpt-comparison/notes/catalog-review-round1-inputs/`.

| Inspected path | SHA256 |
| --- | --- |
| `docs/studies/review-router-memory-sdk-extraction.md` | `a636eb964779f756cf593f4e03a3c7a301895deca3d029c940df56165cf5fe76` |
| `docs/studies/architecture-follow-through-from-autogpt-and-memory.md` | `9e09a7bf7ec5ecb711891a15fbb3e2aef48d8cf9a978316eaf1d07acedbfb6b2` |
| `docs/technologies/README.md` | `5beacbf4adb396452ba6d1b7be842bff5c78194ff5547d7e9a53db429ed366b3` |
| `docs/technologies/memory-and-knowledge.md` | `beaba63417a0a82aebb494a342fc09e34f6d8d0c49a772e3314c793e12f8987f` |
| `docs/technologies/agent-execution-and-sandboxes.md` | `9c35220c6a957684691026ff709430be37270bdf9c21e4fc9211754355c5c62f` |
| `docs/technologies/browsing-search-and-retrieval.md` | `447226748fbb1b5545f58403724971728e9abc858c574ebb34396a7449cc1c9f` |
| `docs/technologies/observability-and-prompts.md` | `c99b7b27353d3802be74e5e9a0431b85b217fedc81460d847081d84a989e59d3` |
| `docs/technologies/data-and-document-processing.md` | `bc0f54f76c741ae21a6afcac559ba8f23f33dbb9c5ecfde842608e2f217a8b84` |

Additional directly read source files, relative to `/workspace/scratch/9779522cc445/autogpt-comparison/`:

| Inspected path | SHA256 |
| --- | --- |
| `repos/review-router-ai/packages/context-memory/src/hindsight/memory-store.ts` (lines 1–250) | `775d6e49685798bd143093baae3d79a923c8e2df913ce19509f412c013f65f36` |
| `repos/review-router-ai/packages/context-memory/package.json` | `33c2210a36321b0a68fbbce522e64371ec544cce27a1009551a34d8eb20a69db` |
| `repos/agent-teams-orchestrator/docs/decisions/0115-canonical-fully-local-v1-adoption.md` (lines 165–190) | `5d59e63db6dea5ff6a60d04cd0c9b634abb371f25d57f88f0df87130b0cc8805` |
| `repos/agent-runtime/docs/architecture/agent-runtime-architecture-program-plan.md` (lines 260–301) | `b554741015e3e53b52cb846d9c4b15b14c29cb37dfcb15c5fe247f95a545e9e8` |

No publication or product repository files were changed by this reviewer.
