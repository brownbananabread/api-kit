import type { SupabaseClient } from '@supabase/supabase-js';
import { getLogger } from '@/lib/context';
import type { JoinWaitlistInput, Waitlist } from '@/types';
import { DatabaseError } from '@/utils/errors';

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
      throw new DatabaseError('Failed to check waitlist status');
    }

    return data?.waitlist_token ?? null;
  }

  async create(entry: JoinWaitlistInput): Promise<Waitlist> {
    const log = getLogger();

    const { data, error } = await this.database
      .from(TABLE)
      .insert({ ...entry, email: entry.email.toLowerCase() })
      .select()
      .single();

    if (error) {
      log.error('Failed to create waitlist entry', { error });
      throw new DatabaseError('Failed to create waitlist entry');
    }

    return data as Waitlist;
  }
}
