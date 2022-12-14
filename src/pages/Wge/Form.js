import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWge } from '../../redux/slices/wgeSlices';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { NumericFormat } from 'react-number-format';
const formSchema = Yup.object({
    name: Yup.string().required('*Dữ liệu bắt buộc!'),
    code: Yup.string().required('*Dữ liệu bắt buộc!'),
    minValue: Yup.string()
        .required('*Dữ liệu bắt buộc!')
        .test('Is positive?', 'Giá trị phải lớn hơn 0!', (value) => parseInt(value) > 0),
    maxValue: Yup.string()
        .required('*Dữ liệu bắt buộc!')
        .test('Is positive?', 'Giá trị phải lớn hơn 0!', (value) => parseInt(value) > 0),
});

export const Form = (props) => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');
    const [publish, setPublish] = useState(true);
    const [colorText, setColorText] = useState('');
    const [colorBackground, setcolorBackground] = useState('');
    // get props to index components
    const { closeForm, isUpdate, addData, updateDate } = props;
    // get data update to redux
    const conditionData = useSelector(selectWge);
    const { dataUpdate } = conditionData;
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
                if (dataUpdate[0]?.code !== undefined) {
                    setCode(dataUpdate[0]?.code);
                }
                if (dataUpdate[0]?.min_value !== undefined) {
                    setMinValue(dataUpdate[0]?.min_value);
                }
                if (dataUpdate[0]?.max_value !== undefined) {
                    setMaxValue(dataUpdate[0]?.max_value);
                }
                if (dataUpdate[0]?.color_text !== undefined) {
                    setColorText(dataUpdate[0]?.color_text);
                }
                if (dataUpdate[0]?.color_bg !== undefined) {
                    setcolorBackground(dataUpdate[0]?.color_bg);
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
            code: formik.values.code,
            min_value:
                typeof formik.values.minValue == 'string'
                    ? formik.values.minValue.replace(/,/g, '')
                    : formik.values.minValue,
            max_value:
                typeof formik.values.maxValue == 'string'
                    ? formik.values.maxValue.replace(/,/g, '')
                    : formik.values.maxValue,
            color_text: formik.values.colorText,
            color_bg: formik.values.colorBackground,
        };
        console.log('dataUpdateNew', dataUpdateNew);
        updateDate(id, dataUpdateNew);
    };

    // create data event
    const handleAddData = () => {
        let data = {
            name: formik.values.name,
            publish: publish,
            code: formik.values.code,
            min_value:
                typeof formik.values.minValue == 'string'
                    ? formik.values.minValue.replace(/,/g, '')
                    : formik.values.minValue,
            max_value:
                typeof formik.values.maxValue == 'string'
                    ? formik.values.maxValue.replace(/,/g, '')
                    : formik.values.maxValue,
            color_text: formik.values.colorText,
            color_bg: formik.values.colorBackground,
        };
        console.log(data);
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
            code: code,
            minValue: minValue,
            maxValue: maxValue,
            colorText: colorText,
            colorBackground: colorBackground,
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
                                    name="name"
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
                            />
                            <div className="text-danger fs-6 mt-1">{formik.touched.name && formik.errors.name}</div>
                        </div>
                        <div className="form-group">
                            <label>Giá trị nhỏ nhất</label>
                            <NumericFormat
                                type="text"
                                className="form-control form-control-user"
                                name="use_ale_max"
                                value={formik.values.minValue}
                                onChange={formik.handleChange('minValue')}
                                onBlur={formik.handleBlur('minValue')}
                                thousandsGroupStyle="thousand"
                                thousandSeparator=","
                            />
                            <div className="text-danger fs-6 mt-1">
                                {formik.touched.minValue && formik.errors.minValue}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Giá trị lớn nhất</label>
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
                            <div className="text-danger fs-6 mt-1">
                                {formik.touched.maxValue && formik.errors.maxValue}
                            </div>
                        </div>
                        <div className="form-row">
                            {' '}
                            <div className="form-group col-6">
                                <div className="d-flex flex-column">
                                    <label>Màu chữ</label>
                                    <input
                                        type="color"
                                        name="name"
                                        className="w-100"
                                        value={formik.values.colorText}
                                        onChange={formik.handleChange('colorText')}
                                        onBlur={formik.handleBlur('colorText')}
                                    />
                                </div>
                                <div className="text-danger fs-6 mt-1">
                                    {formik.touched.colorText && formik.errors.colorText}
                                </div>
                            </div>
                            <div className="form-group col-6">
                                <div className="d-flex flex-column">
                                    <label>Màu nền</label>
                                    <input
                                        type="color"
                                        name="name"
                                        className="w-100"
                                        value={formik.values.colorBackground}
                                        onChange={formik.handleChange('colorBackground')}
                                        onBlur={formik.handleBlur('colorBackground')}
                                    />
                                </div>
                                <div className="text-danger fs-6 mt-1">
                                    {formik.touched.colorBackground && formik.errors.colorBackground}
                                </div>
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
