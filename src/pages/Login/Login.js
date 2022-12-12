import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import './Login.css';
import { loginAction, selectAdmin } from '../../redux/slices/adminSlices';
// import { loginUserAction, selectUser } from '../../redux/slices/usersSlice';

//TODO => Form Schema
const formSchema = Yup.object({
    username: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //formik
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: (values) => {
            //dispatch the action
            // console.log('values', values);
            dispatch(loginAction(values));
        },
        validationSchema: formSchema,
    });
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
                                                    {serverError}: {appError}
                                                </h6>
                                            ) : null}
                                            <form onSubmit={formik.handleSubmit} className="user">
                                                <div className="form-group mb-3">
                                                    <input
                                                        type="email"
                                                        placeholder="Nhập địa chỉ email ..."
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
                                                    <input
                                                        type="password"
                                                        placeholder="Nhập mật khẩu"
                                                        value={formik.values.password}
                                                        onChange={formik.handleChange('password')}
                                                        onBlur={formik.handleBlur('password')}
                                                        className="form-control form-control-user"
                                                    />
                                                    {/* Error password */}
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
                                                        type="submit"
                                                        className="btn btn-primary btn-user btn-block"
                                                    >
                                                        Đăng nhập
                                                    </button>
                                                )}
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <a className="small" href="forgot-password.html">
                                                    Quên mật khẩu?
                                                </a>
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
