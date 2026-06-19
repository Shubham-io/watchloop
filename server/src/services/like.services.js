import { Like } from "../models/like.models.js";

export const toggleLike = async (filter) => {
  const existingLike = await Like.findOne(filter);

  // dislike if like exists
  if (existingLike) {
    await Like.deleteOne(filter);

    return {
      liked: false,
      message: "Liked removed successfully",
    };
  }

  // create a like
  await Like.create(filter);

  return {
    liked: true,
    message: "Liked successfully",
  };
};
