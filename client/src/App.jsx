import React, { useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Alert } from '@mui/material';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import NonAuthRoute from './util/NonAuthRoute';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Workouts from './pages/Workouts/Workouts';
import Workout from './pages/Workout/Workout';
import Exercises from './pages/Exercises/Exercises';
import Exercise from './pages/Exercise/Exercise';
import Templates from './pages/Templates/Templates';
import Template from './pages/Template/Template';
import Profile from './pages/Profile/Profile';
import NavigationBar from './components/NavigationBar/NavigationBar';
import NavigationBarMobile from './components/NavigationBar/NavigationBarMobile';
import theme from './theme';

const App = () => {
  const [errorMessage, defineErrorMessage] = useState('');
  const [infoMessage, defineInfoMessage] = useState('');

  const setInfoMessage = (message) => {
    defineInfoMessage(message);
    setTimeout(() => {
      setInfoMessage('');
    }, 3000);
  };

  const setErrorMessage = (message) => {
    defineErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  return (
    <AuthProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <NavigationBar />
            <NavigationBarMobile />
            <Container maxWidth="lg" sx={{ mb: 5 }}>
              { errorMessage && <Alert severity="error">{ errorMessage }</Alert> }
              { infoMessage && <Alert severity="success">{ infoMessage }</Alert> }
              <Switch>
                <NonAuthRoute exact path="/sign-in" setErrorMessage={setErrorMessage} setInfoMessage={setInfoMessage} component={SignIn} />
                <NonAuthRoute exact path="/sign-up" setErrorMessage={setErrorMessage} setInfoMessage={setInfoMessage} component={SignUp} />
                <AuthRoute exact path="/" component={Home} />
                <AuthRoute exact path="/workouts" component={Workouts} />
                <AuthRoute exact path="/workouts/:id" component={Workout} />
                <AuthRoute exact path="/exercises" component={Exercises} />
                <AuthRoute exact path="/exercises/:id" component={Exercise} />
                <AuthRoute exact path="/templates" component={Templates} />
                <AuthRoute exact path="/templates/:id" component={Template} />
                <AuthRoute exact path="/profile" component={Profile} />
              </Switch>
            </Container>
          </div>
        </ThemeProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;
