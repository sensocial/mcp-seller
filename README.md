# SenPrints Seller Connector — public docs site

Public documentation for the SenPrints Seller MCP connector
(`https://api.senprints.com/mcp/seller`), published at
**https://mcp.senprints.com**.

These pages are a submission requirement for the AI client directories
(Claude Connectors Directory, ChatGPT Apps, MCP Registry) — reviewers read
them and check them against what the server actually does.

## What is in this repo

Seven hand-built static HTML pages, plus a 404. **The published site has no
build step and no runtime dependency** — the browser loads HTML, one
stylesheet, one script and the fonts, and nothing else:

- `index.html` — landing page
- `connect.html` — how to connect
- `what-you-can-ask.html` — example questions
- `tool-reference.html` — all 28 tools
- `data-and-security.html` — what the assistant can and cannot see
- `privacy.html` — privacy notice for the connector
- `support.html` — troubleshooting and contacts
- `404.html` — served by GitHub Pages for any unknown path

Shared front-end, referenced by every page:

- `assets/site.css` — the whole stylesheet, including both themes.
- `assets/site.js` — theme switch, in-page contents, search, and the two mobile
  disclosures (Menu and Search).
- `assets/fonts.css` + `assets/fonts/` — self-hosted Poppins and JetBrains Mono,
  so no request leaves the origin to render a page.

Machine-readable twins of the same prose, all published:

- `*.md` — one Markdown twin per page, linked from its HTML with
  `<link rel="alternate" type="text/markdown">`. Directory reviewers and LLM
  clients read these instead of scraping the HTML.
- `llms.txt` / `llms-full.txt` — the site summarised per llmstxt.org.
- `search-index.json` — the corpus the in-page search fetches on first use.
  **There is no generator: it is maintained by hand**, so update it whenever
  page prose changes or search will quote text that is no longer on the page.
  It indexes only the prose inside `.content` — nav labels, the top bar and
  other chrome are deliberately absent, so changing those needs no update here.
- `sitemap.xml`, `robots.txt` — crawling is deliberately allowed; the whole site
  is public documentation.

Plus:

- `.nojekyll` — **do not delete.** GitHub Pages runs Jekyll on any repo without
  this file, and Jekyll drops directories whose name starts with a dot. That
  would silently remove `.well-known/` from the published site.
- `.well-known/mcp-registry-auth` — domain-ownership proof for the MCP Registry.
- `favicon.ico` — the SenPrints brand mark, 32×32, taken from the seller
  dashboard (`seller_v3/public/favicon.ico`) so the two match. Browsers request
  `/favicon.ico` whether or not a page links to it, so it stays at the root.
- `CNAME` — custom domain.

The `.md` twins at the repo root are the working source for the prose: edit the
twin, then transcribe into the matching HTML page, so the two do not drift.

An earlier copy of this prose lived in the internal backend repo at
`.docs/publish-mcp-to-stores/site/*.md`. **That folder is now empty and was
never tracked in git**, so do not treat it as canonical without checking with
whoever owns the backend docs first.

## Running it locally

```
npm install          # only the test runner; the site itself needs nothing
npm run dev          # http://localhost:4173
```

Use `npm run dev` rather than `python3 -m http.server`. Internal links are
extensionless (`/connect`, not `/connect.html`) because that is how GitHub Pages
serves them; a plain static server answers 404 and the whole nav looks broken
locally while being fine in production. `scripts/serve.mjs` reproduces the Pages
routing rules, in about sixty lines and with no dependencies.

## Tests

```
npm test             # Playwright, ~10s
```

Two suites, both driving the same server `npm run dev` uses:

- `tests/responsive-layout.spec.mjs` — the layout contract. Every page is
  checked for horizontal overflow at twelve widths from 320px up, in three
  states (idle, menu open, search open); touch targets are checked against the
  44px minimum; and the mobile top bar is checked for the order that matters —
  brand first, controls trailing. This suite exists because the top bar once
  overflowed 360px by 13px and made every page scroll sideways, and nothing in
  a desktop browser showed it.
