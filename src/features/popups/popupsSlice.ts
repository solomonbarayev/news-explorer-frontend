import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupsStateTypes {
  signin: boolean;
  signup: boolean;
  success: boolean;
  mobile: boolean;
}

const initialState: PopupsStateTypes = {
  signin: false,
  signup: false,
  success: false,
  mobile: false,
};

export const popupsSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    closeAllPopups: (state) => {
      state.signin = false;
      state.signup = false;
      state.success = false;
      state.mobile = false;
    },
    openPopup: (state, action: PayloadAction<string>) => {
      state[action.payload] = true;
    },
  },
});

export const { closeAllPopups, openPopup } = popupsSlice.actions;

export default popupsSlice.reducer;
