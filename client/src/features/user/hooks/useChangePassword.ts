import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { profileApi } from "../api/profile.api";
import { getErrorMessage } from "@watchloop/utils/getErrorMessage";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: profileApi.changePassword,

    onSuccess: () => {
      toast.success("Password updated successfully.");
    },
    onError: (error) => {
        // console.log(error);
      toast.error(getErrorMessage(error.message));
    },
  });
};
