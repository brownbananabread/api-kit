import type { Request, Response } from 'express';
import { createRequestLogger, runWithLogger } from '@/lib/context';
import { Logger } from '@/lib/logger';
import {
  joinWaitlistRequestBodySchema,
  joinWaitlistResponseSchema,
} from '@/schemas';
import type { WaitlistService } from '@/services/waitlist';
import { parseJsonBody } from '@/utils/body';
import { ApiResponse } from '@/utils/response';
import { validateSchema } from '@/utils/validators';

const log = new Logger('WaitlistController');
const response = new ApiResponse();

export class WaitlistController {
  constructor(private readonly service: WaitlistService) {}

  /**
   * POST /api/v1/waitlist (Adds a new entry to the waitlist)
   *
   * Validates the request body, checks for duplicate emails, and returns
   * a `waitlist_token` on success.
   *
   * @status 201 - Entry created
   * @status 409 - Email already on the waitlist
   * @status 422 - Validation failed
   */
  async joinWaitlist(req: Request, res: Response) {
    const logger = createRequestLogger(log, req);

    return runWithLogger(logger, async () => {
      try {
        const body = await parseJsonBody(req);
        const entry = validateSchema(joinWaitlistRequestBodySchema, body);
        const waitlist = await this.service.addToWaitlist(entry);
        const data = validateSchema(joinWaitlistResponseSchema, waitlist);

        return response.sendSuccess(res, data, 201);
      } catch (err) {
        logger.logUnhandledError(err);
        return response.sendError(res, err);
      }
    });
  }
}
