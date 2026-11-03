---
id: research.competitors.watchlist
type: research
status: active
owner: research/maintainers
summary: Relevant product, framework and infrastructure cohorts with honest audit status.
---

# Competitor Watchlist

This is a **research priority set**, not a scored league table. Existing research already supplies targeted lessons for most entries. Primary pages below were checked on 2026-11-03; rolling pages establish watchlist relevance only and must be pinned/refreshed during a real review. No new competitor runtime was installed or benchmarked for this draft.

| Candidate | Cohort / priority | Why it belongs and what must remain separate | Initial status |
| --- | --- | --- | --- |
| Paperclip | Direct product / first | Teams, orgs, tasks, agent orchestration and runtime; substantial existing local source review. Preserve native/runner strengths and assess the actual reviewed edition. | The initial partial 30-criterion source assessment is available; no common-rubric total is assigned. SaaS and fleet qualification unknown. |
| Agent Teams | Own product / first | Always include our current implementation and target separately, under the same evidence rules. | Current implementation evidence is described in the own-product dossier; selected target cells and open decisions are explicit. No target-to-production promotion. |
| LangGraph **plus a named LangSmith Deployment edition** | Adjacent product / first expansion | Existing runtime research covers LangGraph persistence/replay; official Deployment docs describe runtime deployment/control-plane choices. Library and commercial platform require separate subject rows. | Watchlist; targeted component evidence is reusable, full product audit not completed. |
| CrewAI **plus a named AMP/Factory edition** | Adjacent product / first expansion | Existing research covers Crew/Flow async boundaries; official repository distinguishes the framework and commercial management/deployment plane. | Watchlist; no measured fleet or tenant-isolation verdict. |
| OpenHands **product edition**, with SDK companion row | Coding-agent product / first expansion | Existing research covers SDK architecture, workspace/server split and historical repairs; current official docs distinguish local/hosted/enterprise operation. | Watchlist plus targeted SDK evidence; not a complete organization-platform audit. |
| Dify | Adjacent application platform / next | Official repository describes collaborative agentic workflows and cloud/VPC/self-hosted placement. A new primary-source candidate, not one of the previous 52 evaluated systems. | Newly admitted watchlist; unscored. |
| Microsoft Agent Framework | Framework reference / next | Existing pinned research and current official overview cover agents, sessions, workflows and integrations. | Component board only; never substitute framework claims for an entire multi-tenant SaaS. |

The product expansion set is bounded to five external systems including Paperclip; the own product and framework reference do not inflate that number. Retain other already researched components as secondary watchlist entries without duplicating the whole 52-system index: Mastra, PydanticAI, Vercel AI SDK, Google ADK, OpenAI Agents SDK, Agno/AgentOS and Letta. Temporal, Restate, Dapr, NATS and Ray remain infrastructure references. Existing AutoGen evidence is historical/archived according to the retained research; check current official status before any renewed inclusion rather than treating it as an active top competitor by habit.

Primary relevance sources:

- Paperclip: https://github.com/paperclipai/paperclip ; retained source checkout.
- LangGraph: https://docs.langchain.com/oss/python/langgraph/overview ; LangSmith Deployment: https://docs.langchain.com/langsmith/deployment .
- CrewAI framework and AMP separation: https://github.com/crewAIInc/crewAI .
- OpenHands: https://github.com/OpenHands/OpenHands/blob/main/README.md ; SDK: https://github.com/OpenHands/software-agent-sdk/blob/main/README.md ; edition scope: https://www.openhands.dev/pricing .
- Dify: https://github.com/langgenius/dify .
- Microsoft: https://learn.microsoft.com/en-us/agent-framework/overview/agent-framework-overview ; https://github.com/microsoft/agent-framework .
- Temporal reference scope: https://docs.temporal.io/production-deployment .


## Current board status

Only Paperclip and the Agent Teams selected target have the initial [30-criterion assessment](technical-comparison.md). The other rows are research priorities, not scored competitors. There is no completed global TOP ranking. A board becomes ordinal only when its declared common scope and mask are satisfied; a smaller architectural comparison remains explicitly smaller.
