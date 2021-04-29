import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const FilterIssues = ({ filterState }) => {
  const classes = useStyles();
  const [state, setState] = React.useState('OPEN');

  const handleChange = (event) => {
    setState(event.target.value);
    filterState(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          State
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={state}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value={'OPEN'}>OPEN</MenuItem>
          <MenuItem value={'CLOSED'}>CLOSED</MenuItem>
          <MenuItem value={'ALL'}>ALL</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterIssues;
