import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

const Profile = () => (
  <>
    <Typography variant="h3" component="h3">
      Profile Page
    </Typography>
    <Grid container>
      <Grid item>
        <Link href="/sign-in" variant="body2">
          Sign In
        </Link>
      </Grid>
      <Grid item>
        <Link href="/sign-up" variant="body2" color="secondary">
          Sign Up
        </Link>
      </Grid>
    </Grid>
  </>
);

export default Profile;
