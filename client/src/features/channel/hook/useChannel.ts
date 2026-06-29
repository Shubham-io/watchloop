import { useQuery } from "@tanstack/react-query";
import { getChannelProfile } from "../api/channel.api";

export const useChannel = (username: string) => {
  return useQuery({
    queryKey: ["channel", username],
    queryFn: () => getChannelProfile(username),
    enabled: !!username,
  });
};