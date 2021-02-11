import {
  allTeachers,
  createTeacher,
  editTeacher,
  deleteTeacher,
} from "./teacher";
import {
  allStudents,
  createStudent,
  editStudent,
  deleteStudent,
  getStudentsWithoutCourse,
} from "./student";
import { allCourses, createCourse, editCourse, deleteCourse } from "./course";
import { allGrades, createGrade, editGrade, deleteGrade } from "./grade";
import { admin, createAdmin, editAdmin, deleteAdmin } from "./admin";
import {
  allSubjects,
  createSubject,
  editSubject,
  deleteSubject,
} from "./subjects";
import {
  allUsers,
  createUser,
  login,
  editUser,
  deleteUser,
  changePassword,
} from "./user";
import { getModules, createModule, editModule, deleteModule } from "./module";
import {
  getClasses,
  createClass,
  editClass,
  deleteClass,
  uploadClassFile,
  deleteClassFile,
  uploadDelivery,
  deleteDelivery,
  uploadHomework,
  deleteHomework,
  editCorrectionFromClass,
} from "./class";
import { createStudentsWithCsv, createTeachersWithCsv } from "./files";

export default {
  // GET REQUEST
  Query: {
    admin,
    user: allUsers,
    teachers: allTeachers,
    students: allStudents,
    grades: allGrades,
    courses: allCourses,
    subjects: allSubjects,
    modules: getModules,
    classes: getClasses,
  },

  // PUT, POST, DELETE REQUEST
  Mutation: {
    // USUARIO
    login,
    createUser,
    editUser,
    deleteUser,
    changePassword,

    // PRECEPTOR
    createAdmin,
    editAdmin,
    deleteAdmin,

    // PROFESORES
    createTeacher,
    editTeacher,
    deleteTeacher,
    createTeachersWithCsv,

    // ALUMNOS
    createStudent,
    editStudent,
    deleteStudent,
    createStudentsWithCsv,
    getStudentsWithoutCourse,

    // GRADOS
    createGrade,
    editGrade,
    deleteGrade,

    // CURSOS
    createCourse,
    editCourse,
    deleteCourse,

    // MATERIAS
    createSubject,
    editSubject,
    deleteSubject,

    // MODULE
    createModule,
    editModule,
    deleteModule,

    // CLASES
    createClass,
    editClass,
    deleteClass,
    uploadClassFile,
    deleteClassFile,
    uploadDelivery,
    deleteDelivery,
    uploadHomework,
    deleteHomework,
    editCorrectionFromClass,
  },
};
