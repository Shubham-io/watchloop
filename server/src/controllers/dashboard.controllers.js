import mongoose from "mongoose";
import { Video } from "../models/video.models.js";
import { Subscription } from "../models/subscription.models.js";
import { Like } from "../models/like.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// TODO: Get the channel stats like: total video views, total subscribers, total videos, total likes etc.

// Current user = Channel owner
const getChannelStats = asyncHandler(async (req, res) => {
  const channelId = new mongoose.Types.ObjectId(req.user._id);

  //   match channel in subscriptions model with the current user
  const subscribersPromise = Subscription.countDocuments({
    channel: channelId,
  });

  const videosPromise = Video.countDocuments({ owner: channelId });

  // Calculate total views across all videos owned by the channel
  const viewsPromise = Video.aggregate([
    {
      $match: {
        owner: channelId,
      },
    },
    {
      $group: {
        _id: null, // null means combine all the documents
        totalViews: {
          $sum: "$views",
        },
      },
    },
  ]);

  // Calculate total likes received across all videos owned by the channel
  const likesPromise = await Video.aggregate([
    {
      $match: {
        owner: channelId,
      },
    },
    // Join likes collection with videos
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
      },
    },
    // Count likes for each video
    {
      $project: {
        likesCount: { $size: "$likes" }, // size of likes array
      },
    },
    // Sum likes of all videos
    {
      $group: {
        _id: null,
        totalLikes: {
          $sum: "$likesCount",
        },
      },
    },
  ]);

  // Wait for all queries to finish
  const [totalSubscribers, totalVideos, viewsResult, likesResult] =
    await Promise.all([
      subscribersPromise,
      videosPromise,
      viewsPromise,
      likesPromise,
    ]);

  // Aggregation returns an array, so default to 0 if no videos exist
  const totalViews = viewsResult[0]?.totalViews || 0;
  const totalLikes = likesResult[0]?.totalLikes || 0;

  const channelStats = {
    totalSubscribers,
    totalVideos,
    totalViews,
    totalLikes,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, channelStats, "Channel stats fetched"));
});

// TODO: Get all the videos uploaded by the channel
const getChannelVideos = asyncHandler(async (req, res) => {
  const channelId = new mongoose.Types.ObjectId(req.user?._id);

  const videoList = await Video.aggregate([
    {
      $match: {
        owner: channelId,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
      },
    },
    {
      $project: {
        title: 1,
        thumbnail: 1,
        views: 1,
        createdAt: 1,
        likesCount: { $size: "$likes" },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { videoList, totalVideos: videoList.length },
        "Channel videos fetched"
      )
    );
});

export { getChannelStats, getChannelVideos };
