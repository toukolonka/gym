import React from 'react';
import {
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

const populator = ['1', '2', '3', '4', '5'];

const Template = () => (
  <Card sx={{
    height: '100%',
    marginTop: 2,
    display: 'flex',
    flexDirection: 'column',
  }}
  >
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h4" component="h2">
        Workout Name
      </Typography>
      <Typography variant="h5">
        26.10.2021
      </Typography>
      <div>Exercise 1</div>
      <div>Exercise 2</div>
      <div>Exercise 3</div>
    </CardContent>
    <CardActions>
      <Button fullWidth variant="contained" xs={6}>View</Button>
      <Button fullWidth variant="contained" color="secondary" xs={6}>Edit</Button>
    </CardActions>
  </Card>
);

const Templates = () => (
  <Container maxWidth="sm">
    <Typography variant="h3" align="center" margin={2}>
      Templates
    </Typography>
    <Box container spacing={1}>
      {populator.map((id) => <div key={id}><Template /></div>)}
    </Box>
  </Container>
);

export default Templates;
