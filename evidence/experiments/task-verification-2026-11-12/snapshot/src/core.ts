import { createHash } from 'node:crypto';

// Research contract. No command execution, model, publication, or Work state here.
export type Verdict = 'satisfied' | 'violated' | 'inconclusive';
export type Subject = Readonly<{ repo: string; snapshot: string; kind: 'head' | 'merge'; environment: string }>;
export type Basis = Readonly<{
  subject: Subject;
  criteriaDigest: string;
  criteriaRevision: number;
  profileDigest: string;
  evidenceSetDigest: string;
  policyDigest: string;
}>;
export type ExpectedCriterion = Readonly<{ id: string; text: string }>;
export type Row = Readonly<{ id: string; verdict: Verdict; basis: 'semantic' | 'machine'; evidenceIds: readonly string[] }>;
export type Report = Readonly<{
  basis: Basis;
  runState: 'complete' | 'partial' | 'failed' | 'cancelled';
  rows: readonly Row[];
}>;
export type Observation = Readonly<{
  id: string;
  subject: Subject;
  check: string;
  checkRevision: string;
  conclusion: 'success' | 'failure' | 'skipped' | 'neutral';
  ran: boolean;
  artifactDigest: string;
}>;

export function digest(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}
export function criteriaDigest(expected: readonly ExpectedCriterion[]): string {
  return digest(expected.map(c => [c.id, c.text]));
}
export function sameSubject(a: Subject, b: Subject): boolean {
  return a.repo === b.repo && a.snapshot === b.snapshot && a.kind === b.kind && a.environment === b.environment;
}
export function sameBasis(a: Basis, b: Basis): boolean {
  return sameSubject(a.subject, b.subject) && a.criteriaDigest === b.criteriaDigest &&
    a.criteriaRevision === b.criteriaRevision && a.profileDigest === b.profileDigest &&
    a.evidenceSetDigest === b.evidenceSetDigest && a.policyDigest === b.policyDigest;
}

// Adapter fixture: receipts arrive through a distinct trusted control input.
// This Map models an already authenticated adapter; it is NOT authentication itself.
export function admitEvidence(
  observation: Observation,
  expectedSubject: Subject,
  receipts: ReadonlyMap<string, string>,
  expectedCheckRevision: string,
): { accepted: boolean; reason: string } {
  if (receipts.get(observation.id) !== digest(observation)) return { accepted: false, reason: 'unverified_origin' };
  if (!sameSubject(observation.subject, expectedSubject)) return { accepted: false, reason: 'wrong_subject' };
  if (observation.checkRevision !== expectedCheckRevision) return { accepted: false, reason: 'wrong_check_revision' };
  if (!observation.ran || observation.conclusion === 'skipped' || observation.conclusion === 'neutral') {
    return { accepted: false, reason: 'no_executed_result' };
  }
  return { accepted: true, reason: 'admitted_observation_not_semantic_proof' };
}

export function assess(expected: readonly ExpectedCriterion[], current: Basis, report: Report) {
  if (!expected.length || new Set(expected.map(c => c.id)).size !== expected.length) throw new Error('invalid_expected_inventory');
  if (criteriaDigest(expected) !== current.criteriaDigest) throw new Error('inventory_digest_mismatch');
  const expectedIds = new Set(expected.map(c => c.id));
  const issues: string[] = [];
  const rows = new Map<string, Row>();
  for (const row of report.rows) {
    if (!expectedIds.has(row.id)) issues.push('unknown_criterion');
    if (rows.has(row.id)) issues.push('duplicate_criterion');
    if (!['satisfied', 'violated', 'inconclusive'].includes(row.verdict)) issues.push('invalid_verdict');
    rows.set(row.id, row);
  }
  const applicable = sameBasis(current, report.basis);
  const missing = expected.filter(c => !rows.has(c.id)).map(c => c.id);
  const reconciled = expected.map(c => ({
    id: c.id,
    verdict: rows.get(c.id)?.verdict ?? 'inconclusive' as Verdict,
    reason: rows.has(c.id) ? 'reported' : 'missing',
  }));
  const structurallyComplete = report.runState === 'complete' && !missing.length && !issues.length;
  return {
    applicable,
    coverage: { expected: expected.length, reported: expected.length - missing.length, missing },
    issues,
    rows: reconciled,
    structurallyComplete,
    // Advisory evidence only; this deliberately does not complete a Work item.
    allReportedSatisfied: applicable && structurallyComplete && reconciled.every(r => r.verdict === 'satisfied'),
    hasReportedViolation: applicable && !issues.length && reconciled.some(r => r.verdict === 'violated'),
  };
}

