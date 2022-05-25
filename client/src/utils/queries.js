import { gql } from '@apollo/client';

export const QUERY_DOOZIES = gql`
    query doozies($username: String) {
        doozies(username: $username) {
        _id
        doozieText
        username
        completed
        }
    }
`;

export const QUERY_DOOZIE = gql`
    query doozie($id: ID!) {
        doozie(_id: $ID) {
        _id
        doozieText
        username
        completed
        }
    }
`;

export const QUERY_ME = gql`
{
    me {
      _id
      username
      email
      doozies {
        doozieText
        completed
        _id
      }
    }
  }
`;