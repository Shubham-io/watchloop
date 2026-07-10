export interface CommentOwner {
  _id: string;
  username: string;
  fullname: string;
  avatar: string;
}

export interface Comment {
  _id: string;
  content: string;
  video: string;
  owner: CommentOwner;
  likesCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommentPagination {
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
}
