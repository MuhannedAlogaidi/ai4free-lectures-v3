/* Lecture dialect to HTML: inline, highlight, code blocks, renderBox, renderBlocks, Mermaid, plainText. */
import { S } from "./state.js";
import { esc } from "./app.js";
import { ASSET_MAP } from "./content-loader.js";
import { renderVideo, hydrateVideos } from "./video.js";
import { renderWalkthrough, hydrateWalkthroughs } from "./walkthrough.js";
/* ---------- Rich content renderer (no libraries) ---------- */
export const COLORS = ["red","orange","amber","yellow","green","teal","blue","indigo","purple","pink","gray","brand"];
export const HINT_TYPES = { info:"Info", tip:"Tip", note:"Note", success:"Success", warning:"Warning", danger:"Danger", example:"Example",
  objective:"What you will learn", prereq:"Before you start", important:"Important", best:"Best practice", mistake:"Common mistake",
  definition:"Definition", takeaway:"Key takeaway", exercise:"Exercise", question:"Check yourself" };
export const ICONS = {
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/>',
  tip:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
  note:'<path d="M5 4h14v16H5z"/><path d="M9 9h6M9 13h6M9 17h3"/>',
  success:'<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.5 2.5L16 9.5"/>',
  warning:'<path d="M12 3.5 2.5 20h19z"/><path d="M12 10v4.5M12 17.2h.01"/>',
  danger:'<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
  example:'<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  objective:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  prereq:'<path d="M9 5h10M9 12h10M9 19h10"/><path d="m3.5 5 1 1 2-2M3.5 12l1 1 2-2M3.5 19l1 1 2-2"/>',
  important:'<path d="M12 3 3 8v8l9 5 9-5V8z"/><path d="M12 8v5M12 16.2h.01"/>',
  best:'<path d="M12 3.5 14.6 9l6 .6-4.5 4 1.3 5.9L12 16.6 6.6 19.5 7.9 13.6 3.4 9.6l6-.6z"/>',
  mistake:'<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
  definition:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M8 7h7"/>',
  takeaway:'<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3"/>',
  exercise:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  question:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 16.5h.01"/>',
  rocket:'<path d="M5 15c-1.5 1.3-2 4-2 6 2 0 4.7-.5 6-2M14 4c3-1 6-1 6-1s0 3-1 6l-7 7-5-5z"/><path d="M9 11 6 10l-2 2 4 1M13 15l1 3 2-2-1-4"/><circle cx="15.5" cy="8.5" r="1.5"/>',
  star:'<path d="M12 3.5 14.6 9l6 .6-4.5 4 1.3 5.9L12 16.6 6.6 19.5 7.9 13.6 3.4 9.6l6-.6z"/>',
  bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  shield:'<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/>',
  key:'<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M14 9l2 2"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
  terminal:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M12 15h5"/>',
  heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  x:'<path d="m6 6 12 12M18 6 6 18"/>',
  chevron:'<path d="m9 6 6 6-6 6"/>'
};
export const ICON_NAMES = Object.keys(ICONS);
export const svgIcon = (name, size) => '<svg width="'+(size||20)+'" height="'+(size||20)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(ICONS[name]||ICONS.note)+'</svg>';
export const hintIcon = t => svgIcon(t);
export const PALETTE = { red:["#fef2f2","#fecaca","#ef4444","#7f1d1d"], orange:["#fff7ed","#fed7aa","#f97316","#7c2d12"], amber:["#fffbeb","#fde68a","#f59e0b","#78350f"],
  yellow:["#fefce8","#fef08a","#eab308","#713f12"], green:["#f0fdf4","#bbf7d0","#22c55e","#14532d"], teal:["#f0fdfa","#99f6e4","#14b8a6","#134e4a"],
  blue:["#eff6ff","#bfdbfe","#3b82f6","#1e3a8a"], indigo:["#eef2ff","#c7d2fe","#6366f1","#312e81"], purple:["#faf5ff","#e9d5ff","#a855f7","#581c87"],
  pink:["#fdf2f8","#fbcfe8","#ec4899","#831843"], gray:["#f8fafc","#e2e8f0","#64748b","#334155"], brand:["#eef1f5","#cdd5df","#364759","#1f2937"] };

