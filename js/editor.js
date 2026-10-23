/* Edit mode: insert-block library, inline and advanced editor, toolbar, drafts. */
import { S } from "./state.js";
import { $, actions, esc, guardEdit, toast } from "./app.js";
import { COLORS, renderBlocks, svgIcon } from "./markdown.js";
import { splitParts, splitSections, stepTok } from "./sections.js";
import { render } from "./nav.js";
import { keyAt } from "./store.js";
/* ---------- Insert block library ---------- */
export const BLOCKS = [
  { g:"Callouts", k:"objective", d:"What learners will be able to do", i:"objective", l:"Learning objective", t:"::: objective\n$SEL\n:::" },
  { g:"Callouts", k:"prereq", d:"What to install or know first", i:"prereq", l:"Prerequisites", t:"::: prereq\n$SEL\n:::" },
  { g:"Callouts", k:"info", d:"Neutral background information", i:"info", l:"Info", t:"::: info\n$SEL\n:::" },
  { g:"Callouts", k:"tip", d:"A shortcut or smarter way", i:"tip", l:"Tip", t:"::: tip\n$SEL\n:::" },
  { g:"Callouts", k:"important", d:"Something not to skip", i:"important", l:"Important", t:"::: important\n$SEL\n:::" },
  { g:"Callouts", k:"best", d:"The recommended approach", i:"best", l:"Best practice", t:"::: best\n$SEL\n:::" },
  { g:"Callouts", k:"mistake", d:"A frequent error to avoid", i:"mistake", l:"Common mistake", t:"::: mistake\n$SEL\n:::" },
  { g:"Callouts", k:"warning", d:"Risky step, proceed with care", i:"warning", l:"Warning", t:"::: warning\n$SEL\n:::" },
  { g:"Callouts", k:"danger", d:"Can break things or leak data", i:"danger", l:"Danger", t:"::: danger\n$SEL\n:::" },
  { g:"Callouts", k:"definition", d:"Explain a term", i:"definition", l:"Definition", t:"::: definition Term\n$SEL\n:::" },
  { g:"Callouts", k:"takeaway", d:"The one thing to remember", i:"takeaway", l:"Key takeaway", t:"::: takeaway\n$SEL\n:::" },
  { g:"Callouts", k:"exercise", d:"A task for the learner", i:"exercise", l:"Exercise", t:"::: exercise\n$SEL\n:::" },
  { g:"Callouts", k:"question", d:"A self-check question", i:"question", l:"Check yourself", t:"::: question\n$SEL\n:::" },
  { g:"Callouts", k:"success", d:"Confirms a finished result", i:"success", l:"Success", t:"::: success\n$SEL\n:::" },
  { g:"Callouts", k:"example", d:"A short worked example", i:"example", l:"Example", t:"::: example\n$SEL\n:::" },
  { g:"Callouts", k:"custom", d:"Pick any color and icon", i:"rocket", l:"Custom color + icon", t:"::: note {color=purple icon=rocket} Title\n$SEL\n:::" },
  { g:"Collapsible", k:"answer", d:"Hidden answer, click to reveal", i:"chevron", l:"Show answer", t:"::: answer\n$SEL\n:::" },
  { g:"Collapsible", k:"solution", d:"Hidden solution, click to reveal", i:"chevron", l:"Show solution", t:"::: solution\n$SEL\n:::" },
  { g:"Collapsible", k:"details", d:"Optional deep dive, collapsed", i:"chevron", l:"Collapsible section", t:"::: details Deep dive\n$SEL\n:::" },
  { g:"Quotes", k:"quote", d:"Quote with author and source", i:"book", l:"Pull quote", t:"::: quote Author, Source\n$SEL\n:::" },
  { g:"Quotes", k:"statement", d:"Big highlighted key message", i:"flag", l:"Key statement", t:"::: statement\n**$SEL**\n:::" },
  { g:"Quotes", k:"bq", d:"Simple indented quote", i:"note", l:"Plain quote", t:"> $SEL" },
  { g:"Code", k:"code", d:"Code with file name and copy", i:"terminal", l:"Code block", t:"```bash title=\"file.sh\"\n$SEL\n```" },
  { g:"Code", k:"tabs", d:"Same command per OS in tabs", i:"terminal", l:"Code tabs (OS)", t:"::: tabs\n```bash title=\"macOS / Linux\"\n$SEL\n```\n```powershell title=\"Windows\"\n$SEL\n```\n:::" },
  { g:"Code", k:"hl", d:"Line numbers and highlighted lines", i:"star", l:"Highlighted lines", t:"```python title=\"main.py\" {2} numbers\n$SEL\n```" },
  { g:"Code", k:"term", d:"Commands with output", i:"terminal", l:"Terminal session", t:"```terminal\n$ $SEL\noutput line\n```" },
  { g:"Code", k:"diff", d:"Show added and removed lines", i:"example", l:"Diff (changes)", t:"```diff\n-old line\n+new line\n```" },
  { g:"Code", k:"tree", d:"Project folder structure", i:"book", l:"File tree", t:"```tree\nproject/\n├── pyproject.toml\n└── src/\n    └── main.py\n```" },
  { g:"Structure", k:"steps", d:"Numbered procedure with markers", i:"prereq", l:"Numbered steps", t:"::: steps\n1. First step\n2. Second step\n3. Third step\n:::" },
  { g:"Structure", k:"dodont", d:"Good vs bad side by side", i:"check", l:"Do / Don't", t:"::: dodont\n- Do this\n---\n- Don't do this\n:::" },
  { g:"Structure", k:"compare", d:"Before and after side by side", i:"example", l:"Before / After", t:"::: compare\nBefore\n---\nAfter\n:::" },
  { g:"Structure", k:"columns", d:"Two or three free columns", i:"note", l:"Two columns", t:"::: columns\nLeft column\n---\nRight column\n:::" },
  { g:"Structure", k:"cards", d:"Grid of short key points", i:"star", l:"Key-point cards", t:"::: cards\n- **Point one**: short explanation\n- **Point two**: short explanation\n- **Point three**: short explanation\n:::" },
  { g:"Structure", k:"tasks", d:"Tickable checklist", i:"check", l:"Checklist", t:"- [ ] First item\n- [ ] Second item" },
  { g:"Structure", k:"table", d:"Rows and columns", i:"note", l:"Table", t:"| Column | Column |\n|---|---|\n| Value | Value |" },
  { g:"Structure", k:"hr", d:"Separate two parts", i:"note", l:"Divider", t:"---" },
  { g:"Media", k:"mermaid", d:"Flowchart from text", i:"bolt", l:"Diagram (Mermaid)", t:"```mermaid\nflowchart LR\n  A[Start] --> B[Next] --> C[Done]\n```" },
  { g:"Media", k:"img", d:"Picture with a caption", i:"book", l:"Image with caption", t:"![Description](https://example.com/image.png \"Caption\")" },
  { g:"Inline", k:"kbd", d:"Shortcut keys like Ctrl + S", i:"key", l:"Keyboard key", inl:"[[Ctrl]]" },
  { g:"Inline", k:"badge", d:"Small colored label", i:"flag", l:"Badge", inl:"[!New|green]" },
  { g:"Inline", k:"link", d:"Link to a web page", i:"book", l:"Link", inl:"[text](https://)" }
];
/* moved to state.js: blkGroup, blkSavedSel */
export function blkListHtml(q){
  q = (q || "").trim().toLowerCase();
  const groups = [...new Set(BLOCKS.map(b => b.g))].filter(g => S.blkGroup === "All" || g === S.blkGroup);
  const html = groups.map(g => { const items = BLOCKS.filter(b => b.g === g && (!q || (b.l + " " + (b.d || "") + " " + b.k).toLowerCase().includes(q)));
    return items.length ? "<h5>" + g + "</h5><div class='blkgrid'>" + items.map(b => "<button data-action='insBlock' data-k='" + b.k + "' data-g='" + b.g + "'><span class='bi'>" + svgIcon(b.i, 18) + "</span><span class='bt'><b>" + esc(b.l) + "</b><span>" + esc(b.d || "") + "</span></span></button>").join("") + "</div>" : ""; }).join("");
  return html || "<div class='blkempty'>No blocks match your search.</div>";
}
export function renderBlkMenu(){
  const groups = ["All"].concat([...new Set(BLOCKS.map(b => b.g))]);
  $("blkMenu").innerHTML = "<div class='blkpanel'><div class='blkhead'><h3>Insert block</h3><input type='search' id='blkSearch' placeholder='Search blocks, e.g. tip, tabs, diagram' aria-label='Search blocks'>"
    + "<button class='blkx' data-action='blkClose' aria-label='Close'>" + svgIcon("x", 18) + "</button></div><div class='blkbody'><nav class='blknav'>"
    + groups.map(g => "<button data-action='blkGroup' data-g='" + g + "' class='" + (g === S.blkGroup ? "on" : "") + "'>" + g + "<small>" + (g === "All" ? BLOCKS.length : BLOCKS.filter(b => b.g === g).length) + "</small></button>").join("")
    + "</nav><div class='blklist' id='blkList'>" + blkListHtml("") + "</div></div></div>";
  $("blkSearch").addEventListener("input", e => { $("blkList").innerHTML = blkListHtml(e.target.value); });
}

