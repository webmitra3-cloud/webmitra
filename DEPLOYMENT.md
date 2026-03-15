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
- Media on Cloudinary (required for image uploads)

## 1. GitHub

Code is pushed to:
- `https://github.com/webmitra3-cloud/webmitra.git`

## 2. Create Vercel Project

1. Sign in to Vercel.
2. Import GitHub repo `webmitra3-cloud/webmitra`.
3. In project settings:
- Root Directory: `web`
- Framework: Next.js (auto-detected)
- Install Command: `npm install`
- Build Command: `npm run build`

## 3. Production Environment Variables (Vercel)

Set these in Project Settings -> Environment Variables:

- `NODE_ENV=production`
- `MONGO_URI=...` (MongoDB Atlas URI)
- `CLIENT_ORIGIN=https://your-domain.com,https://*.vercel.app`
- `COOKIE_DOMAIN=` (empty unless using subdomains)
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
- `WHATSAPP_NUMBER=9779869672736`
- `NEXT_PUBLIC_WHATSAPP_NUMBER=9779869672736`

## 4. Domain + SSL

1. Add your custom domain in Vercel.
2. Point DNS records to Vercel.
3. SSL is automatic (Let's Encrypt).

## 5. Post-Deploy Checks

Validate:
- `/healthz` returns `{ ok: true }`
- Public pages load
- Admin login works
- Settings update works
- Image upload works (Cloudinary URL saved)
- Contact form and testimonials work

## 6. Best Practices

- Use same-origin API calls (`/api/*`) for lowest latency and no CORS complexity.
- Keep all secrets only in Vercel environment variables.
- Rotate JWT secrets periodically.
- Restrict MongoDB Atlas network access.
- Use Vercel preview deployments before promoting to production.
