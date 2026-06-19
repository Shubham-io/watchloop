import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    // verify token 
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    // inject user details to request object
    req.user = user;
    next();
  } catch (err) {
    console.error("Error verifying JWT: ", err);
    throw new ApiError(401, "Invalid access token");
  }

});
