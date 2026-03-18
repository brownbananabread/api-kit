import { describe, expect, test } from 'bun:test';
import { z } from 'zod';
import { AppError, ValidationFailed } from '@/utils/errors';
import { validateRequest, formatResponse } from '@/utils/validators';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

describe('validateRequest', () => {
  test('returns parsed data on valid input', () => {
    const result = validateRequest(schema, { email: 'test@example.com', name: 'Test' });

    expect(result).toEqual({ email: 'test@example.com', name: 'Test' });
  });

  test('throws ValidationFailed on invalid input', () => {
    expect(() => validateRequest(schema, { email: 'bad', name: '' })).toThrow(ValidationFailed);
  });

  test('includes field-level details on validation error', () => {
    try {
      validateRequest(schema, { email: 'bad' });
    } catch (err) {
      expect(err).toBeInstanceOf(ValidationFailed);
      const details = (err as ValidationFailed).details as { field?: string; message: string }[];
      expect(details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'email', message: expect.any(String) }),
        ]),
      );
    }
  });

  test('throws ValidationFailed on completely wrong type', () => {
    expect(() => validateRequest(schema, 'not an object')).toThrow(ValidationFailed);
  });
});


describe('formatResponse', () => {
  test('returns parsed data on valid input', () => {
    const result = formatResponse(schema, { email: 'test@example.com', name: 'Test' });

    expect(result).toEqual({ email: 'test@example.com', name: 'Test' });
  });

  test('throws AppError on invalid data', () => {
    expect(() => formatResponse(schema, { email: 'bad' })).toThrow(AppError);
  });

  test('does not throw ValidationFailed', () => {
    try {
      formatResponse(schema, { email: 'bad' });
    } catch (err) {
      expect(err).not.toBeInstanceOf(ValidationFailed);
      expect(err).toBeInstanceOf(AppError);
    }
  });
});
