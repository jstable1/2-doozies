import { gql } from '@apollo/client';

export const QUERY_DOOZIES = gql`
    query doozies {
        doozies {
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