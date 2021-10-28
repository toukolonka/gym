import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Container,
} from '@mui/material';
import exerciseService from '../../services/exerciseService';
import ExerciseList from '../../components/Exercise/ExerciseList';
import ExerciseForm from '../../components/Exercise/ExerciseForm';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newExerciseDescription, setNewExerciseDescription] = useState('');
  const [newExerciseCategory, setNewExerciseCategory] = useState('Core');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    exerciseService
      .getAll()
      .then((data) => {
        setExercises(data);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    exerciseService
      .create({
        name: newExerciseName,
        description: newExerciseDescription,
        category: newExerciseCategory,
      })
      .then((returnedExercises) => {
        setExercises(returnedExercises);
        setNewExerciseName('');
        setNewExerciseDescription('');
      });
  };

  const handleNameChange = (event) => {
    setNewExerciseName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setNewExerciseDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setNewExerciseCategory(event.target.value);
  };

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
        <Typography component="h3" variant="h3">
          Exercises
        </Typography>
      </Box>
      {showForm
        ? (
          <ExerciseForm
            newExerciseName={newExerciseName}
            newExerciseDescription={newExerciseDescription}
            newExerciseCategory={newExerciseCategory}
            handleNameChange={handleNameChange}
            handleDescriptionChange={handleDescriptionChange}
            handleCategoryChange={handleCategoryChange}
            handleSubmit={handleSubmit}
            setShowForm={setShowForm}
          />
        )
        : (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            color="primary"
            onClick={() => setShowForm(true)}
          >
            Create exercise
          </Button>
        )}
      <ExerciseList exercises={exercises} />
    </Container>
  );
};

export default Exercises;
