import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:  'https://stock-image-backend.onrender.com/api',
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