export function colorSpan(spec, inner){
  const parts = spec.split(/\s+/).filter(Boolean), cls = [], style = [];
  parts.forEach(p => {
    let bg = p.startsWith("bg-"), v = bg ? p.slice(3) : p;
    if(/^#[0-9a-f]{3,8}$/i.test(v)) style.push((bg ? "background:" : "color:") + v + (bg ? ";padding:0 3px;border-radius:3px" : ""));
    else if(COLORS.includes(v)) cls.push((bg ? "bg-" : "c-") + v);
  });
  return "<span" + (cls.length ? " class='"+cls.join(" ")+"'" : "") + (style.length ? " style='"+style.join(";")+"'" : "") + ">" + inner + "</span>";
}

export function inline(src){
  const keep = [];
  let s = esc(src).replace(/`([^`]+)`/g, (m, c) => { keep.push("<code>"+c+"</code>"); return "\u0000"+(keep.length-1)+"\u0000"; });
  s = s.replace(/\[\[([^\[\]]{1,40})\]\]/g, "<kbd>$1</kbd>")
       .replace(/\[!([^\]|]{1,40})(?:\|(\w+))?\]/g, (m, t, c) => "<span class='badge" + (c && PALETTE[c] ? " b-"+c : "") + "'>" + t + "</span>")
       .replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;(.*?)&quot;)?\)/g, (m, alt, src2, cap) => cap ? "<span class='fig'><img alt='"+alt+"' src='"+(ASSET_MAP[src2] || src2)+"'><span class='cap'>"+cap+"</span></span>" : "<img alt='"+alt+"' src='"+(ASSET_MAP[src2] || src2)+"'>")
       .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "<a href='$2' target='_blank' rel='noopener'>$1</a>")
       .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
       .replace(/__(.+?)__/g, "<u>$1</u>")
       .replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, "$1<em>$2</em>")
       .replace(/~~(.+?)~~/g, "<s>$1</s>")
       .replace(/==(.+?)==/g, "<mark>$1</mark>");
  let prev;
  do { prev = s; s = s.replace(/\{([#\w\- ]+)\|([^{}]*)\}/g, (m, spec, inner) => colorSpan(spec, inner)); } while(s !== prev);
  return s.replace(/\u0000(\d+)\u0000/g, (m, i) => keep[+i]);
}

export const KW = "const let var function return if else for while do switch case break continue new class extends import from export default async await try catch finally throw typeof instanceof in of true false null undefined def elif lambda pass yield with as None True False and or not is self print echo fi then esac done sudo cd export FROM RUN CMD COPY ADD WORKDIR EXPOSE ENV ARG ENTRYPOINT USER VOLUME LABEL SELECT INSERT UPDATE DELETE CREATE TABLE WHERE JOIN ON INTO VALUES AND OR NOT NULL PRIMARY KEY public private static void int string bool".split(" ");
export function highlight(code, lang){
  const out = []; let m;
  const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|(?:^|\s)#[^\n]*|--[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|(^[ \t-]*[\w.\-]+(?=:\s|:$))|([A-Za-z_]\w*)/gm;
  let last = 0;
  const isShell = /^(bash|sh|shell|zsh|console|terminal|yaml|yml|python|py|dockerfile|toml|ini|env|powershell)$/i.test(lang||"");
  const isSql = /^sql$/i.test(lang||"");
  while((m = re.exec(code))){
    out.push(esc(code.slice(last, m.index)));
    let t = m[0], cls = null;
    if(m[1]){
      const isHash = /^\s*#/.test(t), isDash = t.startsWith("--"), isSlash = t.startsWith("/");
      const afterColon = code[m.index-1] === ":";
      if((isHash && !isShell) || (isDash && !isSql) || (isSlash && (isShell || afterColon))){ re.lastIndex = m.index + (t.match(/^\s*/)[0].length || 1); out.push(esc(t.slice(0, re.lastIndex - m.index))); last = re.lastIndex; continue; }
      cls = "tk-c";
    }
    else if(m[2]) cls = "tk-s";
    else if(m[3]) cls = "tk-n";
    else if(m[4]) cls = /^(yaml|yml)$/i.test(lang||"") ? "tk-key" : null;
    else if(m[5]) cls = KW.includes(t) ? "tk-k" : null;
    out.push(cls ? "<span class='"+cls+"'>"+esc(t)+"</span>" : esc(t));
    last = re.lastIndex;
  }
  out.push(esc(code.slice(last)));
  return out.join("");
}

export const COPY_SVG = "<svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='8' y='8' width='12' height='12' rx='2'/><path d='M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8'/></svg>";
export function parseFence(t){
  const m = t.match(/^```\s*([\w+#.-]*)(.*)$/); if(!m) return null;
  const info = m[2] || "", hl = new Set();
  const title = (info.match(/title="([^"]*)"/) || [])[1] || "";
  const r = info.replace(/title="[^"]*"/, "").match(/\{([\d,\s-]+)\}/);
  if(r) r[1].split(",").forEach(x => { const [a, b] = x.trim().split("-").map(Number); if(a) for(let k = a; k <= (b || a); k++) hl.add(k); });
  return { lang: m[1] || "", title, hl, numbers: /\bnumbers\b/.test(info.replace(/title="[^"]*"/, "")) };
}
export function codeBody(code, f){
  const lang = (f.lang || "").toLowerCase();
  if(lang === "mermaid") return null;
  const perLine = f.hl.size || f.numbers || /^(diff|terminal|console|tree)$/.test(lang);
  if(!perLine) return highlight(code, f.lang);
  return code.split("\n").map((ln, i) => {
    let cls = "ln", body;
    if(lang === "diff"){ if(/^\+/.test(ln)) cls += " d-add"; else if(/^-/.test(ln)) cls += " d-del"; else if(/^@@/.test(ln)) cls += " d-hunk"; body = esc(ln); }
    else if(lang === "terminal" || lang === "console"){
      const pm = ln.match(/^(\s*(?:\$|>|PS [^>]*>|❯)\s?)(.*)$/);
      body = pm ? "<span class='prompt'>" + esc(pm[1]) + "</span>" + highlight(pm[2], "bash") : "<span class='out'>" + esc(ln) + "</span>";
    }
    else if(lang === "tree"){
      const tm = ln.match(/^([\s│├└─|`\\-]*)(.*)$/), name = tm[2], dir = /\/$/.test(name.split(/\s+#|\s+←/)[0].trim());
      const cm = name.match(/^(\S+)(.*)$/) || [name, name, ""];
      body = "<span class='tg'>" + esc(tm[1]) + "</span><span class='" + (dir ? "tdir" : "tfile") + "'>" + esc(cm[1]) + "</span><span class='tcm'>" + esc(cm[2]) + "</span>";
    }
    else body = highlight(ln, f.lang);
    if(f.hl.has(i + 1)) cls += " hl";
    return "<span class='" + cls + "'>" + (f.numbers ? "<span class='no'>" + (i + 1) + "</span>" : "") + (body || " ") + "</span>";
  }).join("");
}
export function codeBlock(code, f){
  codeStore.push(code);
  const lang = (f.lang || "").toLowerCase();
  if(lang === "mermaid") return "<div class='diagram'><pre class='mermaid'>" + esc(code) + "</pre></div>";
  const label = { terminal: "terminal", console: "terminal", tree: "files", diff: "changes" }[lang] || f.lang || "text";
  return "<div class='code" + (/^(terminal|console)$/.test(lang) ? " is-term" : "") + "'><div class='code-h'>" + (f.title ? "<span class='fn'>" + esc(f.title) + "</span>" : "") + "<span>" + esc(label) + "</span>"
    + "<button class='copy' data-action='copyCode' data-i='" + (codeStore.length - 1) + "'>" + COPY_SVG + "Copy</button></div>"
    + "<pre class='" + ((f.hl.size || f.numbers || /^(diff|terminal|console|tree)$/.test(lang)) ? "lines" : "") + (f.numbers ? " numbered" : "") + "'><code>" + codeBody(code, f) + "</code></pre></div>";
}
export function splitCols(buf){
  const cols = [[]]; let code = false, depth = 0;
  buf.forEach(L => { const t = L.trim();
    if(/^```/.test(t)) code = !code;
    if(!code){ if(/^:::\s*\w/.test(t)) depth++; else if(t === ":::" && depth) depth--; }
    if(!code && !depth && t === "---"){ cols.push([]); return; }
    cols[cols.length-1].push(L); });
  return cols.map(c => c.join("\n"));
}
export function listItems(buf){
  const items = []; buf.forEach(L => { const t = L.trim(); if(!t) return;
    const m = t.match(/^([-*+]|\d+[.)])\s+(.*)$/); if(m) items.push(m[2]); else if(items.length) items[items.length-1] += "\n" + L; else items.push(t); });
  return items;
}
export function parseAttrs(rest){
  const attrs = {}; const am = rest.match(/^\{([^}]*)\}\s*/);
  if(am){ am[1].split(/\s+/).filter(Boolean).forEach(kv => { const [k, v] = kv.split("="); attrs[k] = v === undefined ? true : v; }); rest = rest.slice(am[0].length); }
  return { attrs, rest };
}
export let tabSeq = 0;
export const chkMsg = (n, total) => n === total && total ? "All done: step marked complete" : n + " of " + total + " done. Finish the rest, then submit again.";
export function renderBox(kind, rest0, buf){
  const { attrs, rest } = parseAttrs(rest0), inner = () => renderBlocks(buf.join("\n"));
  if(kind === "details" || kind === "solution" || kind === "answer"){
    const label = rest || ({ solution: "Show solution", answer: "Show answer" })[kind] || "Details";
    return "<details class='det'" + (attrs.open ? " open" : "") + "><summary>" + svgIcon("chevron", 16) + "<span>" + inline(label) + "</span></summary><div class='det-b'>" + inner() + "</div></details>";
  }
  if(kind === "quiz"){
    // Multiple choice: "- [ ] option" lines, "- [x]" marks the correct one; text after a "---" line is the explanation.
    const sep = buf.findIndex(l => /^\s*-{3,}\s*$/.test(l));
    const body = sep < 0 ? buf : buf.slice(0, sep), expl = sep < 0 ? [] : buf.slice(sep + 1);
    const opts = [], q = [];
    body.forEach(l => { const m = l.trim().match(/^[-*]\s+\[( |x|X)\]\s+(.*)$/); if(m) opts.push({ ok: m[1] !== " ", text: m[2] }); else q.push(l); });
    const id = attrs.id || (q.join(" ").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40).replace(/^-|-$/g, "") || "quiz");
    const key = "L" + (S.DATA ? S.DATA.id : 0) + "-quiz-" + id, saved = S.RESPONSES[key];
    // Several "- [x]" lines make it a select-all-that-apply question (checkboxes).
    const multi = opts.filter(o => o.ok).length > 1;
    const picks = saved ? (Array.isArray(saved.choices) ? saved.choices : (typeof saved.choice === "number" ? [saved.choice] : [])) : [];
    const done = picks.length > 0, rightAll = done && (multi ? saved.ok === true : !!(opts[picks[0]] && opts[picks[0]].ok));
    return "<div class='quiz" + (multi ? " multi" : "") + (done ? " answered" : "") + "' data-quiz='" + esc(key) + "'><div class='quiz-h'>" + (rest ? inline(rest) : "Quiz Question") + "</div>"
      + "<div class='quiz-q'>" + renderBlocks(q.join("\n")) + "</div>" + (multi ? "<div class='quiz-hint'>Select all that apply.</div>" : "") + "<div class='quiz-opts' role='" + (multi ? "group" : "radiogroup") + "'>"
      + opts.map((o, j) => "<label class='quiz-opt" + (done && o.ok ? " correct" : "") + (done && picks.includes(j) && !o.ok ? " wrong" : "") + "'>"
        + "<input type='" + (multi ? "checkbox" : "radio") + "' name='" + esc(key) + "' value='" + j + "'" + (o.ok ? " data-ok='1'" : "") + (picks.includes(j) ? " checked" : "") + "><span>" + inline(o.text) + "</span></label>").join("")
      + "</div><div class='quiz-row'><button class='btn sm' data-action='checkQuiz'>Submit</button><span class='quiz-fb" + (done && !rightAll ? " bad" : "") + "'>"
      + (done ? (rightAll ? "Correct" : (multi ? "Not quite: the correct answers are highlighted" : "Not quite: the correct answer is highlighted")) : "") + "</span></div>"
      + (expl.length ? "<div class='quiz-ex'" + (done ? "" : " hidden") + ">" + renderBlocks(expl.join("\n")) + "</div>" : "") + "</div>";
  }
  if(kind === "video") return renderVideo(attrs, rest, buf);
  if(kind === "walkthrough") return renderWalkthrough(attrs, rest, buf);
  if(kind === "match"){
    // Drag-and-drop matching: "- left => right" lines; optional "heads: Left | Right" line; other lines are the question.
    const rows = [], q = [], extra = []; let heads = null;
    buf.forEach(l => { const t = l.trim(), h = t.match(/^heads:\s*(.*)$/i), x = t.match(/^extra:\s*(.*)$/i), m = t.match(/^[-*]\s+(.*?)\s+=>\s+(.*)$/);
      if(h) heads = h[1].split("|").map(x => x.trim()); else if(x) x[1].split("|").map(v => v.trim()).filter(Boolean).forEach(v => extra.push(v));
      else if(m) rows.push({ left: m[1], right: m[2] }); else q.push(l); });
    // "extra:" answers are distractors: they go in the answer box but match no row.
    const answers = rows.map(r => r.right).concat(extra);
    const id = attrs.id || ("match-" + (rows[0] ? rows[0].left : "")).toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40).replace(/^-|-$/g, "");
    const key = "L" + (S.DATA ? S.DATA.id : 0) + "-match-" + id, saved = S.RESPONSES[key];
    const placed = saved && Array.isArray(saved.placed) ? saved.placed : rows.map(() => -1), done = !!saved;
    // Bank order: a fixed shuffle so the answers don't line up with their rows.
    const N = answers.length, order = answers.map((r, j) => j).sort((a, b) => ((a * 7 + 3) % (N + 1)) - ((b * 7 + 3) % (N + 1)));
    const chip = j => "<button type='button' class='m-chip' draggable='true' data-action='matchChip' data-v='" + j + "'>" + inline(answers[j]) + "</button>";
    const allOk = done && placed.every((v, i) => v === i);
    return "<div class='quiz match" + (allOk ? " answered" : "") + "' data-match='" + esc(key) + "'><div class='quiz-h'>" + (rest ? inline(rest) : "Quiz Question") + "</div>"
      + (q.join("").trim() ? "<div class='quiz-q'>" + renderBlocks(q.join("\n")) + "</div>" : "")
      + "<div class='m-bank' data-action='matchBank' aria-label='Answers'>" + order.filter(j => !placed.includes(j)).map(chip).join("") + "</div>"
      + "<div class='m-grid'>" + (heads ? "<div class='m-row m-head'><div>" + inline(heads[0] || "") + "</div><div>" + inline(heads[1] || "") + "</div></div>" : "")
      + rows.map((r, i) => "<div class='m-row'><div class='m-desc'>" + inline(r.left) + "</div><div class='m-slot" + (done && placed[i] >= 0 ? (placed[i] === i ? " correct" : " wrong") : "") + "' data-action='matchSlot' data-i='" + i + "'>"
        + (placed[i] >= 0 ? chip(placed[i]) : "<span class='m-ph'>Drop answer here</span>") + "</div></div>").join("") + "</div>"
      + "<div class='quiz-row'><button class='btn sm' data-action='checkMatch'>Submit</button><button class='btn ghost sm' data-action='resetMatch'>Reset</button><span class='quiz-fb" + (done && !allOk ? " bad" : "") + "'>"
      + (done ? (allOk ? "These are the correct matches." : placed.filter((v, i) => v === i).length + " of " + rows.length + " correct. Move the red ones and submit again.") : "") + "</span></div></div>";
  }
  if(kind === "checklist"){
    // Learner checklist: "- [ ] item" lines. Submit saves the ticks per learner; all ticked marks the step complete (actions.submitChecklist).
    const items = [], other = [];
    buf.forEach(l => { const m = l.trim().match(/^[-*]\s+\[( |x|X)\]\s+(.*)$/); if(m) items.push(m[2]); else other.push(l); });
    const id = attrs.id || ((rest || "checklist") + "-" + (items[0] || "")).toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60).replace(/^-|-$/g, "");
    const key = "L" + (S.DATA ? S.DATA.id : 0) + "-chk-" + id, saved = S.RESPONSES[key];
    const on = new Set(saved && Array.isArray(saved.checked) ? saved.checked : []), all = items.length > 0 && on.size === items.length;
    return "<div class='quiz checklist" + (saved && all ? " answered" : "") + "' data-chk='" + esc(key) + "'><div class='quiz-h'>" + (rest ? inline(rest) : "Step checklist") + "</div>"
      + (other.join("").trim() ? "<div class='quiz-q'>" + renderBlocks(other.join("\n")) + "</div>" : "")
      + "<ul class='tasks chk-items'>" + items.map((t, j) => "<li><label class='task'><input type='checkbox' value='" + j + "'" + (on.has(j) ? " checked" : "") + "><span>" + inline(t) + "</span></label></li>").join("") + "</ul>"
      + "<div class='quiz-row'><button class='btn sm' data-action='submitChecklist'>Submit</button><span class='quiz-fb'>" + (saved ? chkMsg(on.size, items.length) : "") + "</span></div></div>";
  }
  if(kind === "response"){
    // Free-text answer box. Id: {id=...} or the title; saved per learner by actions.saveResponse.
    const id = attrs.id || (rest || "response").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const key = "L" + (S.DATA ? S.DATA.id : 0) + "-" + id, saved = S.RESPONSES[key];
    return "<div class='hint exercise response'>" + svgIcon("exercise") + "<div class='hb'><div class='ht'>" + (rest ? inline(rest) : "Your answer") + "</div>" + inner()
      + "<textarea class='resp-ta' rows='6' data-resp='" + esc(key) + "' placeholder='Write your answer here'>" + esc(saved ? saved.text : "") + "</textarea>"
      + "<div class='resp-row'><button class='btn sm' data-action='saveResponse' data-resp='" + esc(key) + "'>Save</button><span class='resp-st'>"
      + (saved ? "Saved " + new Date(saved.at).toLocaleString() : "Not saved yet") + "</span></div></div></div>";
  }
  if(kind === "quote"){ return "<figure class='pquote'><blockquote>" + inner() + "</blockquote>" + (rest ? "<figcaption>— " + inline(rest) + "</figcaption>" : "") + "</figure>"; }
  if(kind === "statement"){ return "<div class='statement'>" + inner() + "</div>"; }
  if(kind === "tabs"){
    const tabs = []; let k = 0;
    while(k < buf.length){ const f = parseFence(buf[k].trim());
      if(f){ const code = []; k++; while(k < buf.length && !/^\s*```\s*$/.test(buf[k])) code.push(buf[k++]); k++;
        tabs.push({ label: f.title || f.lang || ("Tab " + (tabs.length + 1)), html: codeBlock(code.join("\n"), Object.assign({}, f, { title: "" })) }); }
      else k++; }
    const id = "tb" + (++tabSeq);
    return "<div class='ctabs' id='" + id + "'><div class='ctab-bar' role='tablist'>" + tabs.map((t, j) => "<button role='tab' class='" + (j ? "" : "on") + "' data-action='ctab' data-j='" + j + "'>" + esc(t.label) + "</button>").join("")
      + "</div>" + tabs.map((t, j) => "<div class='ctab-p'" + (j ? " hidden" : "") + ">" + t.html + "</div>").join("") + "</div>";
  }
  if(kind === "steps"){
    return "<ol class='stepper'>" + listItems(buf).map((it, j) => "<li><span class='sn2'>" + (j + 1) + "</span><div class='sc'>" + renderBlocks(it) + "</div></li>").join("") + "</ol>";
  }
  if(kind === "cards"){
    return "<div class='cards'>" + listItems(buf).map(it => { const m = it.match(/^\*\*(.+?)\*\*[:\s-]*([\s\S]*)$/) || it.match(/^([^:]{1,60}):\s*([\s\S]*)$/);
      return "<div class='kcard'>" + (m ? "<b>" + inline(m[1]) + "</b><div>" + renderBlocks(m[2]) + "</div>" : renderBlocks(it)) + "</div>"; }).join("") + "</div>";
  }
  if(kind === "dodont" || kind === "compare" || kind === "columns"){
    const cols = splitCols(buf), heads = rest ? rest.split("|").map(x => x.trim()) : (kind === "dodont" ? ["Do", "Don't"] : kind === "compare" ? ["Before", "After"] : []);
    const cls = kind === "dodont" ? ["c-do", "c-dont"] : kind === "compare" ? ["c-before", "c-after"] : [];
    const ic = kind === "dodont" ? ["check", "x"] : [];
    return "<div class='cols cols-" + Math.min(cols.length, 3) + "'>" + cols.map((c, j) => "<div class='col " + (cls[j] || "") + "'>" + (heads[j] ? "<div class='col-h'>" + (ic[j] ? svgIcon(ic[j], 16) : "") + inline(heads[j]) + "</div>" : "") + "<div class='col-b'>" + renderBlocks(c) + "</div></div>").join("") + "</div>";
  }
  // callouts
  const type = HINT_TYPES[kind] ? kind : "note";
  const icon = attrs.icon && ICONS[attrs.icon] ? attrs.icon : type;
  const pal = attrs.color && PALETTE[attrs.color];
  const style = pal ? " style='--hbg:" + pal[0] + ";--hbd:" + pal[1] + ";--hac:" + pal[2] + ";--hfg:" + pal[3] + "'" : "";
  return "<div class='hint " + type + (pal ? " custom" : "") + "'" + style + ">" + svgIcon(icon) + "<div class='hb'><div class='ht'>" + (rest ? inline(rest) : HINT_TYPES[type]) + "</div>" + inner() + "</div></div>";
}

export let codeStore = [];
export function renderBlocks(src){
  const lines = src.replace(/\r/g,"").split("\n"); let i = 0, html = "", para = [];
  const flush = () => { if(para.length){ html += "<p>"+inline(para.join(" "))+"</p>"; para = []; } };
  while(i < lines.length){
    const line = lines[i], t = line.trim();
    let m, f;
    if(/^```/.test(t) && (f = parseFence(t))){
      flush(); const buf = []; i++;
      while(i < lines.length && !/^\s*```\s*$/.test(lines[i])) buf.push(lines[i++]);
      i++; html += codeBlock(buf.join("\n"), f);
      continue;
    }
    if(m = t.match(/^:::\s*(\w+)\s*(.*)$/)){
      flush(); const kind = m[1].toLowerCase(), rest = m[2], buf = []; i++;
      let depth = 0, code = false;
      while(i < lines.length){
        const s2 = lines[i].trim();
        if(/^```/.test(s2)) code = !code;
        if(!code){ if(/^:::\s*\w+/.test(s2)) depth++; else if(s2 === ":::"){ if(depth === 0) break; depth--; } }
        buf.push(lines[i++]);
      }
      i++;
      html += renderBox(kind, rest, buf);
      continue;
    }
    if(m = t.match(/^(#{1,4})\s+(.*)$/)){ flush(); const lv = Math.max(2, Math.min(4, m[1].length)); html += "<h"+lv+(lv===2 ? " id='step-"+(++S.stepCount)+"'" : "")+">"+inline(m[2])+"</h"+lv+">"; i++; continue; }
    if(/^(-{3,}|\*{3,})$/.test(t)){ flush(); html += "<hr>"; i++; continue; }
    if(t.startsWith("> ") || t === ">"){ flush(); const buf = []; while(i < lines.length && lines[i].trim().startsWith(">")) buf.push(lines[i++].trim().replace(/^>\s?/,"")); html += "<blockquote>"+renderBlocks(buf.join("\n"))+"</blockquote>"; continue; }
    if(t.startsWith("|") && i+1 < lines.length && /^\s*\|?\s*:?-{2,}/.test(lines[i+1])){
      flush();
      const cells = r => r.trim().replace(/^\|/,"").replace(/\|$/,"").split(/(?<!\\)\|/).map(c => c.trim().replace(/\\\|/g,"|"));
      const head = cells(t); i += 2; const body = [];
      while(i < lines.length && lines[i].trim().startsWith("|")) body.push(cells(lines[i++]));
      html += "<div class='tbl'><table><thead><tr>"+head.map(c => "<th>"+inline(c)+"</th>").join("")+"</tr></thead><tbody>"
        + body.map(r => "<tr>"+r.map(c => "<td>"+inline(c)+"</td>").join("")+"</tr>").join("") + "</tbody></table></div>";
      continue;
    }
    if(/^([-*+]|\d+[.)])\s+/.test(t)){
      flush(); const ordered = /^\d/.test(t), tag = ordered ? "ol" : "ul", start = ordered ? parseInt(t) : 1, items = [];
      const base = line.match(/^\s*/)[0].length;
      while(i < lines.length && /^\s*([-*+]|\d+[.)])\s+/.test(lines[i])){
        const ind = lines[i].match(/^\s*/)[0].length;
        if(ind > base && items.length){ items[items.length-1] += "\n" + lines[i].slice(base + 2); i++; continue; }   // nested item: kept with its parent
        if(/^\s*\d/.test(lines[i]) !== ordered) break;
        items.push(lines[i].trim().replace(/^([-*+]|\d+[.)])\s+/,"")); i++;
      }
      const isTask = items.some(x => /^\[( |x|X)\]\s/.test(x));
      html += "<"+tag+(isTask ? " class='tasks'" : "")+(ordered && start !== 1 ? " start='"+start+"'" : "")+">"+items.map(x => {
        const tm = x.match(/^\[( |x|X)\]\s+(.*)$/);
        const nl = x.indexOf("\n"), head = nl < 0 ? x : x.slice(0, nl), sub = nl < 0 ? "" : renderBlocks(x.slice(nl + 1));
        const tm2 = head.match(/^\[( |x|X)\]\s+(.*)$/);
        return tm2 ? "<li><label class='task'><input type='checkbox'"+(tm2[1] !== " " ? " checked" : "")+"><span>"+inline(tm2[2])+"</span></label>"+sub+"</li>" : "<li>"+inline(head)+sub+"</li>";
      }).join("")+"</"+tag+">";
      continue;
    }
    if(!t){ flush(); i++; continue; }
    para.push(t); i++;
  }
  flush();
  return html;
}

// Start a fresh render (copy-button store and step-heading counter), for renders built in pieces.
export function resetRender(){ codeStore = []; S.stepCount = 0; }
export function renderContent(src){ codeStore = []; S.stepCount = 0; return renderBlocks(src || ""); }
export let mermaidLoading = false;
export function runDiagrams(){
  hydrateVideos(); hydrateWalkthroughs();
  if(!document.querySelector("pre.mermaid:not([data-processed])")) return;
  if(window.mermaid && window.mermaid.run){ try { window.mermaid.run({ querySelector: "pre.mermaid:not([data-processed])" }); } catch(e) {} return; }
  if(mermaidLoading) return; mermaidLoading = true;
  const sc = document.createElement("script");
  sc.src = "https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.9.1/mermaid.min.js";
  sc.onload = () => { try { window.mermaid.initialize({ startOnLoad: false, theme: "neutral", securityLevel: "strict" }); } catch(e) {} runDiagrams(); };
  sc.onerror = () => {};
  document.head.appendChild(sc);
}
export function plainText(src){
  return (src||"").replace(/^```.*$/gm,"").replace(/^:::\s*(\w+)\s*(.*)$/gm,(m,t,ti)=> (HINT_TYPES[t]||"Note").toUpperCase()+": "+ti).replace(/^:::$/gm,"")
    .replace(/\{[#\w\- ]+\|([^{}]*)\}/g,"$1").replace(/\{[#\w\- ]+\|([^{}]*)\}/g,"$1")
    .replace(/\*\*(.+?)\*\*/g,"$1").replace(/==(.+?)==/g,"$1").replace(/__(.+?)__/g,"$1").replace(/~~(.+?)~~/g,"$1").replace(/`([^`]+)`/g,"$1")
    .replace(/\[\[([^\]]+)\]\]/g,"$1").replace(/\[!([^\]|]+)(?:\|\w+)?\]/g,"[$1]").replace(/^- \[( |x|X)\]\s+/gm,"- ")
    .replace(/^#{1,4}\s+/gm,"").replace(/\n{3,}/g,"\n\n").trim();
}

