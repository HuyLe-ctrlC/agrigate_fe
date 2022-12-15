import React, { useState } from 'react';
import { useFormik } from 'formik';
import { publishType } from '../../constants/publish/publishConstant';

export const Search = (props) => {
    const [keySearch, setKeySearch] = useState('');
    const { handleSearch } = props;
    const [publishSelected] = useState('');
    const [cowGroup, setCowGroup] = useState('');
    const [conditions, setConditions] = useState('');
    // const [wge, setWge] = useState('');
    // const [awg, setAwg] = useState('');
    const [cowBreeds, setCowBreeds] = useState('');
    const [farm, setFarm] = useState('');
    // search event
    const handleClickSearch = () => {
        handleSearch(keySearch.trim(), formik.values.publishSelected);
    };
    //formik
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            farm,
            cowGroup,
            cowBreeds,
            conditions,
        },
    });

    return (
        <div className="d-flex">
            <select
                className="form-select form-control w-50 border-0 p-n5 rounded color-sort mr-2 "
                // defaultValue={selectedCity}
                value={formik.values.farm}

                // onBlur={formik.handleBlur('farm')}
            >
                <option value="">-- Chọn trang trại--</option>
                {publishType?.map((item, index) => (
                    <option value={item.value} key={index}>
                        {item.label}
                    </option>
                ))}
            </select>
            <select
                className="form-select form-control w-50 border-0 p-n5 rounded color-sort mr-2 "
                // defaultValue={selectedCity}
                value={formik.values.cowGroup}
                // onChange={formik.handleChange('publishSelected')}
                // onBlur={formik.handleBlur('publishSelected')}
            >
                <option value="">-- Chọn nhóm bò--</option>
                {publishType?.map((item, index) => (
                    <option value={item.value} key={index}>
                        {item.label}
                    </option>
                ))}
            </select>{' '}
            <select
                className="form-select form-control w-50 border-0 p-n5 rounded color-sort mr-2 "
                // defaultValue={selectedCity}
                value={formik.values.cowBreeds}
                // onChange={formik.handleChange('publishSelected')}
                // onBlur={formik.handleBlur('publishSelected')}
            >
                <option value="">-- Chọn giống bò--</option>
                {publishType?.map((item, index) => (
                    <option value={item.value} key={index}>
                        {item.label}
                    </option>
                ))}
            </select>{' '}
            <select
                className="form-select form-control w-50 border-0 p-n5 rounded color-sort mr-2 "
                // defaultValue={selectedCity}
                value={formik.values.conditions}
                // onChange={formik.handleChange('publishSelected')}
                // onBlur={formik.handleBlur('publishSelected')}
            >
                <option value="">-- Chọn thể trạng--</option>
                {publishType?.map((item, index) => (
                    <option value={item.value} key={index}>
                        {item.label}
                    </option>
                ))}
            </select>{' '}
            <div className="input-group w-75">
                <input
                    type="text"
                    className="form-control bg-light ml-0 small"
                    placeholder="Tìm kiếm..."
                    onChange={(e) => setKeySearch(e.target.value)}
                    value={keySearch}
                />
                <div className="input-group-append">
                    <button type="button" className="btn btn-primary" onClick={() => handleClickSearch()}>
                        <i className="fas fa-search fa-sm" />
                    </button>
                </div>
            </div>
        </div>
    );
};
