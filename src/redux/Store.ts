
import auth  from '../redux/slices/AuthSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: { auth },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
