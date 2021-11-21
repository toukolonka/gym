import React, { useState, useEffect, useRef } from 'react';
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
import { v4 as uuidv4 } from 'uuid';

import workoutService from '../../services/workoutService';
import exerciseService from '../../services/exerciseService';
import templateService from '../../services/templateService';
import Loading from '../../components/Loading/Loading';
import SetList from '../../components/Sets/SetList';
import WorkoutHeader from '../../components/Workout/WorkoutHeader';

const Workout = () => {
  const [workouts, setWorkouts] = useState(null);
  const [workout, setWorkout] = useState(null);
  const [exerciseOptions, setExerciseOptions] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [initiationFinished, setInitiationFinished] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loadingW, setLoadingW] = useState(true);
  const [loadingE, setLoadingE] = useState(true);
  const { id } = useParams();
  const history = useHistory();
  const workoutRef = useRef();

  useEffect(() => {
    workoutService
      .getAll()
      .then((data) => {
        setWorkouts(data);
      });
  }, []);

  useEffect(() => {
    workoutService
      .getOne(id)
      .then((data) => {
        setWorkout(data);
        setLoadingW(false);
        setInitiationFinished(true);
      });
  }, []);

  useEffect(() => () => {
    workoutRef.current = workout;
  }, [workout]);

  useEffect(() => {
    exerciseService
      .getAll()
      .then((data) => {
        setExerciseOptions(data);
        setLoadingE(false);
      });
  }, []);

  useEffect(() => {
    if (workout && initiationFinished) {
      workoutService
        .update(id, workout);
    }
  }, [workout]);

  const handleFinishAndSave = () => {
    workoutService
      .update(id, workout)
      .then(() => {
        history.push('/workouts');
      });
  };

  const handleDeleteWorkout = () => {
    workoutService
      .remove(id)
      .then(() => {
        history.push('/workouts');
      })
      .catch(() => {
        setDeleteDialogOpen(false);
      });
  };

  // Delete workout if workout does not contain any sets and is created under a minute ago
  // Equivalent to componentWillUnmount lifecycle method
  useEffect(() => () => {
    if (workoutRef
      && workoutRef.current !== null
      && workoutRef.current.sets.length === 0
      && (new Date()) - (new Date(workoutRef.current.date)) < 60000) {
      workoutService.remove(id);
    }
  }, []);

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleOpenTemplateDialog = () => {
    setTemplateDialogOpen(true);
  };

  const handleTemplateDialogCancel = () => {
    setTemplateDialogOpen(false);
  };

  const getPreviousSet = (exercise) => {
    // Check exercise sets from current workout
    const exerciseSets = workout.sets.filter((set) => set.exercise.id === exercise.id);
    if (exerciseSets.length === 0) {
      // Check exercise sets from previous workouts
      const prevWorkout = workouts.find(({ sets }) => (
        sets.find((set) => set.exercise.id === exercise.id)
      ));
      if (!prevWorkout) {
        return {
          weight: 0,
          repetitions: 0,
        };
      }
      const lastSet = prevWorkout.sets.find((set) => set.exercise.id === exercise.id);
      return {
        weight: lastSet.weight,
        repetitions: lastSet.repetitions,
      };
    }
    const lastSet = exerciseSets.pop();
    return {
      weight: lastSet.weight,
      repetitions: lastSet.repetitions,
    };
  };

  const handleAddSet = (exercise) => {
    const set = getPreviousSet(exercise);
    setWorkout({
      ...workout,
      sets: workout.sets.concat({
        weight: set.weight,
        repetitions: set.repetitions,
        completed: false,
        exercise,
        uuid: uuidv4(),
      }),
    });
  };

  const handleUpdateSet = (uuid, values) => {
    setWorkout({
      ...workout,
      sets: workout.sets.map((set) => (
        set.uuid === uuid ? {
          ...set,
          weight: Number(values.weight),
          repetitions: Number(values.repetitions),
          completed: values.completed,
        } : set)),
    });
  };

  const handleDeleteSet = (uuid) => {
    setWorkout({
      ...workout,
      sets: workout.sets.filter((set) => set.uuid !== uuid),
    });
  };

  const handleCreateTemplate = () => {
    templateService.createFromWorkout(id)
      .then(() => handleFinishAndSave());
  };

  const handleUpdateName = (name) => {
    setWorkout({
      ...workout,
      name,
    });
  };

  if (loadingW || loadingE) {
    return (
      <Loading />
    );
  }

  const workoutText = 'Workout';

  const exercises = Array.from(new Set(workout.sets.map((set) => set.exercise.id)))
    .map((exerciseId) => ({
      id: exerciseId,
      name: workout.sets.find((s) => s.exercise.id === exerciseId).exercise.name,
      description: workout.sets.find((s) => s.exercise.id === exerciseId).exercise.description,
      category: workout.sets.find((s) => s.exercise.id === exerciseId).exercise.category,
      user: workout.sets.find((s) => s.exercise.id === exerciseId).exercise.user,
    }));

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
        <WorkoutHeader name={workout.name} handleUpdateName={handleUpdateName} />
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
        onClick={handleOpenTemplateDialog}
      >
        Finish and save
      </Button>
      <Dialog
        open={templateDialogOpen}
        onClose={handleTemplateDialogCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Create a template?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a template based on workout data or just save the workout
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFinishAndSave} autoFocus>
            Save workout
          </Button>
          <Button onClick={handleCreateTemplate} autoFocus>
            Create template
          </Button>
        </DialogActions>
      </Dialog>
      {exercises.map((exercise) => (
        <SetList
          key={exercise.id}
          exercise={exercise}
          sets={workout.sets.filter((s) => s.exercise.id === exercise.id)}
          handleAddSet={handleAddSet}
          handleUpdateSet={handleUpdateSet}
          handleDeleteSet={handleDeleteSet}
          isTemplate={workout.template}
        />
      ))}
      <Autocomplete
        blurOnSelect
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
            handleAddSet(exercise);
            setSelectedExercise(null);
          }
        }}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        color="error"
        onClick={handleOpenDeleteDialog}
      >
        Delete
        {' '}
        {workoutText}
      </Button>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Delete
          {' '}
          {workoutText}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the
            {' '}
            {workoutText}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDeleteDialogCancel}>
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
