import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Container,
} from '@mui/material';
import { useHistory } from 'react-router-dom';

import workoutService from '../../services/workoutService';
import exerciseService from '../../services/exerciseService';
import LineChart from '../../components/Home/LineChart';
import WorkoutCountTable from '../../components/Home/WorkoutCountTable';
import ExerciseOptionsModal from '../../components/Modals/ExerciseOptionsModal';

const Home = () => {
  const history = useHistory();
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseData, setExerciseData] = useState([]);
  const [workoutSetCounts, setWorkoutSetCounts] = useState([]);
  const [totalWorkoutCount, setTotalWorkoutCount] = useState(0);
  const [monthlyWorkoutCount, setMontlyWorkoutCount] = useState(0);

  useEffect(async () => {
    const exercises = await exerciseService.getAll();
    setExerciseOptions(exercises);

    // Fetch all workouts
    const workouts = await workoutService.getAll();

    // Initialize array with the dataset names
    const tempArray = [['Date', 'Sets per workout']];

    // Initialize totals
    let tempTotalCount = 0;
    let tempMonthlyCount = 0;

    const currentDate = new Date();

    // Get completed sets from workout and add to temparray
    await Object.values(workouts).forEach((workout) => {
      const workoutDate = new Date(workout.date);
      const setCount = Object.values(workout.sets)
        .filter((set) => set.completed)
        .length;
      // If setcount more than 0, add to temparray
      if (setCount) tempArray.push([workoutDate, setCount]);
      // Increase totals
      tempTotalCount += 1;

      if (workoutDate.getMonth() === currentDate.getMonth()
          && workoutDate.getFullYear() === currentDate.getFullYear()) {
        tempMonthlyCount += 1;
      }
    });
    setWorkoutSetCounts(tempArray);
    setTotalWorkoutCount(tempTotalCount);
    setMontlyWorkoutCount(tempMonthlyCount);
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
        <WorkoutCountTable
          totalWorkoutCount={totalWorkoutCount}
          monthlyWorkoutCount={monthlyWorkoutCount}
        />
        <LineChart data={workoutSetCounts} title="Sets completed per workout" />
        <Typography component="h4" variant="h4">
          Exercise Statistics
        </Typography>
        <ExerciseOptionsModal
          exerciseOptions={exerciseOptions}
          handleExerciseButtonClick={setSelectedExercise}
          buttonLabel="Select Exercise"
        />
        {selectedExercise !== null && selectedExercise.name !== null
        && (
        <Typography component="h6" variant="h6" sx={{ mt: 2 }}>
          {selectedExercise.name}
        </Typography>
        )}
        <LineChart data={exerciseData} title="1RM Progress (Calculated One Rep Max Kg)" />
      </Box>

    </Container>
  );
};

export default Home;
