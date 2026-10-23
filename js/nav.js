/* Rendering a lecture, one step per view, pager, progress, resources, lecture tree, recent list. */
import { S } from "./state.js";
import { LECTURES, ensureLoaded, stepsOf } from "./content-loader.js";
import { $, esc, stopEdit, toast } from "./app.js";
import { renderBlocks, resetRender, runDiagrams } from "./markdown.js";
import { getSteps, keysOf, splitSections } from "./sections.js";
import { decorate, editMode, setEditMode } from "./editor.js";
/* ---------- Render ---------- */
export function render(){
  if(S.REF || S.HOME){ renderLectures(); return; }   // Reference page open: keep it, refresh the side tree only
  $("title").textContent = S.DATA.title;
  document.title = S.DATA.title + " | AI4Free";
  $("date").textContent = S.DATA.created.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})
    + ", " + S.DATA.created.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"});
  paginate();
  renderLectures();
}
/* ---------- One step per view ---------- */
/* moved to state.js: curStep */
// Render only what is on screen: the introduction (step 1 only) and the current step.
// Each section renders the same on its own as inside the whole lecture (checked for all 98 steps).
export function paginate(){
  const t = $("transcript"), src = splitSections(S.DATA.content), total = src.length - 1;
  S.curStep = Math.min(Math.max(1, S.curStep), Math.max(1, total));
  resetRender(); t.innerHTML = "";
  if(!total || S.curStep === 1){
    const intro = document.createElement("section"); intro.className = "sec intro"; intro.innerHTML = renderBlocks(src[0]);
    if(intro.childNodes.length) t.appendChild(intro);
  }
  if(total){
    S.stepCount = S.curStep - 1;
    const sec = document.createElement("section"); sec.className = "sec"; sec.dataset.n = S.curStep; sec.innerHTML = renderBlocks(src[S.curStep]);
    t.appendChild(sec);
  }
  if(total){
    const steps = getSteps(S.DATA.content), lab = i => stepBadge(steps[i]||"",i,steps) + ". " + stepLabel(steps[i]||"");
    const nav = document.createElement("div"); nav.className = "pager";
    const L = "<svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M15 6l-6 6 6 6'/></svg>";
    const R = "<svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='m9 6 6 6-6 6'/></svg>";
    nav.innerHTML = doneBtn(total)
      + "<nav class='pnav' aria-label='Step navigation'>"
      + (S.curStep > 1 ? "<button class='pg prev' data-action='stepBy' data-d='-1' title='Previous step (←)'><span class='pa'>"+L+"</span><span class='pt'><small>Previous</small><span>"+esc(lab(S.curStep-2))+"</span></span></button>"
        : S.DATA.home ? "<button class='pg prev' data-action='openHome' data-id='"+S.DATA.id+"' title='Course Home'><span class='pa'>"+L+"</span><span class='pt'><small>Previous</small><span>Course Home</span></span></button>" : "")
      + (S.curStep < total ? "<button class='pg next' data-action='stepBy' data-d='1' title='Next step (→)'><span class='pt'><small>Next</small><span>"+esc(lab(S.curStep))+"</span></span><span class='pa'>"+R+"</span></button>" : "")
      + "</nav>";
    t.appendChild(nav);
  }
  const cta = $("cta"); if(cta) cta.hidden = total > 0 && S.curStep !== total;
  if(editMode){ t.classList.add("edit-on"); t.querySelectorAll(".sec:not([hidden])").forEach(sec => decorate(sec, sec.classList.contains("intro") ? 0 : S.curStep)); }
  else t.classList.remove("edit-on");
  const vis = t.querySelector(".sec:not(.intro):not([hidden])");
  if(vis && isDone(S.DATA, S.curStep)) vis.insertAdjacentHTML("afterbegin", "<div class='step-top'><span class='done-pill'>"+CHECK+"Completed</span></div>");
  updateProgress(); renderResources(); setTimeout(runDiagrams, 0);
  syncStep();
}
export const completed = {};   // lectureId -> Set of stable step keys (from step headings)
export const doneSet = () => (completed[S.DATA.id] = completed[S.DATA.id] || new Set());
export const isDone = (l, n) => !!(completed[l.id] && completed[l.id].has(keysOf(l)[n-1]));
export const doneCount = l => { const s = completed[l.id]; return s ? keysOf(l).filter(k => s.has(k)).length : 0; };
export const CHECK = "<svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.8' stroke-linecap='round' stroke-linejoin='round'><path d='m5 12.5 4.5 4.5L19 7.5'/></svg>";
export function doneBtn(total){ const d = isDone(S.DATA, S.curStep), n = doneCount(S.DATA), pct = total ? Math.round(n/total*100) : 0;
  return "<div class='pdone"+(d?" is-done":"")+"'><div class='pinfo'><span class='pl'>Step "+S.curStep+" of "+total+"</span>"
    + "<div class='pbar' role='progressbar' aria-valuenow='"+pct+"' aria-valuemin='0' aria-valuemax='100'><span style='width:"+pct+"%'></span></div>"
    + "<span class='ps'>"+n+" of "+total+" steps completed</span></div>"
    + "<button class='btn-done"+(d?" is-done":"")+"' data-action='toggleDone'>"+CHECK+(d ? "Completed <span class='undo'>· Undo</span>" : (S.curStep < total ? "Mark complete &amp; continue" : "Mark as complete"))+"</button></div>"; }
