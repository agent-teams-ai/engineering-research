import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import {
  admitEvidence, applyRequiredCheckPolicy, assess, captureCriteriaFixture,
  criteriaDigest, digest, PublicationFenceSimulation,
  type Basis, type ExpectedCriterion, type Observation, type Report, type Row,
} from './src/core.ts';
import { runHttpFixtures } from './http-fixtures.ts';

// Scripted claims only. There is no provider implementation or SDK in this project.
const tests: { name: string; ok: boolean; error?: string }[] = [];
function test(name: string, fn: () => void) {
  try { fn(); tests.push({ name, ok: true }); }
  catch (error) { tests.push({ name, ok: false, error: String(error) }); }
}
const expected: readonly ExpectedCriterion[] = [
  { id: 'AC1', text: 'An active token returns the profile.' },
  { id: 'AC2', text: 'A missing token returns HTTP 401.' },
  { id: 'AC3', text: 'A revoked token returns HTTP 401.' },
];
const current: Basis = {
  subject: { repo: 'lab/profile', snapshot: 'source-digest-A', kind: 'head', environment: 'node24-lab-v1' },
  criteriaDigest: criteriaDigest(expected), criteriaRevision: 1,
  profileDigest: 'criteria-profile-v1', evidenceSetDigest: 'evidence-v1', policyDigest: 'policy-v1',
};
const rows: readonly Row[] = expected.map(c => ({ id: c.id, verdict: 'satisfied', basis: 'semantic', evidenceIds: [] }));
const report: Report = { basis: current, runState: 'complete', rows };
const result = (change: Partial<Report> = {}) => assess(expected, current, { ...report, ...change });

test('all expected claims present: structurally complete, still advisory', () => {
  assert.equal(result().allReportedSatisfied, true);
  assert.equal('workCompleted' in result(), false);
});
test('missing criterion cannot become positive by reducing only returned rows', () => {
  const r = result({ rows: rows.slice(0, 2) });
  assert.equal(r.allReportedSatisfied, false);
  assert.deepEqual(r.coverage.missing, ['AC3']);
  assert.equal(r.rows[2].verdict, 'inconclusive');
  assert.equal(rows.slice(0, 2).every(r => r.verdict === 'satisfied'), true); // naive counterexample
});
test('partial transport cannot claim complete coverage even with all rows', () => assert.equal(result({ runState: 'partial' }).allReportedSatisfied, false));
test('failed process retains a reported violation without claiming admission', () => {
  const r = result({ runState: 'failed', rows: [{ ...rows[0], verdict: 'violated' }] });
  assert.equal(r.hasReportedViolation, true);
  assert.equal(r.structurallyComplete, false);
});
test('duplicate criterion is an invalid contract', () => assert.deepEqual(result({ rows: [...rows, rows[0]] }).issues, ['duplicate_criterion']));
test('unknown criterion is an invalid contract', () => assert.deepEqual(result({ rows: [...rows, { ...rows[0], id: 'invented' }] }).issues, ['unknown_criterion']));
test('empty authoritative inventory rejects vacuous success', () => assert.throws(() => assess([], current, report), /invalid_expected_inventory/));
test('changed criterion text cannot retain an old digest', () => assert.throws(() => assess([{ ...expected[0], text: 'Returns 500 instead' }, ...expected.slice(1)], current, report), /inventory_digest_mismatch/));
test('explicit inconclusive does not satisfy', () => assert.equal(result({ rows: [{ ...rows[0], verdict: 'inconclusive' }, ...rows.slice(1)] }).allReportedSatisfied, false));
test('invalid verdict from external data rejects', () => assert.ok(result({ rows: [{ ...rows[0], verdict: 'passed' as any }, ...rows.slice(1)] }).issues.includes('invalid_verdict')));
for (const field of ['criteriaRevision', 'profileDigest', 'evidenceSetDigest', 'policyDigest'] as const) {
  test('changed ' + field + ' makes old report inapplicable', () => {
    const changed = { ...current, [field]: field === 'criteriaRevision' ? 2 : 'changed' };
    assert.equal(assess(expected, changed, report).allReportedSatisfied, false);
  });
}
test('different repository with same snapshot cannot reuse assessment', () => assert.equal(assess(expected, { ...current, subject: { ...current.subject, repo: 'other/repo' } }, report).applicable, false));
test('head snapshot cannot impersonate a test-merge snapshot', () => assert.equal(assess(expected, { ...current, subject: { ...current.subject, kind: 'merge' } }, report).applicable, false));
test('different test environment makes an observation inapplicable', () => assert.equal(assess(expected, { ...current, subject: { ...current.subject, environment: 'other-os' } }, report).applicable, false));

