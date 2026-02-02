import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const menuAPI = {
  getAvailable: () => api.get('/menu?availability=true'),
  search: (query) => api.get(`/menu/search?q=${query}`),
};

export const orderAPI = {
  create: (data) => api.post('/orders', data),
};

export default api;