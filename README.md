# FFVN Rankings - Supabase
1. Trong Supabase SQL Editor, chạy toàn bộ `supabase/schema.sql`.
2. Tạo `.env.local` từ `.env.example`, rồi dán Publishable Key của bạn.
3. `npm install`
4. `npm run dev`
5. Mở `/admin` để đăng nhập bằng tài khoản Auth đã tạo và đã có UID trong `public.admins`.
6. Khi deploy Vercel, thêm `VITE_SUPABASE_URL` và `VITE_SUPABASE_PUBLISHABLE_KEY` vào Environment Variables.
Không dùng service_role/secret key trong trình duyệt.
