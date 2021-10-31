import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { AuthContext } from '../../context/auth';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <Typography variant="h3" component="h3">
        Profile Page
      </Typography>
      <Typography variant="h3" component="h3">
        {user.username}
      </Typography>
      <Button color="primary" onClick={logout} to="/sign-in">Sign out</Button>
    </>
  );
};

export default Profile;
