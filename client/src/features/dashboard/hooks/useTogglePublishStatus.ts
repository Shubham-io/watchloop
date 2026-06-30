import { useMutation, useQueryClient } from "@tanstack/react-query";

import { togglePublishStatus } from "../api/dashboard.api";
import { dashboardKeys } from "@watchloop/constants/queryKeys";

export const useTogglePublishStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      videoId,
      isPublished,
    }: {
      videoId: string;
      isPublished: boolean;
    }) => togglePublishStatus(videoId, isPublished),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dashboardKeys.videos,
      });
      queryClient.invalidateQueries({
        queryKey: dashboardKeys.stats,
      });
    },
  });
};
