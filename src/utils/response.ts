import type { Response } from 'express';
import { AppError } from '@/utils/errors';

export class ApiResponse {
  sendSuccess<T>(res: Response, data: T, status = 200) {
    return res.status(status).json(data);
  }

  sendCollection<T>(
    res: Response,
    data: T[],
    meta: { total: number; limit: number; page: number },
    status = 200,
  ) {
    return res.status(status).json({ data, meta });
  }

  sendError(res: Response, err: unknown) {
    const error = err instanceof AppError ? err : new AppError();
    return res.status(error.status).json({
      code: error.code,
      message: error.message,
      ...(error.details != null ? { details: error.details } : {}),
    });
  }
}
