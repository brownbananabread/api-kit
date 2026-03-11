export interface ErrorDetails {
  field?: string;
  message: string;
}

export class AppError extends Error {
  readonly code: string = 'INTERNAL_ERROR';
  readonly status: number = 500;

  constructor(
    public override message: string = 'An unexpected error occurred',
    public details?: ErrorDetails[],
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BadRequest extends AppError {
  readonly code = 'BAD_REQUEST';
  readonly status = 400;
  constructor(message = 'Bad request', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class ValidationFailed extends AppError {
  readonly code = 'VALIDATION_FAILED';
  readonly status = 422;
  constructor(message = 'Validation failed', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class ResourceNotFound extends AppError {
  readonly code = 'RESOURCE_NOT_FOUND';
  readonly status = 404;
  constructor(message = 'Resource not found', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class Unauthorized extends AppError {
  readonly code = 'UNAUTHORIZED';
  readonly status = 401;
  constructor(message = 'Unauthorized', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class Forbidden extends AppError {
  readonly code = 'FORBIDDEN';
  readonly status = 403;
  constructor(message = 'Forbidden', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class Conflict extends AppError {
  readonly code = 'CONFLICT';
  readonly status = 409;
  constructor(message = 'Conflict', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class PayloadTooLarge extends AppError {
  readonly code = 'PAYLOAD_TOO_LARGE';
  readonly status = 413;
  constructor(message = 'Payload too large', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class MethodNotAllowed extends AppError {
  readonly code = 'METHOD_NOT_ALLOWED';
  readonly status = 405;
  constructor(message = 'Method not allowed', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class UnsupportedMediaType extends AppError {
  readonly code = 'UNSUPPORTED_MEDIA_TYPE';
  readonly status = 415;
  constructor(message = 'Unsupported media type', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class DatabaseError extends AppError {
  readonly code = 'DATABASE_ERROR';
  readonly status = 500;
  constructor(message = 'A database error occurred', details?: ErrorDetails[]) {
    super(message, details);
  }
}
