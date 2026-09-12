# ── College Junction API (Express + TypeScript) ─────────────────────────────
# Build from the REPO ROOT:   docker build -t college-junction-api .
# Run:   docker run -p 4000:4000 --env-file apps/api/.env college-junction-api
FROM node:20-alpine AS build
WORKDIR /app

# Install only the API workspace (+ shared types) from the lockfile first so the
# dependency layer is cached. MONGOMS skips downloading a mongod binary we never
# use in production. apps/web's package.json is copied just so the workspace
# glob resolves; its dependencies are not installed.
COPY package.json package-lock.json ./
COPY packages/types/package.json packages/types/
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
RUN MONGOMS_DISABLE_POSTINSTALL=1 npm ci --workspace @college-junction/api

# Build shared types, then the API.
COPY packages/types packages/types
COPY apps/api apps/api
RUN npm run build:types && npm run --workspace @college-junction/api build

# Strip devDependencies (typescript, tsx, mongodb-memory-server, @types/*…).
RUN npm prune --omit=dev

# ── Runtime ─────────────────────────────────────────────────────────────────
FROM node:20-alpine
ENV NODE_ENV=production PORT=4000
WORKDIR /app
USER node

# @college-junction/types is symlinked into node_modules by npm workspaces,
# so its package.json + dist must exist at the same path as at build time.
COPY --from=build --chown=node:node /app/package.json /app/package-lock.json ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/packages/types/package.json ./packages/types/
COPY --from=build --chown=node:node /app/packages/types/dist ./packages/types/dist
COPY --from=build --chown=node:node /app/apps/api/package.json ./apps/api/
COPY --from=build --chown=node:node /app/apps/api/dist ./apps/api/dist

EXPOSE 4000
# Render/Compose may override PORT at runtime — the healthcheck follows along.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/api/health" >/dev/null || exit 1

CMD ["node", "apps/api/dist/server.js"]
