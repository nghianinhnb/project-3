import express from 'express';

import { requireAuth } from '../../middlewares';
import { pdfControllers } from './pdf.controller';
import { pdfValidator } from './pdf.validator';

const router = express.Router();


router.post('/pdf/gen',
    // requireAuth,
    pdfValidator.gen,
    pdfControllers.gen,
);


export { router as pdfRouter };
