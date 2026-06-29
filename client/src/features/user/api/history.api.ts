import  axiosInstance  from "@watchloop/api/axios";
import type { ApiResponse } from "@watchloop/types/index";
import type { Video } from "@watchloop/features/video/types/video.types";

export const getWatchHistory = async (): Promise<Video[]> => {
  const response = await axiosInstance.get<ApiResponse<Video[]>>(
    "/users/history"
  );

  return response.data.data;
};        