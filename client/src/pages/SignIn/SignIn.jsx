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

  const handleSubmit = (event) => {
    event.preventDefault();
    loginService.login({
      username,
      password,
    })
      .then((userData) => {
        context.login(userData);
        enqueueSnackbar('Login Successful', { variant: 'success' });
        history.push('/');
      })
      .catch((error) => {
        setPassword('');
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      });
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
