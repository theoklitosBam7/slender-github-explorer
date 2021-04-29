import { gql } from '@apollo/client';

export const GET_BASIC_REPO_INFO = gql`
  query getBasicRepoInfo($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      id
      description
      viewerHasStarred
      stargazers {
        totalCount
      }
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
      id
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
            id
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
      id
      pullRequests(
        first: $first
        states: [OPEN]
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        edges {
          node {
            id
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
      id
      forks(first: $first, orderBy: { field: CREATED_AT, direction: DESC }) {
        edges {
          node {
            id
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

export const STAR_REPO = gql`
  mutation starRepo($repoId: ID!) {
    addStar(input: { starrableId: $repoId }) {
      starrable {
        stargazers {
          totalCount
        }
      }
    }
  }
`;

export const UNSTAR_REPO = gql`
  mutation UnStarRepo($repoId: ID!) {
    removeStar(input: { starrableId: $repoId }) {
      starrable {
        stargazers {
          totalCount
        }
      }
    }
  }
`;
