import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import Popups from '../Popups/Popups';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { checkToken } from '../../features/user/userActions';
import { getSavedArticles } from '../../features/articles/articlesActions';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const { loggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getSavedArticles());
    }
  }, [loggedIn]);

  return (
    <div className="app">
      <Header />

      <Switch>
        <ProtectedRoute path="/saved-news">
          <SavedNews />
        </ProtectedRoute>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>

      <Footer />

      <Popups />
    </div>
  );
}

export default App;
