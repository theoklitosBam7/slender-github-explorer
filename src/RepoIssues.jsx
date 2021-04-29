import React, { useState } from 'react';
import FilterIssues from './FilterIssues';
import Issues from './Issues';

const RepoIssues = ({ repoName }) => {
  const [state, setState] = useState(['OPEN']);

  const filterIssues = (filter) => {
    if (filter === 'ALL') {
      setState(['OPEN', 'CLOSED']);
    } else {
      setState([filter]);
    }
  };

  const filterState = (filter) => {
    filterIssues(filter);
  };

  return (
    <>
      <FilterIssues filterState={filterState} />
      <Issues repoName={repoName} states={state} />
    </>
  );
};

export default RepoIssues;
