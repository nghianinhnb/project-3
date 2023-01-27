import fs from 'fs';
import {join} from 'path';
import { Readable } from 'stream';
import { promises as asyncFS } from "fs";
// @ts-ignore
import signer from 'node-signpdf';

import constants from '../shared/constants';


/**
 * It takes a PDF file name and a PDF buffer, signs the PDF buffer, and then writes the signed PDF
 * buffer to a file.
 * @returns The path to the signed PDF file.
 */
export async function signPDFBuffer({pdfFileName, pdfBuffer}: {pdfFileName: string, pdfBuffer: Buffer})  {
    const p12Buffer = await asyncFS.readFile(constants.CERTIFICATE_PATH).then(Buffer.from);
    const signedPdfBuffer = signer.sign(pdfBuffer, p12Buffer);

    const pdfPath = join(constants.PDF_STORAGE_PATH, pdfFileName);
    // fs.rmSync(pdfPath, (err) => {});

    Readable.from(signedPdfBuffer).pipe(fs.createWriteStream(pdfPath));
    return pdfPath;
}
