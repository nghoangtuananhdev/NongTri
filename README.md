# Nông Trí – Trợ lý AI cho nông dân ĐBSCL (Sáng tạo trẻ AI 2026, Bảng C)

Bài tập BT08 (UX). Toàn bộ dữ liệu là **mô phỏng**; chú Tư và chị Lan là nhân vật giả định.

- `app/` – front-end tĩnh, 7 màn hình mobile 390×844.
- `figma-plugin/` – plugin Figma dev (`manifest.json`, `code.js`, `ui.html`).
- `slides/` – slide PPTX + PDF, ảnh PNG export từ Figma.
- `docs/` – mô tả đề tài, kịch bản demo.

## Chạy app
```
node ../_tools/serve.mjs app 5502
```
## Import plugin
Giống app 1 (chọn `figma-plugin/manifest.json`). Build lại: `node ../_tools/html2figma/build.mjs .`

## Prototype Figma
https://www.figma.com/proto/foyccQwf5hoeBPOOWD8cWB/BT08-NongTri
