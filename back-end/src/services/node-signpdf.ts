import fs from 'fs';
// @ts-ignore
import signer from 'node-signpdf';

import constants from '../shared/constants';


export function signPDFBuffer(pdfBuffer: Buffer)  {
    const p12Buffer = fs.readFileSync(constants.CERTIFICATE_PATH);
    return signer.sign(pdfBuffer, p12Buffer);
}
