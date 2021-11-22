import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import registrationService from '../../services/registrationService';
import loginService from '../../services/loginService';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { AuthContext } from '../../context/auth';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const context = useContext(AuthContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (!username || !password || !email) {
      enqueueSnackbar('All fields are required', { variant: 'error' });
      return;
    }
    // Validation
    if (!email.includes('@')) {
      enqueueSnackbar('Please provide a valid email', { variant: 'error' });
      return;
    }
    // Validation
    if (username.length < 5) {
      enqueueSnackbar('Username should contain at least 5 characters', { variant: 'error' });
      return;
    }
    // Validation
    if (password.length < 5) {
      enqueueSnackbar('Password should contain at least 5 characters', { variant: 'error' });
      return;
    }

    // Register
    const userdata = await registrationService.signup({
      username,
      password,
      email,
    });

    if (userdata) {
      // If registration was successful, login
      enqueueSnackbar('Registration successful', { variant: 'success' });
      const logindata = await loginService.login({
        username,
        password,
      });
      if (logindata) {
        context.login(logindata);
        enqueueSnackbar('Login Successful', { variant: 'success' });
        history.push('/');
      }
    } else {
      enqueueSnackbar('Username or password already in use', { variant: 'error' });
    }
  };

  return (
    <>
      <SignUpForm
        username={username}
        password={password}
        email={email}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleEmailChange={handleEmailChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default SignUp;
