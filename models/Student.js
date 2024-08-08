import mongoose from "mongoose";

const Student = mongoose.Schema(
  {
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
      unique: true,
    },
    collegeYear: Number,
    isKmcStudent: Boolean,
    isPgStudent: Boolean,
    collegeName: String,
    delegateId: {
      type: String,
      unique: true,
    },
    events: Array,
    screenshotLink: { type: String, select: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Student || mongoose.model("Student", Student);
