import { gql } from '@apollo/client';

export const QUERY_DOOZIES = gql`
    query doozies {
        doozies {
        _id
        title
        description
        username
        completed
        }
    }
`;

export const QUERY_DOOZIE = gql`
    query doozie($id: ID!) {
        doozie(_id: $ID) {
        _id
        title
        description
        username
        completed
        }
    }
`;