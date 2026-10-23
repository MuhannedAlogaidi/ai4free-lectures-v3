/* ::: video block: a lesson video with chapters and a transcript.
   One block per video, so a lecture can hold several.

   ::: video {id=aw1-v1} Video title
   src: assets/videos/aw1.mp4          (MP4 file under 15 MB, a YouTube link, or a Google Drive link)
   transcript: assets/transcripts/aw1.srt   (.srt for timed lines, or .txt for plain text)
   chapters:
   - 00:00 Chapter name
   - 02:10 Next chapter
   :::

   MP4: chapters and transcript lines seek the video, and the current line follows playback.
   YouTube: chapters restart the embed at that time; the transcript is shown but cannot follow playback.
   Drive: plays as embedded; chapters and transcript are shown for reading.
   No src yet: chapters and transcript are shown for reading until the video is added. */
import { esc } from "./app.js";
import { inline } from "./markdown.js";

const toSec = s => { const p = String(s).trim().replace(",", ".").split(":").map(Number); return p.reduce((a, v) => a * 60 + v, 0); };
const fmt = t => { t = Math.max(0, Math.floor(t)); const h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60), s = t % 60;
  return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(s).padStart(2, "0"); };

export function srcKind(src){
  const yt = src.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
  if(yt) return { kind: "yt", id: yt[1] };
  const dr = src.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=)([\w-]{10,})/);
  if(dr) return { kind: "drive", id: dr[1] };
  return { kind: "file", url: src };
}

export function renderVideo(attrs, title, buf){
  let src = "", tr = "", inCh = false; const chapters = [];
  buf.forEach(l => { const t = l.trim(); let m;
    if(m = t.match(/^src:\s*(.+)$/i)){ src = m[1].trim(); inCh = false; }
    else if(m = t.match(/^transcript:\s*(.+)$/i)){ tr = m[1].trim(); inCh = false; }
    else if(/^chapters:\s*$/i.test(t)) inCh = true;
    else if(inCh && (m = t.match(/^[-*]\s+((?:\d+:)?\d{1,2}:\d{2})\s+(.+)$/))) chapters.push({ t: toSec(m[1]), label: m[1], name: m[2] });
  });
  const k = src ? srcKind(src) : { kind: "none" };
  let player;
  if(k.kind === "yt") player = "<iframe class='vid-frame' data-yt='" + k.id + "' src='https://www.youtube-nocookie.com/embed/" + k.id + "?rel=0' title='" + esc(title || "Video") + "' allow='autoplay; encrypted-media; picture-in-picture; fullscreen' allowfullscreen loading='lazy'></iframe>";
  else if(k.kind === "drive") player = "<iframe class='vid-frame' src='https://drive.google.com/file/d/" + k.id + "/preview' title='" + esc(title || "Video") + "' allow='autoplay; fullscreen' allowfullscreen loading='lazy'></iframe>";
  else if(k.kind === "file") player = "<video class='vid-el' controls preload='metadata' playsinline src='" + esc(k.url) + "'></video>";
  else player = "<p class='vid-note vid-none'>Video not added yet. The chapters and transcript are below.</p>";
  const link = (k.kind === "file" || k.kind === "none") ? "" : "<a class='vid-open' href='" + esc(src) + "' target='_blank' rel='noopener'>Open in " + (k.kind === "yt" ? "YouTube" : "Drive") + "</a>";
  const canSeek = k.kind === "file" || k.kind === "yt";
  const chHtml = chapters.length ? "<div class='vid-ch' role='list' aria-label='Chapters'>" + chapters.map((c, i) =>
      "<button type='button' class='vid-chip' role='listitem' data-vt='" + c.t + "' data-ci='" + i + "'" + (canSeek ? "" : " disabled") + "><span class='vt'>" + esc(c.label) + "</span><span>" + inline(c.name) + "</span></button>").join("") + "</div>" : "";
  const trHtml = tr ? "<details class='vid-tr' open><summary>Transcript</summary><div class='vid-lines' data-src='" + esc(tr) + "'><p class='vid-note'>Loading transcript…</p></div></details>" : "";
  return "<div class='vid' data-kind='" + k.kind + "'" + (attrs.id ? " id='vid-" + esc(attrs.id) + "'" : "") + ">"
    + "<div class='vid-h'><span>" + (title ? inline(title) : "Video") + "</span>" + link + "</div>"
    + "<div class='vid-box" + (k.kind === "yt" || k.kind === "drive" ? " ratio" : "") + (k.kind === "none" ? " none" : "") + "'>" + player + "</div>"
    + chHtml + trHtml + "</div>";
}

