import axios from 'axios';

const token = localStorage.getItem('accessToken');

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        Authorization: token ? `Bearer ${token}` : '',
    },
});

export const setAuthToken = (accessToken) => {
    if (accessToken) {
        instance.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
        localStorage.setItem('accessToken', accessToken);
    } else {
        delete instance.defaults.headers['Authorization'];
        localStorage.removeItem('accessToken');
    }
};

export default instance;
