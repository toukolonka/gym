import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const UpdateAccountForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  updateButtonDisabled,
}) => (
  <>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        m: 2,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" component="h5">
        Update Account Information
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        name="email"
        label="New Email"
        placeholder="Give us your new email address!"
        id="email"
        color="primary"
        onChange={setEmail}
        value={email}
      />
      <TextField
        margin="normal"
        fullWidth
        name="new password"
        label="New Password"
        placeholder="Sure you want a new password?"
        type="password"
        id="password"
        color="primary"
        onChange={setPassword}
        value={password}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={updateButtonDisabled}
      >
        Update Account Information
      </Button>
    </Box>
  </>
);

UpdateAccountForm.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateButtonDisabled: PropTypes.bool.isRequired,
};

export default UpdateAccountForm;
