## 1. Giới thiệu dự án
**ShopLite** là một ứng dụng website bán hàng đa trang (Multi-page Web Application) hoạt động hoàn toàn ở phía Client-side (Trình duyệt), sử dụng dữ liệu sản phẩm thực tế kết nối bất đồng bộ từ máy chủ công khai qua Fake Store API. 

Dự án này là sản phẩm tổng hợp (Long Assignment) áp dụng toàn bộ các kiến thức nền tảng Front-End bao gồm cấu trúc ngữ nghĩa HTML5, hệ thống lưới chia cột Grid Responsive của Bootstrap 5, tư duy lập trình JavaScript Logic và cơ chế kiểm soát tương tác cây giao diện DOM & Event.

---

## 2. Công nghệ sử dụng
Dự án tuân thủ nghiêm ngặt các quy định về công nghệ của module, tập trung vào xây dựng nền tảng gốc, không sử dụng framework JavaScript (như React/Vue/Angular) hay thư viện bên ngoài (như jQuery):
* **HTML5:** Xây dựng cấu trúc trang web chuẩn ngữ nghĩa (Semantic HTML).
* **CSS3 & Bootstrap 5 (CDN):** Thiết kế giao diện, bo góc, đổ bóng và xử lý hiển thị co giãn linh hoạt (Responsive Design).
* **Vanilla JavaScript (ES6+):** Xử lý luồng dữ liệu logic, vòng lặp, điều kiện và xử lý chuỗi.
* **Fetch API (async/await):** Gọi dữ liệu bất đồng bộ từ máy chủ và quản lý kịch bản lỗi mạng.
* **HTML5 LocalStorage:** Lưu trữ trạng thái thông tin giỏ hàng bền vững liên trang.

---

## 3. Danh sách tính năng đã hoàn thành (Nghiệm thu Rubric)

Dưới đây là các tiêu chí tính năng đã được triển khai và hoàn thiện, đáp ứng các cấp độ chấm điểm từ Đạt đến Xuất sắc:

### Cấp độ ĐẠT (Pass Tier)
* [x] **Cấu trúc đa trang:** Hệ thống gồm 4 trang độc lập kết nối chặt chẽ qua thanh Navbar (`index.html`, `product.html`, `cart.html`, `register.html`).
* [x] **Semantic Tags:** Sử dụng đúng chuẩn các thẻ cấu trúc (`<nav>`, `<header>`, `<main>`, `<footer>`).
* [x] **Render sản phẩm động (Trang chủ):** Tự động kết nối mạng, fetch danh sách sản phẩm và dùng vòng lặp `.map().join("")` để bơm giao diện ra DOM.
* [x] **Trang chi tiết sản phẩm chuẩn chỉ:** Rút trích chính xác tham số `id` thông qua URL Query String (`URLSearchParams`) để hiển thị thông tin chi tiết đích danh sản phẩm.
* [x] **Validate dữ liệu Form Đăng ký:** Kiểm tra lỗi bỏ trống, lỗi email định dạng RegEx, lỗi độ dài mật khẩu trực tiếp bằng JavaScript trước khi submit.
* [x] **Giao diện Responsive cơ bản:** Layout tự động co giãn không bị tràn vỡ chữ vách trên các thiết bị.

### Cấp độ GIỎI & XUẤT SẮC (Good & Excellent Tier)
* [x] **Giỏ hàng LocalStorage liên trang nâng cao:** Thêm sản phẩm, tăng số lượng tự động nếu trùng ID, xóa mặt hàng ra khỏi danh sách, cộng dồn tổng số tiền hóa đơn chuẩn xác. Dữ liệu được nén và giữ lại trọn vẹn thông qua `JSON.stringify` và `JSON.parse`.
* [x] **Kỹ thuật Ủy quyền sự kiện (Event Delegation):** Tối ưu hiệu năng bằng cách gắn duy nhất một Event Listener tại các thẻ cha cố định (`#product-grid`, `#cart-table-body`) để quản lý hành vi bấm nút của hàng loạt phần tử con được sinh ra động.
* [x] **Quản lý trạng thái Trải nghiệm người dùng:** Tích hợp bộ quay `Spinner Loading` trong lúc chờ phản hồi mạng và dựng hộp cảnh báo lỗi màu đỏ trực quan bằng `try/catch` phòng thủ khi server sập hoặc mất kết nối.
* [x] **Đồng bộ hóa dữ liệu Badge giỏ hàng toàn trang:** Con số hiển thị tổng số lượng hàng hóa trên góc Navbar tự động chạy cập nhật đồng bộ thời gian thực bất kể người dùng đang đứng ở bất cứ trang con nào.
* [x] **Trải nghiệm Đăng ký mượt mà:** Tự động xóa sạch form (`reset()`) và điều hướng người dùng quay trở về trang chủ (`window.location.href`) ngay sau khi đăng ký thành công.

---

## 4. Cấu trúc thư mục dự án
```text
fef-shoplite-[ten-cua-ban]/
│
├── index.html          # Trang chủ (Danh sách 20 sản phẩm)
│
├── product.html        # Trang xem chi tiết một sản phẩm theo ID
├── cart.html           # Trang quản lý giỏ hàng và thanh toán
├── register.html       # Trang đăng ký thành viên và validate form
│
├── script.js           # Xử lý logic tải sản phẩm mạng & thêm vào giỏ hàng
├── product-detail.js   # Xử lý bóc tách Query String URL & xem chi tiết
├── cart.js             # Xử lý bảng giỏ hàng, tính tổng tiền và xóa sản phẩm
├── register.js         # Xử lý bắt sự kiện submit form & validate dữ liệu nhập
│
└── README.md           # Tài liệu hướng dẫn và nghiệm thu đồ án