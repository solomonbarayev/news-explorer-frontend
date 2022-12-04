import { createAsyncThunk } from '@reduxjs/toolkit';
import { InputTypes } from '../../hooks/useForm';
import mainApi from '../../utils/MainApi';
import { closeAllPopups, openPopup } from '../popups/popupsSlice';

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: InputTypes, { rejectWithValue, dispatch }) => {
    try {
      const res = await mainApi.register(data);
      dispatch(closeAllPopups());
      dispatch(openPopup('success'));
      return res.data;
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: InputTypes, { rejectWithValue }) => {
    try {
      const res = await mainApi.login(data);
      localStorage.setItem('token', res.data.token);
      return res;
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const logoutUser = (state) => {
  state.user = null;
  state.token = null;
  state.success = false;
  state.loggedIn = false;
  localStorage.removeItem('token');
};

export const checkToken = createAsyncThunk(
  'user/checkToken',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await mainApi.getUserInfo(token);
        return res ? res : null;
      } catch (err) {
        if (err.response && err.response.data.message) {
          return rejectWithValue(err.response.data.message);
        } else {
          return rejectWithValue(err.message);
        }
      }
    }
  }
);
