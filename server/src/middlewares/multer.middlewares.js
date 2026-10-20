import multer from "multer";
import path from "path";
import os from "os";
import fs from "fs";
import { ApiError } from "../utils/ApiError.js";
import {
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_VIDEO_TYPES,
  MAX_IMAGE_SIZE,
  MAX_VIDEO_SIZE,
} from "../constants.js";

// OS temp dir: writable on serverless (Vercel only allows /tmp)
// and not exposed by express.static("public")
const uploadDir = path.join(os.tmpdir(), "watchloop-uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);

    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

const VIDEO_FIELDS = ["videoFile"];

const fileFilter = (req, file, cb) => {
  const isVideoField = VIDEO_FIELDS.includes(file.fieldname);
  const allowedTypes = isVideoField
    ? ACCEPTED_VIDEO_TYPES
    : ACCEPTED_IMAGE_TYPES;

  if (allowedTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(
    new ApiError(
      400,
      `Invalid file type for ${file.fieldname}. Allowed: ${allowedTypes.join(", ")}`
    ),
    false
  );
};

// image-only uploads (avatar, cover image, thumbnail)
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_IMAGE_SIZE },
});

// video uploads; multer has a single size limit, so the image fields
// sent alongside the video are size-checked in the controller
export const uploadVideo = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_VIDEO_SIZE },
});
