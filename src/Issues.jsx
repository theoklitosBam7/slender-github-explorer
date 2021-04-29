import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
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
import { GET_ISSUES_INFO } from './queries';

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

const Issues = ({ repoName, states }) => {
  const classes = useStyles();
  const first = 20;
  const repo = localStorage.getItem('Repo');
  const [owner = '', name = ''] = repo ? repo.split('/') : repoName.split('/');
  const { loading, error, data, fetchMore } = useQuery(GET_ISSUES_INFO, {
    variables: {
      name,
      owner,
      first,
      after: null,
      states,
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

  const { endCursor, hasNextPage } = data.repository.issues.pageInfo;

  const loadMore = () => {
    fetchMore({
      variables: { name, owner, first, states, after: endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.repository.issues.edges = [
          ...prevResult.repository.issues.edges,
          ...fetchMoreResult.repository.issues.edges,
        ];
        return fetchMoreResult;
      },
    });
  };

  return (
    <>
      <Chip
        className={classes.chip}
        label={`Loaded: ${data.repository.issues.edges.length}`}
        variant="outlined"
        color={'primary'}
      />
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

      <Button
        className={classes.root}
        variant="contained"
        color="primary"
        disabled={!hasNextPage}
        onClick={() => loadMore()}
      >
        Load More
      </Button>
    </>
  );
};

export default Issues;
