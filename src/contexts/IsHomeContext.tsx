import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface IsHomeContextType {
  isHome: boolean;
}

const IsHomeContext = createContext<IsHomeContextType | undefined>(undefined);

const IsHomeContextProvider = ({ children }) => {
  const [isHome, setIsHome] = useState(true);
  const location = useLocation();

  useEffect(() => {
    location.pathname !== '/' ? setIsHome(false) : setIsHome(true);
  }, [location]);

  return (
    <IsHomeContext.Provider value={{ isHome }}>
      {children}
    </IsHomeContext.Provider>
  );
};

export default IsHomeContextProvider;

export const useIsHome = () => {
  const context = useContext(IsHomeContext);

  if (context === undefined) {
    throw new Error('useIsHome must be used within a IsHomeContextProvider');
  }

  const { isHome } = context;

  return { isHome };
};
