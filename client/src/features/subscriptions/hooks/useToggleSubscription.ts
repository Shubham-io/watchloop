import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleSubscription } from "../api/subscription.api";
import { subscriptionKeys } from "@watchloop/constants/queryKeys";

export const useToggleSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleSubscription,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.subscribers,
      });

      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.subscribedChannels,
      });
    },
  });
};