document.addEventListener("keydown", e => { if(e.key === "Escape" && !$("blkMenu").hidden){ e.stopPropagation(); closeBlk(); } }, true);
export function closeBlk(){ $("blkMenu").hidden = true; const ta = $ta(); if(ta){ ta.focus(); if(S.blkSavedSel) ta.setSelectionRange(S.blkSavedSel[0], S.blkSavedSel[1]); } }

/* ---------- Edit mode: inline sections + advanced editor ---------- */
export let editMode = false, inlineCtx = null;
export const PEN = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16.9 3.6a2.1 2.1 0 0 1 3 3L8.5 18 4 19.5l1.5-4.5z"/><path d="m15 5.5 3 3"/></svg>';
export function decorate(sec, idx){
  const md = stepTok(idx), parts = splitParts(md);
  let html = "";
  parts.forEach((part, i) => {
    if(!part.trim()) return;
    if(i === 0) S.stepCount = Math.max(0, idx - 1);
    const what = i === 0 ? (idx === 0 ? "introduction" : "step opening") : "section";
    html += "<div class='part' data-p='" + i + "' data-idx='" + idx + "'><button class='pen' data-action='inlineEdit' data-p='" + i + "' data-idx='" + idx + "' title='Edit this " + what + "' aria-label='Edit this " + what + "'>" + PEN + "</button>" + renderBlocks(part) + "</div>";
  });
  sec.innerHTML = html;
}
export function setEditMode(on){
  if(!on && S.editing){ $("editModeChk").checked = true; return guardEdit(() => setEditMode(false)); }
  editMode = on; $("editModeChk").checked = on;
  const rt = $("rEditToggle"); if(rt) rt.setAttribute("aria-checked", on ? "true" : "false");
  $("editTip").textContent = on ? "Click a pencil to edit that section. Others stay as they are." : "Turn on Edit mode to edit one section in place.";
  if(S.DATA) render();
}
export function homeToolbar(){ const tb = $("tb"), left = document.querySelector(".adv-left"); if(tb && left && tb.parentNode !== left) left.insertBefore(tb, $("src")); }
export function closeEditors(){
  if(S.editing) clearDraft(); const db = document.querySelector(".draftbar"); if(db) db.remove(); S.draftPending = null;
  inlineCtx = null; S.activeTA = null; S.editing = false;
  if(S.advOpenNow){ S.advOpenNow = false; $("adv").classList.remove("on"); document.body.style.overflow = ""; }
  homeToolbar();
}
export function openInline(idx, p){
  if(inlineCtx) return toast("Save or cancel the open section first");
  const md = stepTok(idx), parts = splitParts(md);
  inlineCtx = { lec: S.DATA.id, idx, p, parts, full: md, start: parts[p].replace(/\s+$/, "") + "\n" };
  S.editing = true; S.editIdx = idx;
  const el = document.querySelector(".part[data-idx='" + idx + "'][data-p='" + p + "']"); if(!el){ inlineCtx = null; S.editing = false; return; }
  const box = document.createElement("div"); box.className = "ied"; box.id = "ied";
  box.innerHTML = "<div class='ied-head'><b>Editing " + (p === 0 ? (idx === 0 ? "introduction" : "step opening") : "section") + "</b><span class='sp'></span>"
    + "<button class='btn ghost sm' data-action='history'>History</button><button class='btn ghost sm' data-action='inlineCancel'>Cancel</button><button class='btn sm save' data-action='inlineSave'>Save</button></div>"
    + "<textarea id='ita' spellcheck='false' aria-label='Section source'></textarea><div class='iprev transcript' id='iprev'></div>";
  el.replaceWith(box);
  box.insertBefore($("tb"), $("ita"));
  const ta = $("ita"); ta.value = inlineCtx.start; S.activeTA = ta;
  const fit = () => { ta.style.height = "auto"; ta.style.height = Math.min(Math.max(160, ta.scrollHeight + 4), window.innerHeight * 0.6) + "px"; };
  ta.addEventListener("input", () => { fit(); preview(); saveDraft(); });
  ta.addEventListener("keydown", e => {
    if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==="s"){ e.preventDefault(); actions.inlineSave(); }
    else if(e.key === "Escape" && !$("overlay").classList.contains("on")){ e.stopPropagation(); guardEdit(() => {}); }
    else if(e.key === "Tab"){ e.preventDefault(); taInsert(ta, "  ", ta.selectionStart, ta.selectionEnd); preview(); }
  });
  fit(); inlinePreview(); ta.focus(); offerDraft();
  box.scrollIntoView({ block: "nearest", behavior: "smooth" });
}
export function inlinePreview(){
  if(!inlineCtx || !$("iprev")) return;
  const prevCount = S.stepCount; S.stepCount = 1000;
  $("iprev").innerHTML = renderBlocks($("ita").value);
  S.stepCount = prevCount;
}
export function validateStep(md, idx){
  const parts = splitSections(md), heads = parts.length - 1;
  if(idx === 0 && heads > 0) return "The introduction can't contain a ## step heading";
  if(idx > 0 && (heads !== 1 || parts[0].trim() !== "")) return "Keep exactly one ## heading, at the top of this step";
  return "";
}
export function renderAdv(){
  const src = $("src").value, d = lineDiff(S.editStart, src);
  $("chgCount").textContent = d.adds + d.dels ? String(d.adds + d.dels) : "";
  const v = $("advView");
  if(S.advTab === "changes"){ v.classList.remove("transcript"); v.innerHTML = d.html; return; }
  v.classList.add("transcript");
  const prevCount = S.stepCount; S.stepCount = 1000;
  v.innerHTML = renderBlocks(S.advTab === "original" ? S.editStart : src);
  S.stepCount = prevCount;
}
export function lineDiff(a, b){
  const A = a.split("\n"), B = b.split("\n");
  let s0 = 0; while(s0 < A.length && s0 < B.length && A[s0] === B[s0]) s0++;
  let e0 = 0; while(e0 < A.length - s0 && e0 < B.length - s0 && A[A.length-1-e0] === B[B.length-1-e0]) e0++;
  const a2 = A.slice(s0, A.length - e0), b2 = B.slice(s0, B.length - e0), n = a2.length, m = b2.length;
  let ops = [];
  if(n * m > 4e6){ ops = a2.map(x => ["-", x]).concat(b2.map(x => ["+", x])); }
  else {
    const W = m + 1, L = new Uint32Array((n + 1) * W);
    for(let i = n - 1; i >= 0; i--) for(let j = m - 1; j >= 0; j--) L[i*W+j] = a2[i] === b2[j] ? L[(i+1)*W+j+1] + 1 : Math.max(L[(i+1)*W+j], L[i*W+j+1]);
    let i = 0, j = 0;
    while(i < n && j < m){ if(a2[i] === b2[j]){ ops.push(["=", a2[i]]); i++; j++; } else if(L[(i+1)*W+j] >= L[i*W+j+1]) ops.push(["-", a2[i++]]); else ops.push(["+", b2[j++]]); }
    while(i < n) ops.push(["-", a2[i++]]); while(j < m) ops.push(["+", b2[j++]]);
  }
  const all = A.slice(0, s0).map(x => ["=", x]).concat(ops, A.slice(A.length - e0).map(x => ["=", x]));
  const adds = all.filter(o => o[0] === "+").length, dels = all.filter(o => o[0] === "-").length;
  if(!adds && !dels) return { adds, dels, html: "<div class='rnone'>No changes yet. Edit on the left and your changes appear here.</div>" };
  const keep = new Array(all.length).fill(false);
  all.forEach((o, k) => { if(o[0] !== "=") for(let q = Math.max(0, k - 2); q <= Math.min(all.length - 1, k + 2); q++) keep[q] = true; });
  let html = "<div class='rnone'>" + adds + " line" + (adds === 1 ? "" : "s") + " added · " + dels + " removed</div>", gap = 0;
  all.forEach((o, k) => {
    if(!keep[k]){ gap++; return; }
    if(gap){ html += "<div class='dgap'>" + gap + " unchanged line" + (gap === 1 ? "" : "s") + "</div>"; gap = 0; }
    html += "<div class='dline" + (o[0] === "+" ? " add" : o[0] === "-" ? " del" : "") + "'>" + (esc(o[1]) || "&nbsp;") + "</div>";
  });
  if(gap) html += "<div class='dgap'>" + gap + " unchanged line" + (gap === 1 ? "" : "s") + "</div>";
  return { adds, dels, html };
}

