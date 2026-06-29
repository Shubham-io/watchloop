import axiosInstance from "@watchloop/api/axios";
import type { Comment, CommentPagination } from "../types/comment.types";

export const getVideoComments = async (
  videoId: string,
  page = 1,
): Promise<CommentPagination> => {
  const response = await axiosInstance.get(
    `/comments/all-comments/${videoId}`,
    {
      params: {
        page,
      },
    },
  );

  return response.data.data;
};

export const createComment = async (
  videoId: string,
  comment: string,
): Promise<Comment> => {
  const response = await axiosInstance.post(
    `/comments/add-comment/${videoId}`,
    {
      comment,
    },
  );

  return response.data.data;
};

export const updateComment = async (
  commentId: string,
  comment: string,
): Promise<Comment> => {
  const response = await axiosInstance.patch(
    `/comments/update-comment/${commentId}`,
    {
      comment,
    },
  );

  return response.data.data;
};

export const deleteComment = async (commentId: string): Promise<void> => {
  const response = await axiosInstance.delete(
    `/comments/delete-comment/${commentId}`,
  );
  return response.data.data;
};
