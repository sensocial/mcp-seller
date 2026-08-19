/* Structural guardrails.
 *
 * The README warns that renaming a page means hand-editing the links in every
 * other page, and that the nav is repeated per file. Those are exactly the
 * mistakes a reviewer finds before we do — a dead link in submitted docs costs
 * a directory review round. Cheap to check, so checked.
 */

import { expect, test } from "@playwright/test";
import { PAGES } from "./site.mjs";

test.describe("routing", () => {
  for (const path of PAGES) {
    test(`${path} is served`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
    });
  }

  test("an unknown path gets the 404 page with a 404 status", async ({ page }) => {
    const res = await page.goto("/no-such-page");
    expect(res.status()).toBe(404);
  });
});

test("every internal link resolves", async ({ page, request }) => {
  const seen = new Map();

  for (const path of PAGES) {
    await page.goto(path);
    const hrefs = await page.evaluate(() =>
      [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute("href"))
    );
    for (const href of hrefs) {
      const target = href.split("#")[0] || "/";
      if (!seen.has(target)) seen.set(target, path);
    }
  }

  const dead = [];
  for (const [target, from] of seen) {
    const res = await request.get(target);
    if (!res.ok()) dead.push(`${target} (linked from ${from}) -> ${res.status()}`);
  }
  expect(dead, `dead internal links:\n${dead.join("\n")}`).toEqual([]);
});

test("anchor targets exist on the page they point at", async ({ page }) => {
  const anchors = new Set();

  for (const path of PAGES) {
    await page.goto(path);
    const found = await page.evaluate(() =>
      [...document.querySelectorAll('a[href*="#"]')]
        .map((a) => a.getAttribute("href"))
        .filter((h) => h.startsWith("/") && h.includes("#"))
    );
    found.forEach((h) => anchors.add(h));
  }

  const broken = [];
  for (const href of anchors) {
    const [target, id] = href.split("#");
    await page.goto(target || "/");
    if ((await page.locator(`#${CSS.escape ? id : id}`).count()) === 0) broken.push(href);
  }
  expect(broken, `anchors pointing at nothing:\n${broken.join("\n")}`).toEqual([]);
});

test.describe("shared assets", () => {
  // The stylesheet and script were once inlined per page. If a page ever drifts
  // back to a private copy, the site stops being themeable in one place.
  for (const path of PAGES) {
    test(`${path} uses the shared stylesheet and script`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('link[rel="stylesheet"][href="/assets/site.css"]')).toHaveCount(1);
      await expect(page.locator('script[src="/assets/site.js"]')).toHaveCount(1);
      await expect(page.locator("style")).toHaveCount(0);
    });
  }

  test("the stylesheet and script are actually served", async ({ request }) => {
    for (const asset of ["/assets/site.css", "/assets/site.js", "/assets/fonts.css", "/search-index.json"]) {
      const res = await request.get(asset);
      expect(res.status(), asset).toBe(200);
    }
  });
});

test.describe("per-page metadata", () => {
  for (const path of PAGES) {
    test(`${path} carries its own title, description and canonical`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(/\S/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S/);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      // Every page advertises a Markdown twin for LLM clients; a missing one is
      // a silent gap in llms.txt coverage.
      await expect(page.locator('link[rel="alternate"][type="text/markdown"]')).toHaveCount(1);
    });
  }

  test("each Markdown twin is served", async ({ page, request }) => {
    for (const path of PAGES) {
      await page.goto(path);
      const href = await page.locator('link[rel="alternate"][type="text/markdown"]').getAttribute("href");
      const res = await request.get(new URL(href).pathname);
      expect(res.status(), href).toBe(200);
    }
  });
});

test("the nav lists every page, on every page", async ({ page }) => {
  for (const path of PAGES) {
    await page.goto(path);
    const links = await page.evaluate(() =>
      [...document.querySelectorAll("#nav .nav-list a")].map((a) => a.getAttribute("href"))
    );
    expect(new Set(links), `nav on ${path}`).toEqual(new Set(PAGES));

    // Exactly one entry marks where the reader is.
    await expect(page.locator('#nav a[aria-current="page"]')).toHaveCount(1);
  }
});
