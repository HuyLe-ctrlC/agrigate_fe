import React, { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCondition,
    getAllAction,
    addDataAction,
    getByIdAction,
    updateDataAction,
} from '../../redux/slices/conditionSlices';
import { openForm, closeForm, selectForm } from '../../redux/slices/formSlices';
import { ListItem } from './ListItem';
import { Form } from './Form';
import { Paging } from '../../components/Paging';
import { Search } from './Search';
import Swal from 'sweetalert2';

export const Config = () => {
    const title = 'Quản lý Thể trạng';
    const dispatch = useDispatch();
    const { formStatus } = useSelector(selectForm);
    const [formStatusState, setFormStatusState] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // config general
    let start = currentPage - 1;
    let limit = 10;
    let orderBy = 'desc';
    let keyword = '';
    const params = {
        start: start,
        limit: limit,
        keyword: keyword,
        orderBy: orderBy,
    };
    // get all data
    const getData = () => {
        // console.log(params);
        document.title = title;
        dispatch(getAllAction(params));
    };

    useEffect(() => {
        getData();
    }, []);
    // select state to store
    const conditionData = useSelector(selectCondition);
    const { data, totalPage, loading, appError, serverErr, msgSuccess } = conditionData;
    // console.log(totalPage);

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
    const handleSearch = (keyword) => {
        params.keyword = keyword;
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
            // const msg = action.payload;
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
        // console.log(dataJson);
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
            <h1>config</h1>
        </>
    );
};
