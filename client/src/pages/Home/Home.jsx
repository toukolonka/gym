import React from 'react';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

const Home = () => (
  <>
    <Typography variant="h3" component="h3">
      Home Page
    </Typography>
    <Button color="success" onClick={() => toast.success('Hello world')} to="/sign-in">Click me!!!</Button>
    <Button color="info" onClick={() => toast.info('Hello world')} to="/sign-in">Click me!!!</Button>
    <Button color="warning" onClick={() => toast.warn('Hello world')} to="/sign-in">Click me!!!</Button>
    <Button color="error" onClick={() => toast.error('Hello world')} to="/sign-in">Click me!!!</Button>
  </>
);

export default Home;
