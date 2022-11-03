import { useState, createContext, useContext } from 'react';

const PopupContext = createContext();

const PopupProvider = ({ children }) => {
  const [popupsState, setPopupsState] = useState({
    signin: false,
    signup: false,
    success: false,
  });

  const openPopup = (popupName) => {
    setPopupsState({ [popupName]: true });
  };

  const closeAllPopups = () =>
    setPopupsState(
      Object.keys(popupsState).every((key) => (popupsState[key] = false))
    );

  return (
    <PopupContext.Provider
      value={{ popupsState, setPopupsState, openPopup, closeAllPopups }}>
      {children}
    </PopupContext.Provider>
  );
};

export default PopupProvider;

const usePopup = () => {
  const context = useContext(PopupContext);
  return context;
};

export { usePopup };
