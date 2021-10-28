import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const NavigationBar = () => (
  <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
    <AppBar position="static" enableColorOnDark color="primary">
      <Toolbar>
        <Typography variant="h5" component="h5" sx={{ flexGrow: 1 }} color="inherit">
          Gym App
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/workouts">Workouts</Button>
        <Button color="inherit" component={Link} to="/exercises">Exercises</Button>
        <Button color="inherit" component={Link} to="/templates">Templates</Button>
        <Button color="inherit" component={Link} to="/profile">Profile</Button>
      </Toolbar>
    </AppBar>
  </Box>
);

export default NavigationBar;
