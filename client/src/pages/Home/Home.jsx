import React from 'react';
import {
  Box, Typography, Button, Container,
} from '@mui/material';
import { useHistory } from 'react-router-dom';

import workoutService from '../../services/workoutService';

const Home = () => {
  const history = useHistory();

  const handleStartWorkout = (event) => {
    event.preventDefault();
    workoutService
      .create()
      .then((createdWorkout) => {
        history.push(`/workouts/${createdWorkout.id}`);
      });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h3" variant="h3">
          Home
        </Typography>
      </Box>
      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{ mt: 2 }}
        color="primary"
        onClick={handleStartWorkout}
      >
        Start an empty workout
      </Button>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h3" variant="h3">
          Statistics
        </Typography>
      </Box>

    </Container>
  );
};

export default Home;
