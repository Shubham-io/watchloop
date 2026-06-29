import type { UploadVideoFormValues } from "../schemas/upload-video.schema";

export const buildVideoFormData = (
  values: UploadVideoFormValues,
): FormData => {
  const formData = new FormData();

  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("videoFile", values.videoFile);
  formData.append("thumbnail", values.thumbnail);

  return formData;
};