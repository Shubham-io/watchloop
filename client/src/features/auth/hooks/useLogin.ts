import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth.api";
import { toast } from "sonner";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success("Login successful");
    },
    onError: () => {
      toast.error("Invalid credentials");
    },
  });
};
