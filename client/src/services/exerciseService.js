import axios from 'axios';

const baseUrl = '/api/exercises';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (exercise) => {
  const response = await axios.post(baseUrl, exercise);
  return response.data;
};

export default {
  getAll,
  create,
};
