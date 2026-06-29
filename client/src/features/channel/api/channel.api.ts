import axiosInstance from "@watchloop/api/axios";
import type{ Channel } from "../types/channel.types";

export const getChannelProfile = async (
  username: string
): Promise<Channel> => {
  const response = await axiosInstance.get(
    `/users/c/${username}`
  );

  return response.data.data;
};

export const toggleSubscription = async (
  channelId: string
) => {
  const response = await axiosInstance.post(
    `/subscriptions/c/${channelId}`
  );

  return response.data.data;
};