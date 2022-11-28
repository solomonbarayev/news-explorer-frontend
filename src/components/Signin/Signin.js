import React from 'react';
import './Signin.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { usePopup } from '../../contexts/PopupsContext';
import { useAuth } from '../../contexts/AuthContext';
import useFormWithValidation from '../../hooks/useForm';

const Signin = () => {
  const popupContext = usePopup();
  const { handleLogin, authError } = useAuth();

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    handleLogin(values);
    resetForm();
  };

  return (
    <PopupWithForm
      name="signin"
      title="Sign in"
      buttonText="Sign in"
      redirectText="Sign up"
      onSubmit={handleSubmit}
      isOpen={popupContext.popupsState.signin}
      isValid={isValid}
      authError={authError}>
      <fieldset className="popup__fieldset">
        <div className="popup__input-container">
          <label className="popup__label">Email</label>
          <input
            className="popup__input popup__input_type_email"
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
            value={values.email || ''}
          />
          <span className="popup__input-error">{errors.email}</span>
        </div>
        <div className="popup__input-container">
          <label className="popup__label">Password</label>
          <input
            className="popup__input popup__input_type_password"
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={values.password || ''}
          />
          <span className="popup__input-error">{errors.password}</span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
};

export default Signin;
