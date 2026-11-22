---
id: research.studies.asynchronous-questions-and-independent-progress-2026-11-21
type: study
status: active
owner: research/maintainers
summary: Dated evidence and open design questions for asynchronous replies, scoped waiting and authorized fallback across existing owners.
---

# Asynchronous Questions and Independent Progress 2026-11-21

## Scope and status

This study records the product owner's direction of 2026-11-21: questions should
normally be asynchronous, and waiting for an answer should hold only work that
actually depends on that answer. Respondents may be people, other agents, or
external services. Optional answers may allow an authorized fallback after a
configurable interval; required answers keep the dependent action waiting.

The exact autonomy policy, deadlines, escalation, dependency granularity, and
late-answer behavior remain **open questions**. This is research and a candidate
refinement of existing owners, not an accepted architecture, new runtime feature,
release gate, or authorization to implement production behavior. No production
code is added by this study.

The discussion started from [A Look Inside the Factory][factory]. Its question
handoff is a useful prompt for investigation, not a correctness specification.
The [earlier feedback and rework study](evidence-based-feedback-and-rework-2026-11-09.md)
already covers incoming evidence and controlled rework. Here the narrower problem
is a request whose answer may change a decision or the readiness of some work.

### Evidence scope

Inspection date: 2026-11-21. Product baselines are Orchestrator
`a34587b313e656eeb43d755b4a4f08c40dff2116`, Agent Runtime
`f990acc26e1b8071ae22d0b87a2ddd3672be8e2e`, and Engineering Research
`705bbcb6ce7898f037667c6b7e0589d81b6345bd`.

Codex source and tests were inspected at
`1145028ae47e8119955323d38ce34122d418f951`. External tests were **not executed**.
Other external evidence is official documentation retrieved on the inspection
date, with an explicit edition where published. No live provider, UI, failure,
throughput, or compatibility experiment was performed. Source behavior,
documented behavior, and the architectural inferences below are distinct.

### Existing product authority

[OD-026][od026] already separates conversations, source-owned task comments,
human notifications, agent attention, and runtime input application. It separates
urgency from interruption and transport acknowledgement from semantic outcomes.
[OD-033][od033] already follows incoming facts through context activation and
Run continuation. [OD-027][od027] owns open lifecycle choices; [OD-032][od032]
owns last-mile effect safety. [OD-028][od028] is resolved by ADR-0073 and is not
reopened by this study.

The [Runtime interactive-session feature][runtime-interaction] documents input
admission, independent interaction replies, output pumping, and reconciliation.
Its synthetic evidence does not establish that every provider keeps executing
while elicitation is pending. These are existing foundations, not missing
subsystems to duplicate.

## Evidence and counterevidence

### Codex: a concrete nonblocking question path

The inspected [native handler][codex-handler] emits an agent message marked
`Async`, with questions and the original call identifier, then returns
`{"accepted":true}` without waiting for a human answer. The inspected
[integration test][codex-tests]
`request_user_input_async_emits_item_and_does_not_end_the_turn` checks that the
next model request follows. Its tool description says the answer arrives later
as a new user message. Registration tests also constrain availability by session
and host capabilities; this is not a guarantee for every Codex configuration.

The separate [ordinary handler][codex-blocking] awaits the answer. An
`is_blocking` presentation flag alone therefore does not prove that execution
continues. Likewise, the app-server's [request lifecycle][codex-app-server],
including `autoResolutionMs` and `serverRequest/resolved`, is not a product
authorization policy.

Useful lesson: publishing a question and receiving its answer can be separate
operations. Limits: the inspected async handler and test do not prove durable
question recovery, exactly-once effects, configurable autonomous fallback, or
safe application of late answers. A preselected option is not a submitted answer.

### OpenAI API: a different asynchronous contract

The [async tool-calling guide][openai-async] describes functions declared with
`async: true`, continued independent work, and later results correlated to the
original `call_id`. An application-defined `wait_for_tasks` is used when the
next step needs an outstanding result. The application continues from the latest
response identifier while preserving the original `call_id` for the delayed
result. A display acknowledgement must not prematurely close the function
that is supposed to return the actual answer.

