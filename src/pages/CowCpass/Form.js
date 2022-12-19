import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { selectCowBreeds } from '../../redux/slices/cowBreedsSlice';
import { genderCow } from '../../constants/publish/publishConstant';
import { selectCowGroups } from '../../redux/slices/cowGroupsSlice';
import { selectCondition } from '../../redux/slices/conditionSlices';
import { selectAwg } from '../../redux/slices/awgSlices';
import { selectWge } from '../../redux/slices/wgeSlices';
import { selectcowCpass } from '../../redux/slices/cowCpassSlice';
import { format } from 'date-fns';
const formSchema = Yup.object({
    // name: Yup.string().required('*Dữ liệu bắt buộc!'),
    // code: Yup.string().required('*Dữ liệu bắt buộc!'),
});

export const Form = (props) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cPass, setCPass] = useState('');
    const [cowGroupID, setCowGroupID] = useState('');
    const [cowBreedID, setCowBreedID] = useState('');
    const [farmID, setFarmID] = useState('');
    const [gender, setGender] = useState('');
    const [birthOfDate, setBirthOfDate] = useState('');
    const [pss, setPss] = useState('');
    const [age, setAge] = useState('');
    const [pNow, setPNow] = useState('');
    const [conditionID, setConditionID] = useState('');
    const [wgeID, setWgeID] = useState('');
    const [awgID, setAwgID] = useState('');
    const [files, setFiles] = useState([]);
    // get props to index components
    const { closeForm, isUpdate, addData, dataFarm, updateDate } = props;
    // console.log(isUpdate);
    // get data update to redux
    const cowCpassData = useSelector(selectcowCpass);
    const { dataUpdate } = cowCpassData;
    const cowBreedsData = useSelector(selectCowBreeds);
    const cowGroupsData = useSelector(selectCowGroups);
    const conditionData = useSelector(selectCondition);
    const awgsData = useSelector(selectAwg);
    const wgesData = useSelector(selectWge);

    // console.log(dataUpdate);
    //useRef
    const inputRef = useRef();
    const inputNameRef = useRef();

    useEffect(() => {
        focus();
        if (isUpdate) {
            if (dataUpdate) {
                console.log('dataUpdate', dataUpdate[0]);
                if (dataUpdate[0]?.card_number !== undefined) {
                    setCardNumber(dataUpdate[0]?.card_number);
                }
                if (dataUpdate[0]?.cPass !== undefined) {
                    setCPass(dataUpdate[0]?.cPass);
                }
                if (dataUpdate[0]?.cow_group_ID !== undefined) {
                    setCowGroupID(dataUpdate[0]?.cow_group_ID);
                }
                if (dataUpdate[0]?.cow_breed_ID !== undefined) {
                    setCowBreedID(dataUpdate[0]?.cow_breed_ID);
                }
                if (dataUpdate[0]?.farm_ID !== undefined) {
                    setFarmID(dataUpdate[0]?.farm_ID);
                }
                if (dataUpdate[0]?.gender !== undefined) {
                    setGender(dataUpdate[0]?.gender);
                }
                if (dataUpdate[0]?.birth_of_date !== undefined) {
                    setBirthOfDate(format(new Date(dataUpdate[0]?.birth_of_date), 'yyyy-MM-dd'));
                }
                if (dataUpdate[0]?.pss !== undefined) {
                    setPss(dataUpdate[0]?.pss);
                }
                if (dataUpdate[0]?.age !== undefined) {
                    setAge(dataUpdate[0]?.age);
                }
                if (dataUpdate[0]?.pnow !== undefined) {
                    setPNow(dataUpdate[0]?.pnow);
                }
                if (dataUpdate[0]?.conditions_ID !== undefined) {
                    setConditionID(dataUpdate[0]?.conditions_ID);
                }
                if (dataUpdate[0]?.wge_ID !== undefined) {
                    setWgeID(dataUpdate[0]?.wge_ID);
                }
                if (dataUpdate[0]?.awg_ID !== undefined) {
                    setAwgID(dataUpdate[0]?.awg_ID);
                }
                if (dataUpdate[0]?.dataImage !== undefined) {
                    setFiles(Object.values(dataUpdate[0]?.dataImage));
                }
            }
        }
    }, [isUpdate, dataUpdate]);

    // close form event
    const handleCloseForm = () => {
        closeForm();
    };

    //update image
    const [imgData, setImgData] = useState([]);
    const onChangePicture = (e) => {
        setFiles(e.target.files);
        console.log('e.target.files', e.target.files);
        let allFile = e.target.files;
        // console.log(allFile);
        if (allFile.length > 0) {
            setImgData([]);
            Array.from(allFile).forEach((img, i) => {
                const reader = new FileReader();
                reader.onloadend = async function () {
                    // setFiles([...e.target.files, img]);
                    console.log('reader.result', reader.result);
                    setImgData((prev) => [...prev, reader.result]);
                    // setImgData(reader.result);
                };
                reader.readAsDataURL(img);
            });
        }
    };
    console.log(imgData);

    // update data event
    const handleUpdateData = () => {
        const id = dataUpdate[0]?.id;
        let formData = new FormData();
        formData.append('card_number', formik.values.cardNumber);
        formData.append('cPass', formik.values.cPass);
        formData.append('cow_group_ID', formik.values.cowGroupID);
        formData.append('cow_breed_ID', formik.values.cowBreedID);
        formData.append('farm_ID', formik.values.farmID);
        formData.append('gender', formik.values.gender);
        formData.append('birth_of_date', Date.parse(formik.values.birthOfDate));
        formData.append('pss', formik.values.pss);
        formData.append('age', formik.values.age);
        formData.append('pnow', formik.values.pNow);
        formData.append('conditions_ID', formik.values.conditionID);
        formData.append('wge_ID', formik.values.wgeID);
        formData.append('awg_ID', formik.values.awgID);

        for (let i = 0; i < files.length; i++) {
            formData.append('image', files[i]);
        }
        for (let value1 of formData) {
            console.log(value1[0], value1[1]);
        }
        updateDate(id, formData);
    };

    // create data event
    const handleAddData = () => {
        let formData = new FormData();
        formData.append('card_number', formik.values.cardNumber);
        formData.append('cPass', formik.values.cPass);
        formData.append('date_added', formik.values.dateAdded);
        formData.append('cow_group_ID', formik.values.cowGroupID);
        formData.append('cow_breed_ID', formik.values.cowBreedID);
        formData.append('farm_ID', formik.values.farmID);
        formData.append('gender', formik.values.gender);
        formData.append('birth_of_date', Date.parse(formik.values.birthOfDate));
        formData.append('pss', formik.values.pss);
        formData.append('age', formik.values.age);
        formData.append('pnow', formik.values.pNow);
        formData.append('conditions_ID', formik.values.conditionID);
        formData.append('wge_ID', formik.values.wgeID);
        formData.append('awg_ID', formik.values.awgID);

        for (let i = 0; i < files.length; i++) {
            formData.append('image', files[i]);
        }
        for (let value1 of formData) {
            console.log(value1[0], value1[1]);
        }
        addData(formData);
    };
    // check show button action
    const showButtonAction = () => {
        if (isUpdate) {
            return (
                <button
                    type="submit"
                    onClick={handleUpdateData}
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
                    onClick={handleAddData}
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
            cardNumber: cardNumber,
            cPass: cPass,
            cowGroupID: cowGroupID,
            cowBreedID: cowBreedID,
            farmID: farmID,
            gender: gender,
            birthOfDate: birthOfDate,
            pss: pss,
            age: age,
            pNow: pNow,
            conditionID: conditionID,
            wgeID: wgeID,
            awgID: awgID,
            image: files,
        },
        validationSchema: formSchema,
    });

    const focus = () => {
        inputRef.current?.focus();
    };
    // console.log('files', files);
    // console.log('preview', imgData.length);
    console.log(formik.values.birthOfDate);
    return (
        <div className="form-box w-50">
            <div className="form">
                <div className="title">Cập nhật dữ liệu</div>
                <button className="btn-close" onClick={() => handleCloseForm()}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="box">
                    <form className="user">
                        <div className="d-flex flex-wrap w-100">
                            <div className="form-group mx-3 width-cpass-cow">
                                <label>
                                    Số thẻ tai <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-user"
                                    name="cardNumber"
                                    value={formik.values.cardNumber}
                                    onChange={(e) => {
                                        formik.handleChange('cardNumber');
                                        setCardNumber(e.target.value);
                                    }}
                                    onBlur={formik.handleBlur('cardNumber')}
                                    ref={inputRef}
                                />
                                <div className="text-danger fs-6 mt-1">
                                    {formik.touched.cardNumber && formik.errors.cardNumber}
                                </div>
                            </div>
                            {!isUpdate && (
                                <div className="form-group mx-3 width-cpass-cow">
                                    <label>
                                        cPass <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control form-control-user"
                                        name="cPass"
                                        value={formik.values.cPass}
                                        onChange={(e) => {
                                            formik.handleChange('cPass');
                                            setCPass(e.target.value);
                                        }}
                                        onBlur={formik.handleBlur('cPass')}
                                        ref={inputRef}
                                    />
                                    <div className="text-danger fs-6 mt-1">
                                        {formik.touched.cPass && formik.errors.cPass}
                                    </div>
                                </div>
                            )}
                            <div className="form-group mx-3 width-cpass-cow">
                                <label>
                                    Ngày sinh <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="date"
                                    className="form-control form-control-user"
                                    name="birthOfDate"
                                    value={formik.values.birthOfDate}
                                    onChange={(e) => {
                                        formik.handleChange('birthOfDate');
                                        setBirthOfDate(e.target.value);
                                    }}
                                    onBlur={formik.handleBlur('birthOfDate')}
                                    ref={inputRef}
                                />
                                <div className="text-danger fs-6 mt-1">
                                    {formik.touched.birthOfDate && formik.errors.birthOfDate}
                                </div>
                            </div>
                            <div className="form-group width-cpass-cow mx-3">
                                <label>
                                    Cân nặng sơ sinh <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="number"
                                    className="form-control form-control-user"
                                    name="pss"
                                    value={formik.values.pss}
                                    onChange={(e) => {
                                        formik.handleChange('pss');
                                        setPss(e.target.value);
                                    }}
                                    onBlur={formik.handleBlur('pss')}
                                    ref={inputRef}
                                />
                                <div className="text-danger fs-6 mt-1">{formik.touched.pss && formik.errors.pss}</div>
                            </div>
                            <div className="form-group width-cpass-cow mx-3">
                                <label>
                                    Tuổi <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-user"
                                    name="age"
                                    value={formik.values.age}
                                    onChange={(e) => {
                                        formik.handleChange('age');
                                        setAge(e.target.value);
                                    }}
                                    onBlur={formik.handleBlur('age')}
                                    ref={inputRef}
                                />
                                <div className="text-danger fs-6 mt-1">{formik.touched.age && formik.errors.age}</div>
                            </div>
                            <div className="form-group width-cpass-cow mx-3">
                                <label>
                                    Cân nặng hiện tại <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="number"
                                    className="form-control form-control-user"
                                    name="pNow"
                                    value={formik.values.pNow}
                                    onChange={(e) => {
                                        formik.handleChange('pNow');
                                        setPNow(e.target.value);
                                    }}
                                    onBlur={formik.handleBlur('pNow')}
                                    ref={inputRef}
                                />
                                <div className="text-danger fs-6 mt-1">{formik.touched.pNow && formik.errors.pNow}</div>
                            </div>
                            <div className="form-group width-cpass-cow mx-3">
                                <label>
                                    Nhóm bò <span className="text-danger">*</span>
                                </label>
                                <div>
                                    <select
                                        className="form-select form-control-user w-100 p-2 border color-sort"
                                        value={formik.values.cowGroupID}
                                        onChange={(e) => {
                                            formik.handleChange('cowGroupID');
                                            setCowGroupID(e.target.value);
                                        }}
                                        onBlur={formik.handleBlur('cowGroupID')}
                                        ref={inputRef}
                                    >
                                        <option value="">-- Chọn --</option>
                                        {cowGroupsData?.data?.map((item, index) => (
                                            <option value={item.id} key={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="text-danger mt-1">
                                    {formik.touched.cowGroupID && formik.errors.cowGroupID}
                                </div>
                            </div>
                            <div className="form-group width-cpass-cow mx-3">
                                <label>
                                    Giống bò <span className="text-danger">*</span>
                                </label>
                                <div>
                                    <select
                                        className="form-select form-control-user w-100 p-2 border color-sort"
                                        value={formik.values.cowBreedID}
                                        onChange={(e) => {
                                            formik.handleChange('cowBreedID');
                                            setCowBreedID(e.target.value);
                                        }}
                                        onBlur={formik.handleBlur('cowBreedID')}
                                        ref={inputRef}
                                    >
                                        <option value="">-- Chọn --</option>
                                        {cowBreedsData?.data?.map((item, index) => (
                                            <option value={item.id} key={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="text-danger mt-1">
                                    {formik.touched.cowBreedID && formik.errors.cowBreedID}
                                </div>
                            </div>
                            <div className="form-group width-cpass-cow mx-3">
                                <label>
                                    Trang trại <span className="text-danger">*</span>
                                </label>
                                <div>
                                    <select
                                        className="form-select form-control-user w-100 p-2 border color-sort"
                                        value={formik.values.farmID}
                                        onChange={(e) => {
                                            formik.handleChange('farmID');
                                            setFarmID(e.target.value);
                                        }}
                                        onBlur={formik.handleBlur('farmID')}
                                        ref={inputRef}
                                    >
                                        <option value="">-- Chọn --</option>
                                        {dataFarm?.map((item, index) => (
                                            <option value={item.id} key={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="text-danger mt-1">{formik.touched.farmID && formik.errors.farmID}</div>
                            </div>
                            <div className="form-group width-cpass-cow mx-3">
                                <label>
                                    Cân nặng trung bình <span className="text-danger">*</span>
                                </label>
                                <div>
                                    <select
                                        className="form-select form-control-user w-100 p-2 border color-sort"
                                        value={formik.values.awgID}
                                        onChange={(e) => {
                                            formik.handleChange('awgID');
                                            setAwgID(e.target.value);
                                        }}
                                        onBlur={formik.handleBlur('awgID')}
                                        ref={inputRef}
                                    >
                                        <option value="">-- Chọn --</option>
                                        {awgsData?.data?.map((item, index) => (
                                            <option value={item.id} key={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="text-danger mt-1">{formik.touched.awgID && formik.errors.awgID}</div>
                            </div>{' '}
                            <div className="form-group width-cpass-cow mx-3">
                                <label>
                                    Thể trạng <span className="text-danger">*</span>
                                </label>
                                <div>
                                    <select
                                        className="form-select form-control-user w-100 p-2 border color-sort"
                                        value={formik.values.conditionID}
                                        onChange={(e) => {
                                            formik.handleChange('conditionID');
                                            setConditionID(e.target.value);
                                        }}
                                        onBlur={formik.handleBlur('conditionID')}
                                        ref={inputRef}
                                    >
                                        <option value="">-- Chọn --</option>
                                        {conditionData?.data?.map((item, index) => (
                                            <option value={item.id} key={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="text-danger mt-1">
                                    {formik.touched.conditionID && formik.errors.conditionID}
                                </div>
                            </div>
                            <div className="form-group width-cpass-cow mx-3">
                                <label>
                                    Hiệu quả tăng trọng <span className="text-danger">*</span>
                                </label>
                                <div>
                                    <select
                                        className="form-select form-control-user w-100 p-2 border color-sort"
                                        value={formik.values.wgeID}
                                        onChange={(e) => {
                                            formik.handleChange('wgeID');
                                            setWgeID(e.target.value);
                                        }}
                                        onBlur={formik.handleBlur('wgeID')}
                                        ref={inputRef}
                                    >
                                        <option value="">-- Chọn --</option>
                                        {wgesData?.data?.map((item, index) => (
                                            <option value={item.id} key={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="text-danger mt-1">{formik.touched.wgeID && formik.errors.wgeID}</div>
                            </div>
                            <div className="form-group width-cpass-cow mx-3">
                                <label>
                                    Giới tính <span className="text-danger">*</span>
                                </label>
                                <div>
                                    <select
                                        className="form-select form-control-user w-100 p-2 border color-sort"
                                        value={formik.values.gender}
                                        onChange={(e) => {
                                            formik.handleChange('gender');
                                            setGender(e.target.value);
                                        }}
                                        onBlur={formik.handleBlur('gender')}
                                        ref={inputRef}
                                    >
                                        <option value="">-- Chọn --</option>
                                        {genderCow?.map((item, index) => (
                                            <option value={item.value} key={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="text-danger mt-1">{formik.touched.gender && formik.errors.gender}</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>
                                Hình ảnh <span className="text-danger">*</span>
                            </label>
                            <input
                                multiple
                                type="file"
                                className="form-control input-type-file rounded-pill"
                                name="image"
                                onChange={onChangePicture}
                                onBlur={formik.handleBlur('image')}
                                accept="image/png, image/jpeg, image/jpg"
                            />
                            <div>
                                {(imgData.length &&
                                    imgData.map((img, index) => (
                                        <img
                                            key={index}
                                            id="imageProduct"
                                            className="img-thumbnail mt-2"
                                            src={img}
                                            alt="preview"
                                            hidden={files == '' ? true : false}
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null; // prevents looping
                                                currentTarget.src = require('../../assets/image/image-coming-soon.png');
                                            }}
                                        />
                                    ))) ||
                                    Array.from(files).map((img, index) => (
                                        <img
                                            key={index}
                                            id="imageProduct"
                                            className="size-thumb-tag img-thumbnail mt-2"
                                            src={`${process.env.REACT_APP_API_URL_IMAGE}/cpass/thumb/${files[index]}`}
                                            alt="preview"
                                            hidden={files == '' ? true : false}
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null; // prevents looping
                                                currentTarget.src = require('../../assets/image/image-coming-soon.png');
                                            }}
                                        />
                                    ))}
                            </div>

                            <div className="text-danger fs-6 mt-1">{formik.touched.image && formik.errors.image}</div>
                            <div className="text-danger fs-6 mt-1">
                                {files?.length === 0 ? '' : files?.length > 6 ? 'Tối đa là 6 file' : ''}
                                {files[0]?.size > 2097152 ||
                                files[1]?.size > 2097152 ||
                                files[2]?.size > 2097152 ||
                                files[3]?.size > 2097152 ||
                                files[4]?.size > 2097152 ||
                                files[5]?.size > 2097152
                                    ? '*Hình ảnh phải nhỏ hơn 2MB!'
                                    : ''}
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