const observation: Observation = { id: 'runner-1/check-1', subject: current.subject, check: 'auth-revoked', checkRevision: 'tests-v1', conclusion: 'success', ran: true, artifactDigest: 'artifact-sha' };
const receipts = new Map([[observation.id, digest(observation)]]);
test('trusted adapter receipt binds exact observation bytes', () => assert.equal(admitEvidence(observation, current.subject, receipts, 'tests-v1').accepted, true));
test('self-supplied hash and trusted flag do not establish origin', () => {
  const forged = { ...observation, trusted: true };
  assert.equal(admitEvidence(forged, current.subject, new Map(), 'tests-v1').reason, 'unverified_origin');
});
test('mutating an authentic result invalidates its receipt', () => assert.equal(admitEvidence({ ...observation, conclusion: 'failure' }, current.subject, receipts, 'tests-v1').accepted, false));
test('authentic result for another candidate is rejected', () => assert.equal(admitEvidence(observation, { ...current.subject, snapshot: 'B' }, receipts, 'tests-v1').reason, 'wrong_subject'));
test('test definition revision must match', () => assert.equal(admitEvidence(observation, current.subject, receipts, 'tests-v2').reason, 'wrong_check_revision'));
for (const conclusion of ['skipped', 'neutral'] as const) {
  test(conclusion + ' is not evidence of execution success', () => {
    const o = { ...observation, conclusion };
    assert.equal(admitEvidence(o, current.subject, new Map([[o.id, digest(o)]]), 'tests-v1').reason, 'no_executed_result');
  });
}
test('success label with ran=false is rejected', () => {
  const o = { ...observation, ran: false };
  assert.equal(admitEvidence(o, current.subject, new Map([[o.id, digest(o)]]), 'tests-v1').accepted, false);
});
const policy = new Map([['AC3', ['auth-revoked']]]);
test('authentic unrelated passing test does not prove criterion', () => assert.equal(applyRequiredCheckPolicy('AC3', [{ ...observation, check: 'profile-active' }], policy).verdict, 'inconclusive'));
test('mapped passing check is satisfaction only under explicit consumer policy', () => assert.equal(applyRequiredCheckPolicy('AC3', [observation], policy).verdict, 'satisfied'));
test('mandatory observed failure cannot be averaged away by a semantic positive', () => {
  assert.equal(result().allReportedSatisfied, true);
  assert.equal(applyRequiredCheckPolicy('AC3', [{ ...observation, conclusion: 'failure' }], policy).verdict, 'violated');
});
test('known failure survives another required check being absent', () => {
  const r = applyRequiredCheckPolicy('AC3', [{ ...observation, conclusion: 'failure' }], new Map([['AC3', ['auth-revoked', 'missing-check']]]));
  assert.equal(r.verdict, 'violated'); assert.equal(r.complete, false); assert.deepEqual(r.missing, ['missing-check']);
});
test('success plus absent required check stays inconclusive', () => assert.equal(applyRequiredCheckPolicy('AC3', [observation], new Map([['AC3', ['auth-revoked', 'missing-check']]])).verdict, 'inconclusive'));
test('contradictory duplicate check evidence is exposed', () => {
  const r = applyRequiredCheckPolicy('AC3', [observation, { ...observation, id: 'duplicate', conclusion: 'failure' }], policy);
  assert.equal(r.complete, false); assert.deepEqual(r.ambiguous, ['auth-revoked']);
  assert.equal(r.verdict, 'inconclusive'); assert.equal(r.hasObservedFailure, true);
});
test('criteria reassessment need not rerun same applicable test', () => {
  const next = { ...current, criteriaRevision: 2 };
  assert.equal(assess(expected, next, report).applicable, false);
  assert.equal(admitEvidence(observation, next.subject, receipts, 'tests-v1').accepted, true);
});

const body = '## ReviewRouter: Acceptance Criteria\nAC1: active token returns 200\n## Bot summary\none';
test('bot-summary edit does not change captured authored criteria', () => assert.equal(digest(captureCriteriaFixture(body)), digest(captureCriteriaFixture(body.replace('summary\none', 'summary\ntwo')))));
test('meaningful authored edit changes digest', () => assert.notEqual(digest(captureCriteriaFixture(body)), digest(captureCriteriaFixture(body.replace('returns 200', 'returns 401')))));
test('fixture parser rejects unsupported Markdown instead of proving product parsing', () => assert.throws(() => captureCriteriaFixture('```\n' + body + '\n```'), /unsupported_fixture_markdown/));

test('same-digest removal and re-addition do not revive an old attempt', () => {
  const f = new PublicationFenceSimulation(current); const old = f.token();
  f.supersede({ ...current, criteriaDigest: 'removed' }); f.supersede(current);
  assert.equal(f.publish(old, 'old-result'), 'stale');
  assert.equal(f.publish(f.token(), 'new-result'), 'published');
});
test('late output after cancellation cannot publish', () => {
  const f = new PublicationFenceSimulation(current); const t = f.token(); f.cancel();
  assert.equal(f.publish(t, 'late'), 'stale');
});
test('duplicate delivery is idempotent and conflicting duplicate visible', () => {
  const f = new PublicationFenceSimulation(current); const t = f.token();
  assert.equal(f.publish(t, 'one'), 'published'); assert.equal(f.publish(t, 'one'), 'duplicate');
  assert.equal(f.publish(t, 'two'), 'conflicting_duplicate');
});
test('old attempt is fenced after explicit retry', () => {
  const f = new PublicationFenceSimulation(current); const old = f.token(); f.retry();
  assert.equal(f.publish(old, 'old'), 'stale'); assert.equal(f.publish(f.token(), 'new'), 'published');
});
test('retry after successful publication is rejected without supersession', () => {
  const f = new PublicationFenceSimulation(current); f.publish(f.token(), 'one');
  assert.throws(() => f.retry(), /attempt_already_terminal/);
});
test('mutating caller input cannot mutate captured fence basis', () => {
  const mutable = structuredClone(current); const f = new PublicationFenceSimulation(mutable); const t = f.token();
  (mutable.subject as any).snapshot = 'B'; assert.equal(f.basis.subject.snapshot, current.subject.snapshot);
  assert.equal(f.publish(t, 'one'), 'published');
});

