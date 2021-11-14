import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import registrationService from '../../services/registrationService';
import loginService from '../../services/loginService';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { AuthContext } from '../../context/auth';

const SignUp = ({
  setErrorMessage,
  setInfoMessage,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const context = useContext(AuthContext);
  const history = useHistory();

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
      setErrorMessage('All fields are required');
      return;
    }
    // Validation
    if (password && password.length < 5) {
      setErrorMessage('Password provided should be at least 5 characters long');
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
      setInfoMessage('Registration successful');
      const logindata = await loginService.login({
        username,
        password,
      });
      if (logindata) {
        context.login(logindata);
        history.push('/');
      }
    } else {
      setErrorMessage('Registration failed');
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

SignUp.propTypes = {
  setErrorMessage: PropTypes.func.isRequired,
  setInfoMessage: PropTypes.func.isRequired,
};

export default SignUp;
