import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:'https://stock-image-api.onrender.com/api',
  withCredentials: true,  
});

export default axiosInstance;

