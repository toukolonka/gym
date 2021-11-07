import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

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
import Profile from './pages/Profile/Profile';
import NavigationBar from './components/NavigationBar/NavigationBar';
import NavigationBarMobile from './components/NavigationBar/NavigationBarMobile';
import theme from './theme';

const App = () => (
  <AuthProvider>
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <NavigationBar />
          <NavigationBarMobile />
          <Container maxWidth="lg">
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
            </Switch>
          </Container>
        </div>
      </ThemeProvider>
    </Router>
  </AuthProvider>
);

export default App;
