import axios from 'axios';

const jwtInterceptor = () => {
  axios.interceptors.request.use((request) => {
    const token = `bearer ${localStorage.getItem('gymToken')}`;
    const isLoggedIn = token !== null;

    if (isLoggedIn) {
      request.headers.common.Authorization = token;
    }

    return request;
  });
};

export default jwtInterceptor;
