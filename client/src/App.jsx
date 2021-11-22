import React, { createRef } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarProvider } from 'notistack';

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
import Header from './components/Header/Header';
import theme from './theme';

const App = () => {
  const notistackRef = createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <AuthProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            maxSnack={3}
            ref={notistackRef}
            autoHideDuration={3000}
            action={(key) => (
              <IconButton onClick={onClickDismiss(key)}>
                <CloseIcon />
              </IconButton>
            )}
          >
            <div className="App">
              <Header />
              <Container maxWidth="lg" sx={{ mb: 5 }}>
                <Switch>
                  <NonAuthRoute exact path="/sign-in" component={SignIn} />
                  <NonAuthRoute exact path="/sign-up" component={SignUp} />
                  <AuthRoute exact path="/" component={Home} />
                  <AuthRoute exact path="/workouts" component={Workouts} />
                  <AuthRoute exact path="/workouts/:id" component={Workout} />
                  <AuthRoute exact path="/exercises" component={Exercises} />
                  <AuthRoute exact path="/exercises/:id" component={Exercise} />
                  <AuthRoute exact path="/templates" component={Templates} />
                  <AuthRoute exact path="/profile" component={Profile} />
                  <AuthRoute exact path="/templates/:id" component={Template} />
                </Switch>
              </Container>
            </div>
          </SnackbarProvider>
        </ThemeProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;