/* Transcript files: .srt cues with times, anything else as plain paragraphs. */
const CACHE = {};
export function parseSrt(txt){
  const cues = [];
  txt.replace(/\r/g, "").split(/\n\s*\n/).forEach(b => {
    const ls = b.split("\n").filter(x => x.trim()); const ti = ls.findIndex(x => /-->/.test(x)); if(ti < 0) return;
    const [a, z] = ls[ti].split("-->"); const text = ls.slice(ti + 1).join(" ").replace(/<[^>]+>/g, "").trim();
    if(text) cues.push({ s: toSec(a), e: toSec(z.trim().split(/\s/)[0]), text });
  });
  return cues;
}
async function loadTranscript(url){
  if(!CACHE[url]) CACHE[url] = fetch(url, { cache: "no-cache" }).then(r => { if(!r.ok) throw new Error(r.status); return r.text(); });
  return CACHE[url];
}

export function hydrateVideos(root){
  (root || document).querySelectorAll(".vid:not([data-ready])").forEach(v => {
    v.dataset.ready = "1";
    const box = v.querySelector(".vid-lines"), el = v.querySelector("video"), kind = v.dataset.kind;
    if(box) loadTranscript(box.dataset.src).then(txt => {
      const timed = /-->/.test(txt), cues = timed ? parseSrt(txt) : [];
      if(timed && cues.length){
        box.innerHTML = cues.map((c, i) => "<button type='button' class='vid-line' data-vt='" + c.s + "' data-i='" + i + "'" + (kind === "drive" || kind === "none" ? " disabled" : "") + "><span class='vt'>" + fmt(c.s) + "</span><span class='vx'>" + esc(c.text) + "</span></button>").join("");
        v._cues = cues;
      } else box.innerHTML = txt.replace(/\r/g, "").split(/\n\s*\n/).map(p => p.trim()).filter(Boolean).map(p => "<p>" + esc(p.replace(/\n/g, " ")) + "</p>").join("") || "<p class='vid-note'>The transcript is empty.</p>";
    }).catch(() => { box.innerHTML = "<p class='vid-note'>Couldn't load the transcript.</p>"; });
    if(el) el.addEventListener("timeupdate", () => follow(v, el.currentTime));
  });
}

function follow(v, t){
  const chips = v.querySelectorAll(".vid-chip"); let ci = -1;
  chips.forEach((c, i) => { if(+c.dataset.vt <= t + 0.25) ci = i; });
  chips.forEach((c, i) => c.classList.toggle("on", i === ci));
  const cues = v._cues; if(!cues) return;
  let k = -1; for(let i = 0; i < cues.length; i++){ if(cues[i].s <= t + 0.05) k = i; else break; }
  if(v._k === k) return; v._k = k;
  const box = v.querySelector(".vid-lines");
  box.querySelectorAll(".vid-line.on").forEach(x => x.classList.remove("on"));
  const cur = k >= 0 && box.querySelector(".vid-line[data-i='" + k + "']");
  if(cur){ cur.classList.add("on");
    if(!v._hover){ const top = cur.offsetTop - box.offsetTop - box.clientHeight / 3; box.scrollTo({ top, behavior: "smooth" }); } }
}

function seek(v, t){
  const el = v.querySelector("video");
  if(el){ el.currentTime = t; el.play().catch(() => {}); follow(v, t); return; }
  const f = v.querySelector("iframe[data-yt]");
  if(f){ f.src = "https://www.youtube-nocookie.com/embed/" + f.dataset.yt + "?rel=0&autoplay=1&start=" + Math.floor(t);
    v.querySelectorAll(".vid-chip").forEach(c => c.classList.toggle("on", +c.dataset.vt === t)); }
}

// From other blocks (walkthrough steps): bring the video into view and go to that time.
// With no playable video, the chapter and transcript line for that time are marked instead.
export function jumpTo(v, t){
  v.scrollIntoView({ behavior: "smooth", block: "start" });
  const k = v.dataset.kind;
  if(k === "file" || k === "yt") seek(v, t); else { v._k = null; follow(v, t + 0.99); }   // "at=02:32" means anywhere in that second
}

document.addEventListener("click", e => {
  const b = e.target.closest(".vid [data-vt]"); if(!b || b.disabled) return;
  e.preventDefault(); seek(b.closest(".vid"), +b.dataset.vt);
});
// While the reader scrolls the transcript, stop it jumping back to the current line.
document.addEventListener("mouseover", e => { const box = e.target.closest && e.target.closest(".vid-lines"); document.querySelectorAll(".vid").forEach(v => v._hover = !!box && v.contains(box)); });
