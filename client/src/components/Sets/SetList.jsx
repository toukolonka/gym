import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardActions,
  Button,
  Box,
} from '@mui/material';

import SetRow from './SetRow';
import SetInfo from './SetInfo';

const SetList = ({
  exercise,
  sets,
  allTimeBestSet,
  handleDeleteSet,
  handleUpdateSet,
  handleAddSet,
  isTemplate,
}) => {
  const rms = sets.map(
    (set) => (set.repetitions === 1 ? set.weight : set.weight * (1 + (set.repetitions / 30))),
  );

  const maximum = Math.round(Math.max(...rms));

  return (
    <Card
      sx={{
        height: '100%',
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h5"
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              display: 'block',
              textOverflow: 'ellipsis',
              mr: 2,
            }}
          >
            {exercise.name}
          </Typography>

          {maximum > 0
          && (
          <Typography gutterBottom variant="strong" component="strong">
            1RM:
            {maximum}
          </Typography>
          )}
        </Box>

        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            Delete
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            Set
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            Weight
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            Reps
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            Done
          </Grid>
        </Grid>
        {allTimeBestSet.repetitions > 0 && <SetInfo allTimeBestSet={allTimeBestSet} />}
        {sets.map((set, index) => (
          <SetRow
            key={set.uuid}
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
};

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
    uuid: PropTypes.string.isRequired,
  })).isRequired,
  allTimeBestSet: PropTypes.exact({
    weight: PropTypes.number.isRequired,
    repetitions: PropTypes.number.isRequired,
  }).isRequired,
  handleDeleteSet: PropTypes.func.isRequired,
  handleAddSet: PropTypes.func.isRequired,
  handleUpdateSet: PropTypes.func.isRequired,
  isTemplate: PropTypes.bool.isRequired,
};

export default SetList;
