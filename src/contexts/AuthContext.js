import { useState, createContext, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from './UserContext';
import mainApi from '../utils/MainApi';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const { setCurrentUser } = useUser();
  const history = useHistory();

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    mainApi
      .login({ email, password })
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          setCurrentUser(res.user);
          setToken(res.token);
          localStorage.setItem('token', res.token);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
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
