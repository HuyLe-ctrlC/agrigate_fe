import React, { useState } from "react";

export const Search = (props) => {
    const [keySearch, setKeySearch] = useState('');
    const { handleSearch } = props;

    
    // search event
    const handleClickSearch = () => {
        handleSearch(keySearch);
    }

    return (
        <div className="input-group">
            <input
                type="text"
                className="form-control bg-light ml-0 small"
                placeholder="Tìm kiếm..."
                onChange={(e) => setKeySearch(e.target.value)}
                value={keySearch}
            />
            <div className="input-group-append">
                <button type="button" className="btn btn-primary" onClick={(() => handleClickSearch())}>
                    <i className="fas fa-search fa-sm" />
                </button>
            </div>
        </div>
    );
};
