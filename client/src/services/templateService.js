import axios from 'axios';

// Use gymToken directly from local storage instead of information from context/auth.jsx
const token = localStorage.getItem('gymToken');
const auth = `Bearer ${token}`;
const baseUrl = '/api/templates';

const getAll = async () => {
  const response = await axios.get(
    baseUrl,
    { headers: { Authorization: auth } },
  );
  return response.data;
};

const create = async (template) => {
  const response = await axios.post(
    baseUrl,
    template,
    { headers: { Authorization: auth } },
  );
  return response.data;
};

export default {
  getAll,
  create,
};