/* ---------- Drafts kept in this browser while you type ---------- */
export let draftTimer = null;
export const draftKey = () => inlineCtx ? "ai4f-draft-L" + inlineCtx.lec + "-" + keyAt(S.DATA, inlineCtx.idx) + "-P" + inlineCtx.p : (S.advOpenNow && S.DATA ? "ai4f-draft-L" + S.DATA.id + "-" + keyAt(S.DATA, S.editIdx) + "-adv" : "");
export const draftStart = () => inlineCtx ? inlineCtx.start : S.editStart;
export function saveDraft(){ clearTimeout(draftTimer); const k = draftKey(), start = draftStart(); if(!k) return;
  draftTimer = setTimeout(() => { const ta = $ta(); if(!ta || draftKey() !== k) return;
    try { if(ta.value.replace(/\s+$/, "") + "\n" === start) localStorage.removeItem(k);
          else localStorage.setItem(k, JSON.stringify({ text: ta.value, start, at: Date.now() })); } catch(e) {} }, 600); }
export function clearDraft(){ clearTimeout(draftTimer); const k = draftKey(); if(!k) return; try { localStorage.removeItem(k); } catch(e) {} }
export function offerDraft(){ const k = draftKey(), ta = $ta(); if(!k || !ta) return; let d = null;
  try { d = JSON.parse(localStorage.getItem(k) || "null"); } catch(e) {}
  if(!d || typeof d.text !== "string") return;
  if(d.start !== draftStart() || d.text.replace(/\s+$/, "") + "\n" === draftStart()){ try { localStorage.removeItem(k); } catch(e) {} return; }
  S.draftPending = d;
  const t = new Date(d.at).toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const bar = document.createElement("div"); bar.className = "draftbar";
  bar.innerHTML = "<span>Unsaved draft from " + esc(t) + "</span><span class='sp'></span><button class='btn ghost sm' data-action='draftDismiss'>Dismiss</button><button class='btn sm' data-action='draftRestore'>Restore draft</button>";
  const host = inlineCtx ? $("ied") : document.querySelector(".adv-left");
  if(inlineCtx) host.insertBefore(bar, host.querySelector(".ied-head").nextSibling); else host.insertBefore(bar, host.firstChild);
}
/* Editor helpers */
/* moved to state.js: activeTA */
export const $ta = () => S.activeTA || $("src");
/* Insert text so it lands in the browser's undo history (Ctrl+Z works) */
export function taInsert(ta, text, s0, s1){
  ta.focus(); ta.setSelectionRange(s0, s1);
  let ok = false; try { ok = document.execCommand("insertText", false, text); } catch(e) {}
  if(!ok || ta.value.slice(s0, s0 + text.length) !== text){ ta.setRangeText(text, s0, s1, "end"); ta.dispatchEvent(new Event("input")); }
}
export function wrapSel(a, b, ph){ const ta=$ta(), s0=ta.selectionStart, s1=ta.selectionEnd, sel=ta.value.slice(s0,s1) || ph || "text";
  taInsert(ta, a+sel+b, s0, s1); ta.selectionStart = s0 + a.length; ta.selectionEnd = s0 + a.length + sel.length; ta.focus(); preview(); }
