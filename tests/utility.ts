export const SUPABASE_URL = 'http://127.0.0.1:54321';
export const SUPABASE_KEY = 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH';
export const LOG_ALL_RESPONSES = false;

const BASE_URL = 'http://localhost:4000';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function sendRequest(method: Method, path: string, body?: unknown, headers?: Record<string, string>) {
  return fetch(`${BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

export function assertResponse(res: Response, body: unknown, fn: () => void) {
  const dump = () => console.log(`Response: ${res.status}`, JSON.stringify(body, null, 2));
  if (LOG_ALL_RESPONSES) dump();
  try {
    fn();
  } catch (e) {
    if (!LOG_ALL_RESPONSES) dump();
    throw e;
  }
}

export async function ensureDevServer() {
  try {
    await fetch(`${BASE_URL}/api/health`);
  } catch {
    console.error(`\n  Dev server is not reachable at ${BASE_URL}. Run "bun run dev" before running API tests.\n`);
    process.exit(1);
  }
}

export async function ensureSupabase(client: import('@supabase/supabase-js').SupabaseClient) {
  const { error } = await client.from('waitlist').select('id').limit(1);
  if (error) {
    console.error('\n  Supabase is not reachable. Make sure it is running before running integration tests.\n');
    process.exit(1);
  }
}
