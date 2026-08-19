# Context

Những gì cần biết để đọc được thay đổi mà không phải mở lại toàn bộ code.

## Kiến trúc trang

Site tĩnh, không build step. Trình duyệt tải HTML + 1 stylesheet + 1 script + font, hết.

```
mcp-seller/
├── *.html                  8 trang, mỗi trang tự chứa nav + topbar (duplicate)
├── *.md                    Markdown twin của từng trang, published cho LLM client
├── assets/
│   ├── site.css            toàn bộ style, cả 2 theme
│   ├── site.js             theme switch, TOC, search, 2 disclosure mobile
│   └── fonts.css + fonts/  Poppins + JetBrains Mono self-host
├── scripts/serve.mjs       dev server, zero-dep, mô phỏng GitHub Pages routing
├── tests/                  Playwright
├── search-index.json       corpus cho search, 51 entry
└── llms.txt, sitemap.xml, robots.txt
```

**Điểm quan trọng:** topbar và sidebar nav được **duplicate trong cả 8 file HTML**. Không có template engine. Sửa topbar nghĩa là sửa 8 file — lần này làm bằng script Python thay vì sửa tay, vì 8 block đó byte-identical (`md5` khớp trước khi patch).

## Routing

Link nội bộ là **root-relative + extensionless**: `/connect`, không phải `/connect.html`.

- GitHub Pages tự resolve `/connect` → `connect.html`.
- Static server thường **không** làm vậy → 404 khi dev local.
- `scripts/serve.mjs` tái hiện đúng 3 hành vi: `/`→`index.html`, `/connect`→`connect.html`, còn lại → `404.html` kèm **status 404 thật** (không phải 200).

## Breakpoint

Stylesheet chuyển ở 3 mốc. Hai mốc dưới quyết định topbar:

| Width | Sidebar | TOC | Top bar |
|---|---|---|---|
| ≥1181px | cột trái sticky | hiện | `brand \| search \| spacer \| theme` |
| 901–1180px | cột trái sticky | **ẩn** | như trên |
| 621–900px | **panel sau nút Menu** | ẩn | `brand \| search \| spacer \| ☰` (theme chuyển vào panel) |
| ≤620px | panel | ẩn | `brand \| spacer \| 🔍 \| ☰` (search thu thành icon) |

Hai mốc `900` và `620` được test ở cả hai phía (`900/901`, `620/621`) vì đó là chỗ dễ hở nhất.

## Cơ chế theme

Ba trạng thái: `light` / `dark` / `system`.

- Anti-flash: script inline trong `<head>` đọc `localStorage['sp-theme']` và set `data-theme` **trước khi** paint.
- Palette khai báo 3 lần: `:root` (light), `@media (prefers-color-scheme: dark) :root:not([data-theme="light"])`, và `:root[data-theme="dark"]`. Ba lần là cần thiết — người chưa từng chạm switch phải theo hệ thống, người đã chọn thì lựa chọn phải thắng.
- **Có 2 instance của `.themeswitch` trong DOM**: một trong topbar (hiện ≥901px), một trong nav panel (hiện ≤900px). `apply()` trong `site.js` query `[data-set-theme]` không giới hạn scope nên đồng bộ cả hai miễn phí. Đúng một instance visible ở mọi width — có test khoá điều này.

## Hai disclosure trên mobile

Cả hai là attribute-driven, không có class toggle:

| Disclosure | Attribute | Đặt ở đâu | Trigger |
|---|---|---|---|
| Nav panel | `data-nav-open` | `<html>` | `.navtoggle` |
| Search overlay | `data-search-open` | `.topbar-in` | `.searchtoggle` |

`data-nav-open` đặt trên `<html>` vì nó cần `overflow: hidden` để khoá scroll nền. `data-search-open` đặt trên `.topbar-in` vì phạm vi ảnh hưởng chỉ trong thanh đó.

**Quan hệ:** mở Search sẽ đóng Nav (nút Search vẫn hiện khi panel mở). Chiều ngược lại không tồn tại — khi search overlay mở, `.navtoggle` bị `display: none`, nên không thể bấm Menu. Lối thoát của search là X / `Escape` / chạm ra ngoài.

## Search

- Index nạp lazy: `fetch('/search-index.json')` ở lần focus đầu tiên.
- `search-index.json` **không có generator** — duy trì tay, commit vào repo (chỉ xuất hiện 1 lần trong git history, ở `04ff19c`). Sửa prose trang mà quên cập nhật thì search sẽ trích dẫn text không còn tồn tại.
- Index chỉ chứa prose trong `.content`. Đã đối chiếu 51 entry: không entry nào chứa "Appearance", "Skip to content", "Getting started", "Search the docs" hay "Match system". Nghĩa là **thay đổi chrome (topbar, nav, theme switch) không ảnh hưởng index**.
- Phím `/` focus ô search; trên mobile nó mở luôn overlay rồi mới focus.

## Dependency

| | Có gì | Deploy? |
|---|---|---|
| Trang publish | không có gì | — |
| Dev server | không có gì (Node stdlib) | không |
| Test | `@playwright/test` (devDependency) | không |

`.gitignore` chặn `node_modules/`, `test-results/`, `playwright-report/`.
