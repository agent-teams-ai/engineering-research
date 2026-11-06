# AutoGPT lock-renewal source experiment

Observed on 2026-11-06. This is retained research evidence, not a product test,
release gate or maintained replacement for upstream synchronization code.

## Exact source

- Repository: `Significant-Gravitas/AutoGPT`
- Commit: `9cb76f9026d388c9bf2e098af2beae1cc864f055`
- File: `autogpt_platform/backend/backend/executor/cluster_lock.py`
- Git blob: `53e1912a96b2a625d5786f1e97a115fdde25a23b`
- SHA-256: `97a1aa7796ab198191177a4cf4695eb399deb5f2961c5d359a21aa9a569a165e`
- Interpreter used for the retained result: Python 3.12.14.

The original [harness](probe_cluster_lock.py) reads that checkout and compiles
the upstream `ClusterLock` class AST unchanged. It supplies only the globals
used by the tested paths and a deterministic fake Redis. It does not import
AutoGPT's dependencies, start a service or access the network. The upstream
implementation is not copied into this repository.

## Reproduce

Use a separate AutoGPT checkout at the exact commit above, then run from this
research repository:

```bash
python3 evidence/experiments/autogpt-2026-11-06/probe_cluster_lock.py /path/to/AutoGPT
```

The output records the actual checkout SHA and file hashes. A different revision
is a new experiment; it does not replace the retained observation. Inspect the
printed source identity before interpreting its result.

## Observation and limits

The [retained result](cluster-lock-probe-result.json) covers three controlled
interleavings:

| Case | Return value | Stored owner and TTL |
| --- | --- | --- |
| Owner remains A | `true` | A, renewed to 300 |
| Owner is already B before GET | `false` | B, remains 11 |
| GET observes A, ownership becomes B before EXPIRE | `true` | B, renewed to 300 |

This establishes that the inspected check-then-expire algorithm can report
successful renewal after ownership changes between its two Redis operations.
The fake models a legal inter-command schedule; it does not prove how frequently
that schedule occurs in a deployment. The method's non-exception paths are the
tested scope. The class's acquisition, release and exception branches are not
qualified by this experiment.

No real Redis, network partition, complete executor, duplicate external effect
or fleet capacity was tested. Continued execution by a stale owner is a separate
source-level inference from the examined callers; a full reproduction requires
the owning worker/effect environment. See finding AG-02 in the
[dossier](../../../docs/competitors/autogpt-vs-agent-teams-architecture-and-python-ecosystem.md).
