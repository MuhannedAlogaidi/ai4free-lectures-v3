/* All saving: artifact db (edits, titles, revisions, progress) with in-browser fallback. One file to swap for Supabase later. */
import { S } from "./state.js";
import { LECTURES, ensureLoaded, stepsOf } from "./content-loader.js";
import { $, esc, modal, toast } from "./app.js";
import { getSteps, keysOf, splitSections } from "./sections.js";
import { completed, render, stepBadge, stepLabel } from "./nav.js";
import { inlineCtx } from "./editor.js";
/* ---------- Saved edits, history and progress ---------- */
export const EDITS = {};          // lectureId -> {stepKey: markdown}; stepKey = slug of the step's original heading, "intro" for the introduction
export const LEGACY = {};         // lectureId -> {sectionIndex: markdown}: V2-style edits keyed by position, used until that section is saved again
export const TITLES = {};         // lectureId -> title
export const LOCAL_HIST = [];     // revisions kept in this browser session
export let STORE = null, UID = null, CAN_WRITE = true;
export let EDITS_READY = false;   // true once the db has sent edits/titles
// Edit keys come from the original text (the .md file), so renaming a heading in an edit, or adding a step
// to the file, never moves an edit to another step. Duplicate names get -2, -3.
export function editKeysOf(l){
  const src = l.base != null ? l.base : l.content;
  if(l._ekFor === src) return l._ek;
  const seen = { intro: 1 };
  l._ek = ["intro"].concat(getSteps(src).map(h => {
    const k = (stepLabel(h).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "step").slice(0, 80).replace(/-+$/, "");
    seen[k] = (seen[k] || 0) + 1; return seen[k] > 1 ? k + "-" + seen[k] : k; }));
  l._ekFor = src; return l._ek;
}
export const keyAt = (l, idx) => editKeysOf(l)[idx] || ("section-" + idx);
export function applyEdits(l){
  if(!(l.file && !l.loaded)){
  const base = splitSections(l.base), secs = base.slice(), e = EDITS[l.id] || {}, old = LEGACY[l.id] || {}, keys = editKeysOf(l);
  secs.forEach((_, i) => { if(e[keys[i]] !== undefined) secs[i] = e[keys[i]]; else if(old[i] !== undefined) secs[i] = old[i]; });
  l.content = secs.join("\n");
  }
  if(TITLES[l.id]) l.title = TITLES[l.id];
}
export function setSaveState(state, text){
  const el = $("saveState"); if(!el) return; el.dataset.state = state;
  $("saveText").textContent = text || ({
    shared: "Edits save to the shared copy for everyone with access.",
    saving: "Saving…",
    local: "Edits stay in this browser session. Use Download HTML to keep them.",
    readonly: "You have view access. Edits stay in this session; Download HTML keeps them.",
    error: "Last save failed. Your edit is kept in this session; try again or use Download HTML."
  })[state];
}
export const sectionLabel = (l, i) => { if(i === 0) return "Introduction"; const all = stepsOf(l), st = all[i-1] || ""; return stepBadge(st, i-1, all) + ". " + stepLabel(st); };
export async function persistSection(l, idx, md, prev, verb){
  const key = keyAt(l, idx), legacy = !!(LEGACY[l.id] && LEGACY[l.id][idx] !== undefined);
  EDITS[l.id] = EDITS[l.id] || {}; EDITS[l.id][key] = md; if(legacy) delete LEGACY[l.id][idx]; applyEdits(l);
  LOCAL_HIST.push({ lec: l.id, key, md: prev, at: Date.now() });
  if(!STORE || !CAN_WRITE){ setSaveState(STORE ? "readonly" : "local"); toast(verb + " (this session only)"); return; }
  if(JSON.stringify({ md }).length > 240000){ setSaveState("error", "This step is too large for the shared copy. Kept in this session; use Download HTML."); toast("Too large to save to the shared copy"); return; }
  setSaveState("saving");
  try {
    const at = Date.now();
    await STORE.collection("revisions").add({ lec: l.id, key, idx, md: prev, at, by: UID || "" });
    await STORE.doc("edits/L" + l.id + "-" + key).set({ lec: l.id, key, idx, md, at, by: UID || "" });
    if(legacy) await STORE.doc("edits/L" + l.id + "-S" + idx).delete();
    setSaveState("shared"); toast(verb);
  } catch(e){
    if(e && e.code === "invalid_argument") CAN_WRITE = false;
    setSaveState(e && e.code === "quota_exceeded" ? "error" : (CAN_WRITE ? "error" : "readonly"),
      e && e.code === "quota_exceeded" ? "The shared copy is full. Kept in this session; use Download HTML." : undefined);
    toast("Couldn't save to the shared copy");
  }
}
export async function resetSection(l, idx){
  const prev = splitSections(l.content)[idx] || "", key = keyAt(l, idx), legacy = !!(LEGACY[l.id] && LEGACY[l.id][idx] !== undefined);
  if(EDITS[l.id]) delete EDITS[l.id][key]; if(legacy) delete LEGACY[l.id][idx]; applyEdits(l);
  LOCAL_HIST.push({ lec: l.id, key, md: prev, at: Date.now() });
  if(!STORE || !CAN_WRITE){ toast("Restored the original (this session only)"); return; }
  setSaveState("saving");
  try { await STORE.collection("revisions").add({ lec: l.id, key, idx, md: prev, at: Date.now(), by: UID || "" });
        await STORE.doc("edits/L" + l.id + "-" + key).delete();
        if(legacy) await STORE.doc("edits/L" + l.id + "-S" + idx).delete();
        setSaveState("shared"); toast("Restored the original"); }
  catch(e){ setSaveState("error"); toast("Couldn't save to the shared copy"); }
}
export let progressTimer = null;
export function saveProgress(){
  if(!STORE || !UID) return;
  clearTimeout(progressTimer);
  progressTimer = setTimeout(async () => {
    const out = {}; Object.keys(completed).forEach(k => { out[k] = Array.from(completed[k]); });
    try { await STORE.doc("data/users/" + UID + "/progress").set({ lectures: out, at: Date.now() }); } catch(e) {}
  }, 800);
}
/* ---------- Learner answers (::: response boxes): per user in the db, or in this browser ---------- */
const RESP_LOCAL = "ai4f-responses";
export function loadLocalResponses(){ try { Object.assign(S.RESPONSES, JSON.parse(localStorage.getItem(RESP_LOCAL) || "{}")); } catch(e) {} }
export async function saveResponses(){
  if(STORE && UID){ await STORE.doc("data/users/" + UID + "/responses").set({ items: S.RESPONSES, at: Date.now() }); return "account"; }
  try { localStorage.setItem(RESP_LOCAL, JSON.stringify(S.RESPONSES)); return "browser"; } catch(e) { return "session"; }
}
export async function initStore(){
  loadLocalResponses();
  if(!window.claude || !window.claude.use) return;
  let db = null, user = null;
  try { [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]); } catch(e) { return; }
  if(!db) return;
  STORE = db;
  if(user){ try { UID = await user.id(); const c = await user.can("data.write"); if(c === false) CAN_WRITE = false; } catch(e) {} }
  setSaveState(CAN_WRITE ? "shared" : "readonly");
  if(!CAN_WRITE){ $("editTop").hidden = true; document.querySelectorAll('[data-action="toggleEditMode"],[data-action="advOpen"]').forEach(x => x.hidden = true); }
  db.collection("edits").onSnapshot(snap => {
    Object.keys(EDITS).forEach(k => delete EDITS[k]); Object.keys(LEGACY).forEach(k => delete LEGACY[k]);
    snap.docs.forEach(d => { const v = d.data(); if(!v || typeof v.md !== "string") return;
      if(typeof v.key === "string") (EDITS[v.lec] = EDITS[v.lec] || {})[v.key] = v.md;
      else if(typeof v.idx === "number") (LEGACY[v.lec] = LEGACY[v.lec] || {})[v.idx] = v.md; });
    EDITS_READY = true; LECTURES.forEach(applyEdits);
    [...new Set(Object.keys(EDITS).concat(Object.keys(LEGACY)))].forEach(id => { const l = LECTURES.find(x => String(x.id) === id); if(l && l.file && !l.loaded) ensureLoaded(l).then(() => { if(!S.editing && S.DATA) render(); }, () => {}); });
    if(!S.editing && S.DATA) render();
  }, () => setSaveState("error", "Lost the connection to the shared copy. Reload to see the latest edits."));
  db.collection("titles").onSnapshot(snap => {
    snap.docs.forEach(d => { const v = d.data(); if(v && v.title) TITLES[v.lec] = v.title; });
    EDITS_READY = true; LECTURES.forEach(applyEdits);
    if(!S.editing && S.DATA) render();
  }, () => {});
  if(UID){
    try {
      const r = await db.doc("data/users/" + UID + "/responses").get();
      const rv = r.exists && r.data();
      if(rv && rv.items){ Object.assign(S.RESPONSES, rv.items); if(!S.editing && S.DATA) render(); }
    } catch(e) {}
    try {
      const p = await db.doc("data/users/" + UID + "/progress").get();
      const v = p.exists && p.data();
      if(v && v.lectures){ Object.keys(v.lectures).forEach(k => { const l = LECTURES.find(x => String(x.id) === String(k));
          completed[k] = new Set((v.lectures[k] || []).map(x => typeof x === "number" ? (l ? keysOf(l)[x-1] : null) : x).filter(Boolean)); });
        if(!S.editing && S.DATA) render(); }
    } catch(e) {}
  }
}
export let HIST_VIEW = [];
export function historyModal(){
  if(inlineCtx) S.editIdx = inlineCtx.idx;
  const l = S.DATA, idx = S.editIdx, key = keyAt(l, idx);
  const draw = rows => {
    HIST_VIEW = rows;
    const fmtT = t => new Date(t).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
    const first = md => (md.split("\n").find(x => x.trim() && !/^#{1,2}\s/.test(x.trim())) || md.split("\n")[0] || "").slice(0, 90);
    const edited = !!((EDITS[l.id] && EDITS[l.id][key] !== undefined) || (LEGACY[l.id] && LEGACY[l.id][idx] !== undefined));
    modal("<h3>History · " + esc(sectionLabel(l, idx)) + "</h3><p>Each save keeps the version it replaced. Restore one to undo a change; restoring is saved as a new change too.</p><div class='hist'>"
      + "<div class='hrow cur'><div class='hm'><b>Current version</b><span>" + (edited ? "Edited" : "Original from the guide") + "</span></div></div>"
      + (rows.length ? rows.map((r, i) => "<div class='hrow'><div class='hm'><b>Before save · " + fmtT(r.at) + "</b><span>" + esc(first(r.md)) + "</span></div><button class='btn ghost sm' data-action='restoreRev' data-i='" + i + "'>Restore</button></div>").join("")
                    : "<div class='rnone'>No earlier versions saved yet.</div>")
      + (edited ? "<div class='hrow'><div class='hm'><b>Original from the guide</b><span>Discard all edits to this section</span></div><button class='btn ghost sm' data-action='resetSec'>Restore</button></div>" : "")
      + "</div><div class='row'><button class='btn' data-action='close'>Close</button></div>");
    $("modal").classList.add("wide");
  };
  const local = LOCAL_HIST.filter(r => r.lec === l.id && r.key === key).sort((a, b) => b.at - a.at);
  if(!STORE){ draw(local.slice(0, 15)); return; }
  draw(local.slice(0, 15));
  STORE.collection("revisions").where("lec", "==", l.id).where("key", "==", key).orderBy("at", "desc").limit(15).get()
    .then(q => { if($("overlay").classList.contains("on")) draw(q.docs.map(d => d.data())); }).catch(() => {});
}
