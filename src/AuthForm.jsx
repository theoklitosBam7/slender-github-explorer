import * as React from 'react';
import { useState } from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  input: {
    width: '100%',
    marginBottom: '1rem',
  },
});

const AuthForm = () => {
  const classes = useStyles();

  const [token, setToken] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('Authorization', token);
    setToken('');
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <TextField
        className={classes.input}
        label={'Enter your token'}
        variant={'outlined'}
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
    </form>
  );
};

export default AuthForm;
