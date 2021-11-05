import axios from 'axios';

const baseUrl = '/api/exercises';

axios.defaults.headers.common.Authorization = `bearer ${localStorage.getItem('gymToken')}`;

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (exercise) => {
  const response = await axios.post(baseUrl, exercise);
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
  remove,
};