export function updateProgress(){
  if(!S.DATA) return; const total = getSteps(S.DATA.content).length, n = doneCount(S.DATA);
  $("usageText").textContent = n + " of " + total + " steps completed";
  $("usageBar").style.width = (total ? Math.round(n/total*100) : 0) + "%";
}
export function renderResources(){
  const box = $("resBox"); const list = (S.DATA && S.DATA.resources) || [];
  box.hidden = !list.length; if(!list.length) return;
  const steps = getSteps(S.DATA.content), badge = stepBadge(steps[S.curStep-1]||"", S.curStep-1, steps);
  const host = u => { try { return new URL(u).hostname.replace(/^www\./,""); } catch(e){ return u; } };
  const EXT = "<svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'><path d='M14 4h6v6M20 4l-9 9'/><path d='M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10'/></svg>";
  const DL = "<svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3.5v11'/><path d='m7.5 10 4.5 4.5 4.5-4.5'/><path d='M4 15.5v3A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5v-3'/></svg>";
  // A resource is a link ({url}) or an attached file ({file: "assets/files/...", size}).
  const fileInfo = r => { const ext = (r.file.split(".").pop() || "").toUpperCase(); return [r.note, ext + " file", r.size].filter(Boolean).join(" · "); };
  const item = r => r.file
    ? "<button class='rlink rfile' data-action='downloadResource' data-file='"+esc(r.file)+"'>"+DL+"<span>"+esc(r.title)+"<small>"+esc(fileInfo(r))+"</small></span></button>"
    : "<a class='rlink' href='"+esc(r.url)+"' target='_blank' rel='noopener'>"+EXT+"<span>"+esc(r.title)+"<small>"+esc(r.note ? r.note + " · " + host(r.url) : host(r.url))+"</small></span></a>";
  const forStep = list.filter(r => (r.steps||[]).includes(badge));
  $("resStep").innerHTML = "<div class='rlab'>For this step</div>" + (forStep.length ? forStep.map(item).join("") : "<div class='rnone'>No specific links for this step.</div>");
  $("resAll").innerHTML = "<div class='rlab'>All session resources</div>" + list.map(item).join("");
  const open = !$("resAll").hidden;
  $("resAllBtn").innerHTML = (open ? "Hide session resources" : "All session resources ("+list.length+")");
}
export function showStep(n){ S.curStep = n; paginate(); refreshTree(); window.scrollTo({top:0, behavior:"smooth"}); rememberLast(); }
export function keepSideScroll(fn){ const side = document.querySelector(".left .side"), st = side ? side.scrollTop : 0; fn(); if(side) side.scrollTop = st; }
export function revealActive(){
  const side = document.querySelector(".left .side"), a = S.DATA && document.querySelector(".tnode[data-lec='"+S.DATA.id+"'] .tstep.active");
  if(!side || !a) return;
  const sr = side.getBoundingClientRect(), ar = a.getBoundingClientRect();
  if(ar.top < sr.top + 8) side.scrollTop -= (sr.top + 8 - ar.top);
  else if(ar.bottom > sr.bottom - 8) side.scrollTop += (ar.bottom - sr.bottom + 8);
}
export function refreshTree(){
  const inTree = S.DATA && document.querySelector(".tnode[data-lec='"+S.DATA.id+"'].open .tstep[data-n='"+S.curStep+"']");
  if(inTree){ syncStep(); document.querySelectorAll(".tnode[data-lec='"+S.DATA.id+"'] .tmore-note").length; }
  else keepSideScroll(renderLectures);
  revealActive();
}

