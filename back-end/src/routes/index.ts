import express, { Request, Response } from 'express';

import { userRouter } from './user/user.route';
import { pdfRouter } from './pdf/pdf.route';
import { historyRouter } from './history/history.route';


const routes = express.Router();

// Api router
routes.use(userRouter);

routes.use(pdfRouter);

routes.use(historyRouter);


export default routes;