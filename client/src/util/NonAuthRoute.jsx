/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function NonAuthRoute({
  component: Component,
  ...rest
}) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => (user ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
}

export default NonAuthRoute;
