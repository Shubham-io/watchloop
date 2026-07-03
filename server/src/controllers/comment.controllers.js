import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.models.js";
import { Video } from "../models/video.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "invalid video id");
  }

  const aggregate = Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
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
      $addFields: {
        owner: {
          $first: "$owner",
        },
      },
    },

    // Get likes count and isLiked for each comment
    {
      $lookup: {
        from: "likes",
        let: {
          commentId: "$_id",
          currentUserId: req.user?._id
            ? new mongoose.Types.ObjectId(req.user._id)
            : null,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$comment", "$$commentId"],
              },
            },
          },
          {
            $group: {
              _id: null,
              likesCount: {
                $sum: 1,
              },
              isLiked: {
                $max: {
                  $eq: ["$likedBy", "$$currentUserId"],
                },
              },
            },
          },
        ],
        as: "likesInfo",
      },
    },
    {
      $addFields: {
        likesCount: {
          $ifNull: [
            {
              $arrayElemAt: ["$likesInfo.likesCount", 0],
            },
            0,
          ],
        },
        isLiked: {
          $ifNull: [
            {
              $arrayElemAt: ["$likesInfo.isLiked", 0],
            },
            false,
          ],
        },
      },
    },
    {
      $project: {
        likesInfo: 0,
      },
    },

    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  const options = {
    page,
    limit,
  };

  const comments = await Comment.aggregatePaginate(aggregate, options);
  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { comment } = req.body;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "invalid video id");
  }

  if (!comment?.trim()) {
    throw new ApiError(400, "Comment content is required");
  }

  const createdComment = await Comment.create({
    video: videoId,
    owner: req.user._id,
    content: comment,
  });

  const populatedComment = await Comment.findById(createdComment._id).populate(
    "owner",
    "username fullname avatar"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, populatedComment, "Comment added successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;

  // validate comment id
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "invalid comment id");
  }

  // validate comment content
  if (!comment?.trim()) {
    throw new ApiError(400, "Comment content is required");
  }

  const updatedComment = await Comment.findOneAndUpdate(
    {
      _id: commentId,
      owner: req.user._id,
    },
    {
      $set: {
        content: comment.trim(),
      },
    },
    {
      new: true,
    }
  ).populate("owner", "username fullname avatar");

  if (!updatedComment) {
    throw new ApiError(404, "Comment not found or you are not authorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  // validate comment id
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "invalid comment id");
  }

  const deletedComment = await Comment.findOneAndDelete({
    _id: commentId,
    owner: req.user._id,
  });

  if (!deletedComment) {
    throw new ApiError(404, "Comment not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