- `tests/site-structure.spec.mjs` — the wiring. Every internal link and anchor
  resolves, every page carries its own title/description/canonical and a
  Markdown twin, every page uses the shared stylesheet rather than a private
  copy, and the nav lists all seven pages with exactly one marked current.

The runner is the only dependency in the repo, and it is a `devDependency` —
nothing in `node_modules` is ever deployed.

## Deploying

Static files, so any host works. Current plan: GitHub Pages behind Cloudflare
(all other SenPrints subdomains are managed in Cloudflare, and this one stays
consistent with them).

1. **Settings → Pages** on this repo: source "Deploy from a branch", branch
   `main`, folder `/ (root)`.
2. DNS: add a `CNAME` record for `mcp` → `sensocial.github.io`.
3. **Leave that record DNS-only (grey cloud) at first.** GitHub cannot issue its
   TLS certificate while DNS resolves to Cloudflare's IPs — certificate
   provisioning hangs. Wait until **Enforce HTTPS** becomes available on the
   Pages settings page, then turn on the proxy.
4. Cloudflare **SSL/TLS mode must be Full (Strict)**. Flexible causes an
   infinite redirect loop, because GitHub Pages forces HTTPS while Flexible
   calls the origin over HTTP.
5. **Exempt these paths from bot protection**: the docs pages, the privacy page,
   `/.well-known/mcp-registry-auth`, and `/assets/*`. Directory reviewers run
   automated link checkers, and the MCP Registry fetches that file with
   `User-Agent: mcp-registry/1.0` — neither is a browser, and Cloudflare answers
   both with `403`. `/assets/*` is on the list because the stylesheet and script
   are shared files rather than inlined: block them and a reviewer's crawler
   sees unstyled text.
6. **Purge the Cloudflare cache after every docs change.** A reviewer who asks
   for a wording fix and still sees the old page costs another review round.

Checked already: the apex `senprints.com` has no CAA record, so Let's Encrypt
issuance for GitHub Pages is not blocked, and `mcp.senprints.com` did not exist
beforehand, so there is no stale record to clean up.

## Verifying after deploy

Run these from a terminal, **not** a browser — a browser always passes the bot
check, so it cannot tell you whether an automated client would be blocked.

```
curl -sSI https://mcp.senprints.com/
curl -sS -A "mcp-registry/1.0" https://mcp.senprints.com/.well-known/mcp-registry-auth
```

The second command must print the key line. A `404` or an HTML challenge page
there makes registry publishing fail with a misleading "no MCP public key found
in HTTP response" error.

## Notes for whoever touches this next

- Internal links are root-relative and extensionless (`/connect`). GitHub Pages
  resolves those to the `.html` file; `scripts/serve.mjs` does the same locally.
  There is no build step to rewrite anything, so a renamed file means editing
  the links in the other pages by hand — including the anchor
  `/connect#if-it-does-not-connect`, which `support.html` links to. `npm test`
  fails on a dead link or a dead anchor, so run it after any rename.
- The sidebar nav is duplicated in every page's HTML and lists all seven pages
  in reading order. Adding or removing a page means editing every page's nav,
  the "Start here" cards in `index.html`, `sitemap.xml`, `llms.txt` and
  `search-index.json`. The nav test catches the first of those; the rest are on
  you.
- Below 900px the sidebar becomes a panel behind the Menu button, and below
  620px the search field collapses to an icon that expands over the bar. Both
  live in `assets/site.js`. Keep the brand first in the bar and the controls
  trailing — a Menu button ahead of the logo reads as though the menu were the
  product, and `tests/responsive-layout.spec.mjs` asserts the order.
- **Exempt `/assets/*` from bot protection along with the pages.** The
  stylesheet and script are shared files, not inlined, so a Cloudflare rule that
  blocks them renders the site as unstyled text for a reviewer running an
  automated checker — the exact audience these pages exist for.
- The favicon is `favicon.ico` at the root plus `icon-512.png` for touch icons,
  linked from every page. Replacing the icon means swapping those files and
  re-checking the `<link>` tags, which are duplicated per page.
