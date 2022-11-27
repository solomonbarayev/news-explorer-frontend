import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, path }) => {
  const { loggedIn } = useAuth();

  return loggedIn ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to="/signin" />
  );
};

export default ProtectedRoute;
