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
  isTemplate,
}) => {
  const [weight, setWeight] = useState(set.weight);
  const [repetitions, setRepetitions] = useState(set.repetitions);
  const [completed, setCompleted] = useState(set.completed);
  const [initiationFinished, setInitiationFinished] = useState(false);

  useEffect(() => {
    if (initiationFinished) {
      handleUpdateSet(set.uuid, { weight, repetitions, completed });
    }
    setInitiationFinished(true);
  }, [weight, repetitions, completed]);

  const handleWeightChange = (event) => {
    if (event.target.value <= 999 && event.target.value >= 0) {
      setWeight(event.target.value);
    }
  };

  const handleRepetitionsChange = (event) => {
    if (event.target.value <= 999 && event.target.value >= 0) {
      setRepetitions(event.target.value);
    }
  };

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton
          color="error"
          onClick={() => handleDeleteSet(set.uuid)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Grid>
      <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        {index}
      </Grid>
      <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          margin="normal"
          name="weight"
          label="kg"
          id="weight"
          color="primary"
          onChange={(event) => handleWeightChange(event)}
          value={weight || ''}
          inputProps={{ inputMode: 'numeric' }}
          size="small"
          type="number"
          sx={{
            ml: 1,
            mr: 1,
          }}
        />
      </Grid>
      <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          margin="normal"
          name="reps"
          label="reps"
          id="reps"
          color="primary"
          onChange={(event) => handleRepetitionsChange(event)}
          value={repetitions || ''}
          inputProps={{ inputMode: 'numeric' }}
          size="small"
          type="number"
          sx={{
            ml: 1,
            mr: 1,
          }}
        />
      </Grid>
      <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton
          color="success"
          disabled={isTemplate}
          onClick={() => {
            setCompleted(!completed);
          }}
        >
          {completed ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
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
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleDeleteSet: PropTypes.func.isRequired,
  handleUpdateSet: PropTypes.func.isRequired,
  isTemplate: PropTypes.bool.isRequired,
};

export default SetRow;
