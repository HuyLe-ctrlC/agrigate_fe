import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteAction, sortAction, statusPublishAction } from '../../redux/slices/wgeSlices';
import { format } from 'date-fns';

export const ListItem = ({ data, openFormUpdate, deleteByID, handleStatusChange, handleSortChange }) => {
    const dispatch = useDispatch();

    const handleOpenFormUpdate = (id) => {
        openFormUpdate(id);
    };

    const handleDelete = (id) => {
        deleteByID(id);
    };

    const handleStatus = (e, id) => {
        handleStatusChange(e, id);
    };

    const handleUpdateSort = (e, id) => {
        handleSortChange(e, id);
    };

    return (
        <>
            {data?.map((item) => (
                <tr className="text-center" key={item.id}>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>
                        <div>
                            <input
                                className="text-center border-0 color-sort"
                                id={`sort-${item.id}`}
                                type="number"
                                min={0}
                                // defaultValue={item.sort || item.sort === 0 ? item.sort : sort}
                                value={item['sort']}
                                onChange={(e) => handleUpdateSort(e, item.id)}
                            />
                        </div>
                    </td>
                    <td className="text-center">
                        {format(
                            new Date(
                                item?.updated_at == null || item?.updated_at === 0 ? item.created_at : item.updated_at,
                            ),
                            'dd/MM/yyyy',
                        )}
                    </td>
                    <td>{new Intl.NumberFormat('de-DE').format(item.min_value)}</td>
                    <td>{new Intl.NumberFormat('de-DE').format(item.max_value)}</td>
                    {/* <td>{item.min_value}</td>
                    <td>{item.max_value}</td> */}
                    <td className="text-center">
                        <div className="custom-control custom-switch">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`publish_${item.id}`}
                                checked={item.publish}
                                onChange={(e) => handleStatus(e, item.id)}
                            />
                            <label className="custom-control-label" htmlFor={`publish_${item.id}`}></label>
                        </div>
                    </td>
                    <td className="px-6 whitespace-nowrap text-sm text-gray-500 text-center">
                        <button className="btn btn-info btn-circle" onClick={() => handleOpenFormUpdate(item.id)}>
                            <i className="fa-solid fa-pencil"></i>
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-circle ml-2">
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
};
