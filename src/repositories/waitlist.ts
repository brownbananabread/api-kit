import type { SupabaseClient } from '@supabase/supabase-js';
import { getLogger } from '@/lib/context';
import { waitlistSchema } from '@/schemas';
import type { JoinWaitlistRequestBody, Waitlist } from '@/types';
import { AppError } from '@/utils/errors';
import { validateSchema } from '@/utils/validators';

const TABLE = 'waitlist';

export class WaitlistRepository {
  constructor(private readonly database: SupabaseClient) {}

  async findTokenByEmail(email: string): Promise<string | null> {
    const log = getLogger();

    const { data, error } = await this.database
      .from(TABLE)
      .select('waitlist_token')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (error) {
      log.error('Failed to check email existence', { error });
      throw new AppError('Failed to check waitlist status');
    }

    return data?.waitlist_token ?? null;
  }

  async create(entry: JoinWaitlistRequestBody): Promise<Waitlist> {
    const log = getLogger();

    const { data, error } = await this.database
      .from(TABLE)
      .insert({ ...entry, email: entry.email.toLowerCase() })
      .select()
      .single();

    if (error) {
      log.error('Failed to create waitlist entry', { error });
      throw new AppError('Failed to create waitlist entry');
    }

    return validateSchema(waitlistSchema, data);
  }
}
