import axios from 'axios';

const Axios = axios.create({
    BASE_URL: '',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    withCredentials: false,
});

export default Axios;