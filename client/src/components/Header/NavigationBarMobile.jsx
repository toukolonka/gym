import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';

const NavigationBarMobile = () => (
  <Box sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' } }}>
    <AppBar enableColorOnDark color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button color="inherit" component={Link} to="/templates" sx={{ flexDirection: 'column', fontSize: 12 }}>
          <AssignmentIcon fontSize="large" />
          Templates
        </Button>
        <Button color="inherit" component={Link} to="/workouts" sx={{ flexDirection: 'column', fontSize: 12 }}>
          <CalendarTodayIcon fontSize="large" />
          Workouts
        </Button>
        <Button color="inherit" component={Link} to="/" sx={{ flexDirection: 'column', fontSize: 12 }}>
          <HomeIcon fontSize="large" />
          Home
        </Button>
        <Button color="inherit" component={Link} to="/exercises" sx={{ flexDirection: 'column', fontSize: 12 }}>
          <FitnessCenterIcon fontSize="large" />
          Exercises
        </Button>
        <Button color="inherit" component={Link} to="/profile" sx={{ flexDirection: 'column', fontSize: 12 }}>
          <PersonIcon fontSize="large" />
          Profile
        </Button>
      </Toolbar>
    </AppBar>
    <Toolbar />
  </Box>
);

export default NavigationBarMobile;
