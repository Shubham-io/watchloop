import axiosInstance from "@watchloop/api/axios";
import type { ToggleLikeResponse } from "../types/like.types";

export const toggleVideoLike = async (
  videoId: string,
): Promise<ToggleLikeResponse> => {
  const { data } = await axiosInstance.post<ToggleLikeResponse>(
    `/likes/toggle/v/${videoId}`,
  );

  return data;
};

export const toggleCommentLike = async (
  commentId: string
): Promise<ToggleLikeResponse> => {
  const { data } = await axiosInstance.post<ToggleLikeResponse>(
    `/likes/toggle/c/${commentId}`
  );

  return data;
};
