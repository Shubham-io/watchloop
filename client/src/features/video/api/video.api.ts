import axiosInstance from "@watchloop/api/axios";
import type {
  Video,
  GetVideosParams,
  PaginatedVideosResponse,
} from "../types/video.types";

export const getVideos = async (
  params?: GetVideosParams,
): Promise<PaginatedVideosResponse> => {
  const response = await axiosInstance.get("/videos", {
    params,
  });

  return response.data.data;
};

export const getVideoById = async (videoId: string): Promise<Video> => {
  const response = await axiosInstance.get(`/videos/${videoId}`);

  return response.data.data;
};
