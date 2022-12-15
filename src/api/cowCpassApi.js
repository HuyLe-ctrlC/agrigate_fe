import axiosClient, { axiosUpload } from './axiosClient';

const module = 'cow-cpass';

const cowCpassApi = {
    getAll: (params) => {
        const url = `/${module}/getall`;
        return axiosClient.get(url, { params });
    },
    getById: (id) => {
        const url = `/${module}/getbyid/${id}`;
        return axiosClient.get(url);
    },
    add: (data) => {
        const url = `/${module}/create`;
        return axiosUpload.post(url, data);
    },
    update: (id, body) => {
        const url = `/${module}/update/${id}`;
        return axiosUpload.put(url, body);
    },
    delete: (id) => {
        const url = `/${module}/delete/${id}`;
        return axiosClient.delete(url);
    },
    status: (id, body) => {
        const url = `/${module}/update-publish/${id}`;
        return axiosClient.put(url, body);
    },
    sort: (id, body) => {
        const url = `/${module}/update-sort/${id}`;
        return axiosClient.put(url, body);
    },
};

export default cowCpassApi;