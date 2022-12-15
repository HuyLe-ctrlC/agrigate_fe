import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes/routes';
import { getInfoAction, logoutAction, selectAdmin } from '../../redux/slices/adminSlices';
import { PageLoading } from '../PageLoading/PageLoading';
// import { openForm, closeForm, selectForm } from '../../redux/slices/formSlices';

export const Navigation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userAuth, info, serverErr, loading } = useSelector(selectAdmin);
    useEffect(() => {
        dispatch(getInfoAction(userAuth?.id));
    }, [dispatch, userAuth?.id]);

    // console.log('userAuth', userAuth?.info?.name);
    if (userAuth?.infoError || userAuth?.info === 'Invalid token or token expired') {
        dispatch(logoutAction());
        navigate(ROUTES.LOGIN);
        window.location.reload();
        // console.log('OUT');
    }
    return (
        <>
            {loading ? (
                <>
                    <PageLoading />
                </>
            ) : null}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* Sidebar Toggle (Topbar) */}
                <form className="form-inline">
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars" />
                    </button>
                </form>
                {/* Topbar Navbar */}
                <ul className="navbar-nav ml-auto">
                    {/* Nav Item - Search Dropdown (Visible Only XS) */}
                    <li className="nav-item dropdown no-arrow d-sm-none">
                        <Link
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="searchDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="fas fa-search fa-fw" />
                        </Link>
                        {/* Dropdown - Messages */}
                        <div
                            className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                            aria-labelledby="searchDropdown"
                        >
                            <form className="form-inline mr-auto w-100 navbar-search">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control bg-light border-0 small"
                                        placeholder="Search for..."
                                        aria-label="Search"
                                        aria-describedby="basic-addon2"
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                    <div className="d-none d-sm-block" />
                    {/* Nav Item - User Information */}
                    <li className="nav-item dropdown no-arrow">
                        <Link
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="userDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span className="text-gray-600 medium d-lg-inline mr-2">{userAuth?.info?.name}</span>
                            <img
                                className="img-profile rounded-circle"
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt="avatar"
                            ></img>
                        </Link>
                        {/* Dropdown - User Information */}
                        <div
                            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown"
                        >
                            <Link className="dropdown-item" href="#">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-black-400" />
                                Tài khoản
                            </Link>
                            <Link className="dropdown-item" to={ROUTES.UPDATE_PASSWORD}>
                                <i className="fa-solid fa-key fa-sm fa-fw mr-2 text-black-400" />
                                Cập nhật mật khẩu
                            </Link>

                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href={ROUTES.LOGIN} onClick={() => dispatch(logoutAction())}>
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-black-400" />
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
};
