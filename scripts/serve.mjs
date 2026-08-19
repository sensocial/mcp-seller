#!/usr/bin/env node
/* Local preview server for the docs site.
 *
 * The site has no build step, so any static server would do — except for one
 * detail that matters: every internal link is extensionless (`/connect`, not
 * `/connect.html`). GitHub Pages resolves those to the matching `.html` file;
 * a plain `python3 -m http.server` answers 404 and the whole nav looks broken
 * locally while being fine in production. This server reproduces the three
 * Pages behaviours the site actually depends on:
 *
 *   /            -> index.html
 *   /connect     -> connect.html
 *   anything else -> 404.html, with a real 404 status
 *
 * Zero dependencies, on purpose: the repo must stay clonable and runnable with
 * nothing but Node installed. The test suite serves the site through this same
 * file, so what the tests exercise is what a reviewer sees.
 */

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

async function fileAt(path) {
  try {
    const s = await stat(path);
    return s.isFile() ? path : null;
  } catch {
    return null;
  }
}

/** Resolve a request path the way GitHub Pages does, or null if nothing matches. */
async function resolvePath(urlPath) {
  // normalize() collapses any `..` before the join, so a crafted path cannot
  // escape ROOT.
  const rel = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  const base = join(ROOT, rel);
  if (!base.startsWith(ROOT)) return null;

  if (urlPath.endsWith("/")) return fileAt(join(base, "index.html"));
  return (await fileAt(base)) || (await fileAt(base + ".html"));
}

const server = createServer(async (req, res) => {
  const urlPath = new URL(req.url, "http://localhost").pathname;
  const path = await resolvePath(urlPath);

  if (!path) {
    const body = await readFile(join(ROOT, "404.html")).catch(() => "Not found");
    res.writeHead(404, { "content-type": TYPES[".html"] });
    return res.end(body);
  }

  res.writeHead(200, {
    "content-type": TYPES[extname(path)] || "application/octet-stream",
    "cache-control": "no-store",
  });
  res.end(await readFile(path));
});

const port = Number(process.env.PORT) || 4173;
server.listen(port, () => {
  console.log(`docs site  ->  http://localhost:${port}/`);
});
