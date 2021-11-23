import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Container,
  Button,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import TemplateList from '../../components/Template/TemplateList';
import templateService from '../../services/templateService';
import workoutService from '../../services/workoutService';
import Loading from '../../components/Loading/Loading';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    templateService
      .getAll()
      .then((data) => {
        setTemplates(data);
        setLoading(false);
      })
      .catch(((error) => {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }));
  }, []);

  const handleCreateTemplate = (event) => {
    event.preventDefault();
    templateService
      .create()
      .then((createdTemplate) => {
        history.push(`/templates/${createdTemplate.id}`);
      })
      .catch(((error) => {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }));
  };

  const handleCreateWorkout = (id) => {
    workoutService
      .createFromTemplate(id)
      .then((createdWorkout) => {
        history.push(`/workouts/${createdWorkout.id}`);
      })
      .catch(((error) => {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }));
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography component="h3" variant="h3">
          Templates
        </Typography>
      </Box>
      <Button
        fullWidth
        size="large"
        variant="contained"
        onClick={handleCreateTemplate}
      >
        Create a template
      </Button>
      {loading
        ? <Loading />
        : (
          <TemplateList templates={templates} handleCreateWorkout={handleCreateWorkout} />
        )}
    </Container>
  );
};

export default Templates;
