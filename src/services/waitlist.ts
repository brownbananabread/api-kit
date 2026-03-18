import { getLogger } from '@/lib/context';
import type { WaitlistRepository } from '@/repositories/waitlist';
import type { JoinWaitlistInput, Waitlist } from '@/types';
import { Conflict } from '@/utils/errors';

export class WaitlistService {
  constructor(private readonly waitlist: WaitlistRepository) {}

  async addToWaitlist(entry: JoinWaitlistInput): Promise<Waitlist> {
    const log = getLogger();

    log.debug('Querying the database for existing email', {
      email: entry.email,
    });
    const existingToken = await this.waitlist.findTokenByEmail(entry.email);
    if (existingToken) {
      log.info('Email already on waitlist', {
        waitlist_token: existingToken,
      });
      throw new Conflict('This email is already on the waitlist');
    }

    log.debug('Creating waitlist entry');
    const data = await this.waitlist.create(entry);
    log.info('Waitlist entry created', {
      waitlist_token: data.waitlist_token,
    });

    return data;
  }
}
