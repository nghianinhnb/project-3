import express from 'express';

import { pdfControllers } from './pdf.controller';
import { pdfValidator } from './pdf.validator';

const router = express.Router();


router.post('/pdf/gen',
    pdfValidator.gen,
    pdfControllers.gen,
);

router.get('/pdf/upload-to-ipfs/:certId',
    pdfControllers.upBlock,
);


export { router as pdfRouter };
