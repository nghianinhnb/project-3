import express from 'express';

import { pdfControllers } from './pdf.controller';
import { pdfValidator } from './pdf.validator';

const router = express.Router();


router.post('/pdf/gen',
    pdfValidator.gen,
    pdfControllers.gen,
);


export { router as pdfRouter };
