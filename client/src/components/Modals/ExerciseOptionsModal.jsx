import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Box,
  Typography,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Modal,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ExerciseOptionsModal = ({
  exerciseOptions,
  handleExerciseButtonClick,
  buttonLabel,
}) => {
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleOpenExerciseModal = () => {
    setExerciseModalOpen(true);
  };

  const handleCloseExerciseModal = () => {
    setExerciseModalOpen(false);
    setSearchText('');
    setSearchCategory('All');
  };

  const exerciseOptionsAfterSearch = exerciseOptions.filter(
    (exercise) => exercise.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const filteredExerciseOptions = exerciseOptionsAfterSearch.filter(
    (exercise) => searchCategory === 'All' || exercise.category === searchCategory,
  );

  return (
    <>
      <Button sx={{ mt: 3 }} fullWidth variant="contained" onClick={handleOpenExerciseModal}>
        {buttonLabel}
      </Button>
      <Modal
        open={exerciseModalOpen}
        onClose={handleCloseExerciseModal}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 400,
          width: '80%',
          height: '70%',
          overflow: 'auto',
          bgcolor: 'background.paper',
          outline: 'none',
        }}
        >
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
            {filteredExerciseOptions.length === 0
              ? (
                <Typography component="h5" variant="h5" align="center">
                  No exercises found
                </Typography>
              )
              : filteredExerciseOptions.map((exercise) => (
                <div key={exercise.id}>
                  <Button
                    variant="outlined"
                    sx={{ mb: 1, mt: 1 }}
                    size="large"
                    fullWidth
                    onClick={() => {
                      handleExerciseButtonClick(exercise);
                      handleCloseExerciseModal();
                    }}
                  >
                    {exercise.name}
                  </Button>
                </div>
              ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

ExerciseOptionsModal.propTypes = {
  exerciseOptions: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    user: PropTypes.string,
  })).isRequired,
  handleExerciseButtonClick: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default ExerciseOptionsModal;
