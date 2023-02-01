import * as Yup from 'yup';
import { useFormik } from "formik";
import { Link } from 'react-router-dom';

import { pdfApi } from '../../api/pdfApi';
import Input from '../../shared/components/Input';


function Main() {
    const formik = useFormik({
        initialValues: {
            file: '',
        },
        async onSubmit(values) {
            await pdfApi.gen(values)
            alert('Tạo chứng chỉ thành công')
        },
    });


    return (
        <div className="OrderSignIn container px-30 py-15">
            <div className='bg-white rounded-3 shadow px-30 py-3'>
                <div className='d-flex flex-row justify-content-between align-items-center mb-10'>
                    <h2>Tạo chứng chỉ</h2>
                    <a href={process.env.REACT_APP_RESOURCES_BASE + `/template.xlsx`} download>
                        Tải mẫu import
                    </a>
                </div>

                <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-5'>
                    <p className='Content_13B text-uppercase'>Tải lên file import theo template</p>
                    <input formik={formik} type='file' name='file' id='file'
                        onChange={(event) => formik.setFieldValue("file", event.currentTarget.files[0])}
                    />
                    <button className="border-0 rounded-3 px-10 py-3 w-25 align-self-center" type="submit">
                        <p className="H3-16B text-capitalize">Tạo</p>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Main;
