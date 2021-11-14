import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Container,
} from '@mui/material';
import exerciseService from '../../services/exerciseService';
import ExerciseList from '../../components/Exercise/ExerciseList';
import ExerciseForm from '../../components/Exercise/ExerciseForm';
import Loading from '../../components/Loading/Loading';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newExerciseDescription, setNewExerciseDescription] = useState('');
  const [newExerciseCategory, setNewExerciseCategory] = useState('Core');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');

  useEffect(() => {
    exerciseService
      .getAll()
      .then((data) => {
        setExercises(data);
        setLoading(false);
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

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const exercisesAfterSearch = exercises.filter(
    (exercise) => exercise.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const filteredExercises = exercisesAfterSearch.filter(
    (exercise) => searchCategory === 'All' || exercise.category === searchCategory,
  );

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
            size="large"
            sx={{ mt: 2 }}
            color="primary"
            onClick={() => setShowForm(true)}
          >
            Create exercise
          </Button>
        )}
      {loading
        ? <Loading />
        : (
          <ExerciseList
            exercises={filteredExercises}
            searchText={searchText}
            searchCategory={searchCategory}
            handleSearchTextChange={handleSearchTextChange}
            handleSearchCategoryChange={handleSearchCategoryChange}
          />
        )}
    </Container>
  );
};

export default Exercises;
