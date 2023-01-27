import { Request, Response } from 'express';

import { Certificate } from '../../models'

import { createCertificate } from '../../services/pdfkit';
import { signPDFBuffer } from '../../services/node-signpdf';


export const pdfControllers = {
    gen: async (req: Request, res: Response) => {
        /*
        #swagger.tags = ['Pdfs']
        #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                $batchName: 'Project 3 Cert',
                $certificatedName: 'Ninh Van Nghia',
            }
        }
        */

        const {certificatedName, batchName} = req.body

        const pdfFileName = `${batchName} - ${certificatedName}.pdf`

        const pdfBuffer = await createCertificate(certificatedName)

        const pdfPath = await signPDFBuffer({pdfFileName, pdfBuffer})

        Certificate.create({
            title: pdfFileName,
            path: pdfPath,
            userId: req.user?.id,
        })

        res.send({
            title: pdfFileName,
            path: pdfPath,
        })
    },
}
