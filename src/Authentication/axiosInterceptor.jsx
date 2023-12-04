// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add a request interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for refreshing token or handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refresh_token");
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axiosInstance
        .post("/core/api/token/refresh/", { refresh: refreshToken })
        .then((res) => {
          localStorage.setItem("access_token", res.data.access);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.access}`;
          return axiosInstance(originalRequest);
        });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
