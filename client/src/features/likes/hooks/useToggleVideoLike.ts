import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleVideoLike } from "../api/like.api";
import type { Video } from "@watchloop/features/video/types/video.types";

export const useToggleVideoLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleVideoLike,

    onMutate: async (videoId: string) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ["video", videoId],
      });

      // Snapshot the previous value
      const previousVideo = queryClient.getQueryData<Video>([
        "video",
        videoId,
      ]);

      // Optimistically update the cache
      queryClient.setQueryData<Video>(["video", videoId], (old) => {
        if (!old) return old;

        return {
          ...old,
          isLiked: !old.isLiked,
          likesCount: old.isLiked
            ? old.likesCount - 1
            : old.likesCount + 1,
        };
      });

      return { previousVideo };
    },

    // Roll back on failure
    onError: (_error, videoId, context) => {
      if (context?.previousVideo) {
        queryClient.setQueryData(["video", videoId], context.previousVideo);
      }
    },

    // Always sync with the server
    onSettled: (_data, _error, videoId) => {
      queryClient.invalidateQueries({
        queryKey: ["video", videoId],
      });
    },
  });
};