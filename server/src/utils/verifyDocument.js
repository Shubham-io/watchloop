import { ApiError } from "./ApiError.js";

export const verifyDocumentExists = async (
  Model,
  id,
  resourceName = "Resource"
) => {
  const document = await Model.findById(id);
  if (!document) {
    throw new ApiError(404, `${resourceName} not found`);
  }
  return document;
};
