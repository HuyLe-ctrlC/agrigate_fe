import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWgs } from '../../redux/slices/wgsSlices';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const formSchema = Yup.object({
    name: Yup.string().required('*Dữ liệu bắt buộc!'),
    weightP0ID: Yup.string().required('*Dữ liệu bắt buộc!'),
    cowBreedID: Yup.string().required('*Dữ liệu bắt buộc!'),
});

export const Form = (props) => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [weightP0ID, setWeightP0ID] = useState('');
    const [cowBreedID, setCowBreedID] = useState('');
    const [publish, setPublish] = useState(true);

    //dispatch
    const dispatch = useDispatch();
    // get props to index components
    const { closeForm, isUpdate, addData, updateDate, cowBreedData, weightP0Data } = props;
    // get data update to redux
    const wgsData = useSelector(selectWgs);
    const { dataUpdate } = wgsData;
    //useRef
    const inputRef = useRef();
    useEffect(() => {
        focus();
        if (isUpdate) {
            if (dataUpdate) {
                if (dataUpdate[0]?.name !== undefined) {
                    setName(dataUpdate[0]?.name);
                }
                if (dataUpdate[0]?.weight_p0_id !== undefined) {
                    setWeightP0ID(dataUpdate[0]?.weight_p0_id);
                }
                if (dataUpdate[0]?.cow_breeds_id !== undefined) {
                    setCowBreedID(dataUpdate[0]?.cow_breeds_id);
                }
                if (dataUpdate[0]?.publish !== undefined) {
                    setPublish(dataUpdate[0]?.publish ? true : false);
                }
            }
        }
    }, [dataUpdate]);

    // close form event
    const handleCloseForm = () => {
        closeForm();
    };

    // update data event
    const handleUpdateData = () => {
        const id = dataUpdate[0]?.id;
        let dataUpdateNew = {
            name: formik.values.name,
            publish: publish,
            weight_p0_id: weightP0ID,
            cow_breeds_id: cowBreedID,
        };
        updateDate(id, dataUpdateNew);
    };

    // create data event
    const handleAddData = () => {
        const cowBreedSelected = cowBreedData?.filter((item) => item.name === formik.values.cowBreedID);
        const weightP0Selected = weightP0Data?.filter((item) => item.name === formik.values.weightP0ID);
        let data = {
            name: formik.values.name,
            publish: publish,
            cow_breeds_id: cowBreedSelected[0].id,
            weight_p0_id: weightP0Selected[0].id,
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
            name: name,
            weightP0ID: weightP0ID,
            cowBreedID: cowBreedID,
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
                        <div className="form-group">
                            <label>Tên</label>
                            <input
                                type="text"
                                className="form-control form-control-user"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange('name')}
                                onBlur={formik.handleBlur('name')}
                                ref={inputRef}
                            />
                            <div className="text-danger fs-6 mt-1">{formik.touched.name && formik.errors.name}</div>
                        </div>
                        {/* <div className="form-group col-6">
                            <label>
                                cowBreedID<span className="text-danger">*</span>
                            </label>
                            <div>
                                <select
                                    className="form-select form-control-user w-100 p-2 border color-sort rounded-pill"
                                    value={formik.values.cowBreedID}
                                    onChange={formik.handleChange('cowBreedID')}
                                    onBlur={formik.handleBlur('cowBreedID')}
                                >
                                    <option value="">-- Chọn --</option>
                                    {cowBreedData?.map((item, index) => (
                                        <option value={item.id} key={item.id}>
                                            {item.id}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-danger fs-6 mt-1">
                                {formik.touched.cowBreedID && formik.errors.cowBreedID}
                            </div>
                        </div>
                        <div className="form-group col-6">
                            <label>
                                weightP0ID<span className="text-danger">*</span>
                            </label>
                            <div>
                                <select
                                    className="form-select form-control-user w-100 p-2 border color-sort rounded-pill"
                                    value={formik.values.weightP0ID}
                                    onChange={formik.handleChange('weightP0ID')}
                                    onBlur={formik.handleBlur('weightP0ID')}
                                >
                                    <option value="">-- Chọn --</option>
                                    {weightP0Data?.map((item, index) => (
                                        <option value={item.id} key={item.id}>
                                            {item.id}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-danger fs-6 mt-1">
                                {formik.touched.weightP0ID && formik.errors.weightP0ID}
                            </div>
                        </div> */}
                        {!isUpdate && (
                            <div>
                                <div className="form-group">
                                    <label>Giống bò</label>
                                    <div>
                                        <select
                                            className="form-select form-control-user w-100 p-2 border color-sort"
                                            value={formik.values.cowBreedID}
                                            onChange={formik.handleChange('cowBreedID')}
                                            onBlur={formik.handleBlur('cowBreedID')}
                                        >
                                            <option value="">-- Chọn --</option>
                                            {cowBreedData?.map((item, index) => (
                                                <option value={item.name} key={index}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="text-danger mt-1">
                                        {formik.touched.cowBreedID && formik.errors.cowBreedID}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Cận nặng P0</label>
                                    <div>
                                        <select
                                            className="form-select form-control-user w-100 p-2 border color-sort"
                                            value={formik.values.weightP0ID}
                                            onChange={formik.handleChange('weightP0ID')}
                                            onBlur={formik.handleBlur('weightP0ID')}
                                        >
                                            <option value="">-- Chọn --</option>
                                            {weightP0Data?.map((item, index) => (
                                                <option value={item.name} key={index}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="text-danger mt-1">
                                        {formik.touched.weightP0ID && formik.errors.weightP0ID}
                                    </div>
                                </div>
                            </div>
                        )}

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
