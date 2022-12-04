import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/user';
import { checkToken, loginUser, logoutUser, registerUser } from './userActions';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  success: boolean;
  loggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  token: null,
  success: false,
  loggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleLogoutRX: logoutUser,
    resetError: (state: UserState) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // register user
    builder
      .addCase(registerUser.pending, (state: UserState) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state: UserState) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state: UserState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // login user
    builder
      .addCase(loginUser.pending, (state: UserState) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state: UserState, action) => {
        state.loading = false;
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;
        state.success = true;
        state.loggedIn = true;
      })
      .addCase(loginUser.rejected, (state: UserState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //check token
    builder
      .addCase(checkToken.pending, (state: UserState) => {
        state.loading = true;
      })
      .addCase(checkToken.fulfilled, (state: UserState, action) => {
        if (action.payload) {
          state.loading = false;
          state.user = action.payload;
          state.token = localStorage.getItem('token');
          state.loggedIn = true;
        } else {
          state = initialState;
        }
      })
      .addCase(checkToken.rejected, (state: UserState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { handleLogoutRX, resetError } = userSlice.actions;

export default userSlice.reducer;
