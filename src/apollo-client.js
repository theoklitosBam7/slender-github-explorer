import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/link-context';

const httpUri = process.env.REACT_APP_GRAPHQL_ENDPOINT;

const httpLink = createHttpLink({
  uri: httpUri,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('Authorization');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
