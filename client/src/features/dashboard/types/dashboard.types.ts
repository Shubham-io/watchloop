export interface ChannelStats {
  totalSubscribers: number;
  totalVideos: number;
  totalViews: number;
  totalLikes: number;
}

export interface ChannelVideo {
  _id: string;

  title: string;
  description: string;

  views: number;
  likesCount: number;

  isPublished: boolean;

  createdAt: string;

  thumbnail: {
    url: string;
    public_id: string;
    resource_type: string;
  };
}

export interface Subscriber {
  _id: string;
  username: string;
  fullname: string;
  avatar: string;
}

export interface UpdateVideoPayload {
  title: string;
  description: string;
  thumbnail?: File;
}

export interface TogglePublishPayload {
  isPublished: boolean;
}