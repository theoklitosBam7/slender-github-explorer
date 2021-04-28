import React, { useState } from 'react';
import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  input: {
    width: '100%',
    marginBottom: '1rem',
  },
});

const SearchForm = ({ onSubmit }) => {
  const classes = useStyles();

  const [repoName, setRepoName] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (repoName.indexOf('/') > -1) {
      localStorage.setItem('Repo', repoName);
      onSubmit(repoName);
      setRepoName('');
      setError(false);
    } else {
      setError(true);
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
        error={error}
        label={error ? 'Error' : 'Search for repo: e.g. facebook/react'}
        helperText={error ? 'Incorrect entry' : ''}
        id={error ? 'outlined-error-helper-text' : ''}
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
    </form>
  );
};

export default SearchForm;
