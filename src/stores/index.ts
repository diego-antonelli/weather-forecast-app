import {configureStore} from '@reduxjs/toolkit';
import searchSlice from './slices/searchSlice.ts';
import forecastSlice from './slices/forecastSlice.ts';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    forecasts: forecastSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
