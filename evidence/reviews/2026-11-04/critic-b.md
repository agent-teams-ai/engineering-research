# Independent adversarial review B

Reviewed 2026-11-03. Bounded independent pass; no consultation with the other critic, no author-file edits, git writes, remote comments, new research agents, or product changes. This is intermediate review material, not product authority.

Read all three requested drafts, all five option cards, and the adjacent assessment schema. Cross-checked the relevant assertions against Runtime `4bdc93a43b58469f60ca10c0dca512824650c8ac` capacity delivery plan and foundation plan, and Orchestrator `981dd836ca3d35b764561bdc11dc2e0544d83416` Consumption Governance dossier. No competitor tests were run. The source-backed Paperclip findings are well bounded; the principal remaining risks are decision framing and the authority conveyed by scores and migration.

## Severity-ranked findings and minimal fixes

### High — D1 does not currently offer three comparable product choices

**Location:** `paperclip-deep-audit.md:127–135`.

Option 1 specifies two customer-facing promises, option 2 specifies one promise, and option 3 selects the implementation of strict allowance allocation. Escrow can implement the strict branch of option 1; it is not a third answer to “which budget promise should the product offer?” The current table rewards a broad combined solution while comparing it with a narrow feature and a more distributed implementation. Calling two policy branches “small” is also unsupported before OD-024 resolves aggregate, period, hierarchy and unknown-outcome semantics.

**Primary-source check:** Consumption Governance is proposed, blocked by OD-024, and already explicitly owns soft-limit and hard-quota policy, reservation/capture/release, exact balance evidence, and late reconciliation. Its open questions include reservation estimates, concurrent scopes, uncertain provider outcomes, period resets and bounded reservation collections. This research should refine that decision, not imply it newly discovered or settled those responsibilities.

**Minimal fix:** Make the three options **soft thresholds only**, **reservation-governed allowance only**, and **both explicit policy modes**. Put escrow in a short later-scaling note under the reservation mechanism. Require each option to name the unit/basis of the promise. A reservation of estimated dollars constrains admitted estimates; it does not guarantee actual external spend unless the producer can enforce the bound. Rate reliability against each option's stated promise, rather than lowering soft-mode reliability because it intentionally lacks a strict-cap feature. Retain OD-024 as the owner.

### High — D3 mixes independent design axes and can prescribe an unnecessary gap state machine

**Location:** `paperclip-deep-audit.md:147–155`.

Incremental cursor advancement, strict source contiguity, asynchronous projections, protected control resources and service placement are not mutually exclusive. A strictly contiguous canonical writer can maintain an incremental cursor and asynchronously project views. A dedicated ingestion service can use either cursor algorithm. The table makes the richer gap-aware path appear to be the default even though the report correctly says unknown ports must not be invented and existing planned contracts must be inspected first.

**Primary-source check:** Runtime's foundation plan distinguishes source occurrence, canonical runtime cursor, reader cursor and reconstructed replay; source contracts explicitly include no-replay, stable occurrence replay and reconstructed history. It requires explicit gaps for relevant stable-replay paths, but does not grant every source a gapped append contract. The accepted architecture's scope is narrower than a universal event ingestion framework.

**Minimal fix:** State the shared invariant first: durable ACK, one canonical authority, bounded producer/reader resources, protected control progress, and honest replay/gap outcomes. Then compare three bounded receipt contracts: **strict contiguous append for an ordered source**, **bounded out-of-order acceptance with durable gap tracking**, and **source-specific adapters feeding one contiguous canonical sequence**. Select only after identifying actual source contracts. Treat a separate service/stream tier as a deployment follow-up justified by measured pressure, not the third receipt-contract alternative. Do not silently change a current strict contract to accept gaps.

### High — A cross-product total can still obscure incomparable coverage and deployment promises

**Location:** `evaluation-methodology.md`, “Scenarios and weighting,” “Advisory board versus qualification board,” Choice A.

