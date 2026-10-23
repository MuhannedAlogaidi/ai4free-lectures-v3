/* A4 templates (Print dialog): the lecture is filled into one of two A4 HTML templates and saved as an editable file.
   The templates are used exactly as supplied (assets/templates/): their styles, toolbars and scripts are not changed.
   Simple: fixed A4 pages; content flows onto as many pages as needed, never cutting a block in half.
   Advanced: one page per lecture; pages grow with their content and break when printed. */
import { S } from "./state.js";
import { renderContent } from "./markdown.js";
import { splitSections, getSteps } from "./sections.js";
import { inlineAssets } from "./export.js";
import { printDate, drawDiagrams, printableMatch } from "./print.js";
import { stepNum } from "./nav.js";

export const A4_TEMPLATES = {
  a4simple: { file: "assets/templates/a4-simple.html", title: "Simple HTML A4 with print", sub: "Fixed A4 pages, Georgia text. Opens with Print, Save As and Download buttons" },
  a4adv: { file: "assets/templates/a4-advanced.html", title: "Advanced HTML A4 with printing", sub: "Book-style A4 pages with coloured callouts. Opens with Insert block, Add page, Save HTML and Print" }
};

const stepLabel = t => t.replace(/^(Alternative\s+)?Step\s*\d+\s*[:.\-]\s*/i, "").replace(/^\d+(\.\d+)+\s+/, "");

// Lectures to export: the one being read, or every lecture in the session.
async function chapters(scope){
  const steps = getSteps(S.DATA.content), secs = splitSections(S.DATA.content);
  const pick = scope === "step" ? [S.curStep] : steps.map((s, i) => i + 1);
  const out = [];
  for(const n of pick){
    const t = steps[n - 1] || S.DATA.title, md = await inlineAssets(secs[n] || "");
    const box = document.createElement("div"); box.innerHTML = renderContent(md);
    const h = box.querySelector("h2"); if(h) h.remove();   // the lecture name is the page title
    printableMatch(box); await drawDiagrams(box);
    out.push({ num: stepNum(t, n - 1, steps), title: stepLabel(t) || t, box });
  }
  return out;
}

// App blocks -> the element vocabulary each template styles.
const CALLOUT_ADV = { info: "hint", note: "note", tip: "tip", best: "tip", success: "tip", warning: "warning", mistake: "warning", danger: "important",
  important: "important", definition: "definition", example: "note", objective: "note", prereq: "note", takeaway: "tip", exercise: "note", question: "note" };
