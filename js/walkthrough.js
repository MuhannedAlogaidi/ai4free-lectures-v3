/* ::: walkthrough block: an exercise solution explained step by step next to its code.
   Each step highlights its lines in the code; Prev/Next move through the steps.

   ::: walkthrough {id=aw6-wt} The Upgraded `FactCheckerAgent`
   ```python
   ...solution code...
   ```
   @step lines=12 at=02:09
   Text of the first step (any markdown).
   @step lines=4,12
   Text of the next step.
   :::

   lines= takes line numbers and ranges (4,12 or 14-19). at= (optional) links the step to a time in
   the lecture's video block: it plays the video there, or marks the transcript line when no video is added. */
import { esc } from "./app.js";
import { codeBlock, inline, parseFence, renderBlocks } from "./markdown.js";
import { jumpTo } from "./video.js";

const toSec = s => String(s).split(":").map(Number).reduce((a, v) => a * 60 + v, 0);
const lineSet = spec => { const out = []; (spec || "").split(",").forEach(x => { const [a, b] = x.trim().split("-").map(Number); if(a) for(let k = a; k <= (b || a); k++) out.push(k); }); return out; };

export function renderWalkthrough(attrs, title, buf){
  let code = "", f = null; const steps = []; let i = 0;
  while(i < buf.length){
    const t = buf[i].trim();
    if(!f && /^```/.test(t) && (f = parseFence(t))){ const c = []; i++; while(i < buf.length && !/^\s*```\s*$/.test(buf[i])) c.push(buf[i++]); code = c.join("\n"); i++; continue; }
    const m = t.match(/^@step\b(.*)$/);
    if(m){ const a = {}; m[1].trim().split(/\s+/).filter(Boolean).forEach(kv => { const [k, v] = kv.split("="); a[k] = v; }); steps.push({ lines: a.lines || "", at: a.at || "", body: [] }); i++; continue; }
    if(steps.length) steps[steps.length - 1].body.push(buf[i]);
    i++;
  }
  if(!f || !steps.length) return "<div class='wt'><p class='vid-note'>A walkthrough needs a code block and at least one <code>@step</code>.</p></div>";
  f.numbers = true; f.hl = new Set();
  const n = steps.length;
  const stepHtml = steps.map((s, k) =>
    "<div class='wt-step' data-k='" + k + "' data-lines='" + esc(lineSet(s.lines).join(",")) + "'" + (k ? " hidden" : "") + ">"
    + "<div class='wt-n'>Step " + (k + 1) + " of " + n + (s.lines ? "<span class='wt-l'>Line" + (/[,-]/.test(s.lines) ? "s " : " ") + esc(s.lines) + "</span>" : "") + "</div>"
    + "<div class='wt-b'>" + renderBlocks(s.body.join("\n")) + "</div>"
    + (s.at ? "<button type='button' class='wt-at' data-wt-at='" + toSec(s.at) + "'><svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'><path d='M8 5.5v13l11-6.5z'/></svg>Video at " + esc(s.at) + "</button>" : "")
    + "</div>").join("");
  const dots = steps.map((_, k) => "<button type='button' class='wt-dot" + (k ? "" : " on") + "' data-wt-go='" + k + "' aria-label='Step " + (k + 1) + "'></button>").join("");
  return "<div class='wt'" + (attrs.id ? " id='wt-" + esc(attrs.id) + "'" : "") + " data-cur='0' data-n='" + n + "'>"
    + "<div class='wt-h'>" + (title ? inline(title) : "Solution walkthrough") + "</div>"
    + "<div class='wt-grid'><div class='wt-side'>" + stepHtml
    + "<div class='wt-nav'><button type='button' class='btn ghost sm' data-wt-go='prev' disabled>&lsaquo; Prev</button><span class='wt-dots'>" + dots + "</span><button type='button' class='btn sm' data-wt-go='next'" + (n > 1 ? "" : " disabled") + ">Next &rsaquo;</button></div>"
    + "</div><div class='wt-code'>" + codeBlock(code, f) + "</div></div></div>";
}

function show(w, k, scroll){
  const n = +w.dataset.n; k = Math.max(0, Math.min(n - 1, k)); w.dataset.cur = k;
  w.querySelectorAll(".wt-step").forEach(s => s.hidden = +s.dataset.k !== k);
  w.querySelectorAll(".wt-dot").forEach((d, j) => d.classList.toggle("on", j === k));
  w.querySelector("[data-wt-go=prev]").disabled = k === 0;
  w.querySelector("[data-wt-go=next]").disabled = k === n - 1;
  const cur = w.querySelector(".wt-step[data-k='" + k + "']"), hl = (cur.dataset.lines || "").split(",").filter(Boolean).map(Number);
  const lns = w.querySelectorAll(".wt-code .ln");
  lns.forEach((l, j) => l.classList.toggle("hl", hl.includes(j + 1)));
  w.classList.toggle("focus", hl.length > 0);
  const first = hl.length && lns[hl[0] - 1], pre = w.querySelector(".wt-code pre");
  if(scroll && first && pre){ const top = first.offsetTop - pre.clientHeight / 3; pre.scrollTo({ top: Math.max(0, top), behavior: "smooth" }); }
}

export function hydrateWalkthroughs(root){
  (root || document).querySelectorAll(".wt[data-n]:not([data-ready])").forEach(w => { w.dataset.ready = "1"; show(w, 0, false); });
}

document.addEventListener("click", e => {
  const g = e.target.closest(".wt [data-wt-go]");
  if(g){ e.preventDefault(); const w = g.closest(".wt"), cur = +w.dataset.cur, v = g.dataset.wtGo;
    show(w, v === "prev" ? cur - 1 : v === "next" ? cur + 1 : +v, true); return; }
  const a = e.target.closest(".wt [data-wt-at]");
  if(a){ e.preventDefault(); const sec = a.closest(".sec") || document, v = sec.querySelector(".vid");
    if(v) jumpTo(v, +a.dataset.wtAt); }
});
