# ĐÀO TẠO - API

## Môi trường
- Cần cài đặt sẵn nodejs

## Cài đặt
1. Pull source
2. Chạy lệnh `npm install` để cài đặt các gói thư viện cần dùng
3. Chạy `npm start` hoặc `node app.js` để khởi động

## Sử dụng
Sử dụng Postman hoặc 1 app tương tự để test API. 
API xây dựng theo chuẩn REST, gồm có:

- /api/{name}                     - GET - Lấy toàn bộ dữ liệu
- /api/{name}/search?param=value  - GET - Tìm kiếm
- /api/{name}                     - POST - Tạo mới
- /api/{name}/{id}                - PUT - Cập nhật
- /api/{name}/{id}                - DELETE - Xoá 