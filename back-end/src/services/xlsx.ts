import xlsx from "xlsx";
import dayjs from "dayjs";


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


export function exportReport(certificates: Array<any>) {
    const workbook = xlsx.utils.book_new();

    const table = [['Tên chứng chỉ', 'Thời gian tạo', 'Link tải']]
        .concat(certificates.map(({title, createdAt}) => 
            [title, dayjs(createdAt).format('DD/MM/YYYY HH:MM:ss'), `http://localhost:8000/resources/pdf/${title}`]
        ))

    const worksheet = xlsx.utils.aoa_to_sheet(table);

    xlsx.utils.book_append_sheet(workbook, worksheet);

    const buffer: Buffer = xlsx.write(workbook, {bookType:'xlsx', type: 'buffer'});

    return buffer;
}