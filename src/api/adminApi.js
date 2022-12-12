import axiosClient from './axiosClient';

const module = 'admins';

const adminApi = {
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
        return axiosClient.post(url, data);
    },
    update: (id, body) => {
        const url = `/${module}/update/${id}`;
        return axiosClient.put(url, body);
    },
    delete: (id) => {
        const url = `/${module}/delete/${id}`;
        return axiosClient.delete(url);
    },
    status: (id, body) => {
        const url = `/${module}/update-active/${id}`;
        return axiosClient.put(url, { data: body });
    },
    login: (body) => {
        const url = `/${module}/login`;
        return axiosClient({ method: 'POST', url, data: body });
    },
    forgot: (data) => {
        const url = `/${module}/forgot-password`;
        return axiosClient.post(url, data);
    },

    updatePassword: (id, body) => {
        const url = `/${module}/changePassword/${id}`;
        return axiosClient.put(url, body);
    },
    getInfo: (id) => {
        const url = `/${module}/getbyid/${id}`;
        return axiosClient.get(url);
    },
};

export default adminApi;
