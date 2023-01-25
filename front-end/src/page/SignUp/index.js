import * as Yup from 'yup';
import { useFormik } from "formik";

import { accountApi } from '../../api/accountApi';

import './style.scss';
import { Link } from 'react-router-dom';


function SignUp({setShowSignIn}) {
    const formik = useFormik({
        initialValues: {
            email: '',
            fullname: '',
            phone: '',
            password: '',
            rePassword: '',
            acceptTerms: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Bắt buộc').email('Email Not Valid'),
            phone: Yup.number().optional(),
            password: Yup.string().required('Bắt buộc').min(6, 'Password Min Length 6').matches(/^\S*$/, 'Mật khẩu không được chứa khoảng trắng'),
            rePassword: Yup.string().required('Bắt buộc').oneOf([Yup.ref('password')], 'Nhập lại không khớp'),
            acceptTerms: Yup.boolean().test('isTrue', 'Accept Terms Required', (value) => value === true)
        }),
        async onSubmit(values) {
            accountApi.signup({body: values});
        },
    });
    return (
        <div className="OrderSignUp container px-30 py-15">
            <div className='bg-white rounded-4 shadow'>
                <div className="d-flex flex-row justify-content-between px-6 py-3">
                    <p className="H3-16B">Thông tin tài khoản</p>
                    <Link to='/sign-in'>Đã có tài khoản ?</Link>
                </div>
                <div className="d-flex flex-column px-6 gap-3">
                    <Form formik={formik}/>
                </div>
            </div>
        </div>
    )
}


export default SignUp;


// ------------------------------------------------------


function Form({formik}) {
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = formik;
    return (
        <form onSubmit={handleSubmit} className='d-flex flex-column'>
            <p className="Content_13B py-1">Email</p>
            <div className="TextField border rounded px-3 py-2">
                <input
                    className="Content_13 w-100 border-0 bg-transparent"
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    autoComplete='true'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                />
            </div>
            {touched.email && errors.email && <span className="InputError">&nbsp;&nbsp;{errors.email}</span>}

            <div className="Field rounded p-3 mt-4">
                <p className="Mini_content_12 mb-2">Đăng ký tài khoản để sử dụng</p>
                <Input formik={formik} name='fullname' type='text' placeholder='Họ và Tên' autoComplete={'true'}/>
                <Input formik={formik} name='phone' type='text' placeholder='Điện thoại' autoComplete={'true'}/>
                <Input formik={formik} name='password' type='password' placeholder='Mật khẩu' autoComplete={'new-password'}/>
                <Input formik={formik} name='rePassword' type='password' placeholder='Nhập lại mật khẩu' autoComplete={'new-password'}/>
                <div className='d-flex flex-row align-items-center gap-3 p-1'>
                    <input id='acceptTerms' name='acceptTerms' type='checkbox' onChange={handleChange} value={values.acceptTerms}/>
                    <p className='Content_13' style={{lineHeight:0}}>
                        Tôi đã đọc và đồng ý với Điều khoản sử dụng và Chính sách riêng tư
                    </p>
                </div>
            </div>

            <div className="SubmitButton py-3" align='center'>
                <button className="border-0 rounded-3 px-10 py-3"
                    type="submit"
                    disabled={!values.acceptTerms}
                >
                    <p className="H3-16B text-capitalize">SignUp</p>
                </button>
            </div>
        </form>
    )
}


function Input(props) {
    const {formik, name} = props
    const {values, errors, touched, handleBlur, handleChange} = formik;
    return (
        <div className="mb-2">
            <div className="Input bg-white border rounded p-2">
                <input
                    className="Content_13 w-100 border-0 bg-transparent"
                    {...props}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[name]}
                />
            </div>
            {touched[name] && errors[name] && <span className="InputError">&nbsp;&nbsp;{errors[name]}</span>}
        </div>
    )
}