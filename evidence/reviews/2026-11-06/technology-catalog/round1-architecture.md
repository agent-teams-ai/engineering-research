# Catalogue round 1: independent architecture cross-review

Reviewer: agent_teams_plan. Date: 2026-11-06. Read-only review of consolidated research, with pinned source spot checks. No product, repository-document or source changes; this review note is the only file written for this review. Pending source-manifest/review-record assembly was explicitly excluded from findings.

## Verdict

**Scoped no-blocker. No P0/P1/P2 correction is required within the reviewed architecture, option-rationale and estimate-scope surfaces.** The recommendation to evolve the existing mechanism library is supported as a research direction. It is not evidence that Orchestrator/Platform has an accepted memory slice, that a new engine is interchangeable, or that a package is production-qualified. The consolidated text preserves those distinctions.

I challenged B against both alternatives instead of assuming extraction is automatically best. A remains an appropriate immediate bounded reuse proof when its consumer already owns authorization and durable delivery. B fixes identified uncertainty/entrypoint/profile seams without importing the large product feature. C could be equally correct, but no named requirement currently makes a rewrite preferable. Giving C the same achievable reliability ceiling, lower recommendation confidence and higher complexity is fair. The recommendation can change if a concrete consumer demonstrates a semantic incompatibility; no such evidence was established by this audit.

## Exact reviewed artifacts

Base directory: `/workspace/scratch/9779522cc445/autogpt-comparison/repos/engineering-research`.

| Inspected path | SHA-256 |
| --- | --- |
| `docs/studies/review-router-memory-sdk-extraction.md` | `a636eb964779f756cf593f4e03a3c7a301895deca3d029c940df56165cf5fe76` |
| `docs/technologies/README.md` | `5beacbf4adb396452ba6d1b7be842bff5c78194ff5547d7e9a53db429ed366b3` |
| `docs/technologies/memory-and-knowledge.md` | `beaba63417a0a82aebb494a342fc09e34f6d8d0c49a772e3314c793e12f8987f` |
| `docs/technologies/modularity-and-extension-contracts.md` | `a6430b9b82fe6b0b0e47c60b91d2706ffee3c8de18b3d6717e4ba934697f02d3` |
| `docs/studies/architecture-follow-through-from-autogpt-and-memory.md` | `23061cc88e9324c5dded4320f3793d4be7ddc13ee4c6f8a30661d397bab09b4a` |
| `docs/competitors/autogpt-vs-agent-teams-architecture-and-python-ecosystem.md` | `ed2f24533c83f942ff3c564353aeaf351912b1c6cc0e5c49523b805700223907` |

The follow-through file changed during review only to add explicit code-sizing confidence 3/10; I re-read that change and record its final hash above. D3's “requiring independent profile qualification” wording was inspected and correctly avoids claiming completed qualification.

## Material challenges and results

| Severity / result | Evidence inspected | Assessment and action |
| --- | --- | --- |
| None; A/B/C rationale survives | SDK study lines 114–134; actual private package and public root exports | A proves reuse with existing Hindsight and consumer-owned safeguards. B addresses concrete gaps, not a speculative universal engine. C preserves equivalent-correctness potential and retires its predecessor if selected. **Action: retain rationale.** Do not turn B into implementation approval. |
| None; no authority transfer | Study ownership table and write-uncertainty sections; `features/memory` claim/observe code; follow-through D1 | The native engine owns current-content mechanisms; product approval/revision/source applicability/delivery remain outside. Agent Context's accepted initial slice still excludes general memory/RAG. Platform remains consumer; Runtime gains no semantic memory owner. **Action: retain exact ownership exclusions.** |
| None; uncertainty gap is supported and not overstated | `context-memory/src/hindsight/memory-store.ts` lines 83–117 and 201–257; product store lines 792–837; provider observation 579–666 | Post-request deadline/unavailable can mean a possible write. Product claim writes unknown/firstDispatchedAt before I/O, recovered claims observe, absent native status does not prove no effect, and publication requires readback. The study correctly calls this a portable-consumer contract ambiguity, not a demonstrated Router duplicate-write defect. **Action: retain D2 as a proposal.** |
| None; generic-contract limits acknowledged | SDK contracts; preview source lines 66–100 and 171–198; SDK study gaps 2/3 | Native `world/experience`, maintainer/project extraction language and fixed bounds are disclosed. The study does not claim second-engine parity or move Gateway into the portable library. A provider-independent entrypoint is not described as already independent installation; the follow-through explicitly warns that subpaths do not remove package dependencies. **Action: retain.** |
| None; current preview selection is accurate | ADR-034; SDK README; study current-profile section; follow-through D3 | Native preview availability is distinct from selected Gateway extraction. Current-content Hindsight profile with native LLM/observations/consolidation disabled is not described as full upstream feature activation. Qualification declarations remain trusted input, not client-created evidence. **Action: retain corrected D3.** |
| None; LOC scopes are consistent | SDK study lines 116–128; follow-through lines 90–99; catalogue scoring rules | B's 350–800 production / 400–900 tests is the broader bounded evolution plus second-consumer mapping. 80–200 / 150–300 is packaging/entry cleanup only; 40–120 / 80–180 is a separate wrapper subset. Both exclude unchanged moved code, native/infrastructure work and product qualification; overlap is explicitly non-additive. B also explicitly excludes release/signing and persisted/in-flight migration. **Action: retain separate ranges and sizing confidence 3/10.** |
| None; Get Modular scope stays proportionate | Category lines 17–27, 37, 54–58; current CMS 77–110; consumer manifests | Current upstream 0.7.1 is not substituted for Orchestrator 0.5.0 or RR 0.7.0. Independently assembled capabilities use adopted Host composition; fixed library helpers remain ordinary code. Private lifecycle kernel and public plugin surface are not selected. **Action: retain.** |
| None; historical evidence has proper limits | Study evidence table and qualification discussion | Tests/workflows are described as inspected, historical packed-consumer results as historical, and native deployment/model evidence as separate. A production consumer means a source production path here, not a newly demonstrated live deployment. **Action: no testing claim upgrade.** |