The [personal-agent example][openai-time], published on 2026-11-20, combines
research with asynchronous questions, a fixed answer cutoff, explicit
`answered` or `no_answer` results, and cleanup when work finishes. It is a
demonstration, not qualification of a distributed decision protocol.

Native Codex closes its question-publication tool immediately and receives a
later message. The API example keeps the asynchronous function pending until its
result. Both can support the product direction, but their tool lifecycles must
not become one assumed provider contract. Application-controlled deadlines and
correlation are useful; the example's chosen durations are not product defaults.

### Claude Code: blocking input and durable deferral are different

The [Agent SDK input guide][claude-input] says `canUseTool` pauses execution until
its callback returns, including for `AskUserQuestion`. An asynchronous callback
does not itself make the model loop continue.

The documented [defer hook][claude-defer] can preserve a pending tool call and
finish the turn with `tool_deferred`, then resume the session after external
input. Current restrictions include noninteractive `claude -p` and a single tool
call in the turn. This documents suspension through a persisted session, not
continued reasoning by that suspended worker or independently verified recovery.

[Background subagents][claude-subagents] and [input to a running agent][claude-stream]
provide other concurrency mechanisms. Consequently, "Claude always blocks all
work" is too broad. The separate [Managed Agents product][claude-managed]
documents keeping a session running when other work remains during approval
waiting. That is useful counterevidence, but not evidence for identical Claude
Code behavior.

### Temporal: reuse the selected durable execution foundation

Official [message-passing documentation][temporal-messages] distinguishes Signal,
Query, and Update. `startUpdate` can return a handle after acceptance, before the
handler finishes. Asynchronous handlers can interleave with other workflow work.
The [timer guide][temporal-timers] describes durable waiting without occupying a
worker process for the entire interval. It also warns that a losing
`Promise.race` branch can still run its continuation and mutate state.

[Message-handling guidance][temporal-handling] describes concurrent-handler and
lifecycle constraints. Transport request deduplication is not a substitute for a
domain reply identity; Update ID deduplication does not automatically cover all
successor Workflow Runs.

Our inference: the selected Temporal adapter boundary could carry timer and answer
signals; the semantic owner must still decide which outcome applies.
[ADR-0116][temporal-selection] accepts the engine choice without claiming an
implemented or qualified product integration. Neither Temporal nor
an `await` expression automatically discovers independent product work or grants
authority. This study does not propose another workflow engine.

### LangGraph: persistence is not continued independent progress

[LangGraph JavaScript interrupts][langgraph] save state through a checkpointer
and suspend execution until a resume command. Durable recovery requires a durable
checkpointer. A stable thread identifier connects
the continuation. Resume restarts the interrupted node from its beginning, so
earlier side effects may execute again. Multiple interrupt identifiers support
correlating multiple answers.

Useful lessons are explicit correlation, durable continuation, and deliberate
side-effect boundaries. The existence of several pending interrupts is not proof
that the graph automatically continues every useful independent activity.
Copying "question equals graph interrupt" would not by itself meet the desired
async-first behavior.

### MCP Tasks: an external adapter, not product semantics

The [Tasks extension, edition 2026-07-28][mcp-tasks], defines negotiated task
handles, `input_required`, outstanding `inputRequests`, and replies through
`tasks/update.inputResponses`. Request keys are unique within a task; partial
answers and deduplication of repeated presentation are described.

Its limits matter: update acknowledgement can precede observable application;
`ttlMs` is task lifetime rather than an answer deadline; cancellation is
cooperative; and `completed` may carry a tool result with `isError: true`.
Elicitation retains its trust model. These transport states cannot become Work
success, approval, or proof that Runtime resources have stopped. Consider it as
one future service adapter only after capability and version qualification.

### Camunda: distinguish reminders from resolution

The [Camunda 8.10 timer documentation][camunda-timers] distinguishes a timer that
interrupts an activity from one that starts a notification path while the
activity continues. Timers may fire after their due time under load. An
[event-based gateway][camunda-gateway] chooses one competing event path.

