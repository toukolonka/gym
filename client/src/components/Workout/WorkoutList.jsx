import React from 'react';
import propTypes from 'prop-types';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardActionArea,
} from '@mui/material';

const WorkoutList = ({ workouts }) => {
  const extractExercises = (sets) => {
    const uniqueExercises = Array.from(new Set(sets.map((set) => set.exercise.name)));
    const exercises = uniqueExercises.map((exercise) => (
      {
        name: exercise,
        setCount: sets.filter((set) => set.exercise.name === exercise).length,
      }
    ));
    return exercises;
  };

  return (
    workouts.map((workout) => (
      <div key={workout.id}>
        <Card sx={{
          height: '100%',
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          border: 2,
          borderColor: 'primary.dark',
        }}
        >
          <CardActionArea href={`workouts/${workout.id}`}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Grid container>
                <Grid item xs={10}>
                  <Typography gutterBottom variant="h5" component="h5">
                    Workout Name
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    {new Date(workout.date).toLocaleDateString(undefined, {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <strong>Exercise</strong>
                </Grid>
                <Grid item xs={4}>
                  <strong>Sets</strong>
                </Grid>
              </Grid>
              {extractExercises(workout.sets).map((exercise) => (
                <div key={exercise.name}>
                  <Grid container>
                    <Grid item xs={8}>
                      {exercise.name}
                    </Grid>
                    <Grid item xs={4}>
                      {exercise.setCount}
                    </Grid>
                  </Grid>
                </div>
              ))}
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    ))
  );
};

WorkoutList.propTypes = {
  workouts: propTypes.arrayOf(propTypes.exact({
    date: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
    sets: propTypes.arrayOf(propTypes.exact({
      weight: propTypes.number.isRequired,
      repetitions: propTypes.number.isRequired,
      completed: propTypes.bool.isRequired,
      exercise: propTypes.object.isRequired,
    })).isRequired,
    template: propTypes.bool.isRequired,
    user: propTypes.string.isRequired,
  })),
};

export default WorkoutList;
