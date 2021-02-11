import Student from "../models/Student";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { sendMailWithPassword } from "../mail";
import Course from "../models/Course";

// Query
export const allStudents = async (_, args) => {
  if (args._id) {
    return await Student.find({ _id: args._id });
  } else if (args.dni) {
    return await Student.find({ dni: args.dni });
  } else {
    return await Student.find();
  }
};

// Mutations
export const createStudent = async (_, args) => {
  let newStudent = await new Student(args.input).save();
  const CourseId = args.input.course;

  if (CourseId) {
    const course = await Course.findById(CourseId);
    course && course.students.push(newStudent._id);
    course && (await course.save());
  }

  const password = Math.floor(100000 + Math.random() * 900000).toString();
  const hash = await bcrypt.hash(password, 12);
  const { name, email, dni } = args.input;

  let studentUser = await new User({
    name,
    email,
    dni,
    password: hash,
    role: "Student",
  }).save();

  console.log(
    `The password for dni ${studentUser.dni} (Student) is: `,
    password
  );

  const [isMailSent, error] = await sendMailWithPassword(studentUser, password);

  if (!isMailSent) return error;

  return newStudent;
};

export const editStudent = async (_, args) => {
  let student = await Student.findById(args._id);

  let inputs = args.input;
  for (const key in inputs) {
    key ? (student[key] = inputs[key]) : student[key];
  }
  return await student.save();
};

export const deleteStudent = async (_, args, ctx) => {
  return await Student.findByIdAndDelete(args._id);
};

export const getStudentsWithoutCourse = async (_) => {
  return await Student.find({ course: { $exists: false } });
};
