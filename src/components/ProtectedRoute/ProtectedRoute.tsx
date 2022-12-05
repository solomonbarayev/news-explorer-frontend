import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { openPopup } from '../../features/popups/popupsSlice';

type ProtectedRouteProps = {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
};

const ProtectedRoute = ({ children, path }: ProtectedRouteProps) => {
  const { loggedIn } = useSelector((state: RootState) => state.user);

  //if attempting to open saved-news and not logged in, open signin popup
  useEffect(() => {
    if (path === '/saved-news' && !loggedIn) {
      dispatch(openPopup('signin'));
    }
  }, [path, loggedIn]);

  const dispatch = useDispatch<AppDispatch>();

  return loggedIn ? <Route path={path}>{children}</Route> : <Redirect to="/" />;
};

export default ProtectedRoute;
