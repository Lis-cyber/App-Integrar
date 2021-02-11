import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: String,
  dni: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  whatsapp: String,
  address: String,
  birthday: Date,
  picture: String,
});

adminSchema.plugin(require("mongoose-autopopulate"));

export default model("Admin", adminSchema);
