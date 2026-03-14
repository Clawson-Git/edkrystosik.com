# Build stage
FROM node:22-alpine AS build

RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Production stage
FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

COPY server.js .
COPY --from=build /app/dist ./dist

RUN mkdir -p /data

ENV PORT=3001
ENV DATA_DIR=/data

EXPOSE 3001

CMD ["node", "server.js"]
