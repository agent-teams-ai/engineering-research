---
id: research.technologies.modularity
type: technology
status: active
owner: research/maintainers
summary: Reusable composition, plugin and capability-contract patterns with explicit limits on runtime authority.
---

# Modularity and Extension Contracts

## Scope and practical fit

A reusable library, a composition toolkit, an in-process integration block, a remote tool protocol and a skill package solve different problems. Their interfaces can complement one another, but none automatically supplies the others' authorization, isolation or lifecycle guarantees. The useful research question is which mechanism removes repeated integration work while preserving a clear semantic owner.

This category compares inspected source at Get Modular `5fb8347`, AutoGPT `9cb76f9` and ReviewRouter `9a416df`. It records fit for scenarios, not a library adoption decision or a claim that a public extension ecosystem is already selected for Runtime v3.

## Get Modular: use it at a composition boundary

Get Modular compiles inert declarations and an explicit profile into a deterministic immutable plan. Optional Assembly constructs Host-authorized factories with closed dependency records. The Host retains permissions, readiness, lifecycle and recovery; the compiler has no discovery scan, network access or hidden registry. [System boundary][gm-boundary]

At the original [pinned audit](#scope-and-practical-fit), the inspected Core and Assembly manifests were **0.7.1**; the then-inspected Orchestrator profile pinned **0.5.0** and ReviewRouter's memory feature declared **0.7.0**. Preserve those historical source claims. A fresh 2026-11-28 read of [Get Modular main `e5bed69b`](https://github.com/agent-teams-ai/get-modular/tree/e5bed69b096949346b9c2ffeed24850f86abd406) shows [Core](https://github.com/agent-teams-ai/get-modular/blob/e5bed69b096949346b9c2ffeed24850f86abd406/packages/core/package.json) and [Assembly](https://github.com/agent-teams-ai/get-modular/blob/e5bed69b096949346b9c2ffeed24850f86abd406/packages/assembly/package.json) at **0.8.0**. The [README](https://github.com/agent-teams-ai/get-modular/blob/e5bed69b096949346b9c2ffeed24850f86abd406/README.md) advertises those exact published versions; package manifests alone do not establish registry availability or consumer adoption. A source update does not silently upgrade any consumer's accepted pin. [Historical Core manifest][gm-core], [historical Assembly manifest][gm-assembly], [Orchestrator profile at its audited revision][orchestrator-pin], [ReviewRouter manifest at its audited revision][rr-pin]

The Consumer Module Standard requires a semantic owner, not an entry per class. Fixed helpers stay static imports and typed factories. Independently assembled capabilities and alternative implementations use the adopted composition root; declarations remain in the outer adapter. One production authority excludes a second direct fallback graph or runtime string lookup. [Consumer standard][gm-standard]

This fits a product Host choosing an interchangeable memory provider. It adds little inside a small fixed native-client wrapper. Such an SDK can expose ordinary contracts and factories, with a consumer-owned composition adapter when required by that Host's adoption. Domain/application code should continue using owned ports, without Get Modular registration types or foreign SDK DTOs.

Resources helps modules that actually acquire disposable resources. Pure and borrowed capabilities need no resource scope. A complete cleanup report proves registered callbacks returned, not that a remote operation stopped or data was physically erased. The private lifecycle-kernel candidate is for explicitly adopted dynamic-host bookkeeping; it is not required for static composition. [Resources][gm-resources], [kernel boundary][gm-kernel]

## What AutoGPT contributes

**Blocks and provider descriptors.** Typed inputs/outputs, credential descriptions, examples and common block tests make integration authoring easier. ProviderBuilder centralizes provider configuration. The transferable idea is one coherent authoring contract that feeds validation and discovery. Its limit is equally important: the block loader imports Python modules in-process. A block schema or effect declaration does not establish hostile-code isolation. Avoid turning a reusable base class into the owner of business workflows and recovery. [Block contract][ag-block], [ProviderBuilder][ag-builder], [loader][ag-loader]

**MCP.** A protocol can make remote capabilities accessible without porting their implementation to TypeScript. AutoGPT's HTTP helper disables ordinary automatic transport retries for `tools/call` because an effect may precede the missing response. Other explicit protocol interactions still exist; this is not a claim that no tool request can ever be repeated. Keep transport policy distinct from authorization and effect identity. [MCP boundary][ag-mcp]

**Skill packages.** Canonical content hashes and three-way merge preserve package identity and user edits. A conflicting update can retain the user's version and report conflict. This is useful for managed instructions and bundled files; a hash is not publisher trust, and preserving edits can preserve obsolete instructions. Installation policy, permissions and executable admission still require their owning contracts. [Package identity and merge][ag-skills]

Agent Teams' accepted extension invariants already separate manifests from grants, installation from effect authority, and artifact identity from active runtime generations. Public SPI and exact lifecycle/hot-update decisions remain deferred. These AutoGPT patterns can inform later contract design without adding a plugin loader to ordinary Runtime v3. [Extension safety][extension-safety], [open lifecycle decision][extension-lifecycle]

## Scenario scores

Fit and confidence are integers out of ten. Fit means usefulness for the named task; confidence reflects inspected evidence. These are planning judgments, not security certification or measured runtime performance.

| Scenario / mechanism | Fit | Confidence | Boundary or tradeoff |
| --- | ---: | ---: | --- |
| Get Modular for selected, independently composed product capabilities | 9 | 9 | Explicit binding and early diagnostics; preserve one Host authority |
| Get Modular throughout one fixed transport SDK's private helpers | 2 | 9 | Adds descriptors and coupling without a real selection boundary |
| Resources for an adapter that owns a connection or process | 8 | 9 | Cooperative release only; Host still owns deadlines and physical evidence |
| AutoGPT-style schema/provider descriptors for trusted integrations | 8 | 8 | Less repeated authoring metadata; do not move domain policy into a block base |
| Remote MCP for a foreign-language capability | 8 | 8 | Reuses implementation; adds network, trust, latency and uncertain-effect obligations |
| Content-addressed skill bundles with explicit merge conflicts | 8 | 8 | Reproducible identity and user-edit preservation; separate trust and update policy |
| In-process blocks as isolation for arbitrary customer code | 2 | 9 | Typed interfaces do not provide a sandbox |
| Dynamic lifecycle kernel for the present static memory SDK | 2 | 9 | No demonstrated hot-update need; candidate is not adopted by this research |

## Costs and next evidence

Composition safety has a real coordination cost: current Get Modular contracts require exact capability revisions, including additive type changes. Peer versions, descriptors, packed consumers and compatibility fixtures become part of maintenance. They are justified at a real reusable seam, not by the number of modules. [Revision rules][gm-revisions]

For a later SDK extraction, first show an installed ordinary TypeScript consumer and the existing product consumer. Add a composition adapter only for independently assembled capabilities in the selected Host. Verify incompatible binding fails before external I/O, borrowed dependencies are not disposed, uncertain writes retain identity, and the package's actual dependency closure matches its promise. No new global manager, custom module framework, background scheduler or second authorization ledger is required by these examples.

[gm-boundary]: https://github.com/agent-teams-ai/get-modular/blob/5fb83478dd7b95216be92c4d3077eddf2774eef8/docs/architecture/system-boundary.md#L13-L93
[gm-core]: https://github.com/agent-teams-ai/get-modular/blob/5fb83478dd7b95216be92c4d3077eddf2774eef8/packages/core/package.json
[gm-assembly]: https://github.com/agent-teams-ai/get-modular/blob/5fb83478dd7b95216be92c4d3077eddf2774eef8/packages/assembly/package.json
[orchestrator-pin]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/architecture/composition-and-dependency-injection.md#L28-L70
[rr-pin]: https://github.com/777genius/review-router-ai/blob/9a416dfb876d78253612e87aa89561d48bf35633/packages/features/memory/package.json
[gm-standard]: https://github.com/agent-teams-ai/get-modular/blob/5fb83478dd7b95216be92c4d3077eddf2774eef8/docs/architecture/common-assembly.md#L77-L110
[gm-resources]: https://github.com/agent-teams-ai/get-modular/blob/5fb83478dd7b95216be92c4d3077eddf2774eef8/packages/resources/README.md#L1-L25
[gm-kernel]: https://github.com/agent-teams-ai/get-modular/blob/5fb83478dd7b95216be92c4d3077eddf2774eef8/packages/lifecycle-kernel/README.md#L1-L63
[gm-revisions]: https://github.com/agent-teams-ai/get-modular/blob/5fb83478dd7b95216be92c4d3077eddf2774eef8/docs/architecture/common-assembly.md#L613-L638
[ag-block]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/_base.py
[ag-builder]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/sdk/builder.py
[ag-loader]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/__init__.py#L1-L70
[ag-mcp]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/mcp/client.py#L266-L282
[ag-skills]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/data/skill_package.py#L1-L121
[extension-safety]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/decisions/0095-extension-safety-and-ownership-invariants.md#L35-L85
[extension-lifecycle]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/5a8496ce711909e381c5bc817fff5500be9a1761/docs/open-decisions/OD-043-extension-lifecycle-catalog-and-hot-update.md

## Deep extension lifecycle candidate screen — 2026-11-27

See [the source and incident study](../studies/composition-and-scale-evidence.md#deep-follow-up-live-plugin-custody-and-openclaw-failure-history--2026-11-27).
This is pass 7 of the fleet follow-up. Fit is scenario-specific (1–10);
confidence is evidence confidence, not security certification or measured
capacity. No package is selected or newly admitted. Rolling documentation
is distinguished from source snapshots in the linked study.

| Candidate / mechanism | Fit / confidence | Strength and limitation | Recommendation |
| --- | --- | --- | --- |
| Qualified Get Modular Resources and [GM/Effect integration](https://github.com/agent-teams-ai/get-modular) | 9 / 8 for trusted composed lifetime | Existing typed graph, resource ownership and optional native Effect profile. Neither handles arbitrary native-code isolation, durable Active Head or external effect settlement. | First choice for the supported owner profile; inspect actual released exports and installed consumer proof. |
| [OSGi R8 wiring](https://docs.osgi.org/specification/osgi.core/8.0.0/framework.wiring.html), Equinox source in the study | 9 / 9 as design reference, 2 / 9 as direct TS dependency | Mature revision/retained-wiring/dependent-closure semantics. Refresh can stop and restart dependents; service acquisition is not external custody. | Transfer invariants and fixtures, not JVM/OSGi container or global registry. |
| [IntelliJ dynamic plugins](https://plugins.jetbrains.com/docs/intellij/dynamic-plugins.html), [Disposer](https://plugins.jetbrains.com/docs/intellij/disposers.html) | 9 / 8 as reference | Documented dynamic eligibility, disposable scopes, inspections for unsafe references, restart on failed unload, explicit native-library limits. A parent/child tree alone cannot express borrowed shared resources or remote settlement. | Add authoring-time negative fixtures for unsupported dynamic profiles and runtime leak tests to existing EF/LMU qualification. No copy of singleton disposer. |
| [VS Code extension host](https://code.visualstudio.com/api/advanced-topics/extension-host) and [remote extension guidance](https://code.visualstudio.com/api/advanced-topics/remote-extensions) | 9 / 8 as host profile reference | UI, workspace and browser/remote host placement, lazy activation. Remote host placement does not automatically prevent effects on local client through host APIs. | Model execution location separately from permission scope, API/wire compatibility and client capabilities. Test local/remote/browser parity only for declared profiles. No new Electron requirement. |
| [OpenClaw source generation/retirement](../studies/composition-and-scale-evidence.md#passes-13-ownership-live-update-and-adversarial-lifetime-review) | 9 / 8 for test scenarios, 3 / 8 as dependency | Exact instance authority, cache custody, lazy source retention, history of difficult reload bugs. Single-process/global maps and cooperative trust assumptions. | Preserve useful instances and bound retention; reject entire-Gateway/global-registry dependency. |
| [Node ESM](https://nodejs.org/api/esm.html), [worker threads](https://nodejs.org/api/worker_threads.html), [child processes](https://nodejs.org/api/child_process.html) | 9 / 8 for ordinary TS and disposable execution | Native loading and isolated execution mechanisms. Loader cache invalidation, termination request and external child/descendant cleanup are distinct. Workers are not hostile-tenant security boundaries. | Use native mechanisms inside qualified adapters; test actual post-await/stream/lazy-import and physical disposal. |
| [Effect](https://effect.website/) native scope, interruption, concurrency and layers | 9 / 8 where Effect semantics chosen | Mature resource and cancellation primitives, typed errors; native scope closure does not prove external effects stopped. | Reuse existing GM integration and existing Effect research. Don't introduce another neutral scope wrapper or force Effect into ordinary portable domain contracts. |
| [fast-check](https://github.com/dubzzz/fast-check), [model-based testing](https://fast-check.dev/docs/advanced/model-based-testing/) | 9 / 7 for EF development fixtures | Generated command sequences and reproducible shrinking are useful for ownership/state machine laws. The model can repeat implementation errors, and simulated scheduling does not prove real OS cleanup. | Small exact-version pilot using independent oracle, actual owner adapters and replay seed; use existing EF capabilities and native tests, not a new test framework. |
| [TLA+](https://github.com/tlaplus/tlaplus) / TLC | 8 / 6 for narrow distributed protocol design | Explicit safety/liveness and state-space exploration for handoff, stale writers and unknown commit. Model abstraction, state explosion and translation to implementation require discipline. | Optional bounded model for one cross-cell handoff or LMU publish/retire law; no mandatory spec DSL, no general model-checking gate. |

Avoid a second universal plugin runtime, service locator, state machine DSL or
dependency graph. Compare each ready mechanism with the actual existing
foundation and consumer. Node, browser, isolated-process and remote profiles
retain their separate evidence. Native Federation, MF, SystemJS, Piral, Extism,
Wasm and other previously evaluated mechanisms remain in the existing
[Extension Foundation execution profile register](https://github.com/agent-teams-ai/extension-foundation/blob/a1b5007ae4777bb5b01adab35a9ee83546a62333/docs/architecture/live-extension-system-map.md#L166-L198);
do not treat them as newly researched/selected here. Check exact releases,
license, native/TS7 support, installation and security before admission.

## Continuous-update candidate refinement — second campaign

The [exact LMU, GM and EF source probes](../studies/composition-and-scale-evidence.md#second-deep-campaign-executable-lmu-boundary-and-competitor-implementation-review--2026-11-27)
change the qualification priority, not the accepted profile or package pins.

| Candidate | Adopt now / evaluate next | Reject as default |
| --- | --- | --- |
| GM Resources + native Effect scope/Stream | First compare existing released, installed consumer capabilities for finite ownership and separately qualified streaming. Keep native errors, cancellation, original cleanup and owned stream scope. | New universal scope, event emitter, or wrapper that erases native lifetime. |
| LMU + EF verified artifact | Keep cooperative finite profile; evaluate cumulative per-realm budgets, mixed-version contract, explicit handover and continuous-service retirement. | Unlimited in-process ESM cache-busting or advertised unloading. |
| Node worker/process with typed RPC, HashiCorp go-plugin as reference | Bounded recyclable realm shared by compatible trusted modules. Compare actual startup, memory, call/stream cost, exit/cleanup receipts and reattach proof. | One process per pure module/agent; PID-only reattach; treating worker as hostile-code sandbox; adopting Go plugin library as TS runtime. |
| Envoy xDS patterns | Reference for staged/active/observed version, stale ACK/nonce and delta reconciliation; use existing product outbox/feed where possible. | New universal distribution control plane, global snapshot lock, ACK as applied authority. |
| TLA+/TLC or fast-check | Existing [four bounded model experiments](../studies/composition-and-scale-evidence.md#a8--executed-bounded-adversarial-models-for-fleet-moves-and-shared-budgets) demonstrate why an independent oracle matters. Evaluate generator with real adapter, fault injection and mutation tests. | Model success as substitute for runtime/SQL qualification or mandatory DSL. |

A worker or subprocess boundary is valuable only if its full ownership and
failure semantics are qualified. Before adding any package, check actual
supported runtime/TS versions, license, dependency surface, release and
current consumer qualification; none was adopted here.

## Operational plugin parity and friction — source follow-up, 2026-11-28

This follow-up compares **implemented or documented competitor behavior** with
Agent Teams' **selected finite implementation and proposed stronger profiles**.
Upstream artifacts below were inspected; their complete E2E and our product E2E
were not rerun here. An upstream incident already closed is a historical
failure pattern, not a claim that the current release still has that bug.

| Source and evidence class | Current useful behavior or failure lesson | Specific Agent Teams discriminator and owner |
| --- | --- | --- |
| [OpenClaw exact source `8ae0874`: reload cleanup](https://github.com/openclaw/openclaw/blob/8ae087424063b63845cfb94a096d21ede85300c7/src/gateway/server-plugin-reload-cleanup.ts#L110-L215) and [agent handoff](https://github.com/openclaw/openclaw/blob/8ae087424063b63845cfb94a096d21ede85300c7/src/agents/tools/plugins-tool.ts#L164-L180), inspected implementation | Admitted-work drain separates timeout from actual settlement; agent-triggered self-reload ends the holding turn and delegates reload/resume to a separate owner. Neither pattern is a unique future LMU feature. | LMU F4/F5 plus the actual Agent/Host owner: qualify a self-update intent, old-turn release, exact success/unknown receipt and resumed same user work; do not let an old callback await its own retirement or invent durable replay. |
| [OpenClaw plugin management](https://docs.openclaw.ai/plugins/manage-plugins), maintained product docs; [historical closed missing-generation issue #153290](https://github.com/openclaw/openclaw/issues/153290) | Separate installed/active/usable state, runtime inspection, changed-capability consent and old-source retention. An old source or companion asset deleted while an external holder still uses it is a credible historical failure pattern. | EF E4/E5/E6 and LMU: compare consent before effects, preserve real source/asset holders, expose actionable unknown/cleanup debt, and demonstrate unrelated plugin continuity. Signed bytes never grant permission. |
| [VS Code extension hosts](https://code.visualstudio.com/api/advanced-topics/extension-host) and [activation events](https://code.visualstudio.com/api/references/activation-events), official behavior | Local, browser and remote placement and lazy capability activation are explicit; an extension can be usable without eager expensive startup. | EF/Host: keep headless core and optional UI/placement independent. Measure first useful call, cold discovery, extra deps and unrelated startup latency. Do not require one process per internal module. |
| [Grafana plugin lifecycle](https://grafana.com/developers/plugin-tools/key-concepts/plugin-lifecycle) and [backend SDK](https://grafana.com/developers/plugin-tools/key-concepts/backend-plugins), official behavior | Lifecycle stages distinguish discovery, validation, registration, backend process and lazy UI load; managed instance state can retain pools until configuration changes. A subprocess avoids a crash taking down the host, but alone is not a hostile-code containment proof. | EF E4/E6: make an authored plugin's public journey and placement understandable, with owner-scoped state, real failure recovery and no implicit runtime-global service bag. |
| [JetBrains dynamic plugins](https://plugins.jetbrains.com/docs/intellij/dynamic-plugins.html), official qualification rules; [OSGi R8 wiring](https://docs.osgi.org/specification/osgi.core/8.0.0/framework.wiring.html), specification | Dynamic eligibility and classloader/resource leaks are checked explicitly; OSGi retains old in-use wiring and refreshes dependent closure. | GM + LMU: the old/new affected set and retained consumers matter more than the selected-root graph; reject unsupported live modes and report required restart rather than simulate unloading. |
| [Temporal worker versioning](https://docs.temporal.io/best-practices/worker), official deployment guidance; [Envoy xDS](https://www.envoyproxy.io/docs/envoy/v1.40.0/api-docs/xds_protocol), protocol spec | Pinned workflow versions retain workers while active; config ACK/NACK and dependency warming are not the same as a useful application result. | Orchestrator/Platform/LMU: distinguish staged, accepted, active, observed and useful; keep old workers and compatible state until obligations finish. Do not build a second controller. |
| [Kubernetes Agent Sandbox exact warm-pool code `6242490`](https://github.com/kubernetes-sigs/agent-sandbox/blob/6242490fac541912665243d67c42405be0cb692d/extensions/controllers/sandboxwarmpool_controller.go#L58-L165), inspected implementation | Cache-lag expectations, per-pool indexing, readiness grace, jitter and refill pacing distinguish desired warm members from actually claimable capacity; repeated delay under sustained arrivals can starve refill. | Runtime C0-C3 hosted adapter, conditional on selecting warm pools: reject double-credit of pending creates/claims; prove sustained useful admission, bounded refill and control progress; keep application authority in its existing owner. |
| [OpenTelemetry metric cardinality](https://opentelemetry.io/docs/concepts/signals/metrics/), SDK guidance; [Kubernetes API priority/fairness](https://kubernetes.io/docs/concepts/cluster-administration/flow-control/), operational guidance | Unbounded unique labels and unbounded queues consume resources; priority and fairness need separate, measured budget behavior. | Runtime C0-C3 already specifies limits and fairness. Verify actual metric labels and control capacity at saturation rather than adding another generic scheduler. |
| [WASI 0.3 component-model release](https://component-model.bytecodealliance.org/reference/faq.html), evolving standard | Native async functions, streams and futures have a portable interface model; cross-language type compatibility does not imply safe plugin unloading, isolation or native custody. | EF/Runtime: preserve narrow host ports; qualify a concrete Wasm/WIT profile only for a selected real consumer, not as a mandatory TypeScript kernel. |

**Potential competitive advantage is an independently demonstrated whole user
journey**, not the count of frameworks. A useful external headless plugin should
have a short typed authoring path and understandable failure; the selected Host
should show *what will change*, actual grant/consent consequences, affected
dependency and retained-work scope, restart or incompatibility requirements,
and the difference between accepted and useful activation. A preview is
read-only information, not admission, authority or a universal new API.
Reject an incomplete or stale preview at the real owner decision; keep the
actual Host's public surface small. Use existing EF/GM/LMU facts rather than
inventing a second resolver or update coordinator.

A fair comparison needs the **same fixed useful workload**: initial install,
first effective invocation, update while unrelated work runs, denied capability
expansion, malformed update, late old callback, cleanup failure, restart and
state retention, plus cold discovery and runtime cost. Measure author steps,
dependencies and failure diagnosis as well as correctness. Product adoption,
hostile isolation, long-running streams, multiple cells and scale each have
their separate claimed profile and native evidence; passing one does not
certify the others.

## Plan-level plugin parity target, 2026-11-27

Compare planned guarantees with planned guarantees and executed behavior with
executed behavior. The owner requires competitive modularity, plugins and live
updates across the greenfield products. This is a delivery target, not a claim
that the current finite profiles already implement every mode.

| Reference and evidence class | Relevant baseline and comparison boundary |
| --- | --- |
| [Paperclip plugin specification at c72c4687](https://github.com/paperclipai/paperclip/blob/c72c4687083db82348baa03a7d57cb6963245f44/doc/plugins/PLUGIN_SPEC.md), inspected target specification with implementation caveats | Specifies out-of-process workers, capability-gated worker-side host calls, UI contributions, SDK compatibility and install/uninstall/upgrade/config changes without a server restart. Its upgrade sequence drains/stops the old worker before starting the successor; this is not a promise of arbitrary old/new overlap. |
| Paperclip deployment and trust scope, same pinned specification | Core assumptions are instance-global installation and single-tenant/self-hosted use; companies are not plugin trust boundaries and same-origin plugin UI is trusted. Managed image packages have a separate restricted resolver; that section does not establish coordinated multi-server plugin rollout. No competitor runtime was executed for this comparison. |
| [OpenClaw replacement and turn handover](../studies/composition-and-scale-evidence.md#a3--openclaw-resolves-these-precise-problems-at-management-seams), pinned implementation source | Generation retention, self-reload refusal, bounded drain, declared overlap and safe-step turn handover already have concrete mechanisms. Generation naming or a generic hot-reload claim is therefore not a differentiator. Use the exact qualified trust/state/resource scope when comparing. |
| [OSGi retained wiring and dependent closure](../studies/composition-and-scale-evidence.md#pass-4-mature-modular-systems--osgi-versus-js-generation-replacement), specification and source reference | Mature modular systems already distinguish revisions, retained users and affected dependents. Reuse those invariants; JS code residency, product state and external custody still need their own owners. |

The practical target is one connected install/use/live-update/disable/uninstall/
restart journey, with useful successor behavior, coherent permitted old work,
original cleanup, recovery of uncertain effects and bounded cumulative
retention. Qualify only the applicable overlap, stream, transfer, realm and
isolation profile; a successful import or readiness response proves less.
Keep a useful external headless plugin, optional UI and actionable diagnostics
in the authoring proof, including the necessary glue and upgrade steps.

EF and LMU own the shared artifact and update contracts; GM supplies composition
facts and resource mechanisms. Products retain state, authorization and physical
custody. Their owner-local plans decide mechanisms and qualification, without a
second plugin engine or a fleet-capacity promise from this comparison.
