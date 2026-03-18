export interface ErrorDetails {
  field?: string;
  message: string;
}

export class AppError extends Error {
  readonly code: string = 'InternalError';
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
  readonly code = 'BadRequest';
  readonly status = 400;
  constructor(message = 'Bad request', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class ValidationFailed extends AppError {
  readonly code = 'ValidationFailed';
  readonly status = 422;
  constructor(message = 'Validation failed', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class ResourceNotFound extends AppError {
  readonly code = 'ResourceNotFound';
  readonly status = 404;
  constructor(message = 'Resource not found', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class Unauthorized extends AppError {
  readonly code = 'Unauthorized';
  readonly status = 401;
  constructor(message = 'Unauthorized', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class Forbidden extends AppError {
  readonly code = 'Forbidden';
  readonly status = 403;
  constructor(message = 'Forbidden', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class Conflict extends AppError {
  readonly code = 'Conflict';
  readonly status = 409;
  constructor(message = 'Conflict', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class PayloadTooLarge extends AppError {
  readonly code = 'PayloadTooLarge';
  readonly status = 413;
  constructor(message = 'Payload too large', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class MethodNotAllowed extends AppError {
  readonly code = 'MethodNotAllowed';
  readonly status = 405;
  constructor(message = 'Method not allowed', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class UnsupportedMediaType extends AppError {
  readonly code = 'UnsupportedMediaType';
  readonly status = 415;
  constructor(message = 'Unsupported media type', details?: ErrorDetails[]) {
    super(message, details);
  }
}

export class DatabaseError extends AppError {
  readonly code = 'DatabaseError';
  readonly status = 500;
  constructor(message = 'A database error occurred', details?: ErrorDetails[]) {
    super(message, details);
  }
}
