import { z } from "zod";

export const updateProfileSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name cannot exceed 50 characters"),

  email: z.email("Please enter a valid email address"),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;