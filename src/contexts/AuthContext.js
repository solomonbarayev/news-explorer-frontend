import { useState, createContext, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from './UserContext';
import mainApi from '../utils/MainApi';
import { usePopup } from './PopupsContext';

const AuthContext = createContext();

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
      .catch((err) => {
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
      .then((res) => {
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
    setCurrentUser({});
    localStorage.removeItem('token');
    history.push('/');
  };

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

  useEffect(() => {
    checkToken();
  }, []);

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
  return context;
};

export { useAuth };
