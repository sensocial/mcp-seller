# Brief

## Mục tiêu

1. Xoá scroll ngang trên mobile ở **mọi** trang, không phải chỉ trang thấy lỗi.
2. Dựng lại thứ tự top bar theo cách các docs site khác làm — logo trước, control sau.
3. Khoá cả hai bằng test, để lần refactor sau không tái phát trong im lặng.

## Yêu cầu

### R1 — Không trang nào scroll ngang

**Before:** `.topbar-in` ở 360px cần 373px. Cụ thể:

| Thành phần | Rộng | Co được? |
|---|---|---|
| `.navtoggle` | 44px | có (co xuống 18px = min-content của icon) |
| `.brand` (chỉ mark, chữ bị ẩn) | 24px | không |
| `.search` (field cố định) | 186px | thiếu `min-width: 0` nên co hạn chế |
| `.themeswitch` | 98px | **không** — `flex: none` |
| padding + 4 gap | ~73px | không |

**After:** `document.documentElement.scrollWidth <= clientWidth` ở mọi trang, mọi breakpoint, mọi trạng thái disclosure.

### R2 — Logo đứng đầu top bar

**Before:** `☰ [mark] [search field] [☀☾▭]` — hamburger trước logo (pattern Docusaurus).

**After:** `[mark + "Seller Connector"] ———— [🔍] [☰]` — logo trước, control dồn phải.

Kèm theo: chữ "Seller Connector" **hiện lại** trên mobile. Trước đây nó bị `display: none` ở ≤620px để nhường chỗ cho ô search — sai thứ tự ưu tiên.

### R3 — Touch target đạt chuẩn

**Before:** 3 nút theme mỗi nút 32×34px — dưới ngưỡng 44px của Apple HIG, và không có nhãn chữ.

**After:** theme switch chuyển vào nav panel, full-width, cao 44px, có chữ Light / Dark / System. Nút Search và Menu 44×44px, cách nhau ≥8px.

### R4 — Xem được local đúng như production

**Before:** link nội bộ là extensionless (`/connect`). `python3 -m http.server` trả 404 → nav trông như hỏng khi dev, dù production bình thường.

**After:** `npm run dev` chạy `scripts/serve.mjs`, tái hiện routing của GitHub Pages.

### R5 — Test bắt được đúng regression này

**After:** `npm test` — 46 test. Đã verify bằng cách `git stash` bản vá và chạy lại trên code gốc: 16 fail.

### R6 — README phản ánh đúng repo

6 claim sai đã verify từng cái, chi tiết trong [changelog.md](changelog.md).

## Non-goals

- **Không** đổi nội dung prose của 7 trang docs. Prose là bản transcribe từ backend repo, sửa ở đây sẽ gây drift.
- **Không** đổi layout desktop. Ở ≥901px top bar giữ nguyên `brand | search | spacer | themeswitch`.
- **Không** đổi palette, font, type scale. Design system giữ nguyên.
- **Không** thêm dependency cho trang đã publish. Playwright là `devDependency`; `node_modules/` không bao giờ được deploy.
- **Không** dựng build step. Repo phải clone-and-open được.
