import cors from 'cors';
import express, { Express } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import { pino } from 'pino';

import { generateNonceRouter } from '@/api/generateNonce/generateNonceRouter';
import { getUserRouter } from '@/api/getUser/getUserRouter';
import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';
import { logoutRouter } from '@/api/logout/logoutRouter';
import { verifySignatureRouter } from '@/api/verifySignature/verifySignatureRouter';
import { openAPIRouter } from '@/api-docs/openAPIRouter';
import errorHandler from '@/common/middleware/errorHandler';
import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';
import { env } from '@/common/utils/envConfig';

import { getBalancesRouter } from './api/getBalances/getBalancesRouter';

const logger = pino({ name: 'server start' });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);
app.use(
  session({
    secret: 'jungle_is_massive',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// Request logging
app.use(requestLogger);

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/nonce', generateNonceRouter);
app.use('/user', getUserRouter);
app.use('/logout', logoutRouter);
app.use('/verify', verifySignatureRouter);
app.use('/balances', getBalancesRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
