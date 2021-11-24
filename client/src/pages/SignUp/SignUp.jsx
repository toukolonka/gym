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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation
    if (!username || !password || !email) {
      enqueueSnackbar('All fields are required', { variant: 'error' });
      return;
    }
    // Validation
    if (!email.includes('@') || email.length < 5) {
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
    registrationService.signup({
      username,
      password,
      email,
    })
      .then(() => {
        enqueueSnackbar('Registration Successful', { variant: 'success' });
        loginService.login({
          username,
          password,
        })
          .then((logindata) => {
            context.login(logindata);
            enqueueSnackbar('Login Successful', { variant: 'success' });
            history.push('/');
          });
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      });
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
