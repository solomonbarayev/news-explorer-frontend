import React from 'react';
import Popup from '../Popup/Popup';
import { usePopup } from '../../contexts/PopupsContext';

const Success = () => {
  const popupContext = usePopup();
  const handleRedirect = () => {
    popupContext.closeAllPopups();
    popupContext.openPopup('signin');
  };

  return (
    <Popup name="success" isOpen={popupContext.popupsState.success}>
      <h2 className="popup__title">Registration successfully completed!</h2>
      <button
        className="popup__redirect-button"
        type="button"
        onClick={handleRedirect}>
        Sign in
      </button>
    </Popup>
  );
};

export default Success;