The transferable ideas are separate reminder/escalation/expiry semantics and one
effective resolution. They do not justify adding Camunda beside Temporal or
equating physical event arrival with a trustworthy business deadline policy.

## Implications and limits

### Refine existing owners

The following is an interpretation of the inspected boundaries, not a new
ownership decision or a requirement for one universal question aggregate.

| Concern | Existing owner or boundary |
| --- | --- |
| Ordinary dialog and message/reply relation | Agent Communication |
| Task requirements, dependencies, and readiness consequences | Work Coordination |
| Required approval and its evidence | Approval Management and applicable authority |
| Agent relevance, urgency, and disruption intent | Agent Attention |
| Human presentation, reminders, and notification preferences | Human Notification Management |
| Composition of an admitted answer or assumption into semantic context | Agent Context |
| Authorized activation, switching, and resumption | Run Orchestration |
| Provider interaction, input application, cancellation, and physical custody | Agent Runtime |
| External service observation | Verified adapter input admitted by the relevant semantic owner |

A service, an agent, and a person can all answer a request. They do not thereby
have identical authority. The owner of the decision determines whether the
answer is sufficient. An ordinary dialogue may carry a request or reply;
Communication does not inherit ownership of requirements, approvals, or side
effects merely because they are presented as questions.

### Candidate behavior

1. **Ask for missing required input, or a materially useful optional answer.**
   Existing instructions, evidence, and authority should be used first. Optional
   questions should justify the respondent's attention cost. A required approval
   still needs an authorized decision even when it adds no factual information.
2. **Record the question and its actual dependency.** A stable request identity,
   material basis/version, eligible respondent, expected answer, policy reference,
   and affected continuation are candidate information requirements. Exact
   aggregates, schemas, and wire names remain open.
3. **Continue eligible work.** Only work independent of the unanswered decision,
   within the current goal, permissions, resource ownership, and budget qualifies.
   Independence includes semantic and shared-write dependencies, not merely a
   missing edge in a task graph. Speculative alternative implementations need a
   separate explicit policy; they are not the default meaning of progress.
4. **Resolve through the semantic owner.** Receiving a reply is distinct from
   admitting its validity and applying it. Optional silence may trigger an
   authorized fallback after a configured deadline and a fresh applicability
   check. Required information or authorization keeps its dependent action
   waiting. Silence never creates new authority; explicit refusal is not silence.
5. **Resume against current state.** Answer, deadline, cancellation, and a changed
   material basis can compete. One owner-local transition determines the effective
   outcome for a request revision. Duplicate or losing events receive an explicit
   disposition. Late input may justify a new decision or replan; it cannot silently
   rewrite history or replay an already dispatched external effect.
6. **Park when no eligible work remains.** Preserve durable waiting without a
   polling model loop, invented tasks, or false completion/failure. Full pause
   should have an explained scope. The goal is to minimize avoidable blocking;
   its actual frequency depends on the structure of the task.

One effective request resolution does not establish effect uniqueness. An admitted
answer or fallback must still pass current dispatch authority, fencing, and
unknown-outcome reconciliation under [OD-032][od032]. A timer never bypasses
those checks.

The deadline should be recorded once for the relevant policy revision and
evaluated by the application, not silently reset by retries or inferred from a
model's sense of time. Which clock and admission boundary decide an on-time
answer remains open. A reminder is not expiry; delivery expiry and retention are
not decision deadlines. A rejected or malformed answer is not a valid answer.

### Preserve execution and resource boundaries

An asynchronous UI, a provider that continues its current turn, an eligible Work
continuation, and released physical resources are four different properties.
An adapter that can only suspend its session must report that limit. Other
authorized executions may proceed without claiming that the suspended session
is still reasoning.

The [Run occupancy contract][run-owner] does not release an Agent's exclusive
occupancy because it is awaiting input. Waiting must not assign the same Agent
to another active Run or release an unknown-running process slot. The
[Runtime capacity plan][runtime-capacity] likewise requires real resource
accounting when a parent awaits a child. Preserve the distinctions between a
business obligation to wait, Agent occupancy, and physical execution capacity.

