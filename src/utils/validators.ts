import type { z } from 'zod';
import { AppError, ValidationFailed } from '@/utils/errors';

export function validateRequest<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      ...(issue.path.length > 0 && { field: issue.path.join('.') }),
      message: issue.message,
    }));

    throw new ValidationFailed('One or more fields are invalid', details);
  }

  return result.data;
}

export function formatResponse<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new AppError('Response failed schema validation');
  }

  return result.data;
}
