import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  IconButton,
  Typography,
  TextField,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

const SetInfo = ({ allTimeBestSet }) => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      {open ? (
        <Grid container color="info" alignItems="center" justifyContent="center">
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography sx={{ color: 'text.info' }}>
              All time best
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', color: 'info' }}>
            <TextField
              disabled
              margin="normal"
              name="weight"
              label="kg"
              id="weight"
              value={allTimeBestSet.weight || ''}
              size="small"
              sx={{
                ml: 1,
                mr: 1,
              }}
            />
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              disabled
              margin="normal"
              name="reps"
              label="reps"
              id="reps"
              value={allTimeBestSet.repetitions || ''}
              size="small"
              sx={{
                ml: 1,
                mr: 1,
              }}
            />
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton color="info" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      ) : (
        <Grid container color="info" alignItems="center" justifyContent="center">
          <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center' }} />
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton color="info" margin="normal" onClick={() => setOpen(true)}>
              <InfoIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

SetInfo.propTypes = {
  allTimeBestSet: PropTypes.exact({
    weight: PropTypes.number.isRequired,
    repetitions: PropTypes.number.isRequired,
  }).isRequired,
};

export default SetInfo;
