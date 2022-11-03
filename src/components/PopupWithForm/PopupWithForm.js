import React from 'react';
import './PopupWithForm.css';
import Popup from '../Popup/Popup';

const PopupWithForm = (props) => {
  return (
    <Popup isOpen={props.isOpen} name={props.name}>
      <h2 className="popup__title">{props.title}</h2>
      <form
        className={`popup__form popup__form_type_${props.name}`}
        name={props.name}
        onSubmit={props.onSubmit}
        noValidate>
        {props.children}
        <fieldset className="popup__fieldset">
          <button
            className={`popup__submit-button popup__submit-button_type_${props.name}`}
            type="submit">
            {props.buttonText}
          </button>
        </fieldset>
      </form>
      <div className="popup__redirect-container">
        or{' '}
        <button className="popup__redirect-button" type="button">
          {props.redirectText}
        </button>
      </div>
    </Popup>
  );
};

export default PopupWithForm;
