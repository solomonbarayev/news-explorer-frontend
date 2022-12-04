import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type ProtectedRouteProps = {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
};

const ProtectedRoute = ({ children, path }: ProtectedRouteProps) => {
  const { loggedIn } = useSelector((state: RootState) => state.user);

  return loggedIn ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to="/signin" />
  );
};

export default ProtectedRoute;
