/* AI Assistant (right panel): summarize the lecture or the session with Claude, then
   download the summary (MD, TXT, DOCX) or turn it into notes in a print pattern (Image, HTML, DOCX).
   The AI call uses the artifact's `sample` capability; the answer is a fixed JSON shape that our templates lay out.
   Summaries are saved per learner (db under data/users/<id>/, else this browser). */
import { S } from "./state.js";
import { $, esc, toast, download, slug } from "./app.js";
import { getSteps, splitSections } from "./sections.js";
import { plainText, renderContent } from "./markdown.js";
import { printPage, printHere, printDate } from "./print.js";
import { assetDataUri } from "./export.js";
import { STORE, UID } from "./store.js";

const AI_STYLES = [["notebook", "Notebook study sheet"], ["sketch", "Sketchnote poster"], ["binder", "Binder notes"], ["handnotes", "Handwritten notes"], ["friendly", "Friendly (plain)"]];
const AI_SIZES = { square: [1080, 1080, "Image: square post 1080 × 1080"], social: [1080, 1350, "Image: social post 1080 × 1350"], a4: [2480, 3508, "Image: A4 2480 × 3508 (300 dpi)"], k2: [1440, 2560, "Image: 2K 1440 × 2560"], k4: [2160, 3840, "Image: 4K 2160 × 3840"] };
const AI_LIBS = { html2canvas: "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js", JSZip: "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js" };
const AI = { cur: null, ctl: null };   // cur: {key, title, sub, data, md, at}

const aiSel = (id, opts, val) => "<select id='" + id + "'>" + opts.map(([v, t]) => "<option value='" + v + "'" + (v === val ? " selected" : "") + ">" + esc(t) + "</option>").join("") + "</select>";
const aiVal = id => ($(id) || {}).value;

export function assistantModal(){
  const steps = getSteps(S.DATA.content), cur = steps[S.curStep - 1] || "Current lecture";
  return "<h3>AI Assistant</h3><p>Claude summarizes the lecture. Then download it, or turn it into notes in a print style.</p>"
    + "<label>Style</label>" + aiSel("aiMode", [["notes", "Summary notes: fast, our five print styles"], ["sheet", "Study sheet: Claude designs the page (graphs, formulas, highlights)"]], "notes")
    + "<label>What</label>" + aiSel("aiScope", [["step", cur], ["all", S.DATA.title + " (whole session)"]], "step")
    + "<div style='display:grid;grid-template-columns:1fr 1fr;gap:8px'><div><label>Length</label>" + aiSel("aiLen", [["short", "Short: 5 to 7 key points"], ["detailed", "Detailed: one block per heading"]], "short") + "</div>"
    + "<div><label>Tone</label>" + aiSel("aiTone", [["friendly", "Friendly"], ["professional", "Professional"], ["fun", "Fun and simple"], ["academic", "Academic"]], "friendly") + "</div></div>"
    + "<div class='row' style='justify-content:flex-start;margin-top:12px'><button class='btn' data-action='aiRun' id='aiRunBtn'>Summarize</button><button class='btn ghost' data-action='aiStop' id='aiStopBtn' hidden>Stop</button><span id='aiNote' style='font-size:13px;color:var(--muted);align-self:center'></span></div>"
    + "<div id='aiOut' class='transcript' style='max-height:38vh;overflow:auto;margin-top:12px;padding:12px 14px;border:1px solid var(--border);border-radius:6px;font-size:15px;line-height:22px' hidden></div>"
    + "<div id='aiSheet' hidden><iframe id='aiFrame' sandbox='' style='width:100%;height:46vh;border:1px solid var(--border);border-radius:6px;margin-top:12px;background:#fff'></iframe>"
    + "<label>Export the study sheet</label><div style='display:grid;grid-template-columns:1fr 1fr;gap:8px'>" + aiSel("aiSheetFmt", [...Object.entries(AI_SIZES).map(([k, v]) => [k, v[2]]), ["html", "HTML page to print"], ["file", "HTML file (download)"]], "a4") + "<span></span></div>"
    + "<div class='row'><button class='btn ghost' data-action='close'>Close</button><button class='btn' data-action='aiNotes'>Export</button></div></div>"
    + "<div id='aiExport' hidden><label>Download the summary</label><div class='row' style='justify-content:flex-start;margin-top:4px'>"
    + "<button class='btn ghost sm' data-action='aiDl' data-f='md'>Markdown</button><button class='btn ghost sm' data-action='aiDl' data-f='txt'>Text</button><button class='btn ghost sm' data-action='aiDl' data-f='docx'>Word (DOCX)</button></div>"
    + "<label>Summary as notes</label><div style='display:grid;grid-template-columns:1fr 1fr;gap:8px'>" + aiSel("aiStyle", AI_STYLES, "handnotes")
    + aiSel("aiFmt", [...Object.entries(AI_SIZES).map(([k, v]) => [k, v[2]]), ["html", "HTML page to print"], ["docx", "Word (DOCX)"]], "square") + "</div>"
    + "<div class='row'><button class='btn ghost' data-action='close'>Close</button><button class='btn' data-action='aiNotes'>Make notes</button></div></div>"
    + "<div class='row' id='aiCloseRow'><button class='btn ghost' data-action='close'>Close</button></div>";
}

function aiKey(){ return "L" + S.DATA.id + "-" + (aiVal("aiScope") === "all" ? "all" : "s" + S.curStep) + "-" + aiVal("aiLen") + "-" + aiVal("aiTone") + (aiVal("aiMode") === "sheet" ? "-sheet" : ""); }
function aiSource(){
  const scope = aiVal("aiScope"), steps = getSteps(S.DATA.content);
  const md = scope === "all" ? S.DATA.content : (splitSections(S.DATA.content)[S.curStep] || "");
  return { md, title: scope === "all" ? S.DATA.title : (steps[S.curStep - 1] || S.DATA.title).replace(/^Step\s+\d+:\s*/, ""), sub: (scope === "all" ? "" : S.DATA.title + " · ") + printDate() };
}

