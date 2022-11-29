import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
};

const ProtectedRoute = ({ children, path }: ProtectedRouteProps) => {
  const { loggedIn } = useAuth();

  return loggedIn ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to="/signin" />
  );
};

export default ProtectedRoute;
