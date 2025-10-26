# 🚀 HƯỚNG DẪN DEPLOY DỰ ÁN GROUP 11

## 📋 Tổng quan

- **Frontend**: React app deploy trên Vercel
- **Backend**: Node.js API deploy trên Render
- **Database**: MongoDB Atlas

---

## 1️⃣ DEPLOY DATABASE - MONGODB ATLAS

### Bước 1: Tạo Cluster
1. Truy cập: https://cloud.mongodb.com
2. Đăng nhập hoặc tạo tài khoản mới
3. Click **"Create"** → **"Deploy a cloud database"**
4. Chọn **FREE tier** (M0 Sandbox)
5. Chọn region gần nhất (Singapore hoặc Tokyo)
6. Cluster Name: `Cluster01` (hoặc tên bạn muốn)
7. Click **"Create Cluster"**

### Bước 2: Tạo Database User
1. Vào **Database Access** (sidebar trái)
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: `groupAdmin` (hoặc tên bạn muốn)
5. Password: Tạo password mạnh (LƯU LẠI!)
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### Bước 3: Whitelist IP Address
1. Vào **Network Access** (sidebar trái)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Hoặc thêm IP cụ thể của Render sau
4. Click **"Confirm"**

### Bước 4: Lấy Connection String
1. Quay lại **Database** (sidebar trái)
2. Click **"Connect"** trên cluster của bạn
3. Chọn **"Drivers"**
4. Copy **Connection String**:
   ```
   mongodb+srv://groupAdmin:<password>@cluster01.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Thay `<password>` bằng password thật**
6. **LƯU CONNECTION STRING NÀY** - sẽ dùng cho backend!

---

## 2️⃣ DEPLOY BACKEND - RENDER

### Bước 1: Chuẩn bị
1. Đảm bảo code đã push lên GitHub
2. Có file `backend/package.json` với script:
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
     }
   }
   ```

### Bước 2: Tạo Web Service trên Render
1. Truy cập: https://render.com
2. Đăng nhập với GitHub
3. Click **"New +"** → **"Web Service"**
4. Click **"Connect a repository"**
5. Chọn repository **group11-project**

### Bước 3: Cấu hình Web Service
- **Name**: `group11-backend` (hoặc tên bạn muốn)
- **Region**: Singapore (hoặc gần nhất)
- **Branch**: `frontend-ui-rebuild` (hoặc `main`)
- **Root Directory**: `backend`
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: Free

### Bước 4: Thêm Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Thêm các biến sau:

```
PORT=3000
MONGODB_URI=mongodb+srv://groupAdmin:<password>@cluster01.xxxxx.mongodb.net/groupDB?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=ddw6thwic
CLOUDINARY_API_KEY=362386286799448
CLOUDINARY_API_SECRET=SRMp4xg-ZCtP4S46HCJO5AbFV7o
NODE_ENV=production
```

**CHÚ Ý**: Thay `<password>` trong MONGODB_URI bằng password thật!

### Bước 5: Deploy
1. Click **"Create Web Service"**
2. Đợi 3-5 phút để Render build và deploy
3. Khi thấy **"Your service is live 🎉"** → Thành công!
4. **Copy URL**: `https://group11-backend.onrender.com`
5. Test API: `https://group11-backend.onrender.com/api/auth/signup`

---

## 3️⃣ DEPLOY FRONTEND - VERCEL

### Bước 1: Chuẩn bị Environment Variable
Tạo file `frontend/.env.production`:

```env
REACT_APP_API_URL=https://group11-backend.onrender.com/api
```

**CHÚ Ý**: Thay URL bằng URL backend thực tế từ Render!

### Bước 2: Deploy trên Vercel
1. Truy cập: https://vercel.com
2. Đăng nhập với GitHub
3. Click **"Add New..."** → **"Project"**
4. Import repository **group11-project**
5. Click **"Import"**

### Bước 3: Cấu hình Project
- **Framework Preset**: Create React App
- **Root Directory**: `frontend` (click Edit, chọn `frontend`)
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### Bước 4: Thêm Environment Variables
1. Click **"Environment Variables"**
2. Thêm:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://group11-backend.onrender.com/api`
   - **Environments**: Production, Preview, Development (chọn cả 3)
