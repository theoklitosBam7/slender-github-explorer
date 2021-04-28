import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  makeStyles,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  input: {
    width: '100%',
    marginBottom: '1rem',
  },
  note: {
    marginTop: '1rem',
    textAlign: 'center',
  },
});

const SearchForm = ({ onSubmit }) => {
  const classes = useStyles();
  const token = localStorage.getItem('Authorization');
  const [repoName, setRepoName] = useState('');
  const [errorInput, setErrorInput] = useState(false);
  const [errorToken, setErrorToken] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!token) {
      setErrorToken(true);
    } else {
      setErrorToken(false);
      if (repoName.indexOf('/') > -1) {
        localStorage.setItem('Repo', repoName);
        onSubmit(repoName);
        setRepoName('');
        setErrorInput(false);
      } else {
        setErrorInput(true);
      }
    }
  };

  return (
    <form
      noValidate
      autoComplete={'off'}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <TextField
        className={classes.input}
        error={errorInput}
        label={errorInput ? 'Error' : 'Search for repo: e.g. facebook/react'}
        helperText={errorInput ? 'Incorrect entry' : ''}
        id={errorInput ? 'outlined-error-helper-text' : ''}
        variant={'outlined'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
      />
      {errorToken && (
        <Typography
          variant={'overline'}
          className={classes.note}
          component={'div'}
          color={'error'}
        >
          Token required
        </Typography>
      )}
    </form>
  );
};

export default SearchForm;
