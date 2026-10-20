import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {
  accessCookieOptions,
  refreshCookieOptions,
  clearCookieOptions,
} from "../constants.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens: ", error);
    throw new ApiError(500, "Failed to generate access and refresh tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  // validation
  if ([fullname, email, username, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const normalizedUsername = username.trim().toLowerCase();

  // check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username: normalizedUsername }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with this email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadToCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(500, "Failed to upload avatar");
  }

  const coverImage = coverLocalPath
    ? await uploadToCloudinary(coverLocalPath)
    : null;

  // creating user
  try {
    const user = await User.create({
      fullname,
      email,
      username: normalizedUsername,
      password,
      avatar: avatar.secure_url,
      coverImage: coverImage?.secure_url || "",
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  } catch (error) {
    // Clean up uploaded images if user creation fails
    await deleteFromCloudinary(avatar.public_id);
    if (coverImage) {
      await deleteFromCloudinary(coverImage.public_id);
    }

    // let the global error handler map duplicate-key / validation errors
    throw error;
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email && !username) {
    throw new ApiError(400, "Email or username is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  // find user by whichever identifier was provided
  const user = await User.findOne(
    email ? { email } : { username: username.toLowerCase() }
  );

  // same response for unknown user and wrong password, so attackers
  // can't discover which accounts exist
  const isPasswordValid = user && (await user.comparePassword(password));
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // generate tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // send response
  return res
    .status(200)
    .cookie("accessToken", accessToken, accessCookieOptions)
    .cookie("refreshToken", refreshToken, refreshCookieOptions)
    .json(
      // tokens are only sent as httpOnly cookies, never in the body,
      // so JavaScript (and any XSS) can't read them
      new ApiResponse(200, { user: loggedInUser }, "User logged in successfully")
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken", clearCookieOptions)
    .clearCookie("refreshToken", clearCookieOptions)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(400, "Unauthorized: Refresh token is missing");
  }

  // decoding incoming refresh token to get user id
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // validating incoming refresh token with the one in database
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // generate new access token and refresh token
    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);
    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .cookie("accessToken", accessToken, accessCookieOptions)
      .cookie("refreshToken", newRefreshToken, refreshCookieOptions)
      .json(
        new ApiResponse(200, null, "Access token refreshed successfully")
      );
  } catch (error) {
    console.error("Error refreshing access token: ", error);
    throw new ApiError(401, "Invalid or expired refresh token");
  }
});

const changeCurrentUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "old password and new password are required");
  }

  const user = await User.findById(req.user._id);

  const isOldPasswordValid = await user.comparePassword(oldPassword);
  if (!isOldPasswordValid) {
    throw new ApiError(400, "Old password is invalid");
  }

  user.password = newPassword;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body;

  if (!fullname && !email) {
    throw new ApiError(400, "fullname or email is required");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullname,
        email,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "File is required");
  }

  const avatar = await uploadToCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Something went wrong while uploading avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.secure_url,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "avatar updated successfully"));
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "File is required");
  }

  const coverImage = await uploadToCloudinary(coverImageLocalPath);
  if (!coverImage) {
    throw new ApiError(400, "something went wrong while uploading cover image");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.secure_url,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "cover image updated successfully"));
});

const currentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User details fetched successfully"));
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) {
    throw new ApiError(400, "Username is required");
  }

  const channel = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel", // channel are my subscribers
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },

    // adding fields in result
    {
      $addFields: {
        subscribersCount: {
          $size: "$subscribers",
        },
        channelSubscribedTo: {
          $size: "$subscribedTo",
        },
        isSubscribed: {
          $cond: {
            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
            then: true,
            else: false,
          },
        },
      },
    },

    // project only necessary data
    {
      $project: {
        fullname: 1,
        username: 1,
        avatar: 1,
        subscribersCount: 1,
        channelSubscribedTo: 1,
        isSubscribed: 1,
        coverImage: 1,
        email: 1,
      },
    },
  ]);

  console.log("channel data: ", channel);

  if (!channel?.length) {
    throw new ApiError(404, "Channel not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "Channel profile fetched successfully")
    );
});

const getWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    fullname: 1,
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);

  console.log("user data: ", user);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user[0]?.watchHistory,
        "Watch history fetched successfully"
      )
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentUserPassword,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  currentUser,
  getUserChannelProfile,
  getWatchHistory,
};
