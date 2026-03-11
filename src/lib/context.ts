import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';
import type { Request } from 'express';
import type { Logger } from '@/lib/logger';

const requestContext = new AsyncLocalStorage<Logger>();

export function createRequestLogger(
  logger: Logger,
  request: Request,
  requestId?: string,
): Logger {
  return logger.child({
    requestId:
      requestId ?? (request.headers['request-id'] as string) ?? randomUUID(),
    ipAddress: request.ip ?? 'unknown',
    userAgent: request.headers['user-agent'],
  });
}

export function runWithLogger<T>(logger: Logger, fn: () => T): T {
  return requestContext.run(logger, fn);
}

export function getLogger(): Logger {
  const logger = requestContext.getStore();
  if (!logger) {
    throw new Error(
      'No request context available. Wrap the call in runWithLogger().',
    );
  }
  return logger;
}
