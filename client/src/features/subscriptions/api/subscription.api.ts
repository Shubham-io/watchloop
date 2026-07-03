import axiosInstance from "@watchloop/api/axios";

import type {
  SubscribersResponse,
  SubscribedChannelsResponse,
  ToggleSubscriptionResponse,
} from "../types/subscription.types";

export const getSubscribers = async (
  channelId: string,
): Promise<SubscribersResponse> => {
  const response = await axiosInstance.get(`/subscriptions/c/${channelId}`);

  return response.data.data;
};

export const getSubscribedChannels = async (
  subscriberId: string,
): Promise<SubscribedChannelsResponse> => {
  const response = await axiosInstance.get(`/subscriptions/s/${subscriberId}`);

  return response.data.data;
};

export const toggleSubscription = async (
  channelId: string,
): Promise<ToggleSubscriptionResponse> => {
  const response = await axiosInstance.post(`/subscriptions/c/${channelId}`
  );

  return response.data.data;
};
