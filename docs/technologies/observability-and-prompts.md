---
id: research.technologies.observability
type: technology
status: active
owner: research/maintainers
summary: Telemetry and prompt tooling, separated from control state, billing authority and stored sensitive content.
---

# Observability and Prompts

Reviewed **2026-11-06**. Prompt management, diagnostics and evaluation are useful capabilities with distinct ownership. Neither a trace nor a prompt-service response grants execution, authorizes a tenant or settles a commercial outcome. Fit/confidence scores describe the stated research scenario; they are not benchmark results, reliability guarantees or adoption decisions.

## Langfuse

**Implementation and clients.** An observability, prompt-management and evaluation service whose web/worker applications use TypeScript/Node, with Python and JS/TS SDKs and OpenTelemetry integration. It is a service/backend, not simply a Python tracing library; its deployment also includes several storage services. [Application manifests][lf-web] [Worker manifest][lf-worker] [SDK overview][lf-sdk] [Deployment architecture][lf-host]

**Evidence/current use.** AutoGPT locks Python SDK **3.14.1**, but its inspected Langfuse client serves managed prompts and explicitly sets `tracing_enabled=False`. Its source assigns conversation tracing elsewhere. Do not attribute the vendor's general tracing functionality to that client. [Pinned prompt client][ag-langfuse] [Lock][ag-lock]

**Scenario: an identified prompt/evaluation or LLM operations need; fit 7/10, confidence 8/10.** Good fit is a narrowly specified versioned-prompt or evaluation workflow, or diagnostics compatible with the existing telemetry boundary. Poor fit is introducing the whole backend because AutoGPT declares its SDK, or treating trace persistence as the operation/billing ledger.

**Deployment and version constraints.** Current documentation describes **Langfuse server v4, Python SDK v5 and JS/TS SDK v6**, with explicit compatibility requirements. These are not the AutoGPT SDK version or a proposed upgrade. Self-hosting includes PostgreSQL, Redis/Valkey, ClickHouse and object storage alongside the applications. Docker Compose is documented for local/testing use; operating a production deployment requires additional responsibility. Cloud and self-host are supported, but neither is a zero-cost mandatory desktop dependency. [Compatibility][lf-sdk] [Self-hosting][lf-host]

**Concrete risks.** Prompt/output capture can expose sensitive content. Retention, access control, cardinality, batching, shutdown flush, SDK/server migrations and optional model-backed evaluation affect operations. Managed prompts need explicit version/fallback behavior; prompt publishing should not silently become a new source of product policy or grants. Vendor claims about minimal latency are not our measurements.

**Bounded next research:** one pinned prompt retrieval and one redacted trace/evaluation flow. Verify unavailable-service behavior, bounded buffers, flush/termination and content deletion/access. Expand to a larger backend only if the narrower scenario demonstrates value.

## OpenTelemetry

**Implementation and clients.** Cross-language telemetry APIs, transports and semantic conventions, with language-specific SDKs and a Go collector. The collector receives/processes/exports telemetry; it is not itself the durable backend or an agent scheduler. This makes it a useful interface to evaluate independently of a particular LLM operations vendor. [Language SDKs][otel-languages] [Collector scope][otel-collector] [Go workspace][otel-go]

**Scenario: correlate operations across existing TS, Python/native and external-process boundaries; fit 9/10, confidence 9/10.** Good fit is tracing a bounded operation and diagnosing queueing, worker work and cancellation. Local collectors/backends can avoid a cloud dependency. Poor fit includes using trace IDs/baggage as authentication or relying on sampled telemetry as the sole record of grant consumption, charge settlement or effect completion.

**Current maturity.** The official matrix distinguishes signals: JS/Python traces and metrics are stable while logs remain in development; Rust traces are beta while metrics/logs are stable. SDK status does not stabilize every convention. GenAI conventions have moved to a dedicated repository, and the examined client-inference specification is marked **Development**. Treat its fields as a versioned telemetry mapping, not an immutable business contract. [Signal status][otel-languages] [GenAI conventions][otel-genai]

**Concrete risks.** Automatic instrumentation can capture more content than intended. Exporter buffering, dropped/sampled data, propagation across asynchronous/process boundaries and changing semantic conventions need explicit limits. A network boundary still requires authenticated product context independently of telemetry metadata.

**Bounded next research:** trace one existing operation through TS → optional worker → completion/cancellation, with a pinned attribute subset and redacted content. Exercise collector/exporter unavailability and shutdown. Verify correlation and bounded overhead; do not introduce a new control-plane authority or assume adoption of every auto-instrumentation package.

## Structured output and evidence testing — 2026-11-23

The runtime problem separates into schema authoring, provider-compatible serialization, validation, semantic assessment, and offline testing. The latter two are not solved by a JSON validator.