export function insertLine(txt){ const ta=$ta(), s0=ta.selectionStart, before=ta.value.slice(0,s0), nl = before && !before.endsWith("\n") ? "\n" : "";
  taInsert(ta, nl+txt, s0, ta.selectionEnd); ta.focus(); preview(); }
export function loadSection(){
  const sec = splitSections(S.DATA.content)[S.editIdx] || "";
  S.editStart = sec.replace(/\s+$/, "") + "\n";
  $("src").value = S.editStart;
}
export let prevTimer = null;
export function preview(){ clearTimeout(prevTimer); prevTimer = setTimeout(() => { if(inlineCtx) inlinePreview(); else if(S.advOpenNow) renderAdv(); }, 120); }
export let editorReady = false;
export function setupEditor(){
  if(editorReady) return; editorReady = true;
  COLORS.forEach(c => { $("tbColor").insertAdjacentHTML("beforeend","<option value='"+c+"'>"+c+"</option>"); if(c!=="brand") $("tbBg").insertAdjacentHTML("beforeend","<option value='bg-"+c+"'>"+c+"</option>"); });
  const once = (id, fn) => $(id).addEventListener("change", e => { const v = e.target.value; e.target.value = ""; if(v) fn(v); });
  once("tbHeading", v => insertLine(v));
  once("tbColor", v => wrapSel("{"+v+"|", "}"));
  once("tbBg", v => wrapSel("{"+v+"|", "}"));
  once("tbCode", v => { const ta=$ta(), sel=ta.value.slice(ta.selectionStart, ta.selectionEnd) || "your code here"; insertLine("```"+v+"\n"+sel+"\n```\n"); });
  $("src").addEventListener("input", () => { preview(); saveDraft(); });
  $("editModeChk").addEventListener("change", e => setEditMode(e.target.checked));
  $("secSel").addEventListener("change", e => {
    if($("src").value.replace(/\s+$/, "") + "\n" !== S.editStart){ e.target.value = String(S.editIdx); return toast("Save or cancel your changes first"); }
    S.editIdx = +e.target.value; const db = document.querySelector(".draftbar"); if(db) db.remove(); loadSection(); renderAdv(); offerDraft(); });
  $("src").addEventListener("keydown", e => {
    if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==="s"){ e.preventDefault(); actions.advSave(); }
    else if(e.key==="Escape" && !$("overlay").classList.contains("on")){ actions.advDiscard(); }
    else if(e.key==="Tab"){ e.preventDefault(); taInsert(e.target, "  ", e.target.selectionStart, e.target.selectionEnd); preview(); }
  });
}


// Load-time setup that uses other modules; called by app.js once every module has loaded.
export function initEditor(){
  $("blkMenu").addEventListener("click", e => { if(e.target.id === "blkMenu") closeBlk(); });
}
