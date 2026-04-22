# Usamos la imagen oficial de Bun
FROM oven/bun:1.1-alpine AS base

# 1. Instalar dependencias
FROM base AS install
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# 2. Construir la aplicación
FROM base AS prerelease
WORKDIR /app
COPY --from=install /app/node_modules ./node_modules
COPY . .
# Next.js detectará que estás usando Bun
RUN bun run build 

# 3. Etapa final (Producción)
FROM base AS release
WORKDIR /app
COPY --from=prerelease /app/.next ./.next
COPY --from=prerelease /app/public ./public
COPY --from=prerelease /app/package.json ./package.json
COPY --from=prerelease /app/node_modules ./node_modules

# Cloud Run usa el puerto 8080 por defecto
EXPOSE 8080
ENV PORT 8080

CMD ["bun", "start"]
