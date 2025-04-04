import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import {thunk} from 'redux-thunk'; 

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), 
  devTools: process.env.NODE_ENV !== 'production',
});