import { useQuery } from "@tanstack/react-query";

import { getSubscribedChannels } from "../api/subscription.api";
import { subscriptionKeys } from "@watchloop/constants/queryKeys";

export const useSubscribedChannels = (subscriberId: string) => {
  return useQuery({
    queryKey: [subscriptionKeys.subscribedChannels, subscriberId],
    queryFn: () => getSubscribedChannels(subscriberId),
    enabled: !!subscriberId,
  });
};
