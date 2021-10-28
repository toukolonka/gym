import React from 'react';
import PropTypes from 'prop-types';

import { Button, Paper } from '@mui/material';

const ExerciseList = ({ exercises }) => (
  <Paper sx={{
    padding: 1,
    mt: 3,
  }}
  >
    {exercises.map((exercise) => (
      <div key={exercise.id}>
        <Button
          variant="outlined"
          sx={{ mb: 1, mt: 1 }}
          size="large"
          fullWidth
        >
          {exercise.name}
        </Button>
      </div>
    ))}
  </Paper>
);

ExerciseList.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  })).isRequired,
};

export default ExerciseList;
