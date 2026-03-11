import type { RequestHandler } from 'express';
import { env } from '@/lib/env';
import { Forbidden } from '@/utils/errors';

export const cors: RequestHandler = (req, _res, next) => {
  const origin = req.headers.origin ?? '';
  if (req.method !== 'OPTIONS' && origin && origin !== env.ALLOWED_ORIGIN) {
    throw new Forbidden('Origin not allowed');
  }

  next();
};
