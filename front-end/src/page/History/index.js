import React, { useState } from 'react';
import * as xlsx from 'xlsx';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { historyQuery } from '../../api/historyQuery';


function History() {
    const [page, setPage] = useState(0);
    const {data} = historyQuery.useHistory({page})

    return (
        <div className="container px-30 py-15">
            <div className='bg-white rounded-3 shadow px-30 py-3'>
                <div className='d-flex flex-row justify-content-between align-items-center mb-10'>
                    <h2>Lịch sử</h2>
                    <p onClick={() => downloadHistoryPage(data?.history)}>Tải report</p>
                </div>

                <div className='row'>
                    <div className='col-6'>Tên chứng chỉ</div>
                    <div className='col-3'>Ngày tạo</div>
                    <div className='col-3' align='center'>Đẩy lên blockchain</div>
                </div>

                {data?.history?.map(({id, title, createdAt, isPublished}) => (
                    <div className='py-2' key={id}>
                        <div className='row'>
                            <div className='col-6'>
                                <a href={process.env.REACT_APP_RESOURCES_BASE + `/pdf/${title}`}
                                    download
                                >
                                    {title}
                                </a>
                            </div>
                            <div className='col-3'>{dayjs(createdAt).format('DD/MM/YYYY HH:MM:ss')}</div>
                            <div className='col-3'>{isPublished}</div>
                        </div>
                    </div>
                ))}

                <div className='d-flex flex-row justify-content-between mt-4'>
                    <button onClick={() => setPage((prevPage) => prevPage-1)} disabled={page===0}>
                        Mới hơn
                    </button>
                    <button onClick={() => setPage((prevPage) => prevPage+1)} disabled={!data?.hasNextPage}>
                        Cũ hơn
                    </button>
                </div>
            </div>
        </div>
    )
}

export default History;


// --------------------------------------------------


function downloadHistoryPage(history) {
    if (!history) return;

    const workbook = xlsx.utils.book_new();

    const table = [['Tên chứng chỉ', 'Thời gian tạo', 'Link tải']]
        .concat(history?.map(({title, createdAt}) => 
            [title, dayjs(createdAt).format('DD/MM/YYYY HH:MM:ss'), process.env.REACT_APP_RESOURCES_BASE + `/pdf/${title}`]
        ))

    const worksheet = xlsx.utils.aoa_to_sheet(table);

    xlsx.utils.book_append_sheet(workbook, worksheet);

    xlsx.writeFileXLSX(workbook, "Danh sách chứng chỉ.xlsx");
}