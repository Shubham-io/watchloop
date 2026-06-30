import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteVideo } from "../api/dashboard.api";
import { dashboardKeys } from "@watchloop/constants/queryKeys";

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVideo,

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