// Saved summaries, per learner
async function aiLoadSaved(key){
  try { if(STORE && UID){ const d = await STORE.doc("data/users/" + UID + "/ai-" + key).get(); const v = d && (d.data ? d.data() : d); if(v && v.data) return v; } } catch(e) {}
  try { return JSON.parse(localStorage.getItem("ai4f-ai-" + key) || "null"); } catch(e) { return null; }
}
async function aiSave(rec){
  try { if(STORE && UID){ await STORE.doc("data/users/" + UID + "/ai-" + rec.key).set(rec); return; } } catch(e) {}
  try { localStorage.setItem("ai4f-ai-" + rec.key, JSON.stringify(rec)); } catch(e) {}
}

export async function assistantOpen(){
  ["aiMode", "aiScope", "aiLen", "aiTone"].forEach(id => $(id).addEventListener("change", aiShowSaved));
  aiShowSaved();
}
async function aiShowSaved(){
  const key = aiKey(), rec = await aiLoadSaved(key);
  if(rec && (rec.data || rec.html) && key === aiKey()){ aiShow(rec); $("aiNote").textContent = "Saved summary from " + new Date(rec.at).toLocaleDateString("en-GB") + ". Summarize again for a new one."; }
  else { AI.cur = null; $("aiOut").hidden = true; $("aiExport").hidden = true; $("aiSheet").hidden = true; $("aiCloseRow").hidden = false; $("aiNote").textContent = ""; }
  $("aiRunBtn").textContent = aiVal("aiMode") === "sheet" ? "Design study sheet" : "Summarize";
}

function aiToMd(d){
  const pts = d.points.map((p, i) => "### " + (i + 1) + ". " + p.heading + "\n\n" + p.text + (p.terms && p.terms.length ? "\n\n" + p.terms.map(t => "**" + t + "**").join(" · ") : "")).join("\n\n");
  return (d.subtitle ? "> " + d.subtitle + "\n\n" : "") + pts + (d.takeaway ? "\n\n#### Takeaway\n\n==" + d.takeaway + "==" : "") + (d.slogan ? "\n\n::: tip " + d.slogan + "\n" + (d.title || "") + "\n:::" : "");
}
function aiShow(rec){
  if(rec.html){ AI.cur = rec; $("aiFrame").srcdoc = rec.html; $("aiSheet").hidden = false; $("aiOut").hidden = true; $("aiExport").hidden = true; $("aiCloseRow").hidden = true; return; }
  $("aiSheet").hidden = true;
  AI.cur = rec; rec.md = aiToMd(rec.data);
  $("aiOut").innerHTML = "<h3 style='margin-top:0'>" + esc(rec.data.title || rec.title) + "</h3>" + renderContent(rec.md);
  $("aiOut").hidden = false; $("aiExport").hidden = false; $("aiCloseRow").hidden = true;
}

function aiPrompt(src, len, tone){
  const text = plainText(src.md).slice(0, 60000);
  return "You summarize a training lecture for learners.\n"
    + "Tone: " + ({ friendly: "friendly and encouraging", professional: "clear and professional", fun: "fun, simple words, short sentences", academic: "precise and academic" })[tone] + ".\n"
    + (len === "short" ? "Length: 5 to 7 points, each text 1 or 2 sentences.\n" : "Length: one point per main heading of the lecture (at most 14), each text 2 to 4 sentences.\n")
    + "Use only facts from the lecture. Do not invent examples, numbers or code. Plain text only, no Markdown.\n"
    + "Reply with only this JSON object:\n"
    + '{"title": "short title", "subtitle": "one sentence: what the learner gets", "points": [{"heading": "3 to 6 words", "text": "...", "terms": ["key term", "..."]}], "takeaway": "one sentence", "slogan": "5 words or fewer"}\n'
    + "terms: 0 to 3 exact key terms from that point.\n\n"
    + "Lecture: " + src.title + "\n\n" + text;
}

// Study sheet: the master prompt (claude/lecture-notes-design-prompt.md), adapted so the page has no scripts.
function aiSheetPrompt(src, len, tone){
  const text = plainText(src.md).slice(0, 60000);
  return `ROLE
You are an expert teacher and visual note designer. You turn a lecture into a hand-written study sheet that a learner can understand at a glance and revise from before an exam.

TASK
Design a study sheet for the lecture below. Teach the core idea, the method as numbered steps, any formula worked with real numbers, and a graph when a picture explains the idea better than words. End with a one-sentence answer or takeaway.
Tone: ${({ friendly: "friendly and encouraging", professional: "clear and professional", fun: "fun, simple words, short sentences", academic: "precise and academic" })[tone]}. ${len === "short" ? "One page, at most about 180 words excluding formulas." : "One page per main section of the lecture (at most 4 pages), at most about 180 words per page excluding formulas."}

CONTENT RULES
1. Use only facts, numbers, code and formulas from the lecture. Do not invent data. If the lecture has no worked example, build one only from values the lecture gives, or skip the calculation.
2. Structure: Title (3 to 7 words); intro note (what it is and when to use it, at most 2 lines); "Example:" or "Given:" or "Key terms:" list; Step 1 to Step N (3 to 6 steps, each a short heading and its content); Conclusion (1 to 2 sentences); Answer box (one sentence).
3. Formulas: the general formula once in a box, then substitute values line by line aligned on "=", then the result in a highlighted box. Proper symbols (μ, σ, x̄, α, √); stacked fractions built with HTML/CSS (inline-flex column with a top border).
4. Graphs: only if it helps (distribution, threshold, trend, comparison, flow), drawn as inline SVG in the same hand-drawn look; label axes, mark the important value, shade the important area, one short arrow label.
5. Code (programming lectures): key code in a boxed block with the exact text, one line under it saying what it does. Concept lectures: replace the calculation with a small boxes-and-arrows diagram in SVG.

LOOK AND LAYOUT
- Page: A4 portrait (794 px wide), white paper with light-blue ruled lines (repeating-linear-gradient), no margin line, padding about 32 px.
- Grid: title and intro full width; then two columns (left: given values and calculation; right: rules, graph, decision); conclusion and answer full width. One column when there is no calculation.
- Fonts: titles and step headings in "Caveat" 700 (tall marker script); body in "Patrick Hand"; load both with one <link> to Google Fonts.
- Colours, each with one job: blue #0020a0 structure (step headings, first title word); red #b00000 what matters most (result, verdict, critical value); green #005010 given values, labels, formula box; brown #803010 the "Example:"/"Given:" heading; orange #d07020 underline under every heading; magenta #b04080 underline under the key intro phrase, decision box border #802050; purple #602070 rule and definition boxes; dark blue #002070 answer box; yellow #f0f0b0 highlighter behind the final number and the conclusion sentence; ink #100020 for other text.
- Boxes: thin rectangles with no fill, except the yellow result box. Lists: black dots, label in green, value in ink. A green "⇒" starts the implication sentence. No emojis, no decorative drawings.

OUTPUT
Reply with ONLY one complete HTML document, from <!DOCTYPE html> to </html>: inline CSS, inline SVG, the Google Fonts <link>, and NO <script> and no other external files. Include print-color-adjust: exact.

LECTURE
${src.title}

${text}`;
}

