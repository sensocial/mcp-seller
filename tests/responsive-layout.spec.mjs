/* Responsive layout regressions.
 *
 * These exist because the top bar once packed a Menu button, the logo, a
 * permanent search field and a three-part theme switch into one row. At 360px
 * that row was 13px wider than the screen, and the whole site scrolled
 * sideways on every page. Nothing about that was visible in a desktop browser,
 * which is why it survived review — so it is pinned here instead.
 */

import { expect, test } from "@playwright/test";
import { overflow, PAGES, SEARCH_COLLAPSE, SIDEBAR_COLLAPSE, TOUCH_MIN, WIDTHS } from "./site.mjs";

const HEIGHT = 800;

test.describe("no horizontal scroll", () => {
  for (const path of PAGES) {
    test(`${path} fits its viewport at every width`, async ({ page }) => {
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: HEIGHT });
        await page.goto(path);

        const closed = await overflow(page);
        expect(closed.past, `${path} at ${width}px overflows: ${closed.past.join(", ")}`).toEqual([]);
        expect(closed.scrollWidth, `${path} at ${width}px`).toBeLessThanOrEqual(closed.clientWidth);

        // An open disclosure must not overflow either — a panel or an expanded
        // field is exactly where a stray fixed width tends to hide.
        for (const trigger of [".navtoggle", ".searchtoggle"]) {
          const button = page.locator(trigger);
          if (!(await button.isVisible())) continue;
          await button.click();
          const open = await overflow(page);
          expect(open.past, `${path} at ${width}px with ${trigger} open: ${open.past.join(", ")}`).toEqual([]);
          await page.keyboard.press("Escape");
        }
      }
    });
  }
});

test.describe("top bar composition", () => {
  test("the brand leads and the controls trail, on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: HEIGHT });
    await page.goto("/");

    const brand = await page.locator(".brand").boundingBox();
    const search = await page.locator(".searchtoggle").boundingBox();
    const menu = await page.locator(".navtoggle").boundingBox();

    // The logo is the first thing in the bar. A Menu button ahead of it reads
    // as though the menu were the product.
    expect(brand.x).toBeLessThan(search.x);
    expect(search.x).toBeLessThan(menu.x);

    // And the wordmark survives: it is the reason the search field collapses.
    await expect(page.locator(".brand span")).toBeVisible();
  });

  test("the controls are reachable by thumb", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: HEIGHT });
    await page.goto("/");

    const search = await page.locator(".searchtoggle").boundingBox();
    const menu = await page.locator(".navtoggle").boundingBox();

    for (const [name, box] of [["search", search], ["menu", menu]]) {
      expect(box.width, `${name} button width`).toBeGreaterThanOrEqual(TOUCH_MIN);
      expect(box.height, `${name} button height`).toBeGreaterThanOrEqual(TOUCH_MIN);
    }

    // Adjacent targets need 8px of daylight or a thumb hits the wrong one.
    expect(menu.x - (search.x + search.width)).toBeGreaterThanOrEqual(8);
  });

  test("nav rows and the appearance control clear the touch minimum", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: HEIGHT });
    await page.goto("/");
    await page.locator(".navtoggle").click();

    const rows = page.locator("#nav .nav-list a");
    for (let i = 0; i < (await rows.count()); i++) {
      const box = await rows.nth(i).boundingBox();
      expect(box.height, `nav row ${i}`).toBeGreaterThanOrEqual(TOUCH_MIN);
    }

    const swatches = page.locator(".nav-theme [data-set-theme]");
    for (let i = 0; i < (await swatches.count()); i++) {
      const box = await swatches.nth(i).boundingBox();
      expect(box.height, `theme button ${i}`).toBeGreaterThanOrEqual(TOUCH_MIN);
    }
  });

  test("the desktop bar keeps its permanent search field", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: HEIGHT });
    await page.goto("/");

    await expect(page.locator(".search-in")).toBeVisible();
    await expect(page.locator(".searchtoggle")).toBeHidden();
    await expect(page.locator(".navtoggle")).toBeHidden();
    await expect(page.locator(".topbar-in .themeswitch")).toBeVisible();
  });
});

