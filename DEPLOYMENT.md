# Deployment Guide (Single Next.js App)

This project deploys as one Next.js application (`web`) containing:
- frontend
- admin CMS frontend
- backend API (`/api/*`)

## Recommended Platform

- **Vercel** (first-class Next.js support, easiest production setup)

## Architecture

- One deployment unit on Vercel
- MongoDB on Atlas
- Media on Cloudinary (recommended for production)

## 1. GitHub

Code is already pushed to:
- `https://github.com/webmitra3-cloud/webmitra.git`

## 2. Create Vercel Project

1. Sign in to Vercel
2. Import GitHub repo: `webmitra3-cloud/webmitra`
3. In project settings:
   - **Root Directory**: `web`
   - Framework: Next.js (auto)
   - Install Command: `npm install`
   - Build Command: `npm run build`

## 3. Production Environment Variables (Vercel)

Set these in Vercel Project -> Settings -> Environment Variables:

- `NODE_ENV=production`
- `MONGO_URI=...` (MongoDB Atlas connection string)
- `CLIENT_ORIGIN=https://your-domain.com,https://*.vercel.app`
- `COOKIE_DOMAIN=` (leave empty unless using subdomains)
- `JWT_ACCESS_SECRET=...`
- `JWT_REFRESH_SECRET=...`
- `JWT_ACCESS_EXPIRES_IN=15m`
- `JWT_REFRESH_EXPIRES_IN=7d`
- `REFRESH_COOKIE_NAME=wm_refresh`
- `CSRF_COOKIE_NAME=wm_csrf`
- `BCRYPT_ROUNDS=12`
- `ADMIN_SEED_EMAIL=...`
- `ADMIN_SEED_PASSWORD=...`
- `RESEND_API_KEY=...`
- `MAIL_FROM=WebMitra.Tech <hello@your-domain.com>`
- `MAIL_TO=...`
- `AUTO_REPLY_ENABLED=true`
- `SEED_DUMMY_ON_STARTUP=true`
- `CLOUDINARY_CLOUD_NAME=...`
- `CLOUDINARY_API_KEY=...`
- `CLOUDINARY_API_SECRET=...`
- `LOCAL_UPLOAD_BASE_URL=https://your-domain.com/uploads`
- `WHATSAPP_NUMBER=9779869672736`
- `NEXT_PUBLIC_API_URL=` (leave empty for same-origin `/api`)
- `NEXT_PUBLIC_WHATSAPP_NUMBER=9779869672736`

## 4. Domain + SSL

1. Add custom domain in Vercel (`your-domain.com`)
2. Point DNS records to Vercel
3. SSL is automatic (Let’s Encrypt)

## 5. Post-Deploy Checks

Validate:
- `/healthz` returns `{ ok: true }`
- public pages load
- admin login works
- settings update works
- image upload works (Cloudinary)
- contact form + testimonials work

## 6. Best Practices

- Keep `NEXT_PUBLIC_API_URL` empty in single-app mode to avoid CORS complexity.
- Use Cloudinary in production; do not rely on local uploads for persistence.
- Rotate JWT secrets periodically.
- Keep MongoDB IP/network access secured.
- Use Vercel preview deployments for testing before promoting to production.
