# Central corpus final review A

**Disposition: PASS on documentation usability, provenance and migration integrity; correct one material target-scoring overreach before presenting the numeric matrix as reconciled.** No new framework, benchmark campaign, migration machinery or production gate is recommended.

This bounded independent pass inspected `research-work/engineering-research`: README and collection indexes, migration/source guides and data manifests, the five imported Runtime notices/headings, all three Orchestrator extracts, the plugin index, comparison matrix/supplement, historical score record, own-product dossier, maintenance workflow and decision cards. It used retained pinned product source for the remaining contract question. It did not modify the corpus, rerun upstream tests, execute product/documentation gates, or independently verify live remote publication. Root's separate catalog/link/hash checks remain their own evidence.

## Corrections

### CA1 — Medium: whole-product C3 still assumes a fairness decision that C0 has not made

**Location:** `docs/competitors/technical-comparison.md:36`, Agent Teams target C3; coverage statements near the main table and supplement line 147.

The target cell gives **9 [7–9], confidence 6/10** for whole-product tenant fairness/quotas, citing ownership, the capacity plan and Stage K. The selected plan establishes obligations and a bounded-priority/FIFO candidate, but explicitly says to specify the actual tenant rotation, resource-fit selection and burst counters together before production. It also leaves the finite grant-opportunity bound and mixed-resource anti-bypass choice to C0/C2. Those are material choices for this criterion, not simply missing implementation of one fully selected algorithm. Stage K establishes a restricted fixed-tenant model, not the unspecified complete production policy.

**Source:** Runtime pin `4bdc93a43b58469f60ca10c0dca512824650c8ac`, `docs/architecture/capacity-admission-delivery-plan.md`, “Fair scheduling” and C0 deliverable; `docs/spikes/stage-k-capacity-fairness-results.md`, finite tenant/eligibility assumptions and remaining dynamic-tenant gates. The methodology itself requires unresolved choices to remain branches/unknowns.

**Minimum correction:** mark the whole-product AT C3 **unknown**, with the selected candidate and Stage K evidence retained as a useful partial basis. Update AT coverage to **20/30 = 66.7%** (choose a consistent displayed rounding rule), leaving Paperclip **21/30 = 70%**. Update both repeated coverage statements. Alternatively, retain a separately scoped numeric assessment of the fixed-tenant Stage K policy candidate, but do not substitute that scope for whole-product C3. This needs no new experiment. The M1–M5 board and named technical-potential vector do not include C3 and need no score change.

This is a narrow objection to selecting an unresolved policy through a score. It does not require measured capacity before conditional architecture assessment, revoke Stage K's evidence, or reject the chosen owner-local queue direction.

### CA2 — Low: qualify which scheduler must not be duplicated

**Location:** `docs/competitors/agent-teams.md`, “What should not be added”: “another scheduler in Orchestrator.”

Read literally, this is broader than the intended avoidance of duplicate Runtime capacity authority. Orchestrator owns business scheduling and durable coordination; accepted ADR-0114 explicitly retains ADR-0103's scoped initial in-process scheduler over durable feature-process state.

**Exact correction:** replace `another scheduler in Orchestrator` with `a duplicate Runtime capacity scheduler in Orchestrator`. This preserves the useful prohibition without casting doubt on accepted business scheduling. Source: Orchestrator pin `981dd836ca3d35b764561bdc11dc2e0544d83416`, ADR-0114's canonical ADR-0103 preservation and ownership paragraphs.

### CA3 — Low: watchlist status should describe the evidence actually present

**Location:** `docs/competitors/competitor-watchlist.md`, Agent Teams initial-status cell: “Current cells from retained source/evidence.”

The assembled matrix contains target cells; the dossier separately describes existing evidence without a scored current-implementation board. The present sentence can send readers looking for a missing current board.

**Exact correction:** use `Current evidence is described in the dossier; the matrix scores selected target behavior and retains open choices. No target-to-production promotion.` No additional board is required by this correction.

## Numerical and scope checks that passed

- The inventory contains **73 records: 72 Markdown and one YAML**. Its operative transfer states are five prepared imports, three prepared extracts and 65 indexed source records. The human guide's more detailed disposition counts—5, 3, 27, 23 and 15—sum to 73 and distinguish owner-local, historical and draft-source discovery rather than pretending all 73 were moved.
- The current main matrix really contains **30 criteria**, with **21 numeric cells on each side before CA1**. Identical coverage does not imply identical missingness, and the text says so. The row/coverage arithmetic is not the defect; C3's source-to-score inference is.
- The named Clean/SOLID/DDD/DRY/modularity supplement is expressly **non-additive**. It does not increase the denominator, sum overlapping lenses or invent a new overall score. DRY remains unknown as realized duplication; designed reuse is clearly identified as existing M2 evidence.
- The historical five-group weighted arithmetic is correct: Paperclip **7.625 → 7.6**, Agent Teams **8.250 → 8.3** under stated decimal half-up rounding. Its document, matrix and supplement consistently prevent those numbers from becoming the new rubric's total or a measured performance result.
- The comparison's whole-product and conditional-architecture bases are explicitly different. Prospective ratings assume selected plans correctly implemented; unresolved IAM, aggregates, accounting and observed fleet capacity remain visible. No popularity-based score or complete TOP ranking is claimed.

## Provenance, migration and usability checks that passed

The README provides direct task-oriented entry points to the dossiers, matrix, decisions, lessons, methods and migration status. Collection indexes give direct routes to every important maintained study. This is usable as a small documentation repository without a portal or custom search/scoring service.

All five maintained Runtime imports retain **every original heading text**, the original research dates, immutable source identity, original stable ID, raw-original route and explicit notice that import is not a November upstream re-audit. Product-specific passages are labeled historical applicability, not new central policy. Raw originals and transformed maintained copies are separately identified in the provenance manifest. Root is independently verifying bytes and resolved anchors; this pass does not replace that verification.

The identity, composition/scale and persistence extracts preserve their historical baseline and distinguish source evidence from owner recommendations. Identity does not silently select an IAM provider. Composition does not turn N=1,000 fixtures into active agents or revoke a smaller qualified scope. Persistence does not reopen SQLite after PostgreSQL adoption, and older package/support facts are expressly dated rather than current dependency advice.

The plugin index correctly attributes **Extension Foundation PR55**, names its exact head as **unmerged at inspection**, indexes 15 draft records plus three historical main records, and leaves original experiments/receipts with their source owner. It does not confuse that corpus with Engineering Foundation main.

README, documentation map, migration ledger and publication manifest consistently say the central remote/draft PR **has not been created**. Product PRs are identified separately. Prepared imports are not described as completed reciprocal-link migration. The preservation of original local bodies is explained, and publication steps are future steps rather than fabricated commits.

## Delivery completeness to disclose

The requested future handwritten implementation LOC estimates remain **unestimated** in the decision cards. `0 production TS now` accurately describes this documentation change but is not an estimate for implementing D1/D2/D3. The cards correctly disclose low sizing confidence and the missing seam inventory; the final handoff should preserve that limitation rather than claim every estimation request is complete. A finished global TOP ranking and central remote publication are likewise explicitly unfinished. These are honest delivery boundaries, not reasons to invent numbers or add infrastructure.

After CA1's source-sensitive score correction and the two small wording repairs, this corpus is suitable as the prepared, partially scored research deliverable it claims to be. Product adoption, exact capacity qualification and subsequent publication retain their existing owners.
