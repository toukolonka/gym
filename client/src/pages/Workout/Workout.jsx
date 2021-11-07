import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Autocomplete,
  TextField,
  Card,
  CardContent,
  Grid,
  CardActions,
  Button,
  IconButton,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useParams } from 'react-router-dom';

import workoutService from '../../services/workoutService';
import exerciseService from '../../services/exerciseService';
import setService from '../../services/setService';
import Loading from '../../components/Loading/Loading';

const Workout = () => {
  const [workout, setWorkout] = useState(null);
  const [exerciseOptions, setExerciseOptions] = useState(null);
  const [loadingW, setLoadingW] = useState(true);
  const [loadingE, setLoadingE] = useState(true);
  const { id } = useParams();

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

  const handleAddSet = (set) => {
    setService
      .create(set)
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

  const optionsForAutocomplete = exerciseOptions.filter(
    (exercise) => exercises.find((e) => e.id === exercise.id) === undefined,
  );

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
          Workout
        </Typography>
        <Typography component="p" variant="p">
          {new Date(workout.date).toLocaleDateString(undefined, {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          })}
        </Typography>
      </Box>
      {exercises.map((exercise) => (
        <div key={exercise.id}>
          <Card
            sx={{
              height: '100%',
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h5">
                {exercise.name}
              </Typography>

              <Grid container>
                <Grid item xs={6}>
                  Set
                </Grid>
                <Grid item xs={2}>
                  Weight
                </Grid>
                <Grid item xs={2}>
                  Reps
                </Grid>
                <Grid item xs={2}>
                  Remove
                </Grid>
              </Grid>
              {workout.sets.map((set) => (
                set.exercise.id === exercise.id
                && (
                <div key={set.id}>
                  <Grid container>
                    <Grid item xs={6}>
                      {set.exercise.name}
                    </Grid>
                    <Grid item xs={2}>
                      {set.weight}
                    </Grid>
                    <Grid item xs={2}>
                      {set.repetitions}
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteSet(set.id)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </div>
                )
              ))}
            </CardContent>

            <CardActions>
              <Button
                fullWidth
                variant="outlined"
                xs={6}
                onClick={() => {
                  handleAddSet({
                    weight: 0,
                    repetitions: 0,
                    exerciseId: exercise.id,
                    workoutId: workout.id,
                  });
                }}
              >
                Add set
              </Button>
            </CardActions>
          </Card>
        </div>
      ))}
      <Autocomplete
        disablePortal
        options={optionsForAutocomplete}
        getOptionLabel={(option) => option.name}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="New Exercise" />}
        sx={{ mt: 3 }}
        onChange={(_, exercise) => {
          if (exercise !== null) {
            handleAddSet({
              weight: 0,
              repetitions: 0,
              exerciseId: exercise.id,
              workoutId: workout.id,
            });
          }
        }}
      />
    </Container>
  );
};

export default Workout;
