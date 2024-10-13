import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:  'http://localhost:5000/api',
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
