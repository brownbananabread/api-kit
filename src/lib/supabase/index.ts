import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';
import type { Database } from '@/lib/supabase/types';

export const supabase = createClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);

export function createSupabaseClient(url: string, key: string) {
  return createClient<Database>(url, key);
}
