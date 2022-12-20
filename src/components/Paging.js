import React from 'react';

export const Paging = (props) => {
    const { totalPage, currentPage, onchangePage, onPrevClickPage, onNextClickPage } = props;
    // console.log(totalPage);

    // change page
    const handleChangePage = (page) => {
        onchangePage(page);
    };

    const handlePrevClick = () => {
        onPrevClickPage();
    };
    const handleNextClick = () => {
        onNextClickPage();
    };

    // init number page array
    const pageNumbers = [];

    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }

    //render paging
    const renderPageNumbers = pageNumbers.map((number) => {
        let classActive = '';
        if (currentPage === number) {
            classActive = 'active';
        }
        return (
            <li className={'page-item ' + classActive + ''} key={number}>
                <button id={number} type="button" className="page-link" onClick={() => handleChangePage(number)}>
                    {number}
                </button>
            </li>
        );
    });

    return (
        <div className="row">
            <div className="col-lg-6"></div>
            <div className="col-lg-6">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                        <li className="page-item">
                            <button className="page-link" onClick={() => handlePrevClick()}>
                                Previous
                            </button>
                        </li>
                        {renderPageNumbers}
                        <li className="page-item">
                            <button className="page-link" onClick={() => handleNextClick()}>
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
