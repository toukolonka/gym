import React, { useState, useContext, useEffect } from 'react';
import {
  Box, Typography, Container, Button,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import UpdateAccountForm from '../../components/Profile/UpdateAccountForm';
import registrationService from '../../services/registrationService';
import { AuthContext } from '../../context/auth';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [updateButtonDisabled, setUpdateButtonDisabled] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, []);

  // When email or newpassword field is changed, check if update-button should be disabled or not
  useEffect(() => {
    if ((email && user && user.email && email !== user.email) || newPassword) {
      setUpdateButtonDisabled(false);
    } else {
      setUpdateButtonDisabled(true);
    }
  }, [email, newPassword]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleAccountUpdate = async (event) => {
    event.preventDefault();

    // Check that the input matches requirements
    if (newPassword && newPassword.length < 5) {
      enqueueSnackbar('Password provided should be at least 5 characters long', { variant: 'error' });
      return;
    }
    if (email && !email.includes('@')) {
      enqueueSnackbar('Please provide a valid email', { variant: 'error' });
      return;
    }

    registrationService.update({
      email,
      newPassword,
    })
      .then(() => {
        enqueueSnackbar('Account information updated successfully', { variant: 'success' });
        setNewPassword('');
        setEmail('');
      })
      .catch(() => enqueueSnackbar('Account information update failed', { variant: 'error' }));
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h3" variant="h3" align="center">
          Profile
        </Typography>
        <Container maxWidth="xs">
          <Typography component="p" variant="p" align="center" style={{ wordWrap: 'break-word' }}>
            {user.username}
          </Typography>
        </Container>
        <UpdateAccountForm
          email={email}
          setEmail={handleEmailChange}
          password={newPassword}
          setPassword={handlePasswordChange}
          handleSubmit={handleAccountUpdate}
          updateButtonDisabled={updateButtonDisabled}
        />
      </Box>
      <Button
        variant="outlined"
        color="error"
        onClick={logout}
        sx={{ mt: 2 }}
        fullWidth
      >
        Sign out
      </Button>
    </Container>
  );
};

export default Profile;
