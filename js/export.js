/* Exporters: Download HTML (one offline file), TXT, Markdown, JSON, DOC. */
import { S } from "./state.js";
import { ASSET_MAP, IS_OFFLINE_COPY, LECTURES, ensureLoaded } from "./content-loader.js";
import { getSteps } from "./sections.js";
import { $, esc } from "./app.js";
import { plainText, renderContent } from "./markdown.js";
/* ---------- Download HTML: one offline file (plan step 4) ---------- */
// The file holds the page, the CSS, the app as one plain script, every lecture with its saved edits,
// and each image once as a data URI. It opens by double-click, with no server and no internet.
// Made from the offline copy itself, it reads everything from inside the page, so copies can be copied again.
const CSS_FILES = ["css/base.css", "css/content.css", "css/editor.css"];
const JS_FILES = ["js/state.js", "js/content-loader.js", "js/markdown.js", "js/sections.js", "js/nav.js", "js/store.js", "js/editor.js", "js/export.js", "js/print.js", "js/a4.js", "js/assistant.js", "js/app.js"];   // app.js last: its start-up runs after every declaration
const getText = async path => { const r = await fetch(path, { cache: "no-cache" }); if(!r.ok) throw new Error(path + " " + r.status); return r.text(); };
const noCloseTag = t => t.replace(/<\/script/gi, "<\\/script");
// ES modules -> one plain script: drop import lines and the "export " keyword, and the console view (it needs module namespaces).
export function toPlainScript(src){
  const out = src.replace(/^import .*;\n/gm, "").replace(/^export (?=(?:async\s+)?function\b|const\b|let\b|var\b|class\b)/gm, "")
    .replace(/\n\/\/ Read-only view of module values[\s\S]*$/, "\n");
  if(/^\s*(import|export)\s/m.test(out)) throw new Error("a module statement was left in the script");
  return out;
}
// Lecture fields as index.json stores them (dates as local date-time, no runtime fields).
function lectureRecord(l){
  const o = {};
  for(const [k, v] of Object.entries(l)){
    if(k === "content" || k === "base" || k === "loaded" || k.startsWith("_")) continue;
    if(v instanceof Date){ const p = n => String(n).padStart(2, "0");
      o[k] = v.getFullYear() + "-" + p(v.getMonth() + 1) + "-" + p(v.getDate()) + "T" + p(v.getHours()) + ":" + p(v.getMinutes()); }
    else o[k] = v;
  }
  o.steps = getSteps(l.content); o.content = l.content;
  return o;
}
export async function buildBundle(){
  await Promise.all(LECTURES.map(l => ensureLoaded(l)));               // every lecture, with its saved edits applied
  const lectures = LECTURES.map(lectureRecord), assets = {};
  for(const l of lectures) for(const m of l.content.matchAll(ASSET_RE)) assets[m[1]] = assets[m[1]] || await assetDataUri(m[1]);
  let tpl, css, js;
  if(IS_OFFLINE_COPY){
    tpl = $("page-template").textContent.replace(/<\\\/script/gi, "</script");
    css = $("bundle-css").textContent.replace(/^\n|\n$/g, ""); js = $("bundle-app").textContent.replace(/^\n|\n$/g, "");   // drop the line breaks added below
  } else {
    tpl = await getText("index.html");
    // The artifact host serves the page inside its own skeleton; keep only this page (from its <!DOCTYPE html> to its </html>).
    const start = tpl.indexOf("<!DOCTYPE html>"), end = start >= 0 ? tpl.indexOf("</html>", start) : -1;
    if(start > 0 && end > start) tpl = tpl.slice(start, end + 7) + "\n";
    css = (await Promise.all(CSS_FILES.map(getText))).join("\n");
    js = (await Promise.all(JS_FILES.map(getText))).map(toPlainScript).join("\n");
  }
  const one = (s, re, to, what) => { if(!re.test(s)) throw new Error("page template: " + what + " not found"); return s.replace(re, to); };
  let html = tpl;
  html = html.replace(/<link rel="stylesheet" href="css\/[^"]+">\n?/g, "");
  html = one(html, /<script>\/\* Module scripts[\s\S]*?<\/script>\n?/, "", "file note");
  html = one(html, /<script type="module" src="js\/app\.js"><\/script>\n?/, "", "app script");
  html = one(html, /<\/head>/, () => '<style id="bundle-css">\n' + css + "\n</style>\n</head>", "</head>");
  const data = JSON.stringify({ made: new Date().toISOString(), recent: S.recentIds, lectures, assets }).replace(/</g, "\\u003c");
  html = one(html, /<\/body>/, () => '<script type="application/json" id="lecture-bundle">' + data + "</script>\n"
    + '<script type="text/plain" id="page-template">' + noCloseTag(tpl) + "</script>\n"
    + '<script id="bundle-app">\n' + noCloseTag(js) + "\n</script>\n</body>", "</body>");
  return html;
}

/* ---------- Exporters ---------- */
export function asText(){ return S.DATA.title + "\n\n" + plainText(S.DATA.content) + "\n"; }
export function asMd(){ return "# " + S.DATA.title + "\n\n" + S.DATA.content + "\n"; }
export function asJson(){ return JSON.stringify({title:S.DATA.title, content:S.DATA.content}, null, 2); }
export function asDoc(){
  const css = Array.from(document.styleSheets).flatMap(s => { try { return Array.from(s.cssRules); } catch(e) { return []; } }).map(r => r.cssText).filter(t => /^(\.transcript|\.c-|\.bg-|\.hint|\.code)/.test(t)).join("\n");
  return "<html><head><meta charset='utf-8'><title>"+esc(S.DATA.title)+"</title><style>body{font-family:Calibri,Arial}"+css+"</style></head><body><h1>"+esc(S.DATA.title)+"</h1><div class='transcript'>"+renderContent(S.DATA.content)+"</div></body></html>";
}


/* Images are files from step 2. Exports put them back as data URIs, so the downloaded file is self-contained (same output as V2). */
export const ASSET_RE = /\]\((assets\/images\/[^)\s]+)/g, ASSET_MIME = { jpg:"image/jpeg", jpeg:"image/jpeg", png:"image/png", svg:"image/svg+xml", gif:"image/gif", webp:"image/webp" };
export const assetCache = {};
export async function assetDataUri(path){
  if(ASSET_MAP[path]) return ASSET_MAP[path];                               // offline copy: images are inside the page
  if(!assetCache[path]) assetCache[path] = fetch(path).then(r => { if(!r.ok) throw new Error(path); return r.arrayBuffer(); }).then(buf => {
    const bytes = new Uint8Array(buf); let bin = ""; for(let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return "data:" + (ASSET_MIME[path.split(".").pop().toLowerCase()] || "application/octet-stream") + ";base64," + btoa(bin); });
  return assetCache[path];
}
export async function inlineAssets(md){
  const paths = [...new Set([...md.matchAll(ASSET_RE)].map(m => m[1]))];
  const uris = await Promise.all(paths.map(p => assetDataUri(p).catch(() => p)));
  let out = md; paths.forEach((p, i) => { out = out.split("](" + p).join("](" + uris[i]); }); return out;
}
// Run an exporter with DATA.content holding inline images, then put the file paths back.
export async function withAssetsInline(fn){
  if(!S.DATA) return fn();
  const orig = S.DATA.content, inl = await inlineAssets(orig);
  if(inl === orig) return fn();
  S.DATA.content = inl; try { return fn(); } finally { S.DATA.content = orig; }
}
