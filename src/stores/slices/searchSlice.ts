import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {City} from '../../services/city';
import {getCityFromCoords} from '../../services/weather';

export const findCityByLatLng = createAsyncThunk(
  'search/findCityByLatLng',
  async ({lat, lng}: {lat: number; lng: number}) => {
    return await getCityFromCoords(lat, lng);
  },
);

interface State {
  selectedCity?: City;
  searches: City[];
  isCurrentLocation: boolean;
  loading: boolean;
  error?: string;
}

const initialState: State = {
  selectedCity: {
    name: 'Amsterdam',
    latitude: 52.35,
    longitude: 4.9166,
    country: 'NL',
    population: 1031000,
    region: 'North Holland',
    is_capital: true,
  },
  searches: [
    {
      name: 'Dubai',
      latitude: 25.2697,
      longitude: 55.3094,
      country: 'AE',
      population: 2502715,
      region: 'Dubai',
      is_capital: false,
    },
    {
      name: 'London',
      latitude: 51.5072,
      longitude: -0.1275,
      country: 'GB',
      population: 10979000,
      region: 'England',
      is_capital: true,
    },
    {
      name: 'San Francisco',
      latitude: 37.7562,
      longitude: -122.443,
      country: 'US',
      population: 3592294,
      region: 'California',
      is_capital: false,
    },
    {
      name: 'Tokyo',
      latitude: 35.6897,
      longitude: 139.692,
      country: 'JP',
      population: 37977000,
      region: 'N/A',
      is_capital: true,
    },
  ],
  isCurrentLocation: false,
  loading: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    selectCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    addSearch: (state, action) => {
      const city = action.payload;
      if (!state.searches.some(item => item.name === city.name)) {
        state.searches.unshift(city);
      }
    },
    setCurrentLocation: (state, action) => {
      state.isCurrentLocation = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(findCityByLatLng.pending, state => {
        state.loading = true;
      })
      .addCase(findCityByLatLng.fulfilled, (state, action) => {
        state.selectedCity = action.payload;
        state.loading = false;
      })
      .addCase(findCityByLatLng.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const {addSearch, selectCity, setCurrentLocation} = searchSlice.actions;
export default searchSlice.reducer;
