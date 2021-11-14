import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Container,
} from '@mui/material';
import UpdateAccountForm from '../../components/Profile/UpdateAccountForm';
import AccountInformation from '../../components/Profile/AccountInformation';
import registrationService from '../../services/registrationService';
import { AuthContext } from '../../context/auth';

const Profile = ({
  setErrorMessage,
  setInfoMessage,
}) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [updateButtonDisabled, setUpdateButtonDisabled] = useState(true);

  // When email or newpassword field is changed, check if update-button should be disabled or not
  useEffect(() => {
    if (email || newPassword) {
      setUpdateButtonDisabled(false);
    } else {
      setUpdateButtonDisabled(true);
    }
  }, [email, newPassword]);

  const { user, logout } = useContext(AuthContext);

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
      setErrorMessage('Password provided should be at least 5 characters long');
      return;
    }
    const updatedUser = await registrationService.update({
      email,
      newPassword,
    });
    if (updatedUser) {
      setInfoMessage('Account information updated successfully');
    } else {
      setErrorMessage('Account information update failed');
    }
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
        <Typography component="h3" variant="h3">
          Profile
        </Typography>
        <AccountInformation
          user={user}
          logout={logout}
        />
        <UpdateAccountForm
          email={email}
          setEmail={handleEmailChange}
          password={newPassword}
          setPassword={handlePasswordChange}
          handleSubmit={handleAccountUpdate}
          updateButtonDisabled={updateButtonDisabled}
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