A response may arrive before a waiter is registered or during replacement of a
worker. Persisted correlation and reconciliation must make it discoverable;
transient callbacks cannot be the only source of truth. Reply admission should
reuse existing tenant, source authentication, authorization, inbox, and context
boundaries. Notifications are projections of the owner state, not another
decision ledger.

### Minimum useful scope and architecture principles

The next design exercise should model one optional clarification and one required
decision using existing Work decomposition, owner state, inbox/outbox, and the
selected durable execution foundation. Establish evidence of actual independent
progress and cheap waiting before widening the scope.

Clean Architecture and SOLID mean small consumer-owned ports, cohesive
responsibilities, and provider/transport mapping at adapters. DDD keeps authority
and state transitions with their actual business owner. DRY applies to repeated
correlation, delivery, and reconciliation mechanisms; it does not require advice,
facts, and approvals to share one domain type.

A new question service, generic dependency engine, workflow DSL, global answer
broker, second scheduler, arbitrary quorum system, or speculative branch engine
has no demonstrated need here. Shared technical extraction should follow
concrete repeated use. This study selects no implementation alternative and
makes no production LOC, throughput, reliability, or rollout commitment.

### Open questions for later design

| Question | What a later decision must settle |
| --- | --- |
| Autonomy configuration | Organization, user, workflow, and request precedence; which authority restrictions cannot be relaxed; how an agent may suggest a mode |
| Answer necessity | Who classifies optional versus required; which evidence validates that classification; how the user corrects it |
| Fallback | A preselected action versus a choice within authorized bounds; applicability checks; explanation of the assumption |
| Waiting window | Configurable duration and start point; failed delivery; reminders versus decision deadline; no universal timeout chosen now |
| Deadline race | Trusted receipt versus owner admission order; delayed processing and clock boundaries; treatment of an answer received before cutoff but admitted later |
| Dependency scope | Minimum useful granularity with current Work; how independence is evidenced; when further decomposition is worth its cost |
| Required unanswered requests | Retain, reassign, escalate, cancel, or eventually fail the relevant work; avoid automatic approval |
| Late or conflicting answers | Record only, propose revision, or replan reversible work; authoritative respondent and response precedence |
| Lifecycle changes | Cancellation, material requirement changes, worker replacement, revoked authority, and question cleanup when scope ends |
| User experience and load | Show what waits, what continues, and what happens without a reply; bound open requests, duplicates, reminders, and retention |

Candidate learning measures include avoidable waiting, useful independent
progress, cost of unnecessary questions, fallback rework, stale-answer rejection,
and notification burden. They are not new SLO targets or release gates.

### Discriminating scenarios for a later design review

These are candidate examples, not a new mandatory test framework or a claim of
executed qualification.

| Scenario | Desired distinction to demonstrate |
| --- | --- |
| Optional answer never arrives | Authorized fallback with a visible assumption; no invented permission |
| Required answer is pending | Dependent action waits while eligible independent work proceeds |
| Required approval is refused or absent | No protected action; refusal is distinguishable from silence |
| Reply precedes waiter registration | Durable correlation prevents lost input |
| Reply races deadline or cancellation | One effective owner outcome; competing resolution does not cause duplicate dispatch; target uncertainty still requires reconciliation |
| Duplicate reply after restart | No repeated decision or effect; transport retries do not become new answers |
| Late reply after fallback | Explicit disposition and possible new plan; history is preserved |
| Material requirements or authority change | Old answer cannot unlock an incompatible action |
| Worker fails between receipt and application | Reconciliation retains the pending request and accepted progress |
| Parent awaits another agent or service | No resource deadlock or false occupancy release |
| Agents await each other's decisions | Surface the circular dependency and apply existing Work replanning or escalation; no new global cycle detector is implied |
| Provider cannot continue during elicitation | Honest capability downgrade; other eligible executions remain possible |
| No eligible work remains | Durable waiting without token spin or fabricated progress |
| Many open requests or unavailable respondent | Bounded delivery/reminders and existing fairness budgets remain effective |

