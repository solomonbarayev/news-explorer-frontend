import React, { useEffect } from 'react';
import './Popup.css';
import { usePopup } from '../../contexts/PopupsContext';

type PopupProps = {
  name: string;
  isOpen: boolean;
  children: React.ReactNode;
};

const Popup = ({ isOpen, name, children }: PopupProps) => {
  const popupsContext = usePopup();

  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        popupsContext.closeAllPopups();
      }
    }

    function handleOverlayClickClose(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        popupsContext.closeAllPopups();
      }
    }

    // change this to not touch the dom directly
    // from here
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', handleOverlayClickClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', handleOverlayClickClose);
    };
    // to here
  }, [isOpen, popupsContext.closeAllPopups]);

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''} popup_type_${name}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        {children}
        <button
          className={`popup__close-button ${`popup__close-button_type_${name}`}`}
          type="button"
          onClick={popupsContext.closeAllPopups}
        />
      </div>
    </div>
  );
};

export default Popup;
