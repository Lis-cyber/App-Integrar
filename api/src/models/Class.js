import { Schema, model } from "mongoose";

const classSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    autopopulate: true,
  },
  files: [{ type: String }],
  homework: { type: String },
  deliveries: [{ type: String }],
  corrections: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        autopopulate: true,
      },
      score: { type: String },
      feedback: { type: String },
    },
  ],
  test: {
    type: String,
  },
  module: {
    type: Schema.Types.ObjectId,
    ref: "Module",
    autopopulate: true,
  },
});

classSchema.plugin(require("mongoose-autopopulate"));

export default model("Class", classSchema);
