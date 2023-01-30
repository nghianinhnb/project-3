import './style.scss'


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
            {touched[name] && errors[name] && <span className="InputError text-danger">&nbsp;&nbsp;{errors[name]}</span>}
        </div>
    )
}


export default Input;
