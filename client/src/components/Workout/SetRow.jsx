import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SetRow = ({
  set,
  index,
  handleUpdateSet,
  handleDeleteSet,
}) => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  useEffect(() => {
    if (set.weight > 0) setWeight(set.weight);
    if (set.repetitions > 0) setReps(set.repetitions);
  }, []);

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={2}>
        {index}
      </Grid>
      <Grid item xs={3}>
        <TextField
          margin="normal"
          name="weight"
          label="kg"
          id="weight"
          color="primary"
          onChange={(event) => setWeight(event.target.value)}
          value={weight}
          inputProps={{ inputMode: 'numeric' }}
          size="small"
          type="number"
          sx={{
            mr: 2,
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          margin="normal"
          name="reps"
          label="reps"
          id="reps"
          color="primary"
          onChange={(event) => setReps(event.target.value)}
          value={reps}
          inputProps={{ inputMode: 'numeric' }}
          size="small"
          type="number"
          sx={{
            mr: 2,
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <IconButton
          color="success"
          disabled={weight <= 0 || reps <= 0}
          onClick={() => handleUpdateSet(set, weight, reps)}
        >
          {set.completed ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
        </IconButton>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          color="error"
          onClick={() => handleDeleteSet(set.id)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

SetRow.propTypes = {
  set: PropTypes.exact({
    weight: PropTypes.number.isRequired,
    repetitions: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    exercise: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    workout: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleUpdateSet: PropTypes.func.isRequired,
  handleDeleteSet: PropTypes.func.isRequired,
};

export default SetRow;
