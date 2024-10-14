import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://stock-image-backend.onrender.com/api' 
    : 'http://localhost:10000/api',
  withCredentials: true,  
});

export default axiosInstance;

