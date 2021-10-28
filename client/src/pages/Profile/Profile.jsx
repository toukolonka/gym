import React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Profile = () => (
  <>
    <Typography variant="h3" component="h3">
      Profile Page
    </Typography>
    <Button color="primary" component={Link} to="/sign-in">Sign In</Button>
    <Button color="secondary" component={Link} to="/sign-up">Sign Up</Button>
  </>
);

export default Profile;