export async function assistantRun(){
  if(aiVal("aiMode") === "sheet") return aiRunSheet();
  const sample = window.claude && window.claude.use ? await window.claude.use("sample").catch(() => null) : null;
  if(!sample){ $("aiNote").textContent = "The AI Assistant works on the hosted lecture page in Claude."; return; }
  const src = aiSource(), key = aiKey(), len = aiVal("aiLen"), tone = aiVal("aiTone");
  AI.ctl = new AbortController();
  $("aiRunBtn").disabled = true; $("aiStopBtn").hidden = false; $("aiNote").textContent = "Thinking...";
  try {
    const data = await sample.json(aiPrompt(src, len, tone), { signal: AI.ctl.signal, cache: false, onText: () => { $("aiNote").textContent = "Writing..."; } });
    if(!data || !Array.isArray(data.points) || !data.points.length) throw { code: "invalid_json" };
    data.points = data.points.filter(p => p && p.heading && p.text).map(p => ({ heading: String(p.heading), text: String(p.text), terms: Array.isArray(p.terms) ? p.terms.map(String).slice(0, 3) : [] }));
    const rec = { key, title: src.title, sub: src.sub, data, at: Date.now() };
    aiShow(rec); aiSave({ key, title: src.title, sub: src.sub, data, at: rec.at });
    $("aiNote").textContent = "Done. Saved for you.";
  } catch(e) {
    const c = e && e.code;
    $("aiNote").textContent = c === "cancelled" ? "Stopped." : c === "not_granted" || c === "sampling_disabled" ? "Claude is not allowed for this page." : c === "rate_limited" ? "Too many requests. Try again in a minute." : c === "invalid_json" ? "The answer was not in the expected shape. Try again." : "Something went wrong. Try again.";
  } finally { $("aiRunBtn").disabled = false; $("aiStopBtn").hidden = true; AI.ctl = null; }
}
async function aiRunSheet(){
  const sample = window.claude && window.claude.use ? await window.claude.use("sample").catch(() => null) : null;
  if(!sample){ $("aiNote").textContent = "The AI Assistant works on the hosted lecture page in Claude."; return; }
  const src = aiSource(), key = aiKey();
  AI.ctl = new AbortController();
  $("aiRunBtn").disabled = true; $("aiStopBtn").hidden = false; $("aiNote").textContent = "Designing... this can take a minute or two.";
  try {
    const { text, truncated } = await sample(aiSheetPrompt(src, aiVal("aiLen"), aiVal("aiTone")), { signal: AI.ctl.signal, cache: false, onText: ({ text }) => { $("aiNote").textContent = "Drawing the page... " + Math.round(text.length / 1000) + "k characters"; } });
    const html = aiCleanHtml(text);
    if(!html) throw { code: "invalid_html" };
    const rec = { key, title: src.title, sub: src.sub, html, at: Date.now() };
    aiShow(rec); aiSave(rec);
    $("aiNote").textContent = truncated ? "The page was cut short. Try Short length." : "Done. Saved for you.";
  } catch(e) {
    const c = e && e.code;
    $("aiNote").textContent = c === "cancelled" ? "Stopped." : c === "not_granted" || c === "sampling_disabled" ? "Claude is not allowed for this page." : c === "rate_limited" ? "Too many requests. Try again in a minute." : c === "invalid_html" ? "The answer was not a page. Try again." : "Something went wrong. Try again.";
  } finally { $("aiRunBtn").disabled = false; $("aiStopBtn").hidden = true; AI.ctl = null; }
}
// Keep only the HTML document; drop scripts, event handlers and external files other than Google Fonts.
function aiCleanHtml(t){
  const a = t.search(/<!DOCTYPE html>|<html[\s>]/i), b = t.toLowerCase().lastIndexOf("</html>");
  if(a < 0 || b < a) return "";
  return t.slice(a, b + 7).replace(/<script[\s\S]*?<\/script>/gi, "").replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*')/gi, "")
    .replace(/<link\b(?![^>]*fonts\.googleapis\.com)[^>]*>/gi, "").replace(/<(iframe|object|embed)[\s\S]*?>/gi, "");
}

export function assistantStop(){ if(AI.ctl) AI.ctl.abort(); }

const aiName = ext => slug() + "-summary." + ext;

