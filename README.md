# API Blueprint

REST API from Lucent Technologies, built with Express 5, Bun, and TypeScript.

## Prerequisites

- [Bun](https://bun.sh) >= 1.x
- [Supabase CLI](https://supabase.com/docs/guides/cli) (for local development)

## Setup

```bash
bun install
```

Create a `.env` file based on `.env.test`:

```
ENVIRONMENT=local
PORT=4000
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_PUBLISHABLE_DEFAULT_KEY=<your-key>
ALLOWED_ORIGIN=http://localhost:3000
```

## Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start dev server with watch mode |
| `bun run build` | Bundle for production |
| `bun run start` | Run production bundle |
| `bun run check` | TypeScript type checking |
| `bun run lint` | Lint with Biome |
| `bun run lint:fix` | Lint and auto-fix |
| `bun run format` | Format with Biome |
| `bun run test:unit` | Run unit tests |
| `bun run test:int` | Run integration tests |
| `bun run test:api` | Run API tests |

## Project structure

```
src/
  controllers/   Route handlers
  lib/           Infrastructure (env, Supabase client, async context)
  repositories/  Database access layer
  routes/        Express routers (versioned under v1/)
  schemas/       Zod schemas for validation
  services/      Business logic
  types/         TypeScript types inferred from schemas
  utils/         Shared helpers (errors, logger, response, validators)
  server.ts      App entrypoint
tests/
  unit/          Unit tests
  int/           Integration tests (requires Supabase)
  api/           API tests (requires running server)
```

## API

### Health check

```
GET /health
```

### Waitlist

```
POST /api/v1/waitlist
```

Join the waitlist. Accepts a JSON body with waitlist entry fields and returns a `waitlist_token`.
