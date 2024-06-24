import { Schema, model, models } from "mongoose";
const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
});
