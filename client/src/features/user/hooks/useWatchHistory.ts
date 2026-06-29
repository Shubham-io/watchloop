import { useQuery } from "@tanstack/react-query";
import { getWatchHistory } from "../api/history.api";

export const useWatchHistory = () => {
  return useQuery({
    queryKey: ["watch-history"],
    queryFn: getWatchHistory,

  });
};
