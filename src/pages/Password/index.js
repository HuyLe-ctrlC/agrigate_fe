import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdmin, updatePasswordAction } from '../../redux/slices/adminSlices';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

//Form schema
const formSchema = Yup.object({
    passwordCurrent: Yup.string().required('Dữ liệu là bắt buộc!'),
    passwordNew: Yup.string().required('Dữ liệu là bắt buộc!'),
});

export const Password = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //state show password
    const [passwordCurrentType, setPasswordCurrentType] = useState('password');
    const [passwordCurrentInput, setPasswordCurrentInput] = useState('');
    const [passwordNewType, setPasswordNewType] = useState('password');
    const [passwordNewInput, setPasswordNewInput] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(null);
    const [isSent, setSent] = useState(null);
    const [isChanged, setIsChanged] = useState(false);
    const { userAuth } = useSelector(selectAdmin);

    const togglePasswordCurrent = () => {
        if (passwordCurrentType === 'password') {
            setPasswordCurrentType('text');
            return;
        }
        setPasswordCurrentType('password');
    };
    const togglePasswordNew = () => {
        if (passwordNewType === 'password') {
            setPasswordNewType('text');
            return;
        }
        setPasswordNewType('password');
    };

    //formik
    const formik = useFormik({
        initialValues: {
            passwordCurrent: '',
            passwordNew: '',
        },
        onSubmit: (values) => {
            //dispath the action
            dispatch(
                updatePasswordAction({
                    passwordCurrent: values.passwordCurrent,
                    id: userAuth?.id,
                    passwordNew: values.passwordNew,
                }),
            );
            if (passwordUpdated?.result === true || passwordUpdated?.result === false) {
                setIsChanged(!isChanged);
                setSent(isChanged);
            }
        },
        validationSchema: formSchema,
    });
    const users = useSelector(selectAdmin);
    const { passwordUpdated, loading } = users;

    useEffect(() => {
        if (loading) {
            return;
        } else {
            setTimeout(() => {
                if (passwordUpdated?.result) {
                    setIsSubmitted(true);
                    Swal.fire('Thành công!', 'Mật khẩu đã được cập nhật!', 'success');
                }
                if (passwordUpdated?.result === false) {
                    setIsSubmitted(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Có lỗi...',
                        text: 'Mật khẩu cũ không đúng!',
                    });
                }
            }, '1000');
        }
    }, [isSent, loading, passwordUpdated?.result]);

    return (
        <>
            <div className="container">
                <div className="d-flex align-items-center justify-content-center my-5 py-5">
                    <div className="row">
                        <div className="col-sm-12 border border-secondary shadow p-3 mb-5 bg-body rounded">
                            <h1>Cập nhật mật khẩu</h1>
                            <form onSubmit={formik.handleSubmit} className="user">
                                <div className="form-group my-4 mx-4">
                                    {/* display error message*/}
                                    {/* {passwordUpdated?.result ? (
                                        <h6 className="text-success fs-6 mb-2">{passwordUpdated?.data[0]?.msg}</h6>
                                    ) : (
                                        <h6 className="text-danger fs-6 mb-2">{passwordUpdated?.errors[0]?.msg}</h6>
                                    )} */}
                                    <label htmlFor="passwordCurrent" className="">
                                        Mật khẩu hiện tại
                                    </label>
                                    <div className="position-relative">
                                        <div className="d-flex justify-content-end">
                                            <input
                                                type={passwordCurrentType}
                                                value={formik.values.passwordCurrent}
                                                onChange={formik.handleChange('passwordCurrent')}
                                                onBlur={formik.handleBlur('passwordCurrent')}
                                                name="password"
                                                className="form-control"
                                                placeholder="Mật khẩu"
                                            />
                                            <p
                                                className="btn position-absolute top-0 end-0 rounded-end rounded-3"
                                                onClick={togglePasswordCurrent}
                                            >
                                                {/* {passwordCurrentType === 'password' ? 'Hiện' : 'Ẩn'} */}
                                                {passwordCurrentType === 'password' ? (
                                                    <i className="fa-solid fa-eye"></i>
                                                ) : (
                                                    <i className="fa-sharp fa-solid fa-eye-slash"></i>
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-danger fs-6 mt-1">
                                        {formik.touched.passwordCurrent && formik.errors.passwordCurrent}
                                    </div>
                                </div>
                                <div className="form-group my-4 mx-4">
                                    <label htmlFor="passwordCurrent" className="">
                                        Mật khẩu mới
                                    </label>
                                    <div className="position-relative">
                                        <div className="d-flex justify-content-end">
                                            <input
                                                type={passwordNewType}
                                                value={formik.values.passwordNew}
                                                onChange={formik.handleChange('passwordNew')}
                                                onBlur={formik.handleBlur('passwordNew')}
                                                name="password"
                                                className="form-control"
                                                placeholder="Mật khẩu mới"
                                            />
                                            <p
                                                className="btn position-absolute top-0 end-0 rounded-end rounded-3"
                                                onClick={togglePasswordNew}
                                            >
                                                {/* {passwordNewType === 'password' ? 'Hiện' : 'Ẩn'} */}
                                                {passwordNewType === 'password' ? (
                                                    <i className="fa-solid fa-eye"></i>
                                                ) : (
                                                    <i className="fa-sharp fa-solid fa-eye-slash"></i>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-danger fs-6 mt-1">
                                        {formik.touched.passwordNew && formik.errors.passwordNew}
                                    </div>
                                    <button type="submit" className="btn btn-success w-100 mt-4">
                                        Cập nhật
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
