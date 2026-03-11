import { describe, expect, test, beforeAll, afterAll } from 'bun:test';
import { createSupabaseClient } from '@/lib/supabase';
import { SUPABASE_KEY, SUPABASE_URL, assertResponse, ensureDevServer, sendRequest } from '../utility';

const testEmail = `api-${Date.now()}@test.com`;

beforeAll(() => ensureDevServer());

afterAll(async () => {
  await createSupabaseClient(SUPABASE_URL, SUPABASE_KEY).from('waitlist').delete().eq('email', testEmail);
});

const validBody = {
  feature: 'All Of The Above',
  goals: ['Streamline & Automate Compliance Processes'],
  operating_time: '1-3 Years',
  first_name: 'API',
  last_name: 'Test',
  email: testEmail,
  company_name: 'Test Co',
  country_code: '+1',
  mobile: '123456789',
  notes: null,
};

describe('POST /api/v1/waitlist', () => {
  test('201 — creates waitlist entry', async () => {
    const res = await sendRequest('POST', '/api/v1/waitlist', validBody);
    const body = await res.json();

    assertResponse(res, body, () => {
      expect(res.status).toBe(201);
      expect(body).toEqual({
        data: {
          waitlist_token: expect.any(String),
        },
      });
    });
  });

  test('409 — duplicate email', async () => {
    const res = await sendRequest('POST', '/api/v1/waitlist', validBody);
    const body = await res.json();

    assertResponse(res, body, () => {
      expect(res.status).toBe(409);
      expect(body).toEqual({
        error: {
          code: 'CONFLICT',
          message: 'This email is already on the waitlist',
        },
      });
    });
  });

  test('422 — invalid body', async () => {
    const res = await sendRequest('POST', '/api/v1/waitlist', { email: 'bad' });
    const body = await res.json();

    assertResponse(res, body, () => {
      expect(res.status).toBe(422);
      expect(body).toEqual({
        error: {
          code: 'VALIDATION_FAILED',
          message: 'Invalid request body',
          details: expect.arrayContaining([
            expect.objectContaining({ message: expect.any(String) }),
          ]),
        },
      });
    });
  });
});
