import { useQuery } from "@tanstack/react-query";

import { getSubscribers } from "../api/subscription.api";
import { subscriptionKeys } from "@watchloop/constants/queryKeys";


export const useSubscribers = (channelId: string) => {
  return useQuery({
    queryKey: [subscriptionKeys.subscribers, channelId],
    queryFn: () => getSubscribers(channelId),
    enabled: !!channelId,
  });
};
