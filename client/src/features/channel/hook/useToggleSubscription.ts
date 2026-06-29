import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleSubscription } from "../api/channel.api";

export const useToggleSubscription = (channelId: string, username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleSubscription(channelId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["channel", username],
      });
    },
  });
};
