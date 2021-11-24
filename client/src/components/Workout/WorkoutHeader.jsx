/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography, Container } from '@mui/material';

const WorkoutHeader = ({ name, label, handleUpdateName }) => {
  const [workoutName, setWorkoutName] = useState(name);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [initiationFinished, setInitiationFinished] = useState(false);

  useEffect(() => {
    if (initiationFinished) {
      const timeOutId = setTimeout(() => handleUpdateName(
        workoutName,
      ), 1000);
      return () => clearTimeout(timeOutId);
    }
    return setInitiationFinished(true);
  }, [workoutName]);

  const placeholder = (
    <TextField
      variant="standard"
      inputProps={{ style: { fontSize: 30, textAlign: 'center' }, inputMode: 'text', maxLength: 30 }} // font size of input text
      value={workoutName}
      placeholder={label}
      onClick={() => setIsNameFocused(true)}
      onKeyPress={(event) => { if (event.key === 'Enter') setIsNameFocused(false); }}
    />
  );

  const input = (
    <TextField
      autoFocus
      variant="standard"
      inputProps={{ style: { fontSize: 30, textAlign: 'center' }, inputMode: 'text', maxLength: 30 }} // font size of input text
      value={workoutName}
      onChange={(event) => setWorkoutName(event.target.value)}
      onKeyPress={(event) => { if (event.key === 'Enter') setIsNameFocused(false); }}
      onBlur={() => setIsNameFocused(false)}
    />
  );

  const header = (
    <Container maxWidth="xs">
      <Typography
        fontSize={30}
        align="center"
        onClick={() => setIsNameFocused(true)}
        style={{ wordWrap: 'break-word' }}
      >
        {workoutName}
      </Typography>
    </Container>
  );

  return (
    <div>
      {(!isNameFocused && workoutName.trim() === '') ? (
        placeholder
      ) : (
        (!isNameFocused) ? header : (
          input
        ))}
    </div>
  );
};

WorkoutHeader.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleUpdateName: PropTypes.func.isRequired,
};

export default WorkoutHeader;