function convert(box, adv){
  const el = (tag, cls, html) => { const e = document.createElement(tag); if(cls) e.className = cls; if(html != null) e.innerHTML = html; return e; };
  box.querySelectorAll("details").forEach(d => { const s = d.querySelector("summary"); const w = el("div", adv ? "exercise" : "note");
    if(s){ w.appendChild(el("p", null, "<strong>" + s.textContent.trim() + "</strong>")); s.remove(); } [...d.childNodes].forEach(c => w.appendChild(c)); d.replaceWith(w); });
  box.querySelectorAll(".ctabs").forEach(t => { const labels = [...t.querySelectorAll(".ctab-bar button, .ctab-bar")].map(b => b.textContent); const w = el("div");
    const names = [...t.querySelectorAll("[role=tab]")].map(b => b.textContent);
    t.querySelectorAll(".ctab-p").forEach((p, j) => { p.removeAttribute("hidden"); const c = p.querySelector(".code"); if(c && names[j]) c.dataset.tab = names[j]; [...p.childNodes].forEach(n => w.appendChild(n)); });
    t.replaceWith(w); });
  box.querySelectorAll(".code").forEach(c => { const code = c.querySelector("pre"), lang = (c.querySelector(".code-h > span:not(.fn)") || {}).textContent || "",
      fn = (c.querySelector(".fn") || {}).textContent || "", label = [c.dataset.tab, fn, lang].filter(Boolean).join(" · ");
    const pre = el("pre"); const k = el("code"); k.textContent = code ? code.textContent : ""; pre.appendChild(k);
    const w = el("div"); if(adv){ if(label) w.appendChild(el("div", "code-label", "")).textContent = label; w.appendChild(pre); }
    else { if(label) w.appendChild(el("p", "source-note")).textContent = label; w.appendChild(pre); }
    c.replaceWith(...w.childNodes); });
  box.querySelectorAll(".diagram").forEach(d => { const svg = d.querySelector("svg"); if(svg){ const fig = el("figure"); fig.appendChild(svg); d.replaceWith(fig); } else { const p = el("pre"); p.textContent = d.textContent; d.replaceWith(p); } });
  box.querySelectorAll(".hint").forEach(h => { const type = [...h.classList].find(c => CALLOUT_ADV[c]) || "info", t = h.querySelector(".ht"), b = h.querySelector(".hb");
    if(t) t.remove(); h.querySelectorAll("svg").forEach(s => s.remove());
    const w = adv ? el("div", "callout " + CALLOUT_ADV[type]) : el("div", /warning|mistake|danger|important/.test(type) ? "hint" : "note");
    if(adv) w.appendChild(el("div", "callout-title")).textContent = t ? t.textContent : type; else if(t) w.appendChild(el("p", null, "<strong>" + t.innerHTML + "</strong>"));
    [...(b || h).childNodes].forEach(n => w.appendChild(n)); h.replaceWith(w); });
  box.querySelectorAll(".quiz").forEach(q => { const w = el("div", adv ? "exercise" : "note"), head = q.querySelector(".quiz-h");
    w.appendChild(el(adv ? "strong" : "p", null, adv ? (head ? head.textContent : "Quiz") : "<strong>" + (head ? head.textContent : "Quiz") + "</strong>"));
    const qq = q.querySelector(".quiz-q"); if(qq) [...qq.childNodes].forEach(n => w.appendChild(n));
    const opts = q.querySelectorAll(".quiz-opt"); if(opts.length){ const ul = el("ul"); opts.forEach(o => ul.appendChild(el("li", null, o.textContent.trim()))); w.appendChild(ul); }
    const rows = q.querySelectorAll(".m-row:not(.m-head)"); if(rows.length){ const ul = el("ul"); rows.forEach(r => ul.appendChild(el("li", null, r.querySelector(".m-desc").innerHTML + " → ______"))); w.appendChild(ul);
      const bank = [...q.querySelectorAll(".m-chip")].map(c => c.textContent); if(bank.length) w.appendChild(el("p", null, "<em>Answers: " + bank.join(" · ") + "</em>")); }
    q.querySelectorAll(".chk-items li").forEach(() => {}); const chk = q.querySelector(".chk-items"); if(chk){ const ul = el("ul"); chk.querySelectorAll("li").forEach(li => ul.appendChild(el("li", null, "☐ " + li.textContent.trim()))); w.appendChild(ul); }
    q.replaceWith(w); });
  box.querySelectorAll("textarea, input, button").forEach(i => i.remove());
  box.querySelectorAll(".tbl").forEach(t => t.replaceWith(...t.childNodes));
  box.querySelectorAll(".fig").forEach(f => { const fig = el("figure"), img = f.querySelector("img"), cap = f.querySelector(".cap"); if(img) fig.appendChild(img); if(cap) fig.appendChild(el("figcaption", null, cap.innerHTML)); f.replaceWith(fig); });
  box.querySelectorAll(".pquote").forEach(f => { const bq = f.querySelector("blockquote"), cap = f.querySelector("figcaption"); if(bq && cap && adv){ bq.appendChild(el("cite", null, cap.innerHTML)); } f.replaceWith(bq || f); if(cap && !adv) bq.after(el("p", "source-note", cap.innerHTML)); });
  box.querySelectorAll(".stepper").forEach(s => { const ol = el("ol"); s.querySelectorAll(":scope > li").forEach(li => { const c = li.querySelector(".sc"); ol.appendChild(el("li", null, c ? c.innerHTML : li.innerHTML)); }); s.replaceWith(ol); });
  box.querySelectorAll(".cards").forEach(s => { const ul = el("ul"); s.querySelectorAll(".kcard").forEach(k => ul.appendChild(el("li", null, k.innerHTML))); s.replaceWith(ul); });
  return box;
}

const load = (f, html) => new Promise(res => { f.onload = () => res(); f.contentDocument.open(); f.contentDocument.write(html); f.contentDocument.close(); setTimeout(res, 2500); });
const wait = ms => new Promise(r => setTimeout(r, ms));

// Splits blocks that are taller than a whole page: code by lines, tables by rows, lists by items.
function splitBlock(node, body){
  const fits = () => body.scrollHeight <= body.clientHeight + 2;
  if(node.tagName === "PRE"){ const lines = node.textContent.split("\n"); if(lines.length < 2) return null;
    const a = node.cloneNode(false), code = document.createElement("code"); a.appendChild(code); node.before(a); node.remove();
    let k = 0; for(; k < lines.length; k++){ code.textContent = lines.slice(0, k + 1).join("\n"); if(!fits()){ break; } }
    if(k === 0){ a.remove(); body.appendChild(node); return null; }
    code.textContent = lines.slice(0, k).join("\n"); const rest = node.cloneNode(false), c2 = document.createElement("code"); c2.textContent = lines.slice(k).join("\n"); rest.appendChild(c2); return rest; }
  if(node.tagName === "TABLE"){ const rows = [...node.querySelectorAll("tbody tr")]; if(rows.length < 2) return null;
    const rest = node.cloneNode(true); const rb = rest.querySelector("tbody"); rb.innerHTML = "";
    while(!fits() && node.querySelectorAll("tbody tr").length > 1){ const last = [...node.querySelectorAll("tbody tr")].pop(); rb.prepend(last); }
    return fits() && rb.children.length ? rest : null; }
  if(node.tagName === "UL" || node.tagName === "OL"){ if(node.children.length < 2) return null;
    const rest = node.cloneNode(false); while(!fits() && node.children.length > 1) rest.prepend(node.lastElementChild);
    if(node.tagName === "OL") rest.setAttribute("start", (+(node.getAttribute("start") || 1)) + node.children.length);
    return fits() && rest.children.length ? rest : null; }
  return null;
}

