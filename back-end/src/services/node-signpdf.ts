import fs from 'fs';
import {join} from 'path';
import { Readable } from 'stream';
import { promises as asyncFS } from "fs";
// @ts-ignore
import signer from 'node-signpdf';

import constants from '../shared/constants';


const p12Buffer = Buffer.from(fs.readFileSync(constants.CERTIFICATE_PATH))


/**
 * It takes a PDF file name and a PDF buffer, signs the PDF buffer, and then writes the signed PDF
 * buffer to a file.
 * @returns The path to the signed PDF file.
 */
export function signPDFBuffer({pdfFileName, pdfBuffer}: {pdfFileName: string, pdfBuffer: Buffer})  {
    const signedPdfBuffer = signer.sign(pdfBuffer, p12Buffer);

    const pdfPath = join(constants.PDF_STORAGE_PATH, pdfFileName);

    Readable.from(signedPdfBuffer).pipe(fs.createWriteStream(pdfPath));

    return pdfPath;
}
