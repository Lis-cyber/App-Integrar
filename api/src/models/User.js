import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    dni: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.plugin(require("mongoose-autopopulate"));

export default model("user", userSchema);