### Critical review outcomes

The record went through source/owner challenge, independent draft review, and
review of the revised text on 2026-11-21:

1. **Existing architecture and external claims:** the incoming feedback foundation
   was confirmed, so the proposed gap was narrowed to decision dependency and
   response policy. Native Codex, asynchronous API functions, and persisted Claude
   deferral were kept separate. Temporal engine selection was explicitly separated
   from implemented product integration.
2. **Concurrency, authority, and user attention:** draft review caught an overly
   broad optional-question criterion and preserved already-required approvals.
   It separated one effective request outcome from OD-032 effect safety, added
   explicit refusal versus silence, qualified the LangGraph backing store, and
   distinguished circular decision dependencies from exhausted physical capacity.
3. **Revised scope and ownership:** two independent rereviews found no remaining
   blocking issue in these boundaries. Exact clock/admission ordering, autonomy
   policy, and late-answer behavior remain visibly open. The review found no
   evidence requiring another owner, scheduler, or generic platform.

These are documentation-review results, not executed runtime correctness or
performance evidence.

## Follow-up evidence — 2026-11-22

This follow-up examines where an apparently asynchronous design still loses an
answer, blocks unrelated work, or applies an obsolete decision. The Orchestrator,
Runtime and Codex source pins above remain unchanged. Official documentation was
read again on 2026-11-22. A2A evidence below uses the published `v1.0.1` source at
`3303592588e388e62e0f69f701af531d2f4e3991`; MCP uses edition 2026-07-28, Camunda
uses its 8.10 documentation. The Azure API page labels its abstractions package
1.0.0; the implementation evidence uses the separately pinned .NET worker fix
below, not that label as a tested worker version. Temporal documentation describes its
current API, not a qualification of the Orchestrator's pinned SDK. Source tests
were inspected, not executed. No measured reliability or performance claim follows.

### Acknowledgement, decision and application have different lifetimes

The [OpenAI steering guide][openai-steering] says acceptance queues an update.
Application waits for a suitable boundary and can still require tool results or
approval. Pending steering is local to the connection and is not stored with the
original response. The guide calls for recording inputs and reconciling events
and history before replay after disconnect. This is a documented transport limit,
not evidence that the product lost an already committed domain answer.

The [Temporal Update stages][temporal-update-stages] make another useful
distinction: `ADMITTED` is not yet durable; `ACCEPTED` requires workflow handling;
`COMPLETED` can contain success or failure. A user-facing receipt must say which
boundary has actually committed. Where an existing durable ingress accepts input
before the semantic owner is available, report queued input rather than a valid
decision. This does not require another inbox implementation.

Inspection of the [Runtime session owner][runtime-owner-source] found a more
concrete product constraint. `dispatch` admits only one active technical input;
`reply` is independent of that input queue. Reply validity includes session
generation, interaction kind, expiry and the attributed operation when known. Recording the
operation's result cancels its pending interactions; `restore` advances the
generation and cancels old pending interactions. An uncertain reply outcome requires
reconciliation. These are source findings within the synthetic feature's limits.

Inference: a product clarification needs a durable identity independent of a
provider callback. An answer can remain useful after that callback becomes
invalid. The semantic owner may admit it and arrange a qualified new context/input
application; it must not blindly replay the callback against a replacement
session. A technical interaction timeout is not the product decision deadline.

### Durable waiting does not settle identity or deadline policy

The [Azure external-event API][azure-event-api] documents saving an event even
after the prior wait was cancelled. Names may be reused and each event completes
one waiter. Consequently, reusing a name such as `answer` for successive requests
can expose a later waiter to an earlier response unless the application checks
request identity and revision. The pinned [worker fix and regression test][azure-fix]
confirm this intended buffering behavior and correct a separate historical defect
that dropped such events. The test source was inspected, not run. Do not assume
every earlier worker version implements the current contract correctly.

[Camunda message correlation][camunda-messages] similarly separates message
buffering, correlation and time to live; message-ID deduplication is bounded by
buffer residence. A transport name or buffering interval cannot replace a
business request identity, retained reply receipt or answer cutoff.

