# PR 4 pre-merge review follow-through

Observation date: **2026-11-06**. This record resolves the six findings from the
[Cubic review of PR 4](https://github.com/agent-teams-ai/engineering-research/pull/4#pullrequestreview-5801553301)
on `4ae904b7bdd93d6e3e8e52ec5a41e563af97017b`. It records source review,
documentation corrections and bounded authoring verification. It is not a
product implementation, library adoption, deployment qualification or GitHub
maintainer approval.

The initial AutoGPT publication was `d3c681d2e333e0a33e1b34ce067f674bb6f997bf`;
the later catalogue publication was the reviewed head above. Historical raw
reviews retain their original bytes, dates, working paths and conclusions.
The maintained aggregate records provide current navigation and dispositions.

## Disposition of the six findings

| Finding | Assessment | Resolution |
| --- | --- | --- |
| [Schema-change statement](https://github.com/agent-teams-ai/engineering-research/pull/4#discussion_r4493493097) | The original 27-document AutoGPT publication did not change the schema. The later 36-document catalogue publication added the `technology` type; its aggregate already records that extension. A combined PR needs a clearer version boundary. | Added the explicit publication/commit scope to [AutoGPT review navigation](autogpt-review.md#version-and-resolution-navigation). The [catalogue record](technology-catalog/review.md) continues to describe the additive metadata-schema and authoring change. No validation requirement was removed. |
| [PY-R1-02 appears unresolved](https://github.com/agent-teams-ai/engineering-research/pull/4#discussion_r4493493136) | The original round-1 finding is historical. The framework-port/BM25 scope correction was already confirmed in round 2 and remains in the dossier. | Added explicit **PY-R1-02 resolved** navigation to the aggregate, linking [round 2](review-round2-python.md#confirmed-fixes) and the [maintained integration options](../../../docs/competitors/autogpt-vs-agent-teams-architecture-and-python-ecosystem.md#three-integration-options-all-still-research). Preserved the raw round-1 review. |
| [M4 coverage and aggregate](https://github.com/agent-teams-ai/engineering-research/pull/4#discussion_r4493493146) | **Accepted.** One supported-auth service capability does not establish the method's broader representative change-cost criterion. | M4 is now `Unknown` for both subjects. Coverage is 4/5 of the unchanged M1–M5 mask, and the aggregate is withdrawn. The other criterion scores and the separate narrow integration judgment remain unchanged. See [the correction](#m4-coverage-correction). |
| [Technology template emits research type](https://github.com/agent-teams-ai/engineering-research/pull/4#discussion_r4493493157) | The claimed emitted-type defect is not supported by the installed authoring implementation. The fenced skeleton's frontmatter is removed; canonical metadata is rendered from the selected intent. | Retained the existing reusable body template. The [bounded authoring evidence](#technology-authoring-template) identifies the pinned implementation and no-write planning probe. No extra template or validation workaround is required. |
| [Review inputs only in scratch](https://github.com/agent-teams-ai/engineering-research/pull/4#discussion_r4493493172) | **Accepted.** The catalogue review promised before/after snapshots and manifests without a durable published route. | Published both existing input directories byte-for-byte under [round 1](technology-catalog/inputs/round1/) and [round 2](technology-catalog/inputs/round2/), with the original manifests. Added the path mapping to the [catalogue aggregate](technology-catalog/review.md#version-and-durable-review-inputs). |
| [Python review working-path prefix](https://github.com/agent-teams-ai/engineering-research/pull/4#discussion_r4493493182) | A navigation ambiguity in a preserved historical note, not a missing maintained dossier. | Added the explicit `repos/engineering-research/` → repository-root mapping and a clickable dossier link in [the aggregate](autogpt-review.md#version-and-resolution-navigation). The raw review's historical path and line numbers remain unchanged. |

## M4 coverage correction

The [evaluation methodology](../../../docs/methodology/evaluation-methodology.md)
calls for two or three stable change exercises when judging M4, including a
harness adapter, a business use case with a persistence change and a public
store adapter. It asks for separate handwritten production/test LOC, touched
boundaries, dependencies and reviewer effort, while explicitly avoiding work
performed merely to fill a board.

The dossier inspected one narrower, supported-auth external-service capability.
That supports its separately scoped integration-ease forecast, but leaves the
broader M4 evidence incomplete. The applicable mask remains M1–M5, with four
scored criteria and one unknown on each side. Unknown is not zero. We withdrew
the mean rather than calculate a new partial-mask average: the omitted
change-cost criterion is material to the architecture's ceremony tradeoff.

The old M4 values and the `6.6/10` versus `8.0/10` mean remain visible only in
historical review evidence. They are superseded by this correction. No other
criterion, upstream source observation, Python conclusion, SDK option estimate
or ordinary-v3/C0–C3 scope changed.

The corrected dossier SHA-256 is
`cecfd98d7c325c9d68ccb099f4c674cea85afd5f9ba35b46d2816982a24fa0d0`.
The preceding published dossier remains accessible at
[the reviewed commit](https://github.com/agent-teams-ai/engineering-research/blob/4ae904b7bdd93d6e3e8e52ec5a41e563af97017b/docs/competitors/autogpt-vs-agent-teams-architecture-and-python-ecosystem.md),
with SHA-256 `ed2f24533c83f942ff3c564353aeaf351912b1c6cc0e5c49523b805700223907`.
The exact full-file input to the original Python round-1 review was not recorded;
the published final dossier is not relabeled as that earlier input.

## Durable catalogue review inputs

The archive contains **12 original document snapshots and two original
manifests, 166,504 bytes in total**. Every record's SHA-256 and byte size was
checked before copying, and every copied file was compared with its original.

| Round | Snapshot records | Original manifest SHA-256 |
| --- | ---: | --- |
| [Round 1](technology-catalog/inputs/round1/manifest.json) | 8 | `9522f7b0ef376c053cfcf91dbc38e0b4121e861ee3d2906390eed80207d07b62` |
| [Round 2](technology-catalog/inputs/round2/manifest.json) | 4 | `d8ebeb2b283a3b7e677024b55822551b2fdaacddd4f4fa4d5aba054359c2dcee` |

Resolve manifest paths from their containing round directory. Frozen Markdown
retains its original metadata and links; the maintained documents remain under
`docs/`. Four round-1 snapshots intentionally differ from the later versions.
All four round-2 snapshots match their published catalogue documents at the
reviewed head. These snapshots are review inputs, not additional inspected
upstream sources; the existing source-inventory counts remain unchanged.

## Technology authoring template

The repository retains Docs Protocol **0.6.2** and its installed
document-authoring **0.3.2** implementation. The planner constructs canonical
frontmatter using `type: intent.type`. The fenced-Markdown adapter removes the
skeleton's frontmatter and first heading before rendering that canonical
frontmatter with the selected title and remaining body. A sample `type: research`
inside the reusable skeleton therefore does not select the emitted document type.

The [retained no-write probe result](technology-authoring-probe.json) records
the exact command, installed source hashes, copied-input list, compiled document
and before/after consumer inventory. The actual installed CLI ran against a
disposable copy: `new --type technology --dry-run --json` returned success, no
diagnostics, `type: technology` in both YAML and parsed metadata, the requested
title, and `docs/technologies/cubic-authoring-probe.md` as the proposed path.
The write state was `preview`, reservation was `none`, and all 83 copied
file/directory entries were unchanged. Apply was not invoked.

The result SHA-256 is
`f336925bd8a9c23412ec90f1371c95c1a404bcbc5dc99f26cad0741159393ded`.
Its `checkoutHead` names the synthetic local materialization base, not the PR
head; the recorded authority/lockfile hashes identify the inspected inputs.
The source hashes are bound to the exact installed versions resolved by the
repository lockfile. Reproduction uses that installed CLI with the recorded
arguments and a disposable copy of the recorded inputs. The temporary runner
is not a new maintained checker or an additional repository command.

An initial probe draft used an invalid slash-delimited identity and was rejected
by the registered grammar. The retained result uses the valid qualified dot
identity. The output verifies planning and generated metadata, not Apply,
transaction recovery, product SDK execution or another generator version.

## Focused verification

- A separate methodology reviewer checked the corrected dossier and confirmed
  M4 unknown on both sides, the unchanged five-criterion mask, 4/5 coverage,
  no replacement aggregate and unchanged remaining criterion/source claims.
- The provenance review checked all 12 snapshot hashes and sizes. Their published
  copies and the two original manifests were compared byte-for-byte. The four
  raw Python/ecosystem review notes also retain their recorded original hashes.
- The authoring concern was checked against the pinned installed planner and
  renderer and the real CLI preview recorded above. No template or configuration
  change was needed.
- The ordinary documentation gate, `pnpm check`, passes with a complete catalogue
  of **36 documents** and valid adoption. The archived snapshots remain outside
  the maintained-document collection.
- Focused follow-through verifies the correction links, dossier hash, archive
  manifests and preserved raw reviews; the remote tree and CI are read back
  after the correction commit is published.

## Scope of follow-through

The changes correct one unsubstantiated score/aggregate and make review history
accessible. The six technology categories, SDK reuse/extraction alternatives,
architecture proposals, source pins, product decisions and dependency versions
retain their previous scope. The raw reviewer notes and original snapshot
manifests are preserved. Post-publication CI and the final merge identity are
verified separately against the live GitHub result.
