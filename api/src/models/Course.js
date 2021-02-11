import { Schema, model } from "mongoose";

// Curso --> 1° A
const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: Schema.Types.ObjectId,
    ref: "Grade",
    autopopulate: true,
  },
  teachers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      autopopulate: true,
    },
  ],
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      autopopulate: true,
    },
  ],
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
      autopopulate: true,
    },
  ],
});

courseSchema.plugin(require("mongoose-autopopulate"));

export default model("Course", courseSchema);
