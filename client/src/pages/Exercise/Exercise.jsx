import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
import exerciseService from '../../services/exerciseService';
import Loading from '../../components/Loading/Loading';

const Exercise = () => {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    exerciseService
      .getOne(id)
      .then((data) => {
        setExercise(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = () => {
    exerciseService
      .remove(id)
      .then(() => {
        history.push('/exercises');
      });
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (loading) {
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
};

export default Exercise;
