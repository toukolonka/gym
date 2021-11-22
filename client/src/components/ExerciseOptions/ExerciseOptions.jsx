import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Box, Typography, TextField, InputAdornment, ToggleButtonGroup, ToggleButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ExerciseOptions = ({
  exercises,
  handleSearchTextChange,
  searchText,
  handleSearchCategoryChange,
  searchCategory,
  handleAddSet,
  handleCloseExerciseModal,
}) => (
  <Box sx={{ margin: 2 }}>
    <TextField
      sx={{ mb: 1 }}
      fullWidth
      name="search"
      label="Search"
      type="search"
      id="search"
      color="primary"
      onChange={handleSearchTextChange}
      value={searchText}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
    <ToggleButtonGroup
      color="primary"
      exclusive
      margin="normal"
      fullWidth
      sx={{ mt: 1, mb: 1 }}
      onChange={handleSearchCategoryChange}
      value={searchCategory}
    >
      <ToggleButton value="All">All</ToggleButton>
      <ToggleButton value="Upper">Upper</ToggleButton>
      <ToggleButton value="Core">Core</ToggleButton>
      <ToggleButton value="Legs">Legs</ToggleButton>
    </ToggleButtonGroup>
    {exercises.length === 0
      ? (
        <Typography component="h5" variant="h5" align="center">
          No exercises found
        </Typography>
      )
      : exercises.map((exercise) => (
        <div key={exercise.id}>
          <Button
            variant="outlined"
            sx={{ mb: 1, mt: 1 }}
            size="large"
            fullWidth
            onClick={() => {
              handleAddSet(exercise);
              handleCloseExerciseModal();
            }}
          >
            {exercise.name}
          </Button>
        </div>
      ))}
  </Box>
);

ExerciseOptions.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    user: PropTypes.string,
  })).isRequired,
  handleSearchTextChange: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  handleSearchCategoryChange: PropTypes.func.isRequired,
  searchCategory: PropTypes.string.isRequired,
  handleAddSet: PropTypes.func.isRequired,
  handleCloseExerciseModal: PropTypes.func.isRequired,
};

export default ExerciseOptions;
