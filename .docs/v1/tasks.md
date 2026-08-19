# Tasks

## Đã xong

### Sửa layout
- [x] Đo và xác định nguyên nhân scroll ngang (`div.themeswitch`, 13px, cả 8 trang)
- [x] Đảo thứ tự top bar: logo đầu, control cuối — 8 file HTML
- [x] Thu ô search thành icon ở ≤620px, mở bung phủ thanh
- [x] Hiện lại wordmark "Seller Connector" trên mobile
- [x] Chuyển theme switch vào nav panel ở ≤900px, full-width + có nhãn
- [x] `flex: none` cho icon button, `min-width: 0` cho `.brand` và `.search`
- [x] Nút Search/Menu 44×44px, cách nhau ≥8px
- [x] Nav row và theme button cao ≥44px

### Hạ tầng
- [x] `scripts/serve.mjs` — dev server mô phỏng GitHub Pages routing
- [x] `package.json` + `.gitignore`, Playwright là devDependency duy nhất
- [x] `playwright.config.mjs` dùng chung server với `npm run dev`

### Test
- [x] `tests/site.mjs` — fixture dùng chung
- [x] `tests/responsive-layout.spec.mjs` — overflow, thứ tự bar, touch target, theme, search overlay
- [x] `tests/site-structure.spec.mjs` — link, anchor, metadata, shared asset, nav
- [x] Chứng minh suite fail trên code gốc (16 fail / 30 pass) — test không giả-pass

### Docs
- [x] Sửa 6 claim sai trong `README.md`
- [x] Bổ sung mục Running it locally và Tests
- [x] Thêm `/assets/*` vào danh sách exempt bot protection
- [x] Đối chiếu `search-index.json` với backend-apis: không có generator, file duy trì tay, chỉ index prose `.content`
- [x] Sửa claim README về nguồn prose ở backend repo (thư mục đó nay rỗng)

## Còn lại

- [ ] Xác nhận rule bot protection cho `/assets/*` trên Cloudflare. Hiện chỉ là suy luận từ chính ghi chú cũ trong README, chưa test thật. Nếu sai thì reviewer thấy site không style — đúng đối tượng mà trang này tồn tại để phục vụ.
- [ ] Cân nhắc chạy test trong CI. Hiện chỉ chạy local; `playwright.config.mjs` đã có nhánh `process.env.CI` (reporter `github`, `forbidOnly`) nhưng chưa có workflow file.

## Đã cân nhắc và bỏ qua

- Test trên WebKit/Firefox. Chỉ cấu hình Chromium. Bug này là bug flexbox, không phải bug engine-specific; thêm 2 engine làm suite chậm gấp 3 đổi lấy ít giá trị.
- Test visual regression bằng ảnh. Bắt được thay đổi nhưng đỏ cả khi sửa một chữ.
- Index `.docs/README.md` liệt kê các version. Bỏ theo đúng yêu cầu cấu trúc `.docs/{version}/`; version cao nhất là mới nhất.
