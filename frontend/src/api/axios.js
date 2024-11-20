import axios from 'axios';

const token = localStorage.getItem('token'); // Replace with your token storage logic

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        Authorization: token ? `Bearer ${token}` : '', // Add token if it exists
    },
});

export default instance;
