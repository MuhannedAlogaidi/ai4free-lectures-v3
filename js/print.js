/* Print: two styles for the current lecture or the whole session.
   Friendly: light code, no background fills on hints or boxes; text colors, marks and highlights stay.
   Notebook: hand-written study-notes look (lined paper, coloured headings and underlines).
   Inside the Claude page printing is blocked, so the print page is saved as an .html file that prints itself when opened. */
import { S } from "./state.js";
import { esc } from "./app.js";
import { renderContent } from "./markdown.js";
import { splitSections, getSteps } from "./sections.js";
import { inlineAssets } from "./export.js";
import { A4_TEMPLATES } from "./a4.js";

export function printModal(){
  const steps = getSteps(S.DATA.content), cur = steps[S.curStep - 1] || "Current lecture";
  // Swatches: a quick look at each style's paper and accent colours.
  const sw = c => "<span class='pm-sw'>" + c.map(x => "<i style='background:" + x + "'></i>").join("") + "</span>";
  const card = (name, val, on, title, sub, colors) => "<label class='pm-card'><input type='radio' name='" + name + "' value='" + val + "'" + (on ? " checked" : "") + ">"
    + "<span class='pm-body'>" + (colors ? sw(colors) : "") + "<span class='pm-t'>" + title + "</span><span class='pm-s'>" + sub + "</span></span></label>";
  return "<h3>Print</h3><p class='pm-intro'>Choose what to print and how it should look.</p>"
    + "<div class='pm-sec'><div class='pm-h'>What</div><div class='pm-grid two'>"
    + card("pscope", "step", true, esc(cur), "The lecture you are reading")
    + card("pscope", "all", false, esc(S.DATA.title), "The whole session, every lecture") + "</div></div>"
    + "<div class='pm-sec'><div class='pm-h'>Print styles <small>opens the print dialog</small></div><div class='pm-grid'>"
    + card("pstyle", "friendly", true, "Friendly print", "Light code blocks, no background fills, text colours kept", ["#ffffff", "#e5e7eb", "#364759"])
    + card("pstyle", "notebook", false, "Notebook study sheet", "Hand-written notes on lined paper, coloured headings and boxes", ["#fdfdf8", "#bfdbfe", "#2563eb"])
    + card("pstyle", "sketch", false, "Sketchnote poster", "Cream paper, numbered marker headings, pink term tags, rainbow key-message box", ["#fbf6ea", "#f9a8d4", "#f59e0b"])
    + card("pstyle", "binder", false, "Binder notes", "Ruled binder paper with red margin and holes, yellow highlighter on key terms", ["#ffffff", "#ef4444", "#fde047"])
    + card("pstyle", "handnotes", false, "Handwritten notes", "Colourful marker headings, numbered dashed boxes, pink underlines and stars", ["#fffdf7", "#ec4899", "#14b8a6"])
    + "</div></div>"
    + "<div class='pm-sec'><div class='pm-h'>Editable A4 files <small>saved as HTML you can edit, then print</small></div><div class='pm-grid two'>"
    + Object.entries(A4_TEMPLATES).map(([k, t]) => card("pstyle", k, false, t.title, t.sub, k === "a4simple" ? ["#ffffff", "#dde4eb", "#23538b"] : ["#ffffff", "#eef8fd", "#205a89"])).join("")
    + "</div></div>"
    + "<div class='row'><button class='btn ghost' data-action='close'>Cancel</button><button class='btn' data-action='doPrint' id='pmGo'>Print</button></div>";
}

