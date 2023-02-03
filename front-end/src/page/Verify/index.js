import * as Yup from 'yup';
import { useFormik } from "formik";

import Input from '../../shared/components/Input';


function Verify() {
    const formik = useFormik({
        initialValues: {
            uri: '',
        },
        validationSchema: Yup.object({
            uri: Yup.string().required('Bắt buộc'),
        }),
        async onSubmit(values) {
            await verify(values.uri)
        },
    });


    return (
        <div className="OrderSignIn container px-30 py-15">
            <div className='bg-white rounded-3 shadow px-30 py-3'>
                <div className='d-flex flex-row justify-content-between align-items-center mb-10'>
                    <h2>Xác thực chứng chỉ</h2>
                </div>

                <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-5'>
                    <Input name='uri' id='uri' type='text' placeholder='Nhập ipfs uri của chứng chỉ để kiểm tra' formik={formik}/>
                    <button className="border-0 rounded-3 px-10 py-3 w-25 align-self-center" type="submit">
                        <p className="H3-16B text-capitalize">Kiểm tra</p>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Verify;


// --------------------------------------------------


async function verify(uri) {
    const url = 'https://gateway.ipfscdn.io/ipfs/' +  uri.split('//')[1]
    window.open(url)
}