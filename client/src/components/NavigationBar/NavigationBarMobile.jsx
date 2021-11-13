/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { withRouter, Link } from 'react-router-dom';

const NavigationBarMobile = ({ location }) => {
  const [value, setValue] = useState(null);
  console.log(location.pathname);
  console.log(value);

  useEffect(() => {
    if (location.pathname.startsWith('/templates')) {
      setValue(0);
    } else if (location.pathname.startsWith('/workouts')) {
      setValue(1);
    } else if (location.pathname.startsWith('/exercises')) {
      setValue(3);
    } else if (location.pathname.startsWith('/profile')) {
      setValue(4);
    } else if (location.pathname === '/') {
      setValue(2);
    } else {
      setValue(null);
    }
  }, [location]);

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' } }}>
      <BottomNavigation
        showLabels
        sx={{
          backgroundColor: 'primary',
        }}
        value={value}
      >
        <BottomNavigationAction component={Link} to="/templates" label="Templates" icon={<AssignmentIcon />} />
        <BottomNavigationAction component={Link} to="/workouts" label="Workouts" icon={<CalendarTodayIcon />} />
        <BottomNavigationAction component={Link} to="/" label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction component={Link} to="/exercises" label="Exercises" icon={<FitnessCenterIcon />} />
        <BottomNavigationAction component={Link} to="/profile" label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default withRouter(NavigationBarMobile);
