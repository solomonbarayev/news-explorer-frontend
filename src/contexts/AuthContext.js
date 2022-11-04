import { useState, createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [user, setUser] = useState({
    email: 'sbarayev2@gmail.com',
    firstName: 'Solomon',
    lastName: 'Barayev',
  });

  const history = useHistory();

  const handleLogout = () => {
    setLoggedIn(false);
    setUser({});
    history.push('/');
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, user, setUser, handleLogout }}>
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
