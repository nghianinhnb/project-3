import { createCertificate } from '../../services/pdfkit';
import { signPDFBuffer } from '../../services/node-signpdf';


export async function genAndSignCert(certification: {certName: string, studentName: string}) {
    const pdfFileName = `${certification.certName} - ${certification.studentName}.pdf`

    const pdfBuffer = await createCertificate(certification.studentName)

    signPDFBuffer({pdfFileName, pdfBuffer})
    
    return pdfFileName
}
