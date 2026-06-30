import { useQuery } from "@tanstack/react-query";

import { getSubscribers } from "../api/dashboard.api";

export const useSubscribers = (channelId: string) => {
  return useQuery({
    queryKey: ["subscribers", channelId],
    queryFn: () => getSubscribers(channelId),
    enabled: !!channelId,
  });
};