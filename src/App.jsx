import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Typography, Container, makeStyles } from '@material-ui/core';

import client from './apollo-client';

const useStyles = makeStyles({
  title: {
    marginTop: '1rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <ApolloProvider client={client}>
      <Container maxWidth={'sm'}>
        <Typography variant={'h3'} className={classes.title}>
          Hello to slender github explorer
        </Typography>
      </Container>
    </ApolloProvider>
  );
};

export default App;
