import React from 'react';
import propTypes from 'prop-types';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardActionArea,
} from '@mui/material';

const WorkoutList = ({ workouts }) => (
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
              <Grid item xs={6}>
                <strong>Set</strong>
              </Grid>
              <Grid item xs={3}>
                <strong>Weight</strong>
              </Grid>
              <Grid item xs={3}>
                <strong>Reps</strong>
              </Grid>
            </Grid>
            {workout.sets.map((set) => (
              <div key={set.id}>
                <Grid container>
                  <Grid item xs={6}>
                    {set.exercise.name}
                  </Grid>
                  <Grid item xs={3}>
                    {set.weight}
                  </Grid>
                  <Grid item xs={3}>
                    {set.repetitions}
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

WorkoutList.propTypes = {
  workouts: propTypes.arrayOf(propTypes.exact({
    date: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
    sets: propTypes.arrayOf(propTypes.exact({
      weight: propTypes.number.isRequired,
      repetitions: propTypes.number.isRequired,
      exercise: propTypes.object.isRequired,
      id: propTypes.string.isRequired,
      workout: propTypes.string.isRequired,
    })).isRequired,
    template: propTypes.bool.isRequired,
    user: propTypes.string.isRequired,
  })),
};

export default WorkoutList;
