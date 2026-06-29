import { useQuery } from "@tanstack/react-query";
import { getVideos } from "../api/video.api";
import type { GetVideosParams } from "../types/video.types";

export const useVideos = (
  params?: GetVideosParams
) => {
  return useQuery({
    queryKey: ["videos", params],
    queryFn: () => getVideos(params),
  });
};