import * as Yup from 'yup';
import { useFormik } from "formik";

import './style.scss';


function SignIn({setShowSignIn}) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required(t('EmailIsRequired')).email(t('EmailNotValid')),
            password: Yup.string().required(t('PasswordIsRequired')).min(6, t('PasswordMinLength6')).matches(/^\S*$/, 'Mật khẩu không được chứa khoảng trắng'),
        }),
        onSubmit: values => {

        },
    });
    return (
        <div className="OrderSignIn d-flex flex-column bg-white rounded-lg">
            <div className="d-flex flex-row justify-content-between px-6 py-3">
                <p className="H3-16B">Account information</p>
                <a className="Content_13B"
                    style={{color:'#663DAA'}}
                    onClick={() => setShowSignIn(false)}
                >
                    SignUp
                </a>
            </div>
            <div className="d-flex flex-column px-6 gap-3">
                <Form formik={formik}/>
            </div>
        </div>
    )
}


export default SignIn;


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
            {touched.email && errors.email && <span className="FieldError">&nbsp;&nbsp;{errors.email}</span>}

            <div className="PasswordField rounded p-3 mt-4">
                <p className="Mini_content_12 mb-2">Vui lòng nhập mật khẩu</p>
                <div className="bg-white border rounded p-2">
                    <input
                        className="Content_13 w-100 border-0 bg-transparent"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete='true'
                        placeholder='Password'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                </div>
                {touched.password && errors.password && <span className="FieldError">&nbsp;&nbsp;{errors.password}</span>}
            </div>

            <div className="SubmitButton py-3" align='center'>
                <button className="border-0 rounded-lg px-10 py-3"
                    type="submit"
                >
                    <p className="H3-16B text-capitalize">Sign in</p>
                </button>
            </div>
        </form>
    )
}
