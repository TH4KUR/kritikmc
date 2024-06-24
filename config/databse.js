import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connections[0]) {
    return true;
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connected");
      return true;
    } catch (err) {
      console.log(err);
    }
  }
};

export default connectDb;
