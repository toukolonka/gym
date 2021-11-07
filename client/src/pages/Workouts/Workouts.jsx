import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Container,
} from '@mui/material';

import WorkoutList from '../../components/Workout/WorkoutList';
import workoutService from '../../services/workoutService';
import Loading from '../../components/Loading/Loading';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    workoutService
      .getAll()
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      });
  }, []);

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
          My Workouts
        </Typography>
      </Box>
      {loading
        ? <Loading />
        : (
          <WorkoutList workouts={workouts} />
        )}
    </Container>
  );
};

export default Workouts;
