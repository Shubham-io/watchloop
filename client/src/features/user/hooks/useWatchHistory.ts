import { useQuery } from "@tanstack/react-query";
import { getWatchHistory } from "../api/history.api";
import { userKeys } from "@watchloop/constants/queryKeys";

export const useWatchHistory = () => {
  return useQuery({
    queryKey: userKeys.watchHistory,
    queryFn: getWatchHistory,

  });
};
