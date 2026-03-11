import type { RequestHandler } from 'express';
import { MethodNotAllowed } from '@/utils/errors';
import { ApiResponse } from '@/utils/response';

const ALLOWED_METHODS = new Set([
  'OPTIONS',
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
]);
const response = new ApiResponse();

export const allowedMethods: RequestHandler = (req, res, next) => {
  if (!ALLOWED_METHODS.has(req.method)) {
    return response.sendError(res, new MethodNotAllowed());
  }
  next();
};
