import { Like } from "../models/like.models.js";

const DUPLICATE_KEY = 11000;

// Toggle without a read-then-write race: try to delete first; if nothing was
// deleted, create. The unique index makes a concurrent duplicate create fail.
export const toggleLike = async (filter) => {
  const removed = await Like.findOneAndDelete(filter);

  if (removed) {
    return {
      liked: false,
      message: "Like removed successfully",
    };
  }

  try {
    await Like.create(filter);
  } catch (error) {
    // a concurrent request already created this like
    if (error.code !== DUPLICATE_KEY) throw error;
  }

  return {
    liked: true,
    message: "Liked successfully",
  };
};
