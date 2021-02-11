import Course from "../models/Course";
import Grade from "../models/Grade";
import Student from "../models/Student";
import Teacher from "../models/Teacher";

// Query
export const allCourses = async (_, args, ctx) => {
  if (args._id) {
    return await Course.find({ _id: args._id });
  } else {
    return await Course.find().sort({ name: 1 });
  }
};

// Mutation
export const createCourse = async (_, args, ctx) => {
  const newCourse = await new Course(args.input).save();

  const grade = await Grade.findById(args.input.grade._id);
  grade && grade.courses.push(newCourse._id);
  grade && (await grade.save());

  return newCourse;
};

export const editCourse = async (_, args, ctx) => {
  let course = await Course.findById(args._id);
  const { teacherId, studentId, deleteMode } = args;

  try {
    if (!deleteMode) {
      if (studentId) {
        let student = await Student.findById(studentId);
        let studentExist = course.students.find((el) => el.dni === student.dni);
        if (!studentExist) {
          try {
            course.students.push(studentId);
            student.course = course._id;
            await student.save();
          } catch (error) {
            console.error(error);
            return error;
          }
        }
      }
      if (teacherId) {
        let teacher = await Teacher.findById(teacherId);
        let teacherExist = course.teachers.find((el) => el.dni === teacher.dni);
        if (!teacherExist) {
          try {
            course.teachers.push(teacherId);
            teacher.courses.push(course._id);
            await teacher.save();
          } catch (error) {
            console.error(error);
            return error;
          }
        }
      }
    } else {
      /**
       * !Si el deleteMode esta activado, se busca el id del profesor o estudiante y se lo borra
       */
      let teacher;
      let student;
      if (teacherId && (teacher = await Teacher.findById(teacherId))) {
        course.teachers = course.teachers.filter(
          (el) => el.dni !== teacher.dni
        );
        teacher.courses = teacher.courses.filter(
          (el) => el.name !== course.name
        );
        await teacher.save();
      }

      if (studentId && (student = await Student.findById(studentId))) {
        course.students = course.students.filter(
          (el) => el.dni !== student.dni
        );
        student.course = null;
        await student.save();
      }
    }
    for (let key in args.input) {
      key ? (course[key] = args.input[key]) : course[key];
    }
    await course.save();
    return course;
  } catch (err) {
    console.error(err);
  }
};

export const deleteCourse = async (_, args, ctx) => {
  return await Course.findByIdAndDelete(args._id);
};
