import {configureStore} from '@reduxjs/toolkit';
import searchSlice from './slices/searchSlice';
import weatherReducer from './slices/weatherSlice';
import cityReducer from './slices/citySlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    weather: weatherReducer,
    city: cityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
