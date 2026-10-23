/* Entry module: start-up, helpers, modals, actions map, unsaved-change guard. Imports every other module; start-up runs on DOMContentLoaded. */
import { S } from "./state.js";
import { LECTURES, ensureLoaded, loadError, loadIndex } from "./content-loader.js";
import { COLORS, HINT_TYPES, PALETTE, chkMsg, codeStore, inline, plainText, renderContent, runDiagrams } from "./markdown.js";
import { getSteps, keysOf, splitSections } from "./sections.js";
import { restoreDoc, isDone, stepBadge, CHECK, doneBtn, doneCount, doneSet, expanded, keepSideScroll, openLecture, refreshTree, render, renderLectures, renderResources, revealActive, showAll, showStep, updateProgress } from "./nav.js";
import { CAN_WRITE, HIST_VIEW, STORE, TITLES, UID, historyModal, initStore, loadLocalResponses, persistSection, resetSection, saveProgress, saveResponses, sectionLabel } from "./store.js";
import { $ta, BLOCKS, blkListHtml, clearDraft, closeBlk, closeEditors, editMode, homeToolbar, initEditor, inlineCtx, insertLine, loadSection, offerDraft, openInline, preview, renderAdv, renderBlkMenu, setEditMode, setupEditor, taInsert, validateStep, wrapSel } from "./editor.js";
import { asDoc, asJson, asMd, asText, buildBundle, withAssetsInline } from "./export.js";
import { buildPrint, printHere, printModal } from "./print.js";
import { A4_TEMPLATES, buildA4 } from "./a4.js";
import { assistantDownload, assistantModal, assistantNotes, assistantOpen, assistantRun, assistantStop } from "./assistant.js";
import * as ns_content_loader_js from "./content-loader.js";
import * as ns_markdown_js from "./markdown.js";
import * as ns_sections_js from "./sections.js";
import * as ns_nav_js from "./nav.js";
import * as ns_store_js from "./store.js";
import * as ns_editor_js from "./editor.js";
import * as ns_export_js from "./export.js";

/* ---------- State ---------- */
/* moved to state.js: editing */
export const $ = id => document.getElementById(id);

/* ---------- Helpers ---------- */
export const esc = t => t.replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
export const slug = () => S.DATA.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

export function toast(msg){ const t=$("toast"); t.textContent=msg; t.classList.add("on");
  clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("on"),2200); }

export async function download(name, content, type){
  if(window.claude && window.claude.use){
    try {
      const dl = await window.claude.use("downloads");
      if(dl){ await dl.save({filename: name, data: content}); toast("Saved " + name); return; }
    } catch(e){ toast(e && e.code === "rejected_extension" ? "This file type can't be saved here" : "Download cancelled"); return; }
  }
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([content],{type})); a.download=name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href),1000); toast("Downloaded " + name);
}

/* ---------- Modals ---------- */
export function modal(html){ $("modal").innerHTML = html; $("overlay").classList.add("on");
  const f=$("modal").querySelector("input,select,textarea"); if(f) f.focus(); }
export function closeModal(){ $("overlay").classList.remove("on"); $("modal").classList.remove("wide", "pm"); $("modal").onchange = null; }
$("overlay").addEventListener("click", e => { if(e.target.id==="overlay") closeModal(); });
document.addEventListener("keydown", e => { if(e.key==="Escape") closeModal(); });

export function summaryText(){
  return "Summary (mock): " + esc(plainText(S.DATA.content).slice(0, 260)) + "...";
}

