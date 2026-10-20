import axiosInstance from "../../../api/axios";
import type { LoginInput } from "../types/auth.types";

export const loginUser = async (data: LoginInput) => {
  const response = await axiosInstance.post("/users/login", data);
  return response.data.data.user;
};

export const registerUser = async (formData: FormData) => {
  const response = await axiosInstance.post("/users/register", formData);

  return response.data.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post("/users/logout");

  return response.data.data;
};

export const refreshAccessToken = async () => {
  const response = await axiosInstance.post("/users/refresh-token");

  return response.data.data;
};
