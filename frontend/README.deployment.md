# Frontend Deployment Guide

## Environment Variables

Create a `.env.production` file với nội dung:

```env
REACT_APP_API_URL=https://your-backend-name.onrender.com/api
```

**Thay `your-backend-name` bằng tên backend thực tế trên Render!**

## Vercel Configuration

File `vercel.json` đã được cấu hình sẵn.

Khi deploy trên Vercel, thêm environment variable:
- Key: `REACT_APP_API_URL`
- Value: `https://your-backend-name.onrender.com/api`

## Build Command

```bash
npm run build
```

## Test Production Build Locally

```bash
npm run build
npx serve -s build
```

Mở http://localhost:3000 để test.

