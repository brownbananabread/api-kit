import { randomUUID } from 'node:crypto';
import type { RequestHandler } from 'express';

export const requestId: RequestHandler = (req, res, next) => {
  const id = (req.headers['request-id'] as string) ?? randomUUID();
  res.setHeader('Request-Id', id);
  next();
};
