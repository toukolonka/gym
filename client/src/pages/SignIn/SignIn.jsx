import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import SignInForm from '../../components/SignInForm/SignInForm';
import loginService from '../../services/loginService';
import { AuthContext } from '../../context/auth';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(AuthContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = await loginService.login({
      username,
      password,
    });
    // If login with backend was succesfully completed
    if (userData) {
      context.login(userData);
      enqueueSnackbar('Login Successful', { variant: 'success' });
      history.push('/');
    } else {
      setPassword('');
      enqueueSnackbar('Username or password incorrect', { variant: 'error' });
    }
  };

  return (
    <>
      <SignInForm
        username={username}
        password={password}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default SignIn;
