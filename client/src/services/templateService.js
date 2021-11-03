import axios from 'axios';

const baseUrl = '/api/templates';

const getAll = async () => {
  // Use gymToken directly from local storage instead of information from context/auth.jsx
  const token = localStorage.getItem('gymToken');
  const auth = `Bearer ${token}`;
  const response = await axios.get(
    baseUrl,
    { headers: { Authorization: auth } },
  );
  return response.data;
};

/* @TODO create and test 'create'
const create = async (exercise) => {
  const response = await axios.post(baseUrl, exercise);
  return response.data;
};
*/

export default {
  getAll,
  /* create, */
};