/* ---------- Actions ---------- */
export const actions = {
  async downloadResource(b){
    const file = b.dataset.file, name = file.split("/").pop();
    try {
      const r = await fetch(file); if(!r.ok) throw new Error(r.status);
      await download(name, await r.blob(), r.headers.get("content-type") || "application/octet-stream");
    } catch(e){ toast("Couldn't download " + name); }
  },
  async checkQuiz(b){
    const box = b.closest(".quiz"), key = box.dataset.quiz;
    if(box.classList.contains("multi")){
      const inputs = [...box.querySelectorAll(".quiz-opt input")], choices = inputs.map((i, j) => i.checked ? j : -1).filter(j => j >= 0);
      if(!choices.length) return toast("Pick at least one answer");
      const ok = inputs.every(i => i.checked === (i.dataset.ok === "1"));
      box.querySelectorAll(".quiz-opt").forEach((l, j) => { const inp = l.querySelector("input");
        l.classList.toggle("correct", inp.dataset.ok === "1"); l.classList.toggle("wrong", inp.checked && inp.dataset.ok !== "1"); });
      box.classList.add("answered");
      const fb = box.querySelector(".quiz-fb"); fb.textContent = ok ? "Correct" : "Not quite: the correct answers are highlighted"; fb.classList.toggle("bad", !ok);
      const ex = box.querySelector(".quiz-ex"); if(ex) ex.hidden = false;
      S.RESPONSES[key] = { choices, ok, at: Date.now() };
      try { await saveResponses(); } catch(e) {}
      return;
    }
    const sel = box.querySelector("input[type=radio]:checked");
    if(!sel) return toast("Pick an answer first");
    const choice = +sel.value, ok = sel.dataset.ok === "1";
    box.querySelectorAll(".quiz-opt").forEach((l, j) => { const inp = l.querySelector("input");
      l.classList.toggle("correct", inp.dataset.ok === "1"); l.classList.toggle("wrong", j === choice && !ok); });
    box.classList.add("answered");
    const fb = box.querySelector(".quiz-fb"); fb.textContent = ok ? "Correct" : "Not quite: the correct answer is highlighted"; fb.classList.toggle("bad", !ok);
    const ex = box.querySelector(".quiz-ex"); if(ex) ex.hidden = false;
    S.RESPONSES[key] = { choice, ok, at: Date.now() };
    try { await saveResponses(); } catch(e) {}
  },
  matchChip(b){ const box = b.closest(".match"), was = b.classList.contains("sel");
    box.querySelectorAll(".m-chip.sel").forEach(c => c.classList.remove("sel")); if(!was) b.classList.add("sel"); },
  matchSlot(b){ const box = b.closest(".match"), sel = box.querySelector(".m-chip.sel");
    if(sel && !b.contains(sel)) return matchPlace(box, sel, b);
    const cur = b.querySelector(".m-chip"); if(cur){ cur.classList.remove("sel"); matchPlace(box, cur, box.querySelector(".m-bank")); } },
  matchBank(b){ const sel = b.closest(".match").querySelector(".m-slot .m-chip.sel"); if(sel) matchPlace(b.closest(".match"), sel, b); },
  async checkMatch(b){
    const box = b.closest(".match"), slots = [...box.querySelectorAll(".m-slot")];
    const placed = slots.map(s => { const c = s.querySelector(".m-chip"); return c ? +c.dataset.v : -1; });
    if(placed.includes(-1)) return toast("Place every answer first");
    let n = 0; slots.forEach((s, i) => { const ok = placed[i] === i; if(ok) n++; s.classList.toggle("correct", ok); s.classList.toggle("wrong", !ok); });
    const all = n === slots.length, fb = box.querySelector(".quiz-fb");
    fb.textContent = all ? "These are the correct matches." : n + " of " + slots.length + " correct. Move the red ones and submit again.";
    fb.classList.toggle("bad", !all); box.classList.toggle("answered", all);
    S.RESPONSES[box.dataset.match] = { placed, ok: all, at: Date.now() };
    try { await saveResponses(); } catch(e) {}
  },
  async resetMatch(b){ const box = b.closest(".match"), bank = box.querySelector(".m-bank");
    box.querySelectorAll(".m-slot .m-chip").forEach(c => matchPlace(box, c, bank));
    box.querySelector(".quiz-fb").textContent = ""; box.classList.remove("answered");
    delete S.RESPONSES[box.dataset.match]; try { await saveResponses(); } catch(e) {} },
  async submitChecklist(b){
    const box = b.closest(".checklist"), key = box.dataset.chk, boxes = [...box.querySelectorAll(".chk-items input[type=checkbox]")];
    const checked = boxes.map((c, j) => c.checked ? j : -1).filter(j => j >= 0), all = boxes.length > 0 && checked.length === boxes.length;
    S.RESPONSES[key] = { checked, at: Date.now() };
    let where = "session"; try { where = await saveResponses(); } catch(e) {}
    const fb = box.querySelector(".quiz-fb");
    fb.textContent = chkMsg(checked.length, boxes.length) + (where === "account" ? "" : where === "browser" ? " (saved in this browser)" : " (this session only)");
    box.classList.toggle("answered", all);
    if(!all){ toast(checked.length + " of " + boxes.length + " done"); return; }
    const k = keysOf(S.DATA)[S.curStep-1], d = doneSet();
    if(k && !d.has(k)){
      d.add(k); saveProgress();
      const total = getSteps(S.DATA.content).length, p = document.querySelector(".pager .pdone"); if(p) p.outerHTML = doneBtn(total);
      const sec = document.querySelector("#transcript .sec:not(.intro)");
      if(sec && !sec.querySelector(".step-top")) sec.insertAdjacentHTML("afterbegin", "<div class='step-top'><span class='done-pill'>"+CHECK+"Completed</span></div>");
      updateProgress(); refreshTree();
    }
    toast("Step completed");
  },
  async saveResponse(b){
    const key = b.dataset.resp, box = b.closest(".response"), ta = box && box.querySelector("textarea.resp-ta"), st = box && box.querySelector(".resp-st");
    if(!ta) return;
    S.RESPONSES[key] = { text: ta.value, at: Date.now() };
    try { const where = await saveResponses();
      st.textContent = "Saved " + new Date().toLocaleString() + (where === "account" ? "" : where === "browser" ? " (in this browser)" : " (this session only)");
      toast("Answer saved"); }
    catch(e) { st.textContent = "Could not save. Copy your answer somewhere safe and try again."; toast("Could not save"); }
  },
  account(){ modal("<h3>Account</h3><p>Signed in as trainee@ai4free.local (training mock).</p><div class='row'><button class='btn' data-action='close'>Close</button></div>"); },
  openLecture(b){ openLecture(+b.dataset.id); },
  newLecture(){ modal("<h3>New Lecture</h3><label>Lecture title</label><input type='text' id='lecName' placeholder='e.g. Terraform Fundamentals'><div class='row'><button class='btn ghost' data-action='close'>Cancel</button><button class='btn' data-action='createLecture'>Create</button></div>"); },
  createLecture(){ const v=$("lecName").value.trim(); if(!v) return toast("Enter a lecture title");
    const id = Math.max(0, ...LECTURES.map(l=>l.id)) + 1;
    LECTURES.push({ id, title:v, created:new Date(), audioSize:"0 MB", content:"## Step 1: Title\n\nWrite the first teaching step here. Use **Edit Step** in the right panel.\n\n:::tip\nOpen **? Syntax** in the editor to see colors, hints and code blocks.\n:::" });
    LECTURES[LECTURES.length - 1].base = LECTURES[LECTURES.length - 1].content;
    closeModal(); openLecture(id); toast("Lecture created"); },

  print(){ if(!S.DATA) return; if(S.editing) return toast("Save or close the editor first"); modal(printModal()); $("modal").classList.add("wide", "pm");
    // The main button says what will happen: print, or save an editable A4 file.
    const go = $("pmGo"); $("modal").onchange = () => { const v = ($("modal").querySelector("input[name=pstyle]:checked") || {}).value; if(go) go.textContent = A4_TEMPLATES[v] ? "Save A4 file" : "Print"; }; },
  async doPrint(){
    const v = n => (document.querySelector("#modal input[name="+n+"]:checked") || {}).value;
    const scope = v("pscope") || "step", style = v("pstyle") || "friendly";
    if(A4_TEMPLATES[style]){ let page; try { page = await buildA4(scope, style); } catch(e) { return toast("Couldn't make the A4 file: " + ((e && e.message) || "unknown error")); }
      closeModal(); return download(slug() + (scope === "step" ? "-lecture-" + S.curStep : "") + "-" + (style === "a4simple" ? "a4-simple" : "a4-advanced") + ".html", page, "text/html"); }
    let html; try { html = await buildPrint(scope, style); } catch(e) { return toast("Couldn't make the print page: " + ((e && e.message) || "unknown error")); }
    closeModal();
    if(printHere(html)) return;
    toast("Saving a print file: open it and it prints itself");
    download(slug() + (scope === "step" ? "-lecture-" + S.curStep : "") + "-" + style + "-print.html", html, "text/html");
  },
  pdf(){ if(window.self !== window.top) return toast("Printing isn't available here. Use Download HTML, open it, and print to PDF."); window.print(); },
  docx(){ withAssetsInline(() => download(slug()+".doc", asDoc(), "application/msword")); },
  txt(){ withAssetsInline(() => download(slug()+".txt", asText(), "text/plain")); },
  advanced(){ modal("<h3>Advanced Export</h3><p>Choose a format and options.</p>"
    + "<label>Format</label><select id='axFmt'><option value='txt'>TXT</option><option value='docx'>DOCX</option><option value='md'>Markdown</option><option value='json'>JSON</option></select>"
       + "<div class='row'><button class='btn ghost' data-action='close'>Cancel</button><button class='btn' data-action='runAdvanced'>Export</button></div>"); },
  runAdvanced(){ const f=$("axFmt").value, n=slug();
    withAssetsInline(() => ({txt:()=>download(n+".txt",asText(),"text/plain"),
      docx:()=>download(n+".doc",asDoc(),"application/msword"),
      md:()=>download(n+".md",asMd(),"text/markdown"),
      json:()=>download(n+".json",asJson(),"application/json")})[f]()); closeModal(); },

  summary(){ if(!S.DATA) return; modal(assistantModal()); $("modal").classList.add("wide"); assistantOpen(); },
  aiRun(){ assistantRun(); },
  aiStop(){ assistantStop(); },
  aiDl(b){ assistantDownload(b.dataset.f); },
  aiNotes(){ assistantNotes(); },
  translate(){ const langs=["Arabic","French","German","Spanish","Turkish","Hindi","Japanese","Portuguese"];
    modal("<h3>Translate</h3><p>Pick a target language.</p><label>Language</label><select id='lang'>"+langs.map(l=>"<option>"+l+"</option>").join("")+"</select><div class='row'><button class='btn ghost' data-action='close'>Cancel</button><button class='btn' data-action='runTranslate'>Translate</button></div>"); },
  runTranslate(){ const l=$("lang").value; closeModal(); toast("Mock: translation to "+l+" queued"); },
  share(){ const url=location.href.split("#")[0]+"#transcript";
    modal("<h3>Share Lecture</h3><p>Anyone with this link can view it.</p><input type='text' id='shareUrl' readonly value='"+esc(url)+"'><div class='row'><button class='btn ghost' data-action='close'>Close</button><button class='btn' data-action='copyLink'>Copy link</button></div>"); },
  copyLink(){ const i=$("shareUrl"); i.select();
    (navigator.clipboard ? navigator.clipboard.writeText(i.value) : Promise.reject()).then(()=>toast("Link copied"),()=>{document.execCommand("copy");toast("Link copied");}); },

  toggleEditMode(){ setEditMode(!editMode); },
  blkMenu(){ const ta = $ta(); S.blkSavedSel = ta ? [ta.selectionStart, ta.selectionEnd] : null; S.blkGroup = "All"; renderBlkMenu(); $("blkMenu").hidden = false; $("blkSearch").focus(); },
  blkClose(){ closeBlk(); },
  blkGroup(b){ S.blkGroup = b.dataset.g; document.querySelectorAll(".blknav button").forEach(x => x.classList.toggle("on", x === b)); $("blkList").innerHTML = blkListHtml($("blkSearch").value); },
  insBlock(b){ const blk = BLOCKS.find(x => x.k === b.dataset.k); $("blkMenu").hidden = true; if(!blk) return;
    const ta = $ta(); ta.focus(); if(S.blkSavedSel) ta.setSelectionRange(S.blkSavedSel[0], S.blkSavedSel[1]); if(blk.inl){ taInsert(ta, blk.inl, ta.selectionStart, ta.selectionEnd); ta.focus(); preview(); return; }
    const sel = ta.value.slice(ta.selectionStart, ta.selectionEnd).trim() || "Your text here";
    insertLine(blk.t.split("$SEL").join(sel) + "\n"); },
  ctab(b){ const box = b.closest(".ctabs"); if(!box) return; const j = +b.dataset.j;
    box.querySelectorAll(".ctab-bar button").forEach((x, k) => x.classList.toggle("on", k === j));
    box.querySelectorAll(".ctab-p").forEach((x, k) => x.hidden = k !== j); },
  inlineEdit(b){ openInline(+b.dataset.idx, +b.dataset.p); },
  inlineCancel(){ if(!inlineCtx) return; const changed = $("ita").value.replace(/\s+$/, "") + "\n" !== inlineCtx.start; closeEditors(); render(); if(changed) toast("Changes discarded"); },
  async inlineSave(){
    if(!inlineCtx) return;
    const c = inlineCtx, val = $("ita").value.replace(/\s+$/, "");
    const parts = c.parts.slice(); parts[c.p] = val;
    const md = parts.join("\n").replace(/\s+$/, "") + "\n";
    const err = validateStep(md, c.idx); if(err) return toast(err);
    if(c.p > 0 && /^\s*##\s/m.test(val.split("```")[0]) && !/^\s*###/m.test(val)) return toast("Use ### for a section heading inside a step");
    const l = LECTURES.find(x => x.id === c.lec);
    closeEditors();
    if(md === c.full){ render(); return toast("No changes to save"); }
    await persistSection(l, c.idx, md, c.full, "Section saved");
    render(); },
  edit(){ actions.advOpen(); },
  advOpen(){
    if(!S.DATA) return; if(inlineCtx) return toast("Save or cancel the open section first"); if(S.advOpenNow) return;
    const secs = splitSections(S.DATA.content), total = secs.length - 1;
    S.editIdx = total ? Math.min(Math.max(1, S.curStep), total) : 0;
    const opts = []; if(secs[0].trim()) opts.push(0); for(let i = 1; i <= total; i++) opts.push(i);
    if(!opts.includes(S.editIdx)) S.editIdx = opts[0] || 0;
    $("secSel").innerHTML = opts.map(i => "<option value='" + i + "'>" + esc(sectionLabel(S.DATA, i)) + "</option>").join("");
    $("secSel").value = String(S.editIdx);
    S.editing = true; S.advOpenNow = true; S.activeTA = $("src"); homeToolbar(); S.discardArmed = 0;
    $("adv").classList.add("on"); document.body.style.overflow = "hidden";
    loadSection(); renderAdv(); $("src").focus(); offerDraft(); },
  advTab(b){ S.advTab = b.dataset.t; document.querySelectorAll(".tabs button").forEach(x => x.classList.toggle("on", x === b)); renderAdv(); },
  async advSave(){
    if(!S.advOpenNow) return;
    const md = $("src").value.replace(/\s+$/, "") + "\n";
    const err = validateStep(md, S.editIdx); if(err) return toast(err);
    if(md === S.editStart){ closeEditors(); render(); return toast("No changes to save"); }
    const l = S.DATA, idx = S.editIdx, prev = S.editStart;
    closeEditors();
    await persistSection(l, idx, md, prev, "All changes saved");
    if(idx > 0) S.curStep = idx;
    render(); },
  advDiscard(){
    if(!S.advOpenNow) return;
    const dirty = $("src").value.replace(/\s+$/, "") + "\n" !== S.editStart;
    if(dirty && Date.now() - S.discardArmed > 3000){ S.discardArmed = Date.now(); return toast("Click Discard again to drop your changes"); }
    closeEditors(); render(); if(dirty) toast("Changes discarded"); },
  history(){ historyModal(); },
  async restoreRev(b){ const r = HIST_VIEW[+b.dataset.i]; if(!r) return; closeModal(); if(inlineCtx) S.editIdx = inlineCtx.idx;
    const l = S.DATA, idx = S.editIdx, prev = splitSections(l.content)[idx] || "";
    if(S.editing) stopEdit();
    await persistSection(l, idx, r.md, prev, "Earlier version restored"); render(); },
  async resetSec(){ closeModal(); if(inlineCtx) S.editIdx = inlineCtx.idx; const l = S.DATA, idx = S.editIdx; if(S.editing) stopEdit(); await resetSection(l, idx); render(); },
  downloadHtml(){ if(S.editing) return toast("Save or close the editor first");
    toast("Preparing the offline copy…");
    buildBundle().then(html => download("ai4free-lectures-v3.html", html, "text/html"), e => toast("Couldn't make the offline copy: " + ((e && e.message) || "unknown error"))); },
  fmt(b){ wrapSel(b.dataset.w, b.dataset.w); },
  ins(b){ insertLine(b.dataset.t); },
  cheat(){ modal("<h3>Content syntax</h3><div class='cheat'><table>"
    + [["Heading","## Step 1"],["Bold / italic / underline","**bold**  *italic*  __under__"],["Highlight","==text=="],["Strike","~~text~~"],["Inline code","`npm test`"],
       ["Text color","{red|text}  {#e11d48|text}"],["Background","{bg-yellow|text}  {red bg-yellow|text}"],["Colors",COLORS.join(", ")],
       ["Callout","::: tip Optional title<br>content<br>:::"],["Callout types",Object.keys(HINT_TYPES).join(", ")],["Custom callout","::: note {color=purple icon=rocket} Title"],
       ["Collapsible","::: answer / ::: solution / ::: details {open} Title"],["Quote with author","::: quote Author, Source"],["Key statement","::: statement"],
       ["Code tabs","::: tabs + several ``` fences with title=\"...\""],["Highlight / numbers","```python {2,4-5} numbers"],["Terminal / diff / tree","```terminal  ```diff  ```tree"],
       ["Steps / cards","::: steps or ::: cards with - items"],["Do / Don't, Before / After","::: dodont or ::: compare, split with ---"],["Checklist","- [ ] item   - [x] done"],
       ["Keyboard / badge","[[Ctrl]]   [!New|green]"],["Image caption","![alt](url \"Caption\")"],["Diagram","```mermaid"],
       ["Code block","```bash title=\"file.sh\"<br>code<br>```"],["Lists","- item    1. item"],["Quote","&gt; text"],["Divider","---"],["Link / image","[text](url)  ![alt](url)"]]
      .map(r => "<tr><td><b>"+r[0]+"</b></td><td><code>"+r[1]+"</code></td></tr>").join("") + "</table></div><div class='row'><button class='btn' data-action='close'>Close</button></div>");
    $("modal").classList.add("wide"); },
  goStep(b){ const lid = +b.dataset.lec, n = +b.dataset.n;
    const go = () => { showStep(n); if(window.innerWidth <= 760) setDrawer(false); };
    if(!S.DATA || S.DATA.id !== lid){ const p = openLecture(lid); if(p) return p.then(() => { if(S.DATA && S.DATA.id === lid) go(); }); }
    go(); },
  toggleMore(b){ const id = +b.dataset.id; showAll.has(id) ? showAll.delete(id) : showAll.add(id); keepSideScroll(renderLectures); revealActive(); },
  toggleDone(){ const d = doneSet(), total = getSteps(S.DATA.content).length, key = keysOf(S.DATA)[S.curStep-1];
    if(!key) return;
    if(d.has(key)){ d.delete(key); saveProgress(); toast("Marked as not complete"); showStep(S.curStep); return; }
    d.add(key); saveProgress();
    if(doneCount(S.DATA) === total){ toast("All steps complete. Great work!"); showStep(S.curStep); }
    else if(S.curStep < total){ toast("Step completed"); showStep(S.curStep + 1); }
    else { toast("Step completed"); showStep(S.curStep); } },
  toggleRes(){ $("resAll").hidden = !$("resAll").hidden; renderResources(); },
  stepBy(b){ showStep(S.curStep + (+b.dataset.d)); },
  toggleTree(b){ const id = +b.dataset.id; expanded.has(id) ? expanded.delete(id) : expanded.add(id); renderLectures(); },
  copyCode(b){ const c = (codeStore[+b.dataset.i] || "").replace(/\u200b/g, "");
    (navigator.clipboard ? navigator.clipboard.writeText(c) : Promise.reject()).then(() => toast("Code copied"), () => toast("Copy not available")); },

  audio(){ toast("Mock: audio file ("+S.DATA.audioSize+") not included in training build"); },
  rename(){ modal("<h3>Rename File</h3><label>Title</label><input type='text' id='newTitle' value='"+esc(S.DATA.title)+"'><div class='row'><button class='btn ghost' data-action='close'>Cancel</button><button class='btn' data-action='saveRename'>Save</button></div>"); },
  async saveRename(){ const v=$("newTitle").value.trim(); if(!v) return toast("Title cannot be empty");
    const l = S.DATA; TITLES[l.id] = v; l.title = v; render(); closeModal();
    if(STORE && CAN_WRITE){ try { await STORE.doc("titles/L" + l.id).set({ lec: l.id, title: v, at: Date.now(), by: UID || "" }); toast("Renamed"); } catch(e){ toast("Renamed in this session only"); } }
    else toast("Renamed (this session only)"); },
  delete(){ modal("<h3>Delete File</h3><p>This permanently deletes the transcript and its audio. This cannot be undone.</p><div class='row'><button class='btn ghost' data-action='close'>Cancel</button><button class='btn red' data-action='confirmDelete'>Delete</button></div>"); },
  confirmDelete(){ closeModal(); const gone=S.DATA.title;
    LECTURES.splice(LECTURES.indexOf(S.DATA),1); S.recentIds = S.recentIds.filter(id => id!==S.DATA.id);
    const next = LECTURES.find(l => l.id===S.recentIds[0]) || LECTURES[LECTURES.length-1];
    if(next){ openLecture(next.id); }
    else { S.DATA=null; renderLectures(); document.querySelector(".doc").innerHTML="<h1>No lectures</h1><p class='date'>Use New Lecture in the left panel to create one.</p>"; }
    toast("Deleted: " + gone); },

  nextLesson(){ toast("Mock: link this button to your next lesson"); },
  toggleDrawer(){ setDrawer(document.body.classList.contains("drawer-closed")); },
  close: closeModal,
  async openReference(){ await openReference(); },
  closeReference(){ closeReference(); },
  openHome(b){ openHome(+b.dataset.id); },
  homeToggle(b){ const m = b.closest(".ch-mod"), open = !m.classList.contains("open"); m.classList.toggle("open", open);
    b.setAttribute("aria-expanded", open); m.querySelector(".ch-hide").firstChild.textContent = open ? "Hide Lessons" : "Show Lessons"; }
};
/* ---------- Matching quiz (::: match): move a chip into a slot (drag and drop, or click the chip then the slot) ---------- */
function matchPlace(box, chip, target){
  chip.classList.remove("sel");
  const bank = box.querySelector(".m-bank");
  if(target.classList.contains("m-slot")){
    const cur = target.querySelector(".m-chip"); if(cur && cur !== chip) bank.appendChild(cur);
    const from = chip.parentElement; target.innerHTML = ""; target.appendChild(chip);
    if(from && from.classList.contains("m-slot") && !from.querySelector(".m-chip")) from.innerHTML = "<span class='m-ph'>Drop answer here</span>";
  } else {
    const from = chip.parentElement; bank.appendChild(chip);
    if(from && from.classList.contains("m-slot")) from.innerHTML = "<span class='m-ph'>Drop answer here</span>";
  }
  box.querySelectorAll(".m-slot").forEach(s => s.classList.remove("correct", "wrong"));
  const fb = box.querySelector(".quiz-fb"); if(fb){ fb.textContent = ""; fb.classList.remove("bad"); } box.classList.remove("answered");
}
let dragChip = null;
document.addEventListener("dragstart", e => { const c = e.target.closest && e.target.closest(".m-chip"); if(!c) return; dragChip = c; c.classList.add("dragging");
  try { e.dataTransfer.setData("text/plain", c.dataset.v); e.dataTransfer.effectAllowed = "move"; } catch(x) {} });
document.addEventListener("dragend", () => { if(dragChip) dragChip.classList.remove("dragging"); dragChip = null; document.querySelectorAll(".m-over").forEach(x => x.classList.remove("m-over")); });
document.addEventListener("dragover", e => { const t = dragChip && e.target.closest && e.target.closest(".m-slot,.m-bank"); if(!t || t.closest(".match") !== dragChip.closest(".match")) return;
  e.preventDefault(); document.querySelectorAll(".m-over").forEach(x => x !== t && x.classList.remove("m-over")); t.classList.add("m-over"); });
document.addEventListener("drop", e => { const t = dragChip && e.target.closest && e.target.closest(".m-slot,.m-bank"); if(!t || t.closest(".match") !== dragChip.closest(".match")) return;
  e.preventDefault(); t.classList.remove("m-over"); matchPlace(t.closest(".match"), dragChip, t); });
/* ---------- Reference page (top menu): every UI element, rendered live from lectures/reference.md ---------- */
let REF_MD = null;
export async function openReference(){
  if(!REF_MD){
    try { const r = await fetch("lectures/reference.md", { cache: "no-cache" }); if(!r.ok) throw new Error(r.status); REF_MD = await r.text(); }
    catch(e){ return toast("Couldn't load the Reference page"); }
  }
  S.HOME = false; S.REF = true;
  const doc = document.querySelector(".doc");
  const body = renderContent(REF_MD);
  doc.innerHTML = "<div class='ref-top'><button class='btn ghost sm' data-action='closeReference'>&larr; Back to lectures</button></div>"
    + "<h1 id='title'>Reference</h1><div class='date' id='date'>Every element of the AI4Free Lectures app: what it is, how it looks, and how to use or write it.</div>"
    + "<nav class='ref-toc' id='refToc' aria-label='Reference sections'></nav><div class='transcript ref-body' id='refBody'>" + body + "</div>";
  refWidgets(doc);
  const toc = $("refToc");
  doc.querySelectorAll("#refBody h2").forEach((h, j) => { h.id = "ref-" + (j + 1); const a = document.createElement("a"); a.href = "#"; a.dataset.action = "refJump"; a.dataset.to = h.id; a.textContent = h.textContent; toc.appendChild(a); });
  document.title = "Reference | AI4Free";
  $("resBox").hidden = true;
  const link = $("refLink"); if(link) link.classList.add("on");
  window.scrollTo({ top: 0 }); setTimeout(runDiagrams, 0);
}
// Live UI samples for the Reference page: {{ui-buttons}} and {{ui-colors}} paragraphs become real, inert elements.
const CHECK_SVG = "<svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.8' stroke-linecap='round' stroke-linejoin='round'><path d='m5 12.5 4.5 4.5L19 7.5'/></svg>";
const DL_SVG = "<svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3.5v11'/><path d='m7.5 10 4.5 4.5 4.5-4.5'/><path d='M4 15.5v3A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5v-3'/></svg>";
function refTable(head, rows){
  return "<div class='tbl ref-ui'><table><thead><tr>" + head.map(h => "<th>" + h + "</th>").join("") + "</tr></thead><tbody>"
    + rows.map(r => "<tr>" + r.map(c => "<td>" + c + "</td>").join("") + "</tr>").join("") + "</tbody></table></div>";
}
function refWidgets(root){
  const code = c => "<code>" + c + "</code>";
  const buttons = [
    ["<button type='button' class='btn' tabindex='-1'>Create</button>", code("btn"), "Primary action in dialogs: Create, Save, Copy link, Translate"],
    ["<button type='button' class='btn ghost' tabindex='-1'>Cancel</button>", code("btn ghost"), "Secondary action: Cancel, Close"],
    ["<button type='button' class='btn sm' tabindex='-1'>Submit</button>", code("btn sm"), "Small primary: quiz Submit, answer Save"],
    ["<button type='button' class='btn ghost sm' tabindex='-1'>&larr; Back to lectures</button>", code("btn ghost sm"), "Small secondary: Advanced editor, History, Discard, Back to lectures"],
    ["<button type='button' class='btn sm save' tabindex='-1'>Save all</button>", code("btn sm save"), "Save in the editor"],
    ["<button type='button' class='btn red' tabindex='-1'>Delete</button>", code("btn red"), "Destructive confirm: Delete"],
    ["<button type='button' class='btn-done' tabindex='-1'>" + CHECK_SVG + "Mark complete &amp; continue</button>", code("btn-done"), "Pager: mark the step done"],
    ["<button type='button' class='btn-done is-done' tabindex='-1'>" + CHECK_SVG + "Completed <span class='undo'>&middot; Undo</span></button>", code("btn-done is-done"), "Pager: step already done"],
    ["<nav class='pnav ref-pnav'><button type='button' class='pg next' tabindex='-1'><span class='pt'><small>Next</small><span>2. Create the repo</span></span><span class='pa'><svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><path d='m9 6 6 6-6 6'/></svg></span></button></nav>", code("pg next") + " / " + code("pg prev"), "Pager: previous and next step"],
    ["<button type='button' class='item newlec' tabindex='-1'>+ New Lecture</button>", code("item newlec"), "Left panel: create a session"],
    ["<button type='button' class='tmore' tabindex='-1'>Show more (12)</button>", code("tmore"), "Left panel: show all steps of a long session"],
    ["<div class='menu ref-menu'><button type='button' class='act' tabindex='-1'>" + DL_SVG + "<span class='t'>Advanced Export<small>Export in more formats</small></span></button></div>", code("act"), "Right panel: every Export and More control"],
    ["<div class='menu ref-menu'><button type='button' class='act act-switch' tabindex='-1'><span class='mini-sw' aria-hidden='true'></span><span class='t'>Edit mode<small>Pencil on each section</small></span></button></div>", code("act act-switch"), "Right panel: on/off control"],
    ["<label class='switch'><input type='checkbox' tabindex='-1'><span class='sl' aria-hidden='true'></span><span>Edit mode</span></label>", code("switch"), "Switch above the lecture"],
    ["<div class='tb ref-tb'><button type='button' tabindex='-1'><b>B</b></button><button type='button' tabindex='-1'><i>I</i></button><button type='button' tabindex='-1'><u>U</u></button><button type='button' class='ins' tabindex='-1'>+ Insert block</button></div>", code("tb button") + " / " + code("ins"), "Editor toolbar"],
    ["<div class='code ref-copy'><button type='button' class='copy' tabindex='-1'>Copy</button></div>", code("copy"), "Copy button on every code block"],
    ["<a class='rlink' tabindex='-1'>" + DL_SVG + "<span>gitignore.txt<small>TXT file &middot; 1 KB</small></span></a>", code("rlink") + " / " + code("rlink rfile"), "Right panel: resource link or file"],
    ["<span class='ref-toc ref-chip'><a tabindex='-1'>6. Callouts</a></span>", code("ref-toc a"), "Reference page: section chips"]
  ];
  const sw = hex => "<span class='ref-sw' style='background:" + hex + "' title='" + hex + "'></span>";
  const colors = COLORS.map(c => [
    "<b>" + c + "</b>",
    PALETTE[c].map(sw).join("") + "<div class='ref-hex'>" + PALETTE[c].join(" ") + "</div>",
    inline("{" + c + "|Text color}"),
    inline("{bg-" + c + "|Background}"),
    inline("[!" + c + "|" + c + "]")
  ]);
  const tokens = [["--brand", "#364759", "Top bar, active items, primary buttons"], ["--brand-dark", "#2a3644", "Primary button hover"], ["--brand-soft", "#e9edf2", "Hover and active backgrounds"],
    ["--text", "#1f2937", "Body text"], ["--heading", "#374151", "Headings"], ["--muted", "#6b7280", "Secondary text"], ["--border", "#e5e7eb", "Borders and dividers"],
    ["--danger", "#dc2626", "Delete and errors"], ["success", "#16a34a", "Mark complete, Save, correct answers"]]
    .map(t => [code(t[0]), sw(t[1]) + " " + t[1], t[2]]);
  root.querySelectorAll("p").forEach(p => {
    const k = p.textContent.trim();
    if(k === "{{ui-buttons}}") p.outerHTML = refTable(["Live", "Classes", "Used for"], buttons);
    else if(k === "{{ui-colors}}") p.outerHTML = refTable(["Color", "Shades (light, border, main, dark)", "Text", "Background", "Badge"], colors);
    else if(k === "{{ui-tokens}}") p.outerHTML = refTable(["Token", "Value", "Used for"], tokens);
  });
}
export function closeReference(){
  if(!S.REF) return;
  S.REF = false; const link = $("refLink"); if(link) link.classList.remove("on");
  restoreDoc(); render(); window.scrollTo({ top: 0 });
}
/* ---------- Course Home: first page of a session that has "home" in index.json (modules and lessons with real progress) ---------- */
const CH_CYCLE = ["blue", "teal", "indigo", "purple", "green", "pink", "amber"];
const RING_C = 2 * Math.PI * 42;
const ring = (pct, label, cls) => "<div class='ch-ring "+cls+"' role='progressbar' aria-valuemin='0' aria-valuemax='100' aria-valuenow='"+pct+"'>"
  + "<svg viewBox='0 0 100 100'><circle cx='50' cy='50' r='42' class='tr'/>"+(pct ? "<circle cx='50' cy='50' r='42' class='ind' stroke-dasharray='"+(pct/100*RING_C).toFixed(2)+" "+RING_C.toFixed(2)+"'/>" : "")+"</svg><div class='lab'>"+label+"</div></div>";
const CLOCK = "<svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round'><circle cx='12' cy='12' r='8.5'/><path d='M12 7.5V12l3 3'/></svg>";
const LESSON_ICO = "<svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'><rect x='5' y='3.5' width='14' height='17' rx='1.5'/><path d='M8.5 3.5v17M11.5 8.5h4M11.5 12h2.5'/></svg>";
const PROJECT_ICO = "<svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'><path d='M14.5 6.5a3.5 3.5 0 0 0 4.6 4.6l-8.2 8.2a2 2 0 0 1-2.8-2.8z'/><path d='m4 4 5 5'/></svg>";
const PLAY = "<svg width='22' height='22' viewBox='0 0 24 24' fill='currentColor'><path d='M9 7.5v9a.6.6 0 0 0 .9.5l7.2-4.5a.6.6 0 0 0 0-1L9.9 7a.6.6 0 0 0-.9.5z'/></svg>";
const CHEV = "<svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><path d='m6 15 6-6 6 6'/></svg>";
export async function openHome(id){
  const l = LECTURES.find(x => x.id === id); if(!l || !l.home) return;
  try { await ensureLoaded(l); } catch(e){ return toast("Couldn't load this lecture. Check your connection and try again."); }
  if(S.REF){ S.REF = false; const link = $("refLink"); if(link) link.classList.remove("on"); }
  if(!S.DATA || S.DATA.id !== id) openLecture(id);
  S.HOME = true; renderHome();
}
export function renderHome(){
  const l = S.DATA, h = l.home, steps = getSteps(l.content), total = steps.length;
  const idxOf = b => steps.findIndex((t, i) => stepBadge(t, i, steps) === String(b));
  const all = total ? Math.round(doneCount(l) / total * 100) : 0;
  let resumeSet = false, num = 0;
  const lesson = ls => {
    num++;
    const idx = (ls.steps || []).map(idxOf).filter(i => i >= 0), done = idx.filter(i => isDone(l, i + 1)).length;
    const pct = idx.length ? Math.round(done / idx.length * 100) : 0, isProj = ls.type === "Project";
    const next = idx.find(i => !isDone(l, i + 1)), go = idx.length ? (next !== undefined ? next : idx[0]) + 1 : 0;
    const resume = !!idx.length && pct < 100 && !resumeSet; if(resume) resumeSet = true;
    const badge = pct === 100 ? "<span class='ch-badge ok'>Complete</span>" : (ls.remaining ? "<span class='ch-badge'>" + CLOCK + " " + esc(ls.remaining) + "</span>" : "");
    const pal = PALETTE[isProj ? "orange" : CH_CYCLE[(num - 1) % CH_CYCLE.length]];
    return "<article class='ch-item" + (isProj ? " proj" : "") + (pct === 100 ? " is-done" : "") + "' style='--cl:" + pal[0] + ";--cb:" + pal[1] + ";--cm:" + pal[2] + ";--cd:" + pal[3] + "'>"
      + "<div class='ch-type'><span>" + (isProj ? PROJECT_ICO : LESSON_ICO) + " <strong>" + esc(ls.type || "Lesson") + "</strong></span>" + (ls.status ? "<span class='ch-status'>" + esc(ls.status) + "</span>" : "") + "</div>"
      + "<div class='ch-body'><div class='ch-num'>" + ring(pct, num, "sm") + badge + "</div>"
      + "<div class='ch-txt'><h3>" + esc(ls.title) + "</h3><p>" + esc(ls.description) + "</p></div><div class='ch-foot'>"
      + (go ? "<button class='ch-go" + (resume ? " resume" : "") + "' data-action='goStep' data-lec='" + l.id + "' data-n='" + go + "' aria-label='Resume " + esc(ls.type || "Lesson") + " " + num + "'><span class='ic'>" + PLAY + "</span>" + (resume ? "<span>Resume</span>" : "") + "</button>"
            : "<span class='ch-go off' title='Not linked to lectures yet'><span class='ic'>" + PLAY + "</span></span>")
      + "</div></div></article>";
  };
  const mod = (m, j) => "<div class='ch-mod open'>"
    + "<button class='ch-mod-btn' data-action='homeToggle' aria-expanded='true' aria-controls='chList" + j + "'>"
    + "<span class='ch-caret' aria-hidden='true'>" + CHEV + "</span><h2>" + esc(m.title) + "</h2><p>" + esc(m.description) + "</p>"
    + "<span class='ch-hide'>Hide Lessons" + CHEV + "</span>"
    + (m.project ? "<span class='ch-proj'><span>" + PROJECT_ICO + "<strong>Project:</strong> " + esc(m.project) + "</span>" + (m.status ? "<span class='ch-status'>" + esc(m.status) + "</span>" : "") + "</span>" : "")
    + "</button><div class='ch-list' id='chList" + j + "'>" + (m.lessons || []).map(lesson).join("") + "</div></div>";
  const doc = document.querySelector(".doc");
  doc.innerHTML = "<h1 id='title'>" + esc(l.title) + "</h1><div class='date' id='date'>Course Home</div>"
    + "<div class='ch'><div class='ch-head'><div class='ch-course'>" + ring(all, all + "%", "lg") + "<span>" + esc(h.label || "") + "</span></div>"
    + (h.estimate ? "<span class='ch-badge'>" + CLOCK + " " + esc(h.estimate) + "</span>" : "") + "</div>"
    + (h.modules || []).map(mod).join("") + "</div>";
  document.title = l.title + " | AI4Free";
  $("resBox").hidden = true;
  renderLectures(); updateProgress(); window.scrollTo({ top: 0 });
}
export function closeHome(){ if(!S.HOME) return; S.HOME = false; restoreDoc(); render(); }
actions.refJump = b => { const t = document.getElementById(b.dataset.to); if(t) t.scrollIntoView({ behavior: "smooth", block: "start" }); };
// Actions that only make sense on a lecture: leave the Reference page first, then run them.
const LEAVE_REF = ["goStep","stepBy","openLecture","toggleDone","nextLesson","newLecture","rename","delete","toggleEditMode","advOpen","pdf","print","docx","txt","downloadHtml","advanced","summary","translate","share","audio","toggleRes","downloadResource"];
export function stopEdit(){ closeEditors(); render(); }
/* ---------- Unsaved-change guard ---------- */
export const GUARDED = ["goStep","stepBy","openLecture","toggleDone","nextLesson","newLecture","rename","delete","toggleEditMode"];
export function isDirty(){
  if(inlineCtx && $("ita")) return $("ita").value.replace(/\s+$/, "") + "\n" !== inlineCtx.start;
  if(S.advOpenNow) return $("src").value.replace(/\s+$/, "") + "\n" !== S.editStart;
  return false;
}
export let pendingNav = null;
export function guardEdit(next){
  if(!S.editing) return next();
  if(!isDirty()){ closeEditors(); render(); return next(); }
  pendingNav = next;
  modal("<h3>Unsaved changes</h3><p>This section has changes that are not saved yet.</p><div class='row'><button class='btn ghost' data-action='guardKeep'>Keep editing</button><button class='btn ghost' data-action='guardDiscard'>Discard</button><button class='btn' data-action='guardSave'>Save and continue</button></div>");
}
Object.assign(actions, {
  guardKeep(){ pendingNav = null; closeModal(); const ta = $ta(); if(ta) ta.focus(); },
  guardDiscard(){ closeModal(); const n = pendingNav; pendingNav = null; closeEditors(); render(); toast("Changes discarded"); if(n) n(); },
  async guardSave(){ closeModal(); const n = pendingNav; pendingNav = null;
    await (inlineCtx ? actions.inlineSave() : actions.advSave());
    if(!S.editing && n) n(); },
  draftRestore(){ const ta = $ta(); if(!ta || !S.draftPending) return; ta.value = S.draftPending.text; S.draftPending = null;
    const db = document.querySelector(".draftbar"); if(db) db.remove(); ta.dispatchEvent(new Event("input")); ta.focus(); toast("Draft restored"); },
  draftDismiss(){ clearDraft(); S.draftPending = null; const db = document.querySelector(".draftbar"); if(db) db.remove(); const ta = $ta(); if(ta) ta.focus(); }
});
initEditor();
document.addEventListener("DOMContentLoaded", async () => {
document.addEventListener("click", e => {
  const b=e.target.closest("[data-action]"); if(!b) return;
  e.preventDefault(); const a=b.dataset.action, fn=actions[a];
  if(!S.DATA && !['newLecture','createLecture','close','toggleDrawer','account'].includes(a)) return toast("Create a lecture first");
  if(S.REF && LEAVE_REF.includes(a)) closeReference();
  if(S.HOME && LEAVE_REF.includes(a)) closeHome();
  if(fn){ if(S.editing && GUARDED.includes(a)) return guardEdit(() => fn(b)); fn(b); }
});
window.addEventListener("beforeunload", e => { if(S.editing && isDirty()){ e.preventDefault(); e.returnValue = ""; } });
document.addEventListener("keydown", e => {
  if(!S.REF && !S.HOME && !S.editing && S.DATA && !$("overlay").classList.contains("on") && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)){
    const total = splitSections(S.DATA.content).length - 1;
    if(e.key==="ArrowRight" && S.curStep < total) showStep(S.curStep+1);
    if(e.key==="ArrowLeft" && S.curStep > 1) showStep(S.curStep-1);
  }
  if(e.key==="Enter" && $("overlay").classList.contains("on") && e.target.tagName==="INPUT"){
    const primary=$("modal").querySelector(".row .btn:last-child"); if(primary) primary.click(); }
});

setDrawer(window.innerWidth > 760);
S.docTemplate = document.querySelector(".doc").innerHTML;
setupEditor();
try {
  await loadIndex();
  // Start where this browser left off; otherwise open the newest lecture.
  let last = null; try { last = JSON.parse(localStorage.getItem("ai4f-last") || "null"); } catch(e) {}
  const newest = [...LECTURES].sort((x, y) => y.created - x.created)[0];
  S.DATA = (last && LECTURES.find(l => l.id === last.id)) || newest || null;
  await ensureLoaded(S.DATA);
  if(S.DATA && last && last.id === S.DATA.id){ const total = splitSections(S.DATA.content).length - 1; S.curStep = Math.min(Math.max(1, +last.step || 1), Math.max(1, total)); }
}
catch(e){ document.documentElement.classList.add("lec-ready"); document.querySelector(".doc").innerHTML = "<h1>Lectures not loaded</h1><p class='date'>" + loadError() + "</p>"; return; }
if(S.DATA) expanded.add(S.DATA.id);

loadLocalResponses();   // saved answers from this browser, before the first render
render();
document.documentElement.classList.add("lec-ready");
initStore();
});
export function setDrawer(open){
  document.body.classList.toggle("drawer-closed", !open);
  const t=$("drawerTab"); t.setAttribute("aria-expanded", open);
  t.title = t.ariaLabel = open ? "Hide panel" : "Show panel";
}

// Read-only view of module values for the browser console and automated checks (window.ai4f.DATA, ai4f.openLecture(3), ...).
const ai4f = {};
for (const ns of [ns_content_loader_js, ns_markdown_js, ns_sections_js, ns_nav_js, ns_store_js, ns_editor_js, ns_export_js]) for (const k of Object.keys(ns)) Object.defineProperty(ai4f, k, { get: () => ns[k], enumerable: true });
for (const k of ["openReference", "closeReference", "$", "esc", "slug", "toast", "download", "modal", "closeModal", "summaryText", "actions", "stopEdit", "GUARDED", "isDirty", "pendingNav", "guardEdit", "setDrawer"]) Object.defineProperty(ai4f, k, { get: () => ({ $, esc, slug, toast, download, modal, closeModal, summaryText, actions, stopEdit, GUARDED, isDirty, pendingNav, guardEdit, setDrawer })[k], enumerable: true });
for (const k of Object.keys(S)) Object.defineProperty(ai4f, k, { get: () => S[k], enumerable: true });
window.ai4f = Object.freeze(ai4f);
