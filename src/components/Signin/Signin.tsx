import React from 'react';
import './Signin.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormWithValidation from '../../hooks/useForm';
import { loginUser } from '../../features/user/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { closeAllPopups } from '../../features/popups/popupsSlice';

const Signin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.user);
  const { signin } = useSelector((state: RootState) => state.popups);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    try {
      dispatch(loginUser(values));
      dispatch(closeAllPopups());
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PopupWithForm
      name="signin"
      title="Sign in"
      buttonText="Sign in"
      redirectText="Sign up"
      onSubmit={handleSubmit}
      isOpen={signin}
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
      </fieldset>
    </PopupWithForm>
  );
};

export default Signin;