const PRINT_BASE = `
@page{margin:14mm 14mm 16mm}
*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0 auto;max-width:820px;padding:24px}
.ph{margin:0 0 20px}.ph .s{font-size:13px;color:#64748b}
.print-diagram{text-align:center;margin:14px 0}.print-diagram svg{max-width:100%;height:auto}
.m-bank-l{font-weight:700;font-size:13px;color:#334155;align-self:center;margin-right:4px}
.m-slot{min-height:40px;border-bottom:1.5px solid #94a3b8 !important}
.transcript img{max-width:100%}
.code,.hint,.quiz,.det,.tbl,.fig,.kcard,.col,blockquote,pre{break-inside:avoid}
h1,h2,h3,h4{break-after:avoid}
.code-h .copy,.quiz-row,.resp-row,.pdone,.pnav,.step-top,.ctab-bar,.pen{display:none!important}
.ctab-p{display:block!important}.ctab-p+.ctab-p{margin-top:8px}
.ctab-p[data-label]::before{content:attr(data-label);display:block;font-size:12px;font-weight:700;margin:0 0 4px;color:#475569}
.det>summary svg{display:none}
.code pre,.code pre code{white-space:pre-wrap!important;overflow-wrap:anywhere;overflow:visible!important}
textarea.resp-ta{display:block;width:100%;min-height:110px;border:1px solid #94a3b8;border-radius:6px;background:#fff;resize:none}
.quiz-opt{background:none!important}
@media screen{body{box-shadow:none}}
`;

const PRINT_FRIENDLY = `
body{font:15px/1.6 -apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:#1f2937;background:#fff}
.ph h1{font-size:26px;line-height:32px;margin:0 0 4px;color:#1f2937}
.hint,.hint.custom{background:none!important;border:1px solid #d1d5db;border-left-width:4px}
.det,.det>summary,.quiz,.kcard,.col,.col-h,.transcript th,.statement,.pquote,.diagram{background:none!important}
.statement{color:#1f2937!important;border:2px solid #364759}
.det-b{border-top:1px solid #e5e7eb}
.code{background:#fff!important;border:1px solid #cbd5e1}
.code-h{background:none!important;color:#475569!important;border-bottom:1px solid #e2e8f0}.code-h .fn{color:#1f2937!important}
.code pre,.code.is-term pre{background:#fff!important;color:#1f2937!important}
.code .tk-c{color:#6b7280}.code .tk-s{color:#15803d}.code .tk-n{color:#b45309}.code .tk-k{color:#1d4ed8}.code .tk-key{color:#b91c1c}.code .tk-p{color:#475569}
.code .prompt{color:#15803d}.code .out{color:#475569}.code .tg,.code .no{color:#94a3b8}.code .tdir{color:#1d4ed8}.code .tfile{color:#1f2937}.code .tcm{color:#6b7280}
.code .ln.hl{background:#fef9c3}.code .d-add{background:#dcfce7;color:#166534}.code .d-del{background:#fee2e2;color:#991b1b}.code .d-hunk{color:#1d4ed8}
`;

