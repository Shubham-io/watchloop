import axiosInstance from "@watchloop/api/axios";

import type {
  ChannelStats,
  ChannelVideo,
  Subscriber,
} from "../types/dashboard.types";

export const getChannelStats = async (): Promise<ChannelStats> => {
  const { data } = await axiosInstance.get("/dashboard/stats");

  return data.data;
};

export const getChannelVideos = async (): Promise<ChannelVideo[]> => {
  const { data } = await axiosInstance.get("/dashboard/videos");

  return data.data.videoList;
};

export const getSubscribers = async (
  channelId: string,
): Promise<Subscriber[]> => {
  const { data } = await axiosInstance.get(`/subscriptions/c/${channelId}`);

  return data.data.subscribers;
};

// export const updateVideo = async (
//   videoId: string,
//   payload: UpdateVideoPayload,
// ): Promise<ChannelVideo> => {
//   const formData = new FormData();

//   formData.append("title", payload.title);

//   formData.append("description", payload.description);

//   if (payload.thumbnail) {
//     formData.append("thumbnail", payload.thumbnail);
//   }

//   const { data } = await axiosInstance.patch(
//     `/videos/update-video/${videoId}`,
//     formData,
//   );

//   return data.data;
// };

export const updateVideo = async (videoId: string, formData: FormData) => {
  const { data } = await axiosInstance.patch(
    `/videos/update-video/${videoId}`,
    formData,
  );

  return data.data;
};

export const deleteVideo = async (videoId: string) => {
  await axiosInstance.delete(`/videos/delete/${videoId}`);
};

export const togglePublishStatus = async (
  videoId: string,
  isPublished: boolean,
): Promise<ChannelVideo> => {
  const { data } = await axiosInstance.patch(
    `/videos/publish-status/${videoId}`,
    {
      isPublished,
    },
  );

  return data.data;
};

 