import { Request, Response } from 'express';
import fileUpload from 'express-fileupload';

import { Certificate } from '../../models'
import { parseTemplate } from '../../services/xlsx';
import { genAndSignCert } from './pdf.service';


export const pdfControllers = {
    gen: async (req: Request, res: Response) => {
        /*
        #swagger.tags = ['Pdf']
        #swagger.parameters['file'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
        }
        */

        const certificates = parseTemplate((req.files?.file as fileUpload.UploadedFile).data, {type: 'buffer'});

        const newllyGendedCertTitles = await Promise.all(certificates.map(async (cert) => ({title: await genAndSignCert(cert)})));

        Certificate.insertMany(newllyGendedCertTitles)

        res.send({
            titles: newllyGendedCertTitles,
        })
    },

    export:async (req: Request, res: Response) => {
        /*
        #swagger.tags = ['Pdf']
        #swagger.parameters['page'] = {
            in: 'query',
            type: 'number',
        }
        */
       
    }
}
