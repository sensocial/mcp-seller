# Changelog

## 2026-08-19 — Sửa scroll ngang, dựng lại top bar, thêm test

Base: `8d0d09f`, branch `develop`.

### Chẩn đoán

Đo bằng Playwright ở viewport 375px (`clientWidth` 360 sau khi trừ scrollbar):

```
scrollWidth 373 / clientWidth 360   → lệch 13px
phần tử vượt biên: div.themeswitch (98px, flex: none), right = 373
```

Xác nhận trên cả 8 trang — topbar duplicate byte-identical nên lỗi giống hệt nhau. Nội dung không phải thủ phạm: `.tablewrap` và `pre` đã có `overflow-x: auto` che chắn.

### Top bar — 8 file HTML

`index.html`, `connect.html`, `what-you-can-ask.html`, `tool-reference.html`, `data-and-security.html`, `privacy.html`, `support.html`, `404.html`

- Chuyển `.navtoggle` từ **đầu** `.topbar-in` xuống **cuối**, đổi class thành `iconbtn navtoggle`.
- Thêm `button.iconbtn.searchtoggle` (mở search trên mobile) và `button.iconbtn.searchclose`.
- Thêm `div.nav-theme` chứa bản `.themeswitch.wide` vào cuối `#nav`, có nhãn chữ Light / Dark / System.
- Patch bằng script Python sau khi `md5` xác nhận 8 block topbar giống hệt nhau — không sửa tay.

### `assets/site.css`

- Thay block `.navtoggle` bằng `.iconbtn` dùng chung cho 3 nút, có `flex: none`.
- `.topbar-in`: thêm `position: relative` (containing block cho search overlay).
- `.brand`: thêm `min-width: 0`; `.brand span` thêm `overflow: hidden; text-overflow: ellipsis`.
- `.search`: thêm `min-width: 0`.
- Thêm `.nav-theme` và biến thể `.themeswitch.wide` (full-width, cao 44px, có nhãn).
- `@media (max-width: 900px)`: ẩn `.topbar-in .themeswitch`, hiện `.nav-theme`.
- `@media (max-width: 620px)`: viết lại — bỏ `.brand span { display: none }`, thêm trạng thái `[data-search-open]`, `gap` 0.5rem (≥8px giữa 2 touch target), `.search-in` cao 2.75rem.

### `assets/site.js`

- Thêm `setSearch(open)` toggle `data-search-open` trên `.topbar-in` và đồng bộ `aria-expanded`.
- Wire `.searchtoggle` (mở + focus input + đóng nav) và `.searchclose` (xoá query + đóng + trả focus).
- `Escape` trong ô search giờ đóng luôn overlay.
- Phím `/` mở overlay trước khi focus.
- Click ngoài `.topbar-in` đóng overlay.
- `matchMedia("(min-width: 621px)")` reset overlay khi vượt breakpoint.
- Mở nav panel sẽ đóng search.

### Thêm mới

| File | Nội dung |
|---|---|
| `scripts/serve.mjs` | Dev server zero-dep, mô phỏng GitHub Pages routing (extensionless + 404 status thật) |
| `tests/site.mjs` | Fixture dùng chung: `PAGES`, `WIDTHS`, breakpoint, `TOUCH_MIN`, helper `overflow()` |
| `tests/responsive-layout.spec.mjs` | Overflow, thứ tự top bar, touch target, theme switch, vòng đời search overlay |
| `tests/site-structure.spec.mjs` | Link/anchor resolve, metadata từng trang, shared asset, nav đủ 7 trang |
| `playwright.config.mjs` | `webServer` trỏ `scripts/serve.mjs`, port 4173 |
| `package.json` | Script `dev` / `test` / `test:ui`; `@playwright/test` là devDependency duy nhất |
| `.gitignore` | `node_modules/`, `test-results/`, `playwright-report/` |

### Kiểm chứng

- 46 test pass, ~10s.
- Sweep thủ công trước khi viết test: 8 trang × 13 width × 3 trạng thái = 312 tổ hợp, không tổ hợp nào tràn.
- **Chứng minh test bắt được bug:** `git stash` bản vá, chạy lại trên code gốc → **16 fail / 30 pass**. 7 fail overflow đều chỉ đích danh `div.themeswitch`. 30 test pass ở cả hai phía là nhóm structural, đúng như thiết kế.
- Xem bằng ảnh chụp thật ở cả light và dark.

