import { AppError } from '@/utils/errors';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const levels: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const environmentDefaults: Record<string, LogLevel> = {
  local: 'debug',
  development: 'debug',
  production: 'info',
};

function resolveLevel(): LogLevel {
  const environment = process.env.ENVIRONMENT;
  if (environment && environment in environmentDefaults)
    return environmentDefaults[environment];

  return 'info';
}

let cachedLevel: LogLevel | undefined;

function getLevel(): LogLevel {
  if (cachedLevel === undefined) cachedLevel = resolveLevel();
  return cachedLevel;
}

export class Logger {
  private readonly level: LogLevel;
  private readonly prefix: string;
  private context: Record<string, unknown>;

  constructor(prefix: string, context: Record<string, unknown> = {}) {
    this.prefix = prefix;
    this.level = getLevel();
    this.context = context;
  }

  logUnhandledError(err: unknown): void {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;

    if (err instanceof AppError) return;

    this.error('Unhandled error', { message, stack });
  }

  child(context: Record<string, unknown>): Logger {
    return new Logger(this.prefix, {
      ...this.context,
      ...context,
    });
  }

  addContext(context: Record<string, unknown>): void {
    this.context = { ...this.context, ...context };
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    this.log('debug', message, meta);
  }

  info(message: string, meta?: Record<string, unknown>): void {
    this.log('info', message, meta);
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    this.log('warn', message, meta);
  }

  error(message: string, meta?: Record<string, unknown>): void {
    this.log('error', message, meta);
  }

  private log(
    level: LogLevel,
    message: string,
    meta?: Record<string, unknown>,
  ): void {
    if (levels[level] < levels[this.level]) return;

    const timestamp = new Date().toISOString();
    const label = level.toUpperCase();
    const tag = ` [${this.prefix}]`;

    const merged = { ...this.context, ...meta };
    let ctx = '';
    if (Object.keys(merged).length > 0) {
      try {
        ctx = ` ${JSON.stringify(merged)}`;
      } catch {
        ctx = ' [unserializable context]';
      }
    }

    const fn =
      level === 'error'
        ? console.error
        : level === 'warn'
          ? console.warn
          : level === 'debug'
            ? console.debug
            : console.log;

    fn(`${timestamp} ${label}${tag}${ctx} ${message}`);
  }
}
