import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteAction, sortAction, statusPublishAction } from '../../redux/slices/cowBreedsSlice';
import { format } from 'date-fns';

export const ListItem = ({ data, openFormUpdate }) => {
    const module = 'cpass';
    const [checked, setChecked] = useState();
    const dispatch = useDispatch();

    const handleOpenFormUpdate = (id) => {
        openFormUpdate(id);
    };
    // delete data event
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Bạn có chắc muốn xóa dữ liệu này không?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteAction(id));
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Xóa dữ liệu thành công',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else if (result.isDenied) {
                Swal.fire('Bạn vẫn chưa xóa!', '', 'info');
            }
        });
    };

    const handleStatus = async (e, id) => {
        const publish = e.target.checked;
        const resultAction = await dispatch(statusPublishAction({ id, publish }));
        if (statusPublishAction.fulfilled.match(resultAction)) {
            // const msg = resultAction.payload;
            // console.log(msg);
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                width: 500,
            });

            Toast.fire({
                icon: 'success',
                title: 'Cập nhật dữ liệu thành công!',
            });
        } else {
            // console.log(resultAction.payload);
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                width: 500,
            });

            Toast.fire({
                icon: 'error',
                title: 'Cập nhật dữ liệu thất bại!',
            });
        }
    };

    //handle update sort
    const [sort, setSort] = useState('');
    const handleUpdateSort = async (e, id) => {
        // console.log(e.target.value);
        const sort = e.target.value;
        // console.log(id);
        if (!!sort) {
            setSort(e.target.value);
            const resultAction = await dispatch(sortAction({ id, sort }));
            if (sortAction.fulfilled.match(resultAction)) {
                // const msg = resultAction.payload;
                // console.log(msg);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    width: 500,
                });

                Toast.fire({
                    icon: 'success',
                    title: 'Cập nhật dữ liệu thành công!',
                });
            } else {
                // console.log(resultAction.payload);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    width: 500,
                });

                Toast.fire({
                    icon: 'error',
                    title: 'Cập nhật dữ liệu thất bại!',
                });
            }
        }
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
                    <td>{item.gender}</td>

                    <td>
                        {!!item.dataImage ? (
                            <>
                                <h1>hello</h1>
                                <div className="d-flex mb-1">
                                    <img
                                        className="size-img-cpass "
                                        src={`${process.env.REACT_APP_API_URL_IMAGE}/${module}/thumb/${item.dataImage.name_image_one}`}
                                        alt=""
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = require('../../assets/image/image-coming-soon.png');
                                        }}
                                    />
                                    <img
                                        src={`${process.env.REACT_APP_API_URL_IMAGE}/${module}/thumb/${item.dataImage.name_image_two}`}
                                        alt=""
                                        className="mx-1 size-img-cpass"
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = require('../../assets/image/image-coming-soon.png');
                                        }}
                                    />
                                    <img
                                        className="size-img-cpass"
                                        src={`${process.env.REACT_APP_API_URL_IMAGE}/${module}/thumb/${item.dataImage.name_image_three}`}
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
                                        src={`${process.env.REACT_APP_API_URL_IMAGE}/${module}/thumb/${item.dataImage.name_image_four}`}
                                        alt=""
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = require('../../assets/image/image-coming-soon.png');
                                        }}
                                    />
                                    <img
                                        src={`${process.env.REACT_APP_API_URL_IMAGE}/${module}/thumb/${item.dataImage.name_image_five}`}
                                        alt=""
                                        className="mx-1 size-img-cpass"
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = require('../../assets/image/image-coming-soon.png');
                                        }}
                                    />
                                    <img
                                        className="size-img-cpass"
                                        src={`${process.env.REACT_APP_API_URL_IMAGE}/${module}/thumb/${item.dataImage.name_image_six}`}
                                        alt=""
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = require('../../assets/image/image-coming-soon.png');
                                        }}
                                    />
                                </div>
                            </>
                        ) : (
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
                        )}
                    </td>

                    <td className="text-center">{format(new Date(item.birth_of_date), 'dd/MM/yyyy')}</td>
                    <td>{item.pss}</td>
                    <td>{item.age}</td>
                    <td>{item.pnow}</td>
                    <td>{item.name_conditions}</td>
                    <td>{item.name_wges}</td>
                    <td>{item.name_awgs}</td>
                    <td>
                        <input
                            className="text-center border-0 color-sort"
                            id={`sort-${item.id}`}
                            type="text"
                            defaultValue={item.sort || item.sort === 0 ? item.sort : sort}
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
                    {/* <td className="text-center">
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
                    </td> */}
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
