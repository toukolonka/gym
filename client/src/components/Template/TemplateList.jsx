import React from 'react';
import propTypes from 'prop-types';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  CardActionArea,
} from '@mui/material';
import { useHistory } from 'react-router-dom';

const TemplateList = ({ templates, handleCreateWorkout }) => {
  const history = useHistory();

  const extractExercises = (sets) => {
    const uniqueExercises = Array.from(new Set(sets.map((set) => set.exercise.name)));
    const exercises = uniqueExercises.map((exercise) => (
      {
        name: exercise,
        setCount: sets.filter((set) => set.exercise.name === exercise).length,
      }
    ));
    return exercises;
  };

  return (
    templates.map((template) => (
      <div key={template.id}>
        <Card sx={{
          height: '100%',
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          border: 2,
          borderColor: 'primary.dark',
        }}
        >
          <CardActionArea onClick={() => history.push(`templates/${template.id}`)}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Grid container>
                <Grid item xs={10}>
                  <Typography gutterBottom variant="h4" component="h4">
                    Template Name
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    {new Date(template.date).toLocaleDateString(undefined, {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h6">
                    Exercise
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h6">
                    Sets
                  </Typography>
                </Grid>
              </Grid>
              {extractExercises(template.sets).map((exercise) => (
                <div key={exercise.name}>
                  <Grid container>
                    <Grid item xs={8}>
                      <Typography variant="body1">
                        {exercise.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body1">
                        {exercise.setCount}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleCreateWorkout(template.id)}
            >
              Start workout
            </Button>
          </CardActions>
        </Card>
      </div>
    ))
  );
};

TemplateList.propTypes = {
  templates: propTypes.arrayOf(propTypes.exact({
    date: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
    sets: propTypes.arrayOf(propTypes.exact({
      weight: propTypes.number.isRequired,
      repetitions: propTypes.number.isRequired,
      completed: propTypes.bool.isRequired,
      exercise: propTypes.object.isRequired,
      uuid: propTypes.string.isRequired,
    })).isRequired,
    template: propTypes.bool.isRequired,
    user: propTypes.string.isRequired,
  })),
  handleCreateWorkout: propTypes.func.isRequired,
};

export default TemplateList;
