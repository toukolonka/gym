import React, { useContext } from 'react';
import {
  Box, Typography, Container, Button,
} from '@mui/material';

import { AuthContext } from '../../context/auth';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h3" variant="h3">
          Profile
        </Typography>
        <Typography component="p" variant="p">
          {user.username}
        </Typography>
      </Box>
      <Button
        variant="outlined"
        fullWidth
        color="error"
        onClick={logout}
        sx={{ mt: 2 }}
      >
        Sign out
      </Button>
    </Container>
  );
};

export default Profile;
