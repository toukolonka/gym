import axios from 'axios';

const baseUrl = '/api/users';

const signup = async (userinfo) => {
  try {
    const response = await axios.post(baseUrl, userinfo);
    return response.data;
  } catch (err) {
    return null;
  }
};

export default {
  signup,
};
