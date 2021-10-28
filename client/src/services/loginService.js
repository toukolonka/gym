import axios from 'axios';

const baseUrl = '/api/login';

const login = async (credentials, defineError) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (err) {
    defineError(err.response.data.error);
    return null;
  }
};

export default {
  login,
};
