import { useQuery } from "@tanstack/react-query";

import { getChannelVideos } from "../api/dashboard.api";
import { dashboardKeys } from "@watchloop/constants/queryKeys";

export const useChannelVideos = () => {
  return useQuery({
    queryKey: dashboardKeys.videos,
    queryFn: getChannelVideos,
  });
};