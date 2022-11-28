// const { createContext, useContext, useState } = require('react');
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    email: '',
    name: '',
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export { useUser };
