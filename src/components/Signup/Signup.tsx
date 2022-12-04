import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormWithValidation from '../../hooks/useForm';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../features/user/userActions';
import { AppDispatch, RootState } from '../../store';

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.user);
  const { signup } = useSelector((state: RootState) => state.popups);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(registerUser(values));
    resetForm();
  };

  return (
    <PopupWithForm
      name="signup"
      title="Sign up"
      buttonText="Sign up"
      redirectText="Sign in"
      onSubmit={handleSubmit}
      isOpen={signup}
      isValid={isValid}
      authError={error}>
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
        <div className="popup__input-container">
          <label className="popup__label">Username</label>
          <input
            className="popup__input popup__input_type_username"
            type="name"
            name="name"
            placeholder="Enter username"
            onChange={handleChange}
            value={values.name || ''}
          />
          <span className="popup__input-error">{errors.name}</span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
};

export default Signup;
