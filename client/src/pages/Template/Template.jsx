import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Container,
  Autocomplete,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useParams, useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import workoutService from '../../services/workoutService';
import templateService from '../../services/templateService';
import exerciseService from '../../services/exerciseService';
import Loading from '../../components/Loading/Loading';
import SetList from '../../components/Sets/SetList';

const Template = () => {
  const [templates, setTemplates] = useState(null);
  const [template, setTemplate] = useState(null);
  const [exerciseOptions, setExerciseOptions] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [initiationFinished, setInitiationFinished] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadingW, setLoadingW] = useState(true);
  const [loadingE, setLoadingE] = useState(true);
  const { id } = useParams();
  const history = useHistory();
  const templateRef = useRef();

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
      });
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
        <Typography component="h3" variant="h3">
          {templateText}
        </Typography>
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
      <Autocomplete
        blurOnSelect
        disablePortal
        value={selectedExercise}
        options={exerciseOptions}
        getOptionLabel={(option) => option.name}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="New Exercise" />}
        sx={{ mt: 3 }}
        onChange={(_, exercise) => {
          setSelectedExercise(exercise);
          if (exercise !== null) {
            handleAddSet(exercise);
            setSelectedExercise(null);
          }
        }}
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
