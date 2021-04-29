import { gql } from '@apollo/client';

export const GET_BASIC_REPO_INFO = gql`
  query getBasicRepoInfo($name: String!, $owner: String!) {
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

export const GET_ISSUES_INFO = gql`
  query getIssuesInfo(
    $name: String!
    $owner: String!
    $issStates: [IssueState!]!
  ) {
    repository(name: $name, owner: $owner) {
      issues(
        first: 20
        states: $issStates
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        edges {
          node {
            number
            title
            author {
              login
            }
            comments {
              totalCount
            }
            createdAt
            state
          }
        }
      }
    }
  }
`;
