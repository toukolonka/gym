import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SignInForm from '../../components/SignInForm/SignInForm';
import loginService from '../../services/loginService';
import { AuthContext } from '../../context/auth';

const SignIn = ({
  setErrorMessage,
  setInfoMessage,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(AuthContext);
  const history = useHistory();

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
    }, setErrorMessage);
    // If login with backend was succesfully completed
    if (userData) {
      setInfoMessage('Login Successful');
      context.login(userData);
      history.push('/');
    } else {
      setPassword('');
      setErrorMessage('Username or password incorrect');
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

SignIn.propTypes = {
  setErrorMessage: PropTypes.func.isRequired,
  setInfoMessage: PropTypes.func.isRequired,
};

export default SignIn;
