import axios from 'axios';

// Use gymToken directly from local storage instead of information from context/auth.jsx
const baseUrl = '/api/templates';

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async () => {
  const response = await axios.post(baseUrl);
  return response.data;
};

const createFromWorkout = async (id) => {
  const response = await axios.post(`${baseUrl}/workout/${id}`);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getOne,
  getAll,
  create,
  createFromWorkout,
  remove,
};
