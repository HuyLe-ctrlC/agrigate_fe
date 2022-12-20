import React, { useEffect, useRef } from 'react';
import { format } from 'date-fns';

export const ListItem = ({ data, openFormUpdate, deleteByID, handleSortChange }) => {
    const module = 'cpass';

    const handleOpenFormUpdate = (id) => {
        openFormUpdate(id);
    };
    const handleDelete = (id) => {
        deleteByID(id);
    };

    const handleUpdateSort = (e, id) => {
        handleSortChange(e, id);
    };
    return (
        <>
            {data?.map((item) => (
                <tr className="text-center" key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.card_number}</td>
                    <td>{item.cPass}</td>
                    <td>{item.name_cow_groups}</td>
                    <td>{item.name_farms}</td>
                    <td>{item.name_cow_breeds}</td>
                    <td>{item.gender === 0 ? 'Cái' : 'Đực'}</td>

                    <td>
                        <div className="d-flex mb-1">
                            <img
                                className="size-img-cpass "
                                src={`${process.env.REACT_APP_API_URL_IMAGE}/${module}/thumb/${item.name_image_one}`}
                                alt=""
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = require('../../assets/image/image-coming-soon.png');
                                }}
                            />
                            <img
                                src={`${process.env.REACT_APP_API_URL_IMAGE}/${module}/thumb/${item.name_image_two}`}
                                alt=""
                                className="mx-1 size-img-cpass"
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = require('../../assets/image/image-coming-soon.png');
                                }}
                            />
                            <img
                                className="size-img-cpass"
                                src={`${process.env.REACT_APP_API_URL_IMAGE}/${module}/thumb/${item.name_image_three}`}
                                alt=""
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = require('../../assets/image/image-coming-soon.png');
                                }}
                            />
                        </div>
                        <div className="d-flex">
                            <img
                                className="size-img-cpass"
                                src={`${process.env.REACT_APP_API_URL_IMAGE}/${module}/thumb/${item.name_image_four}`}
                                alt=""
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = require('../../assets/image/image-coming-soon.png');
                                }}
                            />
                            <img
                                src={`${process.env.REACT_APP_API_URL_IMAGE}/${module}/thumb/${item.name_image_five}`}
                                alt=""
                                className="mx-1 size-img-cpass"
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = require('../../assets/image/image-coming-soon.png');
                                }}
                            />
                            <img
                                className="size-img-cpass"
                                src={`${process.env.REACT_APP_API_URL_IMAGE}/${module}/thumb/${item.name_image_six}`}
                                alt=""
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = require('../../assets/image/image-coming-soon.png');
                                }}
                            />
                        </div>
                    </td>

                    <td className="text-center">{format(new Date(parseInt(item.birth_of_date)), 'dd/MM/yyyy')}</td>
                    <td>{item.pss}</td>
                    <td>{item.age}</td>
                    <td>{item.pnow}</td>
                    <td style={{ color: item.color_text }}>{item.name_conditions}</td>
                    <td style={{ color: item.color_text_wges }}>{item.name_wges}</td>
                    <td style={{ color: item.color_text_awgs }}>{item.name_awgs}</td>
                    <td>
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
                        {format(
                            new Date(
                                item.updated_at == null || item.updated_at === 0 ? item.created_at : item.updated_at,
                            ),
                            'dd/MM/yyyy',
                        )}
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
