import React, { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

type InputTypes = {
  email: string;
  password: string;
  name?: string;
};

const useFormWithValidation = () => {
  const [values, setValues] = useState({} as InputTypes);
  const [errors, setErrors] = useState({} as InputTypes);
  const [isValid, setIsValid] = useState(false);

  const { setAuthError } = useAuth();

  const validatePassword = useCallback((password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    if (e.target.name === 'password') {
      setErrors({ ...errors, [name]: validatePassword(value) });
    }
    setAuthError('');
  };

  React.useEffect(() => {
    //if all values are not empty, and there are no errors, and password is at least 8 characters long, then form is valid
    if (
      Object.values(values).every((value) => value !== '') &&
      Object.values(errors).every((error) => error === '') &&
      values.password?.length >= 8
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [values, errors]);

  const resetForm = useCallback(
    (
      newValues = {} as InputTypes,
      newErrors = {} as InputTypes,
      newIsValid = false
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
};

export default useFormWithValidation;
