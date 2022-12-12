import { useFormik } from 'formik';
import React, { useState } from 'react';

export const Search = (props) => {
    const [keySearch, setKeySearch] = useState('');
    const { handleSearch, dataCowBreed, dataWeightP0 } = props;
    const [cowBreedSelected] = useState('');
    const [weightP0Selected] = useState('');
    // search event
    const handleClickSearch = () => {
        // handleSearch(keySearch + formik.values.cowBreedSelected + +formik.values.weightP0Selected);
        handleSearch(keySearch);
    };

    //formik
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            cowBreedSelected: cowBreedSelected,
            weightP0Selected: weightP0Selected,
        },
    });

    return (
        <div className="d-flex">
            {/* <select
                className="form-select form-control w-50 border-0 p-n5 rounded color-sort mr-2 "
                // defaultValue={selectedCity}
                value={formik.values.cowBreedSelected}
                onChange={formik.handleChange('cowBreedSelected')}
                onBlur={formik.handleBlur('cowBreedSelected')}
            >
                <option value="">-- Chọn giống bò---</option>
                {dataCowBreed?.map((item, index) => (
                    <option value={item.id} key={index}>
                        {item.name}
                    </option>
                ))}
            </select>
            <select
                className="form-select form-control w-50 border-0 p-n5 rounded color-sort mr-2 "
                // defaultValue={selectedCity}
                value={formik.values.weightP0Selected}
                onChange={formik.handleChange('weightP0Selected')}
                onBlur={formik.handleBlur('weightP0Selected')}
            >
                <option value="">-- Chọn -</option>
                {dataWeightP0?.map((item, index) => (
                    <option value={item.id} key={index}>
                        {item.name}
                    </option>
                ))}
            </select> */}
            <div className="input-group">
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
