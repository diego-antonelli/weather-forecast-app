import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchCurrentWeather,
  fetchForecast,
  Forecast,
} from '../../services/weather';

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async (city: string) => {
    return await fetchCurrentWeather(city);
  },
);

export const getForecast = createAsyncThunk(
  'weather/getForecast',
  async (city: string) => {
    return await fetchForecast(city);
  },
);

interface State {
  current?: Forecast;
  forecast: Forecast[];
  loading: boolean;
  error?: string;
}

const initialState: State = {
  forecast: [],
  loading: false,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrentWeather: (state, action: {payload: Forecast}) => {
      state.current = action.payload;
    },
    setForecast: (state, action) => {
      state.forecast = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getWeather.pending, state => {
        state.loading = true;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.current = action.payload;
        state.loading = false;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getForecast.fulfilled, (state, action) => {
        state.forecast = action.payload;
      });
  },
});

export default weatherSlice.reducer;
