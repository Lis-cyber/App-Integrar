import { gql } from "apollo-server-express";

export const classResolvers = `
    createClass(
      input: ClassInput
    ): Class

    editClass(
      _id: ID, 
      input: ClassInput
    ): Class

    deleteClass(
      _id: ID
    ): Module

    uploadClassFile(
      file: Upload!, 
      classId: ID!
    ): File

    deleteClassFile(
      classId: ID!, 
      filename: String!
    ): Boolean

    uploadDelivery(
      file: Upload!, 
      classId: ID!, 
      dni: String!
    ): File

    deleteDelivery(
      classId: ID!, 
      filename: String!
    ): Boolean

    uploadHomework(
      file: Upload!, 
      classId: ID!
    ): File 

    deleteHomework(
      classId: ID!, 
      filename: String!
    ): Boolean

    editCorrectionFromClass(
      classId: ID!
      studentId: ID!
      correctionScore: String
      feedback: String
    ): Class

    createStudentsWithCsv(
      file: Upload!, 
      courseId: ID
      ): File

    createTeachersWithCsv(
      file: Upload
    ): File
`;

export const classTypes = gql`
  type Class {
    _id: ID
    name: String
    files: [String]
    deliveries: [String]
    subject: Subject
    module: Module
    corrections: [Correction]
    homework: String
  }

  input ClassInput {
    _id: ID
    name: String
    files: [String]
    deliveries: [String]
    subject: ID
    module: ID
    corrections: InputCorrection
    homework: String
  }

  type Correction {
    student: Student
    score: String
    feedback: String
  }

  input InputCorrection {
    student: ID!
    score: String!
    feedback: String
  }
`;
