import { gql } from "apollo-server-express";
import { fileTypes } from "./files";
import { classResolvers, classTypes } from "./class";
import { moduleTypes } from "./module";

// Admin
export default gql`
  type Query {
    user(_id: ID): [User]
    admin(dni: String, _id: ID): [Admin]
    teachers(dni: String, _id: ID): [Teacher]
    students(dni: String, _id: ID): [Student]
    courses(_id: ID): [Course]
    grades(_id: ID): [Grade]
    subjects(_id: ID, attribute: String, order_by: String): [Subject]
    modules(_id: ID): [Module]
    classes(_id: ID): [Class]
  }

  type Mutation {
    createAdmin(input: AdminInput): Admin
    editAdmin(_id: ID, input: AdminInput): Admin
    deleteAdmin(_id: ID): Admin

    # login(userInput: UserInput) : User
    login(dni: String!, password: String!): AuthData
    createUser(userInput: UserInput): User
    editUser(_id: ID, input: UserInput): User
    deleteUser(_id: ID): User
    changePassword(newPassword: String!, userId: ID!): Boolean

    createTeacher(input: TeacherInput): Teacher
    editTeacher(_id: ID, input: TeacherInput): Teacher
    deleteTeacher(_id: ID): Teacher

    createStudent(input: StudentInput): Student
    editStudent(_id: ID, input: StudentInput): Student
    deleteStudent(_id: ID): Student
    getStudentsWithoutCourse: [StudentWithoutCourse]

    createGrade(input: GradeInput): Grade
    editGrade(_id: ID, input: GradeInput): Grade
    deleteGrade(_id: ID): Grade

    createCourse(input: CourseInput): Course
    editCourse(
      _id: ID
      input: CourseInput
      teacherId: ID
      studentId: ID
      deleteMode: Boolean
    ): Course
    deleteCourse(_id: ID): Course

    createSubject(input: SubjectInput): Subject
    editSubject(_id: ID, input: SubjectInput, deleteMode: Boolean): Subject
    deleteSubject(_id: ID): Subject

    createModule(input: ModuleInput): Module
    editModule(_id: ID, input: ModuleInput): Module
    deleteModule(_id: ID): Module
    
    ${classResolvers}
  }

  # ---------------------------
  ${classTypes}
  ${moduleTypes}
  ${fileTypes}

  # ---------------------------
  type Admin {
    _id: ID
    name: String
    lastname: String
    dni: String
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
    courses: [Course]
    grades: [Grade]
    teachers: [Teacher]
    students: [Student]
    subjects: [Subject]
  }
  input AdminInput {
    _id: ID
    name: String
    lastname: String
    dni: String
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
    courses: [CourseInput]
    grades: [GradeInput]
    teachers: [TeacherInput]
    students: [StudentInput]
    subjects: [SubjectInput]
  }

  # ---------------------------
  type User {
    _id: ID
    dni: String!
    name: String
    password: String
    email: String!
    role: String
  }

  input UserInput {
    _id: ID
    dni: String!
    email: String!
    password: String
  }

  type Error {
    password: Boolean
    dni: Boolean
  }

  type AuthData {
    token: String
    user: User
    error: Error
  }

  # ---------------------------
  type Teacher {
    _id: ID
    name: String
    lastname: String
    dni: String
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
    grades: [Grade]
    courses: [Course]
    subjects: [Subject]
    students: [Student]
    user: [User]
  }
  input TeacherInput {
    _id: ID
    name: String
    lastname: String
    dni: String
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
    subjects: [SubjectInput]
    user: [UserInput]
    courses: [CourseInput]
  }

  # ---------------------------
  type Student {
    _id: ID
    name: String
    lastname: String
    dni: String
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
    course: Course
    grade: Grade
    teachers: [Teacher]
    subjects: [Subject]
    user: [User]
  }

  type StudentWithoutCourse {
    _id: ID
    name: String
    lastname: String
    dni: String
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
  }

  input StudentInput {
    _id: ID
    name: String
    lastname: String
    dni: String
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
    user: [UserInput]
    course: ID
  }

  # ---------------------------
  type Grade {
    _id: ID
    name: String
    courses: [Course]
    grades: [Grade]
    teachers: [Teacher]
    subjects: [Subject]
  }
  input GradeInput {
    _id: ID
    name: String
    courses: [CourseInput]
    teachers: [TeacherInput]
    subjects: [SubjectInput]
    students: [StudentInput]
  }

  # ---------------------------
  type Course {
    _id: ID
    name: String
    grade: Grade
    teachers: [Teacher]
    subjects: [Subject]
    students: [Student]
  }
  input CourseInput {
    _id: ID
    name: String
    grade: GradeInput
    teachers: [TeacherInput]
    subjects: [SubjectInput]
    students: [StudentInput]
  }

  # ---------------------------
  type Subject {
    _id: ID
    name: String
    teacher: Teacher
    course: Course
    classes: [Class]
    modules: [Module]
  }
  input SubjectInput {
    _id: ID
    name: String
    teacher: ID
    course: ID
  }

  #---------------------------
`;
