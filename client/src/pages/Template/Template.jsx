import React, { useState, useEffect, useRef } from 'react';
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
import { useParams, useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';

import workoutService from '../../services/workoutService';
import templateService from '../../services/templateService';
import exerciseService from '../../services/exerciseService';
import Loading from '../../components/Loading/Loading';
import SetList from '../../components/Sets/SetList';
import WorkoutHeader from '../../components/Workout/WorkoutHeader';
import ExerciseOptionsModal from '../../components/Modals/ExerciseOptionsModal';

const Template = () => {
  const [templates, setTemplates] = useState(null);
  const [template, setTemplate] = useState(null);
  const [exerciseOptions, setExerciseOptions] = useState(null);
  const [initiationFinished, setInitiationFinished] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadingW, setLoadingW] = useState(true);
  const [loadingE, setLoadingE] = useState(true);
  const { id } = useParams();
  const history = useHistory();
  const templateRef = useRef();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    workoutService
      .getAll()
      .then((data) => {
        setTemplates(data);
      });
  }, []);

  useEffect(() => {
    templateService
      .getOne(id)
      .then((data) => {
        setTemplate(data);
        setLoadingW(false);
        setInitiationFinished(true);
      })
      .catch(((error) => {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }));
  }, []);

  useEffect(() => () => {
    templateRef.current = template;
  }, [template]);

  useEffect(() => {
    exerciseService
      .getAll()
      .then((data) => {
        setExerciseOptions(data);
        setLoadingE(false);
      });
  }, []);

  useEffect(() => {
    if (template && initiationFinished) {
      workoutService
        .update(id, template);
    }
  }, [template]);

  const handleFinishAndSave = () => {
    workoutService
      .update(id, template)
      .then(() => {
        enqueueSnackbar('Template saved', { variant: 'success' });
        history.push('/templates');
      });
  };

  const handleDeleteTemplate = () => {
    workoutService
      .remove(id)
      .then(() => {
        history.push('/templates');
      })
      .catch(() => {
        setOpen(false);
      });
  };

  // Delete template if template does not contain any sets and is created under a minute ago
  // Equivalent to componentWillUnmount lifecycle method
  useEffect(() => () => {
    if (templateRef
      && templateRef.current !== null
      && templateRef.current.sets.length === 0
      && (new Date()) - (new Date(templateRef.current.date)) < 60000) {
      handleDeleteTemplate();
    }
  }, []);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const getPreviousSet = (exercise) => {
    // Check exercise sets from current workout
    const exerciseSets = template.sets.filter((set) => set.exercise.id === exercise.id);
    if (exerciseSets.length === 0) {
      // Check exercise sets from previous workouts
      const prevWorkout = templates.find(({ sets }) => (
        sets.find((set) => set.exercise.id === exercise.id)
      ));
      if (!prevWorkout) {
        return {
          weight: 0,
          repetitions: 0,
        };
      }
      const lastSet = prevWorkout.sets.find((set) => set.exercise.id === exercise.id);
      return {
        weight: lastSet.weight,
        repetitions: lastSet.repetitions,
      };
    }
    const lastSet = exerciseSets.pop();
    return {
      weight: lastSet.weight,
      repetitions: lastSet.repetitions,
    };
  };

  const handleAddSet = (exercise) => {
    const set = getPreviousSet(exercise);
    setTemplate({
      ...template,
      sets: template.sets.concat({
        weight: set.weight,
        repetitions: set.repetitions,
        completed: false,
        exercise,
        uuid: uuidv4(),
      }),
    });
  };

  const handleUpdateSet = (uuid, values) => {
    setTemplate({
      ...template,
      sets: template.sets.map((set) => (
        set.uuid === uuid ? {
          ...set,
          weight: Number(values.weight),
          repetitions: Number(values.repetitions),
          completed: values.completed,
        } : set)),
    });
  };

  const handleDeleteSet = (uuid) => {
    setTemplate({
      ...template,
      sets: template.sets.filter((set) => set.uuid !== uuid),
    });
  };

  const handleUpdateName = (name) => {
    setTemplate({
      ...template,
      name,
    });
  };

  if (loadingW || loadingE) {
    return (
      <Loading />
    );
  }

  const templateText = 'Template';

  const exercises = Array.from(new Set(template.sets.map((set) => set.exercise.id)))
    .map((exerciseId) => ({
      id: exerciseId,
      name: template.sets.find((s) => s.exercise.id === exerciseId).exercise.name,
      description: template.sets.find((s) => s.exercise.id === exerciseId).exercise.description,
      category: template.sets.find((s) => s.exercise.id === exerciseId).exercise.category,
      user: template.sets.find((s) => s.exercise.id === exerciseId).exercise.user,
    }));

  return (
    <Container maxWidth="xs" sx={{ mb: 10 }}>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <WorkoutHeader name={template.name} label="Template name" handleUpdateName={handleUpdateName} />
        <Typography component="p" variant="p">
          {new Date(template.date).toLocaleDateString(undefined, {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          })}
        </Typography>
      </Box>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        color="success"
        onClick={handleFinishAndSave}
      >
        Save template
      </Button>
      {exercises.map((exercise) => (
        <SetList
          key={exercise.id}
          exercise={exercise}
          sets={template.sets.filter((s) => s.exercise.id === exercise.id)}
          handleAddSet={handleAddSet}
          handleUpdateSet={handleUpdateSet}
          handleDeleteSet={handleDeleteSet}
          isTemplate={template.template}
        />
      ))}
      <ExerciseOptionsModal
        exerciseOptions={exerciseOptions}
        handleExerciseButtonClick={handleAddSet}
        buttonLabel="Add an exercise"
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        color="error"
        onClick={handleOpenDialog}
      >
        Delete
        {' '}
        {templateText}
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Delete
          {' '}
          {templateText}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the
            {' '}
            {templateText}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleDeleteTemplate} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Template;
