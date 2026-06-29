import axiosInstance from "@watchloop/api/axios";
import type {
  Video,
  GetVideosParams,
  PaginatedVideosResponse,
  PublishVideoOptions,
} from "../types/video.types";
import type { UploadVideoFormValues } from "../schemas/upload-video.schema";
import { buildVideoFormData } from "../utils/video-form-data";

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

export const publishVideo = async (
  values: UploadVideoFormValues,
  options?: PublishVideoOptions,
): Promise<Video> => {
  const formData = buildVideoFormData(values);

  const response = await axiosInstance.post("/videos/publish", formData, {
    onUploadProgress: (event) => {
      console.log("Progress Event:", {
        loaded: event.loaded,
        total: event.total,
      });
      if (!event.total) return;

      const percentage = Math.round((event.loaded * 100) / event.total);
      const progress = event.loaded / event.total;

      options?.onProgress?.({
        percentage,
        progress,
        isUploading: percentage < 100,
        isFinalizing: percentage === 100,
        loaded: event.loaded,
        total: event.total,
      });
    },
  });

  return response.data.data;
};
