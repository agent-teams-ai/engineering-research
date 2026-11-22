---
id: research.studies.substrate-resource-efficiency-and-scaling-2026-11-22
type: study
status: active
owner: research/maintainers
summary: "Dated source audit of Substrate as an optional cloud sandbox backend: resource savings, scaling, strengths, limitations and Agent Runtime integration conditions."
reviewed_at: "2026-11-22"
related:
  - research.technologies.execution
  - research.methodology.evaluation
---

# Substrate Resource Efficiency and Scaling 2026-11-22

## Scope and status

**Дата исследования и проверки состояния upstream: 22 ноября 2026 года.**
**Статус идеи: условный кандидат для экономии ресурсов и масштабирования облачных sandbox. Внедрение не принято.**

Исследование началось с предоставленной пользователем ссылки на
[agent-substrate/substrate][substrate-repo] и вопроса о совместимости с
`agent-teams-ai/agent-runtime` и `agent-teams-orchestrator`. По итогам пользователь
попросил сохранить разбор как одну из возможных идей: что в ней хорошо, что
ограничивает применение и когда стоит к ней вернуться.

**Вывод:** Substrate заслуживает внимания как дополнительный Linux/cloud backend
изолированных окружений под Agent Runtime. Его наиболее интересный сценарий —
много сохраняемых окружений при значительно меньшем числе одновременно активных
исполнений и высокой доле *безопасного* простоя. Это инфраструктура sandbox,
а не замена Orchestrator, durable workflows или контрактов операций Runtime.
Граница интеграции разумная, но строгие гарантии запуска, отмены и восстановления
не получаются автоматически от тонкой обёртки над API.

