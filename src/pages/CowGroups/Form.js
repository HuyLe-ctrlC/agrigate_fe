import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { selectCowGroups } from '../../redux/slices/cowGroupsSlice';

const formSchema = Yup.object({
    name: Yup.string().required('*Dữ liệu bắt buộc!'),
    code: Yup.string().required('*Dữ liệu bắt buộc!'),
});

export const Form = (props) => {
    const [name, setName] = useState('');
    const [publish, setPublish] = useState(true);
    // get props to index components
    const { closeForm, isUpdate, addData, updateDate } = props;
    // console.log(isUpdate);
    // get data update to redux
    const cowGroupsData = useSelector(selectCowGroups);
    const { dataUpdate } = cowGroupsData;
    const [code, setCode] = useState('');
    // console.log(dataUpdate);
    // console.log(cowGroupsData);
    //useRef
    const inputRef = useRef();
    const inputNameRef = useRef();

    useEffect(() => {
        focus();
        if (isUpdate) {
            if (dataUpdate) {
                // console.log(123);
                // console.log(dataUpdate);
                if (dataUpdate[0]?.code !== undefined) {
                    setCode(dataUpdate[0]?.code);
                }
                if (dataUpdate[0]?.name !== undefined) {
                    setName(dataUpdate[0]?.name);
                }

                if (dataUpdate[0]?.publish !== undefined) {
                    setPublish(dataUpdate[0]?.publish ? true : false);
                }
            }
        }
    }, [isUpdate, dataUpdate]);

    // close form event
    const handleCloseForm = () => {
        closeForm();
    };
    // update data event
    const handleUpdateData = () => {
        const id = dataUpdate[0]?.id;
        let dataUpdateNew = {
            code: formik.values.code,
            name: formik.values.name,
            publish: publish,
        };
        // console.log(dataUpdateNew);
        updateDate(id, dataUpdateNew);
    };

    // create data event
    const handleAddData = () => {
        let data = {
            code: formik.values.code,
            name: formik.values.name,
            publish: publish,
        };
        // console.log(data);
        addData(data);
    };
    // check show button action
    const showButtonAction = () => {
        if (isUpdate) {
            return (
                <button
                    type="submit"
                    onClick={() => handleUpdateData()}
                    className="btn btn-info btn-cus"
                    disabled={!formik.isValid}
                >
                    Cập nhật
                </button>
            );
        } else {
            return (
                <button
                    type="submit"
                    onClick={() => handleAddData()}
                    className="btn btn-info btn-cus"
                    disabled={!formik.isValid}
                >
                    Lưu
                </button>
            );
        }
    };

    //formik
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            code: code,
            name: name,
        },
        validationSchema: formSchema,
    });

    const focus = () => {
        inputRef.current?.focus();
    };

    return (
        <div className="form-box">
            <div className="form">
                <div className="title">Cập nhật dữ liệu</div>
                <button className="btn-close" onClick={() => handleCloseForm()}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="box">
                    <form className="user">
                        {!isUpdate && (
                            <div className="form-group">
                                <label>Mã</label>
                                <input
                                    type="text"
                                    className="form-control form-control-user"
                                    name="code"
                                    value={formik.values.code}
                                    onChange={formik.handleChange('code')}
                                    onBlur={formik.handleBlur('code')}
                                    ref={inputRef}
                                />
                                <div className="text-danger fs-6 mt-1">{formik.touched.code && formik.errors.code}</div>
                            </div>
                        )}
                        <div className="form-group">
                            <label>Tên</label>
                            <input
                                type="text"
                                className="form-control form-control-user"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange('name')}
                                onBlur={formik.handleBlur('name')}
                                ref={isUpdate ? inputRef : inputNameRef}
                            />
                            <div className="text-danger fs-6 mt-1">{formik.touched.name && formik.errors.name}</div>
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="publish"
                                    name="publish"
                                    value={publish}
                                    checked={publish}
                                    onChange={(e) => setPublish(e.target.checked)}
                                />
                                <label className="custom-control-label" htmlFor="publish">
                                    Hiển thị
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            {showButtonAction()}
                            <button
                                type="button"
                                className="btn btn-info btn-cus ml-3"
                                onClick={() => handleCloseForm()}
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
