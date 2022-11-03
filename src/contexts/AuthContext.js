import { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    email: 'sbarayev2@gmail.com',
    firstName: 'Solomon',
    lastName: 'Barayev',
  });

  const handleLogout = () => {
    setLoggedIn(false);
    setUser({});
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
