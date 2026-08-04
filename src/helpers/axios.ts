// src/helpers/axios.js
import axios from "axios";
import { getAccessToken, getRefreshToken } from "../hooks/user.actions";

const axiosService = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de Requisição: injeta o token de acesso
axiosService.interceptors.request.use(async (config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de Resposta: lida com o refresh automático caso o token expire (401)
axiosService.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && err.config && !err.config._retry) {
      err.config._retry = true;
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        localStorage.removeItem("auth");
        window.location.href = "/login/";
        return Promise.reject(err);
      }

      return axios
        .post("/auth/refresh/", { refresh: refreshToken }, {
          baseURL: "http://localhost:8000/api",
        })
        .then((resp) => {
          const { access, refresh, user } = resp.data;

          err.config.headers["Authorization"] = "Bearer " + access;

          localStorage.setItem("auth", JSON.stringify({ access, refresh, user }));

          return axiosService(err.config);
        })
        .catch((refreshErr) => {
          localStorage.removeItem("auth");
          window.location.href = "/login/";
          return Promise.reject(refreshErr);
        });
    }
    return Promise.reject(err);
  }
);

export default axiosService;