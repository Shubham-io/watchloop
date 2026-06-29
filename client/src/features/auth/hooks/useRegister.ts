import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/auth.api";
import { toast } from "sonner";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Account created");
    },

    onError: () => {
      toast.error("Registration failed");
    },
  });
};