const PRINT_NOTEBOOK = `
body{font:20px/32px "Patrick Hand","Comic Sans MS",cursive;color:#1f2a44;
  background:#fdfdfb repeating-linear-gradient(to bottom,transparent 0 31px,#c9daf0 31px 32px)}
.ph h1{font:700 52px/60px Caveat,cursive;color:#1d3fbf;margin:0 0 6px;display:inline-block;border-bottom:4px solid #e11d74;padding-bottom:2px}
.ph .s{font-size:17px;color:#475569}
.transcript{font-size:20px;line-height:32px;color:#1f2a44}
.transcript p{margin:0 0 12px}
.transcript h2{font:700 38px/44px Caveat,cursive;color:#1d3fbf;display:inline-block;border-bottom:3px solid #f59e0b;margin:26px 0 12px}
.transcript h3{font:700 32px/40px Caveat,cursive;color:#b45309;display:inline-block;border-bottom:3px solid #f59e0b;margin:22px 0 10px}
.transcript h4{font:700 28px/36px Caveat,cursive;color:#7c3aed;display:inline-block;border-bottom:2px solid #c084fc;margin:18px 0 8px}
.transcript h2,.transcript h3,.transcript h4{width:auto}
.transcript h2+*,.transcript h3+*,.transcript h4+*{clear:both}
.transcript li{margin:2px 0}.transcript li::marker{color:#15803d}
.transcript ul>li{color:#166534}.transcript ul>li *{color:inherit}
.transcript strong{color:#be123c}.transcript em{color:#7c3aed}
.transcript mark,.transcript blockquote{background:#fef08a;border:0;padding:2px 8px;border-radius:3px;color:#1f2a44}
.transcript :not(pre)>code{font-family:"Patrick Hand",cursive;font-size:1em;background:none;border:0;border-bottom:2px solid #7c3aed;border-radius:0;color:#1d3fbf;padding:0 2px}
.hint,.hint.custom{background:none!important;border:2.5px solid #be185d;border-radius:4px;color:#1f2a44!important}
.hint.info,.hint.exercise{border-color:#1d4ed8}.hint.tip,.hint.success,.hint.best{border-color:#15803d}.hint.warning,.hint.important{border-color:#d97706}.hint.danger,.hint.mistake{border-color:#be123c}
.hint svg{display:none}.hint .ht{font:700 26px/30px Caveat,cursive;color:#be185d}
.det,.quiz,.kcard,.col,.statement,.pquote,.diagram,.tbl{background:none!important;border:2.5px solid #7c3aed;border-radius:4px}
.det>summary,.col-h,.transcript th{background:none!important;font-family:Caveat,cursive;font-size:24px;color:#7c3aed}
.statement{color:#1d3fbf!important;font-family:Caveat,cursive;font-size:28px}
.quiz-h{font:700 28px/32px Caveat,cursive;color:#1d3fbf}
.quiz-opt{border:0!important;padding:2px 0}
.code{background:#fff!important;border:2.5px solid #15803d;border-radius:4px}
.code-h{background:none!important;color:#15803d!important;font-family:Caveat,cursive;font-size:22px;border-bottom:2px dashed #86efac}.code-h .fn{color:#15803d!important}
.code pre,.code.is-term pre{background:#fff!important;color:#1f2a44!important;font-size:14px;line-height:22px}
.code .tk-c{color:#6b7280}.code .tk-s{color:#15803d}.code .tk-n{color:#b45309}.code .tk-k{color:#1d4ed8}.code .tk-key{color:#be123c}.code .tk-p{color:#475569}
.code .prompt{color:#15803d}.code .out{color:#475569}.code .tdir{color:#1d4ed8}.code .tfile,.code .tcm{color:#1f2a44}
.transcript table{font-size:18px}.transcript th,.transcript td{border-bottom:1.5px solid #93c5fd}
.fig img{border:2px solid #cbd5e1}
`;

