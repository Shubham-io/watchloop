import { useMutation, useQueryClient } from "@tanstack/react-query";

import { profileApi } from "../api/profile.api";

import { useAppDispatch } from "@watchloop/store/hooks";
import { updateUser } from "@watchloop/features/auth/authSlice";
import { userKeys } from "@watchloop/constants/queryKeys";
import { getErrorMessage } from "@watchloop/utils/getErrorMessage";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: profileApi.updateProfile,

    onSuccess: (user) => {
      queryClient.setQueryData(userKeys.currentUser, user);
      dispatch(updateUser(user));

      toast.success("Profile updated successfully.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
