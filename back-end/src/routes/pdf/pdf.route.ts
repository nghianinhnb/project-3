import express from 'express';
import { pdfControllers } from './pdf.controller';

const router = express.Router();


router.get('/pdf/gen', pdfControllers.gen);


export { router as pdfRouter };