const PRINT_SKETCH = `
body{font:19px/29px "Patrick Hand","Comic Sans MS",cursive;color:#2b2b2b;
  background:#fbf8f1 repeating-linear-gradient(to bottom,transparent 0 28px,#ece6d8 28px 29px)}
body{border:3px solid #2b2b2b;border-radius:18px;margin:12px auto;padding:28px 34px}
.ph{text-align:center}
.ph h1{font:400 44px/52px "Permanent Marker",Caveat,cursive;color:#1f2a44;margin:0 0 4px}
.ph .s{font-size:16px;color:#6b6b6b}
.transcript{counter-reset:sk}
.transcript>p:first-child{background:linear-gradient(transparent 12%,#fde68a 12%,#fde68a 88%,transparent 88%);font-size:21px;color:#1f2a44;padding:2px 8px;display:inline}
.transcript>p:first-child+*{margin-top:18px}
.transcript h2,.transcript h3{counter-increment:sk;font:400 26px/32px "Permanent Marker",Caveat,cursive;color:#1f2a44;text-transform:uppercase;margin:24px 0 6px}
.transcript h2::before,.transcript h3::before{content:counter(sk) ". ";color:#2563eb;font-size:32px}
.transcript h4{font:700 26px/30px Caveat,cursive;color:#1d4ed8;margin:16px 0 4px}
.transcript strong{background:#fecdd3;border:1.5px solid #e11d48;border-radius:4px;padding:0 4px;color:#9f1239;font-weight:400}
.transcript em{color:#475569}
.transcript mark,.transcript blockquote{background:#fde68a;border:0;border-radius:3px;padding:2px 8px;color:#1f2a44}
.transcript li::marker{color:#2563eb}
.transcript :not(pre)>code{font-family:"Patrick Hand",cursive;font-size:1em;background:#e0f2fe;border:1.5px solid #0284c7;border-radius:4px;color:#075985;padding:0 4px}
.hint,.hint.custom,.statement,.quiz{background:#fff!important;border:3px solid transparent!important;border-radius:14px;color:#1f2a44!important;
  background-image:linear-gradient(#fff,#fff),linear-gradient(90deg,#ef4444,#f59e0b,#22c55e,#3b82f6,#a855f7)!important;background-origin:border-box;background-clip:padding-box,border-box}
.hint svg{display:none}.hint .ht,.quiz-h{font:400 22px/28px "Permanent Marker",Caveat,cursive;color:#1f2a44}
.det,.kcard,.col,.pquote,.diagram,.tbl{background:none!important;border:2px solid #2b2b2b;border-radius:10px}
.det>summary,.col-h,.transcript th{background:none!important;font-family:"Permanent Marker",cursive;color:#1f2a44}
.code{background:#fff!important;border:2px solid #2b2b2b;border-radius:10px}
.code-h{background:none!important;color:#1f2a44!important;font-family:Caveat,cursive;font-size:20px;border-bottom:1.5px dashed #94a3b8}.code-h .fn{color:#1f2a44!important}
.code pre,.code.is-term pre{background:#fff!important;color:#1f2a44!important;font-size:14px;line-height:21px}
.code .tk-c{color:#6b7280}.code .tk-s{color:#15803d}.code .tk-n{color:#b45309}.code .tk-k{color:#1d4ed8}.code .tk-key{color:#be123c}.code .tk-p{color:#475569}
.code .prompt{color:#15803d}.code .out{color:#475569}.code .tdir{color:#1d4ed8}.code .tfile,.code .tcm{color:#1f2a44}
.fig img{border:2px solid #2b2b2b;border-radius:10px}
`;

const PRINT_BINDER = `
body{font:20px/32px "Patrick Hand","Comic Sans MS",cursive;color:#1f2937;max-width:860px;padding:24px 28px 24px 96px;
  background:
    radial-gradient(circle at 34px 120px,#8b5a2b 0 11px,transparent 12px) 0 0/100% 760px repeat-y,
    linear-gradient(to right,transparent 0 70px,#f87171 70px 72px,transparent 72px),
    repeating-linear-gradient(to bottom,transparent 0 31px,#a9c7ec 31px 32px),
    #fdfdfd}
.ph h1{font:700 54px/62px Caveat,cursive;margin:0 0 6px;background:linear-gradient(90deg,#16a34a,#0ea5e9,#2563eb);-webkit-background-clip:text;background-clip:text;color:transparent;border-bottom:3px solid #2563eb;display:inline-block}
.ph .s{font-size:17px;color:#475569}
.transcript{font-size:20px;line-height:32px}
.transcript p{margin:0 0 14px}
.transcript h2,.transcript h3{font:700 32px/40px Caveat,cursive;color:#1f2937;display:inline-block;background:linear-gradient(transparent 18%,#fef08a 18%,#fef08a 85%,transparent 85%);padding:0 6px;margin:22px 0 8px}
.transcript h4{font:700 28px/34px Caveat,cursive;color:#1f2937;display:inline-block;border-bottom:2px solid #f87171;margin:16px 0 6px}
.transcript strong{background:linear-gradient(transparent 15%,#fef08a 15%,#fef08a 88%,transparent 88%);font-weight:700;color:#1f2937;padding:0 2px}
.transcript em{color:#2563eb}
.transcript mark{background:#fef08a}
.transcript blockquote{background:none;border:0;border-left:3px solid #f87171;color:#1f2937}
.transcript :not(pre)>code{font-family:"Patrick Hand",cursive;font-size:1em;background:none;border:2px solid #dc2626;border-radius:999px;color:#b91c1c;padding:0 8px}
.transcript li::marker{color:#2563eb}
.hint,.hint.custom,.det,.quiz,.kcard,.col,.statement,.pquote,.diagram,.tbl{background:none!important;border:2px solid #2563eb;border-radius:8px;color:#1f2937!important}
.hint svg{display:none}.hint .ht,.quiz-h,.det>summary,.col-h,.transcript th{background:none!important;font:700 26px/30px Caveat,cursive;color:#2563eb}
.code{background:#fff!important;border:2px solid #16a34a;border-radius:8px}
.code-h{background:none!important;color:#16a34a!important;font-family:Caveat,cursive;font-size:20px;border-bottom:1.5px dashed #86efac}.code-h .fn{color:#16a34a!important}
.code pre,.code.is-term pre{background:#fff!important;color:#1f2937!important;font-size:14px;line-height:22px}
.code .tk-c{color:#6b7280}.code .tk-s{color:#15803d}.code .tk-n{color:#b45309}.code .tk-k{color:#1d4ed8}.code .tk-key{color:#be123c}.code .tk-p{color:#475569}
.code .prompt{color:#15803d}.code .out{color:#475569}.code .tdir{color:#1d4ed8}.code .tfile,.code .tcm{color:#1f2937}
.fig img{border:2px solid #cbd5e1}
`;

