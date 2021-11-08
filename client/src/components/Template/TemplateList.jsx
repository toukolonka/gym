import React from 'react';
import propTypes from 'prop-types';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from '@mui/material';

const TemplateList = ({ templates, handleDelete }) => (
  templates.map((template) => (
    <div key={template.id}>
      <Card sx={{
        height: '100%',
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={10}>
              <Typography gutterBottom variant="h4" component="h2">
                Template Name
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="error" onClick={() => handleDelete(template.id)}>
                Delete
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">
                {new Date(template.date).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              Set
            </Grid>
            <Grid item xs={2}>
              Weight
            </Grid>
            <Grid item xs={2}>
              Repetitions
            </Grid>
          </Grid>
          {template.sets.map((set) => (
            // eslint-disable-next-line no-underscore-dangle
            <div key={set.id}>
              <Grid container>
                <Grid item xs={8}>
                  {set.exercise.name}
                </Grid>
                <Grid item xs={2}>
                  {set.weight}
                </Grid>
                <Grid item xs={2}>
                  {set.repetitions}
                </Grid>
              </Grid>
            </div>
          ))}
        </CardContent>
        <CardActions>
          <Button fullWidth variant="contained" color="secondary" xs={6}>Edit</Button>
          <Button fullWidth variant="contained" xs={6}>Start workout</Button>
        </CardActions>
      </Card>
    </div>
  ))
);

TemplateList.propTypes = {
  templates: propTypes.arrayOf(propTypes.exact({
    date: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
    sets: propTypes.arrayOf(propTypes.exact({
      weight: propTypes.number.isRequired,
      repetitions: propTypes.number.isRequired,
      completed: propTypes.bool.isRequired,
      exercise: propTypes.object.isRequired,
      id: propTypes.string.isRequired,
      workout: propTypes.string.isRequired,
    })).isRequired,
    template: propTypes.bool.isRequired,
    user: propTypes.string.isRequired,
  })),
  handleDelete: propTypes.func.isRequired,
};

export default TemplateList;
