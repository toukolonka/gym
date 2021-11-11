import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Autocomplete,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useParams, useHistory } from 'react-router-dom';

import workoutService from '../../services/workoutService';
import exerciseService from '../../services/exerciseService';
import setService from '../../services/setService';
import Loading from '../../components/Loading/Loading';
import WorkoutExercise from '../../components/Workout/WorkoutExercise';

const Workout = () => {
  const [workout, setWorkout] = useState(null);
  const [exerciseOptions, setExerciseOptions] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [open, setOpen] = useState(false);
  const [loadingW, setLoadingW] = useState(true);
  const [loadingE, setLoadingE] = useState(true);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    workoutService
      .getOne(id)
      .then((data) => {
        setWorkout(data);
        setLoadingW(false);
      });
  }, []);

  useEffect(() => {
    exerciseService
      .getAll()
      .then((data) => {
        setExerciseOptions(data);
        setLoadingE(false);
      });
  }, []);

  const handleFinishAndSave = () => {
    history.push('/workouts');
  };

  const handleDeleteWorkout = () => {
    workoutService
      .remove(id)
      .then(() => {
        history.push('/workouts');
      })
      .catch(() => {
        setOpen(false);
      });
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAddSet = (set) => {
    setService
      .create({ ...set, workoutId: workout.id })
      .then((updatedWorkout) => {
        setWorkout(updatedWorkout);
      });
  };

  const handleUpdateSet = (set, weight, repetitions) => {
    setService
      .update({
        ...set,
        weight,
        repetitions,
        completed: !set.completed,
      }, set.id)
      .then((updatedWorkout) => {
        setWorkout(updatedWorkout);
      });
  };

  const handleDeleteSet = (setId) => {
    setService
      .remove(setId)
      .then((updatedWorkout) => {
        setWorkout(updatedWorkout);
      });
  };

  if (loadingW || loadingE) {
    return (
      <Loading />
    );
  }

  const exercises = Array.from(new Set(workout.sets.map((set) => set.exercise.id)))
    .map((exerciseId) => ({
      id: exerciseId,
      name: workout.sets.find((s) => s.exercise.id === exerciseId).exercise.name,
      description: workout.sets.find((s) => s.exercise.id === exerciseId).exercise.description,
      category: workout.sets.find((s) => s.exercise.id === exerciseId).exercise.category,
      user: workout.sets.find((s) => s.exercise.id === exerciseId).exercise.user,
    }));

  /*
  const optionsForAutocomplete = exerciseOptions.filter(
    (exercise) => exercises.find((e) => e.id === exercise.id) === undefined,
  );
  */

  return (
    <Container maxWidth="xs" sx={{ mb: 10 }}>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h3" variant="h3">
          Workout
        </Typography>
        <Typography component="p" variant="p">
          {new Date(workout.date).toLocaleDateString(undefined, {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          })}
        </Typography>
      </Box>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        color="success"
        onClick={handleFinishAndSave}
      >
        Finish and save
      </Button>
      {exercises.map((exercise) => (
        <WorkoutExercise
          key={exercise.id}
          exercise={exercise}
          sets={workout.sets.filter((s) => s.exercise.id === exercise.id)}
          handleAddSet={handleAddSet}
          handleUpdateSet={handleUpdateSet}
          handleDeleteSet={handleDeleteSet}
        />
      ))}
      <Autocomplete
        disablePortal
        value={selectedExercise}
        options={exerciseOptions}
        getOptionLabel={(option) => option.name}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="New Exercise" />}
        sx={{ mt: 3 }}
        onChange={(_, exercise) => {
          setSelectedExercise(exercise);
          if (exercise !== null) {
            handleAddSet({
              weight: 0,
              repetitions: 0,
              exerciseId: exercise.id,
            });
            setSelectedExercise(null);
          }
        }}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        color="error"
        onClick={handleOpenDialog}
      >
        Delete Workout
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Delete workout
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the workout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleDeleteWorkout} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Workout;
