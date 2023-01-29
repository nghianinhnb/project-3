import {join} from 'path';
import PDFDocument from 'pdfkit';
const { SUBFILTER_ETSI_CADES_DETACHED, pdfkitAddPlaceholder } = require('node-signpdf');

import constants from '../shared/constants';


export const createCertificate = (certificatedName: string): Promise<Buffer> =>  new Promise((resolve) => {
    /* Creating a new PDFDocument object. */
    const pdf = new PDFDocument({
        size: 'A4',
        layout: 'landscape',
    });

    pdf.initForm()

    /* Writing the pdf to the file system. */
    // pdf.pipe(fs.createWriteStream(pdfPath));

    /* Adding background to the pdf. */
    pdf.image(join(constants.IMAGE_STORAGE_PATH, 'cert-background.png'),
        0, 0, 
        {width: pdf.page.width, height: pdf.page.height}
    );

    // Add signature image
    pdf.image(join(constants.IMAGE_STORAGE_PATH, 'signature.png'),
        pdf.page.width - 350, pdf.page.height - 170, 
        {width: 200}
    );

    /* Adding text to the pdf. */
    pdf
        // .font('fonts/PalatinoBold.ttf')
        .fontSize(25)
        .text(`To: ${certificatedName}`, 300, (pdf.page.height + 25) / 2);

    // Externally (to PDFKit) add the signature placeholder.
    const refs = pdfkitAddPlaceholder({
        pdf,
        // @ts-ignore
        pdfBuffer: Buffer.from([pdf]),
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
