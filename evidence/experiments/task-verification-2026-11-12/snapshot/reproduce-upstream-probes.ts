// Optional reproduction against pinned, locally supplied upstream sources.
// No downloading, credentials, provider SDKs, or network calls.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import { runInNewContext } from 'node:vm';

const [kodusPath, rrPath] = process.argv.slice(2);
if (!kodusPath || !rrPath) throw new Error('Usage: node reproduce-upstream-probes.ts /absolute/kodus-check-policy.ts /absolute/rr-invocation-adapter.ts');
async function pinnedSource(path: string, expected: string) {
  const bytes = await readFile(path);
  const gitBlob = createHash('sha1').update(Buffer.concat([Buffer.from('blob ' + bytes.length + '\0'), bytes])).digest('hex');
  assert.equal(gitBlob, expected, 'Source does not match pinned Git blob');
  return bytes.toString('utf8');
}
const kodusSource = await pinnedSource(kodusPath, '39b714cade08bf667a1451a42637048da73488be');
const kodusJs = stripTypeScriptTypes(kodusSource).replace(/\bexport\s+/g, '');
const taskPasses = runInNewContext(kodusJs + '\ntaskPasses;', Object.create(null), { timeout: 1000 });
const cases = [
  { name: 'met', state: 'met', expected: true },
  { name: 'missing', state: 'missing', expected: false },
  { name: 'partial', state: 'partial', expected: true },
  { name: 'check_manually', state: 'check_manually', expected: true },
  { name: 'empty_requirements', state: undefined, expected: true },
  { name: 'missing_but_part_of', state: 'missing', intent: 'part_of', expected: true },
  { name: 'missing_but_accepted', state: 'missing', accepted: true, expected: true },
];
const kodus = cases.map(c => {
  const verdict = { needsMoreInfo: false, requirements: c.state ? [{ state: c.state, ...(c.accepted ? { accepted: { by: 'fixture', at: '2026-11-12' } } : {}) }] : [] };
  const actual = taskPasses(verdict, c.intent); assert.equal(actual, c.expected);
  return { name: c.name, actual };
});
const rrSource = await pinnedSource(rrPath, '68f70ee15fe902e96742570cae10585e153c5ab0');
const start = rrSource.indexOf('export const OCR_BACKGROUND_HARD_CHAR_LIMIT = 8000;');
const end = rrSource.indexOf('\n}\n', start) + 3;
assert.ok(start >= 0 && end > start, 'Exact reviewed function boundaries unavailable');
const rrJs = stripTypeScriptTypes(rrSource.slice(start, end)).replace(/\bexport\s+/g, '');
const bound = runInNewContext(rrJs + '\nboundOcrBackgroundText;', Object.create(null), { timeout: 1000 });
const rrCases: string[] = [];
function check(name: string, fn: () => void) { fn(); rrCases.push(name); }
check('null preserved', () => assert.equal(bound(null), null));
check('short text preserved', () => assert.equal(bound('AC1'), 'AC1'));
check('8000 boundary', () => assert.equal(bound('x'.repeat(8000)).length, 8000));
check('criterion beyond limit lost', () => assert.equal(bound('x'.repeat(8000) + 'AC3').includes('AC3'), false));
check('different criteria collapse to same context', () => assert.equal(bound('x'.repeat(8000) + 'reject'), bound('x'.repeat(8000) + 'accept')));
check('surrogate pair remains intact', () => assert.equal(bound('x'.repeat(7999) + '😀').length, 7999));
check('full-input hashes remain different', () => {
  const h = (s: string) => createHash('sha256').update(s).digest('hex');
  assert.notEqual(h('x'.repeat(8000) + 'reject'), h('x'.repeat(8000) + 'accept'));
});
console.log(JSON.stringify({ scope: 'Two exact pure source functions; no full upstream application execution', modelCalls: 0, kodus, reviewRouter: rrCases, passed: kodus.length + rrCases.length }, null, 2));
