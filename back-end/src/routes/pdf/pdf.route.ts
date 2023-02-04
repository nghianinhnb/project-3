import express from 'express';

import { requireAuth } from '../../middlewares';
import { pdfControllers } from './pdf.controller';
import { pdfValidator } from './pdf.validator';

const router = express.Router();


router.post('/pdf/gen',
    requireAuth,
    pdfValidator.gen,
    pdfControllers.gen,
);

router.get('/pdf/upload-to-ipfs/:certId',
    requireAuth,
    pdfControllers.upBlock,
);


export { router as pdfRouter };
