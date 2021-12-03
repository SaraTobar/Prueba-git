import { gql } from 'apollo-server';

const userType = gql`
  # User
  type User {
    _id: ID!
    email: String!
    documentId: Float!
    name: String!
    lastName: String!
    fullName: String!
    role: Role!
    status: UserStatus!
  }
`;

const enums = gql`
  # Enum for role values
  enum Role {
    admin
    leader
    student
  }

  # Enum for status values
  enum UserStatus {
    pending
    authorized
    unauthorized
  }
`;

const queries = gql`
  # Query all users
  type Query {
    allUsers: [User]
  }

  type Query {
    user(_id: ID): User
  }

  type Query {
    userByEmail(email: String!): User
  }

  type Query {
    userContext: User
  }
`;

const mutations = gql`
  type Mutation {
    register(input: RegisterInput!): User!
  }

  
  type Mutation {
    login(email: String!, password: String!): String!
  }
`;

const inputs = gql`
input RegisterInput {
  email: String!
  documentId: Float!
  name: String!
  lastName: String!
  fullName: String!
  role: Role!
  status: UserStatus!
  password: String!
}
`;

export default [
  userType,
  enums,
  queries,
  mutations,
  inputs,
];
