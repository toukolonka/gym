import axios from 'axios';

const baseUrl = '/api/login';

const login = async (credentials, setErrorMessage) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (err) {
    setErrorMessage(err.response.data.error);
    return null;
  }
};

export default {
  login,
};
