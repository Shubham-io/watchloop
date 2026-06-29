export interface Channel {
  _id: string;
  username: string;
  email: string;
  fullname: string;
  avatar: string;
  coverImage: string;
  subscribersCount: number;
  channelSubscribedTo: number;
  isSubscribed: boolean;
}