const PRINT_HANDNOTES = `
body{font:20px/30px "Patrick Hand","Comic Sans MS",cursive;color:#1f2937;background:#fbfaf7}
.ph{text-align:center;margin-bottom:28px}
.ph h1{font:700 50px/58px Caveat,cursive;margin:0;color:#1d4ed8;display:inline;background:linear-gradient(transparent 70%,#bbf7d0 70%,#bbf7d0 92%,transparent 92%)}
.ph .s{display:table;margin:14px auto 0;padding:6px 18px;border:2px dashed #93c5fd;border-radius:999px;background:#eff6ff;font-size:17px;color:#1f2937}
.transcript{font-size:20px;line-height:30px}
.transcript h2,.transcript h3{font:700 34px/42px Caveat,cursive;margin:26px 0 10px;display:inline-block;border-bottom:3px solid #f9a8d4;padding-bottom:2px}
.transcript h3:nth-of-type(3n+1){color:#1d4ed8}.transcript h3:nth-of-type(3n+2){color:#15803d}.transcript h3:nth-of-type(3n){color:#ea580c}
.transcript h2{color:#7c3aed}
.transcript h4{font:700 27px/32px Caveat,cursive;color:#db2777;margin:16px 0 6px}
.transcript strong{color:#1f2937;background:linear-gradient(transparent 62%,#fbcfe8 62%,#fbcfe8 90%,transparent 90%)}
.transcript em{color:#2563eb;text-decoration:underline wavy #f472b6;text-underline-offset:4px}
.transcript mark{background:#fef08a}
.transcript blockquote{background:#eff6ff;border:2px dashed #93c5fd;border-radius:24px;padding:8px 18px;color:#1f2937}
.transcript :not(pre)>code{font-family:"Patrick Hand",cursive;font-size:1em;background:none;border:2px solid #a855f7;border-radius:10px;color:#7c3aed;padding:0 6px}
.transcript ol{list-style:none;counter-reset:hn;padding-left:0}
.transcript ol>li{counter-increment:hn;position:relative;border:2px dashed #f472b6;border-radius:14px;padding:8px 14px 8px 52px;margin:10px 0}
.transcript ol>li:nth-child(3n+2){border-color:#4ade80}.transcript ol>li:nth-child(3n){border-color:#fbbf24}
.transcript ol>li::before{content:counter(hn);position:absolute;left:12px;top:8px;width:28px;height:28px;border-radius:50%;background:#ec4899;color:#fff;font:700 18px/28px Caveat,cursive;text-align:center}
.transcript ol>li:nth-child(3n+2)::before{background:#22c55e}.transcript ol>li:nth-child(3n)::before{background:#f59e0b}
.transcript ul>li::marker{content:"★ ";color:#f59e0b}
.hint,.hint.custom,.quiz,.det,.kcard,.col,.statement,.pquote,.diagram,.tbl{background:none!important;border:2px dashed #a855f7;border-radius:16px;color:#1f2937!important}
.hint.info,.hint.exercise{border-color:#60a5fa}.hint.tip,.hint.success,.hint.best{border-color:#4ade80}.hint.warning,.hint.important{border-color:#fbbf24}.hint.danger,.hint.mistake{border-color:#f472b6}
.hint svg{display:none}.hint .ht,.quiz-h,.det>summary,.col-h,.transcript th{background:none!important;font:700 26px/30px Caveat,cursive;color:#7c3aed}
.code{background:#fff!important;border:2px dashed #60a5fa;border-radius:14px}
.code-h{background:none!important;color:#2563eb!important;font-family:Caveat,cursive;font-size:20px;border-bottom:1.5px dashed #bfdbfe}.code-h .fn{color:#2563eb!important}
.code pre,.code.is-term pre{background:#fff!important;color:#1f2937!important;font-size:14px;line-height:22px}
.code .tk-c{color:#6b7280}.code .tk-s{color:#15803d}.code .tk-n{color:#b45309}.code .tk-k{color:#1d4ed8}.code .tk-key{color:#be123c}.code .tk-p{color:#475569}
.code .prompt{color:#15803d}.code .out{color:#475569}.code .tdir{color:#1d4ed8}.code .tfile,.code .tcm{color:#1f2937}
.fig img{border:2px dashed #cbd5e1;border-radius:12px}
`;

