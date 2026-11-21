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

## Sources

Product links below are pinned to the inspected revisions. External documentation
links are mutable and were read on 2026-11-21; MCP edition and Codex commit are
explicit. Their behavior must be requalified against versions selected for any
future implementation.

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
