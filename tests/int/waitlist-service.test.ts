import { describe, expect, test, afterAll, beforeAll } from 'bun:test';
import { Logger } from '@/lib/logger';
import { runWithLogger } from '@/lib/context';
import { createSupabaseClient } from '@/lib/supabase';
import { WaitlistRepository } from '@/repositories/waitlist';
import { WaitlistService } from '@/services/waitlist';
import { Conflict } from '@/utils/errors';
import { SUPABASE_KEY, SUPABASE_URL, ensureSupabase } from '../utility';

const log = new Logger('Test:WaitlistService');
const db = createSupabaseClient(SUPABASE_URL, SUPABASE_KEY);
const repository = new WaitlistRepository(db);
const service = new WaitlistService(repository);

const testEmail = `integration-${Date.now()}@test.com`;

beforeAll(() => ensureSupabase(db));

afterAll(async () => {
  await db.from('waitlist').delete().eq('email', testEmail);
});

describe('WaitlistService.addToWaitlist', () => {
  test('creates entry and returns waitlist_token', async () => {
    const result = await runWithLogger(log, () =>
      service.addToWaitlist({
        feature: 'All Of The Above',
        goals: ['Streamline & Automate Compliance Processes'],
        operating_time: '1-3 Years',
        first_name: 'Integration',
        last_name: 'Test',
        email: testEmail,
        company_name: 'Test Co',
        country_code: '+1',
        mobile: '123456789',
        notes: null,
      }),
    );

    expect(result.waitlist_token).toBeDefined();
    expect(typeof result.waitlist_token).toBe('string');
  });

  test('throws Conflict on duplicate email', async () => {
    expect(
      runWithLogger(log, () =>
        service.addToWaitlist({
          feature: 'All Of The Above',
          goals: ['Streamline & Automate Compliance Processes'],
          operating_time: '1-3 Years',
          first_name: 'Duplicate',
          last_name: 'Test',
          email: testEmail,
          company_name: 'Test Co',
          country_code: '+1',
          mobile: '123456789',
          notes: null,
        }),
      ),
    ).rejects.toBeInstanceOf(Conflict);
  });
});