Two deadline policies remain credible. **Owner admission before the cutoff**
needs one authority ordering, but processing delays reduce the effective response
window. **Trusted durable receipt before the cutoff** better preserves submission
opportunity, but fallback must account for timely input still awaiting admission.
Client timestamps alone cannot provide that guarantee. Durable timer ordering
does not choose between these policies. The timer should request an owner
transition; it should not perform the fallback effect itself.

### Parallel execution and cheap waiting have structural limits

[AWS Step Functions Parallel][aws-parallel] waits for every branch before its
`Next` state. Its logical branch failure also does not stop already invoked Lambda
functions or activity workers. Thus placing a question in a parallel branch can
still introduce a global join, and logical cancellation is not physical cessation.
Independent work must be reachable without joining the unanswered branch.

[Temporal Continue-As-New][temporal-continue] preserves a logical Workflow ID
while starting a new Run and history. Pending business requests, deadlines and
deduplication evidence need an explicit continuity policy. Asynchronous message
handlers must finish appropriately before rollover. A long human wait inside a
handler can therefore complicate rollover; a short admission handler with durable
owner/process state is the smaller candidate. This is design reasoning, not a
finding that every long handler is invalid.

[Child workflow guidance][temporal-child] and [Parent Close Policy][temporal-parent]
add start confirmation, termination/cancellation/abandonment and parent lifecycle
choices. A child workflow per question is justified by independent lifecycle or
history requirements, not simply by wanting a separate function. Conversely,
[asynchronous Activity completion][temporal-async-activity] can return from the
worker function while the Activity stays pending: it would be inaccurate to say
that every pending Activity occupies a worker thread throughout the wait.

For [AWS callback tasks][aws-callback], the token identifies a waiting attempt;
closed or expired tokens [cannot complete it][aws-task-success]. A [heartbeat][aws-heartbeat] does not
extend the total task timeout. Business request, callback attempt, decision
deadline, liveness timeout and retention are separate concerns. None of these
mechanisms discovers useful independent work or releases Agent occupancy for us.

### Client behavior worth copying, with explicit limits

The pinned Codex [question state][codex-question-state] and
[UI tests][codex-question-ui-tests] preserve per-question identities, suppress
replayed questions, reconcile answers from another client, and preserve other
drafts when one question resolves. [Notification tests][codex-question-notifications]
cover notification deduplication and preferences. These are useful patterns for
attention and draft handling, not evidence of durable product decision custody.

[Turn-end tests][codex-question-turn-end] recover unsent drafts when the turn
finishes, fails or is interrupted. Ordinary follow-up input can clear unanswered
question presentation. Agent Teams should therefore derive required waiting from
the semantic owner rather than from the presence of a UI card. A dismissed card,
an explicit refusal and no response must remain distinguishable where the owner
needs that distinction.

Codex [steering tests][codex-steer-tests] fence input with the expected active
turn. [Pending-input tests][codex-pending-tests] cover steering during tool
execution and compaction without discarding the running cell or its results.
Source inspection does not prove every hosted client behaves identically. An
answer delivered now also cannot retroactively revoke an already dispatched tool.

The current [Claude TypeScript SDK reference][claude-typescript] distinguishes
input queued for the next boundary, a later turn, and immediate interruption.
Some immediate human input can background eligible tools. This qualifies the
earlier blocking-input observation: available input paths differ by API and
configuration. Service or agent content must retain its real origin; transporting
it as a user-role message does not make it human authority.

### Protocol specifications also need critical reading

In the released [A2A v1.0.1 specification][a2a-spec], section 3.1.1 says Send
Message returns immediately, while section 3.2.2 says the same operation blocks
by default unless `return_immediately` is true. The latter excludes streaming and
direct Message responses. The [published protocol definition][a2a-proto] agrees
with the configurable blocking default. This is an internal documentation
inconsistency, not proof of a faulty server. Configure the mode explicitly and
qualify the selected implementation rather than inferring behavior from one
paragraph. A2A's optional message deduplication also cannot establish effect safety.

