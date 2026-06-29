import { useQuery } from "@tanstack/react-query";
import { getVideoComments } from "../api/comment.api";

export const useComments = (
  videoId: string,
  page = 1
) => {
  return useQuery({
    queryKey: ["comments", videoId, page],
    queryFn: () => getVideoComments(videoId, page),
    enabled: !!videoId,
  });
};