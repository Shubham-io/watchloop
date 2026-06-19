import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.models.js";
import { Video } from "../models/video.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    query = "",
    sortBy = "createdAt",
    sortType = "desc",
    userId,
  } = req.query;

  // Pagination
  const pageNum = Math.max(Number(page) || 1, 1);
  const limitNum = Math.min(Number(limit) || 10, 50);

  // validate sort fields
  const allowedSortFields = ["createdAt", "views", "duration", "title"];

  if (!allowedSortFields.includes(sortBy)) {
    throw new ApiError(400, "Invalid sort field");
  }

  // Build match stage
  const matchStage = {
    isPublished: true,
  };

  // Filter by owner
  if (userId) {
    if (!isValidObjectId(userId)) {
      throw new ApiError(400, "Invalid user id");
    }

    matchStage.owner = new mongoose.Types.ObjectId(userId);
  }

  // Search by title or description
  if (query.trim()) {
    matchStage.title = {
      $regex: query.trim(),
      $options: "i",
    };
  }

  // Build aggregation pipeline
  const aggregate = Video.aggregate([
    {
      $match: matchStage,
    },
    {
      $sort: {
        [sortBy]: sortType === "asc" ? 1 : -1,
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
    {
      $project: {
        title: 1,
        description: 1,
        videoFile: 1,
        thumbnail: 1,
        views: 1,
        isPublished: 1,
        createdAt: 1,
        owner: 1,
      },
    },
  ]);

  // Pagination options
  const options = {
    page: pageNum,
    limit: limitNum,
  };

  // Execute query
  const videos = await Video.aggregatePaginate(aggregate, options);

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Videos fetched successfully"));
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title?.trim() || !description?.trim()) {
    throw new ApiError(400, "Title and description are required");
  }

  const videoLocalPath = req.files?.videoFile[0]?.path;
  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

  if (!videoLocalPath) {
    throw new ApiError(400, "video is required");
  }
  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail is required");
  }

  //   upload to cloudinary
  const video_instance = await uploadToCloudinary(videoLocalPath);
  const thumbnail_instance = await uploadToCloudinary(thumbnailLocalPath);

  if (!video_instance) {
    throw new ApiError(500, "Error uploading video");
  }

  if (!thumbnail_instance) {
    throw new ApiError(500, "Error uploading thumbnail");
  }

  const videoFile = {
    url: video_instance.secure_url,
    public_id: video_instance.public_id,
    resource_type: video_instance.resource_type,
    duration: video_instance.duration,
  };

  const thumbnail = {
    url: thumbnail_instance.secure_url,
    public_id: thumbnail_instance.public_id,
    resource_type: thumbnail_instance.resource_type,
  };

  //   create video document
  const publishedVideo = await Video.create({
    title,
    description,
    videoFile,
    thumbnail,
    owner: req.user._id,
  });

  const createdVideo = await Video.findById(publishedVideo._id).populate(
    "owner",
    "username fullname avatar"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, createdVideo, "Video published successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new ApiError(400, "video id is required");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(400, "video is not available");
  }

  video.views += 1;
  await video.save();

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;
  const thumbnailLocalPath = req.file?.path;
  console.info("thumbnailLocalPath: ", thumbnailLocalPath);

  // check if at least one filed is provided
  if (!title?.trim() && !description?.trim() && !thumbnailLocalPath) {
    throw new ApiError(
      400,
      "At least one field (title, description, thumbnail) is required"
    );
  }

  // create a empty object and add passed fields one by one
  const updateFields = {};

  if (title?.trim()) {
    updateFields.title = title;
  }

  if (description?.trim()) {
    updateFields.description = description.trim();
  }

  if (thumbnailLocalPath) {
    const thumbnail_instance = await uploadToCloudinary(thumbnailLocalPath);

    if (!thumbnail_instance?.url) {
      throw new ApiError(500, "Failed to upload thumbnail");
    }

    const thumbnail = {
      url: thumbnail_instance.secure_url,
      public_id: thumbnail_instance.public_id,
      resource_type: thumbnail_instance.resource_type,
    };

    updateFields.thumbnail = thumbnail;
  }

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: updateFields,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedVideo) {
    throw new ApiError(404, "Video not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const deletedVideo = await Video.findOneAndDelete({
    _id: videoId,
    owner: req.user._id,
  });

  if (!deletedVideo) {
    throw new ApiError(404, "Video not found or user unauthorized");
  }

  // delete video and thumbnail from cloudinary
  await deleteFromCloudinary(
    deletedVideo.videoFile.public_id,
    deletedVideo.videoFile.resource_type
  );
  await deleteFromCloudinary(
    deletedVideo.thumbnail.public_id,
    deletedVideo.thumbnail.resource_type
  );

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { isPublished } = req.body;

  const video = await Video.findOneAndUpdate(
    {
      _id: videoId,
      owner: req.user._id,
    },
    {
      $set: {
        isPublished,
      },
    },
    {
      new: true,
    }
  );

  if (!video) {
    throw new ApiError(404, "Video not found or user unauthorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video status updated successfully"));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
