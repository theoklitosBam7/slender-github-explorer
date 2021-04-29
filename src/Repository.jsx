import React from 'react';
import {
  CircularProgress,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import { GET_BASIC_REPO_INFO } from './queries';
import RepoIssues from './RepoIssues';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    marginTop: '1rem',
  },
  note: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '1rem',
  },
});

const Repository = ({ repoName }) => {
  const classes = useStyles();
  const repo = localStorage.getItem('Repo');

  const [owner = '', name = ''] = repo ? repo.split('/') : repoName.split('/');
  const { loading, error, data } = useQuery(GET_BASIC_REPO_INFO, {
    variables: {
      name: name,
      owner: owner,
    },
  });

  if (loading) {
    return (
      <div className={classes.spinnerContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    console.log({ ...error });
    const { message } = error;
    return (
      <Typography
        variant={'overline'}
        className={classes.note}
        component={'div'}
        color={'error'}
      >
        {message}
      </Typography>
    );
  }

  const routes = ['/issues', '/pull-requests', '/forks'];
  return (
    <>
      <Typography variant={'h5'} component={'div'}>
        {repo ? repo : repoName}
      </Typography>
      <Typography variant={'subtitle1'} component={'div'}>
        {data.repository.description}
      </Typography>

      <BrowserRouter>
        <Route
          path="/"
          render={(history) => (
            <>
              <Paper square className={classes.root}>
                <Tabs
                  value={
                    history.location.pathname !== '/'
                      ? history.location.pathname
                      : false
                  }
                >
                  <Tab
                    value={routes[0]}
                    label={`issues (${data.repository.issues.totalCount})`}
                    component={Link}
                    to={routes[0]}
                  />
                  <Tab
                    value={routes[1]}
                    label={`pull requests (${data.repository.pullRequests.totalCount})`}
                    component={Link}
                    to={routes[1]}
                  />
                  <Tab
                    value={routes[2]}
                    label={`forks (${data.repository.forkCount})`}
                    component={Link}
                    to={routes[2]}
                  />
                </Tabs>
              </Paper>
            </>
          )}
        />

        <Switch>
          <Route
            path={routes[0]}
            render={() => <RepoIssues repoName={repoName} />}
          />
          <Route path={routes[1]} />
          <Route path={routes[2]} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Repository;
