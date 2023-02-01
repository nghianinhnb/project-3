import xlsx from "xlsx";


enum TEMPLATE_FIELD {
    certName = 'Tên chứng chỉ',
    studentName = 'Tên học viên',
}


export function parseTemplate(data: any, read_opts: xlsx.ParsingOptions | undefined) {
    const workbook = xlsx.read(data, read_opts);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const certifications = xlsx.utils.sheet_to_json(worksheet);
    return certifications.map((cert: any) => ({
        certName: cert[TEMPLATE_FIELD.certName],
        studentName: cert[TEMPLATE_FIELD.studentName],
    }))
}
