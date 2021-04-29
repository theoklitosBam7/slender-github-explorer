import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_PULL_REQUESTS_INFO } from './queries';

const useStyles = makeStyles({
  root: {
    marginTop: '1rem',
  },
  table: {
    minWidth: 650,
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '1rem',
  },
  chip: {
    marginTop: '1rem',
    marginLeft: '1rem',
  },
});

const PullRequests = ({ repoName }) => {
  const classes = useStyles();
  const first = 20;
  const repo = localStorage.getItem('Repo');
  const [owner = '', name = ''] = repo ? repo.split('/') : repoName.split('/');
  const { loading, error, data } = useQuery(GET_PULL_REQUESTS_INFO, {
    variables: {
      name,
      owner,
      first,
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
        Error: {message}
      </Typography>
    );
  }

  return (
    <>
      <Chip
        className={classes.chip}
        label={`Loaded: ${data.repository.pullRequests.edges.length}`}
        variant="outlined"
        color={'primary'}
      />
      <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Author</TableCell>
              <TableCell align="center">Comments</TableCell>
              <TableCell align="center">Created At</TableCell>
              <TableCell align="center">State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.repository.pullRequests.edges.map(({ node }) => (
              <TableRow key={node.id}>
                <TableCell align="center">{node.title}</TableCell>
                <TableCell align="center">{node.author.login}</TableCell>
                <TableCell align="center">{node.comments.totalCount}</TableCell>
                <TableCell align="center">
                  {node.createdAt.split('T')[0]}
                </TableCell>
                <TableCell align="center">{node.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PullRequests;
