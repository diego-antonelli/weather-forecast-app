import {createSlice} from '@reduxjs/toolkit';
import {SimpleForecast} from '../../services/weather.ts';

interface Forecast extends SimpleForecast {
  city: string;
  date: string; //dd-mm-yyyy
}

const initialState: {forecasts: Forecast[]} = {
  forecasts: [],
};

const forecastSlice = createSlice({
  name: 'forecast',
  initialState: initialState,
  reducers: {
  },
});

export const {cleanForecasts, addForecast} = forecastSlice.actions;
export default forecastSlice.reducer;
