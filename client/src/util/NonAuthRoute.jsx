/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function NonAuthRoute({
  component: Component,
  path: Path,
  exact: Exact,
  ...rest
}) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      exact={Exact}
      path={Path}
      render={() => (user ? <Redirect to="/" /> : <Component {...rest} />)}
    />
  );
}

export default NonAuthRoute;
