import express from 'express';
import { env } from '@/lib/env';
import { Logger } from '@/lib/logger';
import { allowedMethods } from '@/middlewares/allowed-methods';
import { contentType } from '@/middlewares/content-type';
import { cors } from '@/middlewares/cors';
import { headers } from '@/middlewares/headers';
import { requestId } from '@/middlewares/request-id';
import waitlistRouter from '@/routes/waitlist';
import { MethodNotAllowed, ResourceNotFound } from '@/utils/errors';
import { ApiResponse } from '@/utils/response';

const app = express();
const logger = new Logger('Server');
const response = new ApiResponse();

app.use(allowedMethods);
app.use(requestId);
app.use(cors);
app.use(headers);
app.use(contentType);

app.get('/health', (_req, res) => {
  response.sendSuccess(res, { status: 'healthy' });
});
app.all('/health', (_req, res) => {
  response.sendError(
    res,
    new MethodNotAllowed('HTTP method not allowed for this endpoint'),
  );
});

app.use('/api', waitlistRouter);

app.all('/{*path}', (_req, res) => {
  response.sendError(res, new ResourceNotFound('Endpoint not found'));
});

app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    logger.logUnhandledError(err);
    response.sendError(res, err);
  },
);

const server = app.listen(env.PORT, () => {
  logger.info(`Listening on port ${env.PORT}`);
});

process.on('SIGTERM', () => server.close());

export default app;
