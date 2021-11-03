import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

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
      <Button fullWidth variant="contained" color="secondary" xs={6}>Edit</Button>
      <Button fullWidth variant="contained" xs={6}>Start workout</Button>
    </CardActions>
  </Card>
);

const TemplateList = ({ templates }) => (
  templates.map((template) => <div key={template.id}><Template /></div>)
);

export default TemplateList;