[MCP multi-round-trip requests][mcp-mrtr] and the Tasks extension are different
contracts. The former retries the original method with a new JSON-RPC ID and
opaque `requestState`; the latter updates a task handle. The specification itself
notes that integrity-protected state, principal binding and expiry do not ensure
single use without server enforcement. Neither path supplies a universal
permission or product decision model. [Elicitation][mcp-elicitation] also separates
accept, decline and dismiss; accepting a URL interaction is not proof the external
operation completed.

### Consequences for the next design

The smallest credible candidate is an owner command that durably registers a
clarification and delivery intent, returns that registration receipt, and admits
a later answer through a separate command. This works only when the declared tool
contract promises registration. It cannot fabricate the answer of a native
blocking question, finish an asynchronous result early, or grant permission.

Keep request resolution distinct from dependency satisfaction: refusal can close
a request while the protected action remains ineligible. Prefer a predeclared
authorized fallback in an initial experiment. Asking an LLM to choose at timeout
adds separate work, budget and another answer-versus-selection race.

The product-specific alternatives and bounded mechanism proposal belong in the
[Orchestrator research change][orchestrator-proposal], with OD-026 still open.
Existing Work/Run target documents are not evidence that the required execution
and dependency foundations have already been implemented. Research does not admit
that broader implementation or select a new service, workflow engine or ADR.

## Sources

Product links below are pinned to the inspected revisions. External documentation
links are mutable and were read on 2026-11-21; MCP edition and Codex commit are
explicit. Their behavior must be requalified against versions selected for any
future implementation.

Sources introduced in the follow-up were read on 2026-11-22. Published protocol
editions and source commits are named above; mutable API documentation remains
dated evidence rather than a guarantee for every deployed version.

