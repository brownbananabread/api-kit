import type { Request } from 'express';
import { BadRequest, PayloadTooLarge, ValidationFailed } from '@/utils/errors';

const DEFAULT_LIMIT = 16_384;

export async function parseJsonBody(
  req: Request,
  limit = DEFAULT_LIMIT,
): Promise<unknown> {
  let size = 0;
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    size += (chunk as Buffer).length;
    if (size > limit) {
      throw new PayloadTooLarge(`Body exceeds ${limit} bytes`);
    }
    chunks.push(chunk as Buffer);
  }

  const raw = Buffer.concat(chunks).toString();

  if (!raw) {
    throw new BadRequest('Request body is required');
  }

  try {
    return JSON.parse(raw);
  } catch {
    throw new ValidationFailed('Invalid JSON body');
  }
}
