FROM oven/bun:1.1-alpine AS base

WORKDIR /app

# Instalamos dependencias usando el lockfile
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copiamos el resto y construimos
COPY . .
RUN bun run build

# Exponemos el puerto que Cloud Run espera
EXPOSE 8080
ENV PORT 8080

CMD ["bun", "run", "start"]
