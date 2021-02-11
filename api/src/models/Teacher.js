import { Schema, model } from "mongoose";

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: String,
  dni: {
    type: String,
    unique: true
  },
  email: String,
  whatsapp: String,
  address: String,
  birthday: Date,
  picture: String,
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
      autopopulate: true,
    },
  ],
  grades: [
    {
      type: Schema.Types.ObjectId,
      ref: "Grade",
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

teacherSchema.plugin(require("mongoose-autopopulate"));

export default model("Teacher", teacherSchema);
