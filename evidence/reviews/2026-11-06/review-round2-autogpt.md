# Round 2 — bounded AutoGPT confirmation

Date: 2026-11-06. Reviewer scope: disposition of Round 1 AutoGPT architecture/source findings, new M2 evidence, and retained isolated experiment. This was a bounded confirmation, not a new broad audit.

Reviewed dossier SHA256: `ed2f24533c83f942ff3c564353aeaf351912b1c6cc0e5c49523b805700223907`.

## Disposition

**No remaining blocking factual or scope issue within this review scope. All material Round 1 findings are resolved.** No dossier or product files were edited by this reviewer.

| Finding | Resolution checked | Disposition |
|---|---|---|
| Fresh-process billing evidence | AG-06 now separates mocked redispatch from the fresh executor/DatabaseManager test and mentions fake model/controlled queue seams. `[A-BILLING-E2E]` points to the correct `executor/billing_e2e/agent_run_billing_test.py`; reopened source matches the claim. | Resolved |
| Tenancy/authz citation breadth | AG-05 now claims mounted-application role-specific billing authorization and separately describes predicate/mocked membership tests. `[A-CREDITS-AUTHZ]` points to `api/features/v1_credits_authz_test.py`; reopened module imports the real app, instantiates TestClient and enumerates role cases with data-layer stubs. No full hostile-tenant proof is claimed. | Resolved |
| ACK channel wording | AG-03 correctly states that the graph manager obtains the current channel, which may differ after reconnect; no claim of fresh channel on every ACK remains. Live-broker reproduction remains explicitly unperformed. | Resolved |
| Lock owner-switch schedule | AG-02 now explicitly requires lease expiry/release between GET and EXPIRE before reacquisition. Probe result is limited to the renewal algorithm; executor overlap remains inference. | Resolved |
| M2 external reuse evidence | AG-01 cites standalone package metadata, service-free CI, backend-independent APIKeySmith module and its actual backend consumer. It explicitly withholds an embeddable engine claim and whole-package backend independence. | Resolved |
| DRY score | DRY 7 remains reasonable for the broader product with central schema/visibility reuse and concrete ACK divergence. | Accepted |

M4 now specifies a single supported-auth service capability and explicitly leaves actual equivalent-change effort/LOC unmeasured. Open extension/workflow decisions and ordinary v3 versus C0–C3 remain scoped. No new comparative claim requiring a broader review was introduced in the examined corrections.

## Retained experiment

Read `evidence/experiments/autogpt-2026-11-06/README.md`, harness and result. The retained harness/result are byte-identical (`cmp`) to the originally executed artifacts. Therefore no rerun was needed to resolve this review's risk.

- Harness SHA256: `6b39c6ab187528edce6cb666c6abba2706fcc8b96952c06e1c335dcf58f5bf9d`.
- Result SHA256: `abb693d9f7e41780b4540e1d4d6ef9fbcf03e5fbe18ee3bf507c307051aa5ecb`.
- Upstream commit and source SHA256 agree with the audit: `9cb76f9026d388c9bf2e098af2beae1cc864f055`; `97a1aa7796ab198191177a4cf4695eb399deb5f2961c5d359a21aa9a569a165e`.
- README faithfully states unchanged upstream class AST, deterministic fake Redis, three controlled paths, and unqualified acquisition/release/exception branches.
- No claim of real Redis, deployed executor, duplicate effect, network partition or capacity measurement appears.

## Limits

This approval is for research accuracy/scope within the assigned source audit. It is not an assertion that upstream CI passes, the systems meet a capacity target, every cross-product plan is complete, all tenant paths are safe, or the experiment is a full product E2E. Repository catalog/navigation validation and final publication remain the root task's responsibility.
