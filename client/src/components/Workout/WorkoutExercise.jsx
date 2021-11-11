import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardActions,
  Button,
} from '@mui/material';

import SetRow from './SetRow';

const WorkoutExercise = ({
  exercise,
  sets,
  handleUpdateSet,
  handleDeleteSet,
  handleAddSet,
}) => (
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

      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={2}>
          Set
        </Grid>
        <Grid item xs={3}>
          Weight
        </Grid>
        <Grid item xs={3}>
          Reps
        </Grid>
        <Grid item xs={2}>
          Done
        </Grid>
        <Grid item xs={2}>
          Remove
        </Grid>
      </Grid>
      {sets.map((set, index) => (
        <SetRow
          key={set.id}
          set={set}
          index={index}
          handleUpdateSet={handleUpdateSet}
          handleDeleteSet={handleDeleteSet}
        />
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
          });
        }}
      >
        Add set
      </Button>
    </CardActions>
  </Card>
);

WorkoutExercise.propTypes = {
  exercise: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
    user: PropTypes.string,
  }).isRequired,
  sets: PropTypes.arrayOf(PropTypes.exact({
    weight: PropTypes.number.isRequired,
    repetitions: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    exercise: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    workout: PropTypes.string.isRequired,
  })).isRequired,
  handleUpdateSet: PropTypes.func.isRequired,
  handleDeleteSet: PropTypes.func.isRequired,
  handleAddSet: PropTypes.func.isRequired,
};

export default WorkoutExercise;
