import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchCurrentWeather,
  fetchCurrentWeatherByLatLng,
  fetchForecast,
  fetchForecastByLatLng,
  Forecast,
  SimpleForecast,
} from '../../services/weather';

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async (city: string) => {
    return await fetchCurrentWeather(city);
  },
);

export const getWeatherByLatLng = createAsyncThunk(
  'weather/getWeatherByLatLng',
  async ({lat, lng}: {lat: number; lng: number}) => {
    return await fetchCurrentWeatherByLatLng(lat, lng);
  },
);

export const getForecast = createAsyncThunk(
  'weather/getForecast',
  async (city: string) => {
    return await fetchForecast(city);
  },
);

export const getForecastByLatLng = createAsyncThunk(
  'weather/getForecastByLatLng',
  async ({lat, lng}: {lat: number; lng: number}) => {
    return await fetchForecastByLatLng(lat, lng);
  },
);

interface State {
  current?: Forecast;
  forecast: SimpleForecast[];
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
  reducers: {},
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
      .addCase(getWeatherByLatLng.pending, state => {
        state.loading = true;
      })
      .addCase(getWeatherByLatLng.fulfilled, (state, action) => {
        state.current = action.payload;
        state.loading = false;
      })
      .addCase(getWeatherByLatLng.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getForecast.pending, state => {
        state.loading = true;
      })
      .addCase(getForecast.fulfilled, (state, action) => {
        state.forecast = action.payload;
      })
      .addCase(getForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getForecastByLatLng.pending, state => {
        state.loading = true;
      })
      .addCase(getForecastByLatLng.fulfilled, (state, action) => {
        state.forecast = action.payload;
      })
      .addCase(getForecastByLatLng.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
