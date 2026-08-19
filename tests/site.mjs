/* Shared fixtures for the suite: the pages that exist and the widths worth
 * checking. Kept in one place so adding a page means editing one array, not
 * every spec. */

/** Every routable page, as the extensionless paths the nav actually links to. */
export const PAGES = [
  "/",
  "/connect",
  "/what-you-can-ask",
  "/tool-reference",
  "/data-and-security",
  "/privacy",
  "/support",
];

/** Viewport widths that matter, including both sides of each breakpoint.
 *  620/621 and 900/901 are the two the stylesheet switches on; 320 is the
 *  narrowest phone still in circulation. */
export const WIDTHS = [320, 360, 375, 414, 620, 621, 768, 900, 901, 1024, 1180, 1440];

/** Below this width the search field is collapsed behind its icon. */
export const SEARCH_COLLAPSE = 620;

/** Below this width the sidebar becomes a panel behind the Menu button. */
export const SIDEBAR_COLLAPSE = 900;

/** Apple HIG minimum touch target, in CSS px. */
export const TOUCH_MIN = 44;

/** Measure the page against its own viewport. A page overflows when it can be
 *  scrolled wider than it is — that is the sideways-scroll bug, stated as an
 *  invariant rather than as a list of suspect elements. */
export async function overflow(page) {
  return page.evaluate(() => {
    const d = document.documentElement;
    const past = [];
    if (d.scrollWidth > d.clientWidth) {
      document.querySelectorAll("*").forEach((el) => {
        const b = el.getBoundingClientRect();
        if (b.width && (b.right > d.clientWidth + 1 || b.left < -1)) {
          past.push(`${el.tagName.toLowerCase()}.${(el.className || "").toString().trim().split(/\s+/)[0] || "?"}`);
        }
      });
    }
    return { scrollWidth: d.scrollWidth, clientWidth: d.clientWidth, past: [...new Set(past)].slice(0, 6) };
  });
}
