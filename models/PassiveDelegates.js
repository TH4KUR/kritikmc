import mongoose from "mongoose";

const PassiveDelegates = mongoose.Schema(
  {
    delegateId: {
      type: String,
      unique: true,
    },
    name: String,
    email: {
      type: String,
      unique: true,
    },
    mobileno: {
      type: Number,
      unique: true,
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

export default mongoose.models.PassiveDelegates ||
  mongoose.model("PassiveDelegates", PassiveDelegates);
