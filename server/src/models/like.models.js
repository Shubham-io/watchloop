import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    tweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  },
  { timestamps: true }
);

// One like per user per target. Partial indexes because each like has only
// one of video/comment/tweet set; a plain index would treat missing as null.
for (const target of ["video", "comment", "tweet"]) {
  likeSchema.index(
    { likedBy: 1, [target]: 1 },
    { unique: true, partialFilterExpression: { [target]: { $exists: true } } }
  );
}

export const Like = mongoose.model("Like", likeSchema);