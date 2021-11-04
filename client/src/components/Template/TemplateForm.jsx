import React from 'react';
import propTypes from 'prop-types';

import {
  Card, CardContent, CardActions, Button, Typography,
} from '@mui/material';

const TemplateForm = ({ setShowForm }) => (
  <Card sx={{
    height: '100%',
    marginTop: 2,
    display: 'flex',
    flexDirection: 'column',
  }}
  >
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography>
        Placeholder
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        fullWidth
        variant="outlined"
        color="secondary"
        xs={6}
        onClick={() => setShowForm(false)}
      >
        Cancel
      </Button>
      <Button fullWidth variant="outlined" xs={6}>Save</Button>
    </CardActions>
  </Card>
);

TemplateForm.propTypes = {
  setShowForm: propTypes.func.isRequired,
};

export default TemplateForm;
