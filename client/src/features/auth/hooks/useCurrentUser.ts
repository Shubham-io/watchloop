import { useQuery } from "@tanstack/react-query";
import { userKeys } from "@watchloop/constants/queryKeys";
import { getCurrentUser } from "../api/auth.api";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: userKeys.currentUser,
    queryFn: getCurrentUser,
    retry: false,
  });
};
