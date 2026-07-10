import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleCommentLike } from "../api/like.api";
import type { CommentPagination } from "@watchloop/features/comment/types/comment.types";

interface ToggleCommentLikeVariables {
  commentId: string;
  videoId: string;
  page: number;
}

export const useToggleCommentLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: ToggleCommentLikeVariables) =>
      toggleCommentLike(commentId),

    onMutate: async ({ commentId, videoId, page }) => {
      await queryClient.cancelQueries({
        queryKey: ["comments", videoId, page],
      });

      const previousComments = queryClient.getQueryData<CommentPagination>([
        "comments",
        videoId,
        page,
      ]);

      queryClient.setQueryData<CommentPagination>(
        ["comments", videoId, page],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            docs: old.docs.map((comment) => {
              if (comment._id !== commentId) {
                return comment;
              }

              return {
                ...comment,
                isLiked: !comment.isLiked,
                likesCount: comment.isLiked
                  ? comment.likesCount - 1
                  : comment.likesCount + 1,
              };
            }),
          };
        },
      );

      return { previousComments };
    },

    onError: (_error, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["comments", variables.videoId, variables.page],
          context.previousComments,
        );
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.videoId, variables.page],
      });
    },
  });
};
