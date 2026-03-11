import type { z } from 'zod';
import { ValidationFailed } from '@/utils/errors';

export function validateSchema<T>(schema: z.ZodType<T>, data: unknown): T {
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
