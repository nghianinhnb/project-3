import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import cookieSession from 'cookie-session';
import fileUpload from 'express-fileupload';
// @ts-nocheck
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
const swaggerDocument = require('../swagger.json');
import { errorHandler } from './middlewares';


const app = express().disable('x-powered-by');


// Common Middlewares
app.use(cors({origin: 'http://localhost:3000'}));
app.use('/resources', express.static(path.join(__dirname, '/public')));
app.use(fileUpload({limits: { fileSize: 50 * 1024 * 1024 }}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
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
