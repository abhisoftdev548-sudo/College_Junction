import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { env, allowedOrigins, isProd } from './config/env';
import api from './routes';
import { generalLimiter } from './middleware/rateLimit';
import { csrfHeaderCheck } from './middleware/csrf';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

export function createApp() {
  const app = express();

  if (env.TRUST_PROXY) app.set('trust proxy', 1);
  app.disable('x-powered-by');

  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

  // Cross-origin credentials (spec §1.1). Origin must match exactly; no wildcard with credentials.
  app.use(
    cors({
      origin(origin, cb) {
        if (!origin) return cb(null, true); // curl / server-to-server / same-origin
        if (allowedOrigins.includes(origin)) return cb(null, true);
        cb(new Error(`CORS: origin ${origin} not allowed`));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      exposedHeaders: ['RateLimit-Limit', 'RateLimit-Remaining', 'RateLimit-Reset'],
      maxAge: 600,
    }),
  );

  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: false, limit: '100kb' }));
  app.use(cookieParser());
  app.use(morgan(isProd ? 'combined' : 'dev'));

  app.use('/api', generalLimiter, csrfHeaderCheck, api);

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
