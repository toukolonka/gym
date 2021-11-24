import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography, Box, TextField, Button, ToggleButtonGroup, ToggleButton, Paper,
} from '@mui/material';

const ExerciseForm = ({
  newExerciseName,
  newExerciseDescription,
  newExerciseCategory,
  handleNameChange,
  handleDescriptionChange,
  handleCategoryChange,
  handleSubmit,
  setShowForm,
}) => (
  <Paper sx={{
    padding: 1,
    mt: 3,
  }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h5" variant="h5">
        Create exercise
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          name="exerciseName"
          label="Exercise name"
          id="exerciseName"
          color="primary"
          onChange={handleNameChange}
          value={newExerciseName}
          inputProps={{ maxLength: 40 }}
        />
        <TextField
          margin="normal"
          fullWidth
          name="exerciseDescription"
          label="Description"
          id="exerciseDescription"
          color="primary"
          multiline
          onChange={handleDescriptionChange}
          value={newExerciseDescription}
          inputProps={{ maxLength: 200 }}
        />
        <ToggleButtonGroup
          color="primary"
          exclusive
          margin="normal"
          onChange={handleCategoryChange}
          value={newExerciseCategory}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          <ToggleButton value="Upper">Upper</ToggleButton>
          <ToggleButton value="Core">Core</ToggleButton>
          <ToggleButton value="Legs">Legs</ToggleButton>
        </ToggleButtonGroup>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          color="success"
          disabled={newExerciseName.length < 3 || newExerciseDescription.length < 3}
        >
          Save exercise
        </Button>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 3 }}
          color="error"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  </Paper>
);

ExerciseForm.propTypes = {
  newExerciseName: PropTypes.string.isRequired,
  newExerciseDescription: PropTypes.string.isRequired,
  newExerciseCategory: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
};

export default ExerciseForm;
