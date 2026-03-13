import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return Promise.reject("Token expired");
        }

        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
