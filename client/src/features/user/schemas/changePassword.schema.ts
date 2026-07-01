import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Old password must be at least 6 characters"),

    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(6, "Please confirm your new password"),
  })
  .refine(
    (data) => data.newPassword === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    },
  )
  .refine(
    (data) => data.oldPassword !== data.newPassword,
    {
      path: ["newPassword"],
      message: "New password must be different from the old password",
    },
  );

export type ChangePasswordSchema = z.infer<
  typeof changePasswordSchema
>;