**Already present:** [Account Gateway's pinned package](https://github.com/agent-teams-ai/account-gateway/blob/539418d5935a9e336d480b128a1cdb93c1daa6e1/packages/account-gateway/package.json) depends on Zod 4.6.7. Its [LLM entry](https://github.com/agent-teams-ai/account-gateway/blob/539418d5935a9e336d480b128a1cdb93c1daa6e1/packages/account-gateway/src/llm/index.ts) exports `prepareStrictJsonSchema`; the [implementation](https://github.com/agent-teams-ai/account-gateway/blob/539418d5935a9e336d480b128a1cdb93c1daa6e1/packages/account-gateway/src/features/llm/adapters/strict-json-schema.ts) converts a bounded schema to provider form and decodes/validates against the original, with restrictions on references, depth and keywords. [LlmTask.decode](https://github.com/agent-teams-ai/account-gateway/blob/539418d5935a9e336d480b128a1cdb93c1daa6e1/packages/account-gateway/src/features/llm/domain/task.ts) permits caller validation; it is not a semantic verifier. [ReviewRouter's inspected manifest](https://github.com/777genius/review-router/blob/9debb3eecdf2cd0b39d5efde1e837d36e724f319/package.json) already lists Ajv 8.20.0 and Zod 3.x. The [D3 package](https://github.com/agent-teams-ai/task-verification/blob/9367ce4e7dee40d076f654397fd535a09e2d6c3a/package.json) has no such runtime dependency. Do not assume dependency availability across packages or that Zod 3 and 4 APIs are interchangeable.

| Mechanism | Reuse recommendation | Limit / switching condition |
| --- | --- | --- |
| [Zod 4 JSON Schema](https://zod.dev/json-schema) | Preferred TS-first schema authoring when a retained consumer actually needs it; infer types, export a schema, locally parse without silently repairing evidence. | Some types/refinements are not representable in JSON Schema; qualify the exported schema against the actual Gateway/provider subset. Do not migrate all Zod 3 code or add a dependency to finish D3. |
| [Ajv strict mode](https://ajv.js.org/strict-mode) | Existing JSON Schema validation in ReviewRouter; good reference/differential oracle for the Gateway's custom bounded structural validator in offline tests. | JSON Schema validity is not provider compatibility, semantic support or authorization. Keep coercion, defaults and removal of extra data off for evidence; no blanket replacement of the Gateway's admission/decoding adapter. |
| [Standard Schema / Standard JSON Schema](https://standardschema.dev/json-schema) | Useful interoperability specification for a future shared schema-accepting port if multiple actual consumers use different libraries. | Standard JSON Schema is separate from runtime validation; do not build a universal schema adapter or mandate it across repositories before a concrete need. |
| [TypeBox](https://github.com/sinclairzx81/typebox) / [Effect Schema](https://effect.website/docs/v4/schema/introduction) | Plausible JSON-Schema-first Fastify option / native choice for an already Effect-based application. | No new schema stack alongside existing Zod/Ajv for this pilot. Qualify exact versions and strict schema dialect before sharing. |
| [Vercel AI SDK structured data](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data) / [BAML typed functions](https://docs.boundaryml.com/guide/introduction/baml_client) / [TypeChat](https://microsoft.github.io/TypeChat/docs/typescript/basic-usage/) | Useful references for typed outputs, error reporting and developer ergonomics; possible candidates for other greenfield tasks where transport is not already owned. | Current Gateway already owns inference, usage, receipts, cancellation and bounded attempts. Do not add a second client/runtime/DSL or automatic repair/retries merely to obtain JSON. A parser repair is not a factual correction. |
| [fast-check model-based testing](https://fast-check.dev/docs/advanced/model-based-testing/) | Strong development-only candidate for stateful invariants, including terminal re-entry, duplicate events, idempotency, budget reservations and stale result admission. Generates and shrinks command sequences using an explicitly defined model. | It does not discover the correct requirement or supply an independent oracle automatically. Start with focused deterministic counterexamples now; adopt for repeated stateful coverage where its model is simpler and independent. |
| [Promptfoo assertions](https://www.promptfoo.dev/docs/configuration/expected-outputs/) | Consider later for comparing stable profiles on held-out cases, with deterministic assertions and a custom provider bound to existing Gateway controls. | Do not migrate M2's existing scorer/ledger or use another model as automatic ground truth. A wrong expected result remains wrong in any evaluation framework. No additional paid campaign for this checkpoint. |

Provider-native [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) support only a subset of JSON Schema. Native strict output, local parsing, complete ID/reference inventory, actual evidence applicability and semantic support are separate boundaries. OpenRouter routing/provider capability still needs its own qualification. Do not assume a successful schema conversion proves a provider accepts every keyword or that a successful provider response proves completion.

**Practical recommendation:** finish D3 with no dependency changes. If the next product prototype earns its place, use the existing Gateway strict output and M2 contracts; select one schema authoring/validation library appropriate to the actual consumer, apply a small explicit domain reducer only where semantics are frozen, and reuse the existing runner. The potentially reusable pattern for other Agent Teams structured results is a typed, versioned wire contract + strict local decoding + owner-specific evidence/authorization policy. It is not a proposal for another universal runtime, a new shared library before consumers exist, or framework migration. Prefer an isolated offline proof for any proposed Gateway validator replacement; compare accepted/rejected schemas and values, nullable normalization, reference/depth limits, diagnostics, resource bounds and no provider calls on rejection before changing it. No library benchmark, installation or compatibility run was performed in this documentation survey.

Source checkpoint: [Task Verification working handoff](../studies/task-verification-handoff-2026-11-22.md#d3-r2-decision-checkpoint-and-structured-output-reuse--2026-11-23). The complete original library review is also retained at [the merged 23 November snapshot](https://github.com/agent-teams-ai/engineering-research/blob/9862b19be1863e219b363cce3183f5236ea608fd/docs/studies/task-verification-handoff-2026-11-22.md#library-reuse-decision-documentationsource-review-2026-11-23). These findings apply to structured-result workflows, not to all testing or runtime schema-library choices.

[lf-sdk]: https://langfuse.com/docs/observability/sdk/overview
[lf-host]: https://langfuse.com/self-hosting
[lf-web]: https://github.com/langfuse/langfuse/blob/main/web/package.json
[lf-worker]: https://github.com/langfuse/langfuse/blob/main/worker/package.json
[ag-langfuse]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/util/langfuse_prompts.py
[ag-lock]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/poetry.lock
[otel-languages]: https://opentelemetry.io/docs/languages/
[otel-collector]: https://opentelemetry.io/docs/collector/
[otel-go]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/go.mod
[otel-genai]: https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/client-inference.md
