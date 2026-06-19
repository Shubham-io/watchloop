import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      url: {
        type: String,
        required: [true, "Video file is required"],
      },
      public_id: {
        type: String,
        required: true,
      },
      resource_type: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        default: 0,
      },
    },
    thumbnail: {
      url: {
        type: String,
        required: [true, "Thumbnail is required"],
      },
      public_id: {
        type: String,
        required: true,
      },
      resource_type: {
        type: String,
        required: true,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
