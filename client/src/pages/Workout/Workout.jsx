import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Container, Autocomplete, TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import workoutService from '../../services/workoutService';
import exerciseService from '../../services/exerciseService';
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

  if (loadingW || loadingE) {
    return (
      <Loading />
    );
  }

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
          {workout.date}
        </Typography>
      </Box>
      <Autocomplete
        disablePortal
        options={exerciseOptions}
        getOptionLabel={(option) => option.name}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="New Exercise" />}
        sx={{ mt: 3 }}
        onChange={(_, newExercise) => {
          // eslint-disable-next-line no-console
          console.log(newExercise);
        }}
      />
    </Container>
  );
};

export default Workout;