### `README.md` — 6 claim sai, đã verify từng cái

| Claim cũ | Thực tế | Cách verify |
|---|---|---|
| "Seven ... pages" | 8 — thiếu `404.html` | `ls *.html` |
| "every page ... with its CSS inlined" | dùng chung `assets/site.css` | `grep '<link rel="stylesheet"' *.html` |
| "Each page carries its own copy of the stylesheet **on purpose**" | không còn đúng | như trên |
| "favicon embedded ... as a `data:` URI" | không trang nào có | `grep -c 'data:image' *.html` → 0/8 |
| "links are plain relative `.html` paths" | root-relative, extensionless | `grep -o 'href="/[a-z-]*"' index.html` |
| "The nav strip at the top of each page" | sidebar + panel mobile | đọc DOM |

Thiếu hẳn khỏi README: `assets/`, 7 file `.md` twin, `llms.txt`, `llms-full.txt`, `search-index.json`, `sitemap.xml`, `robots.txt`. Đã bổ sung, kèm ràng buộc cập nhật `search-index.json` (chi tiết ở mục đối chiếu bên dưới).

Thêm 2 mục mới: **Running it locally** và **Tests**.

Sửa mục Deploying #5: thêm `/assets/*` vào danh sách path cần exempt khỏi bot protection. Lý do gốc để inline CSS là "shared stylesheet là thêm 1 URL phải exempt" — CSS giờ *đã* shared, nên rủi ro đó thành thật. **Đây là suy luận, chưa test trên Cloudflare thật** (xem [tasks.md](tasks.md)).

## 2026-08-19 — Đối chiếu với backend-apis

Đi tìm script sinh `search-index.json` để trả lời câu hỏi còn treo. Kết quả khác dự đoán.

### `search-index.json` không cần cập nhật — và không có generator

Tìm trong `/private/var/www/laradock/_code/senprints/backend-apis`: không có file nào tham chiếu `search-index` hay `llms.txt`. Trong chính repo này cũng chỉ có `assets/site.js` (bên tiêu thụ). Git history: file xuất hiện đúng 1 lần, ở `04ff19c`.

→ **File duy trì tay, không phải sinh tự động.**

Đối chiếu 51 entry với các chuỗi chrome:

| Chuỗi | Số entry chứa |
|---|---|
| `Appearance` | 0 |
| `Skip to content` | 0 |
| `Getting started` | 0 |
| `Search the docs` | 0 |
| `Match system` | 0 |

Index chỉ chứa prose trong `.content`. Thay đổi lần này thuần chrome → **không ảnh hưởng, không cần cập nhật**. Đã ghi rõ ràng buộc này vào `README.md` và [context.md](context.md#search) để lần sau không phải điều tra lại.

### Nguồn prose ở backend repo đã biến mất

`.docs/publish-mcp-to-stores/` bên backend-apis **rỗng hoàn toàn** (`find -mindepth 1` → 0 file), và `git ls-files` + `git log` cho path đó đều trống — chưa từng được track.

`README.md` đang nói prose "is maintained as Markdown in the internal backend repo ... and transcribed". Đây là claim sai thứ 7, ngoài 6 cái đã sửa. Đã đổi thành: `.md` twin ở root repo này là nguồn làm việc, kèm cảnh báo thư mục bên backend nay rỗng và chưa từng track nên đừng coi là canonical trước khi hỏi người quản lý docs backend.

### Quy ước `.docs` giữa hai repo lệch nhau — cố ý

backend-apis có 130 thư mục `.docs/<feature-slug>/`, chủ yếu 4 file (`brief` 120, `changelog` 120, `context` 114, `plan` 112); **không có thư mục version nào**. Bộ 7 file chỉ xuất hiện lẻ tẻ (`README` 4, `tasks` 3, `flow` 3, `decisions` 3).

Đã trình bày khác biệt và chủ nhân chọn **giữ `.docs/v1/` 7 file** cho repo này. Lý do: mcp-seller là site tĩnh một mục đích, cả repo chỉ có một "feature", nên version phản ánh đúng thực tế hơn feature-slug. Đây là lệch quy ước có chủ đích, không phải bỏ sót.
