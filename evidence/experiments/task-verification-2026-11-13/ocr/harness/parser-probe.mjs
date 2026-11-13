import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { parseOcrNativeReviewResult, classifyOcrReviewOutcome } from './ocr-review-outcome-contract.ts';
import { normalizeOcrFindings, OCR_NORMALIZATION_LIMITS } from './ocr-review-normalization.ts';
const root=path.dirname(new URL(import.meta.url).pathname);
const native=JSON.parse(await fs.readFile(path.join(root,'baseline/native-result.json'),'utf8'));
const admission=JSON.parse(await fs.readFile(path.join(root,'baseline/scenario.json'),'utf8')).admission;
const input=JSON.parse(await fs.readFile(path.join(root,'tool_turn/wire/request-2.json'),'utf8'));
const baseline=parseOcrNativeReviewResult(native,admission);
const tests=[];
function test(name,fn){try{const observation=fn();tests.push({name,status:'PASS',observation});}catch(error){tests.push({name,status:'FAIL',error:error.message});}}
const ledger=[{criterion_id:'criterion_add',status:'not_satisfied',evidence:['calc.ts:1']},{criterion_id:'criterion_context',status:'satisfied',evidence:['context.ts:2']}];
test('native completed has no criterion ledger',()=>{assert.equal(classifyOcrReviewOutcome(baseline.outcome).partial,false);assert.equal(baseline.comments.length,0);assert.ok(!('criteria'in baseline));return {nativeComplete:true,criteriaCount:0,commentCount:0};});
test('extra top-level criterion ledger is ignored',()=>{const result=parseOcrNativeReviewResult({...native,criteria:ledger},admission);assert.deepEqual(result,baseline);return {byteEquivalentParsedResult:true};});
test('extra per-group criterion ledger is ignored',()=>{const raw=structuredClone(native);raw.reviewrouter_outcome.groups[0].criteria=ledger;assert.deepEqual(parseOcrNativeReviewResult(raw,admission),baseline);return {byteEquivalentParsedResult:true};});
test('pure criterion JSON cannot replace the native contract',()=>{assert.throws(()=>parseOcrNativeReviewResult({schema_version:'criteria/v1',criteria:ledger},admission),e=>e.issues.some(i=>i.code==='native_manifest_missing'));return {rejected:'native_manifest_missing'};});
const line='export function add(a: number, b: number) { return a - b; }';
const comment={path:'calc.ts',content:'Criterion criterion_add is not satisfied.',existing_code:line,start_line:1,end_line:1,category:'bug',severity:'high'};
test('criterion properties on a comment are stripped',()=>{const a=parseOcrNativeReviewResult({...native,comments:[comment]},admission);const b=parseOcrNativeReviewResult({...native,comments:[{...comment,criterion_id:'criterion_add',criterion_status:'not_satisfied',evidence:['calc.ts:1']}]},admission);assert.deepEqual(a,b);return {commentKeys:Object.keys(b.comments[0]),criterionIdPresent:'criterion_id'in b.comments[0]};});
test('ledger text stored as comment remains a finding not a typed ledger',()=>{const parsed=parseOcrNativeReviewResult({...native,comments:[{...comment,content:JSON.stringify({criteria:ledger})}]},admission);const norm=normalizeOcrFindings({comments:parsed.comments,assignedPaths:['calc.ts'],headFiles:new Map([['calc.ts',line+'\n']]),diffPositions:new Map([['calc.ts',new Map([[1,1]])]])});assert.equal(norm.findings.length,1);assert.ok(!('criteria'in norm));return {findingCount:1,messageIsRawJson:norm.findings[0].message.startsWith('{'),typedCriterionLedger:false};});
test('unchanged-file finding cannot escape assigned finding scope',()=>{const parsed=parseOcrNativeReviewResult({...native,comments:[{...comment,path:'context.ts'}]},admission);const norm=normalizeOcrFindings({comments:parsed.comments,assignedPaths:['calc.ts'],headFiles:new Map([['calc.ts',line+'\n'],['context.ts','export const limit = 7;\n']])});assert.equal(norm.findings.length,0);assert.equal(norm.diagnostics.skipped[0].reason,'invalid_native_finding');return norm.diagnostics;});
test('oversized finding message fails explicitly',()=>{const parsed=parseOcrNativeReviewResult({...native,comments:[{...comment,content:'x'.repeat(OCR_NORMALIZATION_LIMITS.maxMessageChars+1)}]},admission);assert.throws(()=>normalizeOcrFindings({comments:parsed.comments,assignedPaths:['calc.ts'],headFiles:new Map([['calc.ts',line]])}),e=>e.name==='OcrOutputTooLargeError');return {characters:OCR_NORMALIZATION_LIMITS.maxMessageChars+1};});
test('full-history second turn preserves prior tool call and output',()=>{assert.ok(!('previous_response_id'in input.body));assert.ok(input.body.input.some(i=>i.type==='function_call'&&i.call_id==='call_read'));assert.ok(input.body.input.some(i=>i.type==='function_call_output'&&i.call_id==='call_read'&&i.output.includes('SYNTHETIC_CONTEXT_UNCHANGED')));return {previousResponseId:false,toolCall:true,toolOutput:true};});
const files=['ocr-review-outcome-contract.ts','ocr-review-normalization.ts'];
const sources=[];for(const file of files){const bytes=await fs.readFile(path.join(root,file));const blob=crypto.createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');sources.push({file,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),gitBlob:blob});}
const receipt={kind:'exact-ocr-parser-probe/v1',node:process.version,sourceCommit:'7a079c382d8e98b426ee90a6b3764be2a21b4c49',typecheck:false,sources,passed:tests.filter(t=>t.status==='PASS').length,failed:tests.filter(t=>t.status==='FAIL').length,tests};
await fs.writeFile(path.join(root,'parser-results.json'),JSON.stringify(receipt,null,2));console.log(JSON.stringify(receipt,null,2));if(receipt.failed)process.exitCode=1;
