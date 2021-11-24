import React from 'react';
import propTypes from 'prop-types';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardActionArea,
} from '@mui/material';
import { useHistory } from 'react-router-dom';

const WorkoutList = ({ workouts }) => {
  const history = useHistory();

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
    workouts.length === 0
      ? (
        <Typography component="h6" variant="h6" align="center">
          No workouts found
        </Typography>
      )
      : workouts.map((workout) => (
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
            <CardActionArea onClick={() => history.push(`../workouts/${workout.id}`)}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Grid container>
                  <Grid item xs={10}>
                    <Typography gutterBottom variant="h4" component="h4" style={{ wordWrap: 'break-word' }}>
                      {workout.name.trim() !== '' ? workout.name : 'Workout'}
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
                    <Typography variant="h6">
                      Exercise
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6">
                      Sets
                    </Typography>
                  </Grid>
                </Grid>
                {extractExercises(workout.sets).map((exercise) => (
                  <div key={exercise.name}>
                    <Grid container>
                      <Grid item xs={8}>
                        <Typography variant="body1">
                          {exercise.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body1">
                          {exercise.setCount}
                        </Typography>
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
    name: propTypes.string.isRequired,
    date: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
    sets: propTypes.arrayOf(propTypes.exact({
      weight: propTypes.number.isRequired,
      repetitions: propTypes.number.isRequired,
      completed: propTypes.bool.isRequired,
      exercise: propTypes.object.isRequired,
      uuid: propTypes.string.isRequired,
    })).isRequired,
    template: propTypes.bool.isRequired,
    user: propTypes.string.isRequired,
  })).isRequired,
};

export default WorkoutList;
