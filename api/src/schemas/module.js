import { gql } from "apollo-server-express";

export const moduleTypes = gql`
  type Module {
    _id: ID
    name: String
    classes: [Class]
    test: String
    subject: Subject
  }

  input ModuleInput {
    name: String
    classes: [ClassInput]
    test: String
    subject: ID
  }
`;