async function fillSimple(tpl, chs){
  const f = document.createElement("iframe"); f.style.cssText = "position:fixed;left:-12000px;top:0;width:1000px;height:1400px;border:0";
  document.body.appendChild(f);
  try {
    await load(f, tpl); await wait(150);
    const d = f.contentDocument, pagesEl = d.getElementById("pages"), proto = pagesEl.querySelector(".a4-page").cloneNode(true);
    pagesEl.innerHTML = "";
    const footer = S.DATA.title + " · " + printDate();
    const newPage = (ch, first) => { const p = proto.cloneNode(true); p.querySelectorAll("[contenteditable]").forEach(e => e.innerHTML = "");
      if(first){ p.querySelector(".chapter-label").textContent = ch.num ? "Lecture " + ch.num : S.DATA.title; p.querySelector(".chapter-title").textContent = ch.title; p.querySelector(".chapter-description").textContent = S.DATA.title; }
      else { const h = p.querySelector(".chapter-header"); if(h) h.remove(); }
      p.querySelector(".footer-title").textContent = footer; pagesEl.appendChild(p); return p.querySelector(".chapter-body"); };
    for(const ch of chs){
      const nodes = [...convert(ch.box, false).childNodes].filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
      let body = newPage(ch, true);
      for(let i = 0; i < nodes.length; i++){
        const n = d.importNode(nodes[i], true); body.appendChild(n);
        if(body.scrollHeight <= body.clientHeight + 2) continue;
        // Long code, tables and lists: keep what fits on this page and carry the rest over.
        if(/^(PRE|TABLE|UL|OL)$/.test(n.tagName)){ const rest = splitBlock(n, body);
          if(rest && body.contains(body.lastElementChild) && body.scrollHeight <= body.clientHeight + 2){ body = newPage(ch, false); body.appendChild(rest);
            let more; while(body.scrollHeight > body.clientHeight + 2 && (more = splitBlock(body.lastElementChild, body))){ body = newPage(ch, false); body.appendChild(more); }
            continue; } }
        if(body.children.length > 1 && !/^H[234]$/.test(n.tagName)){
          // Keep a heading with the block after it: move a trailing heading over too.
          n.remove(); const prev = body.lastElementChild; body = newPage(ch, false);
          if(prev && /^H[234]$/.test(prev.tagName)){ prev.remove(); body.appendChild(prev); }
          body.appendChild(n);
        } else if(body.children.length > 1){ n.remove(); body = newPage(ch, false); body.appendChild(n); }
        let rest; while(body.scrollHeight > body.clientHeight + 2 && (rest = splitBlock(body.lastElementChild, body))){ body = newPage(ch, false); body.appendChild(rest); }
      }
    }
    const all = pagesEl.querySelectorAll(".a4-page");
    all.forEach((p, i) => { p.setAttribute("aria-label", "A4 page " + (i + 1)); p.querySelector(".page-number").textContent = (i + 1) + " / " + all.length; p.classList.remove("overflow"); });
    d.title = S.DATA.title; const tt = d.getElementById("toast"); if(tt) tt.textContent = "";
    return "<!doctype html>\n" + d.documentElement.outerHTML;
  } finally { f.remove(); }
}

function fillAdvanced(tpl, chs){
  const d = new DOMParser().parseFromString(tpl, "text/html"), pagesEl = d.getElementById("pages");
  const proto = pagesEl.querySelector(".page[data-type=chapter]") || pagesEl.querySelector(".page");
  const sample = proto.cloneNode(true); pagesEl.innerHTML = "";
  const strong = d.querySelector(".toolbar strong"); if(strong) strong.textContent = S.DATA.title + " · " + printDate();
  chs.forEach((ch, i) => { const p = sample.cloneNode(true);
    p.querySelector(".eyebrow").textContent = (S.DATA.title + (ch.num ? " · Lecture " + ch.num : "")).toUpperCase();
    p.querySelector(".chapter-title").textContent = ch.title;
    p.querySelector(".chapter-subtitle").textContent = S.DATA.title;
    const body = p.querySelector(".body"); body.innerHTML = ""; [...convert(ch.box, true).childNodes].forEach(n => body.appendChild(d.importNode(n, true)));
    const spans = p.querySelectorAll(".footer span"); if(spans[0]) spans[0].textContent = S.DATA.title; if(spans[1]) spans[1].textContent = "Page " + (i + 1);
    pagesEl.appendChild(p); });
  d.title = S.DATA.title;
  return "<!doctype html>\n" + d.documentElement.outerHTML;
}

export async function buildA4(scope, kind){
  const t = A4_TEMPLATES[kind]; if(!t) throw new Error("unknown template");
  const r = await fetch(t.file, { cache: "no-cache" }); if(!r.ok) throw new Error("template not found");
  const tpl = await r.text(), chs = await chapters(scope);
  return kind === "a4simple" ? fillSimple(tpl, chs) : fillAdvanced(tpl, chs);
}
