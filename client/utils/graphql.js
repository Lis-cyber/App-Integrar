import { gql } from "@apollo/client";

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($newPassword: String!, $userId: ID!) {
    changePassword(newPassword: $newPassword, userId: $userId)
  }
`;

export const CREATE_STUDENTS_WITH_CSV = gql`
  mutation CreateStudentsWithCsv($file: Upload!, $courseId: ID) {
    createStudentsWithCsv(file: $file, courseId: $courseId) {
      status
    }
  }
`;

export const CREATE_TEACHERS_WITH_CSV = gql`
  mutation CreateTeachersWithCsv($file: Upload!) {
    createTeachersWithCsv(file: $file) {
      status
    }
  }
`;

export const UPLOAD_CLASS_FILE = gql`
  mutation UploadClassFile($file: Upload!, $classId: ID!) {
    uploadClassFile(file: $file, classId: $classId) {
      status
    }
  }
`;

export const UPLOAD_HOMEWORK = gql`
  mutation UploadHomework($file: Upload!, $classId: ID!) {
    uploadHomework(file: $file, classId: $classId) {
      status
    }
  }
`;

export const UPLOAD_DELIVERY = gql`
  mutation UploadDelivery($file: Upload!, $classId: ID!, $dni: String!) {
    uploadDelivery(file: $file, classId: $classId, dni: $dni) {
      status
    }
  }
`;
