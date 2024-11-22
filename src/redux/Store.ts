import auth from '../redux/slices/AuthSlice';
import home from '../redux/slices/HomeSlice';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {auth, home},
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
