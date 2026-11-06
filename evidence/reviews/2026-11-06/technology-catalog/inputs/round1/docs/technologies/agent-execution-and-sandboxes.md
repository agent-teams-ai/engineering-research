---
id: research.technologies.execution
type: technology
status: active
owner: research/maintainers
summary: Agent SDK and sandbox candidates, with supported interfaces, custody, authority and local deployment limits.
---

# Agent Execution and Sandboxes

Reviewed **2026-11-06**. These technologies can supply bounded execution capabilities; they do not acquire product scheduling, commercial authority or permission to perform an effect. Fit/confidence scores are scenario-specific engineering judgments, not reliability measurements or adoption decisions. Current upstream capabilities are distinct from the pinned AutoGPT integrations described below.

## Claude Agent SDK

**Implementation and clients.** Python and TS SDKs run the Claude Code binary with its agent loop, tools, sessions, hooks and permissions. This differs from an ordinary model API client, where the application supplies its own loop. The binary's internal implementation was not audited here. AutoGPT pins Python SDK **0.2.161** and imports private transport symbols in its adapter. [Official SDK overview][claude-sdk] [Pinned private import][ag-private] [Dependency lock][ag-lock]

**Scenario: one bounded external-agent provider; fit 8/10, confidence 9/10.** Good fit is embedding an already capable coding agent through supported interfaces. Poor fit is letting its session/loop become another product orchestrator, or assuming a local process means offline model inference. Current official documentation also distinguishes supported API authentication from unapproved use of consumer login/rate limits in third-party products. [SDK deployment/authentication context][claude-sdk]

**Concrete risks.** SDK/binary compatibility, private API coupling, retained session state and late output need lifecycle ownership. Hooks and SDK permissions must map to existing grants and path/network boundaries. A session identifier is correlation, not product identity. File checkpoints cannot establish compensation for an external action.

**Bounded next research:** pin a public SDK/binary pair and exercise one resumed session, denied tool, canceled command and process loss. Verify how results map to completion, failure or uncertainty, and that stale sessions cannot regain authority. Estimate only the chosen adapter once these semantics are fixed.

## E2B

**Implementation and clients.** Sandbox runtime/service with TS/Python clients for commands, files, code interpretation and desktop control. The upstream runtime workspace includes Go API, orchestrator and `envd` modules; the Python SDK is not the execution engine. AutoGPT has a sandbox adapter and locks **E2B 2.49.1** and **code interpreter 2.10.0**. [SDK capabilities][e2b-docs] [Runtime workspace][e2b-go] [Pinned adapter][ag-e2b] [AutoGPT lock][ag-lock]

**Scenario: an optional remote or controlled-Linux execution provider; fit 7/10, confidence 8/10.** Good fit is a workload needing an isolated disposable execution environment. Poor fit is assuming this alone implements the mandatory native-local baseline across all desktop OSes.

**Deployment evidence.** Current official **Embed** documentation provides a self-operated complete stack on a Linux node through Docker Compose, Kubernetes or cloud deployment paths. E2B is therefore not hosted-only. Self-operated Embed, managed BYOC and hosted E2B are different operational choices; none establishes Docker-free native Windows/macOS parity. [Embed deployment][e2b-embed]

**Concrete risks.** Template trust, sandbox network access, credential injection, pause/resume retention and confirmed termination require explicit integration semantics. A successful sandbox creation does not authorize every command inside it. A timeout does not prove that work or an external effect stopped.

**Bounded next research:** choose one deployment profile and test create → run → cancel/reconnect → destroy, including lost responses, retained files and late output. Verify cleanup evidence and secret lifetime before measuring overhead. Do not extrapolate capacity from a vendor startup-time claim or introduce a second global grant ledger.

## Stagehand

**Implementation and clients.** Browser automation runtime/extension with TS, Python and currently documented Go SDKs. Current **v4** runs the runtime alongside the page, uses CDP and combines deterministic browser methods with model-assisted `act`, `observe` and `extract`; its extension build is TypeScript. AutoGPT locks Python **3.23.0**, so current v4 documentation is not proof of that adapter's behavior. [v4 introduction][stage-intro] [Extension manifest][stage-extension] [Pinned AutoGPT integration][ag-stage] [Lock][ag-lock]

**Scenario: a bounded browser capability; fit 7/10, confidence 8/10.** Good fit combines deterministic navigation with limited inference for changing interfaces or extraction. Poor fit uses inference for a stable API or treats self-healing actions as transaction recovery.

**Deployment evidence.** Local Chrome and Browserbase sessions are supported. Cloud caching/Model Gateway and local operation differ. The v3-to-v4 migration changes APIs and caching; current browser documentation separates closing the Stagehand connection from terminating the browser. [Browser environments/lifecycle][stage-browser] [Migration][stage-migration]

**Concrete risks.** Authenticated profiles, downloads, model-selected actions, ambiguous form submission and leftover browsers need custody. Observing a possible action is not approval to execute it. Local Chrome does not remove model/network requirements or prove equivalent behavior on every platform.

**Bounded next research:** use one disposable fixture site to compare deterministic and model-assisted actions, extraction, authenticated state and a side-effecting form under cancellation/timeouts. Pin the intended major version and verify both connection and browser cleanup before estimating integration work.

## Common decision boundary

Reuse the existing runtime/provider and effect-admission boundary. Preserve bounded concurrency, deadlines, cancellation, operation identity, uncertainty and cleanup. These are candidate implementations of a capability, not newly selected owners. A small TS client can still depend on a substantial runtime, browser, filesystem and service stack; its LOC must not be presented as the complete execution-platform cost.

[claude-sdk]: https://code.claude.com/docs/en/agent-sdk/overview
[ag-private]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/sdk/cli_prelaunch.py
[ag-lock]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/poetry.lock
[e2b-docs]: https://docs.e2b.dev/
[ag-e2b]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/copilot/tools/e2b_sandbox.py
[e2b-go]: https://github.com/e2b-dev/runtime/blob/main/go.work
[e2b-embed]: https://github.com/e2b-dev/runtime/blob/main/embed/README.md
[stage-intro]: https://docs.stagehand.dev/v4/first-steps/introduction
[stage-extension]: https://github.com/browserbase/stagehand/blob/main/packages/extension/package.json
[ag-stage]: https://github.com/Significant-Gravitas/AutoGPT/blob/9cb76f9026d388c9bf2e098af2beae1cc864f055/autogpt_platform/backend/backend/blocks/stagehand/blocks.py
[stage-browser]: https://docs.stagehand.dev/v4/configuration/browser
[stage-migration]: https://docs.stagehand.dev/v4/migrations/v3
