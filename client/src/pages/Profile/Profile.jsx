import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import authService from '../../services/authService';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('gymuser')));

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  // If user is logged in, show actual profile IN PRORGRESS
  if (user) {
    return (
      <>
        <Typography variant="h3" component="h3">
          { user.username }
        </Typography>
        <Button color="primary" onClick={handleLogout}>Sign out</Button>
      </>
    );
  }

  // If user is not logged in, give options to sign in or sign up
  return (
    <>
      <Typography variant="h3" component="h3">
        Profile Page
      </Typography>
      <Button color="primary" component={Link} to="/sign-in">Sign In</Button>
      <Button color="secondary" component={Link} to="/sign-up">Sign Up</Button>
    </>
  );
};

export default Profile;
