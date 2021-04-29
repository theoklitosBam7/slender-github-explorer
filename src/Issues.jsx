import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@apollo/client';
import { GET_ISSUES_INFO } from './queries';
import { CircularProgress, Typography } from '@material-ui/core';

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
});

const Issues = ({ repoName, issuesState }) => {
  const classes = useStyles();
  const repo = localStorage.getItem('Repo');
  const [owner = '', name = ''] = repo ? repo.split('/') : repoName.split('/');
  const { loading, error, data } = useQuery(GET_ISSUES_INFO, {
    variables: {
      name: name,
      owner: owner,
      issStates: issuesState,
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

  if (!data) {
    return (
      <Typography
        variant={'overline'}
        className={classes.note}
        component={'div'}
        color={'primary'}
      >
        There is no such repository!
      </Typography>
    );
  }

  return (
    <>
      <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Author</TableCell>
              <TableCell align="center">Comments</TableCell>
              <TableCell align="center">Created At</TableCell>
              <TableCell align="center">State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.repository.issues.edges.map(({ node }) => (
              <TableRow key={node.number}>
                <TableCell align="center"> #{node.number}</TableCell>
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

export default Issues;
