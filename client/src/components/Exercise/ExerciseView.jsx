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

const ExerciseView = ({
  exercise,
  open,
  handleDelete,
  handleOpenDialog,
  handleCancel,
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
      <Typography component="h4" variant="h4">
        {exercise.name}
      </Typography>
    </Box>
    <Box
      sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="p" variant="p" align="center">
        {exercise.description}
      </Typography>
    </Box>
    <Button
      fullWidth
      variant="contained"
      sx={{ mt: 3 }}
      color="error"
      onClick={handleOpenDialog}
    >
      Delete exercise
    </Button>
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Delete
        {' '}
        {exercise.name}
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
  </Container>
);

ExerciseView.propTypes = {
  exercise: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    user: PropTypes.string,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default ExerciseView;
