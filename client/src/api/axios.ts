import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { store } from "@watchloop/store/store";
import { logout } from "@watchloop/features/auth/authSlice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
  withCredentials: true,
});

type RetriableRequest = InternalAxiosRequestConfig & { _retry?: boolean };

// A 401 from these endpoints means bad credentials, not an expired session
const AUTH_ENDPOINTS = ["/users/login", "/users/register", "/users/refresh-token"];

// Shared promise so concurrent 401s trigger only one refresh request
let refreshPromise: Promise<void> | null = null;

const refreshSession = () => {
  refreshPromise ??= axiosInstance
    .post("/users/refresh-token")
    .then(() => undefined)
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequest | undefined;

    const shouldRefresh =
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !AUTH_ENDPOINTS.some((url) => originalRequest.url?.includes(url));

    if (!shouldRefresh) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await refreshSession(); // server sets new cookies
      return axiosInstance(originalRequest);
    } catch {
      store.dispatch(logout());
      return Promise.reject(error);
    }
  },
);

export default axiosInstance;
