import mongoose from "mongoose";

const DB_NAME = "watchloop";
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    isConnected = true;

    console.log(
      `MongoDB connected!\nDB host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;
