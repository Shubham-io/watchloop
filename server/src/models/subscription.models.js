import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, // a subscriber will be a user who subscribes to a channel
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId, 
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);