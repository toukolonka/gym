import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

const UpdateAccountForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  updateButtonDisabled,
  dialogOpen,
  handleOpenDialog,
  handleCancelDialog,
}) => (
  <>
    <Box
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
        label="Email"
        placeholder="Give us your new email address!"
        id="email"
        color="primary"
        onChange={setEmail}
        value={email}
        inputProps={{
          autoCapitalize: 'none',
          maxLength: 50,
        }}
      />
      <TextField
        margin="normal"
        fullWidth
        name="new password"
        label="New Password"
        placeholder="Want a new password?"
        type="password"
        id="password"
        color="primary"
        onChange={setPassword}
        value={password}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={updateButtonDisabled}
        onClick={handleOpenDialog}
      >
        Update Account Information
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={handleCancelDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Re-sign-in required
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You need to sign out and sign in again in order to update account information
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancelDialog}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleSubmit} autoFocus>
            Sign out and update
          </Button>
        </DialogActions>
      </Dialog>
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
  dialogOpen: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  handleCancelDialog: PropTypes.func.isRequired,
};

export default UpdateAccountForm;
