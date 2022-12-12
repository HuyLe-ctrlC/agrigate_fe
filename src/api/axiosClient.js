import axios from 'axios';
import queryString from 'query-string';

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
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoyLCJpYXQiOjE2NjkxMDkxMTcsImV4cCI6MTY2OTE5NTUxN30.K3Lv96kyvaW1rsDUJvQyc19HG9EByPMnQcKvtMurLYE';
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
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
