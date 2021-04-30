import React, { useState } from 'react';
import StarIcon from '@material-ui/icons/Star';
import { Chip, makeStyles } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { STAR_REPO, UNSTAR_REPO } from './queries';

const useStyles = makeStyles({
  chip: {
    marginLeft: '1rem',
  },
});

const StarRepo = ({ id, viewerHasStarred, totalCount }) => {
  const classes = useStyles();
  const [starRepo] = useMutation(STAR_REPO);
  const [unStarRepo] = useMutation(UNSTAR_REPO);
  const [starCount, setStarCount] = useState(totalCount);
  const [hasStarred, setHasStarred] = useState(viewerHasStarred);

  const handleClick = (e) => {
    if (!hasStarred) {
      starRepo({
        variables: { repoId: id },
      }).then((res) => {
        setStarCount(res.data.addStar.starrable.stargazers.totalCount);
        setHasStarred(true);
      });
    } else {
      unStarRepo({
        variables: { repoId: id },
      }).then((res) => {
        setStarCount(res.data.removeStar.starrable.stargazers.totalCount);
        setHasStarred(false);
      });
    }
  };

  return (
    <Chip
      label={hasStarred ? `Unstar | ${starCount}` : `Star | ${starCount}`}
      avatar={<StarIcon />}
      className={classes.chip}
      onClick={(e) => handleClick(e)}
    />
  );
};

export default StarRepo;
