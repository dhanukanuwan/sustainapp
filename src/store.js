import { configureStore } from '@reduxjs/toolkit';
import userDataReducer from './redux/userSlice';

export const store = configureStore({
  reducer: {
    userdata: userDataReducer,
  },
});