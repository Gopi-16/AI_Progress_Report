# Simple Dockerfile for production builds
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-alpine AS run
WORKDIR /app
COPY --from=base /app/dist ./dist
COPY package.json ./
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "dist/server.js"]
