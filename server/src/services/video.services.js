import mongoose from "mongoose";
import { User } from "../models/user.models.js";

export const addVideoToWatchHistory = async (userId, videoId) => {
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(videoId)
  ) {
    return;
  }

  const user = await User.findById(userId);

  if (!user) return;

  // Remove existing occurrence
  user.watchHistory = user.watchHistory.filter(
    (id) => id.toString() !== videoId.toString()
  );

  // Add to front
  user.watchHistory.unshift(videoId);

  await user.save({ validateBeforeSave: false });
};