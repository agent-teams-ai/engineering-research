#!/usr/bin/env node
// Two source-extracted transformation checks. No model, provider, tool, agent, or service runs.
// Usage: node reproduce.mjs /path/to/kodus-source-root [receipt-output.json]
// The source root must contain the two pinned upstream files listed below.
// Keep downloaded upstream sources outside the research repository; they are not bundled here.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";

const pin = "f74afbb486bc5434c1190aeb8433d59f6f7847d2";
const sources = [
  {
    path: "libs/agents/business-validation/judge/intent-judge.ts",
    blob: "a8bab7bd6caf3ae5f557bf9f06d960c2db9291ee",
    extraction: "lines 281-289: return expression for a refuted requirement; remove only TypeScript 'as const'",
  },
  {
    path: "libs/agents/business-validation/judge/business-rules-verifier.ts",
    blob: "4fb145c590b47fe549a2622b7e92b460f74d250a",
    extraction: "lines 159-171: body of applyBusinessRulesVerdict; lines 186-190: optional-verification gate",
  },
].map((source) => ({
  ...source,
  url: "https://github.com/kodustech/kodus-ai/blob/" + pin + "/" + source.path,
}));
const sourceRoot = process.argv[2];
if (!sourceRoot) throw new Error("Provide a local source root containing both exact upstream files.");
function readPinned(source) {
  const bytes = readFileSync(resolve(sourceRoot, source.path));
  const digest = createHash("sha1")
    .update(Buffer.from("blob " + bytes.length + "\0"))
    .update(bytes)
    .digest("hex");
  assert.equal(digest, source.blob, "Unexpected upstream Git blob: " + source.path);
  return bytes.toString("utf8").split("\n");
}
const judgeLines = readPinned(sources[0]);
const verifierLines = readPinned(sources[1]);
const requirementBody = judgeLines.slice(280, 289).join("\n").replace("'met' as const", "'met'");
assert.match(requirementBody, /return verdict\.keep/);
assert.match(requirementBody, /state: 'met'/);
const applyRequirement = new Function("verdict", "requirement", requirementBody);
const verdictBody = verifierLines.slice(158, 171).join("\n");
assert.match(verdictBody, /if \(verdict\.keep\) return result;/);
assert.match(verdictBody, /status: 'compliant'/);
const applyLegacyVerdict = new Function("result", "verdict", verdictBody);
const gateBody = verifierLines.slice(185, 190).join("\n");
const shouldVerify = new Function("result", "policy", gateBody);
const policy = { verifyAnalyzerResult: true };
const verdict = {
  keep: false,
  rationale: "The supplied diff does not establish whether retry exists elsewhere.",
};
const requirement = {
  requirement: "Retry transient failures",
  state: "missing",
  evidence: [],
  confidence: "medium",
  kind: "behavior",
  note: "No retry found in supplied diff.",
  action: "Add retry.",
};
const completedAnalysis = {
  needsMoreInfo: false,
  mode: "full_analysis",
  reason: "analysis_ready",
  status: "issues_found",
  confidence: "medium",
  summary: "Retry requirement missing.",
};
assert.equal(shouldVerify(completedAnalysis, policy), true);
assert.equal(shouldVerify(completedAnalysis, { verifyAnalyzerResult: false }), false);
const actualRequirement = applyRequirement(verdict, structuredClone(requirement));
assert.equal(actualRequirement.state, "met");
assert.deepEqual(actualRequirement.evidence, []);
assert.equal(actualRequirement.note, verdict.rationale);
assert.equal(actualRequirement.action, undefined);
const legacyInput = {
  ...completedAnalysis,
  findings: [{ severity: "must_fix", title: "Retry requirement missing." }],
};
const actualLegacy = applyLegacyVerdict(structuredClone(legacyInput), verdict);
assert.equal(actualLegacy.status, "compliant");
assert.deepEqual(actualLegacy.findings, []);
assert.equal(actualLegacy.needsMoreInfo, false);
assert.equal(actualLegacy.confidence, "low");
assert.equal(actualLegacy.summary, verdict.rationale);
const receipt = {
  schema: "source-transformation-probe/v1",
  observed_date: "2026-11-13",
  upstream: { repository: "kodustech/kodus-ai", commit: pin, sources },
  scope: "Two exact-source transformation scenarios with a stub verifier verdict. The TS return expression only has 'as const' erased. The legacy function body and gate are executed unchanged. No full service, publisher, model output, or merge behavior is exercised.",
  llm_calls: 0,
  scenarios: [
    {
      id: "refuted_requirement_without_positive_evidence",
      input: { completed_analysis: completedAnalysis, policy, requirement, verifier_verdict: verdict },
      actual: actualRequirement,
      assertions_passed: true,
      notes: "The result still has an empty evidence array, yet state becomes met. The action property is undefined and therefore omitted by JSON serialization.",
    },
    {
      id: "refuted_legacy_violation_without_positive_evidence",
      input: { analysis: legacyInput, policy, verifier_verdict: verdict },
      actual: actualLegacy,
      assertions_passed: true,
      notes: "The legacy pure transform returns compliant and clears findings. This path is selected when the analysis has no requirements array.",
    },
  ],
  scenarios_passed: 2,
  scenarios_total: 2,
  limitation: "This establishes the reachable pure transformation given a contract-permitted keep=false verdict. It does not establish that a live verifier emits that verdict or that a PR merges.",
  proposed_invariant: "Retracting an unsupported violation alone leaves satisfaction inconclusive. Promotion to satisfied requires positive evidence.",
};
const json = JSON.stringify(receipt, null, 2) + "\n";
if (process.argv[3]) writeFileSync(resolve(process.argv[3]), json);
process.stdout.write(json);
