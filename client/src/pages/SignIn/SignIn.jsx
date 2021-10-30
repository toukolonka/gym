import { Alert } from '@mui/material';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import SignInForm from '../../components/SignInForm/SignInForm';
import authService from '../../services/authService';

const SignIn = () => {
  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    const credentials = { username, password };
    const user = await authService.login(credentials, setErrorMessage);
    if (user) {
      window.localStorage.setItem(
        'gymuser', JSON.stringify(user),
      );
    }
    setPassword('');
  };

  if (window.localStorage.getItem('gymuser')) return <Redirect to="/" />;

  return (
    <>
      { errorMessage && <Alert severity="error">{ errorMessage }</Alert> }
      <SignInForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default SignIn;
