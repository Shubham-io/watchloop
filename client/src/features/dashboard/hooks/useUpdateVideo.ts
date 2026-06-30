import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateVideo } from "../api/dashboard.api";
import { dashboardKeys } from "@watchloop/constants/queryKeys";
// import type { UpdateVideoPayload } from "../types/dashboard.types";

export const useUpdateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      videoId,
      formData,
    }: {
      videoId: string;
      formData: FormData;
    }) => updateVideo(videoId, formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dashboardKeys.videos,
      });
    },
  });
};
