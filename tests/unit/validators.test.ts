import { describe, expect, test } from 'bun:test';
import { z } from 'zod';
import { ValidationFailed } from '@/utils/errors';
import { validateSchema } from '@/utils/validators';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

describe('validateSchema', () => {
  test('returns parsed data on valid input', () => {
    const result = validateSchema(schema, { email: 'test@example.com', name: 'Test' });

    expect(result).toEqual({ email: 'test@example.com', name: 'Test' });
  });

  test('throws ValidationFailed on invalid input', () => {
    expect(() => validateSchema(schema, { email: 'bad', name: '' })).toThrow(ValidationFailed);
  });

  test('includes field-level details on validation error', () => {
    try {
      validateSchema(schema, { email: 'bad' });
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
    expect(() => validateSchema(schema, 'not an object')).toThrow(ValidationFailed);
  });
});
