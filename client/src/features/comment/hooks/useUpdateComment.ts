import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "../api/comment.api";

export const useUpdateComment = (videoId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      comment,
    }: {
      commentId: string;
      comment: string;
    }) => updateComment(commentId, comment),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", videoId],
      });
    },
  });
};
