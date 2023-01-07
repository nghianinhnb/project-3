import { Readable } from 'stream';
import { Request, Response } from 'express';

import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from '../../errors';

import { createCertificate } from '../../services/pdfkit';
import { signPDFBuffer } from '../../services/node-signpdf';
import { requireAuth, checkAdmin } from '../../middlewares';


export const pdfControllers = {
    gen: async (req: Request, res: Response) => {
        const pdfBuffer = await createCertificate('test.pdf', 'Nghia')

        const stream = Readable.from(pdfBuffer);
        
        stream.pipe(res)
    },
}
