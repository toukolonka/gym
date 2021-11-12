import axios from 'axios';

const baseUrl = '/api/workouts';

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

const createFromTemplate = async (id) => {
  const response = await axios.post(`${baseUrl}/template/${id}`);
  return response.data;
};

const update = async (id, workout) => {
  const response = await axios.put(`${baseUrl}/${id}`, workout);
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
  createFromTemplate,
  update,
  remove,
};
