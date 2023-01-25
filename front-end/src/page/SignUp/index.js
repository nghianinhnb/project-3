import * as Yup from 'yup';
import { useFormik } from "formik";

import './style.scss';


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
            email: Yup.string().required(t('EmailIsRequired')).email(t('EmailNotValid')),
            phone: Yup.number().optional(),
            password: Yup.string().required(t('PasswordIsRequired')).min(6, t('PasswordMinLength6')).matches(/^\S*$/, 'Mật khẩu không được chứa khoảng trắng'),
            rePassword: Yup.string().required(t('PasswordIsRequired')).oneOf([Yup.ref('password')], t('PasswordNotMatch')),
            acceptTerms: Yup.boolean().test('isTrue', t('AcceptTermsRequired'), (value) => value === true)
        }),
        onSubmit: values => {

        },
    });
    return (
        <div className="OrderSignUp d-flex flex-column bg-white rounded-lg">
            <div className="d-flex flex-row justify-content-between px-6 py-3">
                <p className="H3-16B">Account information</p>
                <a className="Content_13B"
                    style={{color:'#663DAA'}}
                    onClick={() => setShowSignIn(true)}
                >
                    SignIn
                </a>
            </div>
            <div className="d-flex flex-column px-6 gap-3">
                <Form formik={formik}/>
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
                <p className="Mini_content_12 mb-2">Đăng ký tài khoản để đặt hàng</p>
                <Input formik={formik} name='fullname' type='text' placeholder='Full name' autoComplete={'true'}/>
                <Input formik={formik} name='phone' type='text' placeholder='Phone' autoComplete={'true'}/>
                <Input formik={formik} name='password' type='password' placeholder='Password' autoComplete={'new-password'}/>
                <Input formik={formik} name='rePassword' type='password' placeholder='Re-enter password' autoComplete={'new-password'}/>
                <div className='d-flex flex-row align-items-center gap-3 p-1'>
                    <input id='acceptTerms' name='acceptTerms' type='checkbox' onChange={handleChange} value={values.acceptTerms}/>
                    <p className='Content_13' style={{lineHeight:0}}>
                        Tôi đã đọc và đồng ý với Điều khoản sử dụng và Chính sách riêng tư
                    </p>
                </div>
            </div>

            <div className="SubmitButton py-3" align='center'>
                <button className="border-0 rounded-lg px-10 py-3"
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