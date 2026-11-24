# Round 1 — AutoGPT source / fairness review

Reviewer scope: current AutoGPT execution, recovery, testing and reliability claims; hypothetical implemented Agent Teams plans retained as requested. Reviewed dossier: `docs/competitors/autogpt-vs-agent-teams-architecture-and-python-ecosystem.md` at the draft present on 2026-11-06. No product files or dossier edits by this reviewer.

## Verdict

**Sound synthesis; two citation-scope fixes required before publication.** No blocking score disagreement. DRY **7** is defensible given schema/catalog/visibility reuse, despite my initial conservative 6 for execution core. This broader product score retains the concrete ACK divergence. Scoped stale-owner **5** and overall recovery **7** are compatible: the first targets a specific weak guarantee, the second includes substantial real mechanisms.

The important counterevidence is preserved: current platform vs Classic, real orgs/teams, local deployment, active-turn PG admission, TurnPublishUnconfirmed, actual multi-pod cancellation, TDD policy. No false measured-capacity or full-E2E claims found. Isolated probe limitations are stated correctly.

## Required source fixes

1. **AG-06 fresh-process / infrastructure claim lacks the correct test source.** `[A-BILLING-TEST]` currently points to `executor/manager_redispatch_billing_test.py`. I reopened it: it uses a test Wallet, MagicMock DB and real event loops; it does not establish the fresh-process/real-database example. Keep this source for redispatch billing, and add:
   - `autogpt_platform/backend/backend/executor/billing_e2e/agent_run_billing_test.py` (module docstring 1–13; fresh executor/DatabaseManager 57–78; wallet/run assertions 94–140).
   - Prefer also `.github/workflows/platform-backend-ci.yml` for real PG/3-shard Redis/RabbitMQ setup and matrix; do not make backend AGENTS alone carry execution-evidence claims.
   - Add corresponding hashes to source manifest and cite these in AG-06/table.

2. **AG-05 API-key and billing tests extend beyond the cited tenancy test.** `[A-TENANCY-TESTS]` is `data/tenancy_test.py`: predicate tests plus mocked membership filters. It does not directly substantiate the sentence about API-key/billing/membership tests. Either narrow to what it proves, or add actual sources already inspected by root, e.g. `backend/api/utils/api_key_auth_test.py`, `backend/api/external/v2/tenancy_test.py`, `backend/data/org_credit_test.py`, `backend/api/features/orgs/routes_test.py`. Describe their test style accurately; these are not all real-database hostile-tenant E2E tests.

## Precision improvements

3. **AG-03:** replace “gets a fresh channel when acknowledging” with “fetches the current channel, which may differ from the delivery channel after reconnect.” `SyncRabbitMQ.get_channel()` at `data/rabbitmq.py:296–301` returns the existing current channel when ready; it does not create a fresh channel on every ACK. The reconnect risk and comparison with Copilot remain unchanged.

4. **AG-02:** add “if the lease expires or is released in that interval” to the owner-switch explanation. The probe schedules that legal interleaving; it does not claim a new owner can acquire an unexpired held key. Current isolated-vs-E2E qualification is otherwise excellent.

5. **Narrow M2 justification (optional):** method M2 specifically asks about external-consumer usable libraries/implementable ports. App-process separation and Blocks demonstrate modularity but not by themselves public library embeddability. If retaining M2=7, add concrete `autogpt_libs` standalone package/contract evidence or state the limit explicitly. This is not an argument for increasing our lead; it tightens which form of reuse supports the score.

## Claims checked and accepted

- Lease probe truly compiles unchanged upstream class AST and reproduces GET/EXPIRE race with fake Redis; source SHA256 and commit match the audited source. No upstream code is vendored by the original harness.
- `manager.py:1762` / `processor.py:655` ignore renewal results; status/output sinks examined have no matching execution epoch. Full executor overlap is correctly left as an inference.
- Graph ACK reconnect risk is correctly qualified as source-inspected, not live broker reproduction.
- DB state + broker publish gap is correctly scoped; report also credits Copilot's explicit unknown-publication type and PG active-slot admission.
- Test-first policy vs actual TDD chronology are separated.
- 11 RPS / 3 graph starts per minute are scoped to configured/maintainer-reported preview load, not capacity ceiling.
- Global capacity/memory remains unknown; no average over overlapping technical criteria.

Known A-APPLIANCE URL typo and evidence placeholders excluded from review, as root is already correcting/populating them.
