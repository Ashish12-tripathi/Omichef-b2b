import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import { errorHandler, notFound } from './middleware/error.js';

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await connectDB();

app.set('trust proxy', 1);

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin'
    },
    contentSecurityPolicy: false
  })
);

/*
 * CLIENT_URL supports one or multiple frontend origins.
 *
 * Example:
 * CLIENT_URL=http://localhost:5173,http://192.168.1.25:5173
 */
const configuredOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

/**
 * Allow localhost and private LAN IP addresses during development.
 */
function isDevelopmentNetworkOrigin(origin) {
  try {
    const parsedOrigin = new URL(origin);
    const { protocol, hostname } = parsedOrigin;

    if (protocol !== 'http:' && protocol !== 'https:') {
      return false;
    }

    return (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      /^10\./.test(hostname) ||
      /^192\.168\./.test(hostname) ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)
    );
  } catch {
    return false;
  }
}

const corsOptions = {
  origin(origin, callback) {
    /*
     * Requests without an Origin header can include health checks,
     * Postman requests and server-to-server requests.
     */
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/$/, '');

    const explicitlyAllowed =
      configuredOrigins.includes(normalizedOrigin);

    const allowedOnLocalNetwork =
      process.env.NODE_ENV !== 'production' &&
      isDevelopmentNetworkOrigin(normalizedOrigin);

    if (explicitlyAllowed || allowedOnLocalNetwork) {
      return callback(null, true);
    }

    return callback(
      new Error(`CORS blocked request from origin: ${origin}`)
    );
  },

  credentials: true,

  methods: [
    'GET',
    'HEAD',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS'
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ]
};

app.use(cors(corsOptions));

/*
 * Handle browser preflight requests.
 */
app.options('*', cors(corsOptions));

app.use(
  express.json({
    limit: '2mb'
  })
);

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(
  morgan(
    process.env.NODE_ENV === 'production'
      ? 'combined'
      : 'dev'
  )
);

const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'omichef-b2b-api'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/inquiries', publicLimiter, inquiryRoutes);
app.use(
  '/api/appointments',
  publicLimiter,
  appointmentRoutes
);

if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(
    __dirname,
    '../client/dist'
  );

  app.use(express.static(clientDist));

  app.get('*', (req, res) => {
    res.sendFile(
      path.join(clientDist, 'index.html')
    );
  });
} else {
  app.use(notFound);
}

app.use(errorHandler);

/*
 * 0.0.0.0 allows the backend to receive network requests.
 */
app.listen(port, '0.0.0.0', () => {
  console.log(
    `OmiChef B2B server running on http://0.0.0.0:${port}`
  );
});