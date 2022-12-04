import React, { useEffect, useCallback } from 'react';
import './Popup.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { closeAllPopups } from '../../features/popups/popupsSlice';

type PopupProps = {
  name: string;
  isOpen: boolean;
  children: React.ReactNode;
};

const Popup = ({ isOpen, name, children }: PopupProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const stopOverlayClickPropogation = (evt: React.MouseEvent) => {
    evt.stopPropagation();
  };

  const handleEscClose = useCallback(
    (evt) => {
      if (evt.key === 'Escape' && isOpen) {
        dispatch(closeAllPopups());
      }
    },
    [isOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [handleEscClose]);

  return (
    <div
      className={`popup ${isOpen ? 'popup_opened' : ''} popup_type_${name}`}
      onClick={() => dispatch(closeAllPopups())}>
      <div
        className={`popup__container popup__container_type_${name}`}
        onClick={stopOverlayClickPropogation}>
        {children}
        <button
          className={`popup__close-button ${`popup__close-button_type_${name}`}`}
          type="button"
          onClick={() => dispatch(closeAllPopups())}
        />
      </div>
    </div>
  );
};

export default Popup;
