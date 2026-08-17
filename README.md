# SenPrints Seller Connector — public docs site

Public documentation for the SenPrints Seller MCP connector
(`https://api.senprints.com/mcp/seller`), published at
**https://mcp.senprints.com**.

These pages are a submission requirement for the AI client directories
(Claude Connectors Directory, ChatGPT Apps, MCP Registry) — reviewers read
them and check them against what the server actually does.

## What is in this repo

Seven hand-built static HTML pages. There is **no build step and no
dependency** — every page is self-contained, with its CSS inlined:

- `index.html` — landing page / nav
- `connect.html` — how to connect
- `what-you-can-ask.html` — example questions
- `tool-reference.html` — all 28 tools
- `data-and-security.html` — what the assistant can and cannot see
- `privacy.html` — privacy notice for the connector
- `support.html` — troubleshooting and contacts

Plus:

- `.nojekyll` — **do not delete.** GitHub Pages runs Jekyll on any repo without
  this file, and Jekyll drops directories whose name starts with a dot. That
  would silently remove `.well-known/` from the published site.
- `.well-known/mcp-registry-auth` — domain-ownership proof for the MCP Registry.
- `favicon.ico` — the SenPrints brand mark, 32×32, taken from the seller
  dashboard (`seller_v3/public/favicon.ico`) so the two match. Browsers request
  `/favicon.ico` whether or not a page links to it, so it stays at the root.
- `CNAME` — custom domain.

The prose is maintained as Markdown in the internal backend repo
(`.docs/publish-mcp-to-stores/site/*.md`) and transcribed into these HTML pages.
Edit the Markdown first, then update the matching page here, so the two do not
drift.

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
5. **Exempt three paths from bot protection**: the docs pages, the privacy page,
   and `/.well-known/mcp-registry-auth`. Directory reviewers run automated link
   checkers, and the MCP Registry fetches that file with
   `User-Agent: mcp-registry/1.0` — neither is a browser, and Cloudflare answers
   both with `403`.
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

- Internal links between pages are plain relative `.html` paths. There is no
  build step to rewrite anything, so a renamed file means editing the links in
  the other six pages by hand — including the anchor
  `connect.html#if-it-does-not-connect`, which `support.html` links to.
- The nav strip at the top of each page lists all seven pages in reading order
  and repeats the "Start here" table in `index.html`. Adding or removing a page
  means editing every page's nav.
- Each page carries its own copy of the stylesheet on purpose. A shared
  `style.css` would be one more URL to exempt from bot protection, and a
  blocked stylesheet would render the page as unstyled text for a reviewer.
- The favicon is embedded in every page as a `data:` URI, for the same reason,
  with `favicon.ico` at the root as the fallback. Replacing the icon therefore
  means regenerating the base64 in all seven pages, not just swapping the file.
