/* Lecture list and content. Fetches lectures/index.json at start-up and one lecture's .md when it is opened.
   In the offline copy made by Download HTML, lectures and images are read from inside the page instead. */
import { S } from "./state.js";
import { getSteps } from "./sections.js";
import { EDITS_READY, applyEdits } from "./store.js";
export const LECTURES = [];   // filled by loadIndex(); same objects and fields as V2, plus file, steps, loaded
// Order of most recently opened lecture ids (newest first)
/* moved to state.js: recentIds */
/* moved to state.js: DATA */
export const LECTURE_DIR = "lectures/";
const BUNDLE = document.getElementById("lecture-bundle");     // present only in the offline copy
export const IS_OFFLINE_COPY = !!BUNDLE;
export const ASSET_MAP = {};                                    // "assets/images/x.jpg" -> data URI (offline copy only)

export async function loadIndex(){
  if(BUNDLE){
    const b = JSON.parse(BUNDLE.textContent);
    Object.assign(ASSET_MAP, b.assets || {});
    if(Array.isArray(b.recent) && b.recent.length) S.recentIds = b.recent.slice();
    b.lectures.forEach(e => LECTURES.push(Object.assign(e, { created: new Date(e.created), base: e.content, loaded: true })));
    return;
  }
  const r = await fetch(LECTURE_DIR + "index.json", {cache: "no-cache"});
  if(!r.ok) throw new Error("index.json " + r.status);
  (await r.json()).forEach(e => LECTURES.push(Object.assign(e, { created: new Date(e.created), content: "", base: "", loaded: false })));
  try { const t = JSON.parse((document.getElementById("titleOverrides") || {}).textContent || "{}"); LECTURES.forEach(l => { if(t[l.id]) l.title = t[l.id]; }); } catch(e) {}
}
// Fetch one lecture's text once; later calls reuse the same request.
export function ensureLoaded(l){
  if(!l || l.loaded || !l.file) return Promise.resolve(l);
  if(!l._loading) l._loading = fetch(LECTURE_DIR + l.file, {cache: "no-cache"})
    .then(r => { if(!r.ok) throw new Error(l.file + " " + r.status); return r.text(); })
    .then(t => { l.content = t.replace(/^\n+|\s+$/g, ""); l.base = l.content; l.loaded = true;
      if(EDITS_READY) applyEdits(l); return l; })
    .catch(e => { l._loading = null; throw e; });
  return l._loading;
}
// Step headings without loading the lecture: index.json carries them for lectures not opened yet.
export const stepsOf = l => (l.file && !l.loaded && l.steps) ? l.steps : getSteps(l.content);
export function loadError(){
  return location.protocol === "file:"
    ? "Open this folder through a local server to load the lectures, for example <code>npx serve</code>."
    : "The lectures could not be loaded. Check your connection and reload the page.";
}
