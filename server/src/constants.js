import ms from "ms";

// Keep in sync with client/src/constants/limits.ts
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
export const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50 MB

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const ACCEPTED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime", // .mov
];

const baseCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

// maxAge makes these persistent cookies that survive a browser restart;
// lifetimes match the JWT expiries (ms converts "1d" -> 86400000)
export const accessCookieOptions = {
  ...baseCookieOptions,
  maxAge: ms(process.env.ACCESS_TOKEN_EXPIRES_IN),
};

export const refreshCookieOptions = {
  ...baseCookieOptions,
  maxAge: ms(process.env.REFRESH_TOKEN_EXPIRES_IN),
};

// clearCookie must match the original options except maxAge/expires
export const clearCookieOptions = baseCookieOptions;
