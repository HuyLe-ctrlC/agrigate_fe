import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import './Login.css';
import { loginAction, selectAdmin } from '../../redux/slices/adminSlices';
import * as ROUTES from '../../constants/routes/routes';
// import { loginUserAction, selectUser } from '../../redux/slices/usersSlice';

//TODO => Form Schema
const formSchema = Yup.object({
    username: Yup.string().required('Dữ liệu là bắt buộc!'),
    password: Yup.string().required('Dữ liệu là bắt buộc!'),
});

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //password hide
    const [passwordCurrentType, setPasswordCurrentType] = useState('password');

    const togglePasswordCurrent = () => {
        if (passwordCurrentType === 'password') {
            setPasswordCurrentType('text');
            return;
        }
        setPasswordCurrentType('password');
    };
    //formik
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        // onSubmit: (values) => {
        //     //dispatch the action
        //     // console.log('values', values);
        //     dispatch(loginAction(values));
        // },
        validationSchema: formSchema,
    });

    //handle login
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginAction({ username: formik.values.username, password: formik.values.password }));
    };
    //todo: useNavigate
    const store = useSelector(selectAdmin);
    const { userAuth, loading, serverError, appError } = store;
    useEffect(() => {
        if (userAuth.token) {
            navigate('/');
        }
    }, [navigate, userAuth.token]);

    return (
        <div className="login login_page">
            <div className="container">
                {/* Outer Row */}
                <div className="row justify-content-center">
                    <div className="col-xl-5 col-lg-5 col-md-8">
                        <div className="card o-hidden border-0 shadow-lg">
                            <div className="card-body p-0">
                                {/* Nested Row within Card Body */}
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="box p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Đăng nhập hệ thống</h1>
                                            </div>
                                            {/* display error message*/}
                                            {appError || serverError ? (
                                                <h6 className="text-danger fs-6 mb-2">
                                                    {serverError == 'Network Error' ? 'Máy chủ không hoạt động' : null}{' '}
                                                    {appError}
                                                </h6>
                                            ) : null}
                                            <form onSubmit={formik.handleSubmit} className="user">
                                                <div className="form-group mb-3">
                                                    <label>
                                                        Tài khoản <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Nhập tài khoản"
                                                        value={formik.values.username}
                                                        onChange={formik.handleChange('username')}
                                                        onBlur={formik.handleBlur('username')}
                                                        className="form-control form-control-user"
                                                    />
                                                </div>
                                                {/* Error email or username */}
                                                <div className="text-danger fs-6 fw-normal mb-2 mt-n2">
                                                    {formik.touched.username && formik.errors.username}
                                                </div>
                                                <div className="form-group">
                                                    <label>
                                                        Mật khẩu <span className="text-danger">*</span>
                                                    </label>
                                                    {/* <input
                                                        type="password"
                                                        placeholder="Nhập mật khẩu"
                                                        value={formik.values.password}
                                                        onChange={formik.handleChange('password')}
                                                        onBlur={formik.handleBlur('password')}
                                                        className="form-control form-control-user"
                                                    /> */}
                                                    <div className="position-relative">
                                                        <div className="d-flex justify-content-end">
                                                            <input
                                                                type={passwordCurrentType}
                                                                value={formik.values.password}
                                                                onChange={formik.handleChange('password')}
                                                                onBlur={formik.handleBlur('password')}
                                                                name="password"
                                                                className="form-control input-pill-login"
                                                                placeholder="Nhập mật khẩu"
                                                            />
                                                            <span
                                                                className="btn position-absolute top-0 end-0 rounded-end rounded-3"
                                                                onClick={togglePasswordCurrent}
                                                            >
                                                                {/* {passwordCurrentType === 'password' ? 'Hiện' : 'Ẩn'} */}
                                                                {passwordCurrentType === 'password' ? (
                                                                    <i className="fa-solid fa-eye"></i>
                                                                ) : (
                                                                    <i className="fa-sharp fa-solid fa-eye-slash"></i>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="text-danger fs-6 fw-normal mt-1">
                                                        {formik.touched.password && formik.errors.password}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="customCheck"
                                                        />
                                                        <label className="custom-control-label" htmlFor="customCheck">
                                                            Nhớ mật khẩu
                                                        </label>
                                                    </div>
                                                </div>
                                                {loading ? (
                                                    <button disabled className="btn btn-secondary btn-user btn-block">
                                                        Vui lòng chờ ...
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={handleLogin}
                                                        type="submit"
                                                        className="btn btn-primary btn-user btn-block"
                                                        disabled={!formik.isValid}
                                                    >
                                                        Đăng nhập
                                                    </button>
                                                )}
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <Link className="small" to={ROUTES.FORGOT}>
                                                    Quên mật khẩu?
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
