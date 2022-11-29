import React, { useState, createContext, useContext } from 'react';

interface PopupStateType {
  signin: boolean;
  signup: boolean;
  success: boolean;
  mobile: boolean;
}

interface PopupContextType {
  popupsState: PopupStateType;
  setPopupsState: React.Dispatch<React.SetStateAction<PopupStateType>>;
  openPopup: (popupName: string) => void;
  closeAllPopups: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

const PopupProvider = ({ children }) => {
  const [popupsState, setPopupsState] = useState<PopupStateType>({
    signin: false,
    signup: false,
    success: false,
    mobile: false,
  });

  const openPopup = (popupName) => {
    setPopupsState({ ...popupsState, [popupName]: true });
  };

  const closeAllPopups = (): void => {
    setPopupsState({
      signin: false,
      signup: false,
      success: false,
      mobile: false,
    });
  };

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

  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider');
  }

  return context;
};

export { usePopup };
