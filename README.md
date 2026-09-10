# College Junction

Campus notes-and-problem-sharing platform. Monorepo (npm workspaces):

```
apps/api          Express + TypeScript + Mongoose API   (✅ built)
apps/web          Next.js 14 App Router frontend        (⏳ next step)
packages/types    Shared TS interfaces + Zod schemas used by both
```

## Quick start (API)

```bash
npm install
cp apps/api/.env.example apps/api/.env      # fill in secrets
npm run dev:api                              # http://localhost:4000
npm run smoke                                # end-to-end curl suite (100 checks)
```

- With `MONGODB_URI` empty in development the API boots an **in-memory MongoDB** (`mongodb-memory-server`). Nothing is persisted. Set a real URI (Atlas etc.) for persistence. In production `MONGODB_URI` is required.
- Admin accounts have **no public signup**. Create one with `ADMIN_USERNAME=… ADMIN_EMAIL=… ADMIN_PASSWORD=… npm run seed:admin`, or set `BOOTSTRAP_ADMIN=true` + the same vars in `.env` to ensure it on boot.
- No SMTP configured → verification / reset emails are printed to the server console with clickable links.
- No Cloudinary configured → posts still work; file uploads return `503`.

## API surface

All responses use `{ success, message, data }` / `{ success:false, message, errors? }`.
All state-changing requests must send `X-Requested-With: XMLHttpRequest` (CSRF mitigation for `SameSite=None` cookies).

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

- **Cookies**: `httpOnly`, `secure` + `SameSite=None` in production (env-driven), `Lax` in dev. CORS restricted to `CLIENT_URL` (+ `EXTRA_CLIENT_ORIGINS`) with credentials.
- **Tokens**: 15-min access JWT, 7-day refresh JWT whose **sha256 hash** is stored in `RefreshToken` with a `family`. Rotation marks the old row `revoked + replacedBy`; presenting it again is treated as theft and the whole family is revoked (`TOKEN_REUSE`).
- **Auto-delete**: `Post.deleteAt` + TTL index (`expireAfterSeconds: 0`). Never `setTimeout`. A 10-minute `node-cron` reconciles Cloudinary assets of TTL-deleted posts via the `OrphanFile` queue and purges dangling comments.
- **Snapshot**: `authorSnapshot` is `immutable` on the schema; filters and the compound index target `authorSnapshot.*`.
- **Sanitisation**: `isomorphic-dompurify` (all tags stripped) on titles, descriptions, comments and profile fields before save.
