import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
  `;

export const COMPLETE_DOOZIE = gql`
  mutation completeDoozie($id: ID!) {
    completeDoozie(id: $id) {
      _id
      completed
    }
  }
`;

export const ADD_DOOZIE = gql`
  mutation AddDoozie($doozieText: String!) {
    addDoozie(doozieText: $doozieText) {
      _id
      doozieText
      completed
      username
    }
  }
`;