[factory]: https://thebuildingmachine.com/p/a-look-inside-the-factory
[od026]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/open-decisions/OD-026-communication-notification-and-attention.md
[od027]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/open-decisions/OD-027-configurable-work-lifecycle.md
[od028]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/open-decisions/OD-028-agent-context-lifecycle.md
[od032]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/open-decisions/OD-032-last-mile-side-effect-safety.md
[od033]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/open-decisions/OD-033-ooda-convergence-and-context-activation.md
[run-owner]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/domain/contexts/run-orchestration/README.md
[runtime-interaction]: https://github.com/agent-teams-ai/agent-runtime/blob/f990acc26e1b8071ae22d0b87a2ddd3672be8e2e/packages/contexts/agent-execution/src/features/interactive-agent-session/README.md
[runtime-capacity]: https://github.com/agent-teams-ai/agent-runtime/blob/f990acc26e1b8071ae22d0b87a2ddd3672be8e2e/docs/architecture/capacity-admission-delivery-plan.md
[codex-handler]: https://github.com/openai/codex/blob/1145028ae47e8119955323d38ce34122d418f951/codex-rs/core/src/tools/handlers/request_user_input_async.rs
[codex-tests]: https://github.com/openai/codex/blob/1145028ae47e8119955323d38ce34122d418f951/codex-rs/core/tests/suite/request_user_input_async.rs
[codex-blocking]: https://github.com/openai/codex/blob/1145028ae47e8119955323d38ce34122d418f951/codex-rs/core/src/tools/handlers/request_user_input.rs
[codex-app-server]: https://learn.chatgpt.com/docs/app-server
[openai-async]: https://developers.openai.com/api/docs/guides/async-tool-calling
[openai-time]: https://developers.openai.com/blog/time-awareness-and-async-input-for-personal-agents
[claude-input]: https://code.claude.com/docs/en/agent-sdk/user-input
[claude-defer]: https://code.claude.com/docs/en/hooks#defer-a-tool-call-for-later
[claude-subagents]: https://code.claude.com/docs/en/sub-agents
[claude-stream]: https://code.claude.com/docs/en/agent-sdk/streaming-vs-single-mode
[claude-managed]: https://platform.claude.com/docs/en/managed-agents/permission-policies
[temporal-messages]: https://docs.temporal.io/develop/typescript/workflows/message-passing
[temporal-selection]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0116-native-temporal-for-fully-local-durable-workflows.md
[temporal-timers]: https://docs.temporal.io/develop/typescript/workflows/timers
[temporal-handling]: https://docs.temporal.io/handling-messages
[langgraph]: https://docs.langchain.com/oss/javascript/langgraph/interrupts
[mcp-tasks]: https://tasks.extensions.modelcontextprotocol.io/specification/2026-07-28/tasks
[camunda-timers]: https://docs.camunda.io/docs/components/modeler/bpmn/timer-events/
[camunda-gateway]: https://docs.camunda.io/docs/components/modeler/bpmn/event-based-gateways/
[openai-steering]: https://developers.openai.com/api/docs/guides/steering
[temporal-update-stages]: https://typescript.temporal.io/api/namespaces/client#workflowupdatestage
[runtime-owner-source]: https://github.com/agent-teams-ai/agent-runtime/blob/f990acc26e1b8071ae22d0b87a2ddd3672be8e2e/packages/contexts/agent-execution/src/features/interactive-agent-session/application/use-cases/interactive-session-owner.ts
[azure-event-api]: https://learn.microsoft.com/en-us/dotnet/api/microsoft.durabletask.taskorchestrationcontext.waitforexternalevent?view=durabletask-dotnet-1.x
[azure-fix]: https://github.com/microsoft/durabletask-dotnet/commit/56fb4ddf57f64a85fbfe0688b1e5d52b204c05a4
[camunda-messages]: https://docs.camunda.io/docs/components/concepts/messages/
[aws-parallel]: https://docs.aws.amazon.com/step-functions/latest/dg/state-parallel.html
[temporal-continue]: https://docs.temporal.io/develop/typescript/workflows/continue-as-new
[temporal-child]: https://docs.temporal.io/child-workflows
[temporal-parent]: https://docs.temporal.io/parent-close-policy
[temporal-async-activity]: https://docs.temporal.io/develop/typescript/activities/asynchronous-activity
[aws-callback]: https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html
[aws-heartbeat]: https://docs.aws.amazon.com/step-functions/latest/apireference/API_SendTaskHeartbeat.html
[aws-task-success]: https://docs.aws.amazon.com/step-functions/latest/apireference/API_SendTaskSuccess.html
[codex-question-state]: https://github.com/openai/codex/blob/1145028ae47e8119955323d38ce34122d418f951/codex-rs/tui/src/bottom_pane/async_questions/state.rs
[codex-question-ui-tests]: https://github.com/openai/codex/blob/1145028ae47e8119955323d38ce34122d418f951/codex-rs/tui/src/chatwidget/tests/questions_tests.rs
[codex-question-notifications]: https://github.com/openai/codex/blob/1145028ae47e8119955323d38ce34122d418f951/codex-rs/tui/src/chatwidget/tests/question_notifications_tests.rs
[codex-question-turn-end]: https://github.com/openai/codex/blob/1145028ae47e8119955323d38ce34122d418f951/codex-rs/tui/src/chatwidget/tests/question_turn_end_tests.rs
[codex-steer-tests]: https://github.com/openai/codex/blob/1145028ae47e8119955323d38ce34122d418f951/codex-rs/app-server/tests/suite/v2/turn_steer.rs
[codex-pending-tests]: https://github.com/openai/codex/blob/1145028ae47e8119955323d38ce34122d418f951/codex-rs/core/tests/suite/pending_input.rs
[claude-typescript]: https://code.claude.com/docs/en/agent-sdk/typescript
[a2a-spec]: https://github.com/a2aproject/A2A/blob/3303592588e388e62e0f69f701af531d2f4e3991/docs/specification.md
[a2a-proto]: https://github.com/a2aproject/A2A/blob/3303592588e388e62e0f69f701af531d2f4e3991/specification/a2a.proto
[mcp-mrtr]: https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr
[mcp-elicitation]: https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation
[orchestrator-proposal]: https://github.com/agent-teams-ai/agent-teams-orchestrator/pull/104
