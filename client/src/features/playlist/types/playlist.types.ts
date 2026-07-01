import type { Video } from "@watchloop/features/video/types/video.types";

export type PlaylistVideoOwner = {
  _id: string;
  username: string;
  fullname: string;
  avatar: string;
};

export type Thumbnail = {
  url: string;
  public_id: string;
  resource_type: string;
};

export type PlaylistVideo = {
  _id: string;
  title: string;
  views: number;
  createdAt: string;
  thumbnail: Thumbnail;
  owner: PlaylistVideoOwner;
};

export type PlaylistOwner = {
  _id: string;
  username: string;
  fullname: string;
  avatar: string;
};

export type Playlist = {
  _id: string;
  name: string;
  description: string;
  videos: Video[];
  owner: string | PlaylistOwner;
  createdAt: string;
  updatedAt: string;
};

export interface PlaylistSummary {
  _id: string;
  name: string;
  description: string;
  videos: string[];
  owner: PlaylistOwner;
  createdAt: string;
  updatedAt: string;
}
