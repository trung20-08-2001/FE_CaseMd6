import axios from 'axios';

const token = '';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:8080',
});

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default axiosInstance;