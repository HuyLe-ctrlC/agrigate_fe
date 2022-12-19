import React from 'react';
import { format } from 'date-fns';
export const ListItem = ({ data, openFormUpdate, deleteByID, handleStatusChange, handleSortChange }) => {
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
                    <td>{item.name}</td>
                    <td>{item.name_cow_breeds}</td>
                    <td>{item.name_weight}</td>
                    <td className="text-center">
                        {format(
                            new Date(
                                item?.updated_at == null || item?.updated_at === 0 ? item.created_at : item.updated_at,
                            ),
                            'dd/MM/yyyy',
                        )}
                    </td>
                    <td>
                        {/* {item.id} */}
                        <input
                            className="text-center border-0 color-sort"
                            id={`sort-${item.id}`}
                            type="number"
                            min={0}
                            // defaultValue={item.sort || item.sort === 0 ? item.sort : sort}
                            value={item['sort']}
                            onChange={(e) => handleUpdateSort(e, item.id)}
                        />
                    </td>
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
