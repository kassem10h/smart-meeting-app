import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7098", // ✅ match your backend URL (no /api here)
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