The draft already rejects unknown=zero, distinguishes targets from implementation, requires a pairwise common mask and suppresses rank when mandatory unknowns could reverse it. Those are good safeguards. However, the proposed 80%/60% thresholds do not make two totals comparable: pairwise masks can differ by competitor, and a high average over reviewed criteria can coexist with unknown fleet or isolation behavior. A table of those different pairwise means would look like a league table while lacking transitive comparability. Equal-dimension weights are a transparent convention, not an objective measure of this user's priorities.

The four profile masks are described but not actually fixed. A local-profile report must not quietly penalize absent managed SaaS; a whole-product V1 report must not mark required SaaS, self-hosted or Fully Local behavior N/A. The separate target board also currently describes a different construct—specificity/coherence/expected fitness—while using the same quality anchors as observed behavior. Readers could compare the numerals directly despite the prose warning.

**Minimal fix:** Publish vectors first. Declare applicability and mandatory criteria for each actual first comparison before scoring. Require **one shared mask across every row of a displayed ranked board**; pairwise comparisons with different masks stay separately labeled and cannot generate a global order. If an advisory total is useful, show its full denominator, unknown weight and plausible outcome range; the current coverage thresholds remain an experiment, not a new release gate. Label target cells “prospective fitness assuming the documented design is correctly implemented,” with implementation qualification displayed separately. This honors the user's comparison assumption without pretending target plans are executed evidence. Never blend target and current rows into one ordinal leaderboard.

### Medium — D2's recommendation is largely an existing choice, while its alternatives can coexist

**Location:** `paperclip-deep-audit.md:137–145`.

Owner-local PostgreSQL is already the initial execution shape in C0–C3. Pool sharding and service extraction are different axes: a single deployment can use multiple pools, and an extracted service can use the same PostgreSQL state. The recommendation is reasonable; presenting all three as a fresh unresolved authority decision risks reopening accepted direction and adding architecture before evidence.

**Primary-source check:** The capacity plan says “serialize the minimum scheduler state per pool or prove an equivalent fenced algorithm,” explicitly covers concurrent schedulers, and permits extraction only for measured load, independent scaling or a distinct failure boundary. “One fenced scheduler authority per resource pool” should mean one logical invariant owner, not an unreviewed mandate for one permanently elected process or globally serialized dispatcher.

**Minimal fix:** Mark D2 as **retain existing initial choice; review two independent scaling triggers**. State that logical authority does not prescribe the number of scheduler processes. Record a per-pool contention trigger for partitioning and a CPU/failure/operational trigger for process separation. Do not add any port, package or service before C0's existing scope reconciliation. Keep total envelopes separate from incremental extraction estimates.

### Medium — Ratings and LOC suggest more resolution than the inventory supports

**Location:** all D1–D3 cards; methodology A/B cards.

The audit uses reliability/complexity out of five and verbal confidence; the methodology uses all three out of ten. Neither distinguishes confidence in the invariant from confidence in the chosen product scope or estimate. The requested common rating format is therefore not satisfied consistently. Decimal-thousand sub-buckets such as 0.15–0.3k read as an implementation inventory even though no seam inventory exists. Excluding SQL migrations, control/native integration, tests and operations is clearly disclosed, but those excluded items are exactly where several distributed alternatives incur their largest correctness burden. TS LOC is therefore a poor measure of their relative delivery cost.

**Minimal fix:** Use reliability, confidence and complexity out of 10 consistently and label them ordinal planning judgments. Give comparable promises equal conditional reliability where justified; complexity is not evidence that the distributed design is intrinsically less correct. Mark all current LOC envelopes **low-confidence, unvalidated hypotheses**, or replace them with “0 production LOC in this documentation change; implementation delta pending owner seam inventory.” Keep source-measured LOC distinct. Do not call production totals “incremental” when they include already-planned mechanisms. Give the owner separate test/qualification/operations work categories without inventing quantities.

