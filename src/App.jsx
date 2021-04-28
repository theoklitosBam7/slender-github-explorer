import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Typography, Container, makeStyles } from '@material-ui/core';

import client from './apollo-client';
import AuthForm from './AuthForm';
import SearchForm from './SearchForm';

const useStyles = makeStyles({
  title: {
    marginTop: '1rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
});

const App = () => {
  const classes = useStyles();
  const [repoName, setRepoName] = useState('');

  return (
    <ApolloProvider client={client}>
      <Container maxWidth={'sm'}>
        <Typography variant={'h3'} className={classes.title}>
          Hello to slender github explorer
        </Typography>
        <AuthForm />
        <SearchForm onSubmit={setRepoName} />
      </Container>
    </ApolloProvider>
  );
};

export default App;
