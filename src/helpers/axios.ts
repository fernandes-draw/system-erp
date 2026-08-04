import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { getAccessToken, getRefreshToken, setUserData } from "../hooks/user.actions";
import type { AuthState } from "../types/auth";

const axiosService = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosService.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosService.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401 && err.config && !err.config._retry) {
      err.config._retry = true;
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        localStorage.removeItem("auth");
        window.location.href = "/login/";
        return Promise.reject(err);
      }

      try {
        const resp = await axios.post<AuthState>(
          "http://localhost:8000/api/auth/refresh/",
          { refresh: refreshToken }
        );
        setUserData(resp.data);
        err.config.headers.Authorization = `Bearer ${resp.data.access}`;
        return axiosService(err.config);
      } catch (refreshErr) {
        localStorage.removeItem("auth");
        window.location.href = "/login/";
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  }
);

export default axiosService;