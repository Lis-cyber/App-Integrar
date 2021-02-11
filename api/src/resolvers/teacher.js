import Teacher from "../models/Teacher";
import Course from "../models/Course";
import Subject from "../models/Subject";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { sendMailWithPassword } from "../mail";

// Query
export const allTeachers = async (_, args, ctx) => {
  if (args._id) {
    return await Teacher.find({ _id: args._id });
  } else if (args.dni) {
    return await Teacher.find({ dni: args.dni });
  } else {
    return await Teacher.find();
  }
};

// Mutations
export const createTeacher = async (_, { input }, ctx) => {
  let newTeacher = await new Teacher(input).save();
  const teacherCourses = input.courses;
  const teacherSubjects = input.subjects;

  teacherSubjects &&
    teacherSubjects.map(async (el) => {
      const subject = await Subject.findById(el._id);
      if (subject) {
        subject.teacher = newTeacher._id;
        await subject.save();
      }
    });
  teacherCourses &&
    teacherCourses.map(async (el) => {
      const course = await Course.findById(el._id);
      if (course) {
        course.teachers.push(newTeacher._id);
        await course.save();
      }
    });

  const password = Math.floor(100000 + Math.random() * 900000).toString();
  const hash = await bcrypt.hash(password, 12);
  const { name, email, dni } = input;

  let teacherUser = await new User({
    name,
    email,
    dni,
    password: hash,
    role: "Teacher",
  }).save();

  console.log(
    `The password for dni ${teacherUser.dni} (Teacher) is: `,
    password
  );

  const [isMailSent, error] = await sendMailWithPassword(teacherUser, password);

  if (!isMailSent) return error;

  return newTeacher;
};

export const editTeacher = async (_, args, ctx) => {
  let teacher = await Teacher.findById(args._id);

  const input = args.input;
  for (const key in input) {
    key ? (teacher[key] = input[key]) : null;
  }

  await teacher.save();
  return teacher;
};

export const deleteTeacher = async (_, args, ctx) => {
  return await Teacher.findByIdAndDelete(args._id);
};
