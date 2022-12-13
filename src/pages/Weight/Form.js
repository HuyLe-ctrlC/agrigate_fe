import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWeightP0 } from '../../redux/slices/weightP0Slices';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { NumericFormat } from 'react-number-format';
const formSchema = Yup.object({
    name: Yup.string().required('*Dữ liệu bắt buộc!'),
    minValue: Yup.string()
        .required('*Dữ liệu bắt buộc!')
        .test('Is positive?', 'Giá trị phải lớn hơn 0!', (value) => parseInt(value) > 0),
    maxValue: Yup.string()
        .required('*Dữ liệu bắt buộc!')
        .test('Is positive?', 'Giá trị phải lớn hơn 0!', (value) => parseInt(value) > 0),
});

export const Form = (props) => {
    const [name, setName] = useState('');
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');
    const [publish, setPublish] = useState(true);
    // get props to index components
    const { closeForm, isUpdate, addData, updateDate } = props;
    // get data update to redux
    const weightP0Data = useSelector(selectWeightP0);
    const { dataUpdate } = weightP0Data;
    //useRef
    const inputRef = useRef();

    useEffect(() => {
        focus();
        if (isUpdate) {
            if (dataUpdate) {
                if (dataUpdate[0]?.name !== undefined) {
                    setName(dataUpdate[0]?.name);
                }
                if (dataUpdate[0]?.publish !== undefined) {
                    setPublish(dataUpdate[0]?.publish ? true : false);
                }
                if (dataUpdate[0]?.min_value !== undefined) {
                    setMinValue(dataUpdate[0]?.min_value);
                }
                if (dataUpdate[0]?.max_value !== undefined) {
                    setMaxValue(dataUpdate[0]?.max_value);
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
            min_value:
                typeof formik.values.minValue == 'string'
                    ? formik.values.minValue.replace(/,/g, '')
                    : formik.values.minValue,
            max_value:
                typeof formik.values.maxValue == 'string'
                    ? formik.values.maxValue.replace(/,/g, '')
                    : formik.values.maxValue,
        };
        // console.log("dataUpdateNew", dataUpdateNew);
        updateDate(id, dataUpdateNew);
    };

    // create data event
    const handleAddData = () => {
        let data = {
            name: formik.values.name,
            publish: publish,
            min_value:
                typeof formik.values.minValue == 'string'
                    ? formik.values.minValue.replace(/,/g, '')
                    : formik.values.minValue,
            max_value:
                typeof formik.values.maxValue == 'string'
                    ? formik.values.maxValue.replace(/,/g, '')
                    : formik.values.maxValue,
        };
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
            minValue: minValue,
            maxValue: maxValue,
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
                            />
                            <div className="text-danger fs-6 mt-1">{formik.touched.name && formik.errors.name}</div>
                        </div>
                        <div className="form-group">
                            <div className="d-flex flex-column">
                                <label>P0 nhỏ nhất</label>
                                <NumericFormat
                                    type="text"
                                    className="form-control form-control-user"
                                    name="minValue"
                                    value={formik.values.minValue}
                                    onChange={formik.handleChange('minValue')}
                                    onBlur={formik.handleBlur('minValue')}
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=","
                                />
                            </div>
                            <div className="text-danger fs-6 mt-1">
                                {formik.touched.minValue && formik.errors.minValue}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="d-flex flex-column">
                                <label>P0 lớn nhất</label>
                                <NumericFormat
                                    type="text"
                                    className="form-control form-control-user"
                                    name="maxValue"
                                    value={formik.values.maxValue}
                                    onChange={formik.handleChange('maxValue')}
                                    onBlur={formik.handleBlur('maxValue')}
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=","
                                />
                            </div>
                            <div className="text-danger fs-6 mt-1">
                                {formik.touched.maxValue && formik.errors.maxValue}
                            </div>
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
