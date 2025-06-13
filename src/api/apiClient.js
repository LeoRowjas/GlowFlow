import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Предполагаемый базовый URL вашего бэкенда

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавление интерцептора для включения токена авторизации
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Или sessionStorage, в зависимости от того, где храните
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient; 