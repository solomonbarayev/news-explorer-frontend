import React from 'react';
import './PopupWithForm.css';
import Popup from '../Popup/Popup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { closeAllPopups, openPopup } from '../../features/popups/popupsSlice';

type PopupWithFormProps = {
  name: string;
  title: string;
  children: React.ReactNode;
  redirectText: string;
  isOpen: boolean;
  isValid: boolean;
  authError: string | null;
  buttonText: string;
  onSubmit: (e: React.FormEvent) => void;
};

const PopupWithForm = (props: PopupWithFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRedirect = () => {
    const popupToOpen = props.name === 'signin' ? 'signup' : 'signin';
    dispatch(closeAllPopups());
    dispatch(openPopup(popupToOpen));
  };

  return (
    <Popup isOpen={props.isOpen} name={props.name}>
      <h2 className="popup__title">{props.title}</h2>
      <form
        className={`popup__form popup__form_type_${props.name}`}
        name={props.name}
        onSubmit={props.onSubmit}
        noValidate>
        {props.children}
        <fieldset className="popup__fieldset popup__fieldset_type_submit-area">
          <span className="popup__input-error popup__input-error_type_auth">
            {props.authError}
          </span>
          <button
            className={`popup__submit-button popup__submit-button_type_${
              props.name
            } ${!props.isValid ? 'popup__submit-button_disabled' : ''}`}
            type="submit"
            disabled={!props.isValid}>
            {props.buttonText}
          </button>
        </fieldset>
      </form>
      <div className="popup__redirect-container">
        or{' '}
        <button
          className="popup__redirect-button"
          type="button"
          onClick={handleRedirect}>
          {props.redirectText}
        </button>
      </div>
    </Popup>
  );
};

export default PopupWithForm;