function permutations<T>(items: T[]): T[][] {
  return items.length ? items.flatMap((x, i) => permutations(items.filter((_, j) => i !== j)).map(tail => [x, ...tail])) : [[]];
}
let legalSchedules = 0, unsafeNaivePublications = 0;
test('all 60 legal delivery schedules reject stale generation even after digest returns', () => {
  const schedules = permutations(['remove', 'readd', 'late-result', 'duplicate-result', 'cancel']).filter(xs => xs.indexOf('remove') < xs.indexOf('readd'));
  for (const schedule of schedules) {
    const f = new PublicationFenceSimulation(current); const original = f.token();
    let invalidated = false;
    for (const event of schedule) {
      if (event === 'remove') { f.supersede({ ...current, criteriaDigest: 'removed' }); invalidated = true; }
      else if (event === 'readd') f.supersede(current);
      else if (event === 'cancel') { f.cancel(); invalidated = true; }
      else {
        const status = f.publish(original, 'original');
        if (invalidated) assert.equal(status, 'stale');
        if (invalidated && !f.cancelled && f.basis.criteriaDigest === original.basis.criteriaDigest) unsafeNaivePublications += 1;
      }
    }
    legalSchedules += 1;
  }
  assert.equal(legalSchedules, 60); assert.ok(unsafeNaivePublications > 0);
});

const start = performance.now();
const http = await runHttpFixtures();
test('independent HTTP oracle validates the four intended candidate classes', () => {
  assert.equal(http.results.length, 4);
  const actual = Object.fromEntries(http.results.map(r => [r.id, r.observations.map(o => o.outcome)]));
  assert.deepEqual(actual, {
    'synthetic-P1': ['satisfied', 'satisfied', 'satisfied'],
    'synthetic-P2': ['satisfied', 'satisfied', 'satisfied'],
    'synthetic-N1': ['violated', 'satisfied', 'satisfied'],
    'synthetic-N2': ['satisfied', 'satisfied', 'violated'],
  });
});
test('identical changed route bytes can have different behavior from unchanged helpers', () => {
  const p = http.results.find(r => r.id === 'synthetic-P2')!;
  const n = http.results.find(r => r.id === 'synthetic-N2')!;
  assert.equal(p.input.files['profile.ts'], n.input.files['profile.ts']);
  assert.equal(p.input.baseFiles['profile.ts'], n.input.baseFiles['profile.ts']);
  assert.notEqual(p.input.files['auth.ts'], n.input.files['auth.ts']);
  assert.equal(p.input.baseFiles['auth.ts'], p.input.files['auth.ts']);
  assert.equal(n.input.baseFiles['auth.ts'], n.input.files['auth.ts']);
});
const summary = {
  kind: 'model-free-architecture-spikes', version: 1,
  node: process.version, generatedAt: new Date().toISOString(),
  modelCalls: 0, externalServiceCalls: 0,
  tests: { passed: tests.filter(t => t.ok).length, failed: tests.filter(t => !t.ok).length, cases: tests },
  schedules: { legalSchedules, unsafeNaivePublications, scope: 'sequential protocol simulation; not database concurrency or throughput' },
  http, httpWallTimeMs: Math.round(performance.now() - start),
  limitations: [
    'Scripted claims do not measure reviewer semantic accuracy or prompt-injection resistance.',
    'Trusted receipts are test inputs, not implemented signature verification.',
    'Publication fence is in-memory, not production transaction/outbox/GitHub atomicity.',
    'HTTP fixtures are synthetic and not Hassan-approved benchmark candidates.',
    'TypeScript runs with native Node stripping; no compiler typecheck is claimed.',
    'No load/capacity, real OCR execution, paid-model, or production E2E qualification.',
  ],
};
const resultPath = fileURLToPath(new URL('./results/spikes.json', import.meta.url));
await mkdir(fileURLToPath(new URL('./results', import.meta.url)), { recursive: true });
await writeFile(resultPath, JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify({ passed: summary.tests.passed, failed: summary.tests.failed, legalSchedules, unsafeNaivePublications, http: http.results.map(r => ({ id: r.id, outcomes: r.observations.map(o => o.outcome) })), modelCalls: 0 }, null, 2));
if (summary.tests.failed) process.exitCode = 1;
