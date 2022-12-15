import axios from 'axios';
import axiosClient, { axiosNotToken } from './axiosClient';

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
        // console.log('body', body);
        return axiosClient.put(url, body);
    },
    login: (body) => {
        const url = `${process.env.REACT_APP_API_URL}/${module}/login`;
        // console.log(url);
        // console.log(body);
        return axios({ method: 'POST', url, data: body });
    },
    forgot: (data) => {
        const url = `/${module}/forgot-password`;
        return axiosNotToken.post(url, data);
    },

    updatePassword: (id, body) => {
        const url = `/${module}/changePassword/${id}`;
        return axiosClient.put(url, body);
    },
    getInfo: (id) => {
        const url = `/${module}/getbyid/${id}`;
        // console.log(url);
        return axiosClient.get(url);
    },
};

export default adminApi;
