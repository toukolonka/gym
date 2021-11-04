import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
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
    // Register
    const userdata = await registrationService.signup({
      username,
      password,
      email,
    });
    if (userdata) {
      // If registration was successful, login
      const logindata = await loginService.login({
        username,
        password,
      });
      if (logindata) {
        context.login(logindata);
        history.push('/');
      }
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
