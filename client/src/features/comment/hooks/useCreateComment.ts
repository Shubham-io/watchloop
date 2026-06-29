import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../api/comment.api";

export const useCreateComment = (videoId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: string) => createComment(videoId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", videoId],
      });
    },
  });
};
