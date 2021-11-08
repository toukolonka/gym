import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import ExerciseView from '../../components/Exercise/ExerciseView';
import exerciseService from '../../services/exerciseService';
import Loading from '../../components/Loading/Loading';

const Exercise = () => {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
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
      })
      .catch(() => {
        setOpen(false);
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
      exercise={exercise}
      open={open}
      handleDelete={handleDelete}
      handleOpenDialog={handleOpenDialog}
      handleCancel={handleCancel}
    />
  );
};

export default Exercise;
