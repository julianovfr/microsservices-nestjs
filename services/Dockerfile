# Build context: pasta `services/` (monorepo Nest)
ARG APP_NAME=api-gateway

FROM node:20-bookworm-slim AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG APP_NAME
ENV APP_NAME=${APP_NAME}
RUN npx nest build "${APP_NAME}"

FROM node:20-bookworm-slim AS runner
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends curl \
  && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

ARG APP_NAME
ENV APP_NAME=$APP_NAME

EXPOSE 3000

CMD ["sh", "-c", "node dist/apps/${APP_NAME}/main.js"]
