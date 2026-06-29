import { z } from "zod";

const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 500 MB
const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024; // 5 MB

const ACCEPTED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime", // .mov
];

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const uploadVideoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(5000, "Description cannot exceed 5000 characters"),

  videoFile: z
    .instanceof(File, {
      message: "Please select a video.",
    })
    .refine(
      (file) => ACCEPTED_VIDEO_TYPES.includes(file.type),
      "Only MP4, WEBM and MOV videos are supported.",
    )
    .refine(
      (file) => file.size <= MAX_VIDEO_SIZE,
      "Video size must not exceed 500 MB.",
    ),

  thumbnail: z
    .instanceof(File, {
      message: "Please select a thumbnail.",
    })
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only JPG, PNG and WEBP images are supported.",
    )
    .refine(
      (file) => file.size <= MAX_THUMBNAIL_SIZE,
      "Thumbnail size must not exceed 5 MB.",
    ),
});

export type UploadVideoFormValues = z.infer<typeof uploadVideoSchema>;