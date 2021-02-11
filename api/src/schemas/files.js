import { gql } from "apollo-server-express";

export const fileTypes = gql`
  type File {
    status: Boolean
    uri: String
    filename: String
    mimetype: String
    encoding: String
  }
`;
