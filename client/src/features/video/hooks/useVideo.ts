import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getVideoById } from "../api/video.api";
import { useEffect } from "react";

export const useVideo = (videoId: string) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideoById(videoId),
    enabled: !!videoId,
  });

  useEffect(() => {
    if (query.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["watch-history"] });
    }
  }, [query.isSuccess, videoId]); // videoId ensures it fires on every new video

  return query;
};
