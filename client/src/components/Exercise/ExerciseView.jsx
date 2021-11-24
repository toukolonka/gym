import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import WorkoutList from '../Workout/WorkoutList';

const ExerciseView = ({
  exerciseDetails,
  open,
  handleDelete,
  handleOpenDialog,
  handleCancel,
  user,
}) => (
  <Container maxWidth="xs">
    <Box
      sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="xs">
        <Typography component="h4" variant="h4" align="center" style={{ wordWrap: 'break-word' }}>
          {exerciseDetails.exercise.name}
        </Typography>
      </Container>
    </Box>
    <Box
      sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="xs">
        <Typography component="p" variant="p" align="center" style={{ wordWrap: 'break-word' }}>
          {exerciseDetails.exercise.description}
        </Typography>
      </Container>
    </Box>
    <Box
      sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {exerciseDetails.maximum > 0
      && (
      <Typography component="h6" variant="h6" align="center">
        All time 1RM:
        {' '}
        {exerciseDetails.maximum}
      </Typography>
      )}
    </Box>
    {user.id === exerciseDetails.exercise.user
      && (
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        color="error"
        onClick={handleOpenDialog}
      >
        Delete exercise
      </Button>
      )}
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Delete
        {' '}
        {exerciseDetails.exercise.name}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete exercise?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    <Box
      sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h5" variant="h5" style={{ wordWrap: 'break-word' }}>
        Workouts
      </Typography>
    </Box>
    <WorkoutList workouts={exerciseDetails.workouts} />
  </Container>
);

ExerciseView.propTypes = {
  exerciseDetails: PropTypes.exact({
    exercise: PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      user: PropTypes.string,
    }).isRequired,
    workouts: PropTypes.arrayOf(PropTypes.exact({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      sets: PropTypes.arrayOf(PropTypes.exact({
        weight: PropTypes.number.isRequired,
        repetitions: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        exercise: PropTypes.object.isRequired,
        uuid: PropTypes.string.isRequired,
      })).isRequired,
      template: PropTypes.bool.isRequired,
      user: PropTypes.string.isRequired,
    })),
    maximum: PropTypes.number,
  }).isRequired,
  user: PropTypes.exact({
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    email: PropTypes.string,
    iat: PropTypes.number,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default ExerciseView;
