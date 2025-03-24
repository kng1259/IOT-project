# Stage 1: Generate prisma client and install deps
FROM node:22-alpine AS prisma
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY prisma/schema.prisma .
RUN npx prisma generate --generator client

# Stage 2: Run the app
FROM gcr.io/distroless/nodejs22-debian12
WORKDIR /app

COPY . .
COPY --from=prisma /build/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["server.js"]