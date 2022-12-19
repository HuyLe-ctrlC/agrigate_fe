import React from 'react';
import './style.css';
export const PageLoading = () => {
    return (
        <>
            <div className="pageLoading">
                <div className="bg-loading"></div>
                <div className="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    );
};
