import React, { useState } from 'react';
import dayjs from 'dayjs';
import * as xlsx from 'xlsx';

import { historyQuery } from '../../api/historyQuery';


function History() {
    const [page, setPage] = useState(0);
    const {data} = historyQuery.useHistory({page})
    const {mutate, isLoading} = historyQuery.usePublishMutation()

    return (
        <div className="container pt-15">
            <div className='bg-white rounded-3 shadow px-10 py-3'>
                <div className='d-flex flex-row justify-content-between align-items-end mb-10'>
                    <h2>Lịch sử</h2>
                    <p className='text-primary'
                        style={{cursor: 'pointer'}}
                        onClick={() => downloadHistoryPage(data?.history)}
                    >
                        Tải report
                    </p>
                </div>

                <div className='row'>
                    <div className='col-5'>Tên chứng chỉ</div>
                    <div className='col-2'>Ngày tạo</div>
                    <div className='col-5' align='center'>Đẩy lên blockchain</div>
                </div>

                {data?.history?.map(({id, title, createdAt, isPublished}) => (
                    <div className='py-2' key={id}>
                        <div className='row'>
                            <div className='col-5'>
                                <a href={process.env.REACT_APP_RESOURCES_BASE + `/pdf/${title}`}
                                    download
                                >
                                    {title}
                                </a>
                            </div>
                            <div className='col-2'>{dayjs(createdAt).format('DD/MM/YYYY HH:MM:ss')}</div>
                            <div className='col-5' align='center'>
                                {
                                isPublished
                                ? isPublished
                                : isLoading 
                                ? <p>Một tệp đang tải lên...</p>
                                : (
                                    <p className='text-primary'
                                            style={{cursor: 'pointer'}}
                                            onClick={() => mutate(id)}
                                    >
                                        Tải lên
                                    </p>
                                )
                                }
                            </div>
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

    const table = [['Tên chứng chỉ', 'Thời gian tạo', 'Link tải', "IPFS uri"]]
        .concat(history?.map(({title, createdAt, isPublished}) => 
            [
                title,
                dayjs(createdAt).format('DD/MM/YYYY HH:MM:ss'),
                process.env.REACT_APP_RESOURCES_BASE + `/pdf/${title}`,
                isPublished || 'Chưa đẩy lên blockchain',
            ]
        ))

    const worksheet = xlsx.utils.aoa_to_sheet(table);

    xlsx.utils.book_append_sheet(workbook, worksheet);

    xlsx.writeFileXLSX(workbook, "Danh sách chứng chỉ.xlsx");
}
