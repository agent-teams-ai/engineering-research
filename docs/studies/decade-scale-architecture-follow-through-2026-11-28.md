---
id: research.studies.decade-scale-architecture-follow-through-2026-11-28
type: study
status: active
owner: research/maintainers
summary: Pinned audit of costly-to-change contracts, existing coverage, concrete missing acceptance evidence and bounded owner follow-through.
---

# Decade Scale Architecture Follow Through 2026-11-28

## Scope and status

Research date: **2026-11-28**. The owner requested a decade-long view of the
greenfield Platform, Orchestrator and **Runtime architecture PROGRAM v3**,
with emphasis on omissions that become expensive after public contracts and
durable data exist. This is a source audit and a bounded planning follow-through,
not a claim that the products already implement or qualify the scenarios below.

### Agent start here

1. Refresh the affected owner's current plan and accepted decisions. Use the
   findings below only for the assigned boundary; an interesting finding is
   not an assignment to build another subsystem.
2. Preserve the already-covered requirements in the counterevidence table.
   Distinguish a missing principle from a missing first acceptance record.
3. For the first applicable slice, put the owner, promised behavior, unsupported
   behavior and smallest falsifying scenario in its existing plan. Resolve
   public/durable semantics before dependent implementation; independent slices
   may continue. Record actual execution separately from planned checks.
4. Update the affected owner record and this study's evidence if a result changes
   the conclusion. Keep past source identities rather than redating old evidence.

The [central evolution guide][central-evolution] owns common authoring guidance.
Product decisions remain in [Orchestrator evolution attributes][orchestrator-route],
[Platform research integration][platform-route] and the
[Runtime greenfield plan][runtime-route]. Offline-first, local LLM and
cross-instance synchronization already have a separate assigned workstream in
the [central delivery plan][central-plan]; this study does not select their
merge algorithm or create a second workstream.

### Inspected source identities

| Subject | Exact baseline | Evidence class and limits |
| --- | --- | --- |
| Organization guidance | `.github` `f18bc15cc5fc649e4a1ca32780de82ab907f7d70` | Maintained guidance, governance and selected recovery source; no new source qualification |
| Orchestrator | `2034493ec6d294e267b7bb3e7fa4d5d5d32ec4d2` | Accepted ADRs, open decisions, context dossiers and tooling plan after the documentation merges |
| Platform | `9e3526faf18a9a0ca9dab0e666c86d3107ebec4f` | Current plans, Project Management application/domain contracts and inspected tests; not a deployed durability result |
| Runtime v3 | `9655a4d5ccd97f1dee823fe7bc1660f72a58648c` | Architecture PROGRAM, ordinary S1–S5 and configuration/Host contracts; C0–C3 remains separate |
| Engineering Research | `44be6dd27bd4fd26e0184365d6275aca988845b1` | Existing composition, enterprise execution and preimplementation studies reused, not replaced |

Repository evidence is pinned below. External sources were read on this date;
books are supported by their authors' chapters, official excerpts or publisher
tables of contents. A publisher description is not a claim to have executed its
examples or read unavailable chapters. `Not found in inspected scope` is a
bounded search result, not proof of repository-wide absence.

## Evidence and counterevidence

### DS-01. Independent evolution includes the development control plane

**Finding: concrete dated failure and existing owner work, not a newly discovered
unowned incident.** The actual Platform and Orchestrator main runs
[46183269689][platform-docs-run] and [46183978343][orchestrator-docs-run]
failed in trusted authorization on 2026-11-28 with `DOCS_GATE_POLICY_REJECTED`.
The pinned `b30455e32cf5d54ade6d8301637701347e4ce57c` controller encountered
current policy fields outside its closed schema before validating consumer
documentation. These observations do not establish that every global policy
dependency is accidental or that authorization should be scoped away.

