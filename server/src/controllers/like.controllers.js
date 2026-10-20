import mongoose, { isValidObjectId } from "mongoose";
import { Like, Tweet, Comment, Video } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyDocumentExists } from "../utils/verifyDocument.js";
import { toggleLike } from "../services/like.services.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "invalid video id");
  }
  await verifyDocumentExists(Video, videoId, "Video");

  const likedVideo = await toggleLike({
    likedBy: req.user?._id,
    video: videoId,
  });

  return res.status(200).json(new ApiResponse(200, {}, likedVideo.message));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "invalid tweet id");
  }
  await verifyDocumentExists(Tweet, tweetId, "Tweet");

  const likedTweet = await toggleLike({
    likedBy: req.user?._id,
    tweet: tweetId,
  });

  return res.status(200).json(new ApiResponse(200, {}, likedTweet.message));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "invalid comment id");
  }
  await verifyDocumentExists(Comment, commentId, "Comment");

  const likedComment = await toggleLike({
    likedBy: req.user?._id,
    comment: commentId,
  });

  return res.status(200).json(new ApiResponse(200, {}, likedComment.message));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // console.log("userid ", userId);
  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "invalid user id");
  }

  const likedVideos = await Like.aggregate([
    // matching stage
    {
      $match: {
        likedBy: new mongoose.Types.ObjectId(userId),
        video: { $exists: true },
      },
    },
    // sorting stage
    {
      $sort: {
        createdAt: -1,
      },
    },
    // video lookup stage
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "video",
      },
    },
    // unwind stage for video
    {
      $unwind: "$video",
    },
    // user lookup stage
    {
      $lookup: {
        from: "users",
        localField: "video.owner",
        foreignField: "_id",
        as: "video.owner",
        pipeline: [
          {
            $project: {
              username: 1,
              fullname: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    // adding owner field
    {
      $addFields: {
        "video.owner": {
          $first: "$video.owner",
        },
      },
    },
    // replacing root stage
    {
      $replaceRoot: {
        newRoot: "$video",
      },
    },
  ]);
  // console.log("likedVideos ", likedVideos);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        likedVideos,
        totalLikedVideos: likedVideos.length,
      },
      "Liked videos fetched successfully"
    )
  );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
