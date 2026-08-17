# SenPrints Seller Connector — public docs site

Public documentation for the SenPrints Seller MCP connector
(`https://api.senprints.com/mcp/seller`), published at
**https://mcp.senprints.com**.

These pages are a submission requirement for the AI client directories
(Claude Connectors Directory, ChatGPT Apps, MCP Registry) — reviewers read
them and check them against what the server actually does.

7 plain-Markdown pages, no build step of your own:

- `index.md` — landing page / nav
- `connect.md` — how to connect
- `what-you-can-ask.md` — example questions
- `tool-reference.md` — all 28 tools
- `data-and-security.md` — what the assistant can/can't see
- `privacy.md` — privacy notice for the connector
- `support.md` — troubleshooting & contacts

Plus site plumbing: `_config.yml` (Jekyll + [just-the-docs](https://just-the-docs.com)
theme config), `CNAME` (custom domain), and this `README.md`.

## Deploying — for whoever sets up hosting

Two workable options. **Option A is the recommended one**; option B exists in
case policy requires everything to sit behind Cloudflare.

### Option A — GitHub Pages, with Cloudflare in DNS-only mode

1. **Settings → Pages** on this repo:
   - **Source**: "Deploy from a branch"
   - **Branch**: `main`, folder `/ (root)`
2. GitHub Pages builds the site with Jekyll automatically. Nothing to install,
   no `Gemfile`, no Actions workflow. The `just-the-docs` theme is fetched at
   build time via `remote_theme`.
3. DNS: add a `CNAME` record for `mcp` → `sensocial.github.io`. See GitHub's
   ["Managing a custom domain"](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
   docs for the exact record an org-owned Pages site expects.
4. **Set that record to DNS-only (grey cloud), not proxied.** Directory
   reviewers run automated link checkers against these pages; Cloudflare's bot
   protection answers those with `403` and the submission is failed without any
   visible reason. DNS-only sidesteps that entirely, and GitHub Pages issues
   its own TLS certificate.
5. Once DNS resolves, turn on **Enforce HTTPS** on the same Pages settings page.

### Option B — Cloudflare Pages

Also fine, but Jekyll needs a Ruby build environment configured on the Pages
project, which option A gets for free. If the domain ends up proxied through
Cloudflare either way, **allowlist the docs and privacy paths past bot
protection** for the reason in step 4 above.

### One file that must be reachable, whichever option

`/.well-known/mcp-registry-auth` — a small text file proving domain ownership to
the MCP Registry. It is not committed yet (it contains a public key that has not
been generated); `_config.yml` already carries `include: [".well-known"]`
because Jekyll excludes dot-directories by default and would otherwise drop it
silently. After it is added, verify with:

```
curl https://mcp.senprints.com/.well-known/mcp-registry-auth
```

A `404` there means registry publishing will fail with a misleading
"no public key found" error.

## Why plain Markdown, not a static-site generator

The `site/` content was written as plain `.md` on purpose, so it isn't locked
into any particular generator. It happens to be served here through GitHub
Pages' built-in Jekyll build, but the prose itself doesn't assume Jekyll.

## Notes for whoever touches this next

- Internal links between pages use the source filename directly (e.g.
  `[Privacy](privacy.md)`), **not** an extension-less path. Leave them that
  way: GitHub Pages enables the `jekyll-relative-links` plugin by default and
  cannot disable it (confirmed in GitHub's own "About GitHub Pages and
  Jekyll" docs), and that plugin is what rewrites `privacy.md` to the page's
  real published URL at build time. If this site is ever moved off GitHub
  Pages' Jekyll build, re-check that the new host still resolves `.md` links
  the same way.
- Page order in the left nav comes from the `nav_order` front matter on each
  page (1 = Home ... 7 = Support), matching the "Start here" table in
  `index.md`. Keep the two in sync if pages are ever added, removed or
  reordered.