### Medium — Methodology B3 is a weak strawman; A3 complexity is overstated for its manual version

**Location:** `evaluation-methodology.md`, Choices A and B.

B3 combines autonomous research, autonomous scoring and autonomous publishing into one obviously expensive choice, even though the realistic middle alternative is agent-assisted draft collection with human scoring and publication. That makes the top-three decision look constructed to prove B1. A3 similarly prices an outranking algorithm, although its own text says manual dominance notes should come first. A small manual comparison is often simpler than a weighted scoring system, not necessarily more complex.

**Minimal fix:** Keep B1 as the default. Replace B3 with **agent-assisted, citation-preserving draft updates in ordinary reviewed PRs**; retain “fully autonomous publication” as an explicitly out-of-scope later possibility. Give A3 a zero-tooling manual form and optional automation only after demonstrated demand. B2 should begin with existing release notifications/CI if available before estimating bespoke connector code. All three B options retain human decision authority.

### Medium — Research recommendations must not silently invalidate qualified product work

**Location:** audit “Decision for Agent Teams” blocks and follow-through table; methodology “first action batch”; inventory governance text.

The opening scope and final governance paragraphs correctly reserve product authority. Nevertheless, imperative phrases such as “add qualification,” “every new queue must,” and “before production” can become de facto requirements when copied into product PRs. The current explicit exemption only mentions pure S1/S2. A later research publication must not retroactively withdraw any previously scoped qualification, including other slices, without contradictory evidence and the owning process.

**Minimal fix:** In each product PR, label each delta as **already required**, **proposed future acceptance**, or **new evidence of a defect**. For proposed acceptance, name the activation/profile boundary and existing owner record. Add: “This research does not revoke existing scoped qualification or introduce a new gate by itself; only the owning accepted change can alter future acceptance.” Reconcile overlaps before adding requirements. Preserve accepted ADR bodies and immutable qualification artifacts.

### Medium — Anchor preservation cannot depend on proving which external anchors are used

**Location:** `docs-protocol-inventory.md`, Runtime migration notes and migration mechanics.

The draft explicitly warns against replacing a report with a bare URL, but the alternative “preserving every externally used heading anchor” is not safely verifiable: local link checks cannot discover arbitrary external inbound URLs, and duplicate heading slugs can change when content is shortened or reordered. Keeping source SHA/hash proves historical identity; it does not repair a current-branch anchor.

**Minimal fix:** For the first migration, retain each original owner-local body and stable ID, with a unique migration notice linking to the maintained central document. If reducing a body later, preserve **all** original heading IDs and explicit anchors in original duplicate-slug order, not only discovered inbound links. Do not silently change `related` IDs or pinned historical links. Check cross-repository Markdown links/anchors and source manifest hashes, and explicitly distinguish completed migration, extraction, historical indexing and intentionally retained owner content.

### Low — The deliverable is an initial assessment and a watchlist, not a completed TOP competitor ranking

The methodology is admirably explicit that most product candidates are unscored. Preserve that wording in the final response and repository README. The 52-system catalog is breadth of discovery; the current source review provides depth on Paperclip and targeted component paths. A completed objective comparison requires actual comparable cells and exact edition/profile admission. Do not let a title or dashboard turn the proposed universe into completed research.

## Disposition of all five cards

| Card | Verdict | Smallest useful disposition |
| --- | --- | --- |
| D1 budgets | Product semantics genuinely remain open in OD-024; current options confound semantics and placement | Rewrite the three promises; escrow becomes a later mechanism. |
| D2 capacity | Initial architecture is already recorded; no new product decision is required today | Preserve C0–C3 and record independent measurement triggers. |
| D3 event path | Conditional technical choice cannot be made without actual source/replay contracts | Keep shared invariants; compare receipt contracts; defer service placement. |
| A summarization | Choose vectors first; equal weights are advisory and do not establish objectivity | Common board mask, explicit unknowns, prospective/current separation. |
| B freshness | B1 is a reasonable initial workflow | Compare three realistic human-reviewed workflows; avoid a new engine. |

