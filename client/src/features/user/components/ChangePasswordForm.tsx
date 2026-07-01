import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@watchloop/components/ui/button";
import { Input } from "@watchloop/components/ui/input";
import { Label } from "@watchloop/components/ui/label";

import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from "../schemas/changePassword.schema";

import { useChangePassword } from "../hooks/useChangePassword";

export const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate, isPending } = useChangePassword();

  const onSubmit = (values: ChangePasswordSchema) => {
    mutate(
      {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="oldPassword">Old Password</Label>

        <Input id="oldPassword" type="password" {...register("oldPassword")} />

        {errors.oldPassword && (
          <p className="text-sm text-destructive">
            {errors.oldPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>

        <Input id="newPassword" type="password" {...register("newPassword")} />

        {errors.newPassword && (
          <p className="text-sm text-destructive">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>

        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        {isPending ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
};