/* ---------- Lecture tree ---------- */
export const expanded = new Set();
export const stepLabel = t => t.replace(/^(Alternative\s+)?Step\s*\d+\s*[:.\-]\s*/i,"").replace(/^\d+(\.\d+)+\s+/,"");
const DEC = /^(\d+(?:\.\d+)+)\s/;
// Explicit number in the heading ("Step 3:", "13.2 "), else for lectures that use sub-numbers (13.1)
// a plain heading counts as the next main lecture, so "Step" can be dropped from Udacity headings.
export const stepNum = (t, i, steps) => {
  const m = t.match(/^(?:Alternative\s+)?Step\s*(\d+)/i) || t.match(DEC); if(m) return m[1];
  if(steps && steps.some(x => DEC.test(x))){ let n = 0; for(let k = 0; k <= i; k++) if(!DEC.test(steps[k]||"")){ const s = (steps[k]||"").match(/^(?:Alternative\s+)?Step\s*(\d+)/i); n = s ? +s[1] : n + 1; } return String(n); }
  return ""; };
export const stepBadge = (t, i, steps) => {
  const m = t.match(/^(Alternative\s+)?Step\s*(\d+)/i); if(m) return m[2] + (m[1] ? "b" : "");
  const d = t.match(DEC); if(d) return d[1];
  if(/^practice checkpoint/i.test(t)) return "\u2713";
  return stepNum(t, i, steps) || String(i+1); };
export const FOLDER = "<svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'><path d='M3 6.5A2.5 2.5 0 0 1 5.5 4h3.6c.6 0 1.2.25 1.6.7L12 6h6.5A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z'/></svg>";
export const CARET = "<svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'><path d='m9 6 6 6-6 6'/></svg>";
export function treeNode(l){
  const steps = stepsOf(l), active = S.DATA && l.id===S.DATA.id, open = expanded.has(l.id);
  return "<li class='tnode"+(open?" open":"")+"' data-lec='"+l.id+"'>"
    + "<div class='trow"+(active?" active":"")+"'>"
    + "<button class='tcaret' data-action='toggleTree' data-id='"+l.id+"' aria-label='"+(open?"Collapse":"Expand")+"' aria-expanded='"+open+"'>"+CARET+"</button>"
    + "<button class='tlec' data-action='"+(l.home?"openHome":"openLecture")+"' data-id='"+l.id+"' title='"+esc(l.title)+"'>"+FOLDER+"<span class='tname'>"+esc(l.title)+"</span></button></div>"
    + "<ul class='tsteps'>" + (steps.length || l.home ? stepItems(l, steps) : "<li class='tempty'>No sections yet</li>") + "</ul></li>";
}
export const HOUSE = "<svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><path d='M4 11 12 4l8 7'/><path d='M6 10v9h12v-9'/></svg>";
export const STEP_LIMIT = 8, showAll = new Set();
export function stepItems(l, steps){
  const total = steps.length, cur = (S.DATA && S.DATA.id===l.id) ? S.curStep : 1;
  let from = 0, to = total;
  if(!showAll.has(l.id) && total > STEP_LIMIT){
    from = Math.max(0, Math.min(cur - 3, total - STEP_LIMIT)); to = from + STEP_LIMIT;
  }
  const li = (st,i) => "<li><button class='tstep"+(isDone(l, i+1)?" complete":"")+"' data-action='goStep' data-lec='"+l.id+"' data-n='"+(i+1)+"'><span class='sn'>"+stepBadge(st,i,steps)+"</span><span>"+esc(stepLabel(st))+"</span></button></li>";
  let html = l.home ? "<li><button class='tstep thome"+(S.HOME && S.DATA && S.DATA.id===l.id?" active":"")+"' data-action='openHome' data-id='"+l.id+"'><span class='sn'>"+HOUSE+"</span><span>Course Home</span></button></li>" : "";
  if(from > 0) html += "<li><button class='tmore-note' data-action='toggleMore' data-id='"+l.id+"' title='Show all steps'><svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'><path d='m6 15 6-6 6 6'/></svg>Show "+from+" earlier step"+(from>1?"s":"")+"</button></li>";
  html += steps.slice(from, to).map((st,k) => li(st, from+k)).join("");
  if(total > STEP_LIMIT){
    const hidden = total - (to - from);
    html += "<li><button class='tmore' data-action='toggleMore' data-id='"+l.id+"'>"
      + (showAll.has(l.id) ? "Show less <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'><path d='m6 15 6-6 6 6'/></svg>"
                           : "Show more ("+hidden+") <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>")
      + "</button></li>";
  }
  return html;
}
export function renderSteps(){ syncStep(); }
export function syncStep(){
  if(!S.DATA) return;
  document.querySelectorAll(".tnode[data-lec='"+S.DATA.id+"'] .tstep").forEach(b => { const n = +b.dataset.n;
    if(b.classList.contains("thome")){ b.classList.toggle("active", !!S.HOME); return; }
    b.classList.toggle("active", !S.HOME && n === S.curStep); b.classList.toggle("done", n < S.curStep); b.classList.toggle("complete", isDone(S.DATA, n)); });
}

