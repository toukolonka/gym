import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Container, Button,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import WorkoutList from '../../components/Workout/WorkoutList';
import workoutService from '../../services/workoutService';
import Loading from '../../components/Loading/Loading';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    workoutService
      .getAll()
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(((error) => {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }));
  }, []);

  const handleStartWorkout = (event) => {
    event.preventDefault();
    workoutService
      .create()
      .then((createdWorkout) => {
        history.push(`/workouts/${createdWorkout.id}`);
      })
      .catch(((error) => {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }));
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
          My Workouts
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
      {loading
        ? <Loading />
        : (
          <WorkoutList workouts={workouts} />
        )}
    </Container>
  );
};

export default Workouts;
