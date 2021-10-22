import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.50.176.43:3001',
  });

  export default api;