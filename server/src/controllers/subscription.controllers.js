import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.models.js";
import { Subscription } from "../models/subscription.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "invalid channel id");
  }

  // Get current user and prevent self-subscription
  const subscriberId = req.user?._id;
  if (subscriberId.toString() === channelId) {
    throw new ApiError(400, "You cannot subscribe to yourself");
  }

  // Check whether channel exists
  const channel = await User.findById(channelId);
  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  // Check existing subscription
  const existingSubscription = await Subscription.findOne({
    subscriber: subscriberId,
    channel: channelId,
  });

  // unsubscribing channel if already subscribed
  if (existingSubscription) {
    await Subscription.findOneAndDelete(existingSubscription._id);

    return res
      .status(200)
      .json(new ApiResponse(200, {isSubscribed: false}, "Channel unsubscribed successfully"));
  }

  const createdSubscription = await Subscription.create({
    subscriber: subscriberId,
    channel: channelId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, {isSubscribed: true}, "Channel subscribed successfully"));
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "invalid channel id");
  }

  const subscribers = await Subscription.aggregate([
    {
      $match: {
        channel: new mongoose.Types.ObjectId(channelId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriber",
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
    {
      $unwind: "$subscriber",
    },
    {
      $replaceRoot: {
        newRoot: "$subscriber",
      },
    },
  ]);

  console.log(subscribers);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { subscribers, totalSubscribers: subscribers.length },
        "Subscribers fetched successfully"
      )
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
  if (!isValidObjectId(subscriberId)) {
    throw new ApiError(400, "invalid subscriber id");
  }

  const channels = await Subscription.aggregate([
    {
      $match: {
        subscriber: new mongoose.Types.ObjectId(subscriberId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "channel",
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
    {
      $unwind: "$channel",
    },
    {
      $replaceRoot: {
        newRoot: "$channel",
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { channels, totalChannels: channels.length },
        "Channels fetched successfully"
      )
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
