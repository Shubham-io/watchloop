import { z } from "zod";

import {
  ACCEPTED_IMAGE_TYPES,
  MAX_THUMBNAIL_SIZE,
} from "@watchloop/constants/limits";

export const editVideoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),

  description: z.string().trim().min(1, "Description is required").max(5000),

  thumbnail: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only JPG, PNG and WEBP images are supported.",
    )
    .refine(
      (file) => !file || file.size <= MAX_THUMBNAIL_SIZE,
      "Thumbnail size must not exceed 5 MB.",
    ),
});

export type EditVideoFormValues = z.infer<typeof editVideoSchema>;
