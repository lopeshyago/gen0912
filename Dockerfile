# syntax=docker/dockerfile:1.7

# --- Estágio Base ---
FROM node:20-bookworm-slim AS base
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# --- Estágio de Dependências do Frontend ---
FROM base AS frontend-deps
WORKDIR /app/frontend
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

# --- Estágio de Build do Frontend ---
FROM base AS frontend-build
WORKDIR /app/frontend
COPY --from=frontend-deps /app/frontend/node_modules ./node_modules
COPY frontend ./
RUN pnpm build

# --- Estágio de Dependências do Backend ---
FROM base AS backend-deps
WORKDIR /app/backend
COPY backend/package*.json ./
RUN --mount=type=cache,id=npm,target=/root/.npm npm install --omit=dev

# --- Estágio de Build do Backend (se houver) ---
FROM backend-deps AS backend-source
WORKDIR /app/backend
COPY backend ./

# --- Estágio Final ---
FROM node:20-bookworm-slim AS runner
ENV NODE_ENV=production \
    PORT=3001 \
    SERVE_FRONTEND=true

RUN apt-get update && apt-get install -y --no-install-recommends nginx && rm -rf /var/lib/apt/lists/*

WORKDIR /app/backend
COPY --from=backend-source /app/backend ./
COPY --from=frontend-build /app/frontend/dist ./public
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "src/server.js"]
