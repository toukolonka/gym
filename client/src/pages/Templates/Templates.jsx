import React from 'react';
import {
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

const sets = [
  {
    weight: 80,
    repetitions: 10,
    exercise: {
      id: 'Bench_press_id',
    },
  },
  {
    weight: 80,
    repetitions: 10,
    exercise: {
      id: 'Bench_press_id',
    },
  },
  {
    weight: 80,
    repetitions: 10,
    exercise: {
      id: 'Bench_press_id',
    },
  },
  {
    weight: 50,
    repetitions: 10,
    exercise: {
      id: 'Incline_Bench_press_id',
    },
  },
  {
    weight: 50,
    repetitions: 10,
    exercise: {
      id: 'Incline_Bench_press_id',
    },
  },
  {
    weight: 50,
    repetitions: 10,
    exercise: {
      id: 'Incline_Bench_press_id',
    },
  },
];

const Templates = () => (
  <Container>
    <Typography gutterBottom variant="h3" component="h3">
      Templates Page
    </Typography>
    <Grid container spacing={1}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h4" component="h2">
            Workout Name
          </Typography>
          <Typography variant="h5">
            26.10.2021
          </Typography>
          {sets.map((set) => <Typography>{set.exercise.id}</Typography>)}
        </CardContent>
        <CardActions>
          <Button size="medium">View</Button>
          <Button size="medium">Edit</Button>
        </CardActions>
      </Card>
    </Grid>
  </Container>
);

export default Templates;
