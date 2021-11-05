import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Container,
  Button,
} from '@mui/material';
import TemplateList from '../../components/Template/TemplateList';
import TemplateForm from '../../components/Template/TemplateForm';
import templateService from '../../services/templateService';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  // mock data for creating a template
  const sets = [
    {
      weight: 60,
      repetitions: 8,
      exercise: '6172a5430c53ebb7e0da9873',
    },
    {
      weight: 60,
      repetitions: 8,
      exercise: '6172a5430c53ebb7e0da9873',
    },
    {
      weight: 60,
      repetitions: 8,
      exercise: '6172a5430c53ebb7e0da9873',
    },
  ];

  useEffect(() => {
    templateService
      .getAll()
      .then((data) => {
        setTemplates(data);
      });
  }, [refreshList]);

  const handleRefreshList = () => {
    if (refreshList) {
      setRefreshList(false);
    } else {
      setRefreshList(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    templateService
      .create({
        sets,
        // @TODO use real data
      })
      .then(() => {
        setShowForm(false);
        handleRefreshList();
        // @TODO clear text fields
      });
  };

  const handleDelete = (id) => {
    templateService
      .remove(id)
      .then(() => handleRefreshList());
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" margin={2}>
        Templates
      </Typography>
      {showForm
        ? <TemplateForm setShowForm={setShowForm} handleSubmit={handleSubmit} />
        : (
          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={() => setShowForm(true)}
          >
            Create a template
          </Button>
        )}
      <Box container spacing={1}>
        <TemplateList templates={templates} handleDelete={handleDelete} />
      </Box>
    </Container>
  );
};

export default Templates;
