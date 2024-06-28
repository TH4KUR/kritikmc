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
    collegeYear: Number,
    isKmcStudent: Boolean,
    collegeName: String,
    transactionId: {
      type: String,
      unique: true,
    },
    events: Array,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Student || mongoose.model("Student", Student);
