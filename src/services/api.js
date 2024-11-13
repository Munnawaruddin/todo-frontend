// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks'; // Change this URL to match your backend

// Axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
});

// Add JWT token to headers for authenticated requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
