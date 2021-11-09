import React, { useContext, useState } from 'react';
import {
  Box, Typography, Container, Button,
} from '@mui/material';
import UpdateAccountForm from '../../components/Profile/UpdateAccountForm';

import { AuthContext } from '../../context/auth';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleAccountUpdate = (event) => {
    event.preventDefault();
    console.log({
      email,
      newPassword,
    });
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h3" variant="h3">
          Profile
        </Typography>
        <Typography component="p" variant="p">
          {user.username}
        </Typography>
      </Box>
      <UpdateAccountForm
        email={email}
        setEmail={handleEmailChange}
        password={newPassword}
        setPassword={handlePasswordChange}
        handleSubmit={handleAccountUpdate}
      />
      <Button
        variant="outlined"
        fullWidth
        color="error"
        onClick={logout}
        sx={{ mt: 2 }}
      >
        Sign out
      </Button>
    </Container>
  );
};

export default Profile;
