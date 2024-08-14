import mongoose from "mongoose";

const Student = mongoose.Schema(
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
    events: Array,
    screenshotLink: { type: String, select: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Student || mongoose.model("Student", Student);