export const shortDate = d => d.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
export function lecItem(l){
  const n = LECTURES.indexOf(l) + 1;
  return "<button class='item lec"+(S.DATA && l.id===S.DATA.id?" active":"")+"' data-action='openLecture' data-id='"+l.id+"' title='"+esc(l.title)+"'>"
    + "<span class='num'>"+n+"</span><span class='lt'><span>"+esc(l.title)+"</span><small>"+shortDate(l.created)+"</small></span></button>";
}
export function renderLectures(){
  S.recentIds = S.recentIds.filter(id => LECTURES.some(l => l.id===id));
  [...LECTURES].sort((x,y) => y.created - x.created).forEach(l => { if(S.recentIds.length<5 && !S.recentIds.includes(l.id)) S.recentIds.push(l.id); });
  S.recentIds = S.recentIds.slice(0,5);
  const recent = S.recentIds.map(id => LECTURES.find(l => l.id===id));
  $("recentList").innerHTML = recent.length ? recent.map(lecItem).join("") : "<div class='empty'>No recent lectures</div>";
  $("allList").innerHTML = LECTURES.length ? "<ul class='tree'>"+LECTURES.map(treeNode).join("")+"</ul>" : "<div class='empty'>No lectures yet</div>";
  syncStep();
  $("lecCount").textContent = "(" + LECTURES.length + ")";
}
/* Remember the open lecture and step in this browser, so the next visit starts there. */
export function rememberLast(){ try { if(S.DATA) localStorage.setItem("ai4f-last", JSON.stringify({ id: S.DATA.id, step: S.curStep })); } catch(e) {} }
export function openLecture(id){
  const want = LECTURES.find(l => l.id===id);
  if(want && want.file && !want.loaded) return ensureLoaded(want).then(() => openLecture(id), () => toast("Couldn't load this lecture. Check your connection and try again."));
  if(S.editing) stopEdit();
  if(!S.DATA || S.DATA.id !== id) S.curStep = 1;
  S.DATA = LECTURES.find(l => l.id===id);
  expanded.add(id);
  S.recentIds = [id, ...S.recentIds.filter(x => x!==id)].slice(0,5);
  restoreDoc(); render(); window.scrollTo({top:0,behavior:"smooth"}); rememberLast();
  if(window.innerWidth <= 1100) toast("Opened: " + S.DATA.title);
}
/* moved to state.js: docTemplate */
export function restoreDoc(){ if(S.docTemplate && !document.getElementById("transcript")){ document.querySelector(".doc").innerHTML = S.docTemplate;
  $("editModeChk").checked = editMode; $("editModeChk").addEventListener("change", e => setEditMode(e.target.checked)); } }

