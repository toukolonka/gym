import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

const SignUpForm = ({
  username,
  password,
  email,
  handleUsernameChange,
  handlePasswordChange,
  handleEmailChange,
  handleSubmit,
}) => (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          placeholder="Email should be min 5 characters long"
          name="email"
          color="secondary"
          onChange={handleEmailChange}
          value={email}
          inputProps={{
            autoCapitalize: 'none',
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="username"
          label="Username"
          placeholder="Username should be min 5 characters long"
          id="username"
          color="secondary"
          onChange={handleUsernameChange}
          value={username}
          inputProps={{
            autoCapitalize: 'none',
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          placeholder="Password should be min 5 characters long"
          color="secondary"
          onChange={handlePasswordChange}
          value={password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="secondary"
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item>
            <Link to="/sign-in" style={{ color: '#33c9dc' }}>
              Already have an account? Sign In
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
);

SignUpForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
