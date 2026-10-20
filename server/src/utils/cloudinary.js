import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// delete the local temp file; ignore if it's already gone
const removeLocalFile = (filePath) => {
  fs.rm(filePath, { force: true }, () => {});
};

const uploadToCloudinary = async (filePath) => {
  if (!filePath) return null;

  try {
    return await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
  } catch (error) {
    console.error("Error uploading file to Cloudinary: ", error);
    return null;
  } finally {
    removeLocalFile(filePath);
  }
};

const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  if (!publicId) return null;

  try {
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    // "not found" means it's already gone, which is fine for a delete
    if (response.result !== "ok" && response.result !== "not found") {
      console.warn(
        `Failed to delete ${resourceType} ${publicId} from Cloudinary:`,
        response
      );
    }

    return response;
  } catch (error) {
    console.error("Error deleting file from Cloudinary: ", error);
    return null;
  }
};

export { uploadToCloudinary, deleteFromCloudinary };
