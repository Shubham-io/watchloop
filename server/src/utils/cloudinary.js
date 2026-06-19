import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    console.log(
      "File uploaded to Cloudinary successfully with path: ",
      response.url
    );

    fs.unlinkSync(filePath); // delete the file after uploading to cloudinary
    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary: ", error);
    fs.unlinkSync(filePath); // delete the file if there is an error
    return null;
  }
};

const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  try {
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    if (response.result !== "ok") {
      console.warn(`Failed to delete ${resourceType}`, result);
    }

    return response;
  } catch (error) {
    console.error("Error deleting file from Cloudinary: ", error);
    return null;
  }
};

export { uploadToCloudinary, deleteFromCloudinary };
