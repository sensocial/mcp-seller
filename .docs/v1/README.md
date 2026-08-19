# v1 — Sửa scroll ngang trên mobile, dựng lại top bar, và khoá bằng test

Trang docs `mcp.senprints.com` bị **scroll ngang trên mọi trang khi xem bằng điện thoại**, và nút Menu đứng trước logo. Nguyên nhân không nằm ở nội dung mà ở `.topbar` — hàng đó nhồi 4 thành phần vào một dòng và ở 360px thì rộng hơn màn hình đúng 13px.

Version này ghi lại: nguyên nhân đo được, cách dựng lại top bar theo pattern các docs site khác dùng, dev server tái hiện routing của GitHub Pages, bộ test khoá lại regression, và 6 chỗ sai lệch trong `README.md` đã sửa.

## Phạm vi

| | |
|---|---|
| Repo | `sensocial/mcp-seller` — trang docs tĩnh, không build step |
| Branch | `develop` |
| Base commit | `8d0d09f feat(site): put the mobile navigation behind a Menu button` |
| Trạng thái | Đã implement, verify và commit |
| Ảnh hưởng | 8 trang HTML, `assets/site.css`, `assets/site.js`, `README.md`, thêm `scripts/`, `tests/`, `package.json` |

## Kết quả đo được

- **Trước:** `scrollWidth` 373 / `clientWidth` 360 ở viewport 375px — lệch 13px, xuất hiện trên cả 8 trang.
- **Sau:** 8 trang × 12 bề rộng (320→1440) × 3 trạng thái = **không trang nào tràn**.
- **Test:** 46 test, ~10s. Chạy trên code gốc cho **16 fail / 30 pass**, tức bộ test thật sự bắt được bug.

## Các file khác

| File | Nội dung |
|---|---|
| [brief.md](brief.md) | Mục tiêu, yêu cầu before/after, non-goals |
| [context.md](context.md) | Kiến trúc trang, breakpoint, cơ chế theme/search/nav |
| [decisions.md](decisions.md) | 6 quyết định thiết kế kèm lý do và phương án đã loại |
| [changelog.md](changelog.md) | Thay đổi theo ngày, kèm đường dẫn file cụ thể |
| [tasks.md](tasks.md) | Việc đã xong và việc còn lại |
| [flow.md](flow.md) | Sơ đồ Mermaid: layout theo breakpoint, state machine của 2 disclosure, luồng test |
