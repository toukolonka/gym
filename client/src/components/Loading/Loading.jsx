import React from 'react';

import {
  Box, CircularProgress,
} from '@mui/material';

const Loading = () => (
  <Box
    sx={{
      marginTop: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <CircularProgress />
  </Box>
);

export default Loading;
