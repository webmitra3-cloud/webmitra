# WebMitra.Tech - Single Next.js Full-Stack

This project now runs as **one Next.js application folder** with both:
- frontend (public site + admin CMS)
- backend API (same auth, CMS, DB, and business logic)

Primary app folder:
- `web`

## File Structure (Next.js all-in-one)

```text
web/
  pages/
    api/
      [...path].ts              # Express backend mounted through Next API route
      healthz.ts                # health endpoint
      uploads/[...file].ts      # local upload file serving
    admin/
    projects/
    _app.tsx
    _document.tsx
    ...public/admin pages
  public/
    uploads/                    # local upload storage in development
  src/
    components/                 # UI and layout components
    context/                    # auth/theme providers
    lib/                        # frontend libs (api client, router adapter, utils)
    pages/                      # page modules reused by Next routes
    server/                     # backend code moved into Next project
      app.ts
      bootstrap.ts
      routes/
      controllers/
      models/
      middlewares/
      services/
      config/
      scripts/seed.ts
```

## Run

From repo root:

```bash
npm install
copy web\.env.example web\.env
npm run seed
npm run dev
```

App:
- Web + API: `http://localhost:3000`
- API base: `http://localhost:3000/api`
- Admin login: `http://localhost:3000/admin/login`
- Health: `http://localhost:3000/healthz`

## Build

```bash
npm run lint
npm run build
```

## Notes

- `web/src/server` keeps your previous backend logic (Express routes/controllers/models) and is invoked through Next API routes.
- Existing endpoints remain under `/api/*`.
- Upload URLs remain `/uploads/*` and are rewritten to an internal Next API file handler.
- The old top-level `server` folder is no longer required for runtime after this migration; the active backend is inside `web/src/server`.
