# AutoGPT comparison review record

Assessment: `research.competitors.autogpt`. Observation date: 2026-11-06.
This record concerns the source audit and research publication. It is not a
GitHub approval, product acceptance or deployed-system qualification.

## Version and resolution navigation

The original review and validation sections below describe the AutoGPT-only
publication at `d3c681d2e333e0a33e1b34ce067f674bb6f997bf`, with 27 catalogued
documents. Its unchanged-schema statement applies to that publication. The
later [technology catalogue record](technology-catalog/review.md) explicitly
records the additive `technology` metadata-schema and authoring registration,
bringing the catalogue to 36 documents; it does not weaken existing checks.

The [pre-merge follow-up](pr4-closure.md) supersedes the earlier numerical M4
and aggregate claims. The raw round-1 and round-2 reviews below preserve the
reviewers' original observations and conclusions. In particular, **PY-R1-02 is
resolved** by the scope correction confirmed in
[round 2](review-round2-python.md); its round-1 request is retained as history.
The raw Python note's workspace prefix `repos/engineering-research/` maps to
the repository root. Its reviewed document is the
[AutoGPT dossier](../../../docs/competitors/autogpt-vs-agent-teams-architecture-and-python-ecosystem.md).
The later M4 correction does not change that resolved Python finding.

## Source audit responsibilities

Three parallel agents independently inspected bounded source areas:

1. AutoGPT execution, recovery, dependencies and engineering tests.
2. Agent Runtime v3, Orchestrator and Platform target ownership and scope.
3. Python behavior, actual AI dependencies and modern extension surfaces.

All reviewers used the same four pinned repository identities recorded in the
dossier. The root author independently read the core ownership, lock, ACK,
admission, tenancy and deployment evidence and checked cited source paths/hashes.
Parallel summaries of a source do not count as independent runtime evidence.

## Review rounds

Three first-round reviews and three bounded second-round confirmations are
complete. Each review is retained in its original bytes; the second round checks
the material corrections rather than claiming another runtime experiment.

| Scope | Round 1 | Corrections accepted | Round 2 |
| --- | --- | --- | --- |
| AutoGPT architecture and evidence | [Review](review-round1-autogpt.md) | Separate mocked billing redispatch from the fresh-process E2E; narrow tenancy-test breadth; clarify current-channel ACK and expiry/release renewal schedule; substantiate M2 with APIKeySmith reuse. | [No remaining blocker](review-round2-autogpt.md) |
| Agent Teams implemented-plan scope | [Review](review-round1-agent-teams.md) | Fix M4 to one supported-auth external-service capability; add direct OD-035/OD-043 sources. Ordinary v3, C0–C3, open contracts and TDD limits preserved. | [No blocking findings](review-round2-agent-teams.md) |
| Python, actual dependencies and integration options | [Review](review-round1-python.md) | Correct Langfuse to managed prompts with tracing disabled; add exact-use citations; scope difficult TS porting to a substantial Graphiti-like framework and keep it research-only. | [No remaining blocker](review-round2-python.md) |

The final reviewed dossier SHA-256 is
`ed2f24533c83f942ff3c564353aeaf351912b1c6cc0e5c49523b805700223907`.
No score adjustment was required after the bounded reviews. These are agent
reviews of source-based research, not independent production observations or
GitHub maintainer approvals.

## Executed evidence

- The isolated renewal probe executed unchanged upstream class AST with a
  deterministic fake Redis and controls. Its retained source and result are
  in [the experiment](../../experiments/autogpt-2026-11-06/README.md).
- Research baseline: all 66 files materialized from GitHub were matched to their
  original Git blob hashes before any edits.
- Authoring: pinned Docs Protocol 0.6.2 under Node 24.22.1 and pnpm 11.25.0;
  frozen install succeeded; `docs:info` and `docs:find` succeeded; creation used
  reviewed Plan digest
  `sha256:602045ef34be27caa0bd6d8e0fe6de530405ac85249118ed70cf18615098928a`.
- The final source manifest contains 74 pinned repository files and 17 official
  documentation URLs. All 74 local file bytes and Git blob hashes matched their
  pinned Git objects; every source reference in the dossier has a definition.
  URL inspection and local hash verification are different evidence.
- Focused checks verified the changed local navigation links and retained probe
  controls. The narrow equal-weight M1–M5 arithmetic is 33/5 = 6.6 and 40/5 = 8.0.
- `pnpm check` passed: complete catalog of 27 documents and valid adoption.
  No dependency, authority profile, schema or checker was changed to obtain the
  result.

## Authoring transaction recovery

The initial create operation left a published transaction and an orphan
temporary. Editing the report before full finalization also changed the original
Plan postimage. `doctor` identified recovery state; the first official `recover`
refused automatic handling with `orphan-temporary`. This was authoring workflow
state, not a dossier or AutoGPT runtime defect.

The author preserved independent byte copies and identity/digest observations of
the full reviewed report, temporary and transaction evidence. The orphan was
quarantined; the exact 484-byte persisted Plan postimage was restored on the
identity already bound by the journal. The same installed recovery command then
completed through its ordinary finalizer, with `outcome: success`,
`transactionState: recovered`, `writeState: committed`, and receipt digest
`sha256:6dded99f5f250ff59a45a1530056df48224687ab1011e1184c8991b44be0c6a4`.

After successful recovery, the complete reviewed report was restored as ordinary
document editing and matched the reviewed SHA-256 above. `doctor` returned idle;
the active canonical journal was absent. No journal, operation barrier, tool
version or validation rule was manually removed or weakened. Temporary local
recovery artifacts are excluded from the publication.

## Publication boundary

The publication adds the reviewed dossier, source inventory, isolated experiment,
review records and navigation to a dedicated branch based on research main
`86bbdd819a3ecc85730f3cf2f45a5842b86294f1`. The draft PR is the reviewable publication;
no main-branch merge or product change is part of this research task. Remote
publication readback is reported in the delivery message after the commit exists.

No AutoGPT application suite, paid model run, common fleet benchmark or production
deployment was executed.
