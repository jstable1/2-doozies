const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    doozies: [Doozie]
  }

  type Doozie {
    _id: ID
    title: String
    description: String
    username: String
    completed: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    doozies(username: String): [Doozie]
    doozie(_id: ID!): Doozie
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addDoozie(doozieText: String!): Doozie
  }
`;

module.exports = typeDefs;
