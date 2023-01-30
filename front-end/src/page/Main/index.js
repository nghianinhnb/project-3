import * as Yup from 'yup';
import { useFormik } from "formik";
import { Link } from 'react-router-dom';

import { pdfApi } from '../../api/pdfApi';
import Input from '../../shared/components/Input';


function Main() {
    const formik = useFormik({
        initialValues: {
            batchName: '',
            certificatedName: '',
        },
        validationSchema: Yup.object({
            batchName: Yup.string().required('Bắt buộc'),
            certificatedName: Yup.string().required('Bắt buộc'),
        }),
        async onSubmit(values) {
            await pdfApi.gen({body: values})
            alert('Tạo chứng chỉ thành công')
        },
    });


    return (
        <div className="OrderSignIn container px-30 py-15">
            <div className='bg-white rounded-3 shadow px-30 py-3'>
                <div className='d-flex flex-row justify-content-between align-items-center mb-10'>
                    <h2>Tạo chứng chỉ</h2>
                    <Link to='/history'>Lịch sử</Link>
                </div>

                <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-5'>
                    <Input formik={formik} type='text' placeholder='Tên chứng chỉ' name='batchName' id='batchName'/>
                    <Input formik={formik} type='text' placeholder='Tên người được chứng nhận' name='certificatedName' id='certificatedName'/>
                    <button className="border-0 rounded-3 px-10 py-3 w-25 align-self-center" type="submit">
                        <p className="H3-16B text-capitalize">Tạo</p>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Main;
