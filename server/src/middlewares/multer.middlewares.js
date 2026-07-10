import multer from "multer";
import path from "path";
import { ApiError } from "../utils/ApiError.js";

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);

    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/mpeg",
  "video/quicktime", // .mov
];

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new ApiError(400, "Only image files are allowed"), false); // Reject file
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB file size limit
  },
});
