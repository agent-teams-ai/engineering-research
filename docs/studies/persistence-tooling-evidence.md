---
id: research.studies.persistence-tooling
type: study
status: active
owner: research/maintainers
summary: Reusable persistence-tooling comparisons preserving dated evidence and current storage owners.
---

# Persistence tooling: reusable mechanisms and explicit database semantics

## Source provenance and historical scope

This extract preserves comparative evidence from the [Orchestrator review dated 2026-07-26][original],
at Orchestrator commit `981dd836ca3d35b764561bdc11dc2e0544d83416`.
Its original question compared a local **`node:sqlite`** adapter with hosted **`node-postgres`**.
That is historical product context, not the current deployment selection.
The same Orchestrator snapshot contains accepted [ADR-0114][adr114] and [ADR-0115][adr115],
which own the subsequent PostgreSQL backend and Fully Local V1 direction.
This extract does not reopen SQLite, install an old release candidate or accept a new toolkit.

All package versions, registry observations and driver-support statements below are inherited
from the July 26 review. They have not been rechecked as a November audit.
The original provides public upstream documentation/repository links, often without immutable
upstream commits; those links remain discovery pointers, not frozen current-registry evidence.
No fresh benchmark, adapter conformance run or deployment experiment was performed here.

## Comparative evidence at the original review date

| Toolkit | Baseline recorded in the review | Useful mechanism | Limitation in the original driver scope |
| --- | --- | --- | --- |
| Drizzle | ORM `0.45.2` / Kit `0.31.10` stable; ORM and Kit `1.0.0-rc.4` candidates | Typed SQL, raw SQL escape hatches; official `node:sqlite` and `node-postgres` adapters | Stable ORM then lacked the `node-sqlite` export; its official guide directed users to an RC. SQLite/PostgreSQL table declarations remained dialect-specific. [Sources][drizzle-sqlite] |
| Kysely | `0.29.4`; community `kysely-node-sqlite@1.1.0` | Lightweight typed query construction and raw SQL across dialects | Official SQLite dialect used `better-sqlite3`; community Node SQLite dialect depended on `kysely@^0.28.3` and was recorded as last published July 2025. [Sources][kysely-dialects] |
| Prisma ORM | `7.9.0` | Maintained PostgreSQL/SQLite support and generated CRUD/client workflow | Maintained JavaScript SQLite adapter used `better-sqlite3`; generated model/provider workflow and default time mapping did not remove custom aggregate/revision/receipt work. [Sources][prisma-drivers] |
| Effect SQL | `@effect/sql-sqlite-node@0.53.0` | Common effectful SQL and transaction API | Released package used `better-sqlite3` while repository source had moved toward built-in SQLite; source state was not stable artifact availability. Runtime/lifecycle integration needed an adapter-boundary assessment. [Source][effect-sql] |
| Knex and entity ORMs | No exact package version pinned by this review | Query/migration tooling or entity lifecycle conveniences | The review recorded no first-party `node:sqlite` route for Knex; identity-map/entity models could add a second model without removing capability-owned transactions. These are fit judgments, not a measured universal ranking. |

The dated study provisionally favored Drizzle because both originally selected drivers had
first-party adapters and it could remain adapter-local. That recommendation and its production
qualification remained [owner-local][original]; it is not an instruction to adopt those old pins.
The historical fallback used direct drivers behind the same capability ports.

## What library reuse can and cannot establish

Similar query syntax does not make two databases share one concurrency model.
The reviewed Drizzle [schema documentation][drizzle-schema] explicitly exposes dialect-specific
table declarations. Kysely's [dialect model][kysely-dialects] likewise keeps driver/dialect
implementation distinct from typed query construction.
Raw SQL escape hatches are useful when an invariant requires database-specific operations.
They do not by themselves prove that lock ordering, affected-row checks or unknown-commit
handling are correct; those semantics belong in the owning adapter and conformance evidence.

