import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/car-rental`);
    console.log(" MongoDB connected successfully");

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB Error:", err.message);
    });
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
