import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const initialState = {
  user: null,
};

if (localStorage.getItem('gymToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('gymToken'));
  initialState.user = decodedToken;
}

const AuthContext = createContext({
  user: null,
  // eslint-disable-next-line no-unused-vars
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem('gymToken', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData.user,
    });
  }

  function logout() {
    localStorage.removeItem('gymToken');
    axios.defaults.headers.common.Authorization = null;
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
