import axiosInstance from "@watchloop/api/axios";
import type { ApiResponse } from "@watchloop/types/index";

import type {
  UserProfile,
  UpdateProfilePayload,
  ChangePasswordPayload,
} from "../types/profile.types";

export const profileApi = {
  getCurrentUser: async () => {
    const { data } =
      await axiosInstance.get<ApiResponse<UserProfile>>("/users/me");

    return data.data;
  },

  updateProfile: async (payload: UpdateProfilePayload) => {
    const { data } = await axiosInstance.patch<ApiResponse<UserProfile>>(
      "/users/update-account",
      payload,
    );

    return data.data;
  },

  updateAvatar: async (file: File) => {
    const formData = new FormData();

    formData.append("avatar", file);

    const { data } = await axiosInstance.patch<ApiResponse<UserProfile>>(
      "/users/avatar",
      formData,
    );

    return data.data;
  },

  updateCover: async (file: File) => {
    const formData = new FormData();

    formData.append("coverImage", file);

    const { data } = await axiosInstance.patch<ApiResponse<UserProfile>>(
      "/users/cover-image",
      formData,
    );

    return data.data;
  },

  changePassword: async (payload: ChangePasswordPayload) => {
    const { data } = await axiosInstance.post<
      ApiResponse<ChangePasswordPayload>
    >("/users/change-password", payload);

    return data;
  },
};
