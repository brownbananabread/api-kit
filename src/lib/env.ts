import { z } from 'zod/v4';

const schema = z.object({
  ENVIRONMENT: z.enum(['local', 'development', 'production']),
  PORT: z.coerce.number().default(4000),
  SUPABASE_URL: z.url(),
  SUPABASE_PUBLISHABLE_DEFAULT_KEY: z.string().min(1),
  ALLOWED_ORIGIN: z.url(),
});

export const env = schema.parse(process.env);

export const isLocal = env.ENVIRONMENT === 'local';
