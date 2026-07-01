import { useMutation, useQueryClient } from "@tanstack/react-query";

import { profileApi } from "../api/profile.api";

import { useAppDispatch } from "@watchloop/store/hooks";
import { syncCurrentUser } from "../utils/syncCurrentUser";
import { toast } from "sonner";


export const useUpdateCover = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (file: File) => profileApi.updateCover(file),

    onSuccess: (user) => {
      syncCurrentUser(user, queryClient, dispatch);

      toast.success("Cover image updated successfully.");
    },
  });
};
