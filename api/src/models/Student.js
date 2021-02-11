import { Schema, model } from "mongoose"

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
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
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    autopopulate: true
  },
  grade: {
    type: Schema.Types.ObjectId,
    ref: "Grade",
    autopopulate: true
  },
  teachers: [{
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    autopopulate: true
  }],
  subjects: [{
    type: Schema.Types.ObjectId,
    ref: "Subject",
    autopopulate: true
  }]
})

studentSchema.plugin(require('mongoose-autopopulate'));

export default model("Student", studentSchema)