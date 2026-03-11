import type { RequestHandler } from 'express';
import { env } from '@/lib/env';

export const headers: RequestHandler = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', env.ALLOWED_ORIGIN);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Request-Id',
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Max-Age', '86400');
    res.status(204).end();
    return;
  }

  next();
};
