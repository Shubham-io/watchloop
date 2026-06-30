import { useQuery } from "@tanstack/react-query";

import { getChannelStats } from "../api/dashboard.api";
import { dashboardKeys } from "@watchloop/constants/queryKeys";

export const useChannelStats = () => {
  return useQuery({
    queryKey: dashboardKeys.stats,
    queryFn: getChannelStats,
  });
};
