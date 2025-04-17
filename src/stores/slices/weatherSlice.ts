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
  async ({name, lat, lng}: {name: string; lat: number; lng: number}) => {
    return await fetchForecastByLatLng(name, lat, lng);
  },
);

interface State {
  current?: Forecast;
  forecast: SimpleForecast[];
  loadingWeather: boolean;
  loadingForecast: boolean;
  error?: string;
}

const initialState: State = {
  forecast: [],
  loadingWeather: false,
  loadingForecast: false,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getWeather.pending, state => {
        state.loadingWeather = true;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.current = action.payload;
        state.loadingWeather = false;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.loadingWeather = false;
        state.error = action.error.message;
      })
      .addCase(getWeatherByLatLng.pending, state => {
        state.loadingWeather = true;
      })
      .addCase(getWeatherByLatLng.fulfilled, (state, action) => {
        state.current = action.payload;
        state.loadingWeather = false;
      })
      .addCase(getWeatherByLatLng.rejected, (state, action) => {
        state.loadingWeather = false;
        state.error = action.error.message;
      })
      .addCase(getForecast.pending, state => {
        state.loadingForecast = true;
      })
      .addCase(getForecast.fulfilled, (state, action) => {
        state.forecast = action.payload;
        state.loadingForecast = false;
      })
      .addCase(getForecast.rejected, (state, action) => {
        state.loadingForecast = false;
        state.error = action.error.message;
      })
      .addCase(getForecastByLatLng.pending, state => {
        state.loadingForecast = true;
      })
      .addCase(getForecastByLatLng.fulfilled, (state, action) => {
        state.forecast = action.payload;
        state.loadingForecast = false;
      })
      .addCase(getForecastByLatLng.rejected, (state, action) => {
        state.loadingForecast = false;
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
