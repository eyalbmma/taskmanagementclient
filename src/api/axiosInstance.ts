import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7099',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
