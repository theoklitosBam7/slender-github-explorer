import React, { useState } from 'react';
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
  TableRow,
  Typography,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_ISSUES_INFO } from './queries';
import getComparator from './utilities/getComparator';
import stableSort from './utilities/stableSort';
import EnhancedTableHead from './EnhancedTableHead';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 750,
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
  note: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const headCells = [
  { id: 'number', numeric: false, label: 'No' },
  { id: 'title', numeric: false, label: 'Title' },
  { id: 'author.login', numeric: false, label: 'Author' },
  { id: 'comments.totalCount', numeric: true, label: 'Comments' },
  { id: 'createdAt', numeric: false, label: 'Created At' },
  { id: 'state', numeric: false, label: 'State' },
];

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
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('comments.totalCount');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

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
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <EnhancedTableHead
                classes={classes}
                headCells={headCells}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(
                  data.repository.issues.edges,
                  getComparator(order, orderBy)
                ).map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell align="left"> #{row.number}</TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.author.login}</TableCell>
                    <TableCell align="right">
                      {row.comments.totalCount}
                    </TableCell>
                    <TableCell align="left">
                      {row.createdAt.split('T')[0]}
                    </TableCell>
                    <TableCell align="left">{row.state}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>

      <Button
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
