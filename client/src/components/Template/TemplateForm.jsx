import React from 'react';
import propTypes from 'prop-types';

import {
  Card, CardContent, CardActions, Button, Typography,
} from '@mui/material';

const TemplateForm = ({ setShowForm, handleSubmit }) => (
  <Card
    sx={{
      height: '100%',
      marginTop: 2,
      display: 'flex',
      flexDirection: 'column',
    }}
    component="form"
    onSubmit={handleSubmit}
  >
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography>
        This card includes mock template data that can be submitted by pressing SAVE
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        fullWidth
        variant="outlined"
        color="warning"
        xs={6}
        onClick={() => setShowForm(false)}
      >
        Cancel
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="success"
        xs={6}
        type="submit"
      >
        Save
      </Button>
    </CardActions>
  </Card>
);

TemplateForm.propTypes = {
  setShowForm: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
};

export default TemplateForm;
