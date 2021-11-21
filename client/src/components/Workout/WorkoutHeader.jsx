import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const WorkoutHeader = ({ name, handleUpdateName }) => {
  const [workoutName, setWorkoutName] = useState(name);

  useEffect(() => {
    const timeOutId = setTimeout(() => handleUpdateName(
      workoutName,
    ), 1000);
    return () => clearTimeout(timeOutId);
  }, [workoutName]);

  return (
    <TextField
      label="Workout name"
      value={workoutName}
      inputProps={{ style: { fontSize: 25 }, inputMode: 'text' }} // font size of input text
      InputLabelProps={{ style: { fontSize: 25 } }} // font size of input label
      onChange={(event) => setWorkoutName(event.target.value)}
    />
  );
};

WorkoutHeader.propTypes = {
  name: PropTypes.string.isRequired,
  handleUpdateName: PropTypes.func.isRequired,
};

export default WorkoutHeader;
