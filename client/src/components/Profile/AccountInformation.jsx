import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { AuthContext } from '../../context/auth';

const AccountInformation = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Box
      sx={{
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h5" variant="h5">
        You are logged in as:
      </Typography>
      <Typography component="h5" variant="h5">
        {user.username}
      </Typography>
      <Button
        variant="outlined"
        color="error"
        onClick={logout}
        sx={{ mt: 2 }}
      >
        Sign out
      </Button>
    </Box>
  );
};

export default AccountInformation;
