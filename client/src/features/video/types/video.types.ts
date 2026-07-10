export interface VideoOwner {
  _id: string;
  username: string;
  fullname: string;
  avatar: string;
}

export interface VideoFile {
  url: string;
  public_id: string;
  resource_type: string;
  duration: number;
}

export interface Thumbnail {
  url: string;
  public_id: string;
  resource_type: string;
}

export interface Video {
  _id: string;
  title: string;
  description: string;
  thumbnail: Thumbnail;
  videoFile: VideoFile;
  views: number;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  owner: VideoOwner;
  likesCount: number;
  isLiked: boolean;
}

export interface PaginatedVideosResponse {
  docs: Video[];
  totalDocs: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type VideoSortBy = "createdAt" | "views" | "duration" | "title";
export type VideoSortType = "asc" | "desc";

export interface GetVideosParams {
  page?: number;
  limit?: number;
  query?: string;
  sortBy?: VideoSortBy;
  sortType?: VideoSortType;
  userId?: string;
}

export type SearchParams = {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "views" | "duration" | "title";
  sortType?: "asc" | "desc";
  userId?: string;
};

export type UploadProgress = {
  percentage: number;
  loaded: number;
  total: number;
  progress: number;
  isUploading: boolean;
  isFinalizing: boolean;
  
};

export type PublishVideoOptions = {
  onProgress?: (progress: UploadProgress) => void;
};
