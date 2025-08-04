import Axios from 'axios';

// cuanto tenga login
const getToken = () => localStorage.getItem("auth_token");

const axios = Axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
  headers: {
    "Accept": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
