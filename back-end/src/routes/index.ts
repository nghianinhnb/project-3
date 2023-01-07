import express, { Request, Response } from 'express';

import { userRouter } from './user/user.route';
import { pdfRouter } from './pdf/pdf.route';


const routes = express.Router();

// Api router
routes.use(userRouter);

routes.use(pdfRouter);


export default routes;