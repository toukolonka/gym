import { Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SignInForm from '../../components/SignInForm/SignInForm';
import loginService from '../../services/loginService';

const SignIn = () => {
  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setTimeout(() => setErrorMessage(''), 3000);
  }, [errorMessage]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = { username, password };
    const user = await loginService.login(credentials, setErrorMessage);
    if (user) {
      window.localStorage.setItem(
        'gymuser', JSON.stringify(user),
      );
    }
  };

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
