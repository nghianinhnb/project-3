import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import cookieSession from 'cookie-session';
// @ts-nocheck
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
const swaggerDocument = require('../swagger.json');
import { errorHandler } from './middlewares';


const app = express().disable('x-powered-by');

// Express Setting
// app.set('trust proxy', CONFIG.TRUST_PROXY);


// Common Middlewares
app.use(cors());
app.use('/resources', express.static(path.join(__dirname, '/public')));
app.use(express.json({ limit: '500kb' }));
app.use(express.urlencoded({ extended: true, limit: '500kb' }))
app.use(
    cookieSession({
      signed: false,
      secure: false,
    })
);

// Custom Middlewares
app.use("/api/v1", routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);


export default app;