const PRINT_STYLES = { friendly: PRINT_FRIENDLY, notebook: PRINT_NOTEBOOK, sketch: PRINT_SKETCH, binder: PRINT_BINDER, handnotes: PRINT_HANDNOTES };
const PRINT_FONTS = "<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Patrick+Hand&family=Permanent+Marker&display=swap'>";

function printCss(){
  return Array.from(document.styleSheets).flatMap(s => { try { return Array.from(s.cssRules); } catch(e) { return []; } })
    .map(r => r.cssText).filter(t => /^(\.transcript|\.c-|\.bg-|\.hint|\.code|\.det|\.quiz|\.m-|\.response|\.badge|\.fig|\.cols?|\.kcard|\.cards|\.tasks|\.task|\.stepper|\.pquote|\.statement|\.ctab|\.diagram|\[class)/.test(t)).join("\n");
}

export const printDate = () => { const d = new Date(), p = n => String(n).padStart(2, "0"); return p(d.getDate()) + "/" + p(d.getMonth() + 1) + "/" + d.getFullYear(); };

export async function buildPrint(scope, style){
  const steps = getSteps(S.DATA.content);
  const md = scope === "step" ? (splitSections(S.DATA.content)[S.curStep] || "") : S.DATA.content;
  const title = scope === "step" ? (steps[S.curStep - 1] || S.DATA.title) : S.DATA.title;
  const sub = (scope === "step" ? S.DATA.title + " · " : "") + printDate();
  return printPage(md, title, sub, style, { dropFirstH2: scope === "step", autoPrint: true });
}

// Diagrams: draw every ```mermaid block as a picture (SVG) so it prints as a diagram, not as code.
let mermaidReady = null;
function loadMermaid(){
  if(window.mermaid && window.mermaid.render) return Promise.resolve(window.mermaid);
  if(!mermaidReady) mermaidReady = new Promise((res, rej) => {
    const sc = document.createElement("script"); sc.src = "https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.9.1/mermaid.min.js";
    sc.onload = () => { try { window.mermaid.initialize({ startOnLoad: false, theme: "neutral", securityLevel: "strict" }); } catch(e) {} res(window.mermaid); };
    sc.onerror = () => { mermaidReady = null; rej(new Error("diagram library unavailable")); };
    document.head.appendChild(sc);
  });
  return mermaidReady;
}
let diagSeq = 0;
export async function drawDiagrams(box){
  const pres = [...box.querySelectorAll("pre.mermaid")]; if(!pres.length) return;
  let m; try { m = await loadMermaid(); } catch(e) { pres.forEach(p => p.classList.add("diagram-src")); return; }
  for(const p of pres){
    try { const out = await m.render("pdiag" + (++diagSeq), p.textContent); const fig = document.createElement("div"); fig.className = "diagram print-diagram"; fig.innerHTML = out.svg; (p.closest(".diagram") || p).replaceWith(fig); }
    catch(e) { p.classList.add("diagram-src"); document.querySelectorAll("#dpdiag" + diagSeq + ", #pdiag" + diagSeq).forEach(n => n.remove()); }
  }
}
// Matching quizzes print as a list of descriptions with blanks, plus the answer cards to choose from.
export function printableMatch(box){
  box.querySelectorAll(".quiz.match").forEach(q => {
    q.querySelectorAll(".m-chip").forEach(c => { const s = document.createElement("span"); s.className = "m-chip"; s.innerHTML = c.innerHTML; c.replaceWith(s); });
    q.querySelectorAll(".m-slot").forEach(s => { s.querySelectorAll(".m-chip").forEach(c => q.querySelector(".m-bank").appendChild(c)); s.innerHTML = "<span class='m-ph'>&nbsp;</span>"; s.classList.remove("correct", "wrong"); });
    const bank = q.querySelector(".m-bank"); if(bank && !bank.querySelector(".m-bank-l")) bank.insertAdjacentHTML("afterbegin", "<span class='m-bank-l'>Answers:</span>");
    const fb = q.querySelector(".quiz-fb"); if(fb) fb.textContent = "";
  });
}

// One styled page from markdown: used by Print and by the AI Assistant's notes exports.
export async function printPage(md, title, sub, style, o = {}){
  const box = document.createElement("div"); box.innerHTML = renderContent(await inlineAssets(md));
  if(o.dropFirstH2){ const h = box.querySelector("h2"); if(h) h.remove(); }   // the lecture name is already the page title
  printableMatch(box); await drawDiagrams(box);
  box.querySelectorAll("details").forEach(d => d.open = true);
  box.querySelectorAll("[hidden]").forEach(e => { if(!e.classList.contains("quiz-ex")) e.removeAttribute("hidden"); });
  box.querySelectorAll(".ctabs").forEach(t => { const labels = [...t.querySelectorAll(".ctab-bar button")].map(b => b.textContent); t.querySelectorAll(".ctab-p").forEach((p, j) => p.dataset.label = labels[j] || ""); });
  box.querySelectorAll("button").forEach(b => b.remove());
  box.querySelectorAll("input").forEach(i => i.disabled = true);
  return "<!DOCTYPE html><html lang='en'><head><meta charset='utf-8'><title>" + esc(title) + "</title>" + (style === "friendly" ? "" : PRINT_FONTS) + "<style>" + printCss() + PRINT_BASE + (PRINT_STYLES[style] || PRINT_FRIENDLY) + (o.css || "") + "</style></head><body>"
    + "<header class='ph'><h1>" + esc(title) + "</h1><div class='s'>" + esc(sub) + "</div></header><div class='transcript'>" + box.innerHTML + "</div>"
    + (o.autoPrint ? "<script>window.addEventListener('load',function(){setTimeout(function(){window.print()},700)})<\/script>" : "") + "</body></html>";
}

// Prints in this window when allowed; otherwise the caller saves the page as a file that prints itself.
export function printHere(html){
  if(window.self !== window.top) return false;
  const f = document.createElement("iframe"); f.style.cssText = "position:fixed;width:0;height:0;border:0;right:0;bottom:0";
  document.body.appendChild(f);
  f.contentDocument.open(); f.contentDocument.write(html.replace(/<script>window\.addEventListener[\s\S]*?<\/script>/, "")); f.contentDocument.close();
  setTimeout(() => { try { f.contentWindow.focus(); f.contentWindow.print(); } finally { setTimeout(() => f.remove(), 2000); } }, 900);
  return true;
}
