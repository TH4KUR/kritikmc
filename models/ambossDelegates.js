import mongoose from "mongoose";

const ambossDelegates = mongoose.Schema(
  {
    delegateId: {
      type: String,
      unique: true,
    },
    name: String,
    email: {
      type: String,
    },
    mobileno: {
      type: Number,
    },
    kmcRollNo: {
      type: Number,
    },
    collegeYear: Number,
    isKmcStudent: Boolean,
    isPgStudent: Boolean,
    collegeName: String,
    screenshotLink: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ambossDelegates ||
  mongoose.model("ambossDelegates", ambossDelegates);
