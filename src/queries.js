import { gql } from '@apollo/client';

export const GET_REPO_INFO = gql`
  query getRepoInfo($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      description
      forkCount
      issues(states: [OPEN]) {
        totalCount
      }
      pullRequests(states: [OPEN]) {
        totalCount
      }
    }
  }
`;
