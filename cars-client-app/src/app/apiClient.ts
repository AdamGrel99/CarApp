import axios from 'axios';
import { store } from './store';

const apiClient = axios.create({
  baseURL: 'https://localhost:7072/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;