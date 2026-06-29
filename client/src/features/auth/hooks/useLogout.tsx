import { useQueryClient, useMutation } from "@tanstack/react-query";
import { logoutUser } from "../api/auth.api";

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