## Unresolved choices with credible top-three options

These are proposed editorial replacements, not accepted product choices. Reliability means ability to honor the option's stated contract assuming correct implementation; confidence means strength of this recommendation from the inspected evidence; complexity includes ongoing conceptual/operational burden. All are ordinal judgments out of 10, not probabilities. **Scoped LOC for every row below: 0 production LOC for this documentation-only task. Future manually written production TS delta is unknown until the relevant owner inventory; no new numerical estimate is justified by this review.** Existing low-confidence envelopes may be retained as explicitly unvalidated hypotheses, not evidence.

### D1: which promise is enabled at initial product activation?

| Option | Reliability / confidence / complexity | Decision criterion |
| --- | --- | --- |
| Both explicit reservation allowance and soft observed-spend modes | 8 / 8 / 6 | Best fit to the currently proposed Consumption Governance scope; requires user-facing unit, pricing/estimate and overshoot semantics. Recommended if both are V1 requirements. |
| Soft observed-spend thresholds only | 8 / 7 / 3 | Smallest activation if customers accept lag/unknown spend and no hard external cap; do not silently narrow an already accepted V1 requirement. |
| Reservation-governed allowance only | 8 / 7 / 5 | Fits a product that requires enforced admission allowance first; must explain estimate reconciliation and unsupported/unbounded provider work. |

**Still unresolved:** the allowance basis, required V1 modes, per-profile defaults, acceptable overshoot and treatment of unknown provider usage. The current proposed dossier does not answer them. Keep them in OD-024; this documentation task need not block on a new user approval.

### D3: what does each real producer promise?

| Option | Reliability / confidence / complexity | Decision criterion |
| --- | --- | --- |
| Strict contiguous append for an ordered replayable producer | 8 / 8 / 3 | Prefer when the actual source guarantees stable ordered occurrences and retry semantics. |
| Bounded out-of-order receipt with durable gap state | 8 / 7 / 6 | Use only where the actual source can validly deliver gaps/out-of-order events and recovery requires retaining them. Bound gap count, bytes and age. |
| Source-specific adapters into one canonical sequence | 8 / 8 / 5 | Prefer for heterogeneous existing sources with different no-replay/reconstructed/stable-replay capabilities; avoid a fake universal source cursor. |

**Still unresolved:** which accepted producer/feed contracts actually need gapped receipt, and where the existing owner already implements cursor work. This is an owner source inventory, not a reason to invent a new port. All options retain protected control and bounded asynchronous views where required; service extraction remains an independent deployment decision.

### A: how to summarize the first comparison?

| Option | Reliability / confidence / complexity | Decision criterion |
| --- | --- | --- |
| Vectors and same-mask equal-weight advisory summary | 8 / 9 / 2 | Recommended initial format; suppress global rank until common scope/evidence supports it. |
| Prespecified scenario weights with sensitivity | 8 / 8 / 4 | Use if user priorities materially change an actual choice; equal weights are a reference convention, not the uniquely neutral truth. |
| Manual pairwise dominance with no total | 9 / 8 / 2 | Strong alternative when unknowns and non-compensable requirements make totals misleading. Incomparability is a useful result. |

### B: how to refresh evidence?

| Option | Reliability / confidence / complexity | Decision criterion |
| --- | --- | --- |
| Git-reviewed records plus dated manual refresh queue | 8 / 9 / 2 | Recommended initial scope; use existing document/data checks. |
| Existing release/diff notifications plus human claim review | 8 / 8 / 4 | Add when actual missed updates or maintenance work justifies scheduling. |
| Agent-assisted citation-preserving draft PRs plus human review | 7 / 7 / 4 | Useful if drafting is the bottleneck; demonstrate correction rate before expansion. No autonomous score or publication authority. |

No production implementation, new service, new governance engine, background schedule or additional permission request is required to make these documentation corrections.
