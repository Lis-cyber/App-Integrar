import { Schema, model } from "mongoose"

// Grado -> Primer año
const gradeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: "Course",
    autopopulate: true
  }],
  teachers: [{
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    autopopulate: true
  }],
  subjects: [{
    type: Schema.Types.ObjectId,
    ref: "Subject",
    autopopulate: true
  }],
  students: [{
    type: Schema.Types.ObjectId,
    ref: "Student",
    autopopulate: true
  }]
})

gradeSchema.plugin(require('mongoose-autopopulate'));

export default model("Grade", gradeSchema)