// Consumer policy is separate: a passing unrelated check is not criterion proof.
export function applyRequiredCheckPolicy(
  criterionId: string,
  admitted: readonly Observation[],
  requiredChecks: ReadonlyMap<string, readonly string[]>,
): { verdict: Verdict; complete: boolean; missing: string[]; ambiguous: string[]; hasObservedFailure: boolean } {
  const checks = requiredChecks.get(criterionId);
  if (!checks?.length) return { verdict: 'inconclusive', complete: false, missing: [], ambiguous: [], hasObservedFailure: false };
  const rows = checks.map(check => ({ check, matches: admitted.filter(o => o.check === check && o.ran && ['success', 'failure'].includes(o.conclusion)) }));
  const missing = rows.filter(r => !r.matches.length).map(r => r.check);
  const ambiguous = rows.filter(r => r.matches.length > 1).map(r => r.check);
  const complete = !missing.length && !ambiguous.length;
  const hasObservedFailure = rows.some(r => r.matches.some(o => o.conclusion === 'failure'));
  // An ambiguous retry pair needs authoritative attempt selection by its adapter.
  const failed = rows.some(r => r.matches.length === 1 && r.matches[0].conclusion === 'failure');
  return { verdict: failed ? 'violated' : complete ? 'satisfied' : 'inconclusive', complete, missing, ambiguous, hasObservedFailure };
}

// Deliberately restricted fixture parser, NOT a production Markdown adapter.
// Supports one literal heading, LF newlines, no code fences, no duplicate sections.
export function captureCriteriaFixture(markdown: string): string | null {
  const heading = '## ReviewRouter: Acceptance Criteria\n';
  if (markdown.includes('```') || markdown.includes('\r') || markdown.split(heading).length > 2) throw new Error('unsupported_fixture_markdown');
  const start = markdown.indexOf(heading);
  if (start < 0) return null;
  const rest = markdown.slice(start + heading.length);
  const end = rest.indexOf('\n## ');
  return end < 0 ? rest : rest.slice(0, end);
}

// Sequential consumer protocol simulation, not database CAS or Work finalization.
export class PublicationFenceSimulation {
  generation = 1;
  attempt = 1;
  cancelled = false;
  published: string | null = null;
  basis: Basis;
  constructor(basis: Basis) { this.basis = structuredClone(basis); }
  token() { return { generation: this.generation, attempt: this.attempt, basis: structuredClone(this.basis) }; }
  supersede(basis: Basis): void {
    this.generation += 1;
    this.attempt = 1;
    this.cancelled = false;
    this.published = null;
    this.basis = structuredClone(basis);
  }
  cancel(): void { this.cancelled = true; }
  retry(): void {
    if (this.cancelled || this.published !== null) throw new Error('attempt_already_terminal');
    this.attempt += 1;
  }
  publish(token: { generation: number; attempt: number; basis: Basis }, resultDigest: string): string {
    if (this.cancelled || token.generation !== this.generation || token.attempt !== this.attempt || !sameBasis(token.basis, this.basis)) return 'stale';
    if (this.published !== null) return this.published === resultDigest ? 'duplicate' : 'conflicting_duplicate';
    this.published = resultDigest;
    return 'published';
  }
}
