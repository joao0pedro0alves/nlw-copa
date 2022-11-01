# SERVER

### SETUP

1. Fastify

- npm i fastify
- npm i @fastify/cors

### PRISMA

1. Install prisma

- npm i prisma -D
- npm i @prisma/client
- npx prisma init --datasource-provider SQLite

2. Create prisma model

- Create model
- Run npx prisma migrate dev
- Add name for migration

- View studio: run npx prisma studio

3. ERD

- npm i prisma-erd-generator -D @mermaid-js/mermaid-cli -D
- npx prisma generate