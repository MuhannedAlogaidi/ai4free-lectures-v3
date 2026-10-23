/* Splitting lecture source: steps, sections, parts, stable step keys. */
import { S } from "./state.js";
import { stepsOf } from "./content-loader.js";
import { stepLabel } from "./nav.js";
export function keysOf(l){
  if(l._keysFor === l.content) return l._keys;
  const seen = {};
  l._keys = stepsOf(l).map(h => { let k = stepLabel(h).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "step";
    seen[k] = (seen[k] || 0) + 1; return seen[k] > 1 ? k + "-" + seen[k] : k; });
  l._keysFor = l.content; return l._keys;
}
export function getSteps(src){
  const out = []; let inCode = false;
  (src||"").split("\n").forEach(line => {
    const t = line.trim();
    if(/^```/.test(t)){ inCode = !inCode; return; }
    if(inCode) return;
    const m = t.match(/^#{1,2}\s+(.*)$/); if(m) out.push(m[1].replace(/\{[#\w\- ]+\|([^{}]*)\}/g,"$1").replace(/[*_=`~]/g,""));
  });
  return out;
}
export function splitSections(src){
  const out = [[]]; let code = false;
  (src || "").split("\n").forEach(L => {
    const t = L.trim();
    if(/^```/.test(t)){ code = !code; out[out.length-1].push(L); return; }
    if(!code && /^#{1,2}\s+/.test(t)) out.push([L]); else out[out.length-1].push(L);
  });
  return out.map(a => a.join("\n"));
}
export function splitParts(md){
  const out = [[]]; let code = false, depth = 0;
  md.replace(/\s+$/, "").split("\n").forEach(L => {
    const t = L.trim();
    if(/^```/.test(t)){ code = !code; out[out.length-1].push(L); return; }
    if(!code){
      if(/^:::\s*\w/.test(t)) depth++;
      else if(t === ":::" && depth > 0) depth--;
      if(depth === 0 && /^###\s+/.test(t) && out[out.length-1].some(x => x.trim())){ out.push([L]); return; }
    }
    out[out.length-1].push(L);
  });
  return out.map(a => a.join("\n"));
}
export function stepTok(idx){ return (splitSections(S.DATA.content)[idx] || "").replace(/\s+$/, "") + "\n"; }
