import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import ExerciseView from '../../components/Exercise/ExerciseView';
import exerciseService from '../../services/exerciseService';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../context/auth';

const Exercise = () => {
  const [exerciseDetails, setExerciseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    exerciseService
      .getOne(id)
      .then((data) => {
        setExerciseDetails(data);
        setLoading(false);
      })
      .catch(((error) => {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }));
  }, []);

  const handleDelete = () => {
    exerciseService
      .remove(id)
      .then(() => {
        enqueueSnackbar('Exercise deleted successfully', { variant: 'success' });
        history.push('/exercises');
      })
      .catch((error) => {
        setOpen(false);
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
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
    <ExerciseView
      exerciseDetails={exerciseDetails}
      open={open}
      handleDelete={handleDelete}
      handleOpenDialog={handleOpenDialog}
      handleCancel={handleCancel}
      user={user}
    />
  );
};

export default Exercise;
