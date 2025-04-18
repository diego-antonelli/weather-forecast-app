import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  // fetchCurrentWeather,
  fetchCurrentWeatherByLatLng,
  // fetchForecast,
  fetchForecastByLatLng,
  Forecast,
  SimpleForecast,
} from '../../services/weather';

// TODO: Enable this to search by city name only instead of lat/lng
// export const getWeather = createAsyncThunk(
//   'weather/getWeather',
//   async (city: string) => {
//     return await fetchCurrentWeather(city);
//   },
// );

export const getWeatherByLatLng = createAsyncThunk(
  'weather/getWeatherByLatLng',
  async ({lat, lng}: {lat: number; lng: number}) => {
    return await fetchCurrentWeatherByLatLng(lat, lng);
  },
);

// TODO: Enable this to search by city name only instead of lat/lng
// export const getForecast = createAsyncThunk(
//   'weather/getForecast',
//   async (city: string) => {
//     return await fetchForecast(city);
//   },
// );

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
  errorForecast?: string;
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
      // TODO: Enable this to search by city name only instead of lat/lng
      // .addCase(getWeather.pending, state => {
      //   state.loadingWeather = true;
      // })
      // .addCase(getWeather.fulfilled, (state, action) => {
      //   state.current = action.payload;
      //   state.loadingWeather = false;
      // })
      // .addCase(getWeather.rejected, (state, action) => {
      //   state.loadingWeather = false;
      //   state.error = action.error.message;
      // })
      .addCase(getWeatherByLatLng.pending, state => {
        state.loadingWeather = true;
        state.error = undefined;
      })
      .addCase(getWeatherByLatLng.fulfilled, (state, action) => {
        state.current = action.payload;
        state.loadingWeather = false;
        state.error = undefined;
      })
      .addCase(getWeatherByLatLng.rejected, (state, action) => {
        state.loadingWeather = false;
        state.error = action.error.message;
      })
      // TODO: Enable this to search by city name only instead of lat/lng
      // .addCase(getForecast.pending, state => {
      //   state.loadingForecast = true;
      // })
      // .addCase(getForecast.fulfilled, (state, action) => {
      //   state.forecast = action.payload;
      //   state.loadingForecast = false;
      // })
      // .addCase(getForecast.rejected, (state, action) => {
      //   state.loadingForecast = false;
      //   state.error = action.error.message;
      // })
      .addCase(getForecastByLatLng.pending, state => {
        state.loadingForecast = true;
        state.errorForecast = undefined;
      })
      .addCase(getForecastByLatLng.fulfilled, (state, action) => {
        state.forecast = action.payload;
        state.loadingForecast = false;
        state.errorForecast = undefined;
      })
      .addCase(getForecastByLatLng.rejected, (state, action) => {
        state.loadingForecast = false;
        state.errorForecast = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
