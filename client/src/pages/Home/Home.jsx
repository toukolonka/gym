import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Container, Autocomplete, TextField,
} from '@mui/material';
import { useHistory } from 'react-router-dom';

import workoutService from '../../services/workoutService';
import exerciseService from '../../services/exerciseService';
import LineChart from '../../components/Home/LineChart';

const Home = () => {
  const history = useHistory();
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseData, setExerciseData] = useState([]);
  const [workoutSetCounts, setWorkoutSetCounts] = useState([]);

  useEffect(async () => {
    const exercises = await exerciseService.getAll();
    setExerciseOptions(exercises);

    // Fetch all workouts
    const workouts = await workoutService.getAll();

    // Initialize array with the dataset names
    const tempArray = [['Date', 'Sets per workout']];

    // Get completed sets from workout and add to temparray
    await Object.values(workouts).forEach((workout) => {
      const workoutDate = new Date(workout.date);
      const setCount = Object.values(workout.sets)
        .filter((set) => set.completed)
        .length;
      if (setCount) tempArray.push([workoutDate, setCount]);
    });
    setWorkoutSetCounts(tempArray);
  }, []);

  const handleStartWorkout = (event) => {
    event.preventDefault();
    workoutService
      .create()
      .then((createdWorkout) => {
        history.push(`/workouts/${createdWorkout.id}`);
      });
  };

  useEffect(async () => {
    const workouts = await workoutService.getAll();

    // If workouts list is empty
    if (!workouts || !selectedExercise) {
      setExerciseData([]);
      return;
    }

    const draftData = [['Date', selectedExercise.name]];

    // If there are workouts
    await Object.values(workouts).forEach((workout) => {
      const workoutdate = new Date(workout.date);

      // Get the sets for the particular exercise
      const exerciseSets = Object.values(workout.sets)
        .filter((set) => set.exercise.id === selectedExercise.id && set.completed);

      // If there are sets of selected exercise in workout
      if (exerciseSets.length > 0) {
        // Extract best rms from sets
        const rms = exerciseSets
          .map(
            (set) => set.weight * (1 + (set.repetitions / 30)),
          );
        const maximum = Math.round(Math.max(...rms));
        // Add the maximum and date to draftData
        draftData.push([workoutdate, maximum]);
      }
    });
    setExerciseData(draftData);
  }, [selectedExercise]);

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
        <Typography component="h4" variant="h4">
          Workout Statistics
        </Typography>
        <LineChart data={workoutSetCounts} title="Sets completed per workout" />
        <Typography component="h4" variant="h4">
          Exercise Statistics
        </Typography>
        <Autocomplete
          disablePortal
          fullWidth
          value={selectedExercise}
          options={exerciseOptions}
          getOptionLabel={(option) => option.name}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} label="Select Exercise" />}
          sx={{ mt: 2 }}
          onChange={(_, exercise) => {
            if (exercise !== null) {
              setSelectedExercise(exercise);
            }
          }}
        />
        <LineChart data={exerciseData} title="1RM Progress (Calculated One Rep Max Kg)" />
      </Box>

    </Container>
  );
};

export default Home;
