import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Typography, Container, makeStyles } from '@material-ui/core';

import client from './apollo-client';
import AuthForm from './AuthForm';
import SearchForm from './SearchForm';
import Repository from './Repository';

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
  const token = localStorage.getItem('Authorization');

  return (
    <ApolloProvider client={client}>
      <Container maxWidth={'lg'}>
        <Typography variant={'h3'} className={classes.title}>
          Hello to slender github explorer
        </Typography>
        <AuthForm />
        <SearchForm onSubmit={setRepoName} />
        {token && <Repository repoName={repoName} />}
      </Container>
    </ApolloProvider>
  );
};

export default App;
