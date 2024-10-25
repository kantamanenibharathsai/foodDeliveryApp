import { configureStore } from '@reduxjs/toolkit';
import Auth from './slices/AuthSlice';
import Offers from './slices/OffersSlice';

export const store = configureStore({
    reducer: {
        Auth,
        Offers,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