3. Click **"Add"**

### Bước 5: Deploy
1. Click **"Deploy"**
2. Đợi 2-3 phút để Vercel build
3. Khi thấy **"Congratulations!"** → Thành công!
4. **Copy URL**: `https://group11-project.vercel.app`
5. Mở URL để test!

---

## 4️⃣ CẤU HÌNH CORS BACKEND

Sau khi deploy, cần update CORS trong backend để cho phép frontend truy cập:

```javascript
// backend/server.js
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3001',
    'https://group11-project.vercel.app', // Thêm URL Vercel của bạn
    'https://*.vercel.app' // Cho phép tất cả preview deployments
  ],
  credentials: true
}));
```

**Push lại code** → Render sẽ tự động redeploy!

---

## 5️⃣ KIỂM TRA HỆ THỐNG

### Test Backend
```bash
curl https://group11-backend.onrender.com/api/auth/signup \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"test123"}'
```

### Test Frontend
1. Mở: `https://group11-project.vercel.app`
2. Click **"Đăng ký"**
3. Điền thông tin và submit
4. Nếu thành công → Hệ thống hoạt động!

### Test MongoDB
1. Vào MongoDB Atlas
2. Click **"Browse Collections"**
3. Xem database `groupDB` → collection `users`
4. Thấy user vừa tạo → Database hoạt động!

---

## 6️⃣ TROUBLESHOOTING

### Backend không kết nối MongoDB
- Kiểm tra MONGODB_URI có đúng password không
- Kiểm tra MongoDB Atlas Network Access có allow IP 0.0.0.0/0

### Frontend không gọi được Backend
- Kiểm tra REACT_APP_API_URL có đúng không
- Kiểm tra CORS trong backend có cho phép domain Vercel không
- Mở F12 Console xem lỗi cụ thể

### Backend Render bị "sleep"
- Free tier Render sẽ sleep sau 15 phút không dùng
- Request đầu tiên sẽ mất 30-60 giây để wake up
- Giải pháp: Upgrade plan hoặc dùng cron job ping mỗi 10 phút

---

## 7️⃣ CẬP NHẬT SAU KHI DEPLOY

### Update Backend
1. Push code lên GitHub
2. Render tự động detect và redeploy
3. Hoặc manual deploy: Render Dashboard → Manual Deploy

### Update Frontend
1. Push code lên GitHub
2. Vercel tự động build và deploy
3. Mỗi commit tạo 1 preview deployment

---

## 8️⃣ DOMAIN CUSTOM (TÙY CHỌN)

### Vercel Custom Domain
1. Vào Vercel Project Settings
2. Click **"Domains"**
3. Add custom domain (vd: `group11.com`)
4. Follow hướng dẫn cấu hình DNS

### Render Custom Domain
1. Vào Render Dashboard → Settings
2. Click **"Custom Domains"**
3. Add domain và cấu hình DNS

---

## 📝 CHECKLIST HOÀN THÀNH

- [ ] MongoDB Atlas cluster created và running
- [ ] Database user created với password
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] Backend deployed trên Render
- [ ] Backend environment variables configured
- [ ] Backend URL working: `https://xxx.onrender.com/api/...`
- [ ] Frontend deployed trên Vercel
- [ ] Frontend environment variables configured
- [ ] Frontend URL working: `https://xxx.vercel.app`
- [ ] CORS configured đúng trong backend
- [ ] Test signup/login thành công
- [ ] Test admin features thành công
- [ ] Data hiển thị đúng từ MongoDB

---

## 🎉 KẾT QUẢ

Sau khi hoàn tất, bạn có:

- ✅ **Frontend Live**: `https://group11-project.vercel.app`
- ✅ **Backend Live**: `https://group11-backend.onrender.com`
- ✅ **Database Live**: MongoDB Atlas
- ✅ **Full Stack App** hoạt động online 24/7!

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề:
1. Check logs trên Render (Logs tab)
2. Check logs trên Vercel (Deployments → View Function Logs)
3. Check MongoDB Atlas logs (Metrics tab)
4. Mở F12 Console trong trình duyệt xem lỗi

---

**Good luck! 🚀**