`active` в метаданных означает доступный исследовательский материал. Документ не
принимает ADR, не меняет принятые backend-роли, не добавляет обязательный release
gate и не объявляет продукт или deployment profile квалифицированным. Обычное
исполнение Runtime S1–S5 и программа capacity C0–C3 остаются разными предметами.
Текущая карточка кандидата находится в
[каталоге исполнения и sandbox](../technologies/agent-execution-and-sandboxes.md#substrate).

### Проверенные версии и глубина исследования

| Предмет | Зафиксированная ревизия / версия | Что изучалось |
| --- | --- | --- |
| Substrate, открытый исходный код, Linux/Kubernetes | [`f5428049ac0b81458eb12e81fa5a6b65cd39a2ad`][substrate-revision], main на момент исследования | Архитектура, публичный API, resume/suspend, workers и сеть, security/authorization, demos, CI и отдельные benchmarks |
| Последний опубликованный release Substrate | [`v1.0.1`][release], опубликован 2026-11-20 | Release notes; это отдельный объект от более нового main |
| Дополнительный execution bridge `agent-substrate/env` | [`28041b5fc1946acf6b532ab2e4030dcd0ac7f478`][env-revision] | Alpha API процессов/файлов, process tracker, timeout и restart/retry ограничения |
| Agent Runtime | [`f990acc26e1b8071ae22d0b87a2ddd3672be8e2e`][runtime-revision] | План native boundary, ordinary process ports и adapter, фактическая readiness |
| Agent Teams Orchestrator | [`a34587b313e656eeb43d755b4a4f08c40dff2116`][orchestrator-revision] | Runtime ownership, capability boundary, Temporal decision и стадия реализации |

Основной метод — чтение исходников и контрактов, сопоставление с нашими owner
документами, проверка GitHub issues/PR и результатов upstream CI. Критические
выводы о fallback восстановления, async durability и наличии timeout в `env`
дополнительно проверены независимым чтением тех же ревизий.

Кластер Substrate в этом исследовании **не разворачивался**. Собственные
fault-injection, нагрузочные тесты, security penetration tests и реальный
coding-agent workflow через Substrate не выполнялись. Результаты upstream CI
были прочитаны, а не получены нашим повторным запуском. Лицензии всех транзитивных
компонентов и полная стоимость эксплуатации отдельно не квалифицировались.
Утверждения по main нельзя автоматически переносить на release `v1.0.1`.

### Как читать доказательства

| Класс | Значение в этом исследовании |
| --- | --- |
| Исходники / контракт | Поведение найдено в зафиксированном коде или API; это не воспроизведение production-инцидента |
| Документация upstream | Объявленное поведение, ограничение или цель проекта; сильное обещание требует собственной проверки |
| Наблюдавшийся upstream CI | Конкретный чужой запуск и его результаты, включая skips; не квалификация нашей интеграции |
| Сообщение upstream | Датированный issue/PR; причина и воспроизводимость могут требовать дополнительной проверки |
| Инженерный вывод | Следствие для наших контрактов либо сценария; явно отделено от обнаруженного дефекта |
| Неизвестно | Нет достаточных данных; не превращается в нулевую оценку или утверждение об отсутствии функции |

## Evidence and counterevidence

### Что представляет собой Substrate и как в нём запускаются агенты

Substrate управляет OCI workloads в gVisor или microVM на Cloud Hypervisor.
Есть Kubernetes control plane, Postgres, node/worker компоненты, actor-aware
ingress/egress и хранение snapshot в object storage. Actor — собственная единица
жизненного цикла; её не следует приравнивать к отдельному Kubernetes Pod.
Пулы workers позволяют размещать несколько actors в общем бюджете worker.
Обычный container без дополнительной изоляции не является поддерживаемым
эквивалентом этих sandbox classes. [Архитектура][architecture]
[Sandbox classes][sandbox-classes]

**Обязательного особого agent SDK нет.** Внутри образа может работать наш
execution endpoint, CLI агента или другой Linux-процесс. Однако core API
управляет actor/template/worker lifecycle: он сам не определяет prompt,
conversation, provider approvals, PTY или результат бизнес-задачи. Поэтому
простого вызова `CreateActor` недостаточно, чтобы получить полную интеграцию
Agent Runtime. [Core API][api]

Проект `env` уже предоставляет мост: запуск процесса, stdin/stdout/stderr,
сигналы, чтение output с offsets и операции с файлами. Его API помечен alpha.
В проверенном API нет caller-assigned ключа идемпотентного запуска и PTY/resize;
идентификатор процесса генерируется сервером. Registry процессов находится в
памяти: файловый spool вывода сам по себе не восстанавливает registry после
cold boot. Потеря ответа на StartProcess поэтому требует явного разрешения
неопределённости, а не слепого повторного запуска. [Env README][env-readme]
[Process API][env-api] [Tracker][env-tracker]

**Timeout в `env` есть:** request timeout, default один час, таймер и SIGKILL
process group. Это положительная существующая защита. Не проверена другая,
более сильная гарантия: соответствие принятому внешнему deadline после
suspend/restore, изменения часов и отказа узла. Наличие таймера не является
такой квалификацией. [Timeout и process-group implementation][env-tracker]

Golden template creation запускает entrypoint для прогрева перед snapshot.
Поэтому entrypoint, который сразу выполняет пользовательскую операцию, может
начать работу раньше разрешённого Runtime dispatch. Предпочтительная гипотеза
интеграции — инертный execution endpoint, ожидающий актуального разрешения извне.
Это предложение для будущего spike, а не уже реализованный adapter.
[Golden creation / threat model][threat-model]

### Сильные стороны, которые стоит сохранить в оценке

| Сильная сторона | Практическая ценность | Предел доказательства |
| --- | --- | --- |
| Реальные gVisor и microVM реализации | Изоляция и несколько вариантов компромисса между совместимостью и стоимостью | Не равнозначно доказанной безопасности любого multi-tenant deployment |
| Warm pools и snapshot lifecycle | Возможность уменьшать цену простоя и время восстановления окружений | Экономию и p95/p99 нужно измерить на нашем workload |
| Отдельный инфраструктурный слой без обязательного agent framework | Можно сохранить provider и operation semantics в Runtime | Нужен execution bridge и проверка соответствия контрактам |
| Сохраняемое control-plane состояние, внутренние leases/epochs/version checks | В проекте уже есть серьёзная работа с concurrency и reconciliation | Внутренние защиты не заменяют внешний operation ID или все публичные preconditions |
| mTLS, egress policies, credential mechanisms и authorization | Есть полезная основа для управляемых cloud sandbox | Production hardening и tenant model требуют отдельной оценки |
| Широкая матрица upstream CI | Это работающая инженерная система с заметной проверкой поведения | CI не доказывает наш сценарий, любой масштаб или отсутствие edge cases |

Основания: [архитектура][architecture], [security][security],
[authorization][authorization], [resume implementation][resume],
[workflow CI][ci-workflow]. Открытые проблемы ниже не отменяют эти сильные стороны.

### Что действительно показал upstream CI

У [запуска `44959711656`][ci-run] на проверенном Substrate SHA итог `success`.
Все восемь E2E вариантов прошли: Envoy/AgentGateway × gVisor/microVM ×
preview off/on. В workflow есть `go test -race`, отдельные root tests и
настоящие disposable kind/KVM окружения. Проверенные счётчики:

| Проверенная часть | Passed | Failed | Skipped | Источник |
| --- | ---: | ---: | ---: | --- |
| Unit | 12 274 | 0 | 53 | [Job 137015602499][ci-unit] |
| Root | 846 | 0 | 4 | [Тот же job, отдельный suite][ci-unit] |
| Envoy + gVisor | 218 | 0 | 15 | [Job 137015602675][ci-gvisor] |
| Envoy + microVM | 219 | 0 | 14 | [Job 137015602640][ci-microvm] |

Skips сохранены отдельно и не считаются PASS. `verify-migrations` в этом
запуске был skipped по условию workflow; общий зелёный результат не меняет его
статус. Это сильное контрдоказательство предположению «всё выглядит как сырая
демонстрация», но не замена собственному compatibility experiment.

### Ограничения и edge cases, влияющие на решение

#### 1. Успешный Resume не обещает обязательное восстановление памяти

**Исходники / контракт.** `preferred_fidelity` определяет best-effort потолок,
а не минимальную гарантию. При недоступности совместимой capacity код может
ослабить runtime constraint. При несовместимом runtime выбирается ROOTFS;
при замене ActorTemplate на другой UID — VOLUMES. Это сознательная fallback-политика,
сама по себе не доказанный баг. [Fidelity contract][fidelity]
[Ослабление placement constraint][resume-relaxation]
[Выбор ROOTFS/VOLUMES][resume-fallback]

**Следствие для нас.** Возврат успеха не означает продолжение прежнего процесса
из прежней памяти: возможен новый запуск entrypoint. Проверить fidelity только
после Resume недостаточно, если cold boot уже мог выполнить внешний effect.
Строгому профилю нужны отказ до запуска при неподдерживаемом восстановлении
либо execution endpoint, который без новой внешней authority не начинает
операцию. Локальный selector или Post-Resume проверка сами этого не гарантируют.
Совместимость gVisor filesystem checkpoints между версиями также нельзя считать
проверенной автоматически. [Version skew policy][version-skew]

#### 2. SUSPENDED и сохранённый в object storage snapshot — разные факты

**Исходники / контракт.** Suspend по умолчанию asynchronous. Actor может быть
`SUSPENDED`, пока durable snapshot ещё `PENDING` и доступен только на узле.
При новой synchronous suspension API ждёт upload. Но повторный SYNC для уже
`SUSPENDED` actor возвращает его как есть и не является отдельным барьером
durability. [Suspend contract и implementation][suspend]
[Async architecture][architecture]

**Следствие для нас.** Перед обещанием восстановления после потери узла нужно
проверять завершение именно нужной snapshot generation. Нельзя считать
достаточными один статус actor, произвольный старый completed snapshot или
повторный вызов SYNC. Потеря узла до upload может потерять последние изменения.
Adapter способен честно различать pending/unknown/durable; он не создаёт
отсутствующую гарантию сохранности одним переименованием статуса.

#### 3. Приостановка разрывает активные сетевые операции

**Исходники.** Suspend деактивирует tunnel; ingress отменяет запросы, egress
закрывает и дренирует streams. Сам suspend requester предупреждает об отмене
in-flight requests. [Suspend requester][suspend-requester]
[Egress deactivate][egress-deactivate]

**Следствие для нас.** Агент, который ждёт LLM stream, не обязательно находится
в безопасном простое. Snapshot памяти не сохраняет внешний TCP/TLS peer и не
доказывает продолжение ответа без разрыва. Нужны объявленные safe points и
provider-specific reconnect/uncertainty semantics. В этом исследовании
прозрачное продолжение активных LLM streams не проверено и не обещается.

#### 4. Автоматическая экономия не появляется просто после установки

**Документация / inspected path.** Parking demo явно использует
request→suspend цикл вместо ещё не реализованного auto-suspend-on-idle.
В коде существует RequestActorSuspend plumbing, однако полноценная
производственная policy безопасного idle в проверенном пути не обнаружена.
Это точнее, чем утверждать, что никакого механизма suspension нет.
[Parking demo][parking]

**Следствие для нас.** Должен быть конкретный владелец решения о безопасной
приостановке. Отсутствие входящего HTTP-трафика не доказывает отсутствие
background subprocess, незавершённого provider запроса или внешнего effect.

#### 5. Snapshot не откатывает внешние эффекты и не возрождает разрешения

**Инженерный вывод.** Revert к прежнему состоянию sandbox не отменяет уже
выполненный git push, запрос API или другую внешнюю операцию. Повторный запуск
из прежней памяти может повторить действие. Intent, operation identity,
authority, receipts и состояние unknown/reconciliation должны оставаться у
действующих владельцев вне откатываемой памяти sandbox. Старый snapshot не
должен восстанавливать отменённое разрешение. Внутренние lifecycle leases
Substrate не являются глобальным exactly-once контрактом внешних систем.
[Lifecycle API][api-guide]

Это дополнительный сценарий существующих уроков **MR-13/14, GP-07/08** о
safe retry и uncertainty, а также **MR-17** об authority перед effect;
новый параллельный реестр гарантий не нужен.
[Общие lessons](../lessons/patterns-and-failure-lessons.md)

#### 6. Риски identity, concurrency и совместимости coding workloads

Состояния ниже **проверены 2026-11-22**. Это история конкретной ревизии и даты;
при следующем выборе backend их нужно обновить.

| Наблюдение | Тип и статус на дату | Практическое последствие |
| --- | --- | --- |
| [Issue #3267][issue-policy]: новый actor с прежним именем может до 10 секунд получить cached egress policy удалённого actor | Open upstream bug; TTL и name-based key подтверждаются исходниками | Не переиспользовать имена incarnation; это не универсальное решение всех stale commands. [Policy cache][policy-cache] |
| [PR #4046][pr-preconditions]: optional preconditions для custom lifecycle methods | Open, unmerged. Проверенный публичный ResumeRequest не несёт ожидаемые UID/version | Pre-Get в adapter не атомарен с mutation; mutex одного процесса не координирует replicas/router/admin. Внутренние concurrency protections при этом существуют. [API][api] |
| [Issue #4045][issue-crng]: restore microVM может задержаться на CRNG reseed | Open upstream report, независимо не воспроизведён; код имеет один bounded call с бюджетом 60 секунд | Существенно для хвоста latency и удержания worker capacity. Это не доказательство, что каждый restore зависает. [Restore implementation][restore] |
| [Issue #4033][issue-docker] и [PR #4034][pr-privileged]: Docker внутри actor | Proposal privileged microVM containers открыт и не merged; ограничения capabilities/mounts и rootless workarounds описаны upstream | `docker build`, Compose, вложенные services и часть coding E2E требуют отдельной проверки; обычный shell из этого не следует считать неработающим |

Пример stale command: запоздавший Suspend для actor по имени может конфликтовать
с более новым Resume той же incarnation. Уникальное имя защищает от путаницы
между удалённым и новым actor, но не от всех команд внутри одной incarnation.
Для строгого профиля нужны server-side preconditions либо доказанно
исключительное управление выбранным lifecycle path; это не решается только
проверкой текущей версии перед отдельным запросом.

#### 7. Eviction и эксплуатация требуют участия harness

Документированный graceful eviction предполагает реакцию процесса/harness на
SIGTERM и запрос synchronous suspend в доступном бюджете. Процесс не должен
завершиться раньше snapshot. Реальный node/Spot deadline может быть значительно
короче внутреннего worker budget. Следовательно, произвольный CLI не получает
автоматическую прозрачную миграцию только от размещения в actor.
[Eviction contract][api-guide]

Также нужно эксплуатировать Kubernetes, Postgres, workers, proxy/egress,
object storage, версии guest/runtime и совместимость snapshots. Это объясняет
ограниченную оценку operational simplicity: цена системы включает observability,
обновления, capacity резерв и восстановление, а не только LOC клиента.

#### 8. Security имеет реализованную основу и незакрытые части

В upstream есть isolation, mTLS, policy и authorization; одновременно документы
явно оставляют работу по quotas/anti-DoS и отдельным частям hardening. В
проверенной authorization-модели нельзя безопасно переиспользовать atespace
names; principals нескольких JWT issuers не полностью разделены по issuer;
grants задаются на atespace, а не на каждый actor/template. Это вопросы
соответствия нашему tenant model, а не утверждение об отсутствии защиты вообще.
[Security status][security] [Authorization limitations][authorization]

Release `v1.0.1` уже **исправил** egress wildcard обход к loopback/link-local/
cloud metadata после разрешения hostname. Это исторический исправленный дефект,
а не заявленная открытая уязвимость последнего release. [Release notes][release]

У `env` своя дополнительная поверхность: в проверенном server entrypoint
наблюдались plain gRPC/h2c без inbound auth interceptor и default skip-verify
для соединения с control plane. Поэтому доступность удобного process API не
позволяет автоматически считать его готовым public multi-tenant endpoint.
[Env server entrypoint][env-server]

### Что известно о масштабе, а что остаётся гипотезой

В рассмотренном [atunnel benchmark][atunnel-benchmark] было 100 000 idle egress
connections через 10 sandbox и fake gateway; измерение относится к ограниченному
сетевому пути. Это не 100 000 одновременно работающих агентов. Аналогично
[cold-resume benchmark][cold-resume-benchmark] использует fake dataplane для
изоляции ateapi/Postgres: это полезно для конкретного bottleneck, но не доказывает
полный restore реальных sandbox с provider traffic.

Заявленные масштабные цели и latency aspirations в проекте не превращаем в
измеренные production SLO. Различаем зарегистрированные actors, сохранённые
окружения, открытые соединения, queued work и одновременно активное исполнение.
Наш масштаб «тысячи агентов» тоже требует такого определения и отдельной
campaign; статусы наших планов не доказывают достигнутую capacity.

## Implications and limits

### Где он мог бы встроиться в Agent Teams

| Граница | Ответственность в рассматриваемой интеграции |
| --- | --- |
| Orchestrator | Задачи, команда, координация, approval/consumption policy и бизнес-переходы |
| Durable workflow engine | Сохраняемый workflow progress по принятой архитектуре; не snapshot гостевой памяти |
| Agent Runtime | Provider/session/operation semantics, dispatch authority, deadlines, результат/unknown, output и cleanup evidence |
| Substrate backend | Создание, размещение, приостановка, восстановление и удаление actor/sandbox |
| Execution endpoint / init внутри sandbox | Собственные дочерние процессы, stdin/stdout/stderr, сигналы и локальные ресурсы по выбранному контракту |

Основания для наших границ: [Runtime lifecycle ownership][our-ownership],
[runtime boundary][our-boundary], [native integration plan][our-native],
[ordinary ports][our-ports] и [Temporal decision][our-temporal].

Substrate и in-sandbox init могут законно управлять **разными уровнями ресурсов**.
Конфликт возникает, если независимые компоненты создают, рестартуют,
восстанавливают или удаляют **один и тот же** sandbox либо независимо решают
повторить одну операцию. Поэтому нельзя просто сказать «Substrate заменяет
keeper»: нужно отдельно доказать preassigned attempt identity, принятый deadline,
output drain, cleanup-only recovery и сохранение cleanup debt. Часть наших
capability ports ещё обсуждается в [OD-004][our-od004].

Наши собственные планы и реализация оцениваются раздельно. Проверенный Runtime
readiness документ не квалифицирует весь product slice и содержит **ноль
deployment-qualified profiles**; его отдельная implementation qualification
имеет ограниченный scope. Orchestrator остаётся на стадии architecture definition
с частичной реализацией. Поэтому более строгие требования нельзя выдавать за уже
достигнутое production-превосходство над Substrate.
[Runtime readiness][our-readiness] [Orchestrator README][our-orchestrator-readme]

### Когда идея полезна и когда не полезна

| Сценарий | Оценка применимости | Почему / что нужно подтвердить |
| --- | --- | --- |
| Много cloud окружений, длительные безопасные паузы между работой | Хороший условный кандидат | Можно освобождать активные ресурсы, сохраняя окружение; измерить idle fraction, snapshot cost и resume tail |
| Linux hosted/self-hosted система с уже доступной K8s эксплуатацией | Возможный дополнительный backend | Инфраструктурные зависимости совместимы со сценарием; integration semantics всё равно нужны |
| Короткие восстановимые задания с явным повторным стартом | Возможен | Политика fresh start/retry должна быть разрешена владельцем и учитывать внешние эффекты |
| Небольшой парк либо почти непрерывная активность | Обычно низкая текущая ценность | Fixed infrastructure и snapshot I/O могут съесть экономию; сначала нужен измеренный bottleneck |
| Нативный desktop runtime macOS/Windows | Плохое прямое соответствие | Linux sandbox/Kubernetes не выполняет native OS contract; запуск Linux VM не доказывает native parity |
| Прозрачная пауза активного LLM stream | Не подтверждено, текущая семантика мешает | Suspend разрывает network streams; нужен другой контракт продолжения |
| Обязательное memory resume без cold boot | Не готово как тонкая интеграция | Best-effort fallback необходимо ограничить до исполнения или учесть в новом контракте |
| Docker/Compose и вложенные services как обязательная часть coding workload | Отдельное исследование до выбора | Упомянутые capabilities, mounts, storage и privileged proposals ещё не дают готового общего решения |
| Exactly-once внешних действий только за счёт snapshots | Не подходит для такого обещания | Внешний мир не откатывается вместе с guest memory |

### Как оценивать экономию без обещания выдуманной стоимости

Пусть `p` — доля окружений, которые действительно можно безопасно приостановить.
В идеализированной модели одинаковых окружений активная память уменьшается с
`N × m` до `N × (1 − p) × m`: отношение исходной активной памяти к оставшейся —
`1 / (1 − p)`. Например, при `p = 20%`, `50%`, `90%` получаем соответственно
`1.25×`, `2×`, `10×` для **этой компоненты памяти**. Это математическая
иллюстрация, не измерение Substrate и не прогноз снижения общего счёта.

Из выгоды нужно вычесть control plane, минимальный пул workers, запас на пики,
snapshot storage/traffic, CPU на suspend/restore и стоимость эксплуатации.
Ожидание ответа LLM не включается в `p` без доказанного safe point. Hibernation
не уменьшает число model tokens и сама по себе не увеличивает пропускную
способность активно работающих CPU, дисков, базы или provider rate limits.

Будущий эксперимент должен сравнить один workload с существующим backend:
стоимость успешно завершённой работы, RAM/CPU, safely suspended fraction,
snapshot bytes/upload latency, p95/p99 resume, cold-fallback rate, latency
отмены, потерю/повтор effects и cleanup debt. Без этих данных процент экономии
для нашей системы остаётся неизвестным.

### Сохранённые оценки из исследования

Это порядковые инженерные суждения для указанных сценариев, а не измерения
доступности, security score или новый общий leaderboard. Они не являются
средним по [30-критериальной методике](../methodology/evaluation-methodology.md)
и не переносятся в неё как готовые итоговые баллы. Высокий балл означает лучшее
соответствие названной задаче; уверенность в source-based выводе выше, чем в
неизмеренной экономике конкретного deployment.

| Что оценивается | Оценка /10 | Основание |
| --- | ---: | --- |
| Архитектурная идея для многочисленных преимущественно простаивающих окружений | 8.5 | Понятный источник экономии: изоляция, warm capacity и сохранение окружений |
| Реальная инженерная реализация | 8 | Рабочие backend, контроль lifecycle, заметная CI-матрица и явные ограничения |
| Общая практическая ценность в подходящем cloud сценарии | 7 | Полезный кандидат, но semantics и эксплуатация имеют существенную цену |
| Соответствие архитектурной границе под Runtime | 8 | Можно отделить sandbox infrastructure от provider/operation policy |
| Готовность прямого подключения под наши строгие контракты | 4–5 | Fallback, durability, command identity, deadlines и cleanup ещё нужно согласовать/доказать |
| Предсказуемость произвольного agent resume | 5.5 | Сильно зависит от workload, сети, совместимости и разрешённого fresh start |
| Простота эксплуатации | 5 | Несколько сервисных и native компонентов, snapshot/version/capacity concerns |
| Пригодность как native desktop backend | 2–3 | Основной Linux/cloud deployment не соответствует native macOS/Windows задаче |

Уверенность в рекомендации «сохранить как условный cloud-кандидат» — **8/10**
как субъективная оценка достаточности inspected sources. Для количественной
экономии и нашего end-to-end production поведения данных недостаточно.
Фразу «очень много багов» исследование не подтверждает: найдены конкретные
upstream проблемы, deliberate tradeoffs и незакрытые integration cases, при
этом есть существенное положительное инженерное доказательство.

### Когда вернуться к идее и что проверить следующим

**Триггер:** появилась измеренная стоимость безопасно простаивающих cloud
sandbox, возникла конкретная потребность в их плотном размещении либо upstream
изменил важные restore/durability/precondition semantics. До этого момента
достаточно сохранить материал в каталоге; установка дополнительного control
plane не является самостоятельной целью.

Если триггер появился, следующий шаг — **ограниченный compatibility spike**:
один Linux workload, один provider/transport, pinned Substrate release и
существующий Runtime owner. Начальная проверка может идти без обещания
transparent hibernation активной agent session. Перед своей реализацией bridge
сначала оценить `env` и переиспользование существующих Runtime ports.

| Проверка будущего spike | Что могло бы подтвердить применимость / что её опровергнет |
| --- | --- |
| Потеря ответа на запуск | Сохраняется identity/unknown и нет слепого повторного dispatch; без этого эффектный workflow не принимается |
| Гонка Stop/Cancel с Resume/Restore | Старое состояние и поздняя команда не возвращают утраченное право выполнять операцию |
| Активный provider stream и suspend | Разрыв честно виден, reconnect разрешён контрактом, отсутствие ответа не превращается в повтор effect |
| Потеря узла между local snapshot и upload | Система различает pending и durable и не обещает несуществующую сохранность |
| Нет совместимого worker / изменился runtime | Неподдерживаемый memory resume отказывается до действия либо fresh start явно разрешён и безопасен |
| Реальная coding-задача | Checkout → tools/build/tests → cancel/cleanup работает с нужными mounts, сетью и Docker services, если они нужны выбранному сценарию |
| Одинаковый baseline и Substrate workload | Измеренная итоговая экономия достаточна, а tail latency и эксплуатационная цена укладываются в требования владельца |

Это предложения для будущего решения владельцев, а не выполненные тесты,
добавленные release gates или обещанный срок интеграции. Срок и LOC интеграции
не оценивались: объём зависит от выбранных гарантий, upstream изменений и того,
достаточно ли существующего `env`. Тонкий клиент не отражает полный объём
backend, qualification и эксплуатационной работы.

### Правило актуализации

Следующий содержательный пересмотр — **перед выбором или spike**, а также при
изменениях в release, issues #3267/#4045, PR #4034/#4046, fidelity, snapshot
durability или наших Runtime contracts. Это review trigger, не созданная этим
документом автоматизация. Сравнить diff от перечисленных SHA; записать новую
дату, конкретные изменившиеся выводы и affected/fixed release. Не переписывать
историю так, будто открытые 22 ноября проблемы существовали всегда или уже
исправленные дефекты остаются текущими.

## Sources

Все code/document ссылки ниже закреплены на проверенных SHA. Issue/PR/release
и Actions URL — изменяемые внешние записи; их наблюдённые состояния и дата
зафиксированы в тексте. Наличие ссылки на main в имени предмета не обновляет
содержимое этого исследования автоматически.

- **Substrate:** [source revision][substrate-revision], [architecture][architecture],
  [API guide][api-guide], [protocol][api], [security][security],
  [authorization][authorization], [version skew][version-skew].
- **Критические механизмы:** [resume][resume], [suspend][suspend],
  [microVM restore][restore], [policy cache][policy-cache],
  [network cancellation][suspend-requester], [parking demo][parking].
- **Execution bridge:** [env revision][env-revision], [process API][env-api],
  [process tracker][env-tracker], [server][env-server].
- **Проверенные upstream результаты:** [Actions run][ci-run], [workflow][ci-workflow],
  [unit/root job][ci-unit], [gVisor job][ci-gvisor], [microVM job][ci-microvm],
  [atunnel benchmark][atunnel-benchmark], [cold-resume benchmark][cold-resume-benchmark].
- **Наши owner records:** [ownership][our-ownership], [runtime boundary][our-boundary],
  [native integration][our-native], [ordinary ports][our-ports],
  [readiness][our-readiness], [OD-004][our-od004], [Temporal decision][our-temporal].

[substrate-repo]: https://github.com/agent-substrate/substrate
[substrate-revision]: https://github.com/agent-substrate/substrate/tree/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad
[architecture]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/docs/concepts/architecture.md
[api-guide]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/docs/reference/api-guide.md
[sandbox-classes]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/docs/reference/sandbox-classes.md
[api]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/api/ateapi/v1/ateapi.proto
[fidelity]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/api/ateapi/v1/ateapi.proto#L1294-L1305
[resume]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/cmd/ateapi/internal/controlapi/workflow_resume.go
[resume-relaxation]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/cmd/ateapi/internal/controlapi/workflow_resume.go#L424-L433
[resume-fallback]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/cmd/ateapi/internal/controlapi/workflow_resume.go#L788-L813
[suspend]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/cmd/ateapi/internal/controlapi/workflow_suspend.go
[suspend-requester]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/internal/ateworker/suspend/suspend.go#L40-L48
[egress-deactivate]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/internal/atunnel/egress/egress.go#L270-L287
[restore]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/cmd/ateworker-microvm/restore.go
[policy-cache]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/cmd/atenet/internal/router/egress/policycache.go
[version-skew]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/docs/reference/version-skew-policy.md
[parking]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/demos/parking/load.sh#L17-L24
[security]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/docs/security/security.md
[authorization]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/docs/guides/authorization.md
[threat-model]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/docs/security/threat-model.md
[release]: https://github.com/agent-substrate/substrate/releases/tag/v1.0.1
[issue-policy]: https://github.com/agent-substrate/substrate/issues/3267
[issue-crng]: https://github.com/agent-substrate/substrate/issues/4045
[issue-docker]: https://github.com/agent-substrate/substrate/issues/4033
[pr-privileged]: https://github.com/agent-substrate/substrate/pull/4034
[pr-preconditions]: https://github.com/agent-substrate/substrate/pull/4046
[env-revision]: https://github.com/agent-substrate/env/tree/28041b5fc1946acf6b532ab2e4030dcd0ac7f478
[env-readme]: https://github.com/agent-substrate/env/blob/28041b5fc1946acf6b532ab2e4030dcd0ac7f478/README.md
[env-api]: https://github.com/agent-substrate/env/blob/28041b5fc1946acf6b532ab2e4030dcd0ac7f478/proto/ateenv/v1alpha/guest.proto
[env-tracker]: https://github.com/agent-substrate/env/blob/28041b5fc1946acf6b532ab2e4030dcd0ac7f478/guest/process/tracker.go
[env-server]: https://github.com/agent-substrate/env/blob/28041b5fc1946acf6b532ab2e4030dcd0ac7f478/cmd/ate-env-api/main.go
[ci-run]: https://github.com/agent-substrate/substrate/actions/runs/44959711656
[ci-workflow]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/.github/workflows/pr-workflow.yaml
[ci-unit]: https://github.com/agent-substrate/substrate/actions/runs/44959711656/job/137015602499
[ci-gvisor]: https://github.com/agent-substrate/substrate/actions/runs/44959711656/job/137015602675
[ci-microvm]: https://github.com/agent-substrate/substrate/actions/runs/44959711656/job/137015602640
[atunnel-benchmark]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/benchmarking/atunnel/runs/20261020-163000/report.md
[cold-resume-benchmark]: https://github.com/agent-substrate/substrate/blob/f5428049ac0b81458eb12e81fa5a6b65cd39a2ad/benchmarking/automation/ateapi-cold-resume.md
[runtime-revision]: https://github.com/agent-teams-ai/agent-runtime/tree/f990acc26e1b8071ae22d0b87a2ddd3672be8e2e
[orchestrator-revision]: https://github.com/agent-teams-ai/agent-teams-orchestrator/tree/a34587b313e656eeb43d755b4a4f08c40dff2116
[our-ownership]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0003-ar-owns-runtime-lifecycle.md
[our-boundary]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/architecture/runtime-boundary.md
[our-temporal]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/decisions/0116-native-temporal-for-fully-local-durable-workflows.md
[our-od004]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/docs/open-decisions/OD-004-runtime-capability-ports.md
[our-native]: https://github.com/agent-teams-ai/agent-runtime/blob/f990acc26e1b8071ae22d0b87a2ddd3672be8e2e/docs/architecture/agent-runtime-architecture-program-plan.md#native-team-coordination-contract-native-integration
[our-ports]: https://github.com/agent-teams-ai/agent-runtime/blob/f990acc26e1b8071ae22d0b87a2ddd3672be8e2e/packages/contexts/agent-execution/src/features/contained-agent-turn/application/ordinary-ports.ts
[our-readiness]: https://github.com/agent-teams-ai/agent-runtime/blob/f990acc26e1b8071ae22d0b87a2ddd3672be8e2e/docs/architecture/readiness.md
[our-orchestrator-readme]: https://github.com/agent-teams-ai/agent-teams-orchestrator/blob/a34587b313e656eeb43d755b4a4f08c40dff2116/README.md

[Индекс исследований](README.md) · [Каталог технологий](../technologies/README.md)
