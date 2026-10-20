import fs from "fs";
import mongoose from "mongoose";
import multer from "multer";
import { ApiError } from "../utils/ApiError.js";

// Remove multer temp files left behind when a request fails
const cleanupUploadedFiles = (req) => {
  const files = [
    req.file,
    ...(Array.isArray(req.files)
      ? req.files
      : Object.values(req.files || {}).flat()),
  ].filter(Boolean);

  for (const file of files) {
    fs.unlink(file.path, () => {}); // ignore: already removed after upload
  }
};

// Convert known library errors into ApiError so the client always
// receives the same JSON shape
const normalizeError = (err) => {
  if (err instanceof ApiError) return err;

  if (err instanceof multer.MulterError) {
    const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    return new ApiError(status, err.message);
  }

  if (err instanceof mongoose.Error.CastError) {
    return new ApiError(400, `Invalid ${err.path}: ${err.value}`);
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((e) => e.message);
    return new ApiError(400, "Validation failed", errors);
  }

  if (err?.code === 11000) {
    const fields = Object.keys(err.keyValue || {}).join(", ");
    return new ApiError(409, `Duplicate value for: ${fields}`);
  }

  if (err?.type === "entity.too.large") {
    return new ApiError(413, "Request body is too large");
  }

  if (err?.type === "entity.parse.failed") {
    return new ApiError(400, "Malformed JSON in request body");
  }

  return new ApiError(500, "Internal server error");
};

export const notFoundHandler = (req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, _next) => {
  cleanupUploadedFiles(req);

  const apiError = normalizeError(err);

  if (apiError.statusCode >= 500) {
    console.error(err);
  }

  return res.status(apiError.statusCode).json({
    statusCode: apiError.statusCode,
    data: null,
    message: apiError.message,
    success: false,
    errors: apiError.errors,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
