import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Container,
} from '@mui/material';
import UpdateAccountForm from '../../components/Profile/UpdateAccountForm';
import AccountInformation from '../../components/Profile/AccountInformation';
import registrationService from '../../services/registrationService';

const Profile = ({
  setErrorMessage,
  setInfoMessage,
}) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleAccountUpdate = async (event) => {
    event.preventDefault();
    const updatedUser = await registrationService.update({
      email,
      newPassword,
    });
    if (updatedUser) {
      console.log(updatedUser);
      setInfoMessage('Account information updated successfully');
    } else {
      setErrorMessage('Account information update failed');
    }
  };

  return (
    <Container maxWidth="xl">
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
        <AccountInformation />
        <UpdateAccountForm
          email={email}
          setEmail={handleEmailChange}
          password={newPassword}
          setPassword={handlePasswordChange}
          handleSubmit={handleAccountUpdate}
        />

      </Box>
    </Container>
  );
};

Profile.propTypes = {
  setErrorMessage: PropTypes.func.isRequired,
  setInfoMessage: PropTypes.func.isRequired,
};

export default Profile;
