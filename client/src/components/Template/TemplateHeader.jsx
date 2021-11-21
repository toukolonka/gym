import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const TemplateHeader = ({ name, handleUpdateName }) => {
  const [templateName, setTemplateName] = useState(name);

  useEffect(() => {
    const timeOutId = setTimeout(() => handleUpdateName(
      templateName,
    ), 1000);
    return () => clearTimeout(timeOutId);
  }, [templateName]);

  return (
    <TextField
      label="Template name"
      value={templateName}
      inputProps={{ style: { fontSize: 25 }, inputMode: 'text' }} // font size of input text
      InputLabelProps={{ style: { fontSize: 25 } }} // font size of input label
      onChange={(event) => setTemplateName(event.target.value)}
    />
  );
};

TemplateHeader.propTypes = {
  name: PropTypes.string.isRequired,
  handleUpdateName: PropTypes.func.isRequired,
};

export default TemplateHeader;