Independent physical-line recount matched the study exactly: SDK source 5 files / 755 lines; feature production 45 files / 8,645 lines; feature tests 12 files / 6,278 lines. Counts include comments/blanks and are not effort estimates.

## Concrete remaining unknowns, not manufactured document blockers

1. **The second real consumer and its owner are still unnamed.** A disposable consumer can establish a technical consumption seam; it cannot accept a future Orchestrator Memory model. The study already conditions its estimates on an existing host authority/delivery owner. Before product adoption, name the host and required capability subset rather than assuming the 8,645-line product feature is included in the SDK range.
2. **Portable uncertainty API is not selected.** A phase marker, documented errors or a discriminated outcome are alternatives. Each must preserve stable operation identity, avoid treating absent/expired records as non-execution, and have compatible caller/implementer behavior. Existing product recovery should not be duplicated in the library.
3. **Native guarantee transfer remains profile-specific.** The config GET before retain proves the configuration observed then; it is not by itself atomic evidence that a mutable named strategy cannot change before retain. Qualified deployment immutability/configuration-change controls and native UUID-retention behavior must supply that guarantee if the next consumer promises exact persistence. This is a remaining qualification question, not a demonstrated current product defect or a reason to prescribe a new global lock.
4. **Preview taxonomy and task policy may not generalize.** A second consumer must determine whether it needs native classifications and maintainer-specific instructions. The study properly makes this a bounded interface/profile problem instead of assuming every memory engine has equivalent semantics.
5. **Current-head native/model quality, runtime support and release ownership remain unproven here.** Source inspection and the historical packed consumer do not establish all OS profiles, live native identity retention, semantic grounding, physical-forget behavior or a public registry release. These are expressly outside the code estimates and do not justify expanding the research into a new engine.

These unknowns constrain a later selected scope. They are not new release gates for unrelated Runtime v3 or a demand to run all product/native tests for this research.

## Original AutoGPT comparison: unchanged

The existing comparison remains appropriate within its own methodology and approximately one-point scoring uncertainty. The new SDK evidence does not justify changing it:

- ReviewRouter is evidence for reuse options, not a fourth already-adopted product in the original three-repository hypothetical target.
- Ordinary v3 scaling remains 7 versus 7; C0–C3's 8 is a separately named scenario, not silently imported scope.
- Public extension completeness remains AutoGPT 8 versus Agent Teams 6. A good Get Modular boundary and an unpublished memory client do not create a plugin ecosystem.
- Integration ease and M4 still favor AutoGPT's simpler authoring path; the added descriptor/qualification discussion reinforces the stated ceremony cost.
- No RAM, sustained-capacity, native-OS or actual TDD-history measurement has appeared. Those cells stay Unknown.
- M1–M5 arithmetic remains `(6+7+6+7+7)/5 = 6.6` and `(9+9+8+6+8)/5 = 8.0`. The domain/extension boundary scores retain their earlier limitations; no unselected memory/IAM/public SPI credit was added.

No recommendation here asks for a score change or a new benchmark.

## Source spot-check record

Primary code was read at ReviewRouter `9a416dfb876d78253612e87aa89561d48bf35633`, with origin `https://github.com/777genius/review-router-ai`. Core boundary documents remain at Runtime `ab0387c02fe75ed0c9bb456caaad9a6d2723795b`, Orchestrator `5a8496ce711909e381c5bc817fff5500be9a1761`, Platform `7f6eb3746c07dc01751c29a8dbc62e50b5f7ad6d`, and Get Modular `5fb83478dd7b95216be92c4d3077eddf2774eef8`.

Key directly re-read code: `packages/context-memory/src/contracts.ts`, `src/hindsight/source-preview.ts`, `src/hindsight/memory-store.ts`; `packages/features/memory/src/infrastructure/hindsight/hindsight-memory-provider.ts` lines 579–666; `src/infrastructure/prisma/prisma-memory-knowledge-store.ts` lines 792–837. Those source links are already pinned in the reviewed SDK study.

Adjacent scope clarification sent to the ecosystem reviewer: Orchestrator ADR-0115 requires evidence for every **advertised** Windows/macOS/Linux tuple and an explicit selected matrix; Runtime v3 does not automatically promise all desktop operating systems. Prefer “required native-local baseline and its selected OS matrix” in the execution category. This is outside the six-artifact verdict above, and that reviewer owns its disposition.
