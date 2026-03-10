import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Successfully connected to DB");
  } catch (error) {
    console.log("Couldn't connect to DB");
    process.exit(1);
  }
};
