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

The current source manifests identify **Core 0.7.1 and Assembly 0.7.1**. These are audited source versions, not a newly verified registry publication. Orchestrator's accepted profile pins **0.5.0**, while ReviewRouter's memory feature declares **0.7.0**. Current upstream capabilities do not silently upgrade either consumer or replace their local qualification. [Core manifest][gm-core], [Assembly manifest][gm-assembly], [Orchestrator profile][orchestrator-pin], [ReviewRouter manifest][rr-pin]

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
