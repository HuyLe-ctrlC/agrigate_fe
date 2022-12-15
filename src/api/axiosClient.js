import axios from 'axios';
import queryString from 'query-string';
import jwtDecode from 'jwt-decode';
import { date } from 'yup';
import { wait } from '@testing-library/user-event/dist/utils';
const getToken = async () => {
    const userToken = JSON.parse(localStorage.getItem('userInfo'));
    if (userToken) {
        return userToken;
    } else {
        return null;
    }
};

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    // const token = await getToken();
    // console.log(token);
    const token = localStorage.getItem('userInfo');
    const refreshToken = localStorage.getItem('refreshToken');
    // console.log(token);

    const decodeToken = jwtDecode(token);
    // console.log(decodeToken);
    if (decodeToken.exp < new Date().getTime() / 1000) {
        try {
            // console.log(123);
            const res = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API_URL}/admins/refreshToken`,
                data: { refreshToken },
            });
            // console.log("res", res);
            localStorage.setItem('userInfo', JSON.stringify(res.data.accessToken));
            config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        } catch (error) {
            // console.log(error);
        }
    } else if (token[0] == '"') {
        // console.log(token);
        const _token = token.slice(1, token.length - 1);
        config.headers.Authorization = `Bearer ${_token}`;
    } else {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const axiosUpload = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const axiosNotToken = axios.create({ baseURL: process.env.REACT_APP_API_URL });
axiosUpload.interceptors.request.use(async (config) => {
    // const token = await getToken();
    // console.log(token);
    const token = localStorage.getItem('userInfo');
    if (token[0] == '"') {
        // console.log(token);
        const _token = token.slice(1, token.length - 1);
        config.headers.Authorization = `Bearer ${_token}`;
    } else {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            // console.log(response.data);
            return response.data;
        }

        return response;
    },
    (error) => {
        // Handle errors
        throw error;
    },
);

export default axiosClient;