export async function assistantDownload(f){
  const r = AI.cur; if(!r) return;
  const title = r.data.title || r.title;
  if(f === "md") return download(aiName("md"), "# " + title + "\n\n" + r.md + "\n", "text/markdown");
  if(f === "txt") return download(aiName("txt"), title + "\n\n" + plainText(r.md) + "\n", "text/plain");
  if(f === "docx") return download(aiName("docx"), await aiDocx(r, "friendly"), "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
}

export async function assistantNotes(){
  const r = AI.cur; if(!r) return;
  if(r.html){
    const fmt = aiVal("aiSheetFmt"), base = slug() + "-study-sheet";
    try {
      if(fmt === "file") return download(base + ".html", r.html, "text/html");
      if(fmt === "html"){ const h = r.html.replace("</body>", "<script>window.addEventListener('load',function(){setTimeout(function(){window.print()},900)})<\/script></body>"); if(printHere(h)) return; return download(base + ".html", h, "text/html"); }
      $("aiNote").textContent = "Drawing the image...";
      const [W, H] = AI_SIZES[fmt], blob = await aiImage(r.html.replace("</head>", "<style>html,body{margin:0}body{width:794px;max-width:none;box-sizing:border-box;min-height:100vh}</style></head>"), W, H, 794);
      $("aiNote").textContent = "";
      return download(base + "-" + fmt + ".png", blob, "image/png");
    } catch(e) { $("aiNote").textContent = "Couldn't make the file: " + ((e && e.message) || "unknown error"); return; }
  }
  const style = aiVal("aiStyle"), fmt = aiVal("aiFmt"), title = r.data.title || r.title, base = slug() + "-notes-" + style;
  try {
    if(fmt === "docx") return download(base + ".docx", await aiDocx(r, style), "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    if(fmt === "html"){
      const html = style === "handnotes" ? await aiPoster(r, title, true, 1.414) : await printPage(r.md, title, r.sub, style, { autoPrint: true });
      if(printHere(html)) return;
      return download(base + ".html", html, "text/html");
    }
    $("aiNote").textContent = "Drawing the image...";
    const [W, H] = AI_SIZES[fmt];
    const blob = style === "handnotes" ? await aiImage(await aiPoster(r, title, false, H / W), W, H, 1080)
      : await aiImage(await printPage(r.md, title, r.sub, style, { css: "body{width:820px;max-width:none;margin:0}" }), W, H, 820);
    $("aiNote").textContent = "";
    return download(base + "-" + fmt + ".png", blob, "image/png");
  } catch(e) { $("aiNote").textContent = "Couldn't make the file: " + ((e && e.message) || "unknown error"); }
}

// ---------- helpers: libraries, image, docx ----------
function aiLib(name){
  if(window[name]) return Promise.resolve(window[name]);
  return new Promise((ok, no) => { const s = document.createElement("script"); s.src = AI_LIBS[name]; s.onload = () => window[name] ? ok(window[name]) : no(new Error(name + " did not load")); s.onerror = () => no(new Error(name + " could not be loaded")); document.head.appendChild(s); });
}

// Draws the page at baseW CSS px wide and returns a PNG of exactly W x H px.
async function aiImage(html, W, H, baseW){
  const h2c = await aiLib("html2canvas");
  // html2canvas draws text on a canvas of THIS page: the hand fonts must be loaded here too, or it draws a fallback font at the hand font's positions (overlapping words).
  if(!document.getElementById("aiFonts")){ const l = document.createElement("link"); l.id = "aiFonts"; l.rel = "stylesheet"; l.href = AI_FONT_URL; document.head.appendChild(l); await new Promise(r => { l.onload = l.onerror = r; setTimeout(r, 4000); }); }
  try { await Promise.all(["20px 'Patrick Hand'", "700 20px Caveat", "600 20px Caveat", "20px 'Permanent Marker'", "700 20px Mali", "600 20px Mali"].map(f => document.fonts.load(f))); } catch(e) {}
  const baseH = Math.round(baseW * H / W);
  const f = document.createElement("iframe"); f.style.cssText = "position:fixed;left:-12000px;top:0;border:0;width:" + baseW + "px;height:" + baseH + "px";
  document.body.appendChild(f);
  try {
    const d = f.contentDocument; d.open(); d.write(html); d.close();
    await new Promise(r => { f.contentWindow.addEventListener("load", r, { once: true }); setTimeout(r, 1500); });
    try { await d.fonts.ready; } catch(e) {}
    await new Promise(r => setTimeout(r, 300));
    const pz = d.querySelector(".pz");
    if(pz){   // poster: shrink the type until everything fits the frame
      const st = (n, v) => d.documentElement.style.setProperty(n, v.toFixed(2)), tt = pz.querySelector(".tt");
      for(let t = 1.6; t >= 0.5; t -= 0.04){ st("--t", t); if(!tt || tt.scrollWidth <= tt.clientWidth + 2) break; }          // title: as big as its width allows
      for(let k = 1.9; k >= 0.5; k -= 0.04){ st("--k", k); pz.style.minHeight = "0"; const fits = pz.scrollHeight <= baseH * 0.94; pz.style.minHeight = ""; if(fits) break; }   // body: as big as the height allows
    }
    const hc = pz ? baseH : Math.max(baseH, d.documentElement.scrollHeight);
    f.style.height = hc + "px";
    const k = Math.min(W / baseW, H / hc);
    const shot = await h2c(d.documentElement, { scale: k, windowWidth: baseW, width: baseW, height: hc, backgroundColor: null, useCORS: true, logging: false });
    const out = document.createElement("canvas"); out.width = W; out.height = H;
    const g = out.getContext("2d"); g.fillStyle = getComputedStyle(d.body).backgroundColor || "#ffffff"; g.fillRect(0, 0, W, H);
    g.drawImage(shot, Math.round((W - shot.width) / 2), 0);
    if(shot.width < W * 0.97) toast("Long content: scaled to fit " + W + " × " + H);
    return await new Promise((ok, no) => out.toBlob(b => b ? ok(b) : no(new Error("empty image")), "image/png"));
  } finally { f.remove(); }
}

const AI_FONT_URL = "https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Mali:wght@600;700&family=Patrick+Hand&family=Permanent+Marker&display=swap";

// ---------- Handwritten notes poster (pattern: "How to Generate Handwritten & Hand-Drawn Notes with AI") ----------
const POSTER_ART = ["bulb", "notebook", "pencil", "globe", "bubble", "cup", "openbook", "books", "plant", "smile", "cloud", "star_blue", "star_orange", "star_green", "star_pink", "star_blue2", "heart"];
const AI_DOODLE = {   // doodles, hand-drawn look: dark outline, soft fills
  bulb: "<svg viewBox='0 0 100 100'><g stroke='#2b2b2b' stroke-width='3' stroke-linecap='round' fill='none'><path d='M50 8v8M22 20l6 6M78 20l-6 6M10 46h9M81 46h9' stroke='#f5b400' stroke-width='4'/><path d='M34 62c-8-6-12-14-12-22a28 28 0 0156 0c0 8-4 16-12 22v8H34z' fill='#ffd43b'/><path d='M42 52l4 10M58 52l-4 10M42 52c4-4 12-4 16 0'/><path d='M34 72h32M36 80h28M40 88h20' stroke='#7c7c7c'/></g></svg>",
  star: c => "<svg viewBox='0 0 100 100'><path d='M50 8l11 27 29 2-22 19 7 29-25-16-25 16 7-29-22-19 29-2z' fill='none' stroke='" + c + "' stroke-width='6' stroke-linejoin='round'/></svg>",
  smile: "<svg viewBox='0 0 100 100'><path d='M50 6l12 28 30 2-23 20 8 30-27-17-27 17 8-30-23-20 30-2z' fill='#ffd43b' stroke='#2b2b2b' stroke-width='3' stroke-linejoin='round'/><circle cx='42' cy='46' r='3' fill='#2b2b2b'/><circle cx='58' cy='46' r='3' fill='#2b2b2b'/><path d='M42 56q8 7 16 0' stroke='#2b2b2b' stroke-width='3' fill='none' stroke-linecap='round'/><circle cx='36' cy='54' r='3' fill='#f9a8d4'/><circle cx='64' cy='54' r='3' fill='#f9a8d4'/></svg>",
  pencil: "<svg viewBox='0 0 100 100'><g transform='rotate(35 50 50)' stroke='#2b2b2b' stroke-width='3' stroke-linejoin='round'><rect x='38' y='4' width='24' height='14' rx='5' fill='#f472b6'/><rect x='38' y='18' width='24' height='8' fill='#cbd5e1'/><rect x='38' y='26' width='24' height='48' fill='#fcd34d'/><path d='M38 74h24L50 98z' fill='#f5d0a9'/><path d='M46 90l4 8 4-8z' fill='#2b2b2b'/></g></svg>",
  notebook: "<svg viewBox='0 0 100 100'><g stroke='#2b2b2b' stroke-width='2.5'><rect x='18' y='12' width='70' height='80' rx='4' fill='#fff' transform='rotate(-8 50 50)'/><g transform='rotate(-8 50 50)' fill='none' stroke='#93c5fd' stroke-width='2'><path d='M28 40h52M28 52h52M28 64h52M28 76h52'/></g><g fill='#fff'><circle cx='16' cy='24' r='4'/><circle cx='17' cy='38' r='4'/><circle cx='18' cy='52' r='4'/><circle cx='19' cy='66' r='4'/><circle cx='20' cy='80' r='4'/></g><rect x='40' y='4' width='26' height='12' fill='#f9a8d4' transform='rotate(-14 53 10)' stroke-width='1.5'/></g></svg>",
  books: "<svg viewBox='0 0 140 110'><g stroke='#2b2b2b' stroke-width='3' stroke-linejoin='round'><rect x='10' y='8' width='112' height='28' rx='4' fill='#f472b6' transform='rotate(-4 66 22)'/><rect x='16' y='40' width='110' height='28' rx='4' fill='#fcd34d'/><rect x='8' y='72' width='118' height='30' rx='4' fill='#3b82f6'/></g></svg>",
  plant: "<svg viewBox='0 0 100 100'><g stroke='#2b2b2b' stroke-width='3' stroke-linejoin='round'><path d='M50 58C40 40 26 36 20 40c6 12 18 18 30 18zM50 58c10-18 24-22 30-18-6 12-18 18-30 18zM50 58c-2-20 4-32 10-36 2 14-4 28-10 36z' fill='#4ade80'/><path d='M26 58h48l-6 34H32z' fill='#fff'/></g><g fill='#2b2b2b'><circle cx='40' cy='70' r='2.5'/><circle cx='54' cy='76' r='2.5'/><circle cx='44' cy='84' r='2.5'/><circle cx='60' cy='66' r='2.5'/></g></svg>",
  cup: "<svg viewBox='0 0 100 100'><g stroke='#2b2b2b' stroke-width='3' stroke-linejoin='round'><rect x='34' y='6' width='9' height='44' rx='3' fill='#a855f7' transform='rotate(-10 38 28)'/><rect x='46' y='4' width='9' height='46' rx='3' fill='#22c55e'/><rect x='58' y='8' width='9' height='42' rx='3' fill='#f472b6' transform='rotate(10 62 28)'/><path d='M26 42h48l-5 50H31z' fill='#3b82f6'/></g><path d='M50 74c-8-6-10-12-6-15 3-2 6 0 6 2 0-2 3-4 6-2 4 3 2 9-6 15z' fill='#fff'/></svg>",
  openbook: "<svg viewBox='0 0 120 90'><g stroke='#2b2b2b' stroke-width='3' stroke-linejoin='round'><path d='M10 20q25-10 50 4v58q-25-12-50-4z' fill='#fff'/><path d='M110 20q-25-10-50 4v58q25-12 50-4z' fill='#fff'/><path d='M6 26v58q27-8 54 4 27-12 54-4V26' fill='none' stroke='#3b82f6'/></g><g stroke='#93c5fd' stroke-width='2'><path d='M18 36q16-4 34 2M18 48q16-4 34 2M18 60q16-4 34 2M68 38q16-6 34-2M68 50q16-6 34-2M68 62q16-6 34-2'/></g><path d='M84 72v18l5-5 5 5V70' fill='#f472b6' stroke='#2b2b2b' stroke-width='2'/></svg>",
  globe: "<svg viewBox='0 0 100 100'><g stroke='#2b2b2b' stroke-width='3'><circle cx='50' cy='42' r='30' fill='#3b82f6'/><path d='M34 24c8 2 10 10 4 14s0 12 8 12-2 14-12 10M60 16c4 8 14 6 16 14s-8 10-6 18 6 4 8 0' fill='#22c55e' stroke-width='2'/><path d='M22 22a40 40 0 0056 46M50 78v10M34 90h32' fill='none'/></g></svg>",
  bubble: "<svg viewBox='0 0 100 80'><path d='M14 8h72a8 8 0 018 8v34a8 8 0 01-8 8H40L22 74l4-16H14a8 8 0 01-8-8V16a8 8 0 018-8z' fill='#fff' stroke='#2b2b2b' stroke-width='3' stroke-linejoin='round'/><g fill='#2b2b2b'><circle cx='34' cy='33' r='4'/><circle cx='50' cy='33' r='4'/><circle cx='66' cy='33' r='4'/></g></svg>",
  heart: c => "<svg viewBox='0 0 100 100'><path d='M50 86C20 64 10 46 18 30c7-14 26-14 32 2 6-16 25-16 32-2 8 16-2 34-32 56z' fill='" + c + "' stroke='#2b2b2b' stroke-width='2'/></svg>",
  dashes: c => "<svg viewBox='0 0 60 40'><path d='M6 8l14 6M4 22h16M6 36l14-6' stroke='" + c + "' stroke-width='5' stroke-linecap='round'/></svg>",
  cloud: "<svg viewBox='0 0 260 200' preserveAspectRatio='none'><path d='M60 150c-34 4-52-30-34-54-16-26 8-56 36-48 8-28 46-36 64-14 18-24 60-16 66 14 32-2 48 34 30 56 18 22-2 54-30 48-6 22-34 26-50 12-6 18-34 24-48 8z' fill='#fff' stroke='#a855f7' stroke-width='5' stroke-linejoin='round'/><path d='M60 150c-8 14-18 26-30 32 16 0 30-8 40-20' fill='#fff' stroke='#a855f7' stroke-width='5' stroke-linejoin='round'/></svg>"
};
const POSTER_BOX = [["#e06090", "#fbd3e2"], ["#50a030", "#d6efc8"], ["#f0a020", "#fde7b0"]];   // pink, green, yellow: sampled from the reference
const POSTER_LINE = [["#0050c0", ""], ["#007010", "#d0e090"], ["#f06000", "#f0d0a0"], ["#0e1221", ""], ["#5030b0", ""]];

async function aiPoster(r, title, print, aspect){
  const img = {}; await Promise.all(POSTER_ART.map(async n => { try { img[n] = await assetDataUri("assets/images/notes/" + n + ".png"); } catch(e) { img[n] = ""; } }));
  const cols = aspect >= 1.6 ? 2 : 3;
  const d = r.data, words = String(d.title || title).split(/\s+/), lines = [];
  words.forEach(w => { const l = lines[lines.length - 1]; if(l && (l + " " + w).length <= 13 && lines.length) lines[lines.length - 1] = l + " " + w; else lines.push(w); });
  const big = lines.length <= 3;
  const tl = lines.map((l, i) => { const [c, hl] = POSTER_LINE[i % POSTER_LINE.length]; return "<div class='tl" + (hl ? " hl" : "") + "' style='color:" + c + (hl ? ";--hl:" + hl : "") + "'>" + esc(l) + "</div>"; }).join("") + "<svg class='wv' viewBox='0 0 280 14' preserveAspectRatio='none' style='width:" + Math.min(560, 40 + 30 * Math.max(...lines.map(l => l.length))) + "px'><path d='M2 7 Q9 1 16 7 T30 7 T44 7 T58 7 T72 7 T86 7 T100 7 T114 7 T128 7 T142 7 T156 7 T170 7 T184 7 T198 7 T212 7 T226 7 T240 7 T254 7 T268 7 T278 7' fill='none' stroke='#e07090' stroke-width='3' stroke-linecap='round'/></svg>";
  const steps = d.points.map((p, i) => { const [c, soft] = POSTER_BOX[i % 3]; return "<div class='st' style='--c:" + c + ";--s:" + soft + "'><span class='n'>" + (i + 1) + "</span><b>" + esc(p.heading) + "</b><p>" + esc(p.text) + "</p>"
    + (p.terms.length ? "<div class='tm'>" + p.terms.map(t => "<u>" + esc(t) + "</u>").join(" ") + "</div>" : "") + "</div>"; }).join("");
  const sl = String(d.slogan || "").toUpperCase().split(/\s+/);
  const slogan = sl.map((w, i) => i === 1 ? "<em>" + esc(w) + "</em>" : esc(w)).join(" ");
  const at = (svg, css) => "<div class='dd' style='" + css + "'>" + svg + "</div>";
  const css = `
*{box-sizing:border-box;margin:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}
html{--k:1}
body{width:1080px;height:${print ? "auto" : "100vh"};min-height:100vh;overflow:hidden;position:relative;background:#fafbf8;font-family:"Patrick Hand","Comic Sans MS",cursive;color:#1f2937}
.dd{position:absolute;pointer-events:none;height:auto}.dd svg{width:100%;height:100%;display:block}
.nb{position:absolute;left:34%;top:34%;font:600 17px/1.15 Mali,cursive;transform:rotate(-8deg);color:#1f2937}
.bk{position:absolute;left:0;right:0;text-align:center;font:600 16px/1 Mali,cursive;color:#1f2937;letter-spacing:.5px}
.pz{position:relative;z-index:1;min-height:${print ? "auto" : "100vh"};display:flex;flex-direction:column;justify-content:space-evenly;padding:calc(50px*var(--k)) 96px calc(175px*var(--k));text-align:center}
.tt{font-family:Mali,"Patrick Hand",cursive;font-weight:700;line-height:1.08;margin:0 170px;font-size:calc(${big ? 96 : 78}px*var(--t,1))}
.tl{display:block;position:relative;white-space:nowrap}
.tl.hl span,.tl.hl{background:linear-gradient(transparent 58%,var(--hl) 58%,var(--hl) 90%,transparent 90%);display:table;margin:0 auto;padding:0 10px}
.wv{display:block;height:14px;margin:calc(6px*var(--k)) auto 0}
.sub{display:inline-block;margin:calc(26px*var(--k)) auto 0;padding:calc(14px*var(--k)) 34px;border:3px dashed #8ab4e8;border-radius:60px;background:#eaf3fc;color:#0e1221;font-size:calc(30px*var(--k));line-height:1.25;max-width:880px}
.meta{font-size:calc(19px*var(--k));color:#64748b;margin-top:calc(8px*var(--k))}
.steps{display:flex;flex-wrap:wrap;justify-content:center;gap:calc(30px*var(--k)) 46px;margin:calc(30px*var(--k)) 0 0;text-align:left}
.st{width:calc((100% - ${cols - 1} * 46px) / ${cols})}
.st{position:relative;border:3px dashed var(--c);border-radius:22px;padding:calc(30px*var(--k)) 18px calc(16px*var(--k)) 22px;background:#fff}
.st:not(:nth-child(${cols}n)):not(:last-child)::after{content:"→";position:absolute;right:-40px;top:42%;font-size:calc(34px*var(--k));color:#1f2937;font-family:Mali,cursive}
.st .n{position:absolute;left:-14px;top:-18px;width:calc(46px*var(--k));height:calc(46px*var(--k));border-radius:50%;background:var(--s);border:3px solid var(--c);color:var(--c);font:700 calc(26px*var(--k))/1 Mali,cursive;display:grid;place-items:center}
.st b{display:block;font-family:Mali,cursive;font-weight:600;font-size:calc(25px*var(--k));line-height:1.2;color:#1f2937;margin-bottom:calc(6px*var(--k))}
.st p{font-size:calc(21px*var(--k));line-height:1.3}
.tm{margin-top:calc(8px*var(--k));font-size:calc(19px*var(--k))}.tm u{text-decoration:none;border-bottom:3px dotted var(--c);padding-bottom:2px;margin-right:10px}
.ft{position:absolute;left:50%;transform:translateX(-50%);bottom:calc(38px*var(--k));z-index:2;padding:calc(12px*var(--k)) 34px;border:3px solid #f0a0c0;border-radius:40px;background:#fdeef4;color:#0e1221;font-size:calc(25px*var(--k));line-height:1.25;width:max-content;max-width:640px;text-align:center}
.cl{position:absolute;right:22px;top:22px;width:212px;height:170px;z-index:2;display:grid;place-items:center;text-align:center}
.cl svg,.cl img{position:absolute;inset:0;width:100%;height:100%}
.cl span{position:relative;font-family:Mali,cursive;font-weight:600;font-size:20px;line-height:1.15;padding:0 34px 34px;color:#0e1221}.cl em{font-style:normal;color:#e04080}
@media print{body{height:auto;overflow:visible}.ft{position:static;transform:none;display:inline-block;margin:30px auto}}
`;
  const pic = (n, css) => img[n] ? "<img class='dd' src='" + img[n] + "' style='" + css + "' alt=''>" : "";
  const doodles = pic("bulb", "left:30px;top:18px;width:120px") + pic("star_blue", "left:40px;top:205px;width:34px") + pic("star_orange", "left:120px;top:186px;width:46px")
    + pic("notebook", "left:14px;top:262px;width:122px") + pic("pencil", "right:6px;top:236px;width:84px") + pic("star_green", "right:110px;top:228px;width:30px")
    + pic("globe", "left:6px;top:58%;width:78px") + pic("cup", "right:6px;top:55%;width:72px")
    + pic("books", "left:14px;bottom:14px;width:170px") + pic("plant", "left:188px;bottom:16px;width:62px")
    + pic("heart", "left:300px;bottom:104px;width:32px") + pic("star_pink", "right:330px;bottom:108px;width:30px") + pic("star_blue2", "left:270px;bottom:150px;width:26px")
    + pic("bubble", "right:250px;bottom:96px;width:78px") + pic("openbook", "right:128px;bottom:22px;width:118px") + pic("smile", "right:22px;bottom:18px;width:96px")
    + at(AI_DOODLE.dashes("#e07090"), "left:250px;top:40px;width:40px;height:28px") + at(AI_DOODLE.dashes("#e07090"), "right:220px;top:190px;width:36px;height:26px");
  return "<!DOCTYPE html><html lang='en'><head><meta charset='utf-8'><title>" + esc(d.title || title) + "</title><link rel='stylesheet' href='" + AI_FONT_URL + "'><style>" + css + "</style></head><body>"
    + doodles + "<div class='cl'>" + (img.cloud ? "<img src='" + img.cloud + "' alt=''>" : AI_DOODLE.cloud) + "<span>" + slogan + "</span></div>"
    + "<div class='pz'><div class='tt'>" + tl + "</div>" + (d.subtitle ? "<div class='sub'>" + esc(d.subtitle) + "</div>" : "") + "<div class='meta'>" + esc(r.sub) + "</div>"
    + "<div class='steps'>" + steps + "</div></div>"
    + (d.takeaway ? "<div class='ft'>" + esc(d.takeaway) + " →</div>" : "")
    + (print ? "<script>window.addEventListener('load',function(){setTimeout(function(){window.print()},900)})<\/script>" : "") + "</body></html>";
}

const AI_DOCX_LOOK = {
  friendly: { head: "Segoe UI", body: "Segoe UI", colors: ["1F2937"], box: "CBD5E1", dash: false, term: "E0E7FF", hl: "FEF9C3" },
  notebook: { head: "Caveat", body: "Patrick Hand", colors: ["1D3FBF", "B45309", "7C3AED"], box: "15803D", dash: false, term: "FCE7F3", hl: "FEF08A" },
  sketch: { head: "Permanent Marker", body: "Patrick Hand", colors: ["1F2A44"], box: "1F2A44", dash: false, term: "FECDD3", hl: "FDE68A" },
  binder: { head: "Caveat", body: "Patrick Hand", colors: ["1F2937"], box: "2563EB", dash: false, term: "FEF08A", hl: "FEF08A" },
  handnotes: { head: "Caveat", body: "Patrick Hand", colors: ["1D4ED8", "15803D", "EA580C"], box: "F472B6", boxes: ["F472B6", "4ADE80", "FBBF24"], dash: true, term: "FBCFE8", hl: "FEF08A" }
};
const xe = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function aiDocx(r, style){
  const Z = await aiLib("JSZip"), L = AI_DOCX_LOOK[style] || AI_DOCX_LOOK.friendly, d = r.data;
  const run = (t, o = {}) => "<w:r><w:rPr><w:rFonts w:ascii='" + (o.font || L.body) + "' w:hAnsi='" + (o.font || L.body) + "'/>" + (o.b ? "<w:b/>" : "") + (o.i ? "<w:i/>" : "")
    + "<w:color w:val='" + (o.color || "1F2937") + "'/><w:sz w:val='" + (o.size || 24) + "'/>" + (o.shd ? "<w:shd w:val='clear' w:color='auto' w:fill='" + o.shd + "'/>" : "") + "</w:rPr><w:t xml:space='preserve'>" + xe(t) + "</w:t></w:r>";
  const para = (runs, o = {}) => "<w:p><w:pPr><w:spacing w:after='" + (o.after == null ? 120 : o.after) + "'/>" + (o.center ? "<w:jc w:val='center'/>" : "") + "</w:pPr>" + runs + "</w:p>";
  const col = i => L.colors[i % L.colors.length], boxc = i => (L.boxes || [L.box])[i % (L.boxes || [L.box]).length];
  const border = c => ["top", "left", "bottom", "right"].map(s => "<w:" + s + " w:val='" + (L.dash ? "dashed" : "single") + "' w:sz='12' w:space='0' w:color='" + c + "'/>").join("");
  let body = para(run(d.title || r.title, { font: L.head, size: 56, b: true, color: col(0) }), { center: true, after: 60 })
    + para(run(r.sub, { size: 20, color: "64748B" }), { center: true, after: 200 })
    + (d.subtitle ? para(run(d.subtitle, { i: true, size: 24, shd: L.hl }), { center: true, after: 240 }) : "");
  d.points.forEach((p, i) => {
    const cell = para(run((i + 1) + ". " + p.heading, { font: L.head, size: 34, b: true, color: col(i) }), { after: 60 })
      + para(run(p.text), { after: p.terms.length ? 60 : 0 })
      + (p.terms.length ? para(p.terms.map((t, j) => (j ? run("  ") : "") + run(" " + t + " ", { b: true, size: 20, shd: L.term })).join(""), { after: 0 }) : "");
    body += "<w:tbl><w:tblPr><w:tblW w:w='5000' w:type='pct'/><w:tblBorders>" + border(boxc(i)) + "</w:tblBorders><w:tblCellMar><w:top w:w='120' w:type='dxa'/><w:left w:w='160' w:type='dxa'/><w:bottom w:w='120' w:type='dxa'/><w:right w:w='160' w:type='dxa'/></w:tblCellMar></w:tblPr>"
      + "<w:tblGrid><w:gridCol w:w='9900'/></w:tblGrid><w:tr><w:tc><w:tcPr><w:tcW w:w='5000' w:type='pct'/></w:tcPr>" + cell + "</w:tc></w:tr></w:tbl>" + para("", { after: 120 });
  });
  if(d.takeaway) body += para(run("Takeaway: ", { font: L.head, size: 30, b: true, color: col(1) }) + run(d.takeaway, { shd: L.hl }), { after: 200 });
  if(d.slogan) body += para(run(d.slogan, { font: L.head, size: 40, b: true, color: col(2) }), { center: true });
  const doc = "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><w:document xmlns:w='http://schemas.openxmlformats.org/wordprocessingml/2006/main'><w:body>" + body
    + "<w:sectPr><w:pgSz w:w='11906' w:h='16838'/><w:pgMar w:top='1000' w:right='1000' w:bottom='1000' w:left='1000' w:header='500' w:footer='500' w:gutter='0'/></w:sectPr></w:body></w:document>";
  const z = new Z();
  z.file("[Content_Types].xml", "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Types xmlns='http://schemas.openxmlformats.org/package/2006/content-types'><Default Extension='rels' ContentType='application/vnd.openxmlformats-package.relationships+xml'/><Default Extension='xml' ContentType='application/xml'/><Override PartName='/word/document.xml' ContentType='application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml'/></Types>");
  z.file("_rels/.rels", "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Relationships xmlns='http://schemas.openxmlformats.org/package/2006/relationships'><Relationship Id='rId1' Type='http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument' Target='word/document.xml'/></Relationships>");
  z.file("word/document.xml", doc);
  return z.generateAsync({ type: "blob", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
}
