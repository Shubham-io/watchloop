import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.models.js";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createTweet = asyncHandler(async (req, res) => {
  const { tweet } = req.body;

  if (!tweet?.trim()) {
    throw new ApiError(400, "Tweet content is required");
  }

  const createdTweet = await Tweet.create({
    content: tweet.trim(),
    owner: req.user._id,
  });

  const populatedTweet = await Tweet.findById(createdTweet._id).populate(
    "owner",
    "username fullname avatar"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, populatedTweet, "Tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "invalid user id");
  }

  const tweets = await Tweet.find({
    owner: userId,
  }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, tweets, "Tweets fetched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const { tweet } = req.body;

  if (!tweet?.trim()) {
    throw new ApiError(400, "Tweet content is required");
  }

  const updatedTweet = await Tweet.findOneAndUpdate(
    {
      _id: tweetId,
      owner: req.user._id,
    },
    {
      $set: {
        content: tweet.trim(),
      },
    },
    {
      new: true,
    }
  ).populate("owner", "username fullname avatar");

  if (!updatedTweet) {
    throw new ApiError(404, "Tweet not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  const deletedTweet = await Tweet.findOneAndDelete({
    _id: tweetId,
    owner: req.user._id,
  });

  if (!deletedTweet) {
    throw new ApiError(404, "Tweet not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Tweet deleted successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
