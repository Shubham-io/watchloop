import type { EditVideoFormValues } from "../schemas/edit-video.schema";

export const buildUpdateVideoFormData = (
  values: EditVideoFormValues,
) => {
  const formData = new FormData();

  formData.append("title", values.title);

  formData.append(
    "description",
    values.description,
  );

  if (values.thumbnail) {
    formData.append(
      "thumbnail",
      values.thumbnail,
    );
  }

  return formData;
};