test.describe("appearance control", () => {
  test("exactly one instance is offered at any width", async ({ page }) => {
    await page.goto("/");
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: HEIGHT });
      if (width <= SIDEBAR_COLLAPSE) await page.locator(".navtoggle").click();

      const visible = await page.locator(".themeswitch:visible").count();
      expect(visible, `${width}px offers ${visible} theme switches`).toBe(1);

      if (width <= SIDEBAR_COLLAPSE) await page.keyboard.press("Escape");
    }
  });

  test("the panel copy and the bar copy stay in sync", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: HEIGHT });
    await page.goto("/");
    await page.locator(".navtoggle").click();
    await page.locator('.nav-theme [data-set-theme="dark"]').click();

    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    // Both copies of the control are wired to the same state, so the choice
    // does not appear to reset when the viewport crosses the breakpoint.
    await expect(page.locator('.topbar-in [data-set-theme="dark"]')).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator('.nav-theme [data-set-theme="dark"]')).toHaveAttribute("aria-pressed", "true");
  });
});

test.describe("collapsed search", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: HEIGHT });
    await page.goto("/");
  });

  test("expands over the bar, searches, and closes again", async ({ page }) => {
    const field = page.locator(".search-in");
    await expect(field).toBeHidden();

    await page.locator(".searchtoggle").click();
    await expect(field).toBeVisible();
    await expect(page.locator("#q")).toBeFocused();

    await page.locator("#q").fill("order");
    await expect(page.locator("#results")).toHaveAttribute("data-open", "true");
    await expect(page.locator("#results a").first()).toBeVisible();

    await page.locator(".searchclose").click();
    await expect(field).toBeHidden();
    await expect(page.locator(".brand")).toBeVisible();
  });

  test("the field is a touch target, not just a box for text", async ({ page }) => {
    await page.locator(".searchtoggle").click();
    const box = await page.locator(".search-in").boundingBox();
    expect(box.height).toBeGreaterThanOrEqual(TOUCH_MIN);
  });

  test("searching from an open menu closes the menu", async ({ page }) => {
    await page.locator(".navtoggle").click();
    await expect(page.locator("#nav")).toBeVisible();

    await page.locator(".searchtoggle").click();
    await expect(page.locator("#nav")).toBeHidden();
    await expect(page.locator(".search-in")).toBeVisible();
  });

  test("the expanded field owns the bar, and says how to leave", async ({ page }) => {
    await page.locator(".searchtoggle").click();

    // The overlay takes the whole bar, so Menu and the brand step aside — the
    // pattern Stripe and VitePress both use. That is only acceptable because
    // the way out is unmissable, so assert the exits rather than the absence.
    await expect(page.locator(".navtoggle")).toBeHidden();
    await expect(page.locator(".searchclose")).toBeVisible();

    await page.locator("main").click({ position: { x: 10, y: 10 } });
    await expect(page.locator(".search-in")).toBeHidden();
    await expect(page.locator(".navtoggle")).toBeVisible();
  });

  test("Escape closes it", async ({ page }) => {
    await page.locator(".searchtoggle").click();
    await page.keyboard.press("Escape");
    await expect(page.locator(".search-in")).toBeHidden();
  });

  test("crossing the breakpoint does not strand it open", async ({ page }) => {
    await page.locator(".searchtoggle").click();
    await expect(page.locator(".search-in")).toBeVisible();

    await page.setViewportSize({ width: SEARCH_COLLAPSE + 200, height: HEIGHT });
    await expect(page.locator(".topbar-in")).not.toHaveAttribute("data-search-open", /.*/);
    await expect(page.locator(".brand")).toBeVisible();
  });
});
