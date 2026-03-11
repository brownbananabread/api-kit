import type { RequestHandler } from 'express';
import { UnsupportedMediaType } from '@/utils/errors';

const BODY_METHODS = new Set(['POST', 'PUT', 'PATCH']);

export const contentType: RequestHandler = (req, _res, next) => {
  const hasBody =
    req.headers['transfer-encoding'] ||
    (req.headers['content-length'] && req.headers['content-length'] !== '0');
  if (BODY_METHODS.has(req.method) && hasBody && !req.is('application/json')) {
    throw new UnsupportedMediaType('Content-Type must be application/json');
  }

  next();
};
