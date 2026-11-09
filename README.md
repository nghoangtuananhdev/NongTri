# Nông Trí – Trợ lý AI cho nông dân ĐBSCL (Sáng tạo trẻ AI 2026, Bảng C)

Bài tập BT08 (UX). Toàn bộ dữ liệu là **mô phỏng**; chú Tư và chị Lan là nhân vật giả định.

- `src/` – các màn hình React, icon SVG và dữ liệu mô phỏng.
- `app/` – 7 màn hình mobile 390×844, được render thành HTML tĩnh bằng React.
- `figma-plugin/` – plugin Figma dev (`manifest.json`, `code.js`, `ui.html`).
- `slides/` – slide PPTX + PDF, ảnh PNG export từ Figma.
- `docs/` – mô tả đề tài, kịch bản demo.

## Chạy app

Mở terminal tại thư mục repo. Các trang đã được build sẵn để chạy trên GitHub Pages hoặc máy chủ tĩnh:

```sh
python3 -m http.server 5500
```

Mở `http://localhost:5500/`. Khi sửa JSX hoặc dữ liệu trong `src/`, dùng Node.js để tạo lại các trang:

```sh
npm ci
npm run build
```

Commit cùng các file HTML được cập nhật trong `app/`. CSS trong `app/assets/css/` giữ bố cục gốc. View Transitions chạy trên trình duyệt hỗ trợ và tôn trọng thiết lập giảm chuyển động.

## Import plugin
Giống app 1 (chọn `figma-plugin/manifest.json`). Sau khi chạy `npm run build`, tạo lại plugin bằng `node ../_tools/html2figma/build.mjs .`

## Prototype Figma
https://www.figma.com/proto/foyccQwf5hoeBPOOWD8cWB/BT08-NongTri
