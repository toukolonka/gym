import axios from 'axios';

const baseUrl = '/api/users';

const signup = async (userinfo, setErrorMessage) => {
  try {
    const response = await axios.post(baseUrl, userinfo);
    return response.data;
  } catch (err) {
    setErrorMessage(err.response.data.error);
    return null;
  }
};

export default {
  signup,
};
