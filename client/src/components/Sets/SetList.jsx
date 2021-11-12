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

const SetList = ({
  exercise,
  sets,
  handleDeleteSet,
  handleUpdateSet,
  handleAddSet,
  isTemplate,
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
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          set={set}
          index={index + 1}
          handleUpdateSet={handleUpdateSet}
          handleDeleteSet={handleDeleteSet}
          isTemplate={isTemplate}
        />
      ))}
    </CardContent>

    <CardActions>
      <Button
        fullWidth
        variant="outlined"
        xs={6}
        onClick={() => {
          handleAddSet(exercise);
        }}
      >
        Add set
      </Button>
    </CardActions>
  </Card>
);

SetList.propTypes = {
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
  })).isRequired,
  handleDeleteSet: PropTypes.func.isRequired,
  handleAddSet: PropTypes.func.isRequired,
  handleUpdateSet: PropTypes.func.isRequired,
  isTemplate: PropTypes.bool.isRequired,
};

export default SetList;
