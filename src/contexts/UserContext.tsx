import React, { createContext, useContext, useState } from 'react';
import { User } from '../models/User';

interface UserContextTypes {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextTypes | undefined>(undefined);

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>({
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

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export { useUser };
