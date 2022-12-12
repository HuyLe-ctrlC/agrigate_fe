import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes/routes';
import './styles.css';
export const SideBar = () => {
    const dispatch = useDispatch();
    return (
        <div className="sidebar">
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* Sidebar - Brand */}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15"></div>
                    <div className="sidebar-brand-text mx-3">Optech</div>
                </Link>
                {/* Divider */}
                <hr className="sidebar-divider my-0" />
                {/* Nav Item - Dashboard */}
                <li className="nav-item active">
                    <Link to="/" className="nav-link">
                        <i className="fa-solid fa-chart-pie"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link collapsed"
                        href="#"
                        data-toggle="collapse"
                        data-target="#cateManager"
                        aria-expanded="true"
                        aria-controls="cateManager"
                    >
                        <i className="fa-solid fa-bars-staggered"></i>
                        <span>Quản lý danh mục</span>
                    </a>
                    <div
                        id="cateManager"
                        className="collapse"
                        aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar"
                    >
                        <div className="py-2 collapse-inner rounded ">
                            <Link className="collapse-item hover-sidebar" to={ROUTES.COW_BREEDS}>
                                <i className="fa-solid fa-arrow-right"></i> Quản lý Giống Bò
                            </Link>
                            <Link className="collapse-item hover-sidebar" to={ROUTES.COW_GROUPS}>
                                <i className="fa-solid fa-arrow-right"></i> Quản lý Nhóm Bò
                            </Link>
                            <Link className="collapse-item hover-sidebar" to={ROUTES.CONDITION}>
                                <i className="fa-solid fa-arrow-right"></i> Quản lý Thể trạng
                            </Link>
                            <Link className="collapse-item hover-sidebar" to={ROUTES.WGE}>
                                <i className="fa-solid fa-arrow-right"></i> Quản lý hiệu quả tăng trọng
                            </Link>
                            <Link className="collapse-item hover-sidebar" to={ROUTES.AWG}>
                                <i className="fa-solid fa-arrow-right"></i> Quản lý tăng trọng trung bình
                            </Link>
                            <Link className="collapse-item hover-sidebar" to={ROUTES.WEIGHT}>
                                <i className="fa-solid fa-arrow-right"></i> Quản lý cân nặng P0
                            </Link>
                            <Link className="collapse-item hover-sidebar" to={ROUTES.WGS}>
                                <i className="fa-solid fa-arrow-right"></i> Quản lý tăng tăng trọng tiêu chuẩn
                            </Link>
                            <Link className="collapse-item hover-sidebar" to={ROUTES.CONFIG}>
                                <i className="fa-solid fa-arrow-right"></i> Quản lý cấu hìnhh
                            </Link>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link collapsed"
                        href="#"
                        data-toggle="collapse"
                        data-target="#accountRole"
                        aria-expanded="true"
                        aria-controls="accountRole"
                    >
                        <i className="fa-solid fa-user-shield"></i>
                        <span>Quản trị & phân quyền</span>
                    </a>
                    <div
                        id="accountRole"
                        className="collapse"
                        aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar"
                    >
                        <div className="py-2 collapse-inner rounded ">
                            <Link className="collapse-item hover-sidebar" to={ROUTES.ROLE}>
                                <i className="fa-solid fa-arrow-right"></i> Quản lý nhóm quyền
                            </Link>
                            <Link className="collapse-item hover-sidebar" to={ROUTES.ADMIN}>
                                <i className="fa-solid fa-arrow-right"></i> Quản lý Admin
                            </Link>
                        </div>
                    </div>
                </li>
                {/* <li className="nav-item">
          <Link className="nav-link" to={ROUTES.APPLY}>
            <i className="fas fa-fw fa-chart-area" />
            <span>Ứng tuyển</span>
          </Link>
        </li> */}
                {/* Nav Item - Tables */}
                {/* <li className="nav-item">
          <Link className="nav-link" to={ROUTES.CANDIDATE}>
            <i className="fas fa-fw fa-table" />
            <span>Quản lý ứng viên</span>
          </Link>
        </li> */}
                <hr className="sidebar-divider d-none d-md-block" />
                {/* Sidebar Toggler (Sidebar) */}
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" />
                </div>
            </ul>
        </div>
    );
};
