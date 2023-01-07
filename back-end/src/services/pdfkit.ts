import fs from 'fs';
import {join} from 'path';
import PDFDocument from 'pdfkit';
const { SUBFILTER_ETSI_CADES_DETACHED, pdfkitAddPlaceholder } = require('node-signpdf');

import constants from '../shared/constants';


export const createCertificate = (fileName: string, name: string): Promise<Buffer> =>  new Promise((resolve) => {
    const pdfPath = join(constants.PDF_STORAGE_PATH, fileName);

    fs.rmSync(pdfPath);

    /* Creating a new PDFDocument object. */
    const pdf = new PDFDocument({
        size: 'A4',
        layout: 'landscape',
    });

    pdf.initForm()

    /* Writing the pdf to the file system. */
    pdf.pipe(fs.createWriteStream(pdfPath));

    /* Adding an image to the pdf. */
    pdf.image(join(constants.IMAGE_STORAGE_PATH, 'cert-background.png'),
        0, 0, 
        {width: pdf.page.width, height: pdf.page.height}
    );

    /* Adding text to the pdf. */
    pdf
        // .font('fonts/PalatinoBold.ttf')
        .fontSize(25)
        .text(`To: ${name}`, 100, 100, {
            underline: true,
        });

    // Externally (to PDFKit) add the signature placeholder.
    const refs = pdfkitAddPlaceholder({
        pdf,
        // @ts-ignore
        pdfBuffer: Buffer.from([pdf]),
        contactInfo: 'nghianinhnb@gmail.com',
        name: 'Ninh Van Nghia',
        location: 'VN',
        reason: 'Project 3 testing',
        subFilter: SUBFILTER_ETSI_CADES_DETACHED,
    });
    // Externally end the streams of the created objects.
    // PDFKit doesn't know much about them, so it won't .end() them.
    Object.keys(refs).forEach((key) => refs[key].end());

    const pdfChunks: any[] = [];
    pdf.on('data', (data) => {
        pdfChunks.push(data);
    });
    pdf.on('end', () => {
        resolve(Buffer.concat(pdfChunks));
    });

    pdf.end();
})
