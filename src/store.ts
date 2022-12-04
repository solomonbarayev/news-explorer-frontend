import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import articlesReducer from './features/articles/articlesSlice';
import popupsReducer from './features/popups/popupsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    articles: articlesReducer,
    popups: popupsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
