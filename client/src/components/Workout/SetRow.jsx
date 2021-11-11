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
  handleDeleteSet,
  handleUpdateSet,
}) => {
  const [weight, setWeight] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (set.weight > 0) setWeight(set.weight);
    if (set.repetitions > 0) setRepetitions(set.repetitions);
    setCompleted(set.completed);
  }, []);

  useEffect(() => {
    handleUpdateSet(set, { weight, repetitions, completed });
  }, [weight, repetitions, completed]);

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
          onChange={(event) => setRepetitions(event.target.value)}
          value={repetitions}
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
          onClick={() => {
            setCompleted(!completed);
          }}
        >
          {completed ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
        </IconButton>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          color="error"
          onClick={() => handleDeleteSet(set)}
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
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleDeleteSet: PropTypes.func.isRequired,
  handleUpdateSet: PropTypes.func.isRequired,
};

export default SetRow;
