FROM node:20-alpine AS workspace
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
# COPY packages ./packages
COPY apps ./apps
COPY patches ./patches
# Find and remove non-package.json files
# RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf
RUN find apps \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf
# ENTRYPOINT [ "tail", "-f", "/dev/null" ]

# Install dependencies only when needed
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=workspace /app ./
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install
# ENTRYPOINT [ "tail", "-f", "/dev/null" ]

FROM node:20-alpine AS builder_frontend
WORKDIR /app
COPY --from=deps /app ./
COPY .. .
# Restore workspaces symlinks && build fresh packages (Sharp)
# RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn add -W sharp
# ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV IS_DOCKER_BUILD 1
RUN NODE_ENV=production yarn workspace frontend build

# App - Production image
FROM node:20-alpine AS runner_frontend
RUN yarn global add pm2
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder_frontend --chown=nextjs:nodejs /app/frontend/.next/standalone ./
COPY --from=builder_frontend --chown=nextjs:nodejs /app/frontend/next.config.js ./frontend
COPY --from=builder_frontend --chown=nextjs:nodejs /app/frontend/.next/static ./frontend/.next/static
COPY --from=builder_frontend --chown=nextjs:nodejs /app/frontend/public ./frontend/public
# # @TODO: this is causing trouble with the standalone version.
# COPY --from=builder_starter --chown=nextjs:nodejs /app/packages/ui/public/icons.svg ./apps/starter/public/icons.svg

USER nextjs
EXPOSE 8080
ENV PORT 8080
CMD [ "pm2-runtime", "-i max", "start", "frontend/server.js"]


# UI - Rebuild the source code only when needed => for storybook
# FROM arm64v8/node:20-alpine AS builder_storybook
# WORKDIR /app
# COPY --from=deps /app ./
# COPY . .
# # Restore workspaces symlinks && build fresh packages (Sharp)
# # RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install
# ENV NODE_ENV production
# RUN yarn workspace sonasid storybook:build

# UI - Production image
# FROM narm64v8/node:20-alpine AS runner_ui
# RUN yarn global add http-server pm2
# WORKDIR /app
# ENV NODE_ENV production
# COPY --from=builder_storybook /app/apps/sonasid/storybook-static ./public
# EXPOSE 8080
# ENV PORT 8080
# CMD ["pm2-runtime", "http-server", "./public"]

# PROXY
FROM nginx:1.23.3-alpine-slim AS runner_nginx
COPY nginx/default.conf /etc/nginx/nginx.conf

# Backend Stage
FROM node:20-alpine as backend

WORKDIR /app

COPY package*.json ./

RUN yarn install

RUN yarn install pm2 -g
ENV PM2_PUBLIC_KEY u14rdd0wod1egel
ENV PM2_SECRET_KEY hpvnew04m5ri9kb
COPY .. .

EXPOSE 4000

CMD ["pm2-runtime", "server.js"]


FROM bun:latest-alpine as bunend

WORKDIR /app

COPY package*.json ./

RUN bun install

RUN bun add pm2 -g
ENV PM2_PUBLIC_KEY u14rdd0wod1egel
ENV PM2_SECRET_KEY hpvnew04m5ri9kb
COPY .. .

EXPOSE 4000

CMD ["pm2-runtime", "server.js"]
