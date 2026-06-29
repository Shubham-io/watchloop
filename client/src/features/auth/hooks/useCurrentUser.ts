import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@watchloop/constants/queryKeys";
import { getCurrentUser } from "../api/auth.api";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: QUERY_KEYS.CURRENT_USER,
    queryFn: getCurrentUser,
    retry: false,
  });
};
