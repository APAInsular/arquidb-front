import Axios from 'axios';

// cuanto tenga login
const getToken = () => localStorage.getItem("auth_token");

const axios = Axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Accept": "application/json",
  },
});

// Interceptor: añade el token actual en cada petición
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
