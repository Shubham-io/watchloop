export interface ToggleLikeResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {};
}

export interface GetVideoCommentsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    docs: Comment[];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
}

export type LikeType = "video" | "comment";
