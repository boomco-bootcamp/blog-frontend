import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://192.168.0.63:8080',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    withCredentials: false,
});


Axios.interceptors.request.use(
    (config) => {
        // 로컬 스토리지에서 토큰을 가져옴
        const token = localStorage.getItem('authToken');

        // 토큰이 있으면 Authorization 헤더에 추가
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default Axios;