# Decisions

## Logo đứng đầu top bar, control dồn về phải

**Why:** Logo là mỏ neo nhận diện, phải nằm ở vị trí mắt chạm đầu tiên. Control là thứ tay với tới, nên thuộc về mép phải — vùng ngón cái. Stripe Docs, Tailwind, VitePress, Mintlify đều xếp như vậy; Docusaurus là ngoại lệ đặt hamburger trước logo, và đó chính là cái chủ nhân thấy xấu.

**Alternative rejected:** Giữ `☰` bên trái rồi chỉ thu nhỏ theme switch cho vừa. Vá được 13px nhưng để nguyên lỗi bố cục thật, và vẫn ẩn wordmark.

**How to apply:** Thứ tự DOM: `.brand` → `.search` → `.searchclose` → `.topbar-sp` → `.themeswitch` → `.searchtoggle` → `.navtoggle`. Desktop ẩn 3 icon button nên vẫn ra `brand | search | spacer | theme`. Thứ tự DOM này cũng chính là thứ tự đọc của screen reader — giờ bắt đầu bằng logo thay vì nút Menu. Có test `the brand leads and the controls trail` khoá lại.

## Ô search thu thành icon, mở bung phủ cả thanh

**Why:** Ở 360px không có đủ chỗ cho logo + field + theme + Menu. Phải bỏ bớt một thứ, và field search chiếm ~186px cho một chức năng dùng không thường xuyên, trong khi wordmark bị hy sinh cho nó. Đảo lại ưu tiên: field thu về icon 44px, wordmark lấy lại chỗ.

**Alternative rejected:** Đẩy search xuống thành hàng thứ hai dưới topbar. Đơn giản hơn nhưng làm topbar sticky cao gấp đôi, ăn mất chiều dọc vốn đã hiếm trên mobile.

**How to apply:** `≤620px`: `.search { position: absolute; display: none }`, `.searchtoggle { display: grid }`. Khi `[data-search-open]` trên `.topbar-in`: field hiện và trải từ `--gutter` đến `--gutter + 2.75rem`, chừa chỗ cho nút X; `.brand`, `.searchtoggle`, `.navtoggle`, `.topbar-sp` đều ẩn.

**Bẫy đã gặp:** phải ẩn cả `.topbar-sp`. Nó cũng có `margin-left: auto`, nên hai auto margin trong cùng flex row chia đôi khoảng trống và đẩy nút X ra **giữa** field.

## Theme switch chuyển vào nav panel ở ≤900px

**Why:** Hai vấn đề cùng lúc. Nó là khối `flex: none` rộng 98px — thủ phạm chính của 13px tràn. Và mỗi nút chỉ 32×34px, dưới ngưỡng 44px, lại không có nhãn chữ nên người dùng phải đoán icon. Trong panel nó có đủ chỗ để tử tế: full-width, cao 44px, có chữ.

**Alternative rejected:** Rút còn 1 nút xoay vòng light→dark→system. Tiết kiệm chỗ nhưng che mất trạng thái hiện tại và bắt bấm nhiều lần để tới đúng lựa chọn.

**How to apply:** Duplicate `.themeswitch` vào cuối `#nav`, biến thể `.wide`. Duplicate là chấp nhận được ở đây vì `apply()` trong `site.js` query `[data-set-theme]` toàn cục nên đồng bộ sẵn, không phải viết thêm code. Breakpoint của hai bản khớp nhau ở `900` để không bao giờ hiện cùng lúc — test `exactly one instance is offered at any width` khoá điều này.

## `flex: none` trên icon button là bắt buộc, không phải trang trí

**Why:** Đây chính là cơ chế của bug gốc. Khi flex row chật, các item co lại tới min-content rồi **dừng** — phần thừa tràn ra ngoài chứ không co tiếp. Đo được: `.navtoggle` khai 44px nhưng thực tế render 18px (min-content của icon) mà bar vẫn tràn. Nút co lại thành không bấm được **và** trang vẫn scroll ngang.

**Alternative rejected:** `overflow-x: hidden` trên `body`. Che triệu chứng, để nguyên bệnh, và làm mọi lỗi tràn sau này thành vô hình.

**How to apply:** Mọi `.iconbtn` mang `flex: none`. Đổi lại, thứ **phải** co được thì cho co rõ ràng: `.search { min-width: 0 }` và `.brand { min-width: 0 }` + `.brand span { text-overflow: ellipsis }`. Nguyên tắc: trong một flex row, chỉ định rõ ai co ai không, đừng để mặc định quyết định.

## Dev server tự viết thay vì static server có sẵn

**Why:** Link nội bộ extensionless (`/connect`). GitHub Pages resolve được, `python3 -m http.server` thì không — nav trông như hỏng khi dev dù production bình thường. Nguy hiểm hơn: sai lệch dev/prod kiểu này làm người ta quen với việc "local nó vậy đó", rồi bỏ qua lỗi thật.

**Alternative rejected:** Đổi hết link thành `/connect.html`. Đúng là hết vấn đề local, nhưng URL công khai xấu đi và phải sửa cả `sitemap.xml`, `llms.txt`, `search-index.json`, canonical của 8 trang.

**How to apply:** `scripts/serve.mjs`, ~60 dòng, chỉ dùng Node stdlib. Test dùng **chung** server này qua `webServer` trong `playwright.config.mjs`, nên cái test chạy đúng là cái reviewer thấy.

## Test khoá invariant, không khoá danh sách phần tử

**Why:** Test kiểu "`.themeswitch` phải rộng dưới X px" sẽ hỏng ngay lần đổi design kế tiếp và không bắt được thủ phạm mới. Invariant thật là: **trang không được rộng hơn viewport của chính nó**. Nó đúng với mọi design, và khi fail thì tự liệt kê phần tử nào tràn.

**Alternative rejected:** Snapshot ảnh. Bắt được thay đổi nhưng đỏ cả khi chỉ sửa một chữ, và không nói được *tại sao* sai.

**How to apply:** `overflow()` trong `tests/site.mjs` so `scrollWidth` với `clientWidth`, chỉ khi lệch mới đi liệt kê phần tử vượt biên để báo lỗi. Chạy qua 7 trang × 12 width × 3 trạng thái.

**Đã kiểm chứng:** `git stash` bản vá rồi chạy lại trên code gốc → 16 fail / 30 pass, 7 fail overflow chỉ đích danh `div.themeswitch`. Test giả-pass là test vô dụng, nên bước này không bỏ được.