| Can share a semantic contract | Must remain explicit in the selected adapter/profile |
| --- | --- |
| Aggregate repository and query-port outcomes | Physical tables/indexes and immutable migrations |
| Canonical state mapping and exact-value expectations | Driver codecs, precision and error classification |
| Idempotent command receipt, revision and fence semantics | Actual transaction/isolation/locking behavior |
| Outbox atomicity and unit-of-work result meaning | Connection lifecycle, uncertain commit and recovery |
| Expected domain outcomes in conformance fixtures | Query plans, contention and performance tuning |
| Narrow migration/fault-injection interfaces | Engine-specific backup/restore and operational constraints |

This table describes reusable ownership boundaries, not a mandate for two engines today.
If local and hosted deployments use PostgreSQL, they can reuse the appropriate PostgreSQL
mechanisms while still qualifying their different deployment and operational profiles.

## Lessons reusable across repositories

**Keep the application port semantic.** A capability should express the transition or query
it needs, including conflict/unknown outcomes, rather than expose a toolkit's generic model API.
The domain should not branch on driver names or import generated ORM entities as its authority.

**Preserve the transaction that owns the invariant.** State change, receipt and outbox may need
one owner-local transaction. A cross-dialect query abstraction cannot supply that atomicity
across independently owned systems. Explicit conditional writes and fencing remain useful
even when the toolkit reduces mapping and query boilerplate.

**Assess artifact support, not repository appearance.** The Effect and Drizzle examples show
why a source change, documentation path, release candidate and stable published export are
different evidence. A reusable integration record should identify the exact installed artifact.
The July review's support matrix must be refreshed before being used for a new dependency choice.

**Treat exact values and time as contracts.** A generated client does not automatically preserve
the intended quantity, scale, money or microsecond representation. The study identified time
mapping as an integration issue; current exact-value policy remains with its consuming owner.
This extract imports no particular codec, schema or rounding policy into another product.

**Share conformance meaning before sharing implementation.** Where two profiles promise the
same outcome, fixtures can test that promise through each real adapter. Passing a mock query
builder test is weaker evidence than exercising the actual transaction/driver behavior.
This is a reusable testing lesson; it does not create a new universal test framework or gate.

## Limits and applicability

The original comparison is qualitative source/registry research, not a measured performance,
reliability, maintainability or LOC ranking. It does not prove every current toolkit limitation.
Knex/entity-ORM observations were not pinned as tightly as the listed package versions;
they should not be reused as current definitive feature claims without a focused update.

The original SQLite WAL/single-writer versus PostgreSQL row-locking distinction explains
why common syntax could not erase the historical adapter differences. It is not a reason
to reintroduce a SQLite production profile after ADR-0114/0115.
Legacy ADR-0052 and the original research body remain historical owner records; current
adoption, dependency pins, module boundaries and activation are decided in the owning repository.

No production code, migrations or dependency changes are part of this extract.
The reusable result is a comparison method: inventory the actual driver contract, identify
what the library saves, retain invariant ownership and measure the selected profile.

## Primary references retained from the dated review

[original]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/research/cross-dialect-persistence-tooling-2026-07-26.md
[adr114]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/decisions/0114-canonical-backend-stack-and-distributed-role-adoption.md
[adr115]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/981dd836ca3d35b764561bdc11dc2e0544d83416/docs/decisions/0115-canonical-fully-local-v1-adoption.md
[drizzle-sqlite]: https://orm.drizzle.team/docs/sqlite/connect-node-sqlite
[drizzle-postgres]: https://orm.drizzle.team/docs/get-started-postgresql
[drizzle-schema]: https://orm.drizzle.team/docs/sql-schema-declaration
[kysely-dialects]: https://www.kysely.dev/docs/dialects
[kysely-repository]: https://github.com/kysely-org/kysely
[kysely-node-sqlite]: https://github.com/spooky-finn/kysely-node-sqlite
[prisma-drivers]: https://www.prisma.io/docs/orm/core-concepts/supported-databases/database-drivers
[prisma-sqlite]: https://www.prisma.io/docs/orm/core-concepts/supported-databases/sqlite
[effect-sql]: https://github.com/Effect-TS/effect/tree/main/packages/sql
