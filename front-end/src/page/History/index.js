import { Link } from 'react-router-dom';


function History() {
    // {data} = useCertHistory();
    const {data} = {data: []}
    return (
        <div className="container px-30 py-15">
            <div className='bg-white rounded-3 shadow px-30 py-3'>
                <div className='d-flex flex-row justify-content-between align-items-center mb-10'>
                    <h2>Lịch sử</h2>
                    <Link to='/home'>Tạo chứng chỉ</Link>
                </div>

                <div className='row'>
                    <div className='col-6'>Tên chứng chỉ</div>
                    <div className='col-4'>Ngày tạo</div>
                    <div className='col-2'>Đ</div>
                </div>

                {data?.map(item => (
                    <div className=''>
                        <div className='row'>
                            <div className='col-6'>Tên chứng chỉ</div>
                            <div className='col-4'>Ngày tạo</div>
                            <div className='col-2'>Đ</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default History;
