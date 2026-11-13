import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync, spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { parseOcrNativeReviewResult, classifyOcrReviewOutcome } from './ocr-review-outcome-contract.ts';

const sourceRoot = path.dirname(new URL(import.meta.url).pathname);
const root = path.join(sourceRoot, 'extra-approved');
await fs.mkdir(root, {recursive:true});
const binary = path.join(sourceRoot, 'opencodereview-linux-amd64');
const expectedBinary = '9dd5f115747d24100f0767133a3288d268f3bc399675f5b826e7a867d101ee5c';
if (crypto.createHash('sha256').update(await fs.readFile(binary)).digest('hex') !== expectedBinary) throw new Error('binary hash mismatch');
const capability = 'synthetic_local_probe_20261113_0123456789abcdef';
const cleanEnv = { PATH: '/usr/local/bin:/usr/bin:/bin', LANG: 'C.UTF-8', GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null', GIT_TERMINAL_PROMPT: '0' };
const repo = path.join(root, 'synthetic-repo');
await fs.mkdir(repo, { recursive: true });
const git = (...args) => execFileSync('/usr/local/bin/git', ['-C', repo, '-c', 'core.hooksPath=/dev/null', '-c', 'user.name=synthetic-probe', '-c', 'user.email=probe@test.invalid', '-c', 'commit.gpgsign=false', ...args], { encoding:'utf8', env:{ ...cleanEnv, HOME:root, GIT_AUTHOR_DATE:'2026-11-13T00:00:00Z', GIT_COMMITTER_DATE:'2026-11-13T00:00:00Z' } }).trim();
await fs.access(path.join(repo,'.git')).then(()=>{throw new Error('use a fresh probe directory');}).catch(e=>{if(e.code!=='ENOENT')throw e;});
git('init','-q');
await fs.writeFile(path.join(repo,'calc.ts'),'export function add(a: number, b: number) { return a + b; }\n');
await fs.writeFile(path.join(repo,'context.ts'),'// SYNTHETIC_CONTEXT_UNCHANGED\nexport const limit = 7;\n');
git('add','calc.ts','context.ts');git('commit','-qm','base');
const base=git('rev-parse','HEAD');
await fs.writeFile(path.join(repo,'calc.ts'),'export function add(a: number, b: number) { return a - b; }\n');
git('add','calc.ts');git('commit','-qm','head');
const head=git('rev-parse','HEAD');
const admission={baseSha:base,mergeBaseSha:base,headSha:head};
const criteria=[{id:'criterion_add',text:'add returns arithmetic sum',expected:'not_satisfied'},{id:'criterion_context',text:'unchanged context exports limit seven',expected:'satisfied'}];
const ledger={schema_version:'synthetic.criteria/v1',criteria:criteria.map(c=>({id:c.id,status:c.expected,evidence:['calc.ts:1']}))};
const nativeRule={reviewrouter_managed_paths:['calc.ts'],rules:[{path:'calc.ts',rule:'SYNTHETIC_RULE_MARKER. Review both criteria from the background. Do not infer pass from silence.',merge_system_rule:true,reviewrouter_exact_path:true}]};
const legacyRule={merge_system_rule:true,include:['calc.ts'],rules:[{id:'probe',content:'SYNTHETIC_RULE_MARKER. Review both criteria from the background.'}]};
const background='SYNTHETIC_BACKGROUND_MARKER\n'+JSON.stringify(criteria);
const scenarios=(process.env.PROBE_CASES??'ledger_code_comment').split(',');
const all=[];
const start=Date.now();
for(const scenario of scenarios){
 const dir=path.join(root,scenario);await fs.mkdir(path.join(dir,'home','.opencodereview'),{recursive:true,mode:0o700});
 await fs.mkdir(path.join(dir,'wire'),{mode:0o700});
 const requests=[], replies=[];let child;let cancelScheduled=false;let inFlight=0,maxInFlight=0,closedResponses=0;let capHit=false;let childTimedOut=false;
 const server=createServer((req,res)=>{
  inFlight++;maxInFlight=Math.max(maxInFlight,inFlight);res.on('close',()=>{inFlight--;closedResponses++;});
  const chunks=[];let size=0;req.on('data',b=>{size+=b.length;if(size>2*1024*1024){req.destroy();}else chunks.push(b);});
  req.on('end',async()=>{
   let raw;try{raw=JSON.parse(Buffer.concat(chunks).toString());}catch{res.writeHead(400);res.end();return;}
   const index=requests.length+1;
   const names=Array.isArray(raw.tools)?raw.tools.map(t=>t.name??t.function?.name):[];
   requests.push({index,method:req.method,url:req.url,authorizationCorrect:req.headers.authorization===`Bearer ${capability}`,headers:Object.fromEntries(Object.entries(req.headers).filter(([k])=>k!=='authorization')),body:raw});
   await fs.writeFile(path.join(dir,'wire',`request-${index}.json`),JSON.stringify(requests.at(-1),null,2));
   if(index>6){capHit=true;res.writeHead(503);res.end();child?.kill('SIGTERM');return;}
   if(scenario==='cancel_stream'){
    res.writeHead(200,{'content-type':'text/event-stream'});res.write(': synthetic wait\n\n');
    if(!cancelScheduled){cancelScheduled=true;setTimeout(()=>child?.kill('SIGTERM'),150);}
    replies.push({index,kind:'held_until_caller_SIGTERM'});return;
   }
   if(scenario==='partial_stream'){
    const bytes='event: response.completed\ndata: {"type":"response.completed","response":';
    replies.push({index,kind:'truncated_terminal',bytes});res.writeHead(200,{'content-type':'text/event-stream'});res.end(bytes);return;
   }
   let output=[];
   if(names.includes('approve_all_comments')){
    output=[{type:'function_call',id:'fc_filter',call_id:'call_filter',name:'approve_all_comments',arguments:'{}'}];
   }else if(scenario==='ledger_code_comment'&&index===1){
    output=[{type:'function_call',id:'fc_comment',call_id:'call_comment',name:'code_comment',arguments:JSON.stringify({comments:[{path:'calc.ts',content:'Synthetic criterion result carrier.',existing_code:'export function add(a: number, b: number) { return a - b; }',category:'bug',severity:'high',criterion_id:'criterion_add',criterion_status:'not_satisfied',evidence:['calc.ts:1']}]})}];
   }else if(scenario==='tool_turn'&&index===1){
    const def=raw.tools?.find(t=>t.name==='file_read');
    const props=def?.parameters?.properties??{};
    const args={};for(const [key,schema]of Object.entries(props)){
     if(/path|file/.test(key))args[key]='context.ts';
     else if(/start/.test(key))args[key]=1;
     else if(/end|limit|count/.test(key))args[key]=5;
    }
    output=[{type:'function_call',id:'fc_read',call_id:'call_read',name:'file_read',arguments:JSON.stringify(args)}];
   }else{
    if(scenario==='ledger_text')output.push({type:'message',id:`msg_${index}`,role:'assistant',status:'completed',content:[{type:'output_text',text:JSON.stringify(ledger),annotations:[]}]});
    output.push({type:'function_call',id:`fc_${index}`,call_id:`call_${index}`,name:'task_done',arguments:JSON.stringify(scenario==='ledger_task_done'?{state:'DONE',criteria:ledger.criteria}:{state:'DONE'})});
   }
   const event={type:'response.completed',response:{id:`resp_${index}`,object:'response',status:'completed',model:scenario==='ledger_task_done'?'actual-stub-model':'stub-model',output,usage:{input_tokens:10,output_tokens:5,total_tokens:15}}};
   const bytes=`event: response.completed\ndata: ${JSON.stringify(event)}\n\n`;
   replies.push({index,kind:'completed',bytes});await fs.writeFile(path.join(dir,'wire',`response-${index}.sse`),bytes);
   res.writeHead(200,{'content-type':'text/event-stream'});res.end(bytes);
  });
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const url=`http://127.0.0.1:${server.address().port}`;
 const config={provider:'reviewrouter',custom_providers:{reviewrouter:{protocol:'openai-responses',url,api_key:capability,model:'stub-model',timeout_sec:10,extra_body:{service_tier:'default'}}},telemetry:{enabled:false},language:'en'};
 await fs.writeFile(path.join(dir,'home','.opencodereview','config.json'),JSON.stringify(config),{mode:0o600});
 await fs.writeFile(path.join(dir,'rule.json'),JSON.stringify(scenario==='legacy_rule'?legacyRule:nativeRule),{mode:0o600});
 await fs.writeFile(path.join(dir,'background.md'),scenario==='background_8001'?'x'.repeat(8001):background,{mode:0o600});
 const outputPath=path.join(dir,'native-result.json');
 const argv=['review','--reviewrouter-managed','--repo',repo,'--from',base,'--to',head,'--provider','reviewrouter','--model','stub-model','--rule',path.join(dir,'rule.json'),'--background-file',path.join(dir,'background.md'),'--effort','low','--concurrency','1','--format','json','--audience','agent','--timeout','1','--max-tokens','8192','--max-tokens-budget','32768','--output',outputPath];
 const stdout=[],stderr=[];let outSize=0,errSize=0;
 const t0=Date.now();
 child=spawn(binary,argv,{cwd:repo,env:{...cleanEnv,HOME:path.join(dir,'home'),REVIEWROUTER_LOCAL_MODEL_TOKEN:`Bearer ${capability}`},stdio:['ignore','pipe','pipe']});
 child.stdout.on('data',b=>{if(outSize<65536){stdout.push(b);outSize+=b.length;}});child.stderr.on('data',b=>{if(errSize<65536){stderr.push(b);errSize+=b.length;}});
 const timer=setTimeout(()=>{childTimedOut=true;child.kill('SIGKILL');},20000);
 const processResult=await new Promise(resolve=>{child.on('error',e=>resolve({spawnError:e.code}));child.on('close',(code,signal)=>resolve({code,signal}));});clearTimeout(timer);
 await new Promise(resolve=>server.close(resolve));server.closeAllConnections();
 await fs.writeFile(path.join(dir,'stdout.txt'),Buffer.concat(stdout));await fs.writeFile(path.join(dir,'stderr.txt'),Buffer.concat(stderr));
 let raw=null,parsed=null,classification=null,parseError=null;
 try{raw=JSON.parse(await fs.readFile(outputPath,'utf8'));try{parsed=parseOcrNativeReviewResult(raw,admission);classification=classifyOcrReviewOutcome(parsed.outcome);}catch(e){parseError={name:e.name,issues:e.issues};}}catch(e){parseError={name:e.name,message:'output file absent or invalid JSON'};}
 const serialized=JSON.stringify(raw);
 const summary={scenario,elapsedMs:Date.now()-t0,process:processResult,childTimedOut,capHit,requestCount:requests.length,maxInFlight,closedResponses,requestShapes:requests.map(r=>({method:r.method,url:r.url,authorizationCorrect:r.authorizationCorrect,keys:Object.keys(r.body),model:r.body.model,store:r.body.store,stream:r.body.stream,serviceTier:r.body.service_tier,hasPreviousResponseId:'previous_response_id'in r.body,maxOutputTokens:r.body.max_output_tokens??null,toolNames:r.body.tools?.map(t=>t.name),nativeRuleMarker:JSON.stringify(r.body).includes('SYNTHETIC_RULE_MARKER'),backgroundMarker:JSON.stringify(r.body).includes('SYNTHETIC_BACKGROUND_MARKER'),unchangedContextMarker:JSON.stringify(r.body).includes('SYNTHETIC_CONTEXT_UNCHANGED'),toolOutputItems:Array.isArray(r.body.input)?r.body.input.filter(x=>x.type==='function_call_output'):[]})),rawKeys:raw?Object.keys(raw):[],rawHasLedgerMarker:serialized.includes('synthetic.criteria/v1'),rawCommentCount:raw?.comments?.length??null,outcome:raw?.reviewrouter_outcome??null,parsedKeys:parsed?Object.keys(parsed):[],classification,parseError};
 await fs.writeFile(path.join(dir,'scenario.json'),JSON.stringify({summary,argv,admission,replies},null,2));
 all.push(summary);await fs.writeFile(path.join(root,'runtime-results.json'),JSON.stringify({kind:'managed-ocr-fake-provider-probe/v1',binary:{version:'1.13.1-rr.6',sha256:expectedBinary},actionSource:'7a079c382d8e98b426ee90a6b3764be2a21b4c49',node:process.version,realModelCalls:0,gatewayRuntimeUsed:false,networkPolicy:'isolated HOME and allowlisted environment; managed loopback endpoint; no network namespace or syscall audit',elapsedMs:Date.now()-start,results:all},null,2));
 console.log(JSON.stringify({scenario,process:processResult,requests:requests.length,elapsedMs:summary.elapsedMs,rawKeys:summary.rawKeys,hasLedger:summary.rawHasLedgerMarker,classification,parseError}));
}
