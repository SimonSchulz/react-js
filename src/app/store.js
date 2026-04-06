import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import authReducer from '../auth/authSlice';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer
    },
    middleware: (gDM) => gDM().concat(api.middleware)
});