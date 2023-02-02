import { Request, Response } from 'express';
import fs from 'fs';
import { join } from 'path';
import fileUpload from 'express-fileupload';

import { Certificate } from '../../models';
import { parseTemplate } from '../../services/xlsx';
import { genAndSignCert } from './pdf.service';
import { uploadToIpfs } from '../../services/ipfs';
import constants from '../../shared/constants';
import { NotFoundError } from '../../errors/http-errors/not-found';


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

        Certificate.insertMany(newllyGendedCertTitles);

        res.send({
            titles: newllyGendedCertTitles,
        })
    },

    upBlock: async (req: Request, res: Response) => {
        /*
        #swagger.tags = ['Pdf']
        #swagger.parameters['certId'] = {
            in: 'params',
            type: 'string',
            required: 'true',
        }
        */
        const cert = await Certificate.findOne({id: req.params.certId})

        if (!cert) throw new NotFoundError();

        if (!cert.isPublished) {
            const CID = await uploadToIpfs(join(constants.PDF_STORAGE_PATH, cert.title));

            Certificate.updateOne({id: req.params.certId}, {isPublished: CID})

            res.send({CID})
        }

        res.send({})
    }
}
