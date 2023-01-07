import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';

import routes from './routes';
import { errorHandler } from './middlewares';


const app = express().disable('x-powered-by');

// Express Setting
// app.set('trust proxy', CONFIG.TRUST_PROXY);


// Common Middlewares
app.use(cors());
app.use('/resources', express.static(path.join(__dirname, '/public')));
app.use(express.json({ limit: '500kb' }));
app.use(express.urlencoded({ extended: true, limit: '500kb' }))


// Custom Middlewares
app.use("/api/v1", routes);
app.use(errorHandler);


export default app;
