// Keep in sync with server/src/constants.js
export const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50 MB
export const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024; // 5 MB
export const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5 MB
export const MAX_COVER_SIZE = 5 * 1024 * 1024; // 5 MB

export const ACCEPTED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime", // .mov
];

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
