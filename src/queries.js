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
    $first: Int!
    $after: String
    $states: [IssueState!]!
  ) {
    repository(name: $name, owner: $owner) {
      issues(
        first: $first
        after: $after
        states: $states
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        pageInfo {
          endCursor
          hasNextPage
        }
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

export const GET_PULL_REQUESTS_INFO = gql`
  query getPullRequestsInfo($name: String!, $owner: String!, $first: Int!) {
    repository(name: $name, owner: $owner) {
      pullRequests(
        first: $first
        states: [OPEN]
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        edges {
          node {
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

export const GET_FORKS_INFO = gql`
  query getForksInfo($name: String!, $owner: String!, $first: Int!) {
    repository(name: $name, owner: $owner) {
      forks(first: $first, orderBy: { field: CREATED_AT, direction: DESC }) {
        edges {
          node {
            ... on Repository {
              name
              owner {
                login
              }
              stargazers {
                totalCount
              }
              description
              createdAt
            }
          }
        }
      }
    }
  }
`;
