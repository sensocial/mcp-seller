# Flow

## Top bar theo breakpoint

Cùng một DOM, ba hình dạng. Không có markup nào bị sinh ra hay xoá đi bằng JS — chỉ `display` đổi theo media query.

```mermaid
flowchart TB
    DOM["DOM cố định trong cả 8 file HTML:<br/>.brand → .search → .searchclose → .topbar-sp<br/>→ .themeswitch → .searchtoggle → .navtoggle"]

    DOM --> D{"viewport width"}

    D -->|"≥ 901px"| DESK["<b>Desktop</b><br/>brand │ search │ ⟶ │ theme<br/><br/>ẩn: 3 .iconbtn, .nav-theme"]
    D -->|"621–900px"| TAB["<b>Tablet</b><br/>brand │ search │ ⟶ │ ☰<br/><br/>theme chuyển vào nav panel<br/>ẩn: .searchtoggle, .searchclose"]
    D -->|"≤ 620px"| MOB["<b>Mobile</b><br/>brand │ ⟶ │ 🔍 │ ☰<br/><br/>.search thu thành icon<br/>ẩn: .search, .topbar-in .themeswitch"]

    style DESK fill:#e8f4ea,stroke:#4a7c59,color:#14151A
    style TAB fill:#fdf3e0,stroke:#b8860b,color:#14151A
    style MOB fill:#fde8e8,stroke:#a14707,color:#14151A
```

Lỗi gốc nằm ở nhánh Mobile: `.themeswitch` (98px, `flex: none`) chưa bị ẩn, nên hàng cần 373px trong khung 360px.

## Hai disclosure — state machine

```mermaid
stateDiagram-v2
    direction LR

    [*] --> Idle

    Idle --> NavOpen: tap ☰
    NavOpen --> Idle: tap ☰ / Escape / tap ngoài / theo link

    Idle --> SearchOpen: tap 🔍 / phím /
    SearchOpen --> Idle: tap ✕ / Escape / tap ngoài .topbar-in

    NavOpen --> SearchOpen: tap 🔍<br/>(setNav(false) trước)

    SearchOpen --> Idle: vượt 620px<br/>(matchMedia reset)
    NavOpen --> Idle: vượt 900px<br/>(matchMedia reset)

    note right of SearchOpen
        .navtoggle bị display:none.
        Không có đường SearchOpen → NavOpen.
        Lối thoát: ✕ / Escape / tap ngoài.
    end note
```

**Không có chiều `SearchOpen → NavOpen`** là chủ ý, không phải thiếu sót. Overlay chiếm cả thanh nên nút Menu không còn chỗ — đúng pattern Stripe và VitePress. Điều đó chỉ chấp nhận được vì lối ra rõ ràng, nên test assert **các lối thoát** thay vì assert sự vắng mặt của nút Menu.

Hai nhánh `matchMedia` tồn tại để trạng thái không bị kẹt: xoay ngang máy hoặc kéo cửa sổ qua breakpoint mà attribute còn nguyên thì CSS mới không còn rule nào xử lý nó.

## Search overlay — layout khi mở

```mermaid
flowchart LR
    subgraph BAR[".topbar-in — position: relative"]
        direction LR
        F["<b>.search</b> — position: absolute<br/>left: --gutter<br/>right: --gutter + 2.75rem"]
        X["<b>.searchclose</b><br/>44×44, margin-left: auto"]
    end
    F -.->|"kết quả rơi xuống dưới<br/>.results { right: -2.75rem }<br/>để chạy tới sát gutter"| R["#results"]

    style F fill:#fdf3e0,stroke:#b8860b,color:#14151A
    style X fill:#fde8e8,stroke:#a14707,color:#14151A
    style R fill:#eef1f5,stroke:#8892a0,color:#14151A
```

`.topbar-sp` **phải** bị ẩn ở trạng thái này. Nó cũng mang `margin-left: auto`; hai auto margin trong cùng flex row chia đôi khoảng trống và đẩy nút ✕ vào giữa field.

## Luồng test

```mermaid
flowchart TB
    CFG["playwright.config.mjs<br/>webServer → scripts/serve.mjs :4173"]
    CFG --> SRV["Dev server<br/>/connect → connect.html<br/>không khớp → 404.html + status 404"]

    SRV --> S1
    SRV --> S2

    subgraph S1["responsive-layout.spec.mjs"]
        direction TB
        A["7 trang × 12 width × 3 trạng thái"] --> B["overflow(): scrollWidth ≤ clientWidth"]
        B --> C["nếu lệch → liệt kê phần tử vượt biên<br/>để thông báo lỗi chỉ đúng thủ phạm"]
        D["thứ tự bar · touch target ≥44px<br/>theme switch · vòng đời search overlay"]
    end

    subgraph S2["site-structure.spec.mjs"]
        direction TB
        E["link + anchor nội bộ resolve"]
        F2["metadata từng trang + Markdown twin"]
        G["shared asset — không quay lại inline CSS"]
        H["nav đủ 7 trang, đúng 1 aria-current"]
    end

    S1 --> V{"46 test"}
    S2 --> V
    V -->|"code hiện tại"| P["46 pass · ~10s"]
    V -->|"git stash → code gốc"| FAIL["16 fail / 30 pass<br/>7 fail chỉ đích danh div.themeswitch"]

    style P fill:#e8f4ea,stroke:#4a7c59,color:#14151A
    style FAIL fill:#fde8e8,stroke:#a14707,color:#14151A
```

Nhánh `git stash` là bước không bỏ được: một test không bao giờ đỏ thì không khoá được gì. Lần thử đầu dùng CSS override tự chế để tái hiện bug — **test vẫn pass**, vì riêng `min-width: 0` thêm vào `.search` đã đủ chặn tràn. Bản mô phỏng bug không phải là bug.

## Bản đồ file

| File | Vai trò |
|---|---|
| `assets/site.css` | `.iconbtn`, `.nav-theme`, `.themeswitch.wide`, 2 media query 900/620 |
| `assets/site.js` | `setSearch()`, `setNav()`, wire trigger, 2 nhánh `matchMedia` |
| `*.html` × 8 | topbar + `#nav` duplicate, byte-identical — patch bằng script |
| `scripts/serve.mjs` | `resolvePath()` mô phỏng GitHub Pages |
| `tests/site.mjs` | `PAGES`, `WIDTHS`, `TOUCH_MIN`, `overflow()` |
| `playwright.config.mjs` | nối test với dev server |
