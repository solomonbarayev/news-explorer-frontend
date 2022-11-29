import React, { useState, createContext, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from './UserContext';
import mainApi from '../utils/MainApi';
import { usePopup } from './PopupsContext';

interface AuthContextType {
  token: string | null;
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  handleLogout: () => void;
  handleLogin: (value: { email: string; password: string }) => void;
  handleRegister: (value: {
    email: string;
    password: string;
    name: string;
  }) => void;
  authError: string;
  setAuthError: (value: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [authError, setAuthError] = useState('');
  const { setCurrentUser } = useUser();
  const history = useHistory();
  const popupContext = usePopup();

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    setAuthError('');
    mainApi
      .login({ email, password })
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          setCurrentUser(res.user);
          setToken(res.token);
          localStorage.setItem('token', res.token);
          history.push('/');
          popupContext.closeAllPopups();
        }
      })
      .catch(() => {
        setAuthError('Icorrect email or password.');
      });
  };

  const handleRegister = ({ email, password, name }) => {
    if (!email || !password || !name) {
      return;
    }
    setAuthError('');
    mainApi
      .register({ email, password, name })
      .then(() => {
        popupContext.closeAllPopups();
        popupContext.openPopup('success');
      })
      .catch((err) => {
        if (err.status === 409) {
          setAuthError('Email already exists');
        } else {
          setAuthError('Something went wrong');
        }
      });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('token');
    history.push('/');
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        mainApi
          .getUserInfo(token)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              setCurrentUser(res);
              setToken(token);
              history.push('/');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    checkToken();
  }, [setCurrentUser, history]);

  return (
    <AuthContext.Provider
      value={{
        token,
        loggedIn,
        setLoggedIn,
        handleLogout,
        handleLogin,
        handleRegister,
        authError,
        setAuthError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

export { useAuth };
