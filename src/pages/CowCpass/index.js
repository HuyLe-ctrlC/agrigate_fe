import React, { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectcowCpass,
    getAllAction,
    addDataAction,
    getByIdAction,
    updateDataAction,
} from '../../redux/slices/cowCpassSlice';
import { openForm, closeForm, selectForm } from '../../redux/slices/formSlices';
import { ListItem } from './ListItem';
import { Form } from './Form';
import { Paging } from '../../components/Paging';
import { Search } from './Search';
import Swal from 'sweetalert2';
import { async } from 'q';
import axiosClient from '../../api/axiosClient';
import PATH from '../../constants/path';
// import { selectCowBreeds } from "../../redux/slices/cowBreedsSlice";

export const CowCpass = () => {
    const title = 'Quản lý CPass';
    const dispatch = useDispatch();
    const { formStatus } = useSelector(selectForm);
    const [formStatusState, setFormStatusState] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [publish, setPublish] = useState('');
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [cowGroup, setCowGroup] = useState([]);
    const [conditions, setConditions] = useState([]);
    // const [wge, setWge] = useState('');
    // const [awg, setAwg] = useState('');
    const [cowBreeds, setCowBreeds] = useState([]);
    const [farm, setFarm] = useState([]);
    // config general
    let start = currentPage - 1;
    let orderBy = 'desc';
    // let limit = 10;
    // let keyword = '';
    const params = {
        start: start,
        limit: limit,
        keyword: keyword,
        orderBy: orderBy,
        publish: publish,
    };
    // get all data
    const getData = () => {
        // console.log(params);
        document.title = title;
        dispatch(getAllAction(params));
    };
    const getDataFarm = async () => {
        try {
            const res = await axiosClient({ method: 'GET', url: PATH.farms });
            console.log(res);
            setFarm(res.data);
        } catch (error) {
            console.log(error);
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                width: 500,
            });

            Toast.fire({
                icon: 'error',
                title: error,
            });
        }
    };
    const getDataCowGroup = async () => {
        try {
            const res = await axiosClient({ method: 'GET', url: PATH.cowGroups });
            console.log(res);
            setCowGroup(res.data);
        } catch (error) {
            console.log(error);
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                width: 500,
            });

            Toast.fire({
                icon: 'error',
                title: error,
            });
        }
    };
    const getDataCowBreeds = async () => {
        try {
            const res = await axiosClient({ method: 'GET', url: PATH.cowBreeds });
            console.log(res);
            setCowBreeds(res.data);
        } catch (error) {
            console.log(error);
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                width: 500,
            });

            Toast.fire({
                icon: 'error',
                title: error,
            });
        }
    };
    const getDataConditions = async () => {
        try {
            const res = await axiosClient({ method: 'GET', url: PATH.conditions });
            console.log(res);
            setConditions(res.data);
        } catch (error) {
            console.log(error);
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                width: 500,
            });

            Toast.fire({
                icon: 'error',
                title: error,
            });
        }
    };

    useEffect(() => {
        getData();
        getDataFarm();
        getDataCowGroup();
        getDataCowBreeds();
        getDataConditions();
    }, []);
    // select state to store
    const cowCpassData = useSelector(selectcowCpass);
    const { data, totalPage, loading, appError, msgSuccess } = cowCpassData;
    // console.log(data);

    // Refresh page
    const handleRefreshPage = () => {
        window.location.reload(false);
    };
    // ==== paging ==== //
    // prev page events
    const handlePrevClick = () => {
        if (currentPage > 1) {
            let prevPage = currentPage - 1;
            params.start = (prevPage - 1) * limit;
            setCurrentPage(prevPage);
            getData();
        }
    };
    // next page events
    const handleNextClick = () => {
        if (currentPage < totalPage) {
            let nextPage = currentPage + 1;
            params.start = (nextPage - 1) * limit;
            setCurrentPage(nextPage);
            getData();
        }
    };
    // change page event
    const handleChangePage = (page) => {
        params.start = (page - 1) * limit;
        setCurrentPage(page);
        getData();
    };
    // ==== paging END ==== //
    // search data
    const handleSearch = (keyword, publish) => {
        params.keyword = keyword;
        params.publish = publish;
        setPublish(publish);
        setKeyword(keyword);
        setCurrentPage(1);
        params.start = 0;
        getData();
    };

    // open create form event
    const handleOpenFormAdd = () => {
        setFormStatusState(true);
        const action = openForm();
        dispatch(action);
    };

    // create data event
    const handleAddData = async (data) => {
        setFormStatusState(false);
        const dataJson = JSON.stringify(data);

        const action = await dispatch(addDataAction(dataJson));
        if (addDataAction.fulfilled.match(action)) {
            const msg = action.payload.msg;
            // console.log(msg);
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                width: 500,
            });

            Toast.fire({
                icon: 'success',
                title: msg,
            });
        } else {
            // console.log(resultAction.payload);
            const msg = action.payload;
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                width: 500,
            });

            Toast.fire({
                icon: 'error',
                title: msg,
            });
        }
    };

    // update data event
    const handleUpdateData = async (id, data) => {
        setFormStatusState(false);
        setIsUpdate(false);
        const dataJson = JSON.stringify(data);
        const datas = {
            id: id,
            data: dataJson,
        };
        // console.log(datas);
        const updateAction = await dispatch(updateDataAction(datas));
        if (updateDataAction.fulfilled.match(updateAction)) {
            // const msg = resultAction.payload;
            // console.log(msg);
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                width: 500,
            });

            Toast.fire({
                icon: 'success',
                title: 'Cập nhật dữ liệu thành công!',
            });
        } else {
            // console.log(resultAction.payload);
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                width: 500,
            });

            Toast.fire({
                icon: 'error',
                title: 'Cập nhật dữ liệu thất bại!',
            });
        }
    };

    // open update form event
    const handleOpenFormUpdate = (id) => {
        setFormStatusState(true);
        const action = openForm();
        dispatch(action);
        setIsUpdate(true);
        // get data by ID
        // console.log(id);
        dispatch(getByIdAction(id));
    };

    // close form event
    const handleCloseForm = () => {
        setFormStatusState(false);
        const action = closeForm();
        dispatch(action);
        setIsUpdate(false);
    };
    // check show form
    const displayForm = () => {
        if (formStatusState) {
            return (
                <Form
                    closeForm={handleCloseForm}
                    isUpdate={isUpdate}
                    addData={handleAddData}
                    updateDate={handleUpdateData}
                />
            );
        }
    };
    // check show notify
    const showToast = () => {
        if (msgSuccess) {
            return <div className="notify text-success mb-2">{msgSuccess}</div>;
        } else {
            return <div className="notify text-danger mb-2">{appError}</div>;
        }
    };

    return (
        <>
            <div className="container-fluid">
                {displayForm()}
                <div className="card shadow mb-4">
                    {/* Page Heading */}
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-normal text-primary">{title}</h6>
                    </div>
                    <div className="card-body">
                        <div className="top_tools d-flex mb-3">
                            <Search
                                handleSearch={handleSearch}
                                dataCowGroups={cowGroup}
                                dataCowBreeds={cowBreeds}
                                dataFarm={farm}
                                dataConditions={conditions}
                            />
                            <button onClick={() => handleOpenFormAdd()} className="btn btn-primary btn-icon-split ml-2">
                                <span className="text">
                                    <i className="fa-solid fa-plus"></i> Thêm mới
                                </span>
                            </button>
                            <button onClick={() => handleRefreshPage()} className="btn btn-primary btn-icon-split ml-2">
                                <span className="text">
                                    <i className="fa-solid fa-rotate"></i>
                                </span>
                            </button>
                        </div>
                        {/* { showToast() } */}
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">STT</th>
                                    <th className="text-center">Số thẻ tai</th>
                                    <th className="text-center">Cpass</th>
                                    <th className="text-center">Nhóm</th>
                                    <th className="text-center">Trang trại</th>
                                    <th className="text-center">Giông bò</th>
                                    <th className="text-center">Giới tính</th>
                                    <th className="text-center">Hình ảnh</th>
                                    <th className="text-center">Ngày sinh</th>
                                    <th className="text-center">Pss</th>
                                    <th className="text-center">Tuổi</th>
                                    <th className="text-center">Pnow</th>
                                    <th className="text-center">Thể trạng</th>
                                    <th className="text-center">Hiệu quả tăng trọng</th>
                                    <th className="text-center">Tăng trọng trung bình</th>
                                    <th className="text-center">Thứ tự</th>
                                    <th className="text-center">Hiển thị</th>
                                    <th className="text-center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="text-center">
                                            Đang tải dữ liệu...
                                        </td>
                                    </tr>
                                ) : data && data.length <= 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center">
                                            Dữ liệu hiện tại chưa được cập nhật
                                        </td>
                                    </tr>
                                ) : (
                                    <ListItem data={data} openFormUpdate={(id) => handleOpenFormUpdate(id)} />
                                )}
                            </tbody>
                        </table>
                        {/* paging */}
                        {totalPage > 1 ? (
                            <Paging
                                totalPage={totalPage}
                                onchangePage={handleChangePage}
                                onPrevClickPage={handlePrevClick}
                                onNextClickPage={handleNextClick}
                                currentPage={currentPage}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