The current central baseline already contains bounded B304 incident/recovery
preparation for one exact Runtime registry incident and explicit generation/runtime
policy handling. That preparation supplies no active authority or consumer
qualification; Platform authority/proof staging remains explicitly denied. It
does not establish a repair of these Platform/Orchestrator failures. Separately,
[central PR #467][central-467] was merged at 19:34:55 UTC; it repaired ordinal
authorization-digest serialization, a different failure from the later
policy-schema rejection. Do not label #467 still open, treat it as fixing every
consumer failure, or replace the assigned recovery with another controller.

**Architectural consequence (inference):** independently versioned consumers
need an explicit supported-reader policy for shared development infrastructure,
just as public data protocols do. Before a new registry/policy version is
published, test one still-supported unchanged consumer against it. Preserve
global revocation, relevant cross-consumer invariants and exact selected-receipt
validation. Unknown security semantics must remain rejected. Reader-first
rollout or a qualified versioned envelope are options for the existing owner;
ignoring unknown authority fields is not a valid compatibility mechanism.

**First falsifier:** adding a genuinely irrelevant, supported new profile breaks
an unchanged valid consumer; the counterpart rejects a malformed selected
receipt or a relevant revoked authority. Record why a global dependency is
relevant rather than blindly excluding it. Reuse existing central/native
fixtures, source succession and consumer qualification.

**Counterevidence and verification:** on the pinned central baseline,
`node --test scripts/docs-managed-runtime-policy.test.ts` was executed on
Node 24.22.3: **3 passed, 0 failed/skipped**. It confirms closed historical/patched
runtime selection and rejection of unknown policy identities. This focused
execution neither reproduces the two hosted failures nor qualifies a repair,
the whole central repository or a new Node lane. The existing source is
[runtime policy][central-runtime-policy] and [bounded recovery][central-recovery].
Google's dependency-management and large-scale-change chapters supply the
general reasoning; the incident supplies our concrete case. [S1, S2, S5]

### DS-02. A user's project must have an explicit survival promise

**Finding: partial.** Versioned owner exports, provenance, erasure and retention
already exist in the [central baseline][central-evolution-baseline]. Orchestrator's [ADR-0085][observation-adr]
specifies protected diagnostic export, while [Orchestration Scope][scope-dossier]
does not own the product's export semantics. The first user-facing project
archive/read/import contract remains a specific follow-through in OD-029,
not a missing universal portability principle.

Keep three promises separate: an independently readable archive of permitted
user material; import through owner-approved format/migration rules; and new
execution or continuation under current authority. A physical backup, native
Temporal history and a provider checkpoint do not automatically satisfy any
other promise. [ADR-0116][temporal-adr] already rules out pretending to make
native engine history provider-independent.

**First falsifier:** export one completed Work with an artifact and permitted
history, then read it on a clean setup without the original cloud and optional
extension. Report missing extension-owned content or unsupported versions
explicitly. For an offered import, preserve source identities, redaction,
erasure/retention constraints and incompleteness; reject corruption. Imported
grants, secrets or old effect receipts cannot confer execution authority.
Continuation creates an authorized successor operation and never replays old
external effects merely because import succeeded.

**Ownership and cost:** product owners define meaning and permitted disclosure;
Runtime exposes only qualified native capabilities. The smallest useful route
is existing owner exports plus a readable manifest, not a universal state graph,
all-provider migrator or an extra runtime service. Long-term access in the
original local-first paper motivates this distinction without selecting CRDTs
for financial, grant or execution state. [S6]

### DS-03. Effective settings are a human-facing contract

**Finding: partial, with important existing constraints.** [OD-027][settings-od]
already uses immutable Work lifecycle definitions and explicit migration;
[ADR-0063][resilience-adr] already captures typed resilience snapshots. Typed
updates and explicit clear are already covered. The missing first-surface
acceptance is explaining which value took effect, why, and when it can change.

For the first applicable UI/CLI/API setting, show its safe effective value or
redacted reference, source/scope, revision and apply timing. Distinguish absent,
an explicit value equal to today's default, and reset/inherit; do not collapse
them during an upgrade. Bind a preview to the revision that is actually applied
or reject/recompute it after concurrent change. Separate desired, observed and
verified-applied state when these differ. Current authorization remains fresh
even when an operation's configuration is frozen.

Runtime supplies a useful counterexample to overclaiming: passive harness
configuration inspection may report observed files while precedence is
`not-evaluated` and compatibility is `unqualified`. It cannot truthfully display
an engine's effective configuration without evidence. Creation-time Host
snapshots also differ from settings for the next Host. The owner follow-through
belongs in the [S3–S5 plan][runtime-s3-s5], not a new configuration authority.

**First falsifiers:** a changed default silently changes an existing Work;
preview and applied revision differ without warning; resetting means different
things across upgrades; a found config file is presented as engine adoption.
A setting that can lock an operator out needs a recovery route at its existing
owner before exposure. Platform applies this to Deployment Management's desired
and observed plan revisions, not to Orchestrator Work semantics. [S3]

### DS-04. Stable outcomes must survive localization and operator recovery

**Finding: narrow concrete gap before a public boundary.** Platform application
[contracts][platform-contract] already distinguish result kinds, but
`denied`/`unavailable` carry `reason: string` and `dependency: string`, and
`invalid` carries `readonly string[]`. Its domain readiness model already has
enumerated reasons and allowed actions. Existing behavior is not thereby proven
incorrect. Before these outcomes become a public SDK/wire promise, select
owner-scoped stable reasons, typed safe parameters, diagnostic references and
applicable recovery independently of rendered prose.

Do not solve this by giving every context one global error enum. Translate the
owning domain outcome at its public adapter and preserve concealment and
disclosure rules. A newer unknown reason needs a safe client fallback that does
not infer permission or retryability. RFC 9457 is a useful HTTP example of
machine-readable problems, not a reason to replace the selected transport. [S7]

Orchestrator already requires operational explanations and safe intervention in
[OD-033][convergence-od] and observation contracts. Its [OD-016][sdk-od]
follow-through should connect one blocked/uncertain Run to a current safe
reason, freshness/evidence and an available authorized action. Runtime keeps
native/provider facts separate from product policy and localized presentation.

**First falsifiers:** a client branches on an English sentence; the UI offers
blind retry after an unknown external effect; policy changes leave a reason
looking current; a stop request is shown as physical termination. Corrections
after an applied context are successor evidence, not history rewrites. Efficient
human correction is a supported interaction goal, not access to hidden model
reasoning or a universal undo guarantee. [S8]

### DS-05. Measure the cost of an ordinary change on real consumers

**Finding: existing requirement, missing representative acceptance record in the
inspected scope.** Runtime already calls for cold and changed-leaf builds,
public-contract fan-out, memory/editor latency and focused feedback. Orchestrator
already plans affected checks and cache qualification. Existing composition
benchmarks are valuable; they are not the same as a product engineer's complete
feedback loop. Do not call build architecture absent or turn line count into a
performance result. [Runtime review][runtime-review], [tooling][orchestrator-tooling]

For one actual private leaf change preserving its contract and one intentional
public-contract change, record affected files/packages/owners, cold bootstrap,
warm local diagnostics, and required-gate wall time. Separate queue time from
execution and legitimate consumers from false dependencies. Include editor
memory/latency only where it is an observed constraint. Keep machine/toolchain,
cache state and command identities with the measurement. Choose budgets after
the baseline; no universal five-second target or new telemetry platform follows.

**First falsifier:** a private change unexpectedly rebuilds unrelated products,
or an affected-only gate misses a real dependent contract. Preserve full gates
until affected selection and cache inputs are qualified. The accepted graph and
Foundation tooling own this work; Google build-system experience does not
mandate Bazel, a new monorepo or one package per helper. Parnas and Ousterhout
explain why hiding changeable decisions and reducing change amplification
matter; architecture fitness functions make a selected claim checkable. [S1, S4, S9, S10]

### DS-06. Algorithm transition is distinct from rotating a key

**Finding: conditional follow-through, not immediate implementation.**
ADR-0085 already has envelope encryption, algorithm/key identity, per-object
keys, rewrap and required interrupted-rotation conformance cases. Only before a second real algorithm
profile is supported, specify permitted mixed readers, explicit unsupported
outcomes, interrupted migration and a ban on silent weaker fallback. Preserve
erasure and retention semantics during migration. The existing security/data
owner and manifest seam suffice; no universal crypto manager or new algorithm
is selected. RFC 7696 supports the distinction, not a particular urgent migration.
[S11]

### Candidates that the audit did not establish as omissions

| Candidate principle | Existing counterevidence | Correct next question |
| --- | --- | --- |
| Domain/module ownership and replaceable composition | Central FMS/CMS, consumer-owned ports, GM/EF/LMU boundaries | Does the first real seam obey its adopted version? |
| Single authority, durable effects and failure isolation | Product owners; outbox/inbox, idempotency, fencing, explicit uncertainty; Runtime S1–S5 | Does the selected provider/profile qualify the promised failure behavior? |
| Capacity, fairness and cancellation cleanup | Separate Runtime C0–C3 and Orchestrator execution/observation contracts | Which active workload and resource envelope is measured? |
| Time, ordering and DST | Orchestrator [ADR-0049][time-adr] separates occurrence/receipt/effect time and uses revision/sequence ordering | Does the actual calendar owner pass the selected DST cases? |
| Numbers, missing/null/clear and canonicalization | Orchestrator typed transport/updates and Runtime semantic digest preimages | Are the public wire meaning and independent golden vectors correct? |
| Projection repair, deletion and encryption rotation | ADR-0085's rebuild generations, fencing, corruption and erasure/rotation cases | Can the actual first implementation recover without resurrection? |
| Accessibility and localization | [OD-042][ui-od] requires host-enforced keyboard/accessibility and localization by rendering tier | What is the first plugin/UI tier's concrete acceptance evidence? |
| Deprecation and dependency exit | Central removal-owner rule, product compatibility/support decisions and ADR-0116 exit case | Fix the window and migration behavior before making the public promise |
| Reproducible failure testing | Central explicit time/randomness/scheduling where relevant and independent outcomes | Which actual fault distinguishes correct from defective behavior? |
| AI evaluation and provenance | Central versioned behavior/evaluation guidance and product Run/evidence owners | Which selected model/prompt/tool revision and empirical criterion are compared? |

Covered design is not implemented or production-qualified design. This table
prevents duplicate framework proposals; it does not close the owners' open work.
Existing [preimplementation decisions](../lessons/preimplementation-decisions.md),
[composition evidence](composition-and-scale-evidence.md) and
[enterprise execution study](one-agent-through-enterprise-execution.md) remain
canonical for their subjects.

## Implications and limits

### Delivery order and disputed alternatives

The immediate change is documentation: record concrete first acceptance cases
at existing owners, correct stale factual statements, and add a short agent
reading route. It creates **0 production LOC and 0 new test LOC**. The current
plans retain their stages; this research does not accept a new format, SPI,
storage scheme or global authority. Two bounded planning options are:

| Option | Conditional recommendation and failure mode | U / N / C | Incremental P / T; engineer-days |
| --- | --- | --- | --- |
| Owner-local follow-through with this central source record | **Recommended** for the observed gaps: preserve accepted semantics, identify the first contract and rejecting case; fails if a real shared mechanism is later copied into products | 9 / 8 / 2 | P=0, T=0; 0.5–2 days of documentation/source review, excluding implementation and protected delivery work |
| Research-only record, defer all owner navigation | Appropriate for an unassigned idea; here it leaves agents without the requested local acceptance route and risks repeated rediscovery | 5 / 6 / 1 | P=0, T=0; 0.25–1 day, excluding implementation |

No third technically credible bounded alternative was identified. An immediate
cross-product framework and uniform gate are excluded: there is no common
selected contract or demonstrated missing mechanism. That expansion risks
false coupling, premature APIs and duplicate policy; its P/T/days are unknown,
not zero or an approved implementation estimate.

U is confidence in fitness, N expected reliability **within the stated planning
scope**, and C implementation/maintenance complexity; all are ordinal judgments
out of 10, not measurements or SLAs. Estimate confidence is 4/10. Ranges assume
one experienced engineer and the inspected inputs; they are not additive. This
is not a comparison of implemented runtime designs. A real unresolved owner
format or rollout choice must receive its own bounded alternatives and estimates
before dependent implementation.

**Priority:** preserve the public/durable seams in DS-02–04 before first exposure;
DS-01 follows the already assigned central recovery and future compatibility
work, rather than blocking unrelated static slices; DS-05 joins the existing
first consumer acceptance; DS-06 activates only at an actual second algorithm
profile. S1–S5 is not expanded into C0–C3, and no offline synchronization design
is selected here.

The strongest counterargument is added process cost. It is addressed by keeping
each case in an existing owner plan, reusing existing gates and stopping once
that evidence is sufficient. Empty applicability records for every function,
general managers and repeated policy copies would undermine the goal of cheap
change. The strongest operational constraint is that historical state cannot
grant current authority: export, preview, retry and compatibility must preserve
that boundary even when it costs convenience.

No production deployment, clean-install project round trip, new provider failure
campaign or consumer build benchmark was executed by this audit. Those are
explicit next acceptance scenarios, not claimed E2E results. Source inspection,
the focused three-test execution above, documentation validation and publication
readback are different evidence classes. Future evidence should replace an
unknown with its exact scope and result, not with confidence alone.

## Sources

### Primary literature and project experience

| ID | Inspected primary source | Useful lesson and application limit |
| --- | --- | --- |
| S1 | Google, [Software Engineering at Google: Dependency Management](https://abseil.io/resources/swe-book/html/ch21.html) and [Build Systems](https://abseil.io/resources/swe-book/html/ch18.html), 2020 | Independently managed dependencies and correct fast feedback; does not select a repository topology or tool for us |
| S2 | Google, [Large-Scale Changes](https://abseil.io/resources/swe-book/html/ch22.html), 2020 | Evolve through compatible stages as atomic change becomes harder; preserve explicit migration ownership |
| S3 | Google, [SRE Workbook: Configuration Design and Best Practices](https://sre.google/workbook/configuration-design/), 2018 | Configuration is a human interface affecting reliability; narrow, understandable settings before a generic service |
| S4 | David Parnas, [On the Criteria To Be Used in Decomposing Systems into Modules](https://john.cs.olemiss.edu/~hcc/csci658/notes/localcopy/Parnas_Criteria_Decomposing.pdf), 1972 | Hide decisions likely to change; module count and lines of code are not sufficient measures of modularity |
| S5 | Hyrum Wright, [Hyrum's Law](https://www.hyrumslaw.com/) | Real consumers depend on observable behavior beyond declarations; a version number alone is insufficient compatibility evidence |
| S6 | Kleppmann, Wiggins, van Hardenberg and McGranaghan, [Local-first software](https://www.inkandswitch.com/essay/local-first/), Onward! 2019 | Long-term access and user control beyond temporary offline operation; CRDT suitability is data-specific |
| S7 | IETF, [RFC 9457: Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457.html), 2023 | Separate machine-readable problem identity from human explanation; HTTP-specific, not our mandatory transport |
| S8 | Microsoft Research, [Guidelines for Human-AI Interaction](https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/) and [Support efficient correction](https://www.microsoft.com/en-us/haxtoolkit/guideline/support-efficient-correction/), 2019 research | Make correction usable while respecting irreversible effects, provenance and current authorization |
| S9 | John Ousterhout, [Complexity lecture](https://web.stanford.edu/~ouster/cgi-bin/cs190-winter18/lecture.php?topic=complexity), 2018; companion to *A Philosophy of Software Design* | Evaluate change amplification, cognitive load and hidden dependencies; no claim that a synthetic module count proves maintainability |
| S10 | Ford, Parsons and Kua, [Building Evolutionary Architectures](https://evolutionaryarchitecture.com/) and [Fitness Function Katas](https://evolutionaryarchitecture.com/ffkatas/) | Selected objective architecture properties can be checked continuously; not a universal scoring committee or one gate per pattern |
| S11 | IETF, [RFC 7696: Guidelines for Cryptographic Algorithm Agility](https://www.rfc-editor.org/rfc/rfc7696.html), 2015 | Algorithm transition differs from key rotation; negotiated fallback still requires explicit security policy |
| S12 | Michael Nygard, [Release It!, Second Edition](https://pragprog.com/titles/mnee2/release-it-second-edition/), 2018, official contents/excerpts | Integration failure, bulkheads, back pressure and control-plane operation are useful audit lenses; existing budgets and owners already cover much of this |
| S13 | Martin Kleppmann, [Designing Data-Intensive Applications](https://dataintensive.net/), author's overview and linked contents | Compare trade-offs and limits instead of adopting patterns by name; no claim here of a new storage decision or full-book experiment |
| S14 | Software Engineering Institute, [Quality Attribute Workshop collection](https://www.sei.cmu.edu/library/quality-attribute-workshop-collection/) | Concrete stimulus, environment and response make quality goals assessable; use a few relevant scenarios, not a generic checklist |

### Pinned repository evidence and current owner routes

[central-evolution]: https://github.com/agent-teams-ai/.github/blob/main/docs/architecture/evolution-readiness.md
[central-evolution-baseline]: https://github.com/agent-teams-ai/.github/blob/f18bc15cc5fc649e4a1ca32780de82ab907f7d70/docs/architecture/evolution-readiness.md
[central-plan]: https://github.com/agent-teams-ai/.github/blob/f18bc15cc5fc649e4a1ca32780de82ab907f7d70/docs/architecture/evolution-library-delivery-plan.md
[central-runtime-policy]: https://github.com/agent-teams-ai/.github/blob/f18bc15cc5fc649e4a1ca32780de82ab907f7d70/scripts/docs-managed-runtime-policy.ts
[central-recovery]: https://github.com/agent-teams-ai/.github/blob/f18bc15cc5fc649e4a1ca32780de82ab907f7d70/docs/engineering-quality.md#bounded-b304-registry-incident-preparation
[central-467]: https://github.com/agent-teams-ai/.github/pull/467
[platform-docs-run]: https://github.com/agent-teams-ai/agent-teams-platform/actions/runs/46183269689
[orchestrator-docs-run]: https://github.com/agent-teams-ai/agent-teams-orchestrator/actions/runs/46183978343
[orchestrator-route]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/main/docs/architecture/evolution-quality-attributes.md
[platform-route]: https://github.com/agent-teams-ai/agent-teams-platform/blob/main/docs/architecture/shared-research-integration-plan.md
[runtime-route]: https://github.com/agent-teams-ai/agent-runtime/blob/main/docs/architecture/agent-runtime-greenfield-foundation-plan.md
[observation-adr]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/2034493ec6d294e267b7bb3e7fa4d5d5d32ec4d2/docs/decisions/0085-protected-observation-payload-and-rebuildable-search.md
[scope-dossier]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/2034493ec6d294e267b7bb3e7fa4d5d5d32ec4d2/docs/domain/contexts/orchestration-scope/README.md
[temporal-adr]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/2034493ec6d294e267b7bb3e7fa4d5d5d32ec4d2/docs/decisions/0116-native-temporal-for-fully-local-durable-workflows.md
[settings-od]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/2034493ec6d294e267b7bb3e7fa4d5d5d32ec4d2/docs/open-decisions/OD-027-configurable-work-lifecycle.md
[resilience-adr]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/2034493ec6d294e267b7bb3e7fa4d5d5d32ec4d2/docs/decisions/0063-typed-run-resilience-policy-snapshot.md
[convergence-od]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/2034493ec6d294e267b7bb3e7fa4d5d5d32ec4d2/docs/open-decisions/OD-033-ooda-convergence-and-context-activation.md
[sdk-od]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/2034493ec6d294e267b7bb3e7fa4d5d5d32ec4d2/docs/open-decisions/OD-016-public-error-model.md
[time-adr]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/2034493ec6d294e267b7bb3e7fa4d5d5d32ec4d2/docs/decisions/0049-exact-persistence-and-instant-profile.md
[ui-od]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/2034493ec6d294e267b7bb3e7fa4d5d5d32ec4d2/docs/open-decisions/OD-042-frontend-extension-contribution-model.md
[orchestrator-tooling]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/2034493ec6d294e267b7bb3e7fa4d5d5d32ec4d2/docs/architecture/repository-tooling.md
[runtime-s3-s5]: https://github.com/agent-teams-ai/agent-runtime/blob/9655a4d5ccd97f1dee823fe7bc1660f72a58648c/docs/architecture/agent-runtime-architecture-program-s3-s5-features-host.md
[runtime-review]: https://github.com/agent-teams-ai/agent-runtime/blob/9655a4d5ccd97f1dee823fe7bc1660f72a58648c/docs/architecture/agent-runtime-foundation-decisions-and-review.md
[platform-contract]: https://github.com/agent-teams-ai/agent-teams-platform/blob/9e3526faf18a9a0ca9dab0e666c86d3107ebec4f/packages/contexts/project-management/src/features/managed-project-scope-admission/application/contracts.ts
