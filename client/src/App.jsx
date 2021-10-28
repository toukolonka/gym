import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Workouts from './pages/Workouts/Workouts';
import Exercises from './pages/Exercises/Exercises';
import Templates from './pages/Templates/Templates';
import Profile from './pages/Profile/Profile';
import NavigationBar from './components/NavigationBar/NavigationBar';
import NavigationBarMobile from './components/NavigationBar/NavigationBarMobile';
import theme from './theme';

const App = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <NavigationBar />
        <NavigationBarMobile />
        <Container maxWidth="lg">
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/" component={Home} />
          <Route exact path="/workouts" component={Workouts} />
          <Route exact path="/exercises" component={Exercises} />
          <Route exact path="/templates" component={Templates} />
          <Route exact path="/profile" component={Profile} />
        </Container>
      </div>
    </ThemeProvider>
  </Router>
);

export default App;
