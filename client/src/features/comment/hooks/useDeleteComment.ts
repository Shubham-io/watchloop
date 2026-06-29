import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../api/comment.api";

export const useDeleteComment = (
  videoId: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", videoId],
      });
    },
  });
};