import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const IsHomeContext = createContext();

const IsHomeContextProvider = ({ children }) => {
  const [isHome, setIsHome] = useState(true);
  const location = useLocation();

  useEffect(() => {
    location.pathname !== '/' ? setIsHome(false) : setIsHome(true);
  }, [location]);

  return (
    <IsHomeContext.Provider value={isHome}>{children}</IsHomeContext.Provider>
  );
};

export default IsHomeContextProvider;

export const useIsHome = () => {
  const isHome = useContext(IsHomeContext);
  return { isHome };
};
