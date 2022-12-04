import React from 'react';
import Popup from '../Popup/Popup';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { closeAllPopups, openPopup } from '../../features/popups/popupsSlice';

const Success = () => {
  const { success } = useSelector((state: RootState) => state.popups);
  const dispatch = useDispatch<AppDispatch>();

  const handleRedirect = () => {
    dispatch(closeAllPopups());
    dispatch(openPopup('signin'));
  };

  return (
    <Popup name="success" isOpen={success}>
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
