export interface SubscriptionUser {
  _id: string;
  username: string;
  fullname: string;
  avatar: string;
}

export interface SubscribersResponse {
  subscribers: SubscriptionUser[];
  totalSubscribers: number;
}

export interface SubscribedChannelsResponse {
  channels: SubscriptionUser[];
  totalChannels: number;
}

export interface ToggleSubscriptionResponse {
  isSubscribed: boolean;
}