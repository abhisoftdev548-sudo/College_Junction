# College Junction

Campus notes-and-problem-sharing platform. Monorepo (npm workspaces):

```
apps/api          Express + TypeScript + Mongoose API   (✅ built)
apps/web          Next.js 14 App Router frontend        (✅ built)
packages/types    Shared TS interfaces + Zod schemas used by both
```

## Quick start

```bash
npm install
cp apps/api/.env.example apps/api/.env      # fill in secrets
cp apps/web/.env.example apps/web/.env.local
npm run dev:api                              # http://localhost:4000
npm run dev:web                              # http://localhost:3000 (proxies /api → :4000 in dev)
npm run smoke                                # API e2e curl suite (100 checks)
```

### Frontend notes
- Pages: `/`, `/auth/{signin,signup,verify-email,forgot-password,reset-password}`, `/profile/complete`, `/dashboard`, `/profile/[username]`, `/post/[id]`, `/admin`.
- `src/lib/api.ts` is the single axios instance (`withCredentials`, `X-Requested-With`, silent refresh-and-retry on 401). File uploads use a second instance (`postForm`) that can bypass the proxy — see **Uploads** below.
- `middleware.ts` does a presence-only cookie check for `/dashboard`, `/profile/complete`, `/admin` in the default same-origin mode (skipped in split-origin mode, where the auth cookies live on the API's origin); `<AuthGuard>` then enforces sign-in / profile completion / admin role client-side.
- PDF attachments render in an inline viewer on the post page (native browser PDF embed + open/download actions); images get a lightbox-style link.
- Theme: `next-themes` (`attribute="class"`), all brand colours as HSL CSS variables in `globals.css`; no hex classes in components.
- **Same-origin proxy is the default and recommended deploy**: leave `NEXT_PUBLIC_API_URL` empty and the browser only ever talks to the web host — `/api/*` is streamed (never buffered) to `API_INTERNAL_URL` by `src/app/api/[...path]/route.ts`. Cookies stay first-party (`SameSite=Lax`), no CORS in play.
- **Split-origin deploy (opt-in)**: set `NEXT_PUBLIC_API_URL=https://api.example.com` so the browser calls the API directly, and on the API set `COOKIE_SAMESITE=none` (forces `Secure`) so cookies travel cross-site.
- **Uploads**: multipart POSTs go through the same-origin proxy by default. On hosts that cap request bodies (Vercel serverless ≈4.5 MB) set `NEXT_PUBLIC_UPLOADS_URL=https://api.example.com` to send uploads straight to the API — it must be **same-site** with the web host (e.g. `collegejunction.com` + `api.collegejunction.com`) so `SameSite=Lax` cookies still flow.
- Fonts use a system stack (Inter if installed) — no Google Fonts fetch at build time.


## API quick start

```bash
npm install
cp apps/api/.env.example apps/api/.env      # fill in secrets
npm run dev:api                              # http://localhost:4000
npm run smoke                                # end-to-end curl suite (100 checks)
```

- With `MONGODB_URI` empty in development the API boots an **in-memory MongoDB** (`mongodb-memory-server`). Nothing is persisted. Set a real URI (Atlas etc.) for persistence. In production `MONGODB_URI` is required.
- Admin accounts have **no public signup**. Create one with `ADMIN_USERNAME=… ADMIN_EMAIL=… ADMIN_PASSWORD=… npm run seed:admin`, or set `BOOTSTRAP_ADMIN=true` + the same vars in `.env` to ensure it on boot.
- No SMTP configured → verification / reset emails are printed to the server console with clickable links.
- SMTP configured → the connection is **verified at startup** (non-fatal: the server still boots, the boot log says `SMTP: ✅ connected…` or `SMTP: ⚠️ …unreachable`), and every send logs `📧 Email sent/FAILED` with subject, recipient and message id.
- No Cloudinary configured → posts still work; file uploads return `503`.

## Deployment

The same-origin proxy is the default mode everywhere below: the browser only talks to the web host, `/api/*` is proxied server-side, and cookies stay first-party (`SameSite=Lax`, `Secure` in prod — see `COOKIE_SAMESITE`).

| File | What it deploys |
|---|---|
| `Dockerfile` | API image (multi-stage, pruned devDeps, non-root, healthcheck) — build from repo root |
| `Dockerfile.web` | Web image (Next.js `output: standalone`, non-root, healthcheck) |
| `docker-compose.yml` | Full stack locally: web + api + MongoDB, `docker compose up --build` |
| `render.yaml` | Both services on Render (bring your own MongoDB Atlas URI) |
| `apps/web/vercel.json` | Web on Vercel (pair with the API on Render/anywhere — set `API_INTERNAL_URL`) |
| `.github/workflows/ci.yml` | CI: typecheck, build both apps, 100-check API smoke suite (in-memory Mongo), Docker image builds |

### Docker Compose (full stack, one host)

```bash
cp apps/api/.env.example .env    # fill JWT secrets (+ Cloudinary/SMTP if you have them)
docker compose up --build        # web → :3000, api → :4000, mongo (named volume)
```

### Render

1. Push to GitHub → Render **New → Blueprint** (repo contains `render.yaml`).
2. When prompted paste `MONGODB_URI` (free Atlas cluster) and optional Cloudinary/SMTP credentials; JWT secrets are auto-generated.
3. Service URLs default to `<name>.onrender.com` — if Render appends a suffix, update `CLIENT_URL` (api) and `API_INTERNAL_URL` / `NEXT_PUBLIC_SITE_URL` (web).

### Vercel (web) + anywhere (API)

1. Deploy `apps/api` with the root `Dockerfile` (Render, Fly, Railway, any Docker host) or bare Node (`npm run build:api && node apps/api/dist/server.js`).
2. On Vercel, set the project root to `apps/web` and add `API_INTERNAL_URL=https://<your-api>` — the `/api` proxy handles everything server-side.
3. Note the serverless request-body cap (≈4.5 MB): either keep uploads under it, or put the API on a same-site host and set `NEXT_PUBLIC_UPLOADS_URL` to bypass the proxy for uploads (see Frontend notes).


## API surface

All responses use `{ success, message, data }` / `{ success:false, message, errors? }`.
All state-changing requests must send `X-Requested-With: XMLHttpRequest` (CSRF mitigation: browsers can't attach custom headers cross-site without a CORS preflight).

| Method | Route | Auth | Notes |
|---|---|---|---|
| POST | `/api/auth/signup` | – | rate-limited 5/15min |
| POST | `/api/auth/login` | – | `identifier` = email **or** username |
| POST | `/api/auth/refresh` | cookie | rotates refresh token; reuse ⇒ whole family revoked |
| POST | `/api/auth/logout` · `/logout-all` | cookie | |
| GET | `/api/auth/me` | ✔ | |
| POST | `/api/auth/verify-email` · `/resend-verification` | – | |
| POST | `/api/auth/forgot-password` · `/reset-password` | – | reset link single-use; revokes all sessions |
| PUT | `/api/profile/complete` | ✔ | sets `isProfileComplete` |
| GET | `/api/profile/:username` | – | + `{posts, likesReceived}` stats |
| GET | `/api/posts` | opt | `cursor,limit,search,type,course,branch,year,session,author,saved` |
| POST | `/api/posts` | ✔ verified + profile + !restricted | JSON or multipart (`file` ≤10 MB pdf/png/jpeg/webp, magic-bytes checked); 10/hour |
| GET / DELETE | `/api/posts/:id` | opt / owner\|admin | |
| POST | `/api/posts/:id/like` · `/unlike` · `/save` | ✔ | atomic `$addToSet`/`$pull`, counts derived |
| GET / POST | `/api/posts/:id/comments` | – / ✔ | cursor paginated; `parentComment` for replies |
| DELETE | `/api/posts/:id/comments/:commentId` | owner\|admin | cascades replies, decrements by actual count |
| GET | `/api/filters/options` | – | distinct snapshot values, 5-min in-memory cache |
| GET | `/api/admin/stats` · `/users` · `/posts` | admin | |
| PATCH | `/api/admin/users/:id/restrict` | admin | `{ isRestricted }` |
| DELETE | `/api/admin/users/:id` · `/posts/:id` | admin | |
| PATCH | `/api/admin/posts/:id/timer` | admin | `{ duration: "24h"\|"3d"\|"7d"\|null }` → sets `deleteAt`; Mongo TTL index deletes |

## Key design points (from the spec)

- **Cookies**: `httpOnly`, `secure` + `SameSite=Lax` by default (the same-origin proxy mode); `COOKIE_SAMESITE=none` for split-origin deploys (forces `secure`). CORS restricted to `CLIENT_URL` (+ `EXTRA_CLIENT_ORIGINS`) with credentials.
- **Tokens**: 15-min access JWT, 7-day refresh JWT whose **sha256 hash** is stored in `RefreshToken` with a `family`. Rotation marks the old row `revoked + replacedBy`; presenting it again is treated as theft and the whole family is revoked (`TOKEN_REUSE`).
- **Auto-delete**: `Post.deleteAt` + TTL index (`expireAfterSeconds: 0`). Never `setTimeout`. A 10-minute `node-cron` reconciles Cloudinary assets of TTL-deleted posts via the `OrphanFile` queue and purges dangling comments.
- **Snapshot**: `authorSnapshot` is `immutable` on the schema; filters and the compound index target `authorSnapshot.*`.
- **Sanitisation**: `isomorphic-dompurify` (all tags stripped) on titles, descriptions, comments and profile